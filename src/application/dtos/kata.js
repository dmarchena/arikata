export const kataDtoKeys = ['id', 'details', 'name', 'code', 'test', 'tags'];

const kataDto = ({
  id = '',
  details = '',
  name = 'Mistery DTO',
  code = '',
  test = '',
  tags = [],
}) => ({
  id,
  details,
  name,
  code,
  test,
  tags,
});

export default kataDto;
