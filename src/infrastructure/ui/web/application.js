import createApp from '../../../application';
import kataRepo from '../../repos/api/kata';

const app = createApp({
  kataRepo,
});

export default app;
