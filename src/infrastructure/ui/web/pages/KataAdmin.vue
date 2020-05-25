<template>
  <form
    class="form"
    action="/api/katas/"
    method="post"
  >
    <VButtonAsync
      id="save"
      @active="handleSubmit"
    >
      Save
    </VButtonAsync>
    <VFieldText
      v-model="name"
      name="name"
    >
      Kata name
    </VFieldText>
    <VFieldTags
      v-model="tags"
      name="tags"
    />
    <VFieldTextarea
      v-model="details"
      name="details"
    >
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
      @click.prevent="clearConsole"
      @keydown.enter.prevent="clearConsole"
      @keydown.space.prevent="clearConsole"
    >
      Clear console
    </button>
    <VConsole />
  </form>
</template>

<script>
import { publish, events } from '../event-bus';
import application from '../application';
import VButtonAsync from '../components/VButtonAsync';
import VCodeEditor from '../components/VCodeEditor';
import VCodeRunner from '../components/VCodeRunner';
import VConsole from '../components/VConsole';
import VFieldTags from '../components/forms/VFieldTags';
import VFieldText from '../components/forms/VFieldText';
import VFieldTextarea from '../components/forms/VFieldTextarea';

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
  name: 'KataAdmin',

  components: {
    VButtonAsync,
    VCodeEditor,
    VCodeRunner,
    VConsole,
    VFieldTags,
    VFieldText,
    VFieldTextarea,
  },

  props: {
    id: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      name: '',
      details: '',
      code: sampleCode,
      test: sampleTest,
      tags: [],
    };
  },

  watch: {
    id() {
      this.fetchKata();
    },
  },

  created() {
    this.fetchKata();
  },

  methods: {
    clearConsole() {
      publish(events.CONSOLE_CLEAR);
    },
    fetchKata() {
      if (this.id) {
        application.manageKataService
          .getKataWithId(this.id)
          .then(this.loadKataData);
      }
    },
    handleSubmit(evt) {
      evt.preventDefault();
      const kataData = {
        name: this.name,
        details: this.details,
        code: this.code,
        test: this.test,
        tags: this.tags,
      };
      if (this.id) {
        return application.manageKataService.update({
          ...kataData,
          id: this.id,
        });
      } else {
        return application.manageKataService.save(kataData);
      }
    },
    loadKataData({ name, details, code, test, tags }) {
      this.name = name;
      this.details = details;
      this.code = code;
      this.test = test;
      this.tags = tags;
    },
    log(data) {
      publish(events.CONSOLE_LOG, data);
    },
  },
};
</script>
