import createBrowseService from './browseService';
import createManageKataService from './manageKataService';

const createApp = ({ kataRepo }) => ({
  browseService: createBrowseService(kataRepo),
  manageKataService: createManageKataService(kataRepo),
});

export default createApp;
