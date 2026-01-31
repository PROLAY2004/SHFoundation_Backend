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
      const allUsers = await user.find({});
      
      res.status(200).json({
        message: 'All details fetched successfully',
        success: true,
        data: {
          currentUser,
          allUsers,
          volunteers,
          newsLetters,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
