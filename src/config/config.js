import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  FRONTEND_URL: process.env.FRONTEND_URL,
  VERIFY_SECRET: process.env.VERIFY_SECRET,
  VERIFY_EXPIRE: process.env.VERIFY_EXPIRE,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_EXPIRE: process.env.ACCESS_EXPIRE,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRE: process.env.REFRESH_EXPIRE,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  CORS: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  },
};

export default configuration;
