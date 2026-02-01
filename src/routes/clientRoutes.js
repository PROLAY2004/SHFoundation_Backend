import express from 'express';

import ClientController from '../controller/ClientController.js';
import contactValidator from '../validations/middleware/contactValidation.js';

const client = new ClientController();
const router = express.Router();

router.post('/contact', contactValidator, client.contact);
router.post('/subscribe', client.subscribtion);

export default router;
