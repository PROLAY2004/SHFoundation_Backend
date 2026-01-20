import express from 'express';

import ProfileController from '../controller/ProfileController.js';

const profile = new ProfileController();
const router = express.Router();

router.get('/getUserData', profile.getAllData);
router.patch('/updateData', profile.updateUserData);
router.get('/cloudinary', profile.cloudinarySignature);

export default router;
