// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import { kataTransformer } from './transformers/kataTransformer';

/**
 * Factory function for a kata administration application service
 * @param {KataRepo} kataRepo
 */
const createManageKataService = (kataRepo) => ({
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
    return kataRepo.remove(kataId);
  },
  /**
   * Save new Kata
   * @param {KataDto} dto
   * @returns {Promise.<KataDto>} created kata dto
   */
  save(dto) {
    const instance = kataTransformer.toKataModel(dto, { repo: kataRepo });
    return kataRepo.save(instance).then(kataTransformer.toKataDto);
  },
  /**
   * Update a Kata
   * @param {KataDto} dto
   * @returns {Promise.<KataDto>} updated kata dto
   */
  update(dto) {
    if (dto.id) {
      const instance = kataTransformer.toKataModel(dto, { repo: kataRepo });
      return kataRepo.update(instance).then(kataTransformer.toKataDto);
    }
    throw new Error('A Kata without id cannot be updated');
  },
});

export default createManageKataService;
