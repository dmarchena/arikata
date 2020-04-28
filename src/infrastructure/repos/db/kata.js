import * as R from 'ramda';
import createKataRepo from '../../../application/factories/repos/kata';
import db from '../../db';
import tagDto from '../../../application/dtos/tag';
import kataDto, { kataDtoKeys } from '../../../application/dtos/kata';

const parseTagDtoFromDbModel = R.compose(tagDto, R.prop('tag'));
const parseKataTags = R.over(R.lensProp('tags'), R.map(parseTagDtoFromDbModel));
const removeKataTags = R.set(R.lensProp('tags'), []);
const filterKataValidKeys = R.pick(kataDtoKeys);
const parseKataDtoFromDbModel = R.compose(
  kataDto,
  parseKataTags,
  filterKataValidKeys
);

const parseKataDtoArrayFromDbModel = R.map(parseKataDtoFromDbModel);

const allKatas = (models) => () =>
  models.Kata.findAll({ include: models.Tag }).then(
    parseKataDtoArrayFromDbModel
  );

const katasOfTag = (models) => (tag) =>
  models.Kata.findAll({
    include: {
      model: models.Tag,
      where: { tag },
    },
  }).then(R.map(R.compose(removeKataTags, parseKataDtoFromDbModel)));

const save = (models) => (kata) => models.Kata.create(kata);

const kataRepo = createKataRepo(allKatas(db), katasOfTag(db), save(db));

export default kataRepo;
