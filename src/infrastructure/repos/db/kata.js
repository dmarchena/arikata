import createKataRepo from '../../../application/factories/repos/kata';
import db from '../../db';

const allKatas = (ormModel) => () => ormModel.findAll();

const katasOfTag = (ormModel) => (tag) => ormModel.findAll();

const save = (ormModel) => (kataDto) => ormModel.create(kataDto);

const kataRepo = createKataRepo(
  allKatas(db.kata),
  katasOfTag(db.kata),
  save(db.kata)
);

export default kataRepo;
