const getters = {
  getKatas: 'kataList/getKatas',
};

const mutations = {
  setKatas: 'kataList/setKatas',
};

const kataListModule = {
  namespaced: true,
  state: () => ({
    tag: null,
    katas: [],
  }),
  mutations: {
    setKatas(state, { katas, tag = null }) {
      state.katas = katas;
      state.tag = tag;
    },
  },
  getters: {
    getKatas(state) {
      return state.katas;
    },
  },
};

export default {
  module: kataListModule,
  getters,
  mutations,
};
