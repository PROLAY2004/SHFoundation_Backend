import express from 'express';

import AuthController from '../controller/AuthController.js';
import UserValidation from '../validations/middleware/userValidation.js';
import TokenValidation from '../validations/middleware/TokenValidation.js';

const userValidationRequest = new UserValidation();
const auth = new AuthController();
const tokenValidator = new TokenValidation();

const router = express.Router();

router.post('/signup', userValidationRequest.signupRequest, auth.signup); // take name, email, password
router.patch('/signup', tokenValidator.authTokenValidator, auth.signupVerify); // take only token in header
router.post('/forgot-password', auth.forgot); // take only email
router.get(
  '/forgot-password',
  tokenValidator.authTokenValidator,
  auth.resetVerify
);
router.patch(
  '/forgot-password',
  tokenValidator.authTokenValidator,
  auth.resetPassword
);

export default router;
