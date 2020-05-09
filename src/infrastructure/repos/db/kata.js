import createKataRepo from '../../../application/factories/repos/kata';
import db from '../../db';
import kataTransformer from '../../../application/transformers/kataTransformer';

const dbModelArrayToEntities = (arr = []) =>
  arr.map(kataTransformer.toKataModel);

const allKatas = (models) => () =>
  models.Kata.findAll({ include: models.Kata.Tags }).then(
    dbModelArrayToEntities
  );

const katasOfTag = (models) => (tag) =>
  models.Tag.findOne({
    where: { tag },
    include: {
      association: models.Tag.Katas,
      include: models.Kata.Tags,
    },
  }).then(({ kata } = {}) => dbModelArrayToEntities(kata));

const save = (models) => (kataEntity) =>
  models.Kata.create(kataEntity, {
    include: [
      {
        association: models.Kata.Tags,
        include: [models.Tag.Katas],
      },
    ],
  }).then(kataTransformer.toKataModel);

const kataRepo = createKataRepo(allKatas(db), katasOfTag(db), save(db));

export default kataRepo;
