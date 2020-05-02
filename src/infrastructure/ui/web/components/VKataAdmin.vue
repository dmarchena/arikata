<template>
  <div id="app">
    <VCodeEditor v-model="code" />
    <VCodeRunner
      :code="code"
      @log="log"
    >
      RUN
    </VCodeRunner>
    <button
      @click="clearConsole"
      @keydown.enter="clearConsole"
      @keydown.space="clearConsole"
    >
      Clear console
    </button>
    <VConsole />
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js';
import { codemirror } from 'vue-codemirror';
import { publish, events } from '../event-bus';
import VCodeEditor from './VCodeEditor';
import VCodeRunner from './VCodeRunner';
import VConsole from './VConsole';

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
  name: 'VKataAdmin',

  components: {
    VCodeEditor,
    VCodeRunner,
    VConsole,
  },

  data() {
    return {
      code: sampleCode,
    };
  },

  methods: {
    log(data) {
      publish(events.CONSOLE_LOG, data);
    },
    clearConsole() {
      publish(events.CONSOLE_CLEAR);
    },
  },
};
</script>
