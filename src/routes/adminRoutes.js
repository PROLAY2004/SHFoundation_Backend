import express from 'express';

import AdminController from '../controller/AdminController.js';

const admin = new AdminController();
const router = express.Router();

router.post('/info', admin.getUserInfo);

router.get('/dashboard', admin.getDashboardData);

router.post('/contact/loader', admin.getContactData);
router.delete('/contact', admin.deleteMsg);
router.patch('/contact', admin.changeStatus);
router.post('/contact', admin.getContactInfo);

router.post('/volunteer', admin.getVolunteerData);
router.post('/volunteer/getVoluenteerInfo', admin.getVoluenteerInfo);
export default router;
