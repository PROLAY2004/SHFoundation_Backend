import { v2 as cloudinary } from 'cloudinary';

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

  cloudinarySignature = async (req, res, next) => {
    try {
      const timestamp = Math.round(Date.now() / 1000);
      const paramsToSign = {
        timestamp,
        folder: 'profile_images',
      };

      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        cloudinary.config().api_secret
      );

      res.status(200).json({
        message: 'Signature generated successfully',
        success: true,
        data: {
          timestamp,
          apiKey: cloudinary.config().api_key,
          signature,
          folder: paramsToSign.folder,
          cloudName: cloudinary.config().cloud_name,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  updateAvatar = async (req, res, next) => {
    try {
      await user.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });

      if (req.user.publicId) {
        await cloudinary.uploader.destroy(req.user.publicId);
      }

      res.status(200).json({
        message: 'Profile image updated successfully',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  setNewsLetterPreference = async (req, res, next) => {
    try {
      await newsLetter.findOneAndUpdate({ email: req.user.email }, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        message: 'Preference updated successfully',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
