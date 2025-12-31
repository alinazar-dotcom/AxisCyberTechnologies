import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // 1. Get file info to delete from storage if needed
        const { data: fileData, error: fetchError } = await supabase
            .from('media_library')
            .select('filename')
            .eq('id', id)
            .single();

        if (fetchError) {
            return NextResponse.json(
                { success: false, error: fetchError.message },
                { status: 400 }
            );
        }

        // 2. Delete from storage (assuming 'media' bucket)
        const { error: storageError } = await supabase.storage
            .from('media_library')
            .remove([fileData.filename]);

        if (storageError) {
            console.error('Storage deletion error:', storageError);
            // Continue anyway to clean up database record
        }

        // 3. Delete from database
        const { error: dbError } = await supabase
            .from('media_library')
            .delete()
            .eq('id', id);

        if (dbError) {
            return NextResponse.json(
                { success: false, error: dbError.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'File deleted successfully',
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
