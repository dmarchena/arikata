// eslint-disable-next-line
///<reference path="../../../jsdoc-types.js" />

import { isRequired } from '../utils';
import { trainingTransformer } from '../../transformers/trainingTransformer';

/**
 * Factory function for a training repository
 * @returns {TrainingRepo}
 */
function createTrainingRepo({
  getTrainingWithId = isRequired('getTrainingWithId'),
  save = isRequired('save'),
  update = isRequired('update'),
}) {
  return {
    transformer: trainingTransformer,

    /**
     * Fetch a training
     * @param {string} id The id of the targeted training
     * @returns {Promise.<TrainingAggregate>}
     */
    getTrainingWithId(id) {
      return getTrainingWithId(id).then(this.transformer.toTrainingModel);
    },

    /**
     * Save new training.
     * @param {TrainingAggregate} training
     * @returns {Promise.<TrainingAggregate>}
     */
    save(training) {
      return save(this.transformer.toTrainingDto(training)).then(
        this.transformer.toTrainingModel
      );
    },

    /**
     * Modify a training.
     * @param {TrainingAggregate} training
     * @returns {Promise.<TrainingAggregate>}
     */
    update(training) {
      return update(this.transformer.toTrainingDto(training)).then(
        this.transformer.toTrainingModel
      );
    },
  };
}

export default createTrainingRepo;
