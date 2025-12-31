# 📊 DATABASE SEED GUIDE

## Populate Database with All Hardcoded Content

---

## 🎯 **What This Does**

The seed file (`/supabase-seed-data.sql`) populates your database with ALL the hardcoded content from your website, including:

✅ **4 Global Office Locations** - Lahore, Dubai, Los Angeles, London  
✅ **12 Core Services** - All with 100% success rates  
✅ **6 Client Testimonials** - Real-looking reviews  
✅ **8 Team Members** - Leadership + Engineering team  
✅ **6 Case Studies** - Complete project showcases  
✅ **15 FAQs** - Comprehensive Q&A  
✅ **11 Blog Categories** - Organized content categories  
✅ **25 Blog Tags** - Technology tags  
✅ **17 Site Settings** - Company configuration  

**Total Records:** ~104 database entries ready to use!

---

## ⚡ **Quick Start - 3 Steps**

### **Step 1: Run Phase 2 Schema First**

```bash
# In Supabase Dashboard → SQL Editor
# Copy and run: /supabase-schema-phase2.sql
```

✅ This creates all the tables

### **Step 2: Run Seed Data**

```bash
# In Supabase Dashboard → SQL Editor
# Copy and run: /supabase-seed-data.sql
```

✅ This populates the tables with data

### **Step 3: Verify**

```bash
# Check Supabase Dashboard → Table Editor
# You should see data in all tables
```

---

## 📋 **Detailed Instructions**

### **1. Open Supabase Dashboard**

```
1. Go to: https://app.supabase.com
2. Select your project
3. Click "SQL Editor" in left sidebar
```

### **2. Create Tables (If Not Done)**

```
1. Click "New Query"
2. Open /supabase-schema-phase2.sql
3. Copy entire contents
4. Paste into SQL Editor
5. Click "Run" or press Ctrl+Enter
6. Wait for "Success. No rows returned"
```

### **3. Insert Seed Data**

```
1. Click "New Query" again
2. Open /supabase-seed-data.sql
3. Copy entire contents
4. Paste into SQL Editor
5. Click "Run" or press Ctrl+Enter
6. Wait for success message
```

### **4. Verify Data Inserted**

```
1. Click "Table Editor" in left sidebar
2. Check each table:
   - office_locations (4 rows)
   - services (12 rows)
   - testimonials (6 rows)
   - team_members (8 rows)
   - case_studies (6 rows)
   - faqs (15 rows)
   - blog_categories (11 rows)
   - blog_tags (25 rows)
   - site_settings (17 rows)
```

---

## 🗂️ **What Gets Inserted**

### **Office Locations (4)**

| City | Country | Headquarters |
|------|---------|--------------|
| Lahore | Pakistan | ✅ Yes |
| Dubai | UAE | No |
| Los Angeles | USA | No |
| London | UK | No |

**Details:**
- Full addresses
- Phone numbers
- Email addresses
- Timezones
- GPS coordinates
- Operating hours (JSON)
- 24/7 operation

---

### **Services (12 - All 100% Success Rate)**

1. **AI & Machine Learning** - $50K-$500K
2. **Web Development** - $25K-$200K
3. **Mobile App Development** - $40K-$300K
4. **Cloud & DevOps** - $35K-$250K
5. **Cybersecurity** - $30K-$200K
6. **Blockchain Development** - $60K-$400K
7. **IoT & Edge Computing** - $45K-$300K
8. **Data Engineering** - $40K-$250K
9. **Enterprise Software** - $80K-$1M
10. **Product & UX Design** - $20K-$150K
11. **Gaming & WebGL** - $50K-$400K
12. **Performance Optimization** - $15K-$100K

**Each service includes:**
- Full descriptions
- Feature lists
- Technology stacks
- Benefits
- Use cases
- Process steps (JSON)
- Pricing ranges
- Success rates
- Projects completed
- SEO metadata

---

### **Testimonials (6)**

| Client | Company | Rating | Service |
|--------|---------|--------|---------|
| Sarah Johnson | FinTech Innovations | ⭐⭐⭐⭐⭐ | AI/ML |
| Michael Chen | GlobalTrade Solutions | ⭐⭐⭐⭐⭐ | Cloud |
| Emily Rodriguez | HealthTech Plus | ⭐⭐⭐⭐⭐ | Mobile |
| David Park | SecureBank | ⭐⭐⭐⭐⭐ | Security |
| Lisa Anderson | NFT Marketplace Pro | ⭐⭐⭐⭐⭐ | Blockchain |
| James Wilson | DataStream Analytics | ⭐⭐⭐⭐⭐ | Data |

