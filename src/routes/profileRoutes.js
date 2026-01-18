import express from 'express';

import ProfileController from '../controller/ProfileController.js';

const profile = new ProfileController();
const router = express.Router();

router.get('/getUserData', profile.getAllData);

export default router;
