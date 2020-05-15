import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router';
import vueBemPlugin from './plugins/vue-bem';

import App from './App.vue';

Vue.use(VueRouter);
Vue.use(vueBemPlugin);

new Vue({ render: (h) => h(App), router }).$mount('#app');
