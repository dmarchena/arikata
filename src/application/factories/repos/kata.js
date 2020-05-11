// eslint-disable-next-line
///<reference path="../../../jsdoc-types.js" />

import { createKataTransformer } from '../../transformers/kataTransformer';
import { isRequired } from '../utils';

/**
 * Factory function for a kata repository
 * @returns {KataRepo}
 */
function createKataRepo({
  getAllKatas = isRequired('getAllKatas'),
  getAllTags = isRequired('getAllTags'),
  getAllKatasWithTag = isRequired('getAllKatasWithTag'),
  getKataWithId = isRequired('getKataWithId'),
  save = isRequired('save'),
  update = isRequired('update'),
}) {
  return {
    transformer: createKataTransformer({ repo: this }),
    /**
     * Return all the katas
     * @returns {Promise.<KataAggregate[]>} the list of katas
     */
    getAllKatas() {
      return getAllKatas().then(this.transformer.toKataModel);
    },
    /**
     * Return all the katas that are tagged with the given tag
     * @param {string} tag - tag to query
     * @returns {Promise.<KataAggregate[]>} the list of katas
     */
    getAllKatasWithTag(tag) {
      return getAllKatasWithTag(tag).then(this.transformer.toKataModel);
    },
    getAllTags() {
      return getAllTags();
    },
    /**
     * Fetch a kata
     * @param {string} id - id of the target kata
     * @returns {Promise.<KataAggregate>} kata
     */
    getKataWithId(id) {
      return getKataWithId(id).then(this.transformer.toKataModel);
    },
    /**
     * Save new Kata
     * @param {KataAggregate} kata
     * @returns {Promise.<KataAggregate>} created kata
     */
    save(kata) {
      return save(this.transformer.toKataDto(kata)).then(
        this.transformer.toKataModel
      );
    },
    /**
     * Update a Kata
     * @param {KataAggregate} kata
     * @returns {Promise.<KataAggregate>} updated kata
     */
    update(kata) {
      return update(this.transformer.toKataDto(kata)).then(
        this.transformer.toKataModel
      );
    },
  };
}

export default createKataRepo;
