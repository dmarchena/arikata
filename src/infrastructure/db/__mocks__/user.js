import { encryptPassword } from '../../encryption';

const fakeUser = (user) => ({
  ...user,
  password: encryptPassword(user.password),
});

// Use this solution: https://github.com/BlinkUX/sequelize-mock/issues/42#issuecomment-498746414
const UserMock = (dbMock, usersMock) => {
  const User = dbMock.define('user', fakeUser(usersMock.user));
  return User;
};

export default UserMock;
