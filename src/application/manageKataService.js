// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import { kataTransformer } from './transformers/kataTransformer';
import ForbiddenError from './exceptions/ForbiddenError';
import UnauthorizedError from './exceptions/UnauthorizedError';

const checkAccess = (authSession) => {
  if (!authSession.isAuthenticated()) {
    return Promise.reject(new UnauthorizedError('You need to be signed in.'));
  }
  if (!authSession.isAdmin()) {
    return Promise.reject(new ForbiddenError('You need to be an admin.'));
  }
  return false;
};

/**
 * Factory function for a kata administration application service
 * @param {Object} dependencies
 * @param {KataRepo} dependencies.kataRepo
 * @param {AuthSession} dependencies.authSession
 */
const createManageKataService = ({ authSession, kataRepo }) => ({
  /**
   * Get all available tags
   * @returns {Promise.<string[]>} tag list
   */
  getAllTags() {
    return kataRepo
      .getAllTags()
      .then((tags) =>
        tags.map((tagEntity) => (tagEntity.tag ? tagEntity.tag : tagEntity))
      );
  },
  /**
   * Save new Kata
   * @param {string} kataId
   * @returns {Promise.<KataDto>} created kata dto
   */
  getKataWithId(kataId) {
    return kataRepo.getKataWithId(kataId).then(kataTransformer.toKataDto);
  },
  /**
   * Remove a Kata
   * @param {string} kataId
   * @returns {Promise.<boolean>} true if it has been removed; false if not found
   */
  remove(kataId) {
    const rejected = checkAccess(authSession);
    if (rejected) return rejected;
    return kataRepo.remove(kataId);
  },
  /**
   * Save new Kata
   * @param {KataDto} dto
   * @returns {Promise.<KataDto>} created kata dto
   */
  save(dto) {
    const rejected = checkAccess(authSession);
    if (rejected) return rejected;
    const instance = kataTransformer.toKataModel(dto, { repo: kataRepo });
    return kataRepo.save(instance).then(kataTransformer.toKataDto);
  },
  /**
   * Update a Kata
   * @param {KataDto} dto
   * @returns {Promise.<KataDto>} updated kata dto
   */
  update(dto) {
    const rejected = checkAccess(authSession);
    if (rejected) return rejected;
    if (!dto.id) {
      return Promise.reject(
        new TypeError('A Kata without id cannot be updated')
      );
    }
    const instance = kataTransformer.toKataModel(dto, { repo: kataRepo });
    return kataRepo.update(instance).then(kataTransformer.toKataDto);
  },
});

export default createManageKataService;
