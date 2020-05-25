<template>
  <form
    class="form"
    action="/api/training/"
    method="post"
  >
    <h2 v-bem:kata>
      {{ kata.name }}
    </h2>
    <div v-bem:details>
      {{ kata.name }}
    </div>
    <div v-bem:editor>
      <div
        v-bem:editor-actions="{ error: error }"
        class="btn-set"
      >
        <div
          v-show="error"
          v-bem:editor-msg
        >
          {{ error }}
        </div>
        <VCodeRunner
          :code="code"
          :test="test"
          @log="log"
          @end="codeExecuted"
        >
          RUN
        </VCodeRunner>
        <VButtonAsync
          id="save"
          @active="handleSubmit"
        >
          Save
        </VButtonAsync>
      </div>
      <VCodeEditor v-model="code" />
    </div>
    <div v-bem:console-container>
      <VConsole v-bem:console />
      <button
        v-bem:console-clear
        @click.prevent="clearConsole"
        @keydown.enter.prevent="clearConsole"
        @keydown.space.prevent="clearConsole"
      >
        Clear console
      </button>
    </div>
  </form>
</template>

<script>
import { publish, events } from '../event-bus';
import application from '../application';
import VButtonAsync from '../components/VButtonAsync';
import VCodeEditor from '../components/VCodeEditor';
import VCodeRunner from '../components/VCodeRunner';
import VConsole from '../components/VConsole';

export default {
  name: 'Training',

  components: {
    VButtonAsync,
    VCodeEditor,
    VCodeRunner,
    VConsole,
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
    clearConsole() {
      publish(events.CONSOLE_CLEAR);
    },
    codeExecuted({ success }) {
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
  },
};
</script>
