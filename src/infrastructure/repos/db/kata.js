import createKataRepo from '../../../application/factories/repos/kata';
import db from '../../db';

const allKatas = (ormModel) => () => ormModel.findAll();

const katasOfTag = (ormModel) => (tag) => ormModel.findAll();

const save = (ormModel) => (kataDto) => ormModel.create(kataDto);

const kataRepo = createKataRepo(
  allKatas(db.Kata),
  katasOfTag(db.Kata),
  save(db.Kata)
);

export default kataRepo;
