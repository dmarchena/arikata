<template>
  <codemirror
    v-model="code"
    class="v-code-editor"
    :options="codemirrorOptions"
  />
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/selection/active-line.js';

export default {
  name: 'VCodeEditor',

  components: {
    codemirror,
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      code: this.value,
      codemirrorOptions: {
        foldGutter: true,
        indentUnit: 2,
        line: true,
        lineNumbers: true,
        lineWiseCopyCut: true,
        matchBrackets: true,
        mode: 'text/javascript',
        showCursorWhenSelecting: true,
        styleActiveLine: true,
        styleSelectedText: true,
        tabSize: 2,
        theme: 'pastel-on-dark',
        viewportMargin: Infinity,
      },
    };
  },

  watch: {
    code() {
      this.$emit('input', this.code);
    },
    value() {
      if (this.value !== this.code) {
        this.code = this.value;
      }
    },
  },
};
</script>
