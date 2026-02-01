import MailTemplateStyles from '../styles/MailTemplateStyles.js';

const style = new MailTemplateStyles();

export default class VolunteerEmailTemplate {
  getUserConfirmationTemplate = (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>Application Received</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            ${style.getEmailStyles()}
            /* Additional styles for data summary list */
            .summary-list { list-style: none; padding: 0; margin: 0; }
            .summary-list li { padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
            .summary-list li:last-child { border-bottom: none; }
            .label { font-weight: 600; color: #1c5d66; }
            .value { color: #555; text-align: right; font-weight: 500;}
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="header-logo">
              <i class="fas fa-hand-holding-heart"></i>
            </div>
            <h1>Application Received! 🙌</h1>
          </div>
          
          <div class="email-body">
            <h2>Hello ${data.name},</h2>
            <p>Thank you for offering your time and skills to the Shared Hope Foundation. We have successfully received your volunteer application.</p>
            
            <p>We are thrilled to see your enthusiasm. Our team will review your details and get back to you shortly regarding the next steps.</p>

            <div class="info-box">
              <h3 style="margin-top:0; color: #1c5d66; font-size: 16px;">Your Submission Summary:</h3>
              <ul class="summary-list">
                <li>
                    <span class="label">Skill Set : </span>
                    <span class="value">${data.skill}</span>
                </li>
                <li>
                    <span class="label">Availability : </span>
                    <span class="value">${data.availability}</span>
                </li>
                <li>
                    <span class="label">Email : </span>
                    <span class="value">${data.email}</span>
                </li>
              </ul>
            </div>
            
            <p>Your motivation: <em>"${data.motivation}"</em></p>
            
            <p>In the meantime, feel free to browse our current projects on our website.</p>

            <div style="text-align: center;">
              <a href="https://sharedhopefoundation.org" class="action-button">
                <i class="fas fa-globe"></i> Visit Website
              </a>
            </div>
          </div>
          
          <div class="email-footer">
            <p>You received this email because you applied to volunteer with us.</p>
            <p>Questions? <a href="mailto:support@sharedhopefoundation.org" style="color: #2c8c99; text-decoration: none;">Contact Support</a></p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Shared Hope Foundation. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;


  getAdminNotificationTemplate = (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Volunteer Alert</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            ${style.getEmailStyles()}
            /* Table styles for Admin View */
            .data-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #f8f9fa; border-radius: 8px; overflow: hidden; }
            .data-table th { text-align: left; padding: 12px 15px; background-color: #e6f4f7; color: #1c5d66; font-size: 14px; width: 30%; }
            .data-table td { text-align: left; padding: 12px 15px; border-bottom: 1px solid #e9ecef; color: #333; font-size: 14px; }
            .data-table tr:last-child td { border-bottom: none; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header" style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%);"> 
            <div class="header-logo">
              <i class="fas fa-user-plus"></i>
            </div>
            <h1>New Volunteer Signup 🔔</h1>
          </div>
          
          <div class="email-body">
            <h2>New Application Received</h2>
            <p>A new user has submitted the volunteer form. Please review their details below.</p>
            
            <table class="data-table">
                <tr>
                    <th><i class="fas fa-user"></i> Name</th>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <th><i class="fas fa-envelope"></i> Email</th>
                    <td><a href="mailto:${data.email}" style="color: #2c8c99;">${data.email}</a></td>
                </tr>
                <tr>
                    <th><i class="fas fa-tools"></i> Skill</th>
                    <td>${data.skill}</td>
                </tr>
                <tr>
                    <th><i class="fas fa-clock"></i> Availability</th>
                    <td>${data.availability}</td>
                </tr>
                <tr>
                    <th><i class="fas fa-check-square"></i> Terms</th>
                    <td>${data.termsAccepted ? '<span style="color:green; font-weight:bold;">Accepted</span>' : '<span style="color:red;">Not Accepted</span>'}</td>
                </tr>
            </table>

            <div class="info-box" style="border-left: 4px solid #1f2937;">
                <p><strong><i class="fas fa-quote-left"></i> Motivation:</strong></p>
                <p style="margin-top: 10px; font-style: italic;">"${data.motivation}"</p>
            </div>
            
            <div style="text-align: center;">
              <a href="mailto:${data.email}" class="action-button" style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%);">
                <i class="fas fa-reply"></i> Reply to Volunteer
              </a>
            </div>

          </div>
          
          <div class="email-footer">
            <p><i class="fas fa-shield-alt"></i> Internal System Notification</p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Shared Hope Foundation Admin System.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
