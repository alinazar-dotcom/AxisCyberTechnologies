-- Add missing 'likes' column to case_studies table
-- Run this in your Supabase SQL Editor

ALTER TABLE case_studies 
ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;

-- Add comment for documentation
COMMENT ON COLUMN case_studies.likes IS 'Number of likes/favorites for this case study';
