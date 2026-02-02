import express from 'express';

import AdminController from '../controller/AdminController.js';

const admin = new AdminController();
const router = express.Router();

router.get('/dashboard', admin.getDashboardData);
router.get('/contact', admin.getContactData)
router.post('/info', admin.getUserInfo);

export default router;
