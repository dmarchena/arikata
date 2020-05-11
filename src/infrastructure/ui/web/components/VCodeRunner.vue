<template>
  <button
    @click="run"
    @keydown.enter="run"
    @keydown.space="run"
  >
    <slot>Run</slot>
    <iframe
      v-if="sandbox.running"
      :src="iframeSrc"
      sandbox="allow-scripts"
      style="
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
      "
      title="Code sandbox"
    />
  </button>
</template>

<script>
// import testIt from 'test_it';
// import test from '../test-runner';
import chai from 'chai';
import testRunner from '../test-runner';

const messages = {
  log: (...data) =>
    parent.postMessage(
      {
        type: 'log',
        data: data
          .map((i) =>
            Object.prototype.toString.call(i) === '[object Object]'
              ? JSON.stringify(i, null, 2)
              : i
          )
          .join(', '),
      },
      '*'
    ),
  end: () =>
    parent.postMessage(
      {
        type: 'end',
      },
      '*'
    ),
  error: (...data) =>
    parent.postMessage(
      {
        type: 'error',
        data: data.join(', '),
      },
      '*'
    ),
  notAllowed: (callee) =>
    parent.postMessage(
      {
        type: 'error',
        data: `Sandbox warning: "${callee}" is not allowed.`,
      },
      '*'
    ),
};

function extend(dest, src, arr) {
  var property = null,
    ext = '',
    isArray = false,
    key;
  for (property in src) {
    key = arr ? '[' + property + ']' : '["' + property + '"]';
    ext += dest + key + ' = ';
    if (typeof src[property] === 'object' && src[property] !== null) {
      isArray =
        Object.prototype.toString.call(src[property]) === '[object Array]';
      ext += dest + key + (isArray ? ' || [];' : ' || {};');
      ext += extend(dest + key, src[property], isArray);
    } else if (typeof src[property] === 'function') {
      ext += src[property].toString() + ';';
    } else if (typeof src[property] === 'string') {
      ext += '"' + src[property] + '";';
    } else {
      ext += src[property] + ';';
    }
  }
  return ext;
}

const forbiddenGlobals = {
  alert: () => forbidden('alert'),
  eval: () => forbidden('eval'),
  execScript: () => forbidden('execScript'),
  // function: () => forbidden('function'),
  Function: () => (forbidden('Function'), function () {}),
  open: () => forbidden('open'),
  setInterval: () => forbidden('setInterval'),
  setTimeout: () => forbidden('setTimeout'),
  uneval: () => forbidden('uneval'),
  console: {
    assert: () => forbidden('console.assert'),
    clear: () => forbidden('console.clear'),
    count: () => forbidden('console.count'),
    countReset: () => forbidden('console.countReset'),
    debug: () => forbidden('console.debug'),
    dir: () => forbidden('console.dir'),
    dirxml: () => forbidden('console.dirxml'),
    error: () => forbidden('console.error'),
    exception: () => forbidden('console.exception'),
    group: () => forbidden('console.group'),
    groupCollapsed: () => forbidden('console.groupCollapsed'),
    groupEnd: () => forbidden('console.groupEnd'),
    info: () => forbidden('console.info'),
    log: () => forbidden('console.log'),
    profile: () => forbidden('console.profile'),
    profileEnd: () => forbidden('console.profileEnd'),
    table: () => forbidden('console.table'),
    time: () => forbidden('console.time'),
    timeEnd: () => forbidden('console.timeEnd'),
    timeLog: () => forbidden('console.timeLog'),
    timeStamp: () => forbidden('console.timeStamp'),
    trace: () => forbidden('console.trace'),
    warn: () => forbidden('console.warn'),
  },
  document: {
    write: () => forbidden('document.write'),
    writeIn: () => forbidden('document.writeIn'),
  },
  JSON: {
    parse: () => forbidden('JSON.parse'),
  },
  WebAssembly: {},
};

const sandboxIframeGlobals = {
  forbidden: messages.notAllowed,
  ...forbiddenGlobals,
  console: {
    ...forbiddenGlobals.console,
    dir: messages.log,
    info: messages.log,
    log: messages.log,
    warn: messages.log,
    error: messages.error,
  },
  sandboxCodeExecuted: messages.end,
  testRunner,
  it: testRunner.it,
  test: testRunner.test,
};

const sandboxInitJs = extend('window', sandboxIframeGlobals).replace(
  /\s+/gm,
  ' '
);

export default {
  name: 'VCodeRunner',
  props: {
    code: {
      type: String,
      default: '',
    },
    test: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sandbox: {
        console: (e) => {
          // console[e.data.type](e.data.data);
          const { type, data } = e.data;
          if (type === 'log' || type === 'error') {
            this.$emit('log', data);
          }
        },
        codeExecuted: (e) => {
          if (e.data.type === 'end') {
            this.$_sandboxStop();
          }
        },
        running: false,
        useBase64: false,
      },
    };
  },

  computed: {
    iframeSrc() {
      let iframeContent = `,
        <script src="https://cdn.jsdelivr.net/npm/chai@4.2.0/chai.js" integrity="sha256-Oe35Xz+Zi1EffYsTw5ENBhzOS06LOTV5PSV4OVvnyU8=" crossorigin="anonymous"><\/script>
        <script>
          ${sandboxInitJs}
          const expect = chai.expect;
          const assert = chai.assert;
          (function () {
            try {
              ${this.code}
              testRunner.reset();
              ${this.test}
              testRunner.run();
            }
            catch(err) {
              console.error(err);
            }
            finally {
              sandboxCodeExecuted();
            }
          }());
        <\/script>
      `;
      if (this.sandbox.useBase64) {
        iframeContent = `;base64,${btoa(iframeContent)}`;
      }
      return this.sandbox.running && `data:text/html${iframeContent}`;
    },
  },

  watch: {
    code() {
      this.$_sandboxStop();
    },
  },

  methods: {
    run() {
      this.$_sandboxStop();
      this.$nextTick().then(() => this.$_sandboxRun());
    },

    $_sandboxRun() {
      window.addEventListener('message', this.sandbox.codeExecuted);
      window.addEventListener('message', this.sandbox.console);
      this.sandbox.running = true;
      setTimeout(() => {
        if (this.sandbox.running) {
          this.$emit(
            'log',
            'Unknown error: Code execution has not ended. It is likely to be a SyntaxError.'
          );
          this.$_sandboxStop();
        }
      }, 3000);
    },

    $_sandboxStop() {
      window.removeEventListener('message', this.sandbox.codeExecuted);
      window.removeEventListener('message', this.sandbox.console);
      this.sandbox.running = false;
    },
  },
};
</script>
