import { compose, includes, partition, symmetricDifference, __ } from 'ramda';
import createKataRepo from '../../../application/factories/repos/kata/kata';
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

const save = (models, sequelize) => async (kataDto) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      // Update Tag table
      const tagsEntities = parseTagEntitiesFromStrings(kataDto.tags);
      await Promise.all(
        tagsEntities.map((tag) =>
          models.Tag.upsert(tag, {
            transaction: t,
          })
        )
      );

      // Insert new kata
      const kataData = {
        ...kataDto,
      };
      delete kataData.tags;
      const newKata = await models.Kata.create(kataData, {
        transaction: t,
      });

      // Relate new kata with tags
      newKata.addTags(parseDbModelsFromTagEntities(tagsEntities), {
        transaction: t,
      });

      // Build result saving new db queries
      return Promise.resolve({
        ...kataTransformer.toKataDto(newKata),
        tags: kataDto.tags,
      });
    });
    return Promise.resolve(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return Promise.reject(err);
  }
};

const update = (models, sequelize) => async (kataDto) => {
  try {
    const result = await sequelize.transaction(async (t) => {
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
          transaction: t,
        }
        // eslint-disable-next-line no-unused-vars
      ).then(([rowsUpdate, [updatedKata]]) => updatedKata);

      const newTags = parseTagEntitiesFromStrings(kataDto.tags);
      const oldTags = parseTagEntitiesFromDbModels(
        await kataToUpdate.getTags()
      );
      const [tagsToAdd, tagsToRemove] = diffTags(newTags, oldTags);

      if (tagsToAdd.length > 0) {
        await Promise.all(
          tagsToAdd.map((tag) =>
            models.Tag.upsert(tag, {
              transaction: t,
            })
          )
        );
        await kataToUpdate.addTags(parseDbModelsFromTagEntities(tagsToAdd), {
          transaction: t,
        });
      }
      if (tagsToRemove.length > 0) {
        await kataToUpdate.removeTags(
          parseDbModelsFromTagEntities(tagsToRemove),
          {
            transaction: t,
          }
        );
      }

      return Promise.resolve({
        ...kataTransformer.toKataDto(kataToUpdate),
        tags: newTags,
      });
    });

    return Promise.resolve(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return Promise.reject(err);
  }
};

const kataRepo = createKataRepo({
  getAllKatas: getAllKatas(db),
  getAllTags: getAllTags(db),
  getAllKatasWithTag: getAllKatasWithTag(db),
  getKataWithId: getKataWithId(db),
  remove: remove(db),
  save: save(db, db.sequelize),
  update: update(db, db.sequelize),
});

export default kataRepo;
