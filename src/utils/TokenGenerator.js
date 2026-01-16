import jwt from 'jsonwebtoken';

import configuration from '../config/config.js';
import SendEmailService from '../services/SendEmailService.js';

const emailService = new SendEmailService();

export default class TokenGenerator {
  verifyToken = async (userId, email, method) => {
    try {
      let verifyUrl;
      const verifyToken = jwt.sign({ userId }, configuration.VERIFY_SECRET, {
        expiresIn: configuration.VERIFY_EXPIRE,
      });

      if (method === 'signup') {
        verifyUrl = `${configuration.FRONTEND_URL}/src/pages/auth/verify.html?token=${verifyToken}`;
      } else if (method === 'reset') {
        verifyUrl = `${configuration.FRONTEND_URL}/src/pages/auth/reset.html?token=${verifyToken}`;
      }

      await emailService.verificationEmail(email, verifyUrl, method);
    } catch (err) {
      throw err;
    }
  };

  authToken = async (userId) => {
    try {
      const access_token = jwt.sign({ userId }, configuration.ACCESS_SECRET, {
        expiresIn: configuration.ACCESS_EXPIRE,
      });
      const refresh_token = jwt.sign({ userId }, configuration.REFRESH_SECRET, {
        expiresIn: configuration.REFRESH_EXPIRE,
      });

      return {
        access_token,
        refresh_token,
      };
    } catch (err) {
      throw err;
    }
  };
}
