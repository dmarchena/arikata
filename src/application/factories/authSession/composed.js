const createComposedAuthSession = (...authSessions) => ({
  /**
   * Logout. Destroy current session.
   * @returns {undefined}
   */
  discardAuthentication() {
    authSessions.forEach((i) => i.discardAuthentication());
  },
  /**
   * Get authentication data of signed user
   * @returns {Object} user data plus accessToken. If user is not signed, returns null.
   */
  getAuthentication() {
    let result = null;
    authSessions.some((i) => {
      result = i.getAuthentication();
      return result !== null;
    });
    return result;
  },
  /**
   * Check if authenticated user is an admin
   * @returns {boolean} true if signed user is an admin; otherwise, false.
   */
  isAdmin() {
    return authSessions.some((i) => i.isAdmin());
  },
  /**
   * Check if there is authenticated user
   * @returns {boolean} true if user is signed in; otherwise, false.
   */
  isAuthenticated() {
    return authSessions.some((i) => i.isAuthenticated());
  },
  /**
   * Save authentication data of user
   * @param {Object} user user data plus accessToken
   * @returns {undefined}
   */
  saveAuthentication(user) {
    authSessions.forEach((i) => i.saveAuthentication(user));
  },
});

export default createComposedAuthSession;
