import { ValidationError } from 'yup';
import { contactSchema } from '../schema/contactSchema.js';

export default async function contactValidator(req, res, next) {
  try {
    await contactSchema.validate(req.body, {
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
}
