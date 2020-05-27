import mockAxios from 'jest-mock-axios';

import trainingRepo from './training';

describe('trainingRepo (api)', () => {
  const entity = mockTrainingEntity();
  const dto = mockTrainingDto();

  // eslint-disable-next-line jest/no-hooks
  afterEach(() => {
    mockAxios.reset();
  });

  describe('when getting all trainings of the user', () => {
    it('should GET from api', async () => {
      expect.hasAssertions();
      trainingRepo.getAllTrainingsOfUser(mockUser().id);
      expect(mockAxios.get).toHaveBeenCalledWith('/api/trainings/');
    });
  });

  describe('when getting a training', () => {
    it('should GET from api', async () => {
      expect.hasAssertions();
      const promise = trainingRepo.getTrainingWithId(entity.id);
      expect(mockAxios.get).toHaveBeenCalledWith(`/api/trainings/${entity.id}`);
      mockAxios.mockResponse({
        status: 200,
        data: dto,
      });
      const response = await promise;
      expect(response).toBeTrainingEntity();
    });
  });

  describe('when saving in', () => {
    it('should POST to api', () => {
      expect.hasAssertions();
      trainingRepo.save(entity);
      expect(mockAxios.post).toHaveBeenCalledWith('/api/trainings/', dto);
    });
  });

  describe('when update in', () => {
    it('should PATCH to api "code" and "success" only', () => {
      expect.hasAssertions();
      trainingRepo.update(entity);
      expect(mockAxios.patch).toHaveBeenCalledWith(
        `/api/trainings/${entity.id}`,
        {
          code: entity.code,
          success: entity.success,
        }
      );
    });
  });
});
