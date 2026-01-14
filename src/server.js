import express from 'express';
import cors from 'cors';

import configuration from './config/config.js';
import errorHandler from './error/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/dbConfig.js';

await connectDB();

const app = express();

app.use(cors(configuration.CORS));

app.use(express.json());

app.use('/user/auth', authRoutes);

app.use(errorHandler);

app.listen(configuration.PORT, () => {
  console.log(`ShareGuy listening on port ${configuration.PORT}`);
});
