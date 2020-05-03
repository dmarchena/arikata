import Vue from 'vue';
const EventBus = new Vue();

const publish = (event, ...payload) => {
  EventBus.$emit(event, ...payload);
};

const subscribe = (event, handler) => {
  EventBus.$on(event, (...payload) => handler(...payload));
};

const events = {
  CONSOLE_CLEAR: 'console.clear',
  CONSOLE_LOG: 'console.log',
};

export { EventBus, publish, subscribe, events };

export default EventBus;
