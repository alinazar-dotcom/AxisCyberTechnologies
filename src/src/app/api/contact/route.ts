import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { successResponse, errorResponse, validationError } from '@/lib/api-response';
import { validate, commonSchemas } from '@/lib/api-validator';
import { sendContactNotification, sendContactAutoReply } from '@/lib/email';
import { notifyContactToSlack, triggerWebhook } from '@/lib/webhooks';

/**
 * POST /api/contact
 * Submit contact form
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validate(body, commonSchemas.contact);
    if (!validation.isValid) {
      const { response, status } = validationError(validation.errors);
      return NextResponse.json(response, { status });
    }

    // Insert into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: body.name,
        email: body.email,
        company: body.company || null,
        phone: body.phone || null,
        message: body.message,
        services: body.services,
        status: 'new',
      }])
      .select()
      .single();

    if (error) {
      console.error('Contact form submission error:', error);
      const { response, status } = errorResponse(
        'Failed to submit contact form',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    // Send notifications (non-blocking)
    Promise.all([
      // Email to admin
      sendContactNotification({
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        message: body.message,
        services: body.services,
        budget: body.budget,
      }),
      // Auto-reply to user
      sendContactAutoReply({
        name: body.name,
        email: body.email,
      }),
      // Slack notification
      notifyContactToSlack({
        name: body.name,
        email: body.email,
        company: body.company,
        message: body.message,
      }),
      // Trigger webhook
      triggerWebhook('contact.created', {
        id: data.id,
        name: body.name,
        email: body.email,
        company: body.company,
      }),
    ]).catch(err => {
      console.error('Notification error (non-blocking):', err);
    });

    return NextResponse.json(
      successResponse(
        { id: data.id, message: 'Contact form submitted successfully! We\'ll get back to you within 24 hours.' },
        { submittedAt: data.submitted_at }
      ),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact API error:', error);
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
 * OPTIONS /api/contact
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