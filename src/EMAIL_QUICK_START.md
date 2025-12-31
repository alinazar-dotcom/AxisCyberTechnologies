# 🚀 Email Subscription - Quick Start

## ⚡ Get Started in 3 Steps

### Step 1: Get Resend API Key (2 minutes)

1. Go to **https://resend.com**
2. Sign up (free - 100 emails/day)
3. Dashboard → **API Keys** → **Create API Key**
4. Copy the key (starts with `re_`)

### Step 2: Update .env File

Open `.env` and replace `re_your_api_key_here` with your actual key:

```bash
RESEND_API_KEY=re_abc123xyz...  # Your actual key here
```

### Step 3: Test It!

**Option A: Use the test script**
```bash
./test-email-subscription.sh
```

**Option B: Test manually**
1. Start dev server: `npm run dev`
2. Open http://localhost:5173
3. Scroll to footer
4. Enter your email
5. Click Subscribe

---

## 🎯 What Happens When Someone Subscribes?

```
┌─────────────────────────────────────────────────────────────┐
│  USER ENTERS EMAIL IN FOOTER FORM                           │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  POST /api/newsletter                                       │
│  • Validates email format                                   │
│  • Checks for duplicates                                    │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  SAVE TO DATABASE                                           │
│  Table: newsletter_subscriptions                            │
│  • email, subscribed_at, source, is_active                  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  SEND WELCOME EMAIL (Async - Non-blocking)                  │
│  • Beautiful HTML template                                  │
│  • Subject: "🚀 Welcome to Axis Cyber Technologies!"        │
│  • Lists benefits of subscribing                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  SEND NOTIFICATIONS (Async - Non-blocking)                  │
│  • Discord webhook (if configured)                          │
│  • Slack webhook (if configured)                            │
│  • Custom webhooks (if configured)                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  RETURN SUCCESS TO USER                                     │
│  "Successfully subscribed! Check your email."               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📧 Email Template Preview

When someone subscribes, they receive this beautiful email:

**Subject:** 🚀 Welcome to Axis Cyber Technologies Newsletter!

**Content:**
- Welcome message with rocket emoji 🚀
- List of benefits:
  - 🚀 Latest technology insights
  - 💡 Industry best practices
  - 📊 Case studies & success stories
  - 🎯 Exclusive offers & updates
- Global office locations (Lahore, Dubai, LA, London)
- Professional footer with contact info

---

## 🔍 How to Verify It's Working

### Check 1: Database
1. Open Supabase Dashboard
2. Go to **Table Editor** → `newsletter_subscriptions`
3. You should see the new email entry

### Check 2: Email Inbox
1. Check the subscriber's email inbox
2. Look for email from "Axis Cyber Technologies"
3. Subject: "🚀 Welcome to Axis Cyber Technologies Newsletter!"

### Check 3: Discord (if configured)
1. Check your Discord channel
2. Should see: "🚀 **New Newsletter Subscription**"
3. Shows email and preferences

### Check 4: Console Logs
If `RESEND_API_KEY` is not set, emails are logged to console:
```
📧 Email (Development Mode):
To: user@example.com
Subject: 🚀 Welcome to Axis Cyber Technologies Newsletter!
```

---

## 🎨 Customization Options

### Change Email Template

Edit: `/src/src/lib/email.ts`

Find the `sendNewsletterConfirmation()` function and modify the HTML.

### Change Form Location

The subscription form is in: `/src/components/Footer.tsx`

You can also add it to other pages!

### Add More Webhooks

Edit: `/src/src/lib/webhooks.ts`

Add your custom webhook logic in the `triggerWebhook()` function.

---

## 🐛 Troubleshooting

### "Email not sending"
- ✅ Check `RESEND_API_KEY` is set correctly
- ✅ Verify API key is active in Resend dashboard
- ✅ Check Resend dashboard for error logs

### "Database error"
- ✅ Verify Supabase connection
- ✅ Check table exists: `newsletter_subscriptions`
- ✅ Verify RLS policies allow public inserts

### "Form not submitting"
- ✅ Check browser console for errors
- ✅ Verify API endpoint is running
- ✅ Check network tab for failed requests

---

## 📊 View Subscription Stats

Run this in Supabase SQL Editor:

```sql
-- Total active subscribers
SELECT COUNT(*) FROM newsletter_subscriptions WHERE is_active = true;

-- New subscribers today
SELECT COUNT(*) FROM newsletter_subscriptions 
WHERE DATE(subscribed_at) = CURRENT_DATE;

-- Recent subscribers
SELECT email, subscribed_at FROM newsletter_subscriptions 
ORDER BY subscribed_at DESC LIMIT 10;
```

---

## 🎉 You're All Set!

Your email subscription system is **ready to use**! 

**What's included:**
- ✅ Database storage
- ✅ Email notifications
- ✅ Webhook integrations
- ✅ Beautiful email templates
- ✅ Duplicate prevention
- ✅ Reactivation support

**Just add your Resend API key and start collecting subscribers!** 🚀

---

## 📚 Need Help?

- **Setup Guide:** `EMAIL_SUBSCRIPTION_SETUP.md`
- **API Code:** `/src/src/app/api/newsletter/route.ts`
- **Email Service:** `/src/src/lib/email.ts`
- **Webhooks:** `/src/src/lib/webhooks.ts`
- **Frontend Form:** `/src/components/Footer.tsx`
