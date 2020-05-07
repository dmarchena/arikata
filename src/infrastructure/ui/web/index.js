import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import vueBemPlugin from './plugins/vue-bem';
import App from './App.vue';

Vue.use(vueBemPlugin);

new Vue({ render: (h) => h(App) }).$mount('#app');
