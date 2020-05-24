import { uniq } from 'ramda';
import NotFoundError from '../../../../application/exceptions/NotFoundError';
import { sortAscending } from '../../../../utils/array';

const updateStateTags = (state, kata) => {
  // eslint-disable-next-line no-param-reassign
  state.tags = sortAscending(uniq([...state.tags, ...kata.tags]));
};

/* eslint-disable no-param-reassign */
const getters = {
  getAllKatas: 'kataRepo/getAllKatas',
  getAllTags: 'kataRepo/getAllTags',
  getAllKatasWithTag: 'kataRepo/getAllKatasWithTag',
  getKataWithId: 'kataRepo/getKataWithId',
};

const mutations = {
  init: 'kataRepo/init',
  remove: 'kataRepo/remove',
  save: 'kataRepo/save',
  update: 'kataRepo/update',
};

const kataRepoModule = {
  namespaced: true,
  state: () => ({
    katas: [],
    tags: [],
  }),
  mutations: {
    init(state, { katas, tags }) {
      if (katas) {
        state.katas = katas;
      }
      if (tags) {
        state.tags = katas;
      }
    },
    remove(state, kataId) {
      const index = state.katas.findIndex((i) => i.id === kataId);
      if (index > -1) {
        state.katas.splice(index, 1);
        return true;
      }
      return false;
    },
    save(state, kata) {
      state.katas.push(kata);
      updateStateTags(state, kata);
      return kata;
    },
    update(state, kata) {
      const index = state.katas.findIndex((i) => i.id === kata.id);
      if (index > -1) {
        state.katas[index] = kata;
        updateStateTags(state, kata);
        return kata;
      }
      throw new NotFoundError('Kata does not exists in Vuex');
    },
  },
  getters: {
    getAllKatas: (state) => state.katas,
    getAllKatasWithTag: (state) => (tag) =>
      state.katas.filter((i) => i.tags?.includes(tag)),
    getAllTags: (state) => state.tags,
    getKataWithId: (state) => (id) => {
      const kata = state.katas.find((i) => i.id === id);
      if (!kata) {
        throw new NotFoundError('Kata does not exists in Vuex');
      }
      return kata;
    },
  },
};

export default {
  module: kataRepoModule,
  getters,
  mutations,
};
