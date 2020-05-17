const userDtoKeys = ['id', 'email', 'password', 'role', 'accessToken'];

const userResponseDto = ({ id, email, role, accessToken = '' }) => ({
  id,
  email,
  role,
  accessToken,
});

const userRequestDto = ({ id, email, password, role, accessToken = '' }) => ({
  id,
  email,
  password,
  role,
  accessToken,
});

export { userDtoKeys, userRequestDto, userResponseDto };
