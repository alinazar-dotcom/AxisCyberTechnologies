
export const EMAIL_TEMPLATES = {
  CONTACT_NOTIFICATION: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00E5FF, #B900FF); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #555; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #00E5FF; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          .badge { display: inline-block; background: #00E5FF; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🔔 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">{{name}}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:{{email}}">{{email}}</a></div>
            </div>
            
            {{#if phone}}
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">{{phone}}</div>
            </div>
            {{/if}}
            
            {{#if company}}
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">{{company}}</div>
            </div>
            {{/if}}
            
            {{#if budget}}
            <div class="field">
              <div class="label">Budget:</div>
              <div class="value">{{budget}}</div>
            </div>
            {{/if}}
            
            {{#if servicesHtml}}
            <div class="field">
              <div class="label">Interested Services:</div>
              <div class="value">
                {{{servicesHtml}}}
              </div>
            </div>
            {{/if}}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">{{message}}</div>
            </div>
          </div>
          <div class="footer">
            <p>Received at {{date}}</p>
            <p>Axis Cyber Technologies - Global Software Engineering</p>
          </div>
        </div>
      </body>
    </html>
  `,

  CONSULTATION_NOTIFICATION: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #B900FF, #FF7A00); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #555; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #B900FF; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          .urgent { background: #FF7A00; color: white; padding: 10px; border-radius: 4px; text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📅 New Consultation Request</h1>
          </div>
          <div class="content">
            {{#if preferred_date}}
            <div class="urgent">
              <strong>Requested Time:</strong> {{preferred_date}} at {{#if preferred_time}}{{preferred_time}}{{else}}Any time{{/if}}
            </div>
            {{/if}}
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">{{name}}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:{{email}}">{{email}}</a></div>
            </div>
            
            {{#if phone}}
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">{{phone}}</div>
            </div>
            {{/if}}
            
            {{#if company}}
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">{{company}}</div>
            </div>
            {{/if}}
            
            <div class="field">
              <div class="label">Service Interested:</div>
              <div class="value"><strong>{{service}}</strong></div>
            </div>
            
            {{#if message}}
            <div class="field">
              <div class="label">Additional Notes:</div>
              <div class="value">{{message}}</div>
            </div>
            {{/if}}
          </div>
          <div class="footer">
            <p>Received at {{date}}</p>
            <p>⏰ Please respond within 24 hours</p>
          </div>
        </div>
      </body>
    </html>
  `,

  JOB_APPLICATION_NOTIFICATION: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00E5FF, #00FFAA); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #555; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #00E5FF; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          .button { display: inline-block; background: #00E5FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">💼 New Job Application</h1>
            <h2 style="margin: 10px 0 0 0;">{{jobTitle}}</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Applicant:</div>
              <div class="value">{{applicantName}}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:{{applicantEmail}}">{{applicantEmail}}</a></div>
            </div>
            
            {{#if applicantPhone}}
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">{{applicantPhone}}</div>
            </div>
            {{/if}}
            
            {{#if yearsExperience}}
            <div class="field">
              <div class="label">Experience:</div>
              <div class="value">{{yearsExperience}} years</div>
            </div>
            {{/if}}
            
            {{#if coverLetter}}
            <div class="field">
              <div class="label">Cover Letter:</div>
              <div class="value">{{coverLetter}}</div>
            </div>
            {{/if}}
            
            {{#if resumeUrl}}
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{resumeUrl}}" class="button">📄 View Resume</a>
            </div>
            {{/if}}
          </div>
          <div class="footer">
            <p>Received at {{date}}</p>
            <p>Review in your admin dashboard</p>
          </div>
        </div>
      </body>
    </html>
  `,

  JOB_APPLICATION_AUTO_REPLY: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; line-height: 1.7; color: #E5E7EB; background: #000000; }
          .email-container { max-width: 680px; margin: 40px auto; background: linear-gradient(180deg, #0A0E1A 0%, #050609 100%); }
          .header-section { background: linear-gradient(135deg, rgba(0, 47, 52, 0.4) 0%, rgba(26, 0, 51, 0.4) 50%, rgba(51, 0, 26, 0.4) 100%); padding: 80px 60px; text-align: center; border-bottom: 3px solid #00FFFF; }
          .main-heading { font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 700; background: linear-gradient(90deg, #00E5FF 0%, #B900FF 50%, #FF0099 100%); -webkit-background-clip: text; color: transparent; }
          .sub-heading { font-size: 18px; color: #00FFFF; margin-top: 10px; }
          .content-section { padding: 60px; background: rgba(5, 6, 10, 0.4); }
          .greeting { font-size: 18px; color: #F3F4F6; margin-bottom: 24px; }
          .step-item { padding: 18px 0 18px 50px; position: relative; color: #D1D5DB; border-left: 2px solid rgba(0, 255, 255, 0.15); margin-bottom: 4px; }
          .step-icon { position: absolute; left: 12px; top: 18px; font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header-section">
            <h1 class="main-heading">AXIS CYBER</h1>
            <p class="sub-heading">APPLICATION RECEIVED</p>
          </div>
          <div class="content-section">
            <p class="greeting">Hi {{applicantName}}! 👋</p>
            <p>Thank you for applying for the <strong>{{jobTitle}}</strong> position at <strong>Axis Cyber Technologies</strong>.</p>
            <div class="step-item"><span class="step-icon">🔍</span><strong>Initial Review</strong><p>Our team will review your resume (3-5 business days).</p></div>
            <div class="step-item"><span class="step-icon">📞</span><strong>First Contact</strong><p>If there's a match, we'll reach out.</p></div>
            <div style="margin-top: 50px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px;">
              <p style="color: #FF0099; font-weight: 700;">Best of luck,</p>
              <p style="color: #00FFFF; font-weight: 700;">The Axis Cyber Careers Team</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `,

  NEWSLETTER_WELCOME: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; line-height: 1.7; color: #E5E7EB; background: #000000; }
          .email-container { max-width: 680px; margin: 40px auto; background: linear-gradient(180deg, #0A0E1A 0%, #050609 100%); }
          .header-section { padding: 80px 60px; text-align: center; border-bottom: 3px solid #00FFFF; }
          .main-heading { font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 700; background: linear-gradient(90deg, #00E5FF 0%, #B900FF 50%, #FF0099 100%); -webkit-background-clip: text; color: transparent; }
          .content-section { padding: 60px; }
          .benefit-item { padding: 18px 0 18px 50px; position: relative; color: #D1D5DB; border-left: 2px solid rgba(0, 255, 255, 0.15); margin-bottom: 4px; }
          .badge { display: inline-flex; background: rgba(0, 255, 255, 0.15); border: 2px solid #00FFFF; color: #00FFFF; padding: 4px 12px; border-radius: 20px; margin: 2px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header-section">
            <h1 class="main-heading">AXIS CYBER</h1>
            <p style="color: #00FFFF; font-size: 18px; margin-top: 10px;">TECHNOLOGIES</p>
          </div>
          <div class="content-section">
            <p style="font-size: 18px; color: #F3F4F6; margin-bottom: 24px;">Hey there, Tech Pioneer! 👋</p>
            <p>Welcome to <strong>Axis Cyber Technologies</strong>.</p>
            <p style="color: #00FFFF; font-weight: 700; margin: 30px 0;">What You'll Receive:</p>
            <div class="benefit-item"><strong>🚀 Cutting-Edge Insights</strong></div>
            <div class="benefit-item"><strong>💡 Industry Best Practices</strong></div>
            <div class="benefit-item"><strong>🔥 Tech Stack Updates</strong></div>
            
            {{#if preferencesHtml}}
            <div style="margin: 40px 0; padding: 30px; border: 1px solid rgba(0,255,255,0.3); border-radius: 12px;">
              <p style="color: #00FFFF; font-weight: 700; margin-bottom: 15px;">📌 Your Interests:</p>
              <div>{{{preferencesHtml}}}</div>
            </div>
            {{/if}}
            
            <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #FF0099; font-weight: 700;">Stay Cyber,</p>
              <p style="color: #00FFFF; font-weight: 700;">The Axis Cyber Team</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `,

  CONTACT_AUTO_REPLY: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; line-height: 1.7; color: #E5E7EB; background: #000000; }
          .email-container { max-width: 680px; margin: 40px auto; background: linear-gradient(180deg, #0A0E1A 0%, #050609 100%); }
          .content-section { padding: 60px; }
          .benefit-item { padding: 18px 0 18px 50px; position: relative; color: #D1D5DB; border-left: 2px solid rgba(0, 255, 255, 0.15); margin-bottom: 4px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div style="padding: 80px 60px; text-align: center; border-bottom: 3px solid #00FFFF;">
            <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 700; background: linear-gradient(90deg, #00E5FF 0%, #B900FF 50%, #FF0099 100%); -webkit-background-clip: text; color: transparent; margin: 0;">AXIS CYBER</h1>
            <p style="color: #00FFFF; font-size: 18px; margin-top: 10px;">MESSAGE RECEIVED</p>
          </div>
          <div class="content-section">
            <p style="font-size: 18px; color: #F3F4F6;">Hi {{name}}! 👋</p>
            <p>Thank you for reaching out to <strong>Axis Cyber Technologies</strong>. We've received your message and our expert team is already reviewing your inquiry.</p>
            <p style="color: #00FFFF; font-weight: 700; margin: 30px 0;">What Happens Next?</p>
            <div class="benefit-item"><strong>📋 Review & Analysis</strong> - Within 24 hours</div>
            <div class="benefit-item"><strong>💬 Personalized Response</strong></div>
            <div class="benefit-item"><strong>🚀 Project Kickoff</strong></div>
            
            <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #FF0099; font-weight: 700;">Talk soon,</p>
              <p style="color: #00FFFF; font-weight: 700;">The Axis Cyber Team</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `,

  SERVICE_ANNOUNCEMENT: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; line-height: 1.7; color: #E5E7EB; background: #000000; margin: 0; padding: 0; }
          .email-container { max-width: 680px; margin: 40px auto; background: linear-gradient(180deg, #0A0E1A 0%, #050609 100%); border: 1px solid rgba(0, 255, 255, 0.15); }
          .header-section { padding: 80px 60px; text-align: center; border-bottom: 3px solid #00FFFF; }
          .main-heading { font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 700; background: linear-gradient(90deg, #00E5FF 0%, #B900FF 50%, #FF0099 100%); -webkit-background-clip: text; color: transparent; }
          .content-section { padding: 60px; background: rgba(5,6,10,0.4); }
          .new-badge { display: inline-block; background: #FF0099; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 12px; margin-bottom: 15px; text-transform: uppercase; }
          .service-title { font-size: 32px; color: #00FFFF; font-weight: 700; margin-bottom: 20px; }
          .service-desc { font-size: 16px; color: #D1D5DB; margin-bottom: 30px; }
          .cta-button { display: inline-block; background: linear-gradient(90deg, #00FFFF, #DD00FF); color: white; font-weight: 700; padding: 15px 30px; border-radius: 8px; text-decoration: none; margin-top: 30px; }
          .footer-section { text-align: center; padding: 50px; background: rgba(0,0,0,0.6); border-top: 1px solid rgba(0,255,255,0.2); }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header-section">
            <h1 class="main-heading">AXIS CYBER</h1>
            <p style="color: #00FFFF; font-size: 18px;">ANNOUNCEMENT</p>
          </div>
          <div class="content-section">
            <div class="new-badge">New Service Launch</div>
            <h2 class="service-title">{{serviceName}}</h2>
            <p class="service-desc">{{serviceDescription}}</p>
            
            <p style="color: #D1D5DB;">We are thrilled to expand our capabilities to better serve your business needs. Our new <strong>{{serviceName}}</strong> suite is designed for scale, security, and performance.</p>
            
            <div style="text-align: center;">
              <a href="{{serviceUrl}}" class="cta-button">Explore New Service</a>
            </div>
          </div>
          <div class="footer-section">
             <p style="color: #00FFFF; font-weight: 700;">AXIS CYBER TECHNOLOGIES</p>
             <p style="color: #4B5563; font-size: 12px; margin-top: 10px;">© {{currentYear}} Axis Cyber Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
};
