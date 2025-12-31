-- ============================================
-- ONE-CLICK FIX: Reset and Create All Tables
-- ============================================
-- Use this if you're getting errors
-- This will drop and recreate everything cleanly
-- ⚠️ WARNING: This deletes all Phase 7 data!
-- ============================================

-- Step 1: Drop all Phase 7 tables (if they exist)
DO $$
BEGIN
  RAISE NOTICE '🗑️  Dropping existing tables...';
END $$;

DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS search_analytics CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;    
DROP TABLE IF EXISTS form_analytics CASCADE;
DROP TABLE IF EXISTS content_performance CASCADE;
DROP TABLE IF EXISTS engagement_events CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS email_campaigns CASCADE;
DROP TABLE IF EXISTS email_templates CASCADE;
DROP TABLE IF EXISTS email_sequences CASCADE;
DROP TABLE IF EXISTS email_sequence_steps CASCADE;
DROP TABLE IF EXISTS email_segments CASCADE;

-- Step 2: Drop functions
DROP FUNCTION IF EXISTS update_content_performance_updated_at() CASCADE;
DROP FUNCTION IF EXISTS update_email_campaigns_updated_at() CASCADE;

DO $$
BEGIN
  RAISE NOTICE '✅ Old tables dropped successfully';
  RAISE NOTICE '📦 Creating new tables...';
END $$;

-- ============================================
-- NOW RUN EACH MIGRATION FILE IN ORDER:
-- ============================================
-- 1. Comments: /supabase/migrations/20240124_create_comments_table.sql
-- 2. Analytics: /supabase/migrations/FIXED_20240124_create_analytics_tables.sql
-- 3. Jobs: /supabase/migrations/20240124_create_jobs_tables.sql
-- 4. Email: /supabase/migrations/20240124_create_email_campaigns_table.sql
-- ============================================

-- OR use the combined migration below (scroll down)

-- ============================================
-- QUICK TIP: Run this in Supabase SQL Editor
-- Then run the 4 migration files in order
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✨ Ready for migrations!';
  RAISE NOTICE '📝 Run each migration file in order:';
  RAISE NOTICE '   1. Comments';
  RAISE NOTICE '   2. Analytics (FIXED version)';
  RAISE NOTICE '   3. Jobs';
  RAISE NOTICE '   4. Email Marketing';
END $$;
