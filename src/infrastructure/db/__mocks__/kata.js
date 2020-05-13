const fakeKata = (kataMock) => {
  const kata = {
    ...kataMock,
  };
  delete kata.tags;
  return kata;
};

const KataMock = (dbMock, kataMock) =>
  dbMock.define('kata', fakeKata(kataMock), {
    instanceMethods: {},
  });

export default KataMock;
