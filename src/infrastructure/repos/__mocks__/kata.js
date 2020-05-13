// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { is, prop, chain } from 'ramda';
import Kata from '../../../domain/kata';
import createKataRepo from '../../../application/factories/repos/kata';
import { dataPopulator, uniqDataPopulator } from '../../../utils/dataPopulator';
import { randomNaturalWithZero } from '../../../utils/math';

const populateTags = uniqDataPopulator(() => faker.commerce.productAdjective());

const generateKata = () =>
  Kata().create(undefined, {
    details: faker.lorem.paragraphs(3),
    name: faker.company.catchPhrase(),
    tags: populateTags(randomNaturalWithZero(4)),
  });

const katas = dataPopulator(generateKata)(10);
const tags = chain(prop('tags'), katas);

const getAllKatas = () => Promise.resolve(katas);

const getAllTags = () => Promise.resolve(tags);

const getAllKatasWithTag = (tag) =>
  Promise.resolve(katas.filter((k) => k.tags.includes(tag)));

const getKataWithId = (id) => {
  if (is(String)(id)) {
    return Promise.resolve(katas[0]);
  }
  return Promise.resolve(false);
};

const save = (kataDto) => {
  const kataEntity = Kata().create(kataDto.id, kataDto);
  katas.push(kataEntity);
  return Promise.resolve(kataEntity);
};

const update = (kataDto) => {
  // const targetIndex = katas.findIndex((k) => k.id === kataDto.id);
  const targetIndex = 0; // update always the first one
  if (targetIndex > -1) {
    katas[targetIndex] = Kata().create(kataDto.id, kataDto);
    return Promise.resolve(katas[targetIndex]);
  }
  return Promise.resolve(false);
};

const remove = (kataDto) => {
  const targetIndex = katas.findIndex((k) => k.id === kataDto.id);
  if (targetIndex > -1) {
    katas.splice(targetIndex, 1);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

const kataRepo = createKataRepo({
  getAllKatas,
  getAllTags,
  getAllKatasWithTag,
  getKataWithId,
  remove,
  save,
  update,
});

export default kataRepo;
