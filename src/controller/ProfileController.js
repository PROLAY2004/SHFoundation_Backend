import newsLetter from '../models/newsletterModel.js';
import user from '../models/userModel.js';

export default class ProfileController {
  getAllData = async (req, res, next) => {
    try {
      const user = req.user;
      const newsLetterDetails = await newsLetter.findOne({
        email: user.email,
      });

      res.status(200).json({
        message: 'All details fetched successfully',
        success: true,
        data: {
          user,
          newsLetterDetails,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  updateUserData = async (req, res, next) => {
    try {
      await user.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        message: 'Name successfully updated',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
