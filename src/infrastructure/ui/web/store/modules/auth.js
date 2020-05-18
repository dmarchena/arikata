const getters = {
  getUser: 'auth/getUser',
};

const mutations = {
  removeUser: 'auth/removeUser',
  setUser: 'auth/setUser',
};

const authModule = {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      state.user = null;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
};

export default {
  module: authModule,
  getters,
  mutations,
};
