const fake = (trainingMock) => ({
  ...trainingMock,
});

const TrainingMock = (dbMock, trainingMock) =>
  dbMock.define('training', fake(trainingMock), {
    instanceMethods: {},
  });

export default TrainingMock;
