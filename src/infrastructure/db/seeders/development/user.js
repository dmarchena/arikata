const faker = require('faker');
const populator = require('../populator');

const numUsers = 10;

const fakeUser = () => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: faker.random.number(),
});

const populateTable = populator(fakeUser);

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('users', populateTable(numUsers), {}),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
