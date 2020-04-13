import createUseCase from './useCaseFactory';

const createListKatasUseCase = (kataRepo, filterByTag = false) =>
  createUseCase(() =>
    filterByTag ? kataRepo.katasOfTag(filterByTag) : kataRepo.allKatas()
  );

export default createListKatasUseCase;
