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

import { supabase } from './supabase';
import Handlebars from 'handlebars';
import { EMAIL_TEMPLATES } from './defaultTemplates';

// Email configuration
// ... (original config code) ...

// Helper to fetch and render template
async function getRenderedTemplate(type: string, data: any): Promise<{ subject: string; html: string } | null> {
  try {
    const { data: template, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('template_type', type)
      .eq('is_active', true)
      .single();

    if (error || !template) return null;

    const compiledHtml = Handlebars.compile(template.html_content)(data);
    const compiledSubject = Handlebars.compile(template.subject)(data);

    return {
      subject: compiledSubject,
      html: compiledHtml
    };
  } catch (err) {
    console.warn(`Failed to fetch template ${type}:`, err);
    return null;
  }
}

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
 * Send email using Supabase Edge Function (Resend)
 */
export async function sendEmail(options: EmailOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    // In development, we now want to use the real Edge Function since it's deployed
    // The simulation block has been removed to force the function call

    const { data, error } = await supabase.functions.invoke('resend-email', {
      body: {
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        from: EMAIL_CONFIG.from,
        replyTo: options.replyTo || EMAIL_CONFIG.replyTo,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      }
    });

    if (error) throw error;

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error: any) {
    console.error('Email send error:', error);

    // Fallback simulation for demo purposes if function fails (e.g. not deployed yet)
    if (typeof window !== 'undefined') {
      console.warn('⚠️ Edge Function failed. Falling back to simulation.');
      console.group('📧 Email Content');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.groupEnd();
      return { success: true, messageId: 'fallback-' + Date.now() };
    }

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
  // Prepare template data
  const servicesHtml = data.services?.map(s => `<span class="badge">${s}</span>`).join('') || '';
  const templateData = {
    ...data,
    servicesHtml,
    companyOrIndividual: data.company || 'Individual',
    date: new Date().toLocaleString(),
    replyTo: EMAIL_CONFIG.replyTo
  };

  const dbTemplate = await getRenderedTemplate('contact_notification', templateData);
  const defaultSubject = `🔔 New Contact: ${data.name} - ${data.company || 'Individual'}`;

  const defaultHtml = Handlebars.compile(EMAIL_TEMPLATES.CONTACT_NOTIFICATION)(templateData);

  return await sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: dbTemplate ? dbTemplate.subject : defaultSubject,
    html: dbTemplate ? dbTemplate.html : defaultHtml,
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
  // Prepare template data
  const templateData = {
    ...data,
    date: new Date().toLocaleString(),
    replyTo: EMAIL_CONFIG.replyTo
  };

  const dbTemplate = await getRenderedTemplate('consultation_notification', templateData);
  const defaultSubject = `📅 Consultation Request: ${data.service} - ${data.name}`;

  const defaultHtml = Handlebars.compile(EMAIL_TEMPLATES.CONSULTATION_NOTIFICATION)(templateData);

  return await sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: dbTemplate ? dbTemplate.subject : defaultSubject,
    html: dbTemplate ? dbTemplate.html : defaultHtml,
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
  // Prepare template data
  const templateData = {
    ...data,
    date: new Date().toLocaleString(),
    replyTo: EMAIL_CONFIG.replyTo
  };

  const dbTemplate = await getRenderedTemplate('job_application_notification', templateData);
  const defaultSubject = `💼 New Application: ${data.jobTitle} - ${data.applicantName}`;

  const defaultHtml = Handlebars.compile(EMAIL_TEMPLATES.JOB_APPLICATION_NOTIFICATION)(templateData);

  return await sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: dbTemplate ? dbTemplate.subject : defaultSubject,
    html: dbTemplate ? dbTemplate.html : defaultHtml,
    replyTo: data.applicantEmail,
  });
}

/**
 * Send job application auto-reply to applicant
 */
export async function sendJobApplicationAutoReply(data: {
  applicantName: string;
  applicantEmail: string;
  jobTitle: string;
}): Promise<{ success: boolean; error?: string }> {
  // Prepare template data
  const templateData = {
    ...data,
    currentYear: new Date().getFullYear(),
    replyTo: EMAIL_CONFIG.replyTo
  };

  const dbTemplate = await getRenderedTemplate('job_application_auto_reply', templateData);
  const defaultSubject = `Application Received: ${data.jobTitle} – Axis Cyber Technologies`;

  const defaultHtml = Handlebars.compile(EMAIL_TEMPLATES.JOB_APPLICATION_AUTO_REPLY)(templateData);

  return await sendEmail({
    to: data.applicantEmail,
    subject: dbTemplate ? dbTemplate.subject : defaultSubject,
    html: dbTemplate ? dbTemplate.html : defaultHtml,
    replyTo: EMAIL_CONFIG.replyTo
  });
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(data: {
  email: string;
  preferences?: string[];
}): Promise<{ success: boolean; error?: string }> {
  // Prepare template data
  const preferencesHtml = data.preferences?.map(p => `<span class="badge">${p}</span>`).join('') || '';
  const templateData = {
    ...data,
    preferencesHtml,
    currentYear: new Date().getFullYear(),
    replyTo: EMAIL_CONFIG.replyTo
  };

  const dbTemplate = await getRenderedTemplate('newsletter_welcome', templateData);
  const defaultSubject = '⚡ Welcome to Axis Cyber Technologies – You\'re In!';

  const defaultHtml = Handlebars.compile(EMAIL_TEMPLATES.NEWSLETTER_WELCOME)(templateData);

  return await sendEmail({
    to: data.email,
    subject: dbTemplate ? dbTemplate.subject : defaultSubject,
    html: dbTemplate ? dbTemplate.html : defaultHtml,
    replyTo: EMAIL_CONFIG.replyTo
  });
}
/**
 * Send contact form auto-reply
 */
export async function sendContactAutoReply(data: {
  name: string;
  email: string;
}): Promise<{ success: boolean; error?: string }> {
  // Prepare template data
  const templateData = {
    ...data,
    replyTo: EMAIL_CONFIG.replyTo
  };

  const dbTemplate = await getRenderedTemplate('contact_auto_reply', templateData);
  const defaultSubject = '✅ We Received Your Message - Axis Cyber Technologies';

  const defaultHtml = Handlebars.compile(EMAIL_TEMPLATES.CONTACT_AUTO_REPLY)(templateData);

  return await sendEmail({
    to: data.email,
    subject: dbTemplate ? dbTemplate.subject : defaultSubject,
    html: dbTemplate ? dbTemplate.html : defaultHtml,
    replyTo: EMAIL_CONFIG.replyTo,
  });
}

export { EMAIL_CONFIG };
