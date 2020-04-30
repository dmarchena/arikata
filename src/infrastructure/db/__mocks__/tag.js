import { commerce } from 'faker';
import { tagId } from '../models/tag';

const tag = (val) => ({
  id: tagId(val),
  tag: val,
});

const fakeTag = () => tag(commerce.productAdjective());

const TagMock = (dbMock) =>
  dbMock.define('tag', tag('test'), {
    instanceMethods: {},
  });

export default TagMock;
