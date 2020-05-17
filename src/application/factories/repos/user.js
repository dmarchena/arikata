// eslint-disable-next-line
///<reference path="../../../jsdoc-types.js" />

import { isRequired } from '../utils';
import { createUserTransformer } from '../../transformers/userTransformer';

/**
 * Factory function for a kata repository
 * @returns {UserRepo}
 */
function createUserRepo({
  login = isRequired('login'),
  logout = isRequired('logout'),
  save = isRequired('save'),
  update = isRequired('update'),
}) {
  return {
    transformer: createUserTransformer({ repo: this }),

    /**
     * Login the user. Returns null if it does not exists or the pass is not correct.
     * @param {UserAggregate} user
     * @returns {Promise.<UserAggregate>}
     */
    login(user) {
      return login(this.transformer.toUserDto(user, false)).then((data) =>
        data === null ? null : this.transformer.toUserDto(data, true)
      );
    },

    /**
     * End user session
     * @param {UserAggregate} user
     * @returns {undefined>}
     */
    logout(user) {
      logout(this.transformer.toUserDto(user, false));
    },

    /**
     * Save new user. Returns false if user already exist.
     * @param {UserAggregate} user
     * @returns {Promise.<UserAggregate>}
     */
    save(user) {
      return save(this.transformer.toUserDto(user, false)).then((data) =>
        data === null ? null : this.transformer.toUserDto(data, true)
      );
    },

    /**
     * Updates user data.
     * @param {UserAggregate} user
     * @returns {Promise.<UserAggregate>}
     */
    update(user) {
      return update(this.transformer.toUserDto(user, false)).then((data) =>
        data === null ? null : this.transformer.toUserDto(data, true)
      );
    },
  };
}

export default createUserRepo;
