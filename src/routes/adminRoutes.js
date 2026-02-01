import express from 'express';

import AdminController from '../controller/AdminController.js';

const admin = new AdminController();
const router = express.Router();

router.get('/dashboard', admin.getDashboardData);

export default router;
