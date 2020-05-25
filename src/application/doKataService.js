// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import { isEmptyString } from './validators/empty';
import ForbiddenError from './exceptions/ForbiddenError';
import UnauthorizedError from './exceptions/UnauthorizedError';
import Training from '../domain/training';
import { trainingTransformer } from './transformers/trainingTransformer';

/**
 * Helper function to get a Training aggregate only if signed in user is
 * its author.
 * @param {string} trainingId
 * @param {TrainingRepo} trainingRepo
 * @param {AuthSession} authSession
 * @param {Promise.<TrainingAggregate>}
 */
async function getTrainingAggregate(
  trainingId,
  trainingRepo,
  authSession,
  forceCheckIfUserIdIs = false
) {
  if (!authSession.isAuthenticated()) {
    throw new UnauthorizedError('You must be signed in to get a training.');
  }
  const training = await trainingRepo.getTrainingWithId(trainingId);
  if (
    !authSession.isUser(training.userId) ||
    (forceCheckIfUserIdIs && forceCheckIfUserIdIs !== training.userId)
  ) {
    throw new ForbiddenError(
      'You must cannot access to another user trainings.'
    );
  }
  return training;
}
/**
 * Factory function for a user application service
 * @param {Object} dependencies
 * @param {AuthSession} dependencies.authSession
 * @param {KataRepo} dependencies.kataRepo
 * @param {TrainingRepo} dependencies.trainingRepo
 */
const createDoKataService = ({ authSession, kataRepo, trainingRepo }) => ({
  /**
   * Fetch the training with the given id.
   * @param {string} trainingId The id of the training you want to fetch
   * @returns {Promise.<TrainingDto>}
   */
  async getTrainingWithId(trainingId) {
    const training = await getTrainingAggregate(
      trainingId,
      trainingRepo,
      authSession
    );
    const kata = await kataRepo.getKataWithId(training.kataId);
    return trainingTransformer.toTrainingDto(training, kata);
  },

  /**
   * Start doing the kata with the given id.
   * @param {string} kataId kataId
   * @returns {Promise.<TrainingDto>}
   */
  startTraining(kataId) {
    return kataRepo.getKataWithId(kataId).then((kata) => {
      const newTraining = kata.startTraining();
      return trainingTransformer.toTrainingDto(newTraining, kata);
    });
  },

  /**
   * Save a new training
   * @param {TrainingDto} training dto to create
   * @returns {Promise.<TrainingDto>}
   */
  saveTraining({ id, code, kataId, success = false, userId }) {
    if (!authSession.isAuthenticated() || isEmptyString(userId)) {
      return Promise.reject(
        new UnauthorizedError('You must be signed in to save your result.')
      );
    }

    if (isEmptyString(code)) {
      // eslint-disable-next-line no-param-reassign
      success = false;
    }

    const instance = Training.create(id, {
      code,
      kataId,
      userId,
      success,
    });

    return trainingRepo.save(instance).then(trainingTransformer.toTrainingDto);
  },

  /**
   * Update the code and result of an existing training
   * @param {string} trainingId the id of the training
   * @param {string} code the new code
   * @param {string} success the new result
   * @param {string} forceCheckIfUserIdIs the userId for an additional ownership checking
   * @returns {Promise.<TrainingDto>}
   */
  async updateTraining(
    trainingId,
    code,
    success,
    forceCheckIfUserIdIs = false
  ) {
    const training = await getTrainingAggregate(
      trainingId,
      trainingRepo,
      authSession,
      forceCheckIfUserIdIs
    );
    training.addNewAttempt(code, success);
    return trainingRepo
      .update(training)
      .then(trainingTransformer.toTrainingDto);
  },
});

export default createDoKataService;
