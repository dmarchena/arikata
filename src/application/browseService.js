// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import { kataTransformer } from './transformers/kataTransformer';

const responseToDtoArray = (res = []) => res.map(kataTransformer.toKataDto);

/**
 * Factory function for a browse application service
 * @param {KataRepo} kataRepo
 */
const createBrowseService = (kataRepo) => ({
  /**
   * Return all the katas
   * @returns {Promise.<KataDto[]>} the list of katas
   */
  getAllKatas() {
    return kataRepo.getAllKatas().then(responseToDtoArray);
  },
  /**
   * Return all the katas that are tagged with the given tag
   * @param {string} tag - tag to query
   * @returns {Promise.<KataDto[]>} the list of katas
   */
  getAllKatasWithTag(tag) {
    return kataRepo.getAllKatasWithTag(tag).then(responseToDtoArray);
  },
  /**
   * Fetch a kata
   * @param {string} id - id of the target kata
   * @returns {Promise.<KataDto>} kata
   */
  getKataWithId(kataId) {
    return kataRepo.getKataWithId(kataId).then(kataTransformer.toKataDto);
  },
});

export default createBrowseService;
