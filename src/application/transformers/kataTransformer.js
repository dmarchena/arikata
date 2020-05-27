// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import * as R from 'ramda';
import kataDto, { kataDtoKeys } from '../dtos/kata';
import Kata from '../../domain/kata';

const tagDto = (tagEntity) => (tagEntity && tagEntity.tag) || undefined;

/**
 * Return a DTO with Kata domain object data
 * @param {KataAggregate} kata - Kata domain object
 * @returns {KataDto} DTO
 */
const createKataDto = R.compose(
  kataDto,
  R.over(R.lensProp('tags'), R.compose(R.map(tagDto), R.defaultTo([]))),
  R.pickAll(kataDtoKeys)
);

/**
 * Return a DTO with Kata domain object data
 * @param {KataAggregate|KataAggregate[]} kata - Kata domain object
 * @return {KataDto|KataDto[]} DTO
 */
const toKataDto = (kata) => {
  if (Array.isArray(kata)) {
    return kata.map(createKataDto);
  }
  return createKataDto(kata);
};

/**
 * Return an instance of Kata domain object
 * @param {KataDto|KataDto[]} dto - DTO to build domain object from
 * @param {Object} dependencies - Dependencies object
 * @param {KataRepo} dependencies.repo - Kata repository
 * @return {KataAggregate|KataAggregate[]} Kata domain object
 */
const toKataModel = (dto, dependencies) => {
  if (Array.isArray(dto)) {
    return dto.map((item) => Kata(dependencies).create(item.id, item));
  }
  return Kata(dependencies).create(dto.id, dto);
};

/**
 * Return a kata transformer with injected dependencies
 * @param {Object} dependencies - Dependencies object
 * @param {KataRepo} dependencies.repo - Kata repository
 * @return {Object} Kata transformer
 */
const createKataTransformer = (dependencies) => ({
  toKataDto: (kata) => toKataDto(kata),
  toKataModel: (dto) => toKataModel(dto, dependencies),
});

const kataTransformer = {
  toKataDto,
  toKataModel,
};

export { kataTransformer, createKataTransformer };