**All featured and published!**

---

### **Team Members (8)**

**Leadership (4):**
- Alex Thompson - CEO (Lahore)
- Dr. Priya Sharma - CTO (Dubai)
- Marcus Johnson - COO (Los Angeles)
- Sophie Williams - CDO (London)

**Engineering (4):**
- Omar Hassan - Lead AI Engineer (Lahore)
- Elena Volkov - Senior Full Stack Developer (Dubai)
- Raj Patel - Blockchain Architect (Los Angeles)
- Hannah Lee - DevOps Lead (London)

**Each includes:**
- Full bio
- Skills & specializations
- Social media links
- Years of experience
- Avatar images

---

### **Case Studies (6)**

1. **AI-Powered Fraud Detection** - 85% fraud reduction
2. **Global E-Commerce Platform** - 10M+ users, 99.99% uptime
3. **Healthcare Mobile App** - 500K+ downloads, 4.8 stars
4. **NFT Marketplace** - $10M+ monthly volume
5. **Real-Time Data Pipeline** - 50TB daily processing
6. **Enterprise IoT Platform** - 10,000+ devices connected

**Each includes:**
- Full project story (challenge, solution, results)
- Technology stacks
- Success metrics (JSON)
- Client testimonials
- Project images
- SEO metadata

---

### **FAQs (15)**

Organized by category:
- **General (5)** - Services, locations, process, timeline, industries
- **Technical (4)** - Technologies for AI, mobile, cloud, blockchain
- **Pricing (3)** - Costs, billing models, what's included
- **Support (3)** - Post-launch support, quality, existing projects

All featured and ready to display!

---

### **Blog Categories (11)**

