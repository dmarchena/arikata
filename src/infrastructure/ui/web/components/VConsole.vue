<template>
  <div>
    <pre v-bem:output>{{ lines }}</pre>
    <button
      v-bem:clear
      class="btn btn--ghost"
      @click.prevent="clear"
      @keydown.enter.prevent="clear"
      @keydown.space.prevent="clear"
    >
      Clear console
    </button>
  </div>
</template>

<script>
import { events, subscribe } from '../event-bus';

export default {
  name: 'VConsole',

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
