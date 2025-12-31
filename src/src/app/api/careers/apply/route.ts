import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse, validationError } from '@/lib/api-response';
import { validate } from '@/lib/api-validator';
import { sendJobApplicationNotification } from '@/lib/email';
import { notifyJobApplicationToSlack, triggerWebhook } from '@/lib/webhooks';

/**
 * POST /api/careers/apply
 * Submit job application
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation schema
    const schema = {
      job_id: { required: true, type: 'string' as const },
      applicant_name: { required: true, type: 'string' as const, minLength: 2, maxLength: 255 },
      applicant_email: { required: true, type: 'email' as const },
      applicant_phone: { required: false, type: 'string' as const, maxLength: 50 },
      applicant_location: { required: false, type: 'string' as const, maxLength: 100 },
      resume_url: { required: false, type: 'string' as const },
      cover_letter: { required: false, type: 'string' as const, maxLength: 2000 },
      portfolio_url: { required: false, type: 'string' as const },
      linkedin_url: { required: false, type: 'string' as const },
      github_url: { required: false, type: 'string' as const },
      years_experience: { required: false, type: 'number' as const },
      applicant_current_role: { required: false, type: 'string' as const },
      applicant_current_company: { required: false, type: 'string' as const },
      expected_salary: { required: false, type: 'string' as const },
      availability: { required: false, type: 'string' as const },
    };

    const validation = validate(body, schema);
    if (!validation.isValid) {
      const { response, status } = validationError(validation.errors);
      return NextResponse.json(response, { status });
    }

    // Verify job exists and is open
    const { data: job, error: jobError } = await (supabaseTyped.from('career_listings') as any)
      .select('id, status, title, applications_count')
      .eq('id', body.job_id)
      .single();

    if (jobError || !job || (job as any).status !== 'open') {
      const { response, status } = errorResponse(
        'Job listing not found or closed',
        'JOB_NOT_FOUND',
        null,
        404
      );
      return NextResponse.json(response, { status });
    }

    // Insert application
    const { data, error } = await (supabaseTyped.from('job_applications') as any)
      .insert([{
        job_id: body.job_id,
        applicant_name: body.applicant_name,
        applicant_email: body.applicant_email,
        applicant_phone: body.applicant_phone || null,
        applicant_location: body.applicant_location || null,
        resume_url: body.resume_url || null,
        cover_letter: body.cover_letter || null,
        portfolio_url: body.portfolio_url || null,
        linkedin_url: body.linkedin_url || null,
        github_url: body.github_url || null,
        years_experience: body.years_experience || null,
        applicant_current_role: body.applicant_current_role || null,
        applicant_current_company: body.applicant_current_company || null,
        expected_salary: body.expected_salary || null,
        availability: body.availability || null,
        status: 'new',
      }])
      .select()
      .single();

    if (error) {
      console.error('Job application error:', error);
      const { response, status } = errorResponse(
        'Failed to submit application',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    // Increment applications count
    await (supabaseTyped.from('career_listings') as any)
      .update({ applications_count: ((job as any)?.applications_count || 0) + 1 })
      .eq('id', body.job_id);

    // Send notifications (non-blocking)
    Promise.all([
      // Email to admin
      sendJobApplicationNotification({
        jobTitle: (job as any).title,
        applicantName: body.applicant_name,
        applicantEmail: body.applicant_email,
        applicantPhone: body.applicant_phone,
        resumeUrl: body.resume_url,
        coverLetter: body.cover_letter,
        yearsExperience: body.years_experience,
      }),
      // Slack notification
      notifyJobApplicationToSlack({
        jobTitle: (job as any).title,
        applicantName: body.applicant_name,
        applicantEmail: body.applicant_email,
        yearsExperience: body.years_experience,
      }),
      // Trigger webhook
      triggerWebhook('job.applied', {
        id: (data as any).id,
        job_id: body.job_id,
        job_title: (job as any).title,
        applicant: body.applicant_name,
      }),
    ]).catch(err => {
      console.error('Notification error (non-blocking):', err);
    });

    return NextResponse.json(
      successResponse(
        {
          id: (data as any).id,
          message: 'Application submitted successfully! We will review your application and get back to you soon.'
        },
        { appliedAt: (data as any).applied_at }
      ),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Job application API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}