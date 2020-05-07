<template>
  <codemirror
    v-model="code"
    class="v-code-editor"
    :options="codemirrorOptions"
  />
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
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
        tabSize: 2,
        indentUnit: 2,
        styleActiveLine: true,
        line: true,
        lineNumbers: true,
        lineWiseCopyCut: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: 'text/javascript',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'pastel-on-dark',
        extraKeys: { Ctrl: 'autocomplete' },
        hintOptions: {
          completeSingle: false,
        },
      },
    };
  },

  watch: {
    code() {
      this.$emit('input', this.code);
    },
  },
};
</script>
