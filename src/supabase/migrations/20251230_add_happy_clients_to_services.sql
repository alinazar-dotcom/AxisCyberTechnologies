-- Add happy_clients column to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS happy_clients TEXT DEFAULT '50+';
