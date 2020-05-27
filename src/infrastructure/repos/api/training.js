import { createHttpClient } from './utils';
import createTrainingRepo from '../../../application/factories/repos/training';

const endpoints = {
  get: (id = '') => `/api/trainings/${id}`,
  save: '/api/trainings/',
  update: (id) => `/api/trainings/${id}`,
};

const request = createHttpClient();

const getAllTrainingsOfUser = () => request.get(endpoints.get());

const getTrainingWithId = (trainingId) =>
  request.get(endpoints.get(trainingId));

const save = (training) => request.post(endpoints.save, training);

const update = (training) =>
  request.patch(endpoints.update(training.id), {
    code: training.code,
    success: training.success,
  });

const userRepo = createTrainingRepo({
  getAllTrainingsOfUser,
  getTrainingWithId,
  save,
  update,
});

export default userRepo;
