import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import kataList from './modules/kataList';
import { vuexKataRepoModule } from '../../../repos/vuex/kata';

Vue.use(Vuex);

const isVuexKataRepoMutation = (mutation) =>
  mutation.type === vuexKataRepoModule.mutations.remove ||
  mutation.type === vuexKataRepoModule.mutations.save ||
  mutation.type === vuexKataRepoModule.mutations.update;

const storeOptions = {
  actions: {
    listAllKatas({ commit }, { app }) {
      app.browseService.getAllKatas().then((katas) => {
        commit(kataList.mutations.setKatas, { katas });
        commit(mutations.kataRepo.init, { katas });
      });
    },
    listAllKatasWithTag({ commit }, { app, tag }) {
      app.browseService.getAllKatasWithTag(tag).then((katas) => {
        commit(kataList.mutations.setKatas, { katas, tag });
      });
    },
    listAllKatasDoneByUser({ commit, getters }, { app }) {
      const user = getters[auth.getters.getUser];
      app.browseService.getAllKatasDoneByUser(user?.id).then((katas) => {
        commit(kataList.mutations.setKatas, { katas });
      });
    },
    loadLocalStorage({ commit }) {
      commit(auth.mutations.setUser, JSON.parse(localStorage.getItem('user')));
    },
  },
  modules: {
    auth: auth.module,
    kataList: kataList.module,
    kataRepo: vuexKataRepoModule.module,
  },
};

const store = new Vuex.Store(storeOptions);

const getters = {
  auth: auth.getters,
  kataList: kataList.getters,
};

const mutations = {
  auth: auth.mutations,
  kataRepo: vuexKataRepoModule.mutations,
};

const actions = {
  global: {
    listAllKatas: 'listAllKatas',
    listAllKatasDoneByUser: 'listAllKatasDoneByUser',
    listAllKatasWithTag: 'listAllKatasWithTag',
    loadLocalStorage: 'loadLocalStorage',
  },
};

export { store, actions, getters, mutations };
