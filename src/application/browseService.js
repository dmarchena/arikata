// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import { kataTransformer } from './transformers/kataTransformer';
import { trainingTransformer } from './transformers/trainingTransformer';

const responseToDtoArray = (res = []) => res.map(kataTransformer.toKataDto);

/**
 * Factory function for a browse application service
 * @param {Object} dependencies
 * @param {KataRepo} dependencies.kataRepo
 * @param {TrainingRepo} dependencies.trainingRepo
 */
const createBrowseService = ({ kataRepo, trainingRepo }) => ({
  /**
   * Return all the katas
   * @returns {Promise.<KataDto[]>} the list of katas
   */
  getAllKatas() {
    return kataRepo.getAllKatas().then(responseToDtoArray);
  },

  /**
   * Return all the katas done by the given user
   * @param {string} userId - the id of the user
   * @returns {Promise.<TrainingDto[]>} the list of user trainings
   */
  getAllKatasDoneByUser(userId) {
    return trainingRepo
      .getAllTrainingsOfUser(userId)
      .then((res) => res.map(trainingTransformer.toTrainingDto));
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
