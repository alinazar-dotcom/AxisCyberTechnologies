# 🔧 **DATABASE ERROR FIX GUIDE**

## ❌ **ERROR:**
```
ERROR: 42703: column "page_url" does not exist
```

---

## ✅ **SOLUTION: Run Migrations in Correct Order**

The error occurs when migrations are run out of order or if there's a conflict. Here's the fix:

---

## **🎯 STEP-BY-STEP FIX**

### **Option 1: Fresh Start (Recommended)**

**1. Drop All Analytics Tables:**
```sql
-- In Supabase Dashboard → SQL Editor
-- Paste and run this:

DROP TABLE IF EXISTS search_analytics CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;
DROP TABLE IF EXISTS form_analytics CASCADE;
DROP TABLE IF EXISTS content_performance CASCADE;
DROP TABLE IF EXISTS engagement_events CASCADE;
```

**2. Run Fixed Migration:**
```sql
-- Now run the contents of:
/supabase/migrations/FIXED_20240124_create_analytics_tables.sql

-- This will create all tables cleanly
```

**3. Verify:**
```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('search_analytics', 'page_views', 'form_analytics', 'content_performance', 'engagement_events');

-- Should return 5 rows
```

---

### **Option 2: Add Missing Column (If table exists)**

If the table exists but is missing the column:

```sql
-- Check if page_views table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'page_views';

-- If table exists but page_url is missing, add it:
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS page_url TEXT NOT NULL DEFAULT '';

-- Then create the index:
CREATE INDEX IF NOT EXISTS idx_page_views_url ON page_views(page_url);
```

---

## **📋 COMPLETE MIGRATION ORDER**

Run migrations in this exact order:

### **1. Comments System:**
```sql
-- File: /supabase/migrations/20240124_create_comments_table.sql
-- Creates: comments table
```

### **2. Analytics (FIXED):**
```sql
-- File: /supabase/migrations/FIXED_20240124_create_analytics_tables.sql
-- Creates: search_analytics, page_views, form_analytics, content_performance, engagement_events
```

### **3. Jobs Portal:**
```sql
-- File: /supabase/migrations/20240124_create_jobs_tables.sql
-- Creates: jobs, job_applications
```

### **4. Email Marketing:**
```sql
-- File: /supabase/migrations/20240124_create_email_campaigns_table.sql
-- Creates: email_campaigns, email_templates, email_sequences, email_sequence_steps, email_segments
```

---

## **🔍 VERIFY ALL TABLES**

After running all migrations:

```sql
-- Check all Phase 7 tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'comments',
  'search_analytics',
  'page_views',
  'form_analytics',
  'content_performance',
  'engagement_events',
  'jobs',
  'job_applications',
  'email_campaigns',
  'email_templates',
  'email_sequences',
  'email_sequence_steps',
  'email_segments'
);

-- Should return 13 rows
```

---

## **🛠️ TROUBLESHOOTING SPECIFIC ERRORS**

### **Error: "relation already exists"**
```sql
-- Table already exists, skip creation or drop first
DROP TABLE IF EXISTS table_name CASCADE;
-- Then re-run migration
```

### **Error: "policy already exists"**
```sql
-- Policy already exists, drop first
DROP POLICY IF EXISTS "policy_name" ON table_name;
-- Then re-run migration
```

### **Error: "function already exists"**
```sql
-- Function already exists, use CREATE OR REPLACE
CREATE OR REPLACE FUNCTION function_name() ...
```

### **Error: "permission denied"**
```sql
-- Using service role key?
-- Make sure you're in Supabase SQL Editor (uses service role automatically)
```

---

## **✅ CLEAN SLATE APPROACH**

If you want to start completely fresh:

```sql
-- ⚠️ WARNING: This deletes ALL Phase 7 data!

-- 1. Drop all Phase 7 tables
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

-- 2. Drop functions
DROP FUNCTION IF EXISTS update_content_performance_updated_at CASCADE;
DROP FUNCTION IF EXISTS update_email_campaigns_updated_at CASCADE;

-- 3. Now run all migrations in order:
-- a) 20240124_create_comments_table.sql
-- b) FIXED_20240124_create_analytics_tables.sql
-- c) 20240124_create_jobs_tables.sql
-- d) 20240124_create_email_campaigns_table.sql
```

---

## **📊 VERIFY EACH TABLE STRUCTURE**

### **page_views (the problematic one):**
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'page_views'
ORDER BY ordinal_position;
```

**Expected columns:**
```
id              | uuid                     | NO
page_url        | text                     | NO  ← MUST EXIST
page_title      | text                     | YES
page_type       | text                     | YES
referrer        | text                     | YES
user_agent      | text                     | YES
ip_address      | text                     | YES
session_id      | text                     | YES
created_at      | timestamp with time zone | YES
```

If `page_url` is missing, run:
```sql
ALTER TABLE page_views ADD COLUMN page_url TEXT NOT NULL DEFAULT '';
```

---

## **🎯 QUICK FIX SCRIPT**

Run this all-in-one script:

```sql
-- Quick Fix: Recreate Analytics Tables
DO $$
BEGIN
  -- Drop if exists
  DROP TABLE IF EXISTS search_analytics CASCADE;
  DROP TABLE IF EXISTS page_views CASCADE;
  DROP TABLE IF EXISTS form_analytics CASCADE;
  DROP TABLE IF EXISTS content_performance CASCADE;
  DROP TABLE IF EXISTS engagement_events CASCADE;

  RAISE NOTICE 'Dropped old tables (if they existed)';
END $$;

-- Now run the FIXED migration file contents
-- Copy/paste from: /supabase/migrations/FIXED_20240124_create_analytics_tables.sql
```

---

## **📞 STILL HAVING ISSUES?**

### **Check Which Migration Failed:**

1. **Look at error message location:**
   ```
   ERROR at line X: column "page_url" does not exist
   ```

2. **Identify the table:**
   - Error mentions `page_url` → It's the `page_views` table

3. **Check if table exists:**
   ```sql
   SELECT * FROM page_views LIMIT 1;
   ```
   - If error: Table doesn't exist → Run migration
   - If works: Table exists → Check columns

4. **Check columns:**
   ```sql
   \d page_views  -- In psql
   -- OR
   SELECT column_name FROM information_schema.columns WHERE table_name = 'page_views';
   ```

---

## **✅ SUCCESS CHECKLIST**

After fixing, verify:

- ✅ All 13 tables exist
- ✅ `page_views` has `page_url` column
- ✅ All indexes created
- ✅ All RLS policies active
- ✅ Sample data loads (jobs table)
- ✅ API endpoints work

**Test API:**
```bash
# Should not error
curl https://yoursite.com/api/analytics
```

---

## **🚀 READY TO CONTINUE**

Once fixed:

1. ✅ Analytics tables created
2. ✅ Run remaining migrations (jobs, email)
3. ✅ Test all API endpoints
4. ✅ Visit admin dashboards
5. ✅ **LAUNCH!** 🎉

---

## **📝 FILES TO USE**

**Use this FIXED file for analytics:**
```
✅ /supabase/migrations/FIXED_20240124_create_analytics_tables.sql
```

**Original files for others:**
```
✅ /supabase/migrations/20240124_create_comments_table.sql
✅ /supabase/migrations/20240124_create_jobs_tables.sql
✅ /supabase/migrations/20240124_create_email_campaigns_table.sql
```

---

**Need more help?** The issue is almost always:
1. Migration run out of order
2. Table exists but column missing
3. Using wrong migration file

**Solution:** Use the FIXED file and start fresh! 🔧
