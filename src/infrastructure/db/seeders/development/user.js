import { random, internet } from 'faker';
import { dataPopulator } from '../../../../utils/dataPopulator';

const numUsers = 10;

const fakeUser = () => ({
  id: random.uuid(),
  email: internet.email(),
  password: internet.password(),
  roleId: random.number(),
});

const populateTable = dataPopulator(fakeUser);

export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert('user', populateTable(numUsers), {}),
  down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
