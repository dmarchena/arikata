import Axios from 'axios';
import createKataRepo from '../../../application/factories/repos/kata';

const endpoint = '/api/katas/';

const allKatas = () => Axios.get(endpoint).then((response) => response.data);

const katasOfTag = (tag) =>
  Axios.get(`${endpoint}${encodeURIComponent(tag)}`).then(
    (response) => response.data
  );

const save = (kata) =>
  Axios.post(endpoint, {
    data: {
      kata,
    },
  });

const kataRepo = createKataRepo(allKatas, katasOfTag, save);

export default kataRepo;
