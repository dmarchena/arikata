import createTrainingRepo from '../../../application/factories/repos/training';
import db from '../../db';
import NotFoundError from '../../../application/exceptions/NotFoundError';

const getAllTrainingsOfUser = (models) => (userId) =>
  models.Training.findAll({
    where: {
      userId,
    },
  });

const getTrainingWithId = (models) => (id) =>
  models.Training.findOne({
    where: {
      id,
    },
  }).then((result) => {
    if (!result) {
      return new NotFoundError(`Training does not exists`);
    }
    return result;
  });

const save = (models) => (trainingDto) => models.Training.create(trainingDto);

const update = (models) => (trainingDto) =>
  models.Training.update(
    {
      code: trainingDto.code,
      success: trainingDto.success,
    },
    {
      returning: true,
      where: { id: trainingDto.id },
    }
    // eslint-disable-next-line no-unused-vars
  ).then(([rowsUpdated, [updatedTraining]]) => updatedTraining);

const userRepo = createTrainingRepo({
  getAllTrainingsOfUser: getAllTrainingsOfUser(db),
  getTrainingWithId: getTrainingWithId(db),
  save: save(db),
  update: update(db),
});

export default userRepo;
