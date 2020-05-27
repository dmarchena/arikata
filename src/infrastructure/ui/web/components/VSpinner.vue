<template>
  <CircleSpinner />
</template>
<script>
import 'vue-spinners/dist/vue-spinners.css';
import { CircleSpinner } from 'vue-spinners/dist/vue-spinners.common';

export default {
  name: 'VSpinner',
  components: {
    CircleSpinner,
  },
};
</script>
