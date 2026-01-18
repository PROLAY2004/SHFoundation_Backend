import newsLetter from '../models/newsletterModel.js';

export default class ProfileController {
  getAllData = async (req, res, next) => {
    const user = req.user;
    const newLetterDetails = newsLetter.findOneById(user._id);

    try {
      res.status(200).json({
        message: 'Valid Link Provided',
        success: true,
        data: {
          user,
          newLetterDetails,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
