import { trainingDto, trainingWithKataDataDto } from './training';

describe('user DTO', () => {
  describe('when training data is needed only', () => {
    it('should return an object', () => {
      expect.assertions(1);
      expect(trainingDto({})).toStrictEqual(expect.any(Object));
    });

    it('should return an object with training data', () => {
      expect.assertions(1);
      expect(trainingDto({})).toBeTrainingDto();
    });
  });
  describe('when the kata info is needed too', () => {
    it('should return an object', () => {
      expect.assertions(1);
      expect(trainingWithKataDataDto({})).toStrictEqual(expect.any(Object));
    });

    it('should return an object with training data', () => {
      expect.assertions(1);
      expect(trainingWithKataDataDto({})).toBeTrainingDto();
    });

    it('should return an object with a property with kata data', () => {
      expect.assertions(2);
      expect(trainingWithKataDataDto({}).kata).toBeKataDto();
      expect(trainingWithKataDataDto({}).kataId).toBeUndefined();
    });
  });
});
