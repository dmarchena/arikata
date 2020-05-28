<template>
  <form
    class="form"
    action="/api/training/"
    method="post"
  >
    <a
      v-bem:back
      href="#"
      @click="back"
      @keydown.enter="back"
    >&lt; Back</a>
    <h2 v-bem:kata>
      {{ kata.name }}
    </h2>
    <div v-bem:details>
      {{ kata.details }}
    </div>
    <div
      v-bem:editor-container
      @keydown.ctrl.enter.capture.prevent.stop="run"
    >
      <VCodeEditor
        v-model="code"
        v-bem:editor
      />
      <p v-bem:editor-tip>
        You can test your code pressing <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
      </p>
      <div v-bem:editor-actions="{ error: error }">
        <div
          v-show="error"
          v-bem:editor-msg
        >
          {{ error }}
        </div>
        <div class="btn-set">
          <VCodeRunner
            ref="codeRunner"
            class="btn"
            :class="{ 'btn--primary': !tested || !success }"
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
          <VButtonAsync
            id="save"
            class="btn"
            :class="{ 'btn--primary': tested && success }"
            :disabled="!tested"
            @active="handleSubmit"
          >
            {{ success ? 'Save' : 'Save for later' }}
          </VButtonAsync>
        </div>
      </div>
    </div>
    <VConsole v-bem:console />
  </form>
</template>

<script>
import '../css/pages/training.css';
import { publish, events } from '../event-bus';
import application from '../application';
import VButtonAsync from '../components/VButtonAsync';
import VCodeEditor from '../components/VCodeEditor';
import VCodeRunner from '../components/VCodeRunner';
import VConsole from '../components/VConsole';
import VIcon from '../components/VIcon';

export default {
  name: 'Training',

  components: {
    VButtonAsync,
    VCodeEditor,
    VCodeRunner,
    VConsole,
    VIcon,
  },

  props: {
    id: {
      type: String,
      default: undefined,
    },
    kataId: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      kata: {},
      code: '',
      success: false,
      trainingId: '',
      error: undefined,
      isUpdate: false,
      tested: false,
    };
  },

  computed: {
    test() {
      return this.kata.test;
    },
  },

  async mounted() {
    let training;
    if (this.id) {
      training = await application.doKataService.getTrainingWithId(this.id);
      this.isUpdate = true;
    } else if (this.kataId) {
      training = await application.doKataService.startTraining(this.kataId);
      this.isUpdate = false;
    }
    this.trainingId = training.id;
    this.code = training.code;
    this.success = training.success;
    this.kata = training.kata;
  },

  methods: {
    back(e) {
      e.preventDefault();
      this.$router.back();
    },
    clearConsole() {
      publish(events.CONSOLE_CLEAR);
    },
    codeExecuted({ success }) {
      this.tested = true;
      this.success = success;
    },
    handleSubmit(e) {
      e.preventDefault();
      let promise;

      if (this.isUpdate) {
        promise = application.doKataService.updateTraining(
          this.trainingId,
          this.code,
          this.success
        );
      } else {
        promise = application.doKataService.saveTraining({
          id: this.trainingId,
          code: this.code,
          success: this.success,
          kataId: this.kataId,
          userId: this.user?.id,
        });
      }

      return promise
        .then((data) => {
          this.isUpdate = true;
          return data;
        })
        .catch((err) => {
          this.onError(err);
          return Promise.reject(err);
        });
    },
    log(data) {
      publish(events.CONSOLE_LOG, data);
    },
    onError(err) {
      this.error = err.message;
      setTimeout(() => {
        this.error = undefined;
      }, 5000);
    },
    run() {
      this.$refs.codeRunner.run();
    },
  },
};
</script>
