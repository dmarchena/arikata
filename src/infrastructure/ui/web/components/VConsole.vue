<template>
  <pre>{{ lines }}</pre>
</template>

<script>
import { events, subscribe } from '../event-bus';

export default {
  name: 'VKataAdmin',

  data() {
    return {
      logs: [],
    };
  },

  computed: {
    lines() {
      return this.logs.join('\r\n');
    },
  },

  created() {
    subscribe(events.CONSOLE_LOG, (data) => this.log(data));
    subscribe(events.CONSOLE_CLEAR, () => this.clear());
  },

  methods: {
    log(data) {
      this.logs.push(data);
    },
    clear() {
      this.logs = [];
    },
  },
};
</script>
