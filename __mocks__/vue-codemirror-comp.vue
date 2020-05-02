/* eslint-disable */
<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'Codemirror',

  props: {
    value: {
      type: String,
      default: '',
    },
  },
};
</script>
