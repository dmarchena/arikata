<template>
  <svg><use :xlink:href="svgId" /></svg>
</template>

<script>
export default {
  name: 'VIcon',

  props: {
    id: {
      type: String,
      default: '',
    },
  },

  computed: {
    svgId() {
      return `#${this.id}`;
    },
  },
};
</script>
