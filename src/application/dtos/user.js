const userDtoKeys = ['id', 'email', 'password', 'roles', 'accessToken'];

const userResponseDto = ({ id, email, roles, accessToken = '' }) => ({
  id,
  email,
  roles,
  accessToken,
});

const userRequestDto = ({ id, email, password, roles, accessToken = '' }) => ({
  id,
  email,
  password,
  roles,
  accessToken,
});

export { userDtoKeys, userRequestDto, userResponseDto };
