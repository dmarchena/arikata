// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import { kataTransformer } from './transformers/kataTransformer';
import { trainingTransformer } from './transformers/trainingTransformer';
import UnauthorizedError from './exceptions/UnauthorizedError';

const responseToDtoArray = (res = []) => res.map(kataTransformer.toKataDto);

/**
 * Factory function for a browse application service
 * @param {Object} dependencies
 * @param {AuthSession} dependencies.authSession
 * @param {KataRepo} dependencies.kataRepo
 * @param {TrainingRepo} dependencies.trainingRepo
 */
const createBrowseService = ({ authSession, kataRepo, trainingRepo }) => ({
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
   * @returns {Promise.<KataDto[]>} the list of katas with user trainings
   */
  async getAllKatasDoneByUser(userId) {
    if (!authSession.isAuthenticated()) {
      return Promise.reject(new UnauthorizedError('You need to be signed in.'));
    }
    try {
      const katas = await this.getAllKatas();
      const trainings = await this.getAllTrainingsDoneByUser(userId);

      return katas.reduce((list, kata) => {
        const doneTrainings = trainings.filter((t) => t.kataId === kata.id);
        if (doneTrainings.length > 0) {
          list.push({
            ...kata,
            trainings: doneTrainings,
          });
        }
        return list;
      }, []);
    } catch (err) {
      return Promise.reject(err);
    }
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
   * Return all the trainings done by the given user
   * @param {string} userId - the id of the user
   * @returns {Promise.<TrainingDto[]>} the list of trainings
   */
  async getAllTrainingsDoneByUser(userId) {
    if (!authSession.isAuthenticated()) {
      return Promise.reject(new UnauthorizedError('You need to be signed in.'));
    }
    return trainingRepo
      .getAllTrainingsOfUser(userId)
      .then((res) =>
        res.map((item) => trainingTransformer.toTrainingDto(item))
      );
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
