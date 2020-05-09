import kata from '../domain/kata';
import kataTransformer from './transformers/kataTransformer';

const createManageKataService = (kataRepo) => ({
  save({
    name = '',
    details = '',
    code = '',
    test = '',
    tags = [],
    // proposedSolution = {},
  }) {
    const instance = kata(undefined, {
      name,
      details,
      code,
      test,
      tags,
    });
    return kataRepo.save(instance).then(kataTransformer.toKataDto);
  },
});

export default createManageKataService;
