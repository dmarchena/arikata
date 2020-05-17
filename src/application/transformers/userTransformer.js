// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import { userRequestDto, userResponseDto } from '../dtos/user';
import User from '../../domain/user';

/**
 * Return a DTO with User domain object data
 * @param {UserAggregate} user - User domain object
 * @param {boolean} isResponse - If it is response, data must be securized
 * @return {Object} DTO
 */
const toUserDto = (user, isResponse = true) =>
  isResponse ? userResponseDto(user) : userRequestDto(user);

/**
 * Return an instance of User domain object
 * @param {Object} dto - DTO to build domain object from
 * @param {Object} dependencies - Dependencies object
 * @param {UserRepo} dependencies.repo - User repository
 * @return {UserAggregate} User domain object
 */
const toUserModel = (dto, dependencies) => {
  return User(dependencies).create(dto.id, dto);
};

/**
 * Return a user transformer with injected dependencies
 * @param {Object} dependencies - Dependencies object
 * @param {UserRepo} dependencies.repo - User repository
 * @return {Object} User transformer
 */
const createUserTransformer = (dependencies) => ({
  toUserDto: (user, isResponse = true) => toUserDto(user, isResponse),
  toUserModel: (dto) => toUserModel(dto, dependencies),
});

const userTransformer = {
  toUserDto,
  toUserModel,
};

export { userTransformer, createUserTransformer };
