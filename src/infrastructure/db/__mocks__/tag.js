// Use this solution: https://github.com/BlinkUX/sequelize-mock/issues/42#issuecomment-498746414
const TagMock = (dbMock, kataMock) => {
  const Tag = dbMock.define('tag');
  Tag.$queueResult(kataMock.tags.map((tag) => Tag.build(tag)));
  return Tag;
};

export default TagMock;
