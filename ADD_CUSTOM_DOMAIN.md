# How to Add and Verify Your Custom Domain in Resend

To send emails from your own domain (e.g., `info@axiscyber.com`) instead of the testing domain, follow these steps:

## Step 1: Add Domain in Resend
1. Log in to your [Resend Dashboard](https://resend.com/domains).
2. Click on **"Add Domain"**.
3. Enter your domain name (e.g., `axiscyber.com`).
4. Select your region (usually "US East" is fine).
5. Click **"Add"**.

## Step 2: Update DNS Records
Resend will provide you with a set of DNS records (MX, TXT, CNAME). You need to add these to your domain provider (where you bought your domain, e.g., GoDaddy, Namecheap, Cloudflare).

1. Log in to your **Domain Provider**.
2. Go to the **DNS Settings** or **DNS Management** page for your domain.
3. Add the **TXT** records (SPF, DKIM) provided by Resend.
   - **Type**: TXT
   - **Name/Host**: (Copy from Resend)
   - **Value**: (Copy from Resend)
4. Add the **MX** record (if you don't have one already for email receiving).
   - *Note: If you already use Gmail/Outlook for this domain, be careful not to break your existing email receiving. Resend usually only asks for TXT/CNAME records for sending.*

## Step 3: Verify Domain
1. Go back to the Resend Dashboard.
2. Click **"Verify DNS Records"**.
3. It may take anywhere from a few minutes to 24 hours for the changes to propagate.
4. Once verified, the status will change to **"Verified"**.

## Step 4: Update Your Project
Once your domain is verified, update your project to use it.

### 1. Update `.env` file
Open your `.env` file and update the email addresses:

```env
VITE_EMAIL_FROM=info@axiscyber.com
VITE_EMAIL_REPLY_TO=info@axiscyber.com
VITE_ADMIN_EMAIL=admin@axiscyber.com
```

### 2. Update Edge Function (Optional but Recommended)
We currently have a fallback in the Edge Function to `onboarding@resend.dev`. You should update this to your real domain.

1. Open `supabase/functions/resend-email/index.ts`.
2. Change line 39:
   ```typescript
   // Change this:
   from: from || "onboarding@resend.dev",
   
   // To this:
   from: from || "info@axiscyber.com",
   ```
3. Redeploy the function:
   ```bash
   npx supabase functions deploy resend-email --no-verify-jwt
   ```

## Troubleshooting
- **"Domain not found"**: Wait a bit longer. DNS changes can take time.
- **"SPF/DKIM missing"**: Double-check that you copied the values exactly, including any underscores (`_`).
