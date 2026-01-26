import configuration from '../../config/config.js';
import user from '../../models/userModel.js';
import verifyToken from '../../utils/tokenVerifier.js';
export default class TokenValidation {
  authTokenValidator = async (req, res, next) => {
    try {
      const decoded = verifyToken(req, configuration.VERIFY_SECRET);
      const appUser = await user.findOne({ _id: decoded.userId });

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

  accessTokenValidator = async (req, res, next) => {
    try {
      const decoded = verifyToken(req, configuration.ACCESS_SECRET);
      const appUser = await user.findOne({ _id: decoded.userId });

      if (appUser) {
        req.user = appUser;

        next();
      } else {
        res.status(404);
        throw new Error('User doesnot exists');
      }
    } catch (err) {
      if (err.message == 'jwt expired') {
        res.status(401);
      }

      next(err);
    }
  };

  refreshTokenValidator = async (req, res, next) => {
    try {
      const decoded = verifyToken(req, configuration.REFRESH_SECRET);
      const appUser = await user.findOne({ _id: decoded.userId });

      if (appUser) {
        req.user = appUser;

        next();
      } else {
        res.status(401);
        throw new Error('User doesnot exists');
      }
    } catch (err) {
      if (err.message == 'jwt expired') {
        res.status(401);
      }

      next(err);
    }
  };
}
