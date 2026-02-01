import MailTemplateStyles from '../styles/MailTemplateStyles.js';

const style = new MailTemplateStyles();

export default class ContactTemplate {
  getContactFormTemplate = (formData, adminPortalLink) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>New Contact Form Submission</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>${style.getEmailStyles()}</style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="header-logo">
              <i class="fas fa-envelope"></i>
            </div>
            <h1>New Contact Form Submission 📬</h1>
          </div>
          
          <div class="email-body">
            <h2>You have received a new message from ${formData.name}</h2>
            
            <div class="info-box" style="background-color: #f0f9ff;">
              <h3 style="margin-top: 0; color: #1c5d66;">Contact Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; width: 100px; color: #2c8c99; font-weight: 500;">Name:</td>
                  <td style="padding: 8px 0;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #2c8c99; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${formData.email}" style="color: #2c8c99; text-decoration: none;">
                      ${formData.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #2c8c99; font-weight: 500;">Subject:</td>
                  <td style="padding: 8px 0; font-weight: 500;">${formData.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #2c8c99; font-weight: 500;">Submitted:</td>
                  <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <h3 style="color: #1c5d66; margin-top: 30px;">Message Content</h3>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2c8c99; margin: 15px 0;">
              <p style="white-space: pre-line; line-height: 1.6; margin: 0;">${formData.message}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${adminPortalLink}" class="action-button" style="background: linear-gradient(135deg, #4a90e2 0%, #2c3e50 100%);">
                <i class="fas fa-cog"></i> Go to Admin Portal
              </a>
            </div>
            
            <div class="info-box">
              <p><i class="fas fa-reply"></i> <strong>Quick Actions:</strong></p>
              <p style="margin-top: 10px;">
                <a href="mailto:${formData.email}?subject=Re: ${formData.subject}" 
                   style="color: #2c8c99; text-decoration: none; font-weight: 500;">
                  <i class="fas fa-paper-plane"></i> Reply to ${formData.name}
                </a>
              </p>
              <p style="font-size: 13px; color: #666; margin-top: 5px;">
                Clicking the reply button will open your email client with the sender's address pre-filled.
              </p>
            </div>
          </div>
          
          <div class="email-footer">
            <p><i class="fas fa-bell"></i> This is an automated notification for new contact form submissions.</p>
            <p>To manage all submissions, visit the <a href="${adminPortalLink}" style="color: #2c8c99; text-decoration: none;">Admin Portal</a></p>
            
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Shared Hope Foundation. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
