import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions: {
    loadLocalStorage({ commit }) {
      commit(auth.mutations.setUser, JSON.parse(localStorage.getItem('user')));
    },
  },
  modules: {
    auth: auth.module,
  },
});

const getters = {
  auth: auth.getters,
};

const mutations = {
  auth: auth.mutations,
};

export { store, getters, mutations };
