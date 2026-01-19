import { v2 as cloudinary } from 'cloudinary';
import configuration from './config';

cloudinary.config({
  cloud_name: configuration.CLOUD_NAME,
  api_key: configuration.API_KEY,
  api_secret: configuration.API_SECRET,
});

export default cloudinary;
