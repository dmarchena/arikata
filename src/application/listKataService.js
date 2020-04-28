const createListKataService = (kataRepo) => ({
  getAll() {
    return kataRepo.allKatas();
  },
  getAllKatasWithTag(tag) {
    return kataRepo.katasOfTag(tag);
  },
});

export default createListKataService;
