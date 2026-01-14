import { userSchema } from '../schema/userSchema.js';
import { ValidationError } from 'yup';

export default class UserValidation {
  signupRequest = async (req, res, next) => {
    try {
      await userSchema.validate(req.body, {
        abortEarly: false, // return all validation errors
        stripUnknown: true, // remove unexpected fields
      });

      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400);
        next(new Error(err.errors.join(', ')));
      }

      next(err);
    }
  };
}
