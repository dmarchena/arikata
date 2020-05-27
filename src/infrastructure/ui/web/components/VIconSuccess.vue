<template>
  <VIcon
    :id="iconId"
    class="icon"
    :class="{ 'icon--success': success, 'icon--error': !success }"
  />
</template>

<script>
import VIcon from './VIcon';

export default {
  name: 'VIconSuccess',

  components: {
    VIcon,
  },

  props: {
    success: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iconId() {
      return this.success ? 'checkmark' : 'cross';
    },
  },
};
</script>
