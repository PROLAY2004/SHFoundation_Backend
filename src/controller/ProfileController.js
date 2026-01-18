import newsLetter from '../models/newsletterModel.js';

export default class ProfileController {
  getAllData = async (req, res, next) => {
    const user = req.user;
    const newsLetterDetails = await newsLetter.findOne({ email: user.email });

    try {
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
}
