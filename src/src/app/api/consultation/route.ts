import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { successResponse, errorResponse, validationError } from '@/lib/api-response';
import { validate, commonSchemas } from '@/lib/api-validator';
import { sendConsultationNotification } from '@/lib/email';
import { notifyConsultationToDiscord, triggerWebhook } from '@/lib/webhooks';

/**
 * POST /api/consultation
 * Submit consultation request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validate(body, commonSchemas.consultation);
    if (!validation.isValid) {
      const { response, status } = validationError(validation.errors);
      return NextResponse.json(response, { status });
    }

    // Insert into database
    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([{
        name: body.name,
        email: body.email,
        company: body.company || null,
        phone: body.phone || null,
        project_type: body.project_type,
        budget_range: body.budget_range || null,
        timeline: body.timeline || null,
        message: body.message || null,
        status: 'pending',
      }])
      .select()
      .single();

    if (error) {
      console.error('Consultation request error:', error);
      const { response, status } = errorResponse(
        'Failed to submit consultation request',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    // Send notifications (non-blocking)
    Promise.all([
      // Email to admin
      sendConsultationNotification({
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.project_type,
        preferred_date: body.preferred_date,
        preferred_time: body.preferred_time,
        message: body.message,
      }),
      // Discord notification
      notifyConsultationToDiscord({
        name: body.name,
        email: body.email,
        service: body.project_type,
        preferredDate: body.preferred_date,
      }),
      // Trigger webhook
      triggerWebhook('consultation.requested', {
        id: data.id,
        name: body.name,
        email: body.email,
        service: body.project_type,
      }),
    ]).catch(err => {
      console.error('Notification error (non-blocking):', err);
    });

    return NextResponse.json(
      successResponse(
        { 
          id: data.id, 
          message: 'Consultation request submitted successfully! We will contact you within 24 hours.' 
        },
        { requestedAt: data.requested_at }
      ),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Consultation API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}