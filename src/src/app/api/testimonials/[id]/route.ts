import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/testimonials/[id]
 * Fetch a single testimonial by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const { data, error } = await supabaseTyped
            .from('testimonials')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Testimonial fetch error:', error);
            const { response, status } = errorResponse(
                'Failed to fetch testimonial',
                'DATABASE_ERROR',
                error.message,
                error.code === 'PGRST116' ? 404 : 500
            );
            return NextResponse.json(response, { status });
        }

        return NextResponse.json(successResponse({ testimonial: data }), {
            status: 200,
        });
    } catch (error: any) {
        console.error('Testimonial API error:', error);
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
 * PUT /api/testimonials/[id]
 * Update an existing testimonial
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        // Map form fields to database columns
        const testimonialData: any = {
            client_name: body.client_name,
            client_role: body.client_role || body.position,
            client_company: body.client_company || body.company,
            client_avatar: body.client_avatar || body.avatar_url,
            client_location: body.client_location,
            content: body.content,
            rating: body.rating,
            service_provided: body.service_provided,
            status: (body.status === 'approved' ? 'published' : body.status === 'rejected' ? 'archived' : body.status === 'pending' ? 'draft' : body.status),
            is_featured: body.is_featured,
            is_verified: body.is_verified,
            display_order: body.display_order,
            updated_at: new Date().toISOString(),
        };

        // Remove undefined fields to avoid overwriting with null if not intended
        Object.keys(testimonialData).forEach(
            (key) => testimonialData[key] === undefined && delete testimonialData[key]
        );

        const { data, error } = await supabaseTyped
            .from('testimonials')
            .update(testimonialData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Testimonial update error:', error);
            const { response, status } = errorResponse(
                'Failed to update testimonial',
                'DATABASE_ERROR',
                error.message,
                500
            );
            return NextResponse.json(response, { status });
        }

        return NextResponse.json(successResponse({ testimonial: data }), {
            status: 200,
        });
    } catch (error: any) {
        console.error('Testimonial update API error:', error);
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
 * DELETE /api/testimonials/[id]
 * Delete a testimonial
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const { error } = await supabaseTyped
            .from('testimonials')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Testimonial deletion error:', error);
            const { response, status } = errorResponse(
                'Failed to delete testimonial',
                'DATABASE_ERROR',
                error.message,
                500
            );
            return NextResponse.json(response, { status });
        }

        return NextResponse.json(
            successResponse({ message: 'Testimonial deleted successfully' }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Testimonial deletion API error:', error);
        const { response, status } = errorResponse(
            'An unexpected error occurred',
            'SERVER_ERROR',
            error.message,
            500
        );
        return NextResponse.json(response, { status });
    }
}
