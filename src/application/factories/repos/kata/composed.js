import { composedGetterAsync, composedSetterAsync } from '../../utils';

/**
 * Create a composed kata repository.
 * It does nouses use kataRepo factory to prevent from transforming
 * KataAggregates. Composed kata repositories must receive a KataAggregate,
 * not a dto.
 * @param  {...any} kataRepos
 */
const createComposedKataRepo = (...kataRepos) => ({
  /**
   * Return all the katas
   * @returns {Promise.<KataAggregate[]>} the list of katas
   */
  getAllKatas: composedGetterAsync(kataRepos, 'getAllKatas'),
  /**
   * Return all the katas that are tagged with the given tag
   * @param {string} tag - tag to query
   * @returns {Promise.<KataAggregate[]>} the list of katas
   */
  getAllKatasWithTag: composedGetterAsync(kataRepos, 'getAllKatasWithTag', []),
  getAllTags: composedGetterAsync(kataRepos, 'getAllTags'),
  /**
   * Fetch a kata
   * @param {string} id - id of the target kata
   * @returns {Promise.<KataAggregate>} kata
   */
  getKataWithId: composedGetterAsync(kataRepos, 'getKataWithId', null),
  /**
   * Removes the kata with the given id
   * @param {string} kataId id of the kata to be deleted
   * @returns {Promise.<boolean>} true if it has been deleted; false if not found
   */
  remove: composedSetterAsync(kataRepos, 'remove'),
  /**
   * Save new Kata
   * @param {KataAggregate} kata
   * @returns {Promise.<KataAggregate>} created kata
   */
  save: composedSetterAsync(kataRepos, 'save'),
  /**
   * Update a Kata
   * @param {KataAggregate} kata
   * @returns {Promise.<KataAggregate>} updated kata
   */
  update: composedSetterAsync(kataRepos, 'update'),
});

export default createComposedKataRepo;
