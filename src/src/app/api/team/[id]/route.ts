import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';

/**
 * PUT /api/team/[id]
 * Update a team member
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const body = await request.json();

        // Map frontend fields to DB columns
        const dbData: any = {
            name: body.full_name,
            slug: body.slug,
            role: body.role,
            department: body.department,
            bio: body.bio,
            avatar: body.photo_url,
            email: body.email,
            phone: body.phone,
            location: body.location,
            skills: body.skills,
            specializations: body.expertise_areas,
            linkedin_url: body.social_links?.linkedin,
            github_url: body.social_links?.github,
            twitter_url: body.social_links?.twitter,
            years_experience: body.years_experience,
            joined_date: body.joined_date,
            is_active: body.status === 'active',
            is_leadership: body.featured,
            display_order: body.display_order,
            updated_at: new Date().toISOString(),
        };

        // Remove undefined fields
        Object.keys(dbData).forEach(key => dbData[key] === undefined && delete dbData[key]);

        const { data, error } = await supabaseTyped
            .from('team_members')
            .update(dbData as any)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating team member:', error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, data },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Team API error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/team/[id]
 * Delete a team member
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const { error } = await supabaseTyped
            .from('team_members')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting team member:', error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Team API error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
