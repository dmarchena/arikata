import Training from '../../../domain/training';

import mockJson from '../../../mock.json';
import NotFoundError from '../../../application/exceptions/NotFoundError';
import createTrainingRepo from '../../../application/factories/repos/training';

const trainings = [
  Training.create(mockJson.training.id, mockJson.training),
  Training.create(undefined, mockJson.training),
];

const getTrainingWithId = (id) => {
  const targetIndex = trainings.findIndex((item) => item.id === id);
  if (targetIndex > -1) {
    return Promise.resolve(trainings[targetIndex]);
  }
  return Promise.reject(new NotFoundError('not found'));
};

const save = (dto) => {
  const entity = Training.create(dto.id, dto);
  trainings.push(entity);
  return Promise.resolve(entity);
};

const update = (dto) => {
  const targetIndex = trainings.findIndex((item) => item.id === dto.id);
  if (targetIndex > -1) {
    trainings[targetIndex] = Training.create(dto.id, dto);
    return Promise.resolve(trainings[targetIndex]);
  }
  return Promise.reject(new NotFoundError('not found'));
};

const trainingRepo = createTrainingRepo({
  getTrainingWithId,
  save,
  update,
});

export default trainingRepo;
