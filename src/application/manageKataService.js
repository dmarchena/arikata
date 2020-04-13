const createKataService = (kataRepo) => ({
  save({ details, name, code, tests, tags }) {
    kataRepo.save({ details, name, code, tests, tags });
  },
});

export default createKataService;
