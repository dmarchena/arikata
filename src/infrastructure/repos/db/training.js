import createTrainingRepo from '../../../application/factories/repos/training';
import db from '../../db';
import NotFoundError from '../../../application/exceptions/NotFoundError';

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
  models.User.update(
    {
      trainingDto,
    },
    {
      returning: true,
      where: { id: trainingDto.id },
    }
  );

const userRepo = createTrainingRepo({
  getTrainingWithId: getTrainingWithId(db),
  save: save(db),
  update: update(db),
});

export default userRepo;
