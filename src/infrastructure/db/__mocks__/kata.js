import { random, lorem, company } from 'faker';

const fakeKata = (uuid) => ({
  id: uuid || random.uuid(),
  details: lorem.paragraphs(3),
  code: `console.log(${random.words(3)})`,
  test: `// Some fake test are needed`,
  name: company.catchPhrase(),
});

const KataMock = (dbMock) =>
  dbMock.define('kata', fakeKata('0fae2543-774d-4c58-b750-4a6dcc385811'), {
    instanceMethods: {},
  });

export default KataMock;
