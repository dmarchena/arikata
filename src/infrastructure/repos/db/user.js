import createUserRepo from '../../../application/factories/repos/user';
import db from '../../db';
import { comparePassword, encryptPassword } from '../../encryption';
import webtoken from '../../webtoken';
import { userTransformer } from '../../../application/transformers/userTransformer';
import NotFoundError from '../../../application/exceptions/NotFoundError';
import UnauthorizedError from '../../../application/exceptions/UnauthorizedError';

const signIn = (models) => (userDto) =>
  models.User.findOne({
    where: {
      email: userDto.email,
    },
  }).then((dbUser) => {
    if (!dbUser) {
      throw new NotFoundError(`User "${userDto.email}" does not exists`);
    }
    const isValidPassword = comparePassword(userDto.password, dbUser.password);
    if (isValidPassword) {
      const resUser = userTransformer.toUserDto(dbUser, true);
      const token = webtoken.signWithPayload(resUser);
      resUser.accessToken = token;
      return resUser;
    }
    throw new UnauthorizedError('Wrong password');
  });

const signOut = Promise.resolve; // Do nothing and return same user

const signUp = (models) => (userDto) =>
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
  signIn: signIn(db),
  signOut,
  signUp: signUp(db),
  update: update(db),
});

export default userRepo;
