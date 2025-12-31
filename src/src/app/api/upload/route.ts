import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

        // 1. Upload to Supabase Storage
        const { data: storageData, error: storageError } = await supabase.storage
            .from('media')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (storageError) {
            return NextResponse.json(
                { success: false, error: storageError.message },
                { status: 400 }
            );
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filename);

        // 3. Save to Database
        const { data: dbData, error: dbError } = await supabase
            .from('media_library')
            .insert({
                filename: filename,
                original_filename: file.name,
                file_path: filename,
                file_url: publicUrl,
                file_type: file.type.split('/')[0],
                mime_type: file.type,
                file_size: file.size,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (dbError) {
            // Cleanup storage if database insert fails
            await supabase.storage.from('media').remove([filename]);

            return NextResponse.json(
                { success: false, error: dbError.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data: dbData,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
