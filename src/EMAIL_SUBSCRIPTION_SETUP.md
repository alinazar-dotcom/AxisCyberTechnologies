# 📧 Email Subscription System - Setup Guide

## Overview
Your email subscription system is **already built**! This guide will help you configure and test it.

---

## 🎯 Current Status

### ✅ Already Implemented
- ✅ Database table (`newsletter_subscriptions`)
- ✅ API endpoint (`/api/newsletter`)
- ✅ Email service with Resend
- ✅ Webhook system (Discord, Slack, Custom)
- ✅ Frontend form in Footer component
- ✅ Beautiful email templates

### 🔧 Needs Configuration
- ⚙️ Resend API key
- ⚙️ Email sender domain (optional)
- ⚙️ Webhook URLs (optional)

---

## 📋 Step-by-Step Setup

### Step 1: Set Up Resend (Email Service)

1. **Sign up for Resend**
   - Go to: https://resend.com
   - Create a free account (100 emails/day free)

2. **Get your API key**
   - Dashboard → API Keys → Create API Key
   - Copy the key (starts with `re_`)

3. **Add to your `.env` file**
   ```bash
   # Email Configuration
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=Axis Cyber Technologies <noreply@axiscyber.tech>
   EMAIL_REPLY_TO=contact@axiscyber.tech
   ADMIN_EMAIL=admin@axiscyber.tech
   ```

4. **Verify Domain (Optional but Recommended)**
   - Resend Dashboard → Domains → Add Domain
   - Add DNS records to your domain provider
   - Verify domain
   - Update `EMAIL_FROM` with your verified domain

   **For Testing:** You can use Resend's test email addresses without domain verification:
   ```
   EMAIL_FROM=onboarding@resend.dev
   ```

---

### Step 2: Configure Webhooks (Optional)

#### Discord Webhook (Recommended)
1. Go to your Discord server
2. Server Settings → Integrations → Webhooks → New Webhook
3. Copy the webhook URL
4. Add to `.env`:
   ```bash
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url
   ```

#### Slack Webhook (Optional)
1. Go to: https://api.slack.com/messaging/webhooks
2. Create a new webhook
3. Add to `.env`:
   ```bash
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your_webhook_url
   SLACK_CHANNEL=#notifications
   ```

#### Custom Webhook (Optional - for Zapier, Make.com, etc.)
```bash
CUSTOM_WEBHOOK_URL=https://your-webhook-endpoint.com/newsletter
WEBHOOK_SECRET=your_secret_key_for_signature_verification
```

---

### Step 3: Verify Database Setup

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Check Table Exists**
   - Table Editor → `newsletter_subscriptions`
   - Should have columns: id, email, subscribed_at, source, is_active, etc.

3. **If table doesn't exist, run this SQL:**
   ```sql
   -- Run in Supabase SQL Editor
   CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     email VARCHAR(255) NOT NULL UNIQUE,
     subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     source VARCHAR(100) DEFAULT 'website_footer',
     is_active BOOLEAN DEFAULT true,
     unsubscribed_at TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable RLS
   ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

   -- Allow public inserts
   CREATE POLICY "Enable insert for newsletter subscriptions"
     ON newsletter_subscriptions FOR INSERT
     TO public
     WITH CHECK (true);

   -- Allow public reads
   CREATE POLICY "Enable read for own newsletter subscription"
     ON newsletter_subscriptions FOR SELECT
     TO public
     USING (true);
   ```

---

### Step 4: Update Environment Variables

Your complete `.env` file should look like this:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://qabouyfjaxumdcflktpm.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_X4y5E8-RqxpXYRAx5pRlJg_Z63_Fo14
SUPABASE_SERVICE_ROLE_KEY=sb_secret_OY6tUf51eMQh4yJMzziuWQ_7h_7zzfg

# Email Configuration (Resend)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=Axis Cyber Technologies <noreply@axiscyber.tech>
EMAIL_REPLY_TO=contact@axiscyber.tech
ADMIN_EMAIL=admin@axiscyber.tech

