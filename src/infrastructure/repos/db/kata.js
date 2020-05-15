import { compose, includes, partition, symmetricDifference, __ } from 'ramda';
import createKataRepo from '../../../application/factories/repos/kata';
import db from '../../db';
import { tagId } from '../../db/models/tag';
import { kataTransformer } from '../../../application/transformers/kataTransformer';

const tagEntity = (str) => ({
  id: tagId(str),
  tag: str,
});

const parseTagEntitiesFromStrings = (arr) => arr.map(tagEntity);

const parseDbModelsFromTagEntities = (tags = []) =>
  tags.map((entity) => db.Tag.build(entity));

const parseTagEntitiesFromDbModels = (tags = []) =>
  tags.map((t) => ({
    id: t.id,
    tag: t.tag,
  }));

const diffTags = (newTags, oldTags) =>
  compose(
    partition(includes(__, newTags)),
    symmetricDifference(newTags)
  )(oldTags);

const getAllKatas = (models) => () =>
  models.Kata.findAll({ include: models.Kata.Tags });

const getAllTags = (models) => () =>
  models.Tag.findAll().then(parseTagEntitiesFromDbModels);

const getAllKatasWithTag = (models) => (tag) =>
  models.Tag.findOne({
    where: { tag },
    include: {
      association: models.Tag.Katas,
      include: models.Kata.Tags,
    },
  }).then(({ kata = [] } = {}) => kata);

const getKataWithId = (models) => (kataId) =>
  models.Kata.findByPk(kataId, {
    include: models.Kata.Tags,
  });

const remove = (models) => (kataId) =>
  models.Kata.destroy({
    where: {
      id: kataId,
    },
  }).then((rows) => rows > 0);

const save = (models) => async (kataDto) => {
  // Update Tag table
  const tagsEntities = parseTagEntitiesFromStrings(kataDto.tags);
  await Promise.all(tagsEntities.map((t) => models.Tag.upsert(t)));

  // Insert new kata
  const kataData = {
    ...kataDto,
  };
  delete kataData.tags;
  const newKata = await models.Kata.create(kataData);

  // Relate new kata with tags
  newKata.addTags(parseDbModelsFromTagEntities(tagsEntities));

  // Build result saving new db queries
  const result = {
    ...kataTransformer.toKataDto(newKata),
    tags: kataDto.tags,
  };

  return Promise.resolve(result);
};

const update = (models) => async (kataDto) => {
  // Insert new kata
  const kataToUpdate = await models.Kata.update(
    {
      name: kataDto.name,
      details: kataDto.details,
      code: kataDto.code,
      test: kataDto.test,
      tags: kataDto.tags,
    },
    {
      returning: true,
      where: { id: kataDto.id },
      include: [models.Kata.Tags],
    }
    // eslint-disable-next-line no-unused-vars
  ).then(([rowsUpdate, [updatedKata]]) => updatedKata);

  const newTags = parseTagEntitiesFromStrings(kataDto.tags);
  const oldTags = parseTagEntitiesFromDbModels(await kataToUpdate.getTags());
  const [tagsToAdd, tagsToRemove] = diffTags(newTags, oldTags);

  if (tagsToAdd.length > 0) {
    await Promise.all(tagsToAdd.map((t) => models.Tag.upsert(t)));
    await kataToUpdate.addTags(parseDbModelsFromTagEntities(tagsToAdd));
  }
  if (tagsToRemove.length > 0) {
    await kataToUpdate.removeTags(parseDbModelsFromTagEntities(tagsToRemove));
  }

  const result = {
    ...kataTransformer.toKataDto(kataToUpdate),
    tags: newTags,
  };

  return Promise.resolve(result);
};

const kataRepo = createKataRepo({
  getAllKatas: getAllKatas(db),
  getAllTags: getAllTags(db),
  getAllKatasWithTag: getAllKatasWithTag(db),
  getKataWithId: getKataWithId(db),
  remove: remove(db),
  save: save(db),
  update: update(db),
});

export default kataRepo;
