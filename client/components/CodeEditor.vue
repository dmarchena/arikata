<template>
  <div id="app">
    <codemirror
      v-model="code"
      :options="codemirrorOptions"
    />
    <CodeRunner
      :code="code"
      @log="log"
    >
      RUN
    </CodeRunner>
    <button
      @click="clearConsole"
      @keydown="clearConsole"
    >
      Clear console
    </button>
    <pre>{{ console.join('\r\n') }}</pre>
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js';
import { codemirror } from 'vue-codemirror';
import CodeRunner from '@/components/CodeRunner';

const sampleCode = `const A = 10;
console.log(A);
alert("hi!");
eval("console.log(A)");
document.write("booh!");
alert('good try');
globalThis.console.log('hi');
//global.alert('1');
window.alert('2');
eval('alert(3)');
~new Function('alert(4)')();
//~function(){this.alert(5)}()﻿;
(function(){this.eval('good try');}).apply(null);
(function(){return this;})().alert(6);
console.log(this, window, self, top, frames, document, parent, document.defaultView);
setTimeout(function () { console.log(this, window); }, 100);
`;

export default {
  name: 'CodeEditor',
  components: {
    codemirror,
    CodeRunner,
  },
  data() {
    return {
      code: sampleCode,
      console: [],
      codemirrorOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: 'text/javascript',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'monokai',
        extraKeys: { Ctrl: 'autocomplete' },
        hintOptions: {
          completeSingle: false,
        },
      },
    };
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
  },
  methods: {
    log(data) {
      this.console.push(data);
    },
    clearConsole() {
      this.console = [];
    },
  },
};
</script>
