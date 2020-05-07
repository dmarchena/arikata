<template>
  <form class="form">
    <VFieldText v-model="name">
      Kata name
    </VFieldText>
    <VFieldTextarea v-model="details">
      Detailed info about Kata
    </VFieldTextarea>
    <VCodeEditor v-model="code" />
    <VCodeEditor v-model="test" />
    <VCodeRunner
      :code="code"
      :test="test"
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
  </form>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js';
import { codemirror } from 'vue-codemirror';
import { publish, events } from '../event-bus';
import VCodeEditor from './VCodeEditor';
import VCodeRunner from './VCodeRunner';
import VConsole from './VConsole';
import VFieldText from './forms/VFieldText';
import VFieldTextarea from './forms/VFieldTextarea';

const testCode = `const A = 10;
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

const sampleCode = `const add = (a, b) => a + b;
const mul = (a, b) => a * b;`;
const sampleTest = `it('should add', () => expect(add(1,2)).to.be.equal(3));
it('should mul', () => expect(mul(1,2)).to.be.equal(2));`;

export default {
  name: 'VKataAdmin',

  components: {
    VCodeEditor,
    VCodeRunner,
    VConsole,
    VFieldText,
    VFieldTextarea,
  },

  data() {
    return {
      name: '',
      code: sampleCode,
      test: sampleTest,
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
