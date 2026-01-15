import nodemailer from 'nodemailer';

import configuration from '../config/config.js';
import AuthEmailStyles from '../templates/AuthEmailTemplate.js';

const emailTemplate = new AuthEmailStyles();

export default class SendEmailService {
  mailSender = async (email, title, body) => {
    try {
      const transporter = nodemailer.createTransport({
        service: configuration.MAIL_SERVICE,
        auth: {
          user: configuration.MAIL_USER,
          pass: configuration.MAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: 'Shared Hope Foundation',
        to: email,
        subject: title,
        html: body,
      });

      return info;
    } catch (error) {
      return error;
    }
  };

  verificationEmail = async (email, link, method) => {
    let mailResponse;

    if (method === 'signup') {
      mailResponse = await this.mailSender(
        email,
        'Welcome! Verify Your Email Address',
        emailTemplate.getSignupTemplate(link)
      );
    } else if (method === 'reset') {
      mailResponse = await this.mailSender(
        email,
        'Password Reset Request',
        emailTemplate.getResetTemplate(link)
      );
    }

    if (mailResponse instanceof Error) {
      throw mailResponse;
    }

    return true;
  };
}
