const faker = require('faker');
const populator = require('../populator');

const numKatas = 10;

const fakeKata = () => ({
  id: faker.random.uuid(),
  details: faker.lorem.paragraphs(3),
  code: `console.log(${faker.random.words(3)})`,
  test: `// Some fake test are needed`,
  name: faker.company.catchPhrase(),
  // tags: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
});

const populateTable = populator(fakeKata);

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('katas', populateTable(numKatas), {}),
  down: (queryInterface) => queryInterface.bulkDelete('katas', null, {}),
};
