import { tagId } from '../models/tag';

const tag = (val) => ({
  id: tagId(val),
  tag: val,
});

const TagMock = (dbMock) =>
  dbMock.define('tag', tag('test'), {
    instanceMethods: {},
  });

export default TagMock;
