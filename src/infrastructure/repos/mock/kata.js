// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import kata from '../../../domain/kata';
import createKataRepo from '../../../application/factories/repos/kata';

const katas = [...Array(10)].map(() =>
  kata(null, {
    details: faker.lorem.paragraphs(3),
    name: faker.company.catchPhrase(),
    tags: [
      faker.commerce.productAdjective(),
      faker.commerce.productAdjective(),
    ],
  })
);

const allKatas = () => Promise.resolve(katas);

const katasOfTag = (tag) =>
  Promise.resolve(katas.filter((k) => k.isTaggedAs(tag)));

const save = (kataDto) => {
  katas.push(kataDto);
  return Promise.resolve(katas);
};

const kataRepo = createKataRepo(allKatas, katasOfTag, save);

export default kataRepo;
