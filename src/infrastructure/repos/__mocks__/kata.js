// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import kata from '../../../domain/kata';
import createKataRepo from '../../../application/factories/repos/kata';
import { dataPopulator, uniqDataPopulator } from '../../../utils/dataPopulator';
import { randomNaturalWithZero } from '../../../utils/math';

const populateTags = uniqDataPopulator(() => faker.commerce.productAdjective());

const generateKata = () =>
  kata(undefined, {
    details: faker.lorem.paragraphs(3),
    name: faker.company.catchPhrase(),
    tags: populateTags(randomNaturalWithZero(4)),
  });

const katas = dataPopulator(generateKata)(10);

const allKatas = () => Promise.resolve(katas);

const katasOfTag = (tag) =>
  Promise.resolve(katas.filter((k) => k.tags.includes(tag)));

const save = (kataDto) => {
  katas.push(kataDto);
  return Promise.resolve(katas);
};

const kataRepo = createKataRepo(allKatas, katasOfTag, save);

export default kataRepo;
