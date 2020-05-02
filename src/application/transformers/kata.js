/* eslint-disable import/prefer-default-export */
import * as R from 'ramda';
import tagDto from '../dtos/tag';
import kataDto, { kataDtoKeys } from '../dtos/kata';

export const toKataDto = R.compose(
  kataDto,
  R.over(R.lensProp('tags'), R.compose(R.map(tagDto), R.defaultTo([]))),
  R.pickAll(kataDtoKeys)
);
