import createApp from '../../../application';
import kataRepo from '../../repos/db/kata';

const app = createApp({
  kataRepo,
});

export default app;
