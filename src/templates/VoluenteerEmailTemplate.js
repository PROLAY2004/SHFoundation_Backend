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

  getStatusUpdateTemplate = (data) =>
    `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>Volunteer Application Update</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            ${style.getEmailStyles()}
             .status-container {
                text-align: center;
                padding: 30px;
                border-radius: 16px;
                margin: 30px 0;
            }
            
            .status-approved {
                background: linear-gradient(135deg, #e6f4f7 0%, #d4edda 100%);
                border-left: 6px solid #28a745;
            }
            
            .status-rejected {
                background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
                border-left: 6px solid #dc3545;
            }
            
            .status-icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            
            .status-title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 15px;
            }
            
            .status-approved .status-title { color: #28a745; }
            .status-rejected .status-title { color: #dc3545; }
            
            .next-steps {
                background-color: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                border-left: 4px solid #ffc107;
            }
            
            .next-steps h3 {
                color: #1c5d66;
                margin-top: 0;
                font-size: 18px;
            }
            
            .next-steps ul {
                text-align: left;
                padding-left: 20px;
                margin: 15px 0;
            }
            
            .next-steps li {
                margin-bottom: 10px;
                color: #555;
            }
            
            .highlight-box {
                background-color: #fff3cd;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                border: 2px solid #ffc107;
            }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header" style="${data.status === 'approved' ? 'background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);' : 'background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);'}">
            <div class="header-logo">
              <i class="fas ${data.status === 'approved' ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            </div>
            <h1>Application ${data.status === 'approved' ? 'Approved! 🎉' : 'Update 📋'}</h1>
          </div>
          
          <div class="email-body">
            <h2>Hello ${data.name},</h2>
            
            <div class="status-container ${data.status === 'approved' ? 'status-approved' : 'status-rejected'}">
              <div class="status-icon">
                <i class="fas ${data.status === 'approved' ? 'fa-check-circle' : 'fa-times-circle'}"></i>
              </div>
              <div class="status-title">
                ${data.status === 'approved' ? 'Congratulations! Your application has been approved!' : 'Application Status Update'}
              </div>
              <p style="font-size: 18px; margin-bottom: 0;">
                ${
                  data.status === 'approved'
                    ? 'Welcome to the Shared Hope Foundation volunteer team!'
                    : `We appreciate your interest in volunteering with us, but we are unable to proceed with your application at this time.`
                }
              </p>
            </div>
            
            ${
              data.status === 'approved'
                ? `
            <div class="highlight-box">
              <h3 style="margin-top:0; color: #1c5d66;"><i class="fas fa-star"></i> Welcome to Our Team!</h3>
              <p>We're excited to have you join us in making a difference. Your skills in <strong>${data.skill}</strong> will be invaluable to our projects.</p>
            </div>
            
            <div class="next-steps">
              <h3><i class="fas fa-list-check"></i> Next Steps:</h3>
              <ul>
                <li><strong>Orientation Session:</strong> You'll receive an invitation to our online volunteer orientation within 3 business days</li>
                <li><strong>Project Assignment:</strong> Our team will match you with a suitable project based on your availability: <strong>${data.availability} hours / week</strong></li>
                <li><strong>Onboarding:</strong> Complete the volunteer onboarding process through our portal</li>
                <li><strong>Connect:</strong> Join our volunteer community channel to meet other volunteers</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://sharedhopefoundation.org" class="action-button" style="background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);">
                <i class="fas fa-door-open"></i> Visit Website
              </a>
            </div>
            
            <p style="text-align: center; font-size: 14px; color: #6c757d;">
              <i class="fas fa-info-circle"></i> Your assigned coordinator will contact you shortly.
            </p>
            `
                : `
            <div class="next-steps">
              <h3><i class="fas fa-comments"></i> Feedback:</h3>
              <p>'Our current volunteer needs do not align with the skills and availability you provided. We receive many applications and have to make difficult decisions based on current project requirements.'}</p>
              
              <h3 style="margin-top: 25px;"><i class="fas fa-lightbulb"></i> Future Opportunities:</h3>
              <ul>
                <li>We encourage you to apply again in 6 months when our needs may change</li>
                <li>Consider joining our mailing list for updates on new opportunities</li>
                <li>Follow our social media for event volunteering opportunities</li>
              </ul>
            </div>
            
            <p>Thank you again for your interest in volunteering with Shared Hope Foundation. We truly appreciate your desire to contribute to our mission.</p>
            
            <div style="text-align: center;">
              <a href="https://sharedhopefoundation.org" class="action-button" style="background: linear-gradient(135deg, #6c757d 0%, #495057 100%);">
                <i class="fas fa-heart"></i> Explore Other Ways to Help
              </a>
            </div>
            `
            }
            
            <div class="info-box">
              <h3 style="margin-top:0; color: #1c5d66; font-size: 16px;">Your Application Summary:</h3>
              <ul class="summary-list">
                <li>
                    <span class="label">Status : </span>
                    <span class="value">
                      ${
                        data.status === 'approved'
                          ? '<span style="color: #28a745; font-weight: bold;">✓ Approved</span>'
                          : '<span style="color: #dc3545; font-weight: bold;">✗ Not Approved</span>'
                      }
                    </span>
                </li>
                <li>
                    <span class="label">Skill Set : </span>
                    <span class="value">${data.skill}</span>
                </li>
                <li>
                    <span class="label">Availability : </span>
                    <span class="value">${data.availability} hours/ week</span>
                </li>
                <li>
                    <span class="label">Application Date : </span>
                    <span class="value">${new Date(
                      data.applicationDate
                    ).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</span>
                </li>
              </ul>
            </div>
            
            ${
              data.status === 'approved'
                ? `
            <p><strong>Your motivation inspired us:</strong> <em>"${data.motivation}"</em></p>
            `
                : ''
            }
            
          </div>
          
          <div class="email-footer">
            <p>You received this email regarding your volunteer application with Shared Hope Foundation.</p>
            <p>Questions? <a href="mailto:support@sharedhopefoundation.org" style="color: #2c8c99; text-decoration: none;">Contact Volunteer Support</a></p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Shared Hope Foundation. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
