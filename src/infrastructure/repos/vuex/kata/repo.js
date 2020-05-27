import createKataRepo from '../../../../application/factories/repos/kata/kata';
import vuexModule from './module';

const vuexAdapter = (store) => ({
  getAllKatas() {
    return Promise.resolve(store.getters[vuexModule.getters.getAllKatas]);
  },
  getAllKatasWithTag(tag) {
    return Promise.resolve(
      store.getters[vuexModule.getters.getAllKatasWithTag](tag)
    );
  },
  getAllTags() {
    return Promise.resolve(store.getters[vuexModule.getters.getAllTags]);
  },
  getKataWithId(id) {
    try {
      const kata = store.getters[vuexModule.getters.getKataWithId](id);
      return Promise.resolve(kata);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  save(kata) {
    store.commit(vuexModule.mutations.save, kata);
    return Promise.resolve(kata);
  },
  remove(kataId) {
    return Promise.resolve(store.commit(vuexModule.mutations.remove, kataId));
  },
  update(kata) {
    try {
      store.commit(vuexModule.mutations.update, kata);
      return Promise.resolve(kata);
    } catch (e) {
      return Promise.reject(e);
    }
  },
});

const createVuexKataRepo = (store) => createKataRepo(vuexAdapter(store));

export default createVuexKataRepo;
