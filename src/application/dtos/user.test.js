import { userResponseDto, userRequestDto } from './user';

const user = mockUser();

describe('user DTO', () => {
  describe('when is a response', () => {
    const userRes = userResponseDto(user);
    it('should be contain user data', () => {
      expect.assertions(1);
      expect(userRes).toBeUserDto();
    });
    it('should not return sensible data as password', () => {
      expect.assertions(1);
      expect(userRes.password).toBeUndefined();
    });
  });

  describe('when is a request', () => {
    const userReq = userRequestDto(user);
    it('should be contain user data', () => {
      expect.assertions(1);
      expect(userReq).toBeUserDto();
    });
    it('should include password if it has been provided', () => {
      expect.assertions(1);
      expect(userReq.password).toBeString();
    });
  });
});
