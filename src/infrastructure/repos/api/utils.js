const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  }
  return {};
};

// eslint-disable-next-line import/prefer-default-export
export { authHeader };
