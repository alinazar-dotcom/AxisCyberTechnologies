const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Try to load dotenv if available
try {
  // Try loading both, order matters (last one might not override if keys exist? dotenv usually doesn't override)
  // Standard dotenv practice: the first one loaded wins.
  require('dotenv').config({ path: '.env.local' });
  require('dotenv').config({ path: '.env' });
} catch (e) {
  console.log('Error loading .env files', e);
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Use service role key if available for bypassing RLS, otherwise anon key
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || (!supabaseKey && !serviceRoleKey)) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

// Prefer service role key for seeding to avoid RLS issues
const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseKey);

const templates = [
  {
    name: 'Contact Notification',
    template_type: 'contact_notification',
    subject: '🔔 New Contact: {{name}} - {{companyOrIndividual}}',
    html_content: `
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
            
            {{#if services}}
            <div class="field">
              <div class="label">Interested Services:</div>
              <div class="value">
                {{servicesHtml}}
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
    `
  },
  {
    name: 'Consultation Notification',
    template_type: 'consultation_notification',
    subject: '📅 Consultation Request: {{service}} - {{name}}',
    html_content: `
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
              <strong>Requested Time:</strong> {{preferred_date}} at {{preferred_time}}
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
    `
  },
  {
    name: 'Job Application Notification',
    template_type: 'job_application_notification',
    subject: '💼 New Application: {{jobTitle}} - {{applicantName}}',
    html_content: `
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
    `
  },
  {
    name: 'Job Application Auto Reply',
    template_type: 'job_application_auto_reply',
    subject: 'Application Received: {{jobTitle}} – Axis Cyber Technologies',
    html_content: `
    <!-- ... (Same complex styling as original) ... -->
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; line-height: 1.7; color: #E5E7EB; background: #000000; margin: 0; padding: 0; }
          .email-container { max-width: 680px; margin: 40px auto; background: #0A0E1A; border-radius: 0; border: 1px solid rgba(0, 255, 255, 0.15); box-shadow: 0 20px 60px rgba(0,0,0,0.8); }
          .header-section { background: rgba(0, 47, 52, 0.4); padding: 60px 40px; text-align: center; border-bottom: 3px solid #00FFFF; }
          .main-heading { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; color: #00E5FF; text-transform: uppercase; margin: 0; }
          .sub-heading { color: #00FFFF; margin-top: 10px; letter-spacing: 0.5px; }
          .content-section { padding: 40px; background: rgba(5, 6, 10, 0.4); }
          .greeting { font-size: 18px; color: #F3F4F6; margin-bottom: 20px; }
          .intro-text { font-size: 16px; color: #D1D5DB; margin-bottom: 30px; }
          .intro-text strong { color: #00FFFF; }
          .divider { height: 1px; background: #00FFFF; opacity: 0.3; margin: 30px 0; }
          .section-title { font-size: 18px; font-weight: 700; color: #00FFFF; margin-bottom: 20px; }
          .step-item { padding: 15px 0 15px 40px; position: relative; color: #D1D5DB; border-left: 2px solid rgba(0, 255, 255, 0.15); margin-bottom: 4px; }
          .step-icon { position: absolute; left: 10px; top: 15px; }
          .signature { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
          .footer-section { padding: 30px; text-align: center; background: rgba(0,0,0,0.6); border-top: 1px solid rgba(221,0,255,0.2); }
          .footer-copyright { color: #4B5563; font-size: 12px; }
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
            
            <p class="intro-text">
              Thank you for applying for the <strong>{{jobTitle}}</strong> position at <strong>Axis Cyber Technologies</strong>. We've received your application and our hiring team is excited to review your profile.
            </p>
            
            <div class="divider"></div>
            
            <p class="section-title">What's Next in the Process?</p>
            
            <div class="step-item">
              <span class="step-icon">🔍</span>
              <strong>Initial Review</strong>
              <p style="font-size: 14px; color: #9CA3AF;">Our team will review your resume and portfolio (3-5 business days).</p>
            </div>
            
            <div class="step-item">
              <span class="step-icon">📞</span>
              <strong>First Contact</strong>
              <p style="font-size: 14px; color: #9CA3AF;">If there's a match, we'll reach out for an initial screening call.</p>
            </div>
            
            <div class="step-item">
              <span class="step-icon">💻</span>
              <strong>Technical Assessment</strong>
              <p style="font-size: 14px; color: #9CA3AF;">A deep dive into your skills with our engineering team.</p>
            </div>
            
            <div class="signature">
              <p style="color: #FF0099; font-weight: 700; margin-bottom: 8px;">Best of luck,</p>
              <p style="color: #00FFFF; font-weight: 700;">The Axis Cyber Careers Team</p>
            </div>
          </div>
          
          <div class="footer-section">
            <p style="color: #00FFFF; font-family: sans-serif; font-weight: 700; font-size: 16px; margin-bottom: 5px;">AXIS CYBER TECHNOLOGIES</p>
            <p class="footer-copyright">© {{currentYear}} Axis Cyber Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `
  },
  {
    name: 'Newsletter Welcome',
    template_type: 'newsletter_welcome',
    subject: '🚀 Welcome to Axis Cyber Technologies Newsletter!',
    html_content: `
    <!-- ... (Same complex styling as original) ... -->
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          /* Minified styles for brevity in seed script */
          body { font-family: Inter, sans-serif; background: #000; color: #E5E7EB; margin: 0; padding: 0; }
          .email-container { max-width: 680px; margin: 40px auto; background: #0A0E1A; border: 1px solid rgba(0,255,255,0.15); box-shadow: 0 0 100px rgba(0,255,255,0.1); }
          .header-section { background: rgba(0,47,52,0.4); padding: 60px; text-align: center; border-bottom: 1px solid #00FFFF; }
          .main-heading { font-family: sans-serif; font-size: 42px; font-weight: 700; margin: 0; color: #00E5FF; }
          .content-section { padding: 40px; background: rgba(5,6,10,0.4); }
          .greeting { font-size: 18px; margin-bottom: 24px; color: #F3F4F6; }
          .benefits-list { list-style: none; padding: 0; }
          .benefit-item { padding: 10px 0 10px 40px; position: relative; color: #D1D5DB; }
          .benefit-icon { position: absolute; left: 0; top: 10px; }
          .footer-section { text-align: center; padding: 40px; background: rgba(0,0,0,0.6); color: #4B5563; font-size: 12px; }
          a { color: #00FFFF; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header-section">
            <h1 class="main-heading">AXIS CYBER</h1>
            <p style="color: #00FFFF;">TECHNOLOGIES</p>
          </div>
          <div class="content-section">
             <p class="greeting">Hey there! 👋</p>
             <p>Welcome to <strong>Axis Cyber Technologies</strong>. You've joined a community of innovators.</p>
             
             <p style="color: #00FFFF; font-weight: 700; margin-top: 30px;">What You'll Receive:</p>
             <ul class="benefits-list">
               <li class="benefit-item"><span class="benefit-icon">🚀</span> <strong>Insights:</strong> Latest tech trends</li>
               <li class="benefit-item"><span class="benefit-icon">💡</span> <strong>Best Practices:</strong> Expert tips</li>
               <li class="benefit-item"><span class="benefit-icon">🎯</span> <strong>Offers:</strong> Exclusive promotions</li>
             </ul>
             
             {{#if preferencesHtml}}
             <div style="margin-top: 30px; padding: 20px; border: 1px solid rgba(0,255,255,0.2); border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #00FFFF;">📌 Your Interests:</p>
                {{preferencesHtml}}
             </div>
             {{/if}}
             
             <div style="margin-top: 40px; text-align: center;">
                <p style="color: #FF0099; font-weight: 700;">Stay Cyber,</p>
                <p style="color: #00FFFF; font-weight: 700;">The Axis Cyber Team</p>
             </div>
          </div>
          <div class="footer-section">
            <p style="color: #00FFFF; font-weight: 700; font-size: 14px;">AXIS CYBER TECHNOLOGIES</p>
            <p>Building Tomorrow's Software, Today</p>
            <p>
              <a href="mailto:{{replyTo}}">Contact Us</a> | <a href="https://axiscyber.com">Visit Website</a>
            </p>
            <p>© {{currentYear}} Axis Cyber Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `
  },
  {
    name: 'Contact Auto Reply',
    template_type: 'contact_auto_reply',
    subject: '✅ We Received Your Message - Axis Cyber Technologies',
    html_content: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00E5FF, #B900FF); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 40px; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          .checkmark { font-size: 64px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="checkmark">✅</div>
            <h1 style="margin: 10px 0 0 0;">We Got Your Message!</h1>
          </div>
          <div class="content">
            <p>Hi {{name}},</p>
            
            <p>Thank you for contacting Axis Cyber Technologies! We've received your message and our team will review it shortly.</p>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your inquiry within 24 hours</li>
              <li>You'll receive a personalized response from our experts</li>
              <li>We'll discuss how we can help achieve your goals</li>
            </ul>
            
            <p><strong>Need immediate assistance?</strong></p>
            <p>Our global offices operate 24/7. Feel free to reach out directly:</p>
            <ul>
              <li>📧 Email: {{replyTo}}</li>
              <li>🌐 Website: www.axiscyber.tech</li>
            </ul>
            
            <p>We're excited to potentially work with you!</p>
            
            <p>Best regards,<br>
            <strong>The Axis Cyber Team</strong></p>
          </div>
          <div class="footer">
            <p>Axis Cyber Technologies - Global Software Engineering Excellence</p>
            <p>🇵🇰 Lahore | 🇦🇪 Dubai | 🇺🇸 Los Angeles | 🇬🇧 London</p>
          </div>
        </div>
      </body>
    </html>
    `
  },
  {
    name: 'Service Announcement',
    template_type: 'service_announcement',
    subject: '🚀 Introducing Our New Service: {{serviceName}}',
    html_content: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; line-height: 1.7; color: #E5E7EB; background: #000000; margin: 0; padding: 0; }
          .email-container { max-width: 680px; margin: 40px auto; background: linear-gradient(180deg, #0A0E1A 0%, #050609 100%); border: 1px solid rgba(0, 255, 255, 0.15); box-shadow: 0 0 100px rgba(0,255,255,0.1); }
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
  }
];

async function seedTemplates() {
  console.log('Starting template seed...');

  for (const template of templates) {
    console.log(`Processing: ${template.name}`);

    // Check if exists
    const { data: existing } = await supabase
      .from('email_templates')
      .select('id')
      .eq('template_type', template.template_type)
      .single();

    if (existing) {
      // Update
      const { error } = await supabase
        .from('email_templates')
        .update({
          subject: template.subject,
          html_content: template.html_content,
          is_active: true
        })
        .eq('id', existing.id);

      if (error) console.error(`Error updating ${template.name}:`, error);
      else console.log(`Updated: ${template.name}`);
    } else {
      // Insert
      console.log(`Inserting: ${template.name}`);
      const { error } = await supabase
        .from('email_templates')
        .insert([{
          ...template,
          // Add default values for required fields if any (though these seem to cover it)
          is_active: true
        }]);

      if (error) {
        console.error(`Error inserting ${template.name}:`, error);
        console.error(JSON.stringify(error, null, 2));
      }
      else console.log(`Inserted: ${template.name}`);
    }
  }

  console.log('Seed complete!');
}

seedTemplates();
