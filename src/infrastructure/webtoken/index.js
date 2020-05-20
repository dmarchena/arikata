import jsonwebtoken from 'jsonwebtoken';
import configJson from '../../config.json';

/**
 * Synchronously sign the given payload into a JSON Web Token string payload
 * @param {Object} payload Payload to generate web token
 * @returns {string} JsonWebToken
 */
const signWithPayload = (payload) =>
  jsonwebtoken.sign(payload, configJson.webtoken.secret, {
    expiresIn: configJson.webtoken.options.expiresIn,
  });

/**
 * Synchronously verify given token to get a decoded token
 * @param {Object} token JsonWebToken
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) =>
  jsonwebtoken.verify(token, configJson.webtoken.secret, {
    maxAge: configJson.webtoken.options.expiresIn,
  });

const webtoken = {
  signWithPayload,
  verifyToken,
};

export default webtoken;
