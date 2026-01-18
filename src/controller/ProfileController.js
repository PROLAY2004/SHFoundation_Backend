import user from '../models/userModel.js';

export default class ProfileController {
  getAllData = async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'Valid Link Provided',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
