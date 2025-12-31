import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { successResponse, errorResponse, validationError } from '@/lib/api-response';
import { validate, commonSchemas } from '@/lib/api-validator';
import { sendNewsletterConfirmation } from '@/lib/email';
import { notifyNewsletterToDiscord, triggerWebhook } from '@/lib/webhooks';

/**
 * POST /api/newsletter
 * Subscribe to newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validate(body, commonSchemas.newsletter);
    if (!validation.isValid) {
      const { response, status } = validationError(validation.errors);
      return NextResponse.json(response, { status });
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('id, is_active')
      .eq('email', body.email)
      .single();

    if (existing) {
      if (existing.is_active) {
        const { response, status } = errorResponse(
          'This email is already subscribed',
          'DUPLICATE_EMAIL',
          null,
          409
        );
        return NextResponse.json(response, { status });
      } else {
        // Reactivate subscription
        const { data, error } = await supabase
          .from('newsletter_subscriptions')
          .update({ is_active: true })
          .eq('email', body.email)
          .select()
          .single();

        if (error) {
          const { response, status } = errorResponse(
            'Failed to reactivate subscription',
            'DATABASE_ERROR',
            error.message,
            500
          );
          return NextResponse.json(response, { status });
        }

        // Send welcome email (non-blocking)
        sendNewsletterConfirmation({
          email: body.email,
          preferences: body.preferences,
        }).catch(err => console.error('Email error:', err));

        return NextResponse.json(
          successResponse({ 
            message: 'Successfully reactivated your subscription!',
            id: data.id 
          }),
          { status: 200 }
        );
      }
    }

    // Insert new subscription
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        email: body.email,
        source: body.source || 'api',
        is_active: true,
      }])
      .select()
      .single();

    if (error) {
      console.error('Newsletter subscription error:', error);
      const { response, status } = errorResponse(
        'Failed to subscribe to newsletter',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    // Send notifications (non-blocking)
    Promise.all([
      // Welcome email to subscriber
      sendNewsletterConfirmation({
        email: body.email,
        preferences: body.preferences,
      }),
      // Discord notification
      notifyNewsletterToDiscord({
        email: body.email,
        preferences: body.preferences,
      }),
      // Trigger webhook
      triggerWebhook('newsletter.subscribed', {
        id: data.id,
        email: body.email,
        source: body.source,
      }),
    ]).catch(err => {
      console.error('Notification error (non-blocking):', err);
    });

    return NextResponse.json(
      successResponse(
        { id: data.id, message: 'Successfully subscribed! Check your email for confirmation.' },
        { subscribedAt: data.subscribed_at }
      ),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Newsletter API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}

/**
 * OPTIONS /api/newsletter
 * CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}