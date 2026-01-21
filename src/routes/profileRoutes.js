import express from 'express';

import ProfileController from '../controller/ProfileController.js';
import volunteerValidator from '../validations/middleware/voluenteerValidation.js';

const profile = new ProfileController();
const router = express.Router();

router.get('/getUserData', profile.getAllData);
router.patch('/updateData', profile.updateUserData);
router.get('/cloudinary', profile.cloudinarySignature);
router.post('/updateAvatar', profile.updateAvatar);
router.patch('/setNewsLetter', profile.setNewsLetterPreference);
router.post('/volunteer', volunteerValidator, profile.addVolunteer);

export default router;
