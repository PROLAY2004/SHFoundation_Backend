// import { v2 as cloudinary } from 'cloudinary';


// import volunteer from '../models/voluenteerModel.js';
import newsLetter from '../models/newsletterModel.js';
import user from '../models/userModel.js';
import contact from '../models/contactModel.js';
import SendEmailService from '../services/SendEmailService.js';
import configuration from '../config/config.js';

const mailer = new SendEmailService();

export default class ClientController {
  contact = async (req, res, next) => {
    try {
      const adminPortalLink = `${configuration.FRONTEND_URL}/src/pages/admin/contact.html`;
      const messageResponse = new contact(req.body);

      await messageResponse.save();

      const adminEmails = await user.distinct('email', {
        role: 'admin',
        isVerified: true,
      });

      mailer.contactEmail(adminEmails, req.body, adminPortalLink);

      res.status(201).json({
        message: 'Message submitted successfully',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  subscribtion = async (req, res, next) => {
    try {
      const email = req.body.email;

      if (!email) {
        res.status(400);

        throw new Error('Please enter a email.');
      }

      const isExists = await newsLetter.findOne({email})

      if(isExists){
        res.status(400)

        throw new Error('Subscribtion already exists.')
      }

      const newsSubscribtion = new newsLetter(req.body);
      await newsSubscribtion.save();

      res.status(201).json({
        message: 'Subscribtion added successfully',
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
