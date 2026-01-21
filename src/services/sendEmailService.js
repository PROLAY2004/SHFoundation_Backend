import nodemailer from 'nodemailer';

import configuration from '../config/config.js';
import AuthEmailTemplate from '../templates/AuthEmailTemplate.js';
import VolunteerEmailTemplate from '../templates/VoluenteerEmailTemplate.js';

const authEmailTemplate = new AuthEmailTemplate();
const volunteerEmailTemplate = new VolunteerEmailTemplate();

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
        authEmailTemplate.getSignupTemplate(link)
      );
    } else if (method === 'reset') {
      mailResponse = await this.mailSender(
        email,
        'Password Reset Request',
        authEmailTemplate.getResetTemplate(link)
      );
    }

    if (mailResponse instanceof Error) {
      throw mailResponse;
    }

    return true;
  };

  volunteerEmail = async (email, data) => {
    const mailResponse1 = await this.mailSender(
      email,
      'Application Received',
      volunteerEmailTemplate.getUserConfirmationTemplate(data)
    );

    const mailResponse2 = await this.mailSender(
      configuration.ADMIN_EMAIL,
      'New Volunteer Application Submitted',
      volunteerEmailTemplate.getAdminNotificationTemplate(data)
    );

    if (mailResponse1 instanceof Error) {
      throw mailResponse1;
    }

    if (mailResponse2 instanceof Error) {
      throw mailResponse2;
    }

    return true;
  };
}