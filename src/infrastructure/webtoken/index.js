import jsonwebtoken from 'jsonwebtoken';
import configServerJson from '../../config-server.json';

/**
 * Synchronously sign the given payload into a JSON Web Token string payload
 * @param {Object} payload Payload to generate web token
 * @returns {string} JsonWebToken
 */
const signWithPayload = (payload) =>
  jsonwebtoken.sign(payload, configServerJson.webtoken.secret, {
    expiresIn: configServerJson.webtoken.options.expiresIn,
  });

/**
 * Synchronously verify given token to get a decoded token
 * @param {Object} token JsonWebToken
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) =>
  jsonwebtoken.verify(token, configServerJson.webtoken.secret, {
    maxAge: configServerJson.webtoken.options.expiresIn,
  });

const webtoken = {
  signWithPayload,
  verifyToken,
};

export default webtoken;
