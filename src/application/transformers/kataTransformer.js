/* eslint-disable import/prefer-default-export */
import * as R from 'ramda';
import kataDto, { kataDtoKeys } from '../dtos/kata';
import kata from '../../domain/kata';

const tagDto = (tagEntity) => (tagEntity && tagEntity.tag) || undefined;

const toKataDto = R.compose(
  kataDto,
  R.over(R.lensProp('tags'), R.compose(R.map(tagDto), R.defaultTo([]))),
  R.pickAll(kataDtoKeys)
);

const toKataModel = (dto) => kata(dto.id, dto);

export default {
  toKataDto,
  toKataModel,
};
