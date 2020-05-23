import kataDto from './kata';

const trainingDtoKeys = ['id', 'code', 'kataId', 'success', 'userId'];

const trainingDto = ({
  id = '',
  code = '',
  kataId = '',
  success = false,
  userId = '',
}) => ({
  id,
  code,
  kataId,
  success,
  userId,
});

const trainingWithKataDataDto = ({ id, code, kata = {}, success, userId }) => {
  const dto = trainingDto({ id, code, success, userId });
  delete dto.kataId;
  dto.kata = kataDto(kata);
  return dto;
};

export { trainingDto, trainingDtoKeys, trainingWithKataDataDto };
