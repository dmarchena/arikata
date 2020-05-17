import createUserRepo from '../../../application/factories/repos/user';
import db from '../../db';
import { comparePassword, encryptPassword } from '../../encryption';
import webtoken from '../../webtoken';
import { userTransformer } from '../../../application/transformers/userTransformer';

const login = (models) => (userDto) =>
  models.User.findOne({
    where: {
      email: userDto.email,
    },
  }).then((dbUser) => {
    if (!dbUser) {
      return null;
    }
    const isValidPassword = comparePassword(userDto.password, dbUser.password);
    if (isValidPassword) {
      const resUser = userTransformer.toUserDto(dbUser, true);
      const token = webtoken.signWithPayload(resUser);
      resUser.accessToken = token;
      return resUser;
    }
    return null;
  });

const logout = Promise.resolve; // Do nothing and return same user

const save = (models) => (userDto) =>
  models.User.create({
    ...userDto,
    password: encryptPassword(userDto.password),
  });

const update = (models) => (userDto) =>
  models.User.update(
    {
      // email: userDto.email,
      password: encryptPassword(userDto.password),
      // roles: userDto.roles,
    },
    {
      returning: true,
      where: { id: userDto.id },
    }
  );

const userRepo = createUserRepo({
  login: login(db),
  logout,
  save: save(db),
  update: update(db),
});

export default userRepo;
