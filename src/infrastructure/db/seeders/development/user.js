import { random, internet } from 'faker';
import populator from '../populator';

const numUsers = 10;

const fakeUser = () => ({
  id: random.uuid(),
  email: internet.email(),
  password: internet.password(),
  roleId: random.number(),
});

const populateTable = populator(fakeUser);

export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert('user', populateTable(numUsers), {}),
  down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
