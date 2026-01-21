import { ValidationError } from 'yup';
import {volunteerSchema} from '../schema/voluenteerSchema.js';

export default async function volunteerValidator(req, res, next) {
  try {
    await volunteerSchema.validate(req.body, {
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
