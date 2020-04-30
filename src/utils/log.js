export const logMsg = (msg) => (data) => {
  // eslint-disable-next-line no-console
  console.log(msg, data);
  return data;
};

export const log = (data) => {
  // eslint-disable-next-line no-console
  console.log(data);
  return data;
};
