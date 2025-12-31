#!/bin/bash

# Axis Cyber Technologies - Quick Fix Script
# This script will clean and rebuild your Next.js project

echo "🔧 Axis Cyber Quick Fix Script"
echo "================================"
echo ""

# Step 1: Stop any running dev server
echo "📍 Step 1: Stopping any running dev servers..."
pkill -f "next dev" 2>/dev/null || true
sleep 1

# Step 2: Clean build artifacts
echo "📍 Step 2: Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
echo "   ✅ Cleaned .next and cache"

# Step 3: Clean node_modules (optional - uncomment if needed)
# echo "📍 Step 3: Cleaning node_modules..."
# rm -rf node_modules
# echo "   ✅ Cleaned node_modules"

# Step 4: Reinstall dependencies (only if node_modules was deleted)
# echo "📍 Step 4: Reinstalling dependencies..."
# npm install
# echo "   ✅ Dependencies installed"

# Step 5: Verify critical files
echo "📍 Step 3: Verifying critical files..."

if [ -f "src/styles/globals.scss" ]; then
    echo "   ✅ globals.scss found"
else
    echo "   ❌ ERROR: globals.scss not found in src/styles/"
    exit 1
fi

if [ -f "src/app/layout.tsx" ]; then
    echo "   ✅ layout.tsx found"
else
    echo "   ❌ ERROR: layout.tsx not found"
    exit 1
fi

if [ -f "tailwind.config.ts" ]; then
    echo "   ✅ tailwind.config.ts found"
else
    echo "   ❌ ERROR: tailwind.config.ts not found"
    exit 1
fi

if [ -f "postcss.config.js" ]; then
    echo "   ✅ postcss.config.js found"
else
    echo "   ❌ ERROR: postcss.config.js not found"
    exit 1
fi

# Step 6: Check globals.scss syntax
echo "📍 Step 4: Checking globals.scss syntax..."
if grep -q "@tailwind base" src/styles/globals.scss; then
    echo "   ✅ Tailwind directives correct"
else
    echo "   ❌ WARNING: Tailwind directives might be incorrect"
fi

# Step 7: Check layout.tsx import
echo "📍 Step 5: Checking layout.tsx imports..."
if grep -q "import.*globals.scss" src/app/layout.tsx; then
    echo "   ✅ globals.scss imported in layout.tsx"
else
    echo "   ❌ WARNING: globals.scss import not found in layout.tsx"
fi

# Step 8: Build test
echo "📍 Step 6: Testing build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Build successful"
else
    echo "   ❌ Build failed - check errors with: npm run build"
    echo ""
    echo "Running build to show errors:"
    npm run build
    exit 1
fi

# Success message
echo ""
echo "================================"
echo "✅ All checks passed!"
echo ""
echo "Next steps:"
echo "  1. Run: npm run dev"
echo "  2. Open: http://localhost:3000"
echo "  3. Press F12 to check console for errors"
echo "  4. Clear browser cache (Cmd+Shift+R)"
echo ""
echo "If issues persist, see DIAGNOSTIC_GUIDE.md"
echo "================================"