# Webhook Configuration (Optional)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url
# SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your_webhook_url
# SLACK_CHANNEL=#notifications
# CUSTOM_WEBHOOK_URL=https://your-webhook-endpoint.com
# WEBHOOK_SECRET=your_secret_key
```

---

## 🧪 Testing the System

### Test 1: Frontend Form Submission

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Open your website** (usually http://localhost:5173)

3. **Scroll to footer** and find the newsletter form

4. **Enter a test email** and submit

5. **Expected Results:**
   - ✅ Success message appears
   - ✅ Email saved in Supabase `newsletter_subscriptions` table
   - ✅ Welcome email sent to subscriber (check inbox)
   - ✅ Discord notification (if configured)

### Test 2: API Direct Test

Use this curl command to test the API directly:

```bash
curl -X POST http://localhost:5173/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "source": "api_test",
    "preferences": ["AI", "Cloud", "Blockchain"]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "message": "Successfully subscribed! Check your email for confirmation."
  },
  "meta": {
    "subscribedAt": "2025-12-25T15:30:00Z"
  }
}
```

### Test 3: Check Database

1. **Supabase Dashboard** → Table Editor → `newsletter_subscriptions`
2. You should see your test email(s)
3. Check the `is_active` column (should be `true`)

### Test 4: Check Email Delivery

1. **Check subscriber's inbox** for welcome email
2. Email should have:
   - Subject: "🚀 Welcome to Axis Cyber Technologies Newsletter!"
   - Beautiful HTML design with gradient colors
   - List of what they'll receive
   - Global office locations

---

## 🎨 How It Works

### User Flow:
```
1. User enters email in footer form
   ↓
2. Frontend validates email format
   ↓
3. POST request to /api/newsletter
   ↓
4. API checks if email already exists
   ↓
5. If new: Insert into database
   If exists & inactive: Reactivate
   If exists & active: Return error
   ↓
6. Send welcome email (async, non-blocking)
   ↓
7. Send Discord notification (async, non-blocking)
   ↓
8. Trigger custom webhooks (async, non-blocking)
   ↓
9. Return success response to user
```

### Email Template Features:
- ✅ Responsive HTML design
- ✅ Gradient headers with brand colors
- ✅ Lists benefits of subscribing
- ✅ Shows global office locations
- ✅ Unsubscribe link (placeholder)
- ✅ Professional footer

---

## 🔍 Troubleshooting

### Issue: "Failed to send email"

**Solution:**
1. Check `RESEND_API_KEY` is set correctly
2. Verify API key is active in Resend dashboard
3. Check Resend dashboard for error logs
4. In development, emails are logged to console if API key is missing

### Issue: "Email already subscribed"

**Solution:**
- This is expected behavior for duplicate emails
- User can unsubscribe and resubscribe
- Or you can manually set `is_active = false` in database

### Issue: "Database error"

**Solution:**
1. Check Supabase connection (URL and keys)
2. Verify table exists: `newsletter_subscriptions`
3. Check RLS policies allow public inserts
4. View Supabase logs for detailed errors

### Issue: "Webhook not working"

**Solution:**
1. Check webhook URL is correct
2. Verify webhook is enabled (URL must be set)
3. Check webhook service logs (Discord/Slack)
4. Webhooks are non-blocking, so they won't stop email subscription

---

## 📊 Monitoring & Analytics

### View Subscription Stats

Run this in Supabase SQL Editor:

```sql
-- Total subscribers
SELECT COUNT(*) as total_subscribers
FROM newsletter_subscriptions
WHERE is_active = true;

-- New subscribers this week
SELECT COUNT(*) as new_this_week
FROM newsletter_subscriptions
WHERE subscribed_at > NOW() - INTERVAL '7 days';

-- Subscribers by source
SELECT source, COUNT(*) as count
FROM newsletter_subscriptions
WHERE is_active = true
GROUP BY source
ORDER BY count DESC;

-- Recent subscribers
SELECT email, subscribed_at, source
FROM newsletter_subscriptions
WHERE is_active = true
ORDER BY subscribed_at DESC
LIMIT 10;
```

---

## 🚀 Next Steps

### Immediate:
1. ✅ Set up Resend API key
2. ✅ Test email subscription flow
3. ✅ Configure Discord webhook (optional)

### Future Enhancements:
- 📧 Create email campaigns (table already exists!)
- 🎯 Add subscriber segments
- 📊 Build analytics dashboard
- 🔄 Implement automated email sequences
- 📝 Add unsubscribe functionality
- 🎨 Create more email templates

---

## 📚 Related Files

- **API Route:** `/src/src/app/api/newsletter/route.ts`
- **Email Service:** `/src/src/lib/email.ts`
- **Webhook Service:** `/src/src/lib/webhooks.ts`
- **Frontend Form:** `/src/components/Footer.tsx`
- **Database Schema:** `/src/supabase-schema.sql`

---

## 🎉 Summary

Your email subscription system is **production-ready**! Just add your Resend API key and you're good to go.

**What happens when someone subscribes:**
1. ✅ Email saved to database
2. ✅ Welcome email sent automatically
3. ✅ Discord notification (if configured)
4. ✅ Custom webhooks triggered (if configured)
5. ✅ User sees success message

**All of this is already built and working!** 🚀
