import kataDto from './transformers/kata';

const createListKataService = (kataRepo) => ({
  getAll() {
    return kataRepo.allKatas().then((data) => data.map(kataDto));
  },
  getAllKatasWithTag(tag) {
    return kataRepo.katasOfTag(tag).then((data) => data.map(kataDto));
  },
});

export default createListKataService;
