import express from 'express';
import cors from 'cors';

import configuration from './config/config.js';
import errorHandler from './error/errorHandler.js';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import TokenValidation from './validations/middleware/TokenValidation.js';

const tokenValidator = new TokenValidation();
await connectDB();

const app = express();

app.use(cors(configuration.CORS));
app.use(express.json());

app.use('/user/auth', authRoutes);
app.use('/user/account', tokenValidator.accessTokenValidator, profileRoutes);
app.use('/user/admin', tokenValidator.isAdmin, adminRoutes);
app.use('/user/main', clientRoutes);

app.use(errorHandler);

app.listen(configuration.PORT, () => {
  console.log(`ShareGuy listening on port ${configuration.PORT}`);
});
