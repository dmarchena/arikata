import Axios from 'axios';

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  }
  return {};
};

const createHttpClient = () => {
  const instance = Axios.create({
    headers: authHeader(),
  });
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const message = error.response?.data?.message ?? false;
      if (message) {
        throw new Error(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export { authHeader, createHttpClient };
