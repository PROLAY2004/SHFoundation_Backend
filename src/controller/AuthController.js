import bcrypt from 'bcrypt';

import user from '../models/userModel.js';

export default class AuthController {
  signUp = async (req, res, next) => {
    try {
      const isUser = await user.findOne({ email: req.body.email });

      if (isUser) {
        if (isUser.isVerified) {
          res.status(400);
          throw new Error('User already exists');
        } else {
          // send email logic here

          res.status(200).json({
            message: 'Verification email sent successfully',
            success: true,
          });
        }
      } else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newUser = new user(req.body);
        await newUser.save();

        // send email logic here

        res.status(201).json({
          message: 'Verification email sent successfully',
          success: true,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
