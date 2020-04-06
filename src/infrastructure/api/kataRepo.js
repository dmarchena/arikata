import Axios from 'axios';

const kataRepo = {
  allKatas: () => Axios.get('/api/katas/').then((response) => response.data),
  katasOfTag: (tag) =>
    Axios.get(`/api/katas/${encodeURIComponent(tag)}`).then(
      (response) => response.data
    ),
};

export default kataRepo;
