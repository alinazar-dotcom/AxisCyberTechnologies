# 🚀 Deploying the Email Function

To enable real email sending, you need to deploy the Supabase Edge Function we just created.

## Prerequisites

1.  **Supabase Account**: You need a project on [Supabase](https://supabase.com).
2.  **Resend API Key**: You need an API key from [Resend](https://resend.com).

## Step 1: Install Supabase CLI

Run this command in your terminal to install the Supabase CLI:

```bash
npm install -g supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

## Step 3: Link Your Project

Get your Reference ID from your Supabase Project Settings (it looks like `qabouyfjaxumdcflktpm`).

```bash
supabase link --project-ref your-project-id
```

## Step 4: Set Secrets

Set your Resend API Key so the function can use it:

```bash
supabase secrets set RESEND_API_KEY=re_your_api_key_here
```

## Step 5: Deploy the Function

```bash
supabase functions deploy resend-email --no-verify-jwt
```

> **Note:** The `--no-verify-jwt` flag allows anyone to call this function (public). If you want to restrict it to logged-in users only, remove this flag, but you'll need to handle authentication in the frontend.

## Step 6: Verify

Once deployed, your website will automatically start using the real email function instead of the simulation!
