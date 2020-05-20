import { random, internet } from 'faker';
import { dataPopulator } from '../../../../utils/dataPopulator';
import config from '../../../../config.json';
import mock from '../../../../mock.json';
import { encryptPassword } from '../../../encryption';

const fakeUser = () => ({
  id: random.uuid(),
  email: internet.email(),
  password: 'qwerty',
  roles: [config.userRoles.user],
});

const populateTable = dataPopulator(fakeUser);
const data = [...populateTable(8), mock.users.user, mock.users.admin].map(
  (u) => ({
    ...u,
    password: encryptPassword(u.password),
  })
);

export default {
  up: (queryInterface) => queryInterface.bulkInsert('user', data, {}),
  down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
