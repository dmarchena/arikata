import data from './prod.json';

const kata = (jsonData) => {
  const res = {
    ...jsonData,
  };
  delete res.tags;
  return res;
};

export const records = data.katas.map(kata);

export default {
  up: (queryInterface) => queryInterface.bulkInsert('kata', records, {}),
  down: (queryInterface) => queryInterface.bulkDelete('kata', null, {}),
};
