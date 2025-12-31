import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, WebhookPayload } from '@/lib/webhooks';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * POST /api/webhooks
 * Receive webhooks from external services (Zapier, Make.com, etc.)
 * 
 * Security: Requires webhook signature verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-webhook-signature');
    const timestamp = request.headers.get('x-webhook-timestamp');

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookSecret && (!signature || !verifyWebhookSignature(body, signature, webhookSecret))) {
      const { response, status } = errorResponse(
        'Invalid webhook signature',
        'INVALID_SIGNATURE',
        null,
        401
      );
      return NextResponse.json(response, { status });
    }

    // Parse payload
    let payload: WebhookPayload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      const { response, status } = errorResponse(
        'Invalid JSON payload',
        'INVALID_JSON',
        null,
        400
      );
      return NextResponse.json(response, { status });
    }

    // Validate required fields
    if (!payload.event || !payload.data) {
      const { response, status } = errorResponse(
        'Missing required fields: event and data',
        'INVALID_PAYLOAD',
        null,
        400
      );
      return NextResponse.json(response, { status });
    }

    // Process webhook based on event type
    console.log(`Received webhook: ${payload.event}`, {
      timestamp: payload.timestamp,
      metadata: payload.metadata,
    });

    // Here you can add custom logic for different event types
    switch (payload.event) {
      case 'contact.created':
        // Handle contact creation from external source
        console.log('Contact created:', payload.data);
        break;
      
      case 'newsletter.subscribed':
        // Handle newsletter subscription
        console.log('Newsletter subscription:', payload.data);
        break;
      
      case 'blog.published':
        // Handle blog post publication
        console.log('Blog published:', payload.data);
        break;
      
      case 'consultation.requested':
        // Handle consultation request
        console.log('Consultation requested:', payload.data);
        break;
      
      case 'job.applied':
        // Handle job application
        console.log('Job application:', payload.data);
        break;
      
      default:
        console.log('Unknown event type:', payload.event);
    }

    return NextResponse.json(
      successResponse({
        received: true,
        event: payload.event,
        processedAt: new Date().toISOString(),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    const { response, status } = errorResponse(
      'Webhook processing failed',
      'WEBHOOK_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}

/**
 * GET /api/webhooks
 * Webhook endpoint info
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    endpoint: '/api/webhooks',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'Required if WEBHOOK_SECRET is configured',
      'X-Webhook-Timestamp': 'ISO 8601 timestamp',
    },
    payload: {
      event: 'Event type (e.g., contact.created)',
      timestamp: 'ISO 8601 timestamp',
      data: 'Event-specific data',
      metadata: 'Optional metadata',
    },
    supportedEvents: [
      'contact.created',
      'newsletter.subscribed',
      'consultation.requested',
      'job.applied',
      'blog.published',
      'case_study.published',
    ],
  });
}
