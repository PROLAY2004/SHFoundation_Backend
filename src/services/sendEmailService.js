import nodemailer from 'nodemailer';

import configuration from '../config/config.js';
import AuthEmailTemplate from '../templates/AuthEmailTemplate.js';
import VolunteerEmailTemplate from '../templates/VoluenteerEmailTemplate.js';
import ContactTemplate from '../templates/ContactTemplate.js';

const authEmailTemplate = new AuthEmailTemplate();
const volunteerEmailTemplate = new VolunteerEmailTemplate();
const contactEmailTemplate = new ContactTemplate();

export default class SendEmailService {
  mailSender = async (email, title, body) => {
    try {
      const transporter = nodemailer.createTransport({
        host: configuration.MAIL_HOST,
        port: configuration.MAIL_PORT,
        secure: true,
        auth: {
          user: configuration.MAIL_USER,
          pass: configuration.MAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: `"Shared Hope Foundation" <${configuration.MAIL_USER}>`,
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

  volunteerEmail = async (
    userEmail,
    adminEmail = 'rootsofsharedhumanity@gmail.com',
    data
  ) => {
    const mailResponse1 = await this.mailSender(
      userEmail,
      'Application Received',
      volunteerEmailTemplate.getUserConfirmationTemplate(data)
    );

    const mailResponse2 = await this.mailSender(
      adminEmail,
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

  volunteerUpdateEmail = async (
    userEmail,
    data
  ) => {
    const mailResponse = await this.mailSender(
      userEmail,
      'Application Status Changed',
      volunteerEmailTemplate.getStatusUpdateTemplate(data)
    );

    if (mailResponse instanceof Error) {
      throw mailResponse;
    }

    return true;
  };

  contactEmail = async (
    emails = 'rootsofsharedhumanity@gmail.com',
    data,
    adminPortalLink
  ) => {
    const mailResponse = await this.mailSender(
      emails,
      'Contact Form Submitted',
      contactEmailTemplate.getContactFormTemplate(data, adminPortalLink)
    );

    if (mailResponse instanceof Error) {
      throw mailResponse;
    }

    return true;
  };
}
