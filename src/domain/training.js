import { v4 } from 'uuid';

const factory = () => (
  id,
  { code = '', kataId = '', userId = '', success = false } = {}
) => ({
  id: id ?? v4(),
  code,
  kataId,
  userId,
  success,
});

const Training = {
  create: factory(),
};

export default Training;
