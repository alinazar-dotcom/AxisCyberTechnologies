/**
 * Email Service
 * Handles email notifications using Resend
 * 
 * Setup:
 * 1. Sign up at https://resend.com
 * 2. Get API key
 * 3. Add to .env.local: RESEND_API_KEY=re_xxxxx
 * 4. Verify domain or use resend test emails
 */

import { Resend } from 'resend';

// Initialize Resend client
// WARNING: Using Resend client-side exposes your API key. 
// For production, use Supabase Edge Functions or a backend proxy.
const resendApiKey = import.meta.env.VITE_RESEND_API_KEY || 're_demo_key';
const resend = new Resend(resendApiKey);

// Email configuration
const EMAIL_CONFIG = {
  from: import.meta.env.VITE_EMAIL_FROM || 'Axis Cyber Technologies <noreply@axiscyber.tech>',
  replyTo: import.meta.env.VITE_EMAIL_REPLY_TO || 'contact@axiscyber.tech',
  adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'admin@axiscyber.tech',
  ccEmails: import.meta.env.VITE_EMAIL_CC?.split(',') || [],
};

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
}

/**
 * Send email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    // In development, log email instead of sending
    if (import.meta.env.DEV && !import.meta.env.VITE_RESEND_API_KEY) {
      console.log('📧 Email (Development Mode):');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('HTML:', options.html.substring(0, 200) + '...');
      return {
        success: true,
        messageId: 'dev-' + Date.now(),
      };
    }

    const data = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo || EMAIL_CONFIG.replyTo,
      cc: options.cc,
      bcc: options.bcc,
    });

    return {
      success: true,
      messageId: (data as any).id || (data as any).data?.id,
    };
  } catch (error: any) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send email',
    };
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  services?: string[];
  budget?: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
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
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            
            ${data.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ''}
            
            ${data.budget ? `
            <div class="field">
              <div class="label">Budget:</div>
              <div class="value">${data.budget}</div>
            </div>
            ` : ''}
            
            ${data.services && data.services.length > 0 ? `
            <div class="field">
              <div class="label">Interested Services:</div>
              <div class="value">
                ${data.services.map(s => `<span class="badge">${s}</span>`).join('')}
              </div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>Received at ${new Date().toLocaleString()}</p>
            <p>Axis Cyber Technologies - Global Software Engineering</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: `🔔 New Contact: ${data.name} - ${data.company || 'Individual'}`,
    html,
    replyTo: data.email,
  });
}

/**
 * Send consultation request notification to admin
 */
export async function sendConsultationNotification(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
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
            ${data.preferred_date ? `
            <div class="urgent">
              <strong>Requested Time:</strong> ${data.preferred_date} at ${data.preferred_time || 'Any time'}
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            
            ${data.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Service Interested:</div>
              <div class="value"><strong>${data.service}</strong></div>
            </div>
            
            ${data.message ? `
            <div class="field">
              <div class="label">Additional Notes:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Received at ${new Date().toLocaleString()}</p>
            <p>⏰ Please respond within 24 hours</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: `📅 Consultation Request: ${data.service} - ${data.name}`,
    html,
    replyTo: data.email,
  });
}

/**
 * Send job application notification to admin
 */
export async function sendJobApplicationNotification(data: {
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  yearsExperience?: number;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
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
            <h2 style="margin: 10px 0 0 0;">${data.jobTitle}</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Applicant:</div>
              <div class="value">${data.applicantName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.applicantEmail}">${data.applicantEmail}</a></div>
            </div>
            
            ${data.applicantPhone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.applicantPhone}</div>
            </div>
            ` : ''}
            
            ${data.yearsExperience ? `
            <div class="field">
              <div class="label">Experience:</div>
              <div class="value">${data.yearsExperience} years</div>
            </div>
            ` : ''}
            
            ${data.coverLetter ? `
            <div class="field">
              <div class="label">Cover Letter:</div>
              <div class="value">${data.coverLetter.substring(0, 300).replace(/\n/g, '<br>')}${data.coverLetter.length > 300 ? '...' : ''}</div>
            </div>
            ` : ''}
            
            ${data.resumeUrl ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.resumeUrl}" class="button">📄 View Resume</a>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Received at ${new Date().toLocaleString()}</p>
            <p>Review in your admin dashboard</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: `💼 New Application: ${data.jobTitle} - ${data.applicantName}`,
    html,
    replyTo: data.applicantEmail,
  });
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(data: {
  email: string;
  preferences?: string[];
}): Promise<{ success: boolean; error?: string }> {
  const html = `
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
          .logo { font-size: 48px; margin-bottom: 10px; }
          .badge { display: inline-block; background: #00E5FF; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚀</div>
            <h1 style="margin: 0;">Welcome to Axis Cyber!</h1>
            <p style="margin: 10px 0 0 0;">You're now subscribed to our newsletter</p>
          </div>
          <div class="content">
            <p>Hi there!</p>
            
            <p>Thank you for subscribing to the Axis Cyber Technologies newsletter. You'll now receive:</p>
            
            <ul>
              <li>🚀 Latest technology insights</li>
              <li>💡 Industry best practices</li>
              <li>📊 Case studies & success stories</li>
              <li>🎯 Exclusive offers & updates</li>
            </ul>
            
            ${data.preferences && data.preferences.length > 0 ? `
            <p><strong>Your preferences:</strong></p>
            <p>${data.preferences.map(p => `<span class="badge">${p}</span>`).join(' ')}</p>
            ` : ''}
            
            <p>We operate 24/7 across our global offices in:</p>
            <ul>
              <li>🇵🇰 Lahore, Pakistan</li>
              <li>🇦🇪 Dubai, UAE</li>
              <li>🇺🇸 Los Angeles, USA</li>
              <li>🇬🇧 London, UK</li>
            </ul>
            
            <p>Stay tuned for amazing content!</p>
            
            <p>Best regards,<br>
            <strong>The Axis Cyber Team</strong></p>
          </div>
          <div class="footer">
            <p>Axis Cyber Technologies - Next-Generation Software Engineering</p>
            <p><a href="mailto:${EMAIL_CONFIG.replyTo}">Contact Us</a> | <a href="#">Unsubscribe</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to: data.email,
    subject: '🚀 Welcome to Axis Cyber Technologies Newsletter!',
    html,
  });
}

/**
 * Send contact form auto-reply
 */
export async function sendContactAutoReply(data: {
  name: string;
  email: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
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
            <p>Hi ${data.name},</p>
            
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
              <li>📧 Email: ${EMAIL_CONFIG.replyTo}</li>
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
  `;

  return await sendEmail({
    to: data.email,
    subject: '✅ We Received Your Message - Axis Cyber Technologies',
    html,
  });
}

export { EMAIL_CONFIG };
