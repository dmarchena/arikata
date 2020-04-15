const bcryptjs = require('bcryptjs');

const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

const comparePassword = (password, encodedPassword) => {
  return bcryptjs.compareSync(password, encodedPassword);
};

module.exports = {
  comparePassword,
  encryptPassword,
};
