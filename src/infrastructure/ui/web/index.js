import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import router from './router';
import { store } from './store';
import vueBemPlugin from './plugins/vue-bem';

import App from './App.vue';
import auth from './mixins/auth';

Vue.use(VueRouter);
Vue.use(vueBemPlugin);
Vue.mixin(auth);

new Vue({
  beforeCreate() {
    this.$store.dispatch('loadLocalStorage');
  },
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
