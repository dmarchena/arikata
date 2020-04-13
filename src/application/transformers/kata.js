const kataDto = (kataModel) => {
  const { details, name, code, tests, tags = [] } = kataModel;
  return { details, name, code, tests, tags };
};

export default kataDto;
