import Axios from 'axios';
import createKataRepo from '../../../application/factories/repos/kata';

const endpoints = {
  base: '/api/katas/',
  specific: (id) => `/api/katas/${id}`,
  create: '/api/katas/',
  tags: '/api/tags/',
};

const responseData = (response) => response.data;

const getAllKatas = () => Axios.get(endpoints.base).then(responseData);

const getAllTags = () => Axios.get(endpoints.tags).then(responseData);

const getAllKatasWithTag = (tag) =>
  Axios.get(endpoints.base, {
    params: {
      tag,
    },
  }).then(responseData);

const getKataWithId = (kataId) =>
  Axios.get(endpoints.specific(kataId)).then(responseData);

const save = (kataDto) =>
  Axios.post(endpoints.base, kataDto).then(responseData);

const update = (kataDto) =>
  Axios.put(endpoints.specific(kataDto.id), {
    name: kataDto.name,
    details: kataDto.details,
    code: kataDto.code,
    test: kataDto.test,
    tags: kataDto.tags,
  }).then(responseData);

const kataRepo = createKataRepo({
  getAllKatas,
  getAllTags,
  getAllKatasWithTag,
  getKataWithId,
  save,
  update,
});

export default kataRepo;
