import { commerce } from 'faker';
import { compose, view, lensProp } from 'ramda';
import { uniqPopulator } from '../populator';
import { tagId } from '../../models/tag';
import { records as katas } from './kata';
import { randomNaturalWithZero } from '../../../../utils/math';

const numTags = 10;

const tag = (val) => ({
  id: tagId(val),
  tag: val,
});
const fakeTag = () => tag(commerce.productAdjective());
const records = uniqPopulator(fakeTag)(numTags);

const idLens = lensProp('id');
const getRandomItem = (arr) => arr[randomNaturalWithZero(arr.length)];
const getRandomId = compose(view(idLens), getRandomItem);
const association = () => ({
  kataId: getRandomId(katas),
  tagId: getRandomId(records),
});
const associations = uniqPopulator(association)(30);

export default {
  up: (queryInterface) =>
    queryInterface
      .bulkInsert('tag', records, {})
      .then(() => queryInterface.bulkInsert('kata_tags', associations, {})),
  down: (queryInterface) =>
    queryInterface
      .bulkDelete('kata_tags', null, {})
      .then(() => queryInterface.bulkDelete('tag', null, {})),
};
