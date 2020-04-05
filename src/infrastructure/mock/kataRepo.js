// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import kata from '../../domain/kata';

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

const kataRepo = {
  allKatas: () => Promise.resolve(katas),
  katasOfTag: (tag) => Promise.resolve(katas.filter((k) => k.isTaggedAs(tag))),
};

export default kataRepo;
