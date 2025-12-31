/**
 * Webhook System
 * Handles external webhook integrations and event notifications
 * 
 * Supported integrations:
 * - Slack notifications
 * - Discord notifications
 * - Custom webhook endpoints
 * - Zapier/Make.com integrations
 */

import crypto from 'crypto';

// Webhook configuration
const WEBHOOK_CONFIG = {
  slack: {
    enabled: !!process.env.SLACK_WEBHOOK_URL,
    url: process.env.SLACK_WEBHOOK_URL || '',
    channel: process.env.SLACK_CHANNEL || '#notifications',
  },
  discord: {
    enabled: !!process.env.DISCORD_WEBHOOK_URL,
    url: process.env.DISCORD_WEBHOOK_URL || '',
  },
  custom: {
    enabled: !!process.env.CUSTOM_WEBHOOK_URL,
    url: process.env.CUSTOM_WEBHOOK_URL || '',
    secret: process.env.WEBHOOK_SECRET || '',
  },
};

export type WebhookEvent = 
  | 'contact.created'
  | 'newsletter.subscribed'
  | 'consultation.requested'
  | 'job.applied'
  | 'blog.published'
  | 'case_study.published';

export interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  data: any;
  metadata?: {
    source?: string;
    userId?: string;
    ipAddress?: string;
  };
}

/**
 * Generate webhook signature for verification
 */
export function generateWebhookSignature(payload: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = generateWebhookSignature(payload, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Send webhook to external endpoint
 */
async function sendWebhook(url: string, payload: WebhookPayload, secret?: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const body = JSON.stringify(payload);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'User-Agent': 'Axis-Cyber-Webhooks/1.0',
    };

    // Add signature if secret provided
    if (secret) {
      headers['X-Webhook-Signature'] = generateWebhookSignature(body, secret);
      headers['X-Webhook-Timestamp'] = payload.timestamp;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Webhook send error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send Slack notification
 */
export async function sendSlackNotification(payload: {
  text: string;
  blocks?: any[];
  channel?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!WEBHOOK_CONFIG.slack.enabled) {
    console.log('Slack webhook not configured');
    return { success: false, error: 'Slack webhook not configured' };
  }

  try {
    const slackPayload = {
      text: payload.text,
      blocks: payload.blocks,
      channel: payload.channel || WEBHOOK_CONFIG.slack.channel,
    };

    const response = await fetch(WEBHOOK_CONFIG.slack.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Slack notification error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send Discord notification
 */
export async function sendDiscordNotification(payload: {
  content: string;
  embeds?: any[];
}): Promise<{ success: boolean; error?: string }> {
  if (!WEBHOOK_CONFIG.discord.enabled) {
    console.log('Discord webhook not configured');
    return { success: false, error: 'Discord webhook not configured' };
  }

  try {
    const response = await fetch(WEBHOOK_CONFIG.discord.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Discord notification error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Trigger webhook for event
 */
export async function triggerWebhook(
  event: WebhookEvent,
  data: any,
  metadata?: WebhookPayload['metadata']
): Promise<{ success: boolean; errors: string[] }> {
  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    data,
    metadata,
  };

  const errors: string[] = [];

  // Send to custom webhook if configured
  if (WEBHOOK_CONFIG.custom.enabled) {
    const result = await sendWebhook(
      WEBHOOK_CONFIG.custom.url,
      payload,
      WEBHOOK_CONFIG.custom.secret
    );
    if (!result.success) {
      errors.push(`Custom webhook: ${result.error}`);
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

/**
 * Format contact event for Slack
 */
export async function notifyContactToSlack(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<void> {
  if (!WEBHOOK_CONFIG.slack.enabled) return;

  await sendSlackNotification({
    text: `🔔 New Contact Form Submission`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🔔 New Contact Form Submission',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Name:*\n${data.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.email}`,
          },
        ],
      },
      ...(data.company ? [{
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Company:*\n${data.company}`,
          },
        ],
      }] : []),
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Received at ${new Date().toLocaleString()}`,
          },
        ],
      },
    ],
  });
}

/**
 * Format job application for Slack
 */
export async function notifyJobApplicationToSlack(data: {
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  yearsExperience?: number;
}): Promise<void> {
  if (!WEBHOOK_CONFIG.slack.enabled) return;

  await sendSlackNotification({
    text: `💼 New Job Application: ${data.jobTitle}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '💼 New Job Application',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Position:*\n${data.jobTitle}`,
          },
          {
            type: 'mrkdwn',
            text: `*Applicant:*\n${data.applicantName}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.applicantEmail}`,
          },
          ...(data.yearsExperience ? [{
            type: 'mrkdwn',
            text: `*Experience:*\n${data.yearsExperience} years`,
          }] : []),
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Applied at ${new Date().toLocaleString()}`,
          },
        ],
      },
    ],
  });
}

/**
 * Format consultation request for Discord
 */
export async function notifyConsultationToDiscord(data: {
  name: string;
  email: string;
  service: string;
  preferredDate?: string;
}): Promise<void> {
  if (!WEBHOOK_CONFIG.discord.enabled) return;

  await sendDiscordNotification({
    content: '📅 **New Consultation Request**',
    embeds: [
      {
        title: 'Consultation Request',
        color: 0x00E5FF,
        fields: [
          {
            name: 'Name',
            value: data.name,
            inline: true,
          },
          {
            name: 'Email',
            value: data.email,
            inline: true,
          },
          {
            name: 'Service',
            value: data.service,
            inline: false,
          },
          ...(data.preferredDate ? [{
            name: 'Preferred Date',
            value: data.preferredDate,
            inline: false,
          }] : []),
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'Axis Cyber Technologies',
        },
      },
    ],
  });
}

/**
 * Format newsletter subscription for Discord
 */
export async function notifyNewsletterToDiscord(data: {
  email: string;
  preferences?: string[];
}): Promise<void> {
  if (!WEBHOOK_CONFIG.discord.enabled) return;

  await sendDiscordNotification({
    content: '🚀 **New Newsletter Subscription**',
    embeds: [
      {
        title: 'Newsletter Subscription',
        color: 0xB900FF,
        fields: [
          {
            name: 'Email',
            value: data.email,
            inline: false,
          },
          ...(data.preferences && data.preferences.length > 0 ? [{
            name: 'Preferences',
            value: data.preferences.join(', '),
            inline: false,
          }] : []),
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  });
}

export { WEBHOOK_CONFIG };
