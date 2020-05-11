/**
 * @typedef {Object} KataAggregate
 * @property {string} id uuid
 * @property {string} name The name of the kata
 * @property {string} details The information of the kata
 * @property {string} code The initial code of the kata
 * @property {string} test The test to validate the kata
 * @property {TagEntity[]} tags The tags assigned to the kata
 */

/**
 * @typedef {Object} KataDto
 * @property {string} id uuid
 * @property {string} name The name of the kata
 * @property {string} details The information of the kata
 * @property {string} code The initial code of the kata
 * @property {string} test The test to validate the kata
 * @property {string[]} tags The tags assigned to the kata
 */

/**
 * @typedef KataRepo
 * @property {function():Promise.<KataAggregate[]>} getAllKatas Return all the katas
 * @property {function(string):Promise.<KataAggregate[]>} getAllKatasWithTag Return all the katas that are tagged with the given tag
 * @property {function():Promise.<TagEntity[]>} getAllTags Return all the available tags
 * @property {function(string):Promise.<KataAggregate>} getKataWithId Fetch a kata
 * @property {function(KataAggregate):Promise.<KataAggregate>} save Save new Kata
 * @property {function(KataAggregate):Promise.<KataAggregate>} update Update a Kata
 */

/**
 * @typedef {Object} TagEntity
 * @property {string} id uuid
 * @property {string} tag The label of the kata
 */
