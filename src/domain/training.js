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
  // eslint-disable-next-line no-shadow
  addNewAttempt(code, success) {
    this.code = code;
    this.success = success;
  },
});

const Training = {
  create: factory(),
};

export default Training;