With brand colors and icons:
- AI & Machine Learning (#00E5FF)
- Web Development (#B900FF)
- Cloud & DevOps (#FF7A00)
- Cybersecurity (#FF0099)
- Blockchain (#00FFFF)
- Mobile Development (#DD00FF)
- Data Engineering (#00FF88)
- Product Design (#FF6B00)
- Tech Industry (#8B00FF)
- Tutorials (#00D4FF)
- Case Studies (#FF2E97)

---

### **Blog Tags (25)**

Technology tags ready to use:
React, Next.js, Node.js, TypeScript, Python, TensorFlow, AWS, Kubernetes, Docker, Blockchain, Smart Contracts, Web3, React Native, Flutter, iOS, Android, Cybersecurity, DevOps, CI/CD, Microservices, API Design, Performance, SEO, UX Design, UI Design

---

### **Site Settings (17)**

Company configuration:
- Company name & tagline
- Contact emails (contact, support, sales)
- Global phone number
- Success rate: 100%
- Projects completed: 1,500+
- Team size: 150+
- Social media links
- Operating hours: 24/7

---

## 🧪 **Testing After Insert**

### **Test API Endpoints**

```bash
# Services
curl http://localhost:3000/api/services

# Testimonials
curl http://localhost:3000/api/testimonials

# Team
curl http://localhost:3000/api/team

# Case Studies
curl http://localhost:3000/api/case-studies

# FAQs
curl http://localhost:3000/api/faqs

# Offices
curl http://localhost:3000/api/offices
```

**Expected:** All should return data with `success: true`

### **Check in Supabase Dashboard**

```
1. Table Editor → services
   - Should see 12 rows
   - All with success_rate = 100

2. Table Editor → office_locations
   - Should see 4 rows
   - Lahore marked as headquarters

3. Table Editor → testimonials
   - Should see 6 rows
   - All with rating = 5
```

---

## 🔄 **Re-running Seed Data**

If you need to re-run the seed data:

### **Option 1: Clean Insert (Recommended)**

Uncomment the TRUNCATE lines at the top of the seed file:

```sql
-- Remove the -- comments from these lines:
TRUNCATE TABLE blog_post_tags, blog_posts, blog_categories, blog_tags CASCADE;
TRUNCATE TABLE case_studies, services, testimonials, team_members CASCADE;
TRUNCATE TABLE career_listings, job_applications, faqs CASCADE;
TRUNCATE TABLE media_library, site_settings, office_locations CASCADE;
```

Then run the seed file again.

### **Option 2: Manual Cleanup**

```sql
-- In Supabase SQL Editor
DELETE FROM office_locations;
DELETE FROM services;
DELETE FROM testimonials;
DELETE FROM team_members;
DELETE FROM case_studies;
DELETE FROM faqs;
DELETE FROM blog_categories;
DELETE FROM blog_tags;
DELETE FROM site_settings;
```

Then run seed file.

---

## 🎨 **Customization**

### **Modify Data Before Insert**

You can edit `/supabase-seed-data.sql` to customize:

1. **Office Locations** - Change addresses, phones, emails
2. **Services** - Update descriptions, pricing, features
3. **Team Members** - Add/remove team members, update bios
4. **Testimonials** - Change client names, reviews
5. **Case Studies** - Modify project details, metrics
6. **Site Settings** - Update company info, success rates

### **Add More Data**

Copy the INSERT statement format and add more:

```sql
INSERT INTO services (name, slug, ...) VALUES
('Your New Service', 'new-service', ...);
```

---

## ⚠️ **Important Notes**

### **Foreign Keys**

Some data has relationships:
- Testimonials → Services (via service_id)
- FAQs → Services (optional service_id)
- Team Members → Office Locations (via office_location)

The seed file handles these automatically using subqueries:

```sql
service_id = (SELECT id FROM services WHERE slug = 'ai-ml' LIMIT 1)
```

### **UUIDs**

Supabase generates UUIDs automatically. The seed file doesn't specify IDs, so they'll be different each time you run it.

### **Timestamps**

All `created_at` and `updated_at` fields are set automatically by database triggers.

---

## 🚨 **Troubleshooting**

### **Error: "relation does not exist"**

**Solution:** Run Phase 2 schema first (`/supabase-schema-phase2.sql`)

### **Error: "duplicate key value"**

**Solution:** Data already exists. Either:
1. Delete existing data first
2. Uncomment TRUNCATE statements

### **Error: "foreign key constraint"**

**Solution:** Ensure Phase 2 schema ran successfully and all tables exist

### **Error: Syntax error at or near**

**Solution:** Make sure you copied the ENTIRE seed file, including the last line

---

## 📊 **Verification Checklist**

After running seed data:

- [ ] ✅ office_locations has 4 rows
- [ ] ✅ services has 12 rows (all with 100% success_rate)
- [ ] ✅ testimonials has 6 rows (all 5-star)
- [ ] ✅ team_members has 8 rows
- [ ] ✅ case_studies has 6 rows
- [ ] ✅ faqs has 15 rows
- [ ] ✅ blog_categories has 11 rows
- [ ] ✅ blog_tags has 25 rows
- [ ] ✅ site_settings has 17 rows
- [ ] ✅ API endpoints return data
- [ ] ✅ No console errors

---

## 🎉 **Success!**

Once completed, your database is fully populated with production-ready content that matches your hardcoded website data!

**Next Steps:**
1. Update frontend components to fetch from database
2. Remove hardcoded data
3. Test all pages
4. Deploy to production

---

## 📞 **Quick Commands**

```bash
# Count records in each table
SELECT 'office_locations' as table, COUNT(*) FROM office_locations
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'team_members', COUNT(*) FROM team_members
UNION ALL
SELECT 'case_studies', COUNT(*) FROM case_studies
UNION ALL
SELECT 'faqs', COUNT(*) FROM faqs
UNION ALL
SELECT 'blog_categories', COUNT(*) FROM blog_categories
UNION ALL
SELECT 'blog_tags', COUNT(*) FROM blog_tags
UNION ALL
SELECT 'site_settings', COUNT(*) FROM site_settings;
```

**Expected Output:**
```
office_locations    | 4
services           | 12
testimonials       | 6
team_members       | 8
case_studies       | 6
faqs              | 15
blog_categories    | 11
blog_tags         | 25
site_settings     | 17
```

---

**File:** `/supabase-seed-data.sql`  
**Total Records:** 104  
**Estimated Run Time:** 5-10 seconds  
**Ready to Use:** ✅ YES
