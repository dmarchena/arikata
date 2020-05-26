import createBrowseService from './browseService';
import createDoKataService from './doKataService';
import createManageKataService from './manageKataService';
import createUserService from './userService';

const createApp = ({ authSession, kataRepo, trainingRepo, userRepo }) => ({
  browseService: createBrowseService({ authSession, kataRepo, trainingRepo }),
  manageKataService: createManageKataService({ authSession, kataRepo }),
  doKataService: createDoKataService({ authSession, kataRepo, trainingRepo }),
  userService: createUserService({ authSession, userRepo }),
});

export default createApp;
