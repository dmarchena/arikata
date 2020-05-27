// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import { createAuthSession } from '../../application/factories/authSession';
import { userResponseDto } from '../../application/dtos/user';
import config from '../../config.json';

const returnVoid = () => undefined;
const returnTrue = () => true;
const returnUser = () =>
  userResponseDto({
    roles: config.userRoles, // Give all roles
  });

/**
 * Server Auth Session will be checked via JSON web token before
 * calling the app services. This a fake implementation.
 */
const serverFakeAuthSession = createAuthSession({
  discardAuthentication: returnVoid,
  getAuthentication: returnUser,
  isAdmin: returnTrue,
  isAuthenticated: returnTrue,
  isUser: returnTrue,
  saveAuthentication: returnVoid,
});

export default serverFakeAuthSession;
