import { commerce } from 'faker';
import { tagId } from '../models/tag';

const data = {
  tagId: tagId('testa'),
  kataId: '0fae2543-774d-4c58-b750-4a6dcc385811',
};

const KataTagsMock = (dbMock) =>
  dbMock.define('kata_tags', data, {
    instanceMethods: {},
  });

export default KataTagsMock;
