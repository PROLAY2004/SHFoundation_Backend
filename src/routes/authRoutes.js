import express from 'express';

import AuthController from '../controller/AuthController.js';
import UserValidation from '../validations/middleware/userValidation.js';

const userValidationRequest = new UserValidation();

const auth = new AuthController();
// const fileValidationRequest = new EmailFileValidation();

const router = express.Router();

router.post('/signup', userValidationRequest.signupRequest, auth.signUp); // take name, email, password

export default router;
