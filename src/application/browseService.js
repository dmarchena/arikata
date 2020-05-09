import kataTransformer from './transformers/kataTransformer';

const responseToDtoArray = (res = []) => res.map(kataTransformer.toKataDto);

const createBrowseService = (kataRepo) => ({
  getAll() {
    return kataRepo.allKatas().then(responseToDtoArray);
  },
  getAllKatasWithTag(tag) {
    return kataRepo.katasOfTag(tag).then(responseToDtoArray);
  },
});

export default createBrowseService;
