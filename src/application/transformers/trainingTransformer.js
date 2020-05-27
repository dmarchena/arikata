// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import { trainingDto, trainingWithKataDataDto } from '../dtos/training';
import { kataTransformer } from './kataTransformer';
import Training from '../../domain/training';

/**
 * Return a DTO with training domain object data
 * @param {TrainingAggregate} training - Training domain object
 * @param {KataAggregate} [kata] - Kata domain object
 * @return {TrainingDto} DTO
 */
const toTrainingDto = (training, kata = false) =>
  kata === false
    ? trainingDto(training)
    : trainingWithKataDataDto({
        ...training,
        kata: kataTransformer.toKataDto(kata),
      });

/**
 * Return an instance of Training domain object
 * @param {TrainingDto} dto - DTO to build domain object from
 * @return {TrainingAggregate} Training domain object
 */
const toTrainingModel = (dto) => {
  const hasKataDto = !!(dto.kata?.id ?? false);
  const trainingData = hasKataDto
    ? {
        ...dto,
        kataId: dto.kata.id,
      }
    : dto;
  return Training.create(dto.id, trainingData);
};

const trainingTransformer = {
  toTrainingDto,
  toTrainingModel,
};

// eslint-disable-next-line import/prefer-default-export
export { trainingTransformer };
