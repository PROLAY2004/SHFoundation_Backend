import { v2 as cloudinary } from 'cloudinary';

import newsLetter from '../models/newsletterModel.js';
import user from '../models/userModel.js';
import volunteer from '../models/voluenteerModel.js';

export default class AdminController {
  getAllData = async (req, res, next) => {
    try {
      const currentUser = req.user;
      const volunteers = await volunteer.find({});
      const newsLetters = await newsLetter.find({});
      const allUsersCount = await user.find({}).countDocuments();
      const usage = await cloudinary.api.usage(); 

      const verifiedCount = await user
        .find({ isVerified: true })
        .countDocuments();

      const pendingCount = await user
        .find({ isVerified: false })
        .countDocuments();

      const blockedNewsletter = await newsLetter
        .find({ isActive: false })
        .countDocuments();

      const activeNewsletter = await newsLetter
        .find({
          type: { $in: ['weekly', 'monthly'] },
          isActive: true,
        })
        .countDocuments();

      const pendingVoluenteer = await volunteer
        .find({ status: 'pending' })
        .countDocuments();

      const approvedVoluenteer = await volunteer
        .find({ status: 'approved' })
        .countDocuments();

      res.status(200).json({
        message: 'All details fetched successfully',
        success: true,
        data: {
          currentUser,
          usage,

          allUsersCount,
          verifiedCount,
          pendingCount,

          volunteers,
          pendingVoluenteer,
          approvedVoluenteer,

          newsLetters,
          activeNewsletter,
          blockedNewsletter,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
