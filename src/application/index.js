import createBrowseService from './browseService';

const createApp = ({ kataRepo }) => ({
  browseService: createBrowseService(kataRepo),
});

export default createApp;
