import createUserRepo from '../../../application/factories/repos/user';
import User from '../../../domain/user';

import mockJson from '../../../mock.json';

const users = [
  User().create(mockJson.users.user.id, mockJson.users.user),
  User().create(mockJson.users.admin.id, mockJson.users.admin),
];

const signIn = (user) => {
  const res = users.find((u) => u.email === user.email);
  return Promise.resolve(res && res.password === user.password ? res : null);
};

const signUp = (user) => {
  users.push(user);
  return Promise.resolve(user);
};

const update = (user) => {
  const current = users.find((u) => u.email === user.email);
  if (current) {
    return Promise.resolve({
      ...current,
      ...user,
    });
  }
  return Promise.resolve(null);
};

const userRepo = createUserRepo({
  signIn,
  signOut: Promise.resolve,
  signUp,
  update,
});

export default userRepo;
