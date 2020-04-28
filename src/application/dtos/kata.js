export const kataDtoKeys = ['details', 'name', 'code', 'test', 'tags'];

const kataDto = ({ details, name, code, test, tags = [] }) => ({
  details,
  name,
  code,
  test,
  tags,
});

export default kataDto;
