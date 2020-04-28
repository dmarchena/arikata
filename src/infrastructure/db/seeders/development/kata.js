import { random, lorem, company } from 'faker';
import { populator } from '../populator';

const numKatas = 10;

const fakeKata = () => ({
  id: random.uuid(),
  details: lorem.paragraphs(3),
  code: `console.log(${random.words(3)})`,
  test: `// Some fake test are needed`,
  name: company.catchPhrase(),
});

export const records = populator(fakeKata)(numKatas);

export default {
  up: (queryInterface) => queryInterface.bulkInsert('kata', records, {}),
  down: (queryInterface) => queryInterface.bulkDelete('kata', null, {}),
};
