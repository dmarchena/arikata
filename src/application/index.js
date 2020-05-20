import createBrowseService from './browseService';
import createManageKataService from './manageKataService';
import createUserService from './userService';

const createApp = ({ authSession, kataRepo, userRepo }) => ({
  browseService: createBrowseService(kataRepo),
  manageKataService: createManageKataService({ authSession, kataRepo }),
  userService: createUserService({ authSession, userRepo }),
});

export default createApp;
