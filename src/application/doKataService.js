// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import { isEmptyString } from './validators/empty';
import PermissionDeniedError from './exceptions/PermissionDeniedError';
import Training from '../domain/training';
import { trainingTransformer } from './transformers/trainingTransformer';

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
    if (!authSession.isAuthenticated()) {
      return new PermissionDeniedError(
        'You must be signed in to get a training.'
      );
    }
    const training = await trainingRepo.getTrainingWithId(trainingId);
    if (!authSession.isUser(training.userId)) {
      return new PermissionDeniedError(
        'You must cannot access to another user trainings.'
      );
    }
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
   * Start doing the kata with the given id.
   * @param {string} kataId kataId
   * @returns {Promise.<TrainingDto>}
   */
  saveTraining({ id, code, kataId, success = false, userId }) {
    if (!authSession.isAuthenticated() || isEmptyString(userId)) {
      return new PermissionDeniedError(
        'You must be signed in to save your result.'
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
});

export default createDoKataService;
