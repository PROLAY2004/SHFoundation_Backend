import bcrypt from 'bcrypt';

import user from '../models/userModel.js';
import newsLetter from '../models/newsletterModel.js';
import TokenGenerator from '../utils/TokenGenerator.js';

const genToken = new TokenGenerator();

export default class AuthController {
  signup = async (req, res, next) => {
    try {
      const isUser = await user.findOne({ email: req.body.email });
      req.body.password = await bcrypt.hash(req.body.password, 10);

      if (isUser) {
        if (isUser.isVerified) {
          res.status(400);

          throw new Error('Email already exists');
        } else {
          const updatedUser = await user.findByIdAndUpdate(
            isUser._id,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          );

          await genToken.verifyToken(isUser._id, updatedUser.email, 'signup');

          res.status(200).json({
            message: 'Verification email sent.',
            success: true,
          });
        }
      } else {
        const newUser = new user(req.body);
        await newUser.save();

        await genToken.verifyToken(newUser._id, newUser.email, 'signup');

        res.status(201).json({
          message: 'Verification email sent.',
          success: true,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  signupVerify = async (req, res, next) => {
    try {
      const verifiedUser = await user.findByIdAndUpdate(
        req.user._id,
        { isVerified: true },
        {
          new: true,
          runValidators: true,
        }
      );

      await newsLetter.findOneAndUpdate(
        { email: verifiedUser.email }, // match condition
        {
          $set: {
            email: verifiedUser.email,
            userId: verifiedUser._id,
          },
        },
        {
          upsert: true, // insert if not exists
          new: true, // return updated doc
        }
      );

      res.status(200).json({
        message: 'Email Verified Successfully.',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  forgot = async (req, res, next) => {
    try {
      const email = req.body.email;

      if (!email) {
        res.status(400);
        throw new Error('Please Enter a email');
      }

      const existingUser = await user.findOne({ email });

      if (!existingUser) {
        res.status(404);
        throw new Error('User doesnot exists');
      } else if (!existingUser.isVerified) {
        res.status(400);
        throw new Error('User verification pending');
      }

      await genToken.verifyToken(existingUser._id, email, 'reset');

      res.status(200).json({
        message: 'Reset link sent.',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  resetVerify = async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'Valid Link Provided',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const password = await bcrypt.hash(req.body.password, 10);

      await user.findByIdAndUpdate(
        req.user._id,
        { password },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        message: 'Password Updated',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userinfo = await user.findOne({ email });

      if (!userinfo) {
        res.status(404);
        throw new Error(`User does not exists`);
      }

      if (!userinfo.isVerified) {
        res.status(400);
        throw new Error(`Email Verification Pending`);
      }

      const isMatched = await bcrypt.compare(password, userinfo.password);

      if (!isMatched) {
        res.status(401);
        throw new Error('Invalid Password');
      }

      const tokens = await genToken.authToken(userinfo._id);

      res.status(200).json({
        message: 'Login Successful.',
        success: true,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    } catch (err) {
      next(err);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const tokens = await genToken.authToken(req.user._id);

      res.status(200).json({
        message: 'New tokens Provided',
        success: true,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    } catch (err) {
      next(err);
    }
  };
}
