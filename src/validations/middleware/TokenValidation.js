import jwt from 'jsonwebtoken';

import configuration from '../../config/config.js';
import user from '../../models/userModel.js';

export default class TokenValidation {
  authTokenValidator = async (req, res, next) => {
    try {
      const signup_secret = configuration.VERIFY_SECRET;
      const signup_verification_token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(signup_verification_token, signup_secret);
      const appUser = await user.findOne({ _id: decoded.userId });

      console.log(appUser);

      if (appUser) {
        req.user = appUser;

        next();
      } else {
        res.status(404);
        throw new Error('User doesnot exists');
      }
    } catch (err) {
      next(err);
    }
  };
}
