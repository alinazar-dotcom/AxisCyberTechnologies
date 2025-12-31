#!/bin/bash

# Email Subscription System - Quick Test Script
# This script tests the newsletter subscription functionality

echo "🧪 Testing Email Subscription System"
echo "======================================"
echo ""

# Check if server is running
echo "📡 Checking if dev server is running..."
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Server is running"
else
    echo "❌ Server is not running"
    echo "Please run 'npm run dev' first"
    exit 1
fi

echo ""
echo "🔍 Testing API endpoint..."
echo ""

# Test email subscription
RESPONSE=$(curl -s -X POST http://localhost:5173/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-'$(date +%s)'@example.com",
    "source": "test_script",
    "preferences": ["AI", "Cloud", "Blockchain"]
  }')

echo "Response:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"

echo ""
echo "======================================"
echo "📋 Next Steps:"
echo "1. Check Supabase dashboard → newsletter_subscriptions table"
echo "2. Check your email inbox for welcome message"
echo "3. Check Discord for notification (if configured)"
echo ""
echo "💡 Tip: Update RESEND_API_KEY in .env to send real emails"
echo "======================================"
