const entry = (kata, tag) => ({
  tagId: tag.id,
  kataId: kata.id,
});

// Use this solution: https://github.com/BlinkUX/sequelize-mock/issues/42#issuecomment-498746414
const KataTagsMock = (dbMock, kataMock) => {
  const KataTags = dbMock.define('kata_tags');
  KataTags.$queueResult(
    kataMock.tags.map((tag) => KataTags.build(entry(kataMock, tag)))
  );
  return KataTags;
};

export default KataTagsMock;
