import createListKataService from './listKataService';

const createApp = ({ kataRepo }) => ({
  kataService: createListKataService(kataRepo),
});

export default createApp;
