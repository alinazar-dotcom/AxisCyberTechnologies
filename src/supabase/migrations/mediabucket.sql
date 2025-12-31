-- 1. Allow Public Access to the 'media' bucket (if not already public)
-- This allows anyone to view the files via URL
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'media' );

-- 2. Allow Authenticated users to upload files
-- This is what's blocking your File Manager right now
CREATE POLICY "Allow Authenticated Uploads" ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK ( bucket_id = 'media' );

-- 3. Allow Authenticated users to delete their files
CREATE POLICY "Allow Authenticated Deletions" ON storage.objects FOR DELETE 
TO authenticated 
USING ( bucket_id = 'media' );