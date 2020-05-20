import { createHttpClient } from './utils';
import createKataRepo from '../../../application/factories/repos/kata';

const endpoints = {
  base: '/api/katas/',
  specific: (id) => `/api/katas/${id}`,
  create: '/api/katas/',
  tags: '/api/katas/tags/',
};

const request = createHttpClient();

const getAllKatas = () => request.get(endpoints.base);

const getAllTags = () => request.get(endpoints.tags);

const getAllKatasWithTag = (tag) =>
  request.get(endpoints.base, {
    params: {
      tag,
    },
  });

const getKataWithId = (kataId) => request.get(endpoints.specific(kataId));

const remove = (kataId) =>
  request.delete(endpoints.specific(kataId)).then((res) => res.status === 204);

const save = (kataDto) => request.post(endpoints.create, kataDto);

const update = (kataDto) =>
  request.put(endpoints.specific(kataDto.id), {
    name: kataDto.name,
    details: kataDto.details,
    code: kataDto.code,
    test: kataDto.test,
    tags: kataDto.tags,
  });

const kataRepo = createKataRepo({
  getAllKatas,
  getAllTags,
  getAllKatasWithTag,
  getKataWithId,
  remove,
  save,
  update,
});

export default kataRepo;
