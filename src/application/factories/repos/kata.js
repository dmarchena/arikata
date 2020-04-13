import { isRequired } from '../utils';

const createKataRepo = (
  allKatas = isRequired('allKatas'),
  katasOfTag = isRequired('katasOfTag'),
  save = isRequired('save')
) => ({ allKatas, katasOfTag, save });

export default createKataRepo;
