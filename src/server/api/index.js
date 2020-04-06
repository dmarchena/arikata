import express from 'express';
import createListKatasUseCase from '../../application/listKatasFactory';
import kataRepo from '../../infrastructure/db/kataRepo';

const katasRouter = express.Router();

katasRouter.get('/katas', (req, res) => {
  createListKatasUseCase(kataRepo)
    .execute()
    .then((data) => res.json(data));
});

katasRouter.get('/katas/:tag', (req, res) => {
  const filterByTag = req.params.tag;
  createListKatasUseCase(kataRepo, filterByTag)
    .execute()
    .then((data) => res.json(data));
});

export default katasRouter;
