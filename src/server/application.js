import createApp from '../application';
import kataRepo from '../infrastructure/repos/db/kata';

const app = createApp({
  kataRepo,
});

export default app;
