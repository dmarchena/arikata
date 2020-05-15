<template>
  <span><VIcon
    id="tag"
    v-bem:icon
  /><span
    v-bem:text
  ><slot>Mistery tag</slot></span></span>
</template>

<script>
import VIcon from './VIcon.vue';

export default {
  name: 'VTag',

  components: {
    VIcon,
  },
};
</script>
