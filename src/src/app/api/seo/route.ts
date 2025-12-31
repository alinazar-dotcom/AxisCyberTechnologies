import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch SEO settings
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const pageType = searchParams.get('page_type');
        const sortBy = searchParams.get('sort_by') || 'page_type';
        const sortOrder = searchParams.get('sort_order') || 'asc';

        let query = supabase
            .from('seo_settings')
            .select('*')
            .order(sortBy, { ascending: sortOrder === 'asc' });

        if (search) {
            query = query.or(`page_type.ilike.%${search}%,page_title.ilike.%${search}%,meta_description.ilike.%${search}%`);
        }

        if (pageType) {
            query = query.eq('page_type', pageType);
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST - Create new SEO setting
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('seo_settings')
            .insert([body])
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
