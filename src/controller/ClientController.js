// import { v2 as cloudinary } from 'cloudinary';

// import newsLetter from '../models/newsletterModel.js';
// import user from '../models/userModel.js';
// import volunteer from '../models/voluenteerModel.js';
import contact from '../models/contactModel.js';

export default class ClientController {
  contact = async (req, res, next) => {
    try {
      const messageResponse = new contact(req.body);
      await messageResponse.save();

      res.status(201).json({
        message: 'Message submitted successfully',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
