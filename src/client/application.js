import createApp from '../application';
import kataRepo from '../infrastructure/repos/api/kata';

const app = createApp({
  kataRepo,
});

export default app;
