import { random, lorem, company } from 'faker';
import populator from '../populator';

const numKatas = 10;

const fakeKata = () => ({
  id: random.uuid(),
  details: lorem.paragraphs(3),
  code: `console.log(${random.words(3)})`,
  test: `// Some fake test are needed`,
  name: company.catchPhrase(),
  // tags: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
});

const populateTable = populator(fakeKata);

export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert('kata', populateTable(numKatas), {}),
  down: (queryInterface) => queryInterface.bulkDelete('kata', null, {}),
};
