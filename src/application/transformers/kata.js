import tagDto from './tag';

const kataDto = (kataModel) => {
  const { details, name, code, test, tags = [] } = kataModel;
  return { details, name, code, test, tags: tagDto(tags) };
};

export default kataDto;
