import express from 'express';
import katasRouter from './router-katas';
import trainingRouter from './router-training';
import userRouter from './router-user';
import { applyBaseMiddlewares } from './middlewares';

const restApiRouter = applyBaseMiddlewares(express.Router());
restApiRouter.use('/katas', katasRouter);
restApiRouter.use('/trainings', trainingRouter);
restApiRouter.use('/user', userRouter);

export default restApiRouter;
