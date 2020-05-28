import data from './prod.json';
import { encryptPassword } from '../../../encryption';

const records = data.users.map((u) => ({
  ...u,
  password: encryptPassword(u.password),
}));

export default {
  up: (queryInterface) => queryInterface.bulkInsert('user', records, {}),
  down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
