import Axios from 'axios';
import { compose } from 'ramda';
import createKataRepo from '../../../application/factories/repos/kata';
import kataTransformer from '../../../application/transformers/kataTransformer';

const endpoint = '/api/katas/';
const responseData = (response) => response.data;
const dtoArrayToEntities = (arr = []) => arr.map(kataTransformer.toKataModel);
const responseEntity = compose(kataTransformer.toKataModel, responseData);
const responseEntityArray = compose(dtoArrayToEntities, responseData);

const allKatas = () => Axios.get(endpoint).then(responseEntityArray);

const katasOfTag = (tag) =>
  Axios.get(`${endpoint}${encodeURIComponent(tag)}`).then(responseEntityArray);

const save = (kataEntity) =>
  Axios.post(endpoint, kataTransformer.toKataDto(kataEntity)).then(
    responseEntity
  );

const kataRepo = createKataRepo(allKatas, katasOfTag, save);

export default kataRepo;
