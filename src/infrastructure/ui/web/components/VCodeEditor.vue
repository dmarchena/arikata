<template>
  <codemirror
    v-model="value"
    class="code-editor"
    :options="codemirrorOptions"
  />
</template>

<script>
import 'codemirror/mode/javascript/javascript.js';
import { codemirror } from 'vue-codemirror';

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

  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>
