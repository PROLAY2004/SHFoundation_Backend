import MailTemplateStyles from '../styles/MailTemplateStyles.js';

const style = new MailTemplateStyles();

export default class AuthEmailTemplate {
  getSignupTemplate = (link) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>${style.getEmailStyles()}</style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="header-logo">
              <i class="fas fa-rocket"></i>
            </div>
            <h1>Welcome to Our Community! 🚀</h1>
          </div>
          
          <div class="email-body">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for signing up! We're excited to have you on board. To complete your registration, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${link}" class="action-button">
                <i class="fas fa-check-circle"></i> Verify Email Address
              </a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="link-text">${link}</div>
            
            <div class="info-box">
              <p><i class="fas fa-clock"></i> <strong>Important:</strong> This verification link will expire in <span class="expiry-note">5 minutes</span>.</p>
            </div>
            
            <p>If you didn't create an account with us, please ignore this email.</p>
          </div>
          
          <div class="email-footer">
            <p><i class="fas fa-shield-alt"></i> Your security is important to us. We'll never ask for your password via email.</p>
            <p>Need help? <a href="mailto:support@sharedhopefoundation.org" style="color: #2c8c99; text-decoration: none;">Contact our support team</a></p>
        
            
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Shared Hope Foundation. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

  getResetTemplate = (link) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>${style.getEmailStyles()}</style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="header-logo">
              <i class="fas fa-key"></i>
            </div>
            <h1>Reset Your Password 🔐</h1>
          </div>
          
          <div class="email-body">
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your password. If you made this request, click the button below to create a new password:</p>
            
            <div style="text-align: center;">
              <a href="${link}" class="action-button">
                <i class="fas fa-redo"></i> Reset Password
              </a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="link-text">${link}</div>
            
            <div class="info-box">
              <p><i class="fas fa-exclamation-triangle"></i> <strong>Security Alert:</strong> This link will expire in <span class="expiry-note">5 minutes</span> for your protection.</p>
              <p><i class="fas fa-user-secret"></i> <strong>Didn't request this?</strong> If you didn't request a password reset, please ignore this email or contact support immediately.</p>
            </div>
            
            <p>For security reasons, we recommend:</p>
            <ul style="color: #555; margin-bottom: 20px;">
              <li>Creating a strong, unique password</li>
              <li>Not reusing passwords across different sites</li>
              <li>Enabling two-factor authentication if available</li>
            </ul>
          </div>
          
          <div class="email-footer">
            <p><i class="fas fa-shield-alt"></i> This is an automated message. Please do not reply to this email.</p>
            <p>Having trouble? <a href="mailto:support@sharedhopefoundation.org" style="color: #2c8c99; text-decoration: none;">Contact our support team</a></p>

            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Shared Hope Foundation. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
