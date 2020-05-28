import { uniq } from 'ramda';

import { tagId } from '../../models/tag';

import data from './prod.json';

const createTag = (val) => ({
  id: tagId(val),
  tag: val,
});

const createAssociation = (kata, tag) => ({
  kataId: kata.id,
  tagId: tag.id,
});

const tags = [];
const associations = [];

data.katas.forEach((kata) => {
  kata.tags.forEach((text) => {
    const tag = createTag(text);
    const association = createAssociation(kata, tag);
    tags.push(tag);
    associations.push(association);
  });
});

export default {
  up: (queryInterface) =>
    queryInterface
      .bulkInsert('tag', uniq(tags), {})
      .then(() => queryInterface.bulkInsert('kata_tags', associations, {})),
  down: (queryInterface) =>
    queryInterface
      .bulkDelete('kata_tags', null, {})
      .then(() => queryInterface.bulkDelete('tag', null, {})),
};
