import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';

new Vue({ render: (h) => h(App) }).$mount('#app');
