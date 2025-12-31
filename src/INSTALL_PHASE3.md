# 📦 PHASE 3 INSTALLATION INSTRUCTIONS

## Quick Install - 3 Commands

---

## ⚡ **Step 1: Install Dependencies**

```bash
npm install resend
```

**What this adds:**
- Resend email service SDK
- Email sending capabilities
- Production-ready email delivery

---

## ⚡ **Step 2: Configure Environment**

```bash
# Copy the example environment file
cp .env.example .env.local
```

**Edit `.env.local` and add minimum required:**

```bash
# Required for email functionality
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=your-email@example.com

# Optional: Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Optional: Discord
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

---

## ⚡ **Step 3: Test**

```bash
# Start development server
npm run dev

# In another terminal, test contact form
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing Phase 3 notifications!"
  }'
```

**Expected output:**
- ✅ API returns success
- ✅ Console logs email details (dev mode)
- ✅ Database entry created

---

## 🎯 **Get Resend API Key (Free)**

### **1. Sign Up**
Go to: https://resend.com/signup

### **2. Verify Email**
Check your inbox and verify your email address

### **3. Create API Key**
- Dashboard → API Keys
- Click "Create API Key"
- Name: "Axis Cyber Development"
- Copy the key (starts with `re_`)

### **4. Add to `.env.local`**
```bash
RESEND_API_KEY=re_abc123xyz789...
```

**Free Tier Limits:**
- 100 emails/day
- 3,000 emails/month
- Perfect for development & testing!

---

## 🧪 **Verify Installation**

### **Check 1: Dependencies Installed**
```bash
npm list resend
```
Expected: `resend@3.0.0` (or higher)

### **Check 2: Environment Variables**
```bash
node -e "console.log('Email:', !!process.env.RESEND_API_KEY)"
```
Expected: `Email: true` (if key is set)

### **Check 3: API Endpoints**
```bash
curl http://localhost:3000/api/webhooks
```
Expected: Webhook endpoint documentation

### **Check 4: TypeScript Compilation**
```bash
npm run build
```
Expected: Build succeeds with no errors

---

## 📋 **What Gets Installed**

### **New Dependency:**
```json
{
  "resend": "^3.0.0"
}
```

### **New Files Created:**
```
/src/lib/email.ts              - Email service
/src/lib/webhooks.ts           - Webhook infrastructure
/src/app/api/webhooks/route.ts - Webhook endpoint
/.env.example                  - Environment template
```

### **Updated Files:**
```
/src/app/api/contact/route.ts      - Added notifications
/src/app/api/newsletter/route.ts   - Added notifications
/src/app/api/consultation/route.ts - Added notifications
/src/app/api/careers/apply/route.ts- Added notifications
/package.json                      - Added Resend
```

---

## 🔍 **Troubleshooting**

### **Issue: `npm install` fails**

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

### **Issue: Environment variables not loading**

**Check:**
1. File is named `.env.local` (not `.env`)
2. No spaces around `=` in env file
3. Restart dev server after changes

**Test:**
```bash
# Create simple test file
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.RESEND_API_KEY)"
```

---

### **Issue: "Module not found: resend"**

**Solution:**
```bash
# Ensure Resend is installed
npm install resend

# Restart dev server
npm run dev
```

---

### **Issue: Emails not sending**

**Without API Key:**
- Emails will log to console (this is normal in dev mode)
- No actual emails sent

**With API Key:**
- Check Resend dashboard for logs
- Verify email address in "From" field
- Check spam folder

---

## 🎨 **Optional: Slack Setup**

```bash
# 1. Create Slack App
https://api.slack.com/apps → Create New App

# 2. Enable Incoming Webhooks
App Settings → Incoming Webhooks → ON

# 3. Add to Workspace
Add New Webhook to Workspace → Select channel

# 4. Copy URL to .env.local
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

**Test:**
```bash
curl -X POST $SLACK_WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d '{"text":"✅ Slack notifications working!"}'
```

---

## 🎨 **Optional: Discord Setup**

```bash
# 1. Go to Discord Server
Server Settings → Integrations

# 2. Create Webhook
Webhooks → New Webhook → Name it → Copy URL

# 3. Add to .env.local
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

**Test:**
```bash
curl -X POST $DISCORD_WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d '{"content":"✅ Discord notifications working!"}'
```

---

## 📊 **Post-Installation Checklist**

- [ ] ✅ `npm install resend` completed
- [ ] ✅ `.env.local` file created
- [ ] ✅ Resend API key configured
- [ ] ✅ Admin email set
- [ ] ✅ Dev server starts without errors
- [ ] ✅ Test API call succeeds
- [ ] ✅ Console logs show email details
- [ ] ✅ TypeScript builds successfully

### **Optional:**
- [ ] ⭕ Slack webhook configured
- [ ] ⭕ Discord webhook configured
- [ ] ⭕ Custom webhooks configured

---

## 🚀 **Ready to Go!**

Once all checkboxes are complete, your Phase 3 installation is ready!

**Next steps:**
1. Submit a real form to test notifications
2. Check your email inbox
3. Verify Slack/Discord messages (if configured)
4. Review logs for any errors

---

## 📚 **Additional Resources**

**Documentation:**
- Setup Guide: `/PHASE3_SETUP_GUIDE.md`
- Complete Docs: `/PHASE3_COMPLETE.md`
- Summary: `/PHASE3_SUMMARY.md`

**External Links:**
- Resend Docs: https://resend.com/docs
- Slack API: https://api.slack.com/messaging/webhooks
- Discord Webhooks: https://discord.com/developers/docs/resources/webhook

---

## 💡 **Development Mode**

**Without Resend API Key:**
```
✅ API endpoints work
✅ Database saves data
✅ Notifications logged to console
❌ No actual emails sent
```

**With Resend API Key:**
```
✅ Everything above, plus:
✅ Real emails sent
✅ Delivery tracking in Resend dashboard
```

This allows you to develop without email service initially!

---

## ✅ **Installation Complete!**

**Phase 3 is now installed and ready to use.**

Run your first test:
```bash
npm run dev

# Then visit your contact form or use curl
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Your Name","email":"your@email.com","message":"Hello!"}'
```

🎉 **Enjoy your new notification system!**

---

**Installation Time:** 5-10 minutes  
**Difficulty:** ⭐ (Easy)  
**Support:** Check documentation in `/PHASE3_SETUP_GUIDE.md`
