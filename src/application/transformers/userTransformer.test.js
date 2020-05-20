import { userTransformer } from './userTransformer';

const user = mockUser();

describe('user transformer', () => {
  describe('when transforming to DTO', () => {
    it('should return a DTO', () => {
      expect.assertions(2);
      expect(userTransformer.toUserDto(user, true)).toBeUserDto();
      expect(userTransformer.toUserDto(user, false)).toBeUserDto();
    });
  });

  describe('when transforming to domain object', () => {
    it('should return an entity', () => {
      expect.assertions(1);
      const dto = userTransformer.toUserDto(user, true);
      expect(userTransformer.toUserModel(dto, { repo: {} })).toBeUserEntity();
    });
  });
});
