<template>
  <form
    class="form"
    action="/api/katas/"
    method="post"
  >
    <div v-bem:form>
      <VFieldText
        v-model="name"
        name="name"
      >
        Kata name
      </VFieldText>
      <VFieldTags
        v-model="tags"
        v-bem:tags
        name="tags"
      />
      <VFieldTextarea
        v-model="details"
        v-bem:details
        name="details"
      >
        Detailed info about Kata
      </VFieldTextarea>
      <div v-bem:form-actions>
        <button
          v-bem:back
          class="btn btn--ghost"
          href="#"
          @click.prevent="$router.go(-1)"
          @keydown.enter.prevent="$router.go(-1)"
          @keydown.space.prevent="$router.go(-1)"
        >
          Cancel
        </button>
        <VButtonAsync
          id="save"
          v-bem:btn-save
          class="btn btn--primary"
          @active="handleSubmit"
        >
          Save
        </VButtonAsync>
      </div>
      <p :class="['error-message', { 'error-message--hidden': !error }]">
        {{ errorMsg }}
      </p>
    </div>
    <div v-bem:editor-container>
      <div v-bem:editor-label>
        Initial code
      </div>
      <VCodeEditor
        v-model="code"
        v-bem:editor
      />
      <div v-bem:editor-label>
        Tests
      </div>
      <VCodeEditor
        v-model="test"
        v-bem:test
      />
      <div v-bem:editor-actions>
        <VCodeRunner
          v-bem:run
          :code="code"
          :test="test"
          @log="log"
          @end="codeExecuted"
        >
          Test
          <VIcon
            v-if="tested && success"
            id="checkmark"
            class="icon icon--success"
          />
          <VIcon
            v-if="tested && !success"
            id="cross"
            class="icon icon--error"
          />
        </VCodeRunner>
      </div>
    </div>
    <VConsole v-bem:console />
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
import VIcon from '../components/VIcon';

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
    VIcon,
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
      error: false,
      errorMsg: undefined,
      success: false,
      tested: false,
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
    codeExecuted({ success }) {
      this.tested = true;
      this.success = success;
    },
    fetchKata() {
      if (this.id) {
        application.manageKataService
          .getKataWithId(this.id)
          .then(this.loadKataData)
          .catch(this.printError);
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
        return application.manageKataService
          .update({
            ...kataData,
            id: this.id,
          })
          .then((data) => {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
            return data;
          })
          .catch(this.printError);
      } else {
        return application.manageKataService
          .save(kataData)
          .then((data) => {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
            return data;
          })
          .catch(this.printError);
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
    printError(error) {
      this.error = true;
      this.errorMsg = error.message;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      setTimeout(() => {
        this.errorMsg = undefined;
      }, 6000);
      return error;
    },
  },
};
</script>
