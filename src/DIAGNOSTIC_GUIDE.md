# 🔍 Complete Diagnostic & Troubleshooting Guide

## **STEP 1: Clear Everything & Rebuild**

### **1.1 Delete Build Caches**
```bash
# Stop the dev server first (Ctrl+C)

# Delete all cache and build files
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules

# Clear npm cache (optional but recommended)
npm cache clean --force
```

### **1.2 Reinstall Dependencies**
```bash
npm install
```

### **1.3 Rebuild & Start**
```bash
npm run dev
```

---

## **STEP 2: Check for Console Errors**

Open the browser and press **F12** to open DevTools:

### **Console Tab**
Look for these types of errors:
- ❌ `Module not found`
- ❌ `Cannot find module`
- ❌ `Unexpected token`
- ❌ `CSS syntax error`
- ❌ `Failed to compile`

**Screenshot the errors and share them!**

### **Network Tab**
Check if files are loading:
- `globals.css` should load (Status: 200)
- Font files should load
- Images should load

---

## **STEP 3: Verify File Structure**

Your structure should look like this:
```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ✅ Root layout
│   │   ├── page.tsx            ✅ Homepage
│   │   ├── about/
│   │   │   ├── page.tsx        ✅ About page wrapper
│   │   │   └── AboutPageContent.tsx  ✅ About content
│   │   └── globals.scss        ❌ WRONG LOCATION
│   ├── components/
│   │   ├── Header.tsx          ✅
│   │   ├── Footer.tsx          ✅
│   │   ├── Hero.tsx            ✅
│   │   └── ... (other components)
│   └── styles/
│       └── globals.scss        ✅ CORRECT LOCATION
├── public/
├── next.config.js              ✅
├── tailwind.config.ts          ✅
├── postcss.config.js           ✅
└── package.json                ✅
```

**Check if `globals.scss` is in `/src/styles/` NOT in `/src/app/`**

---

## **STEP 4: Common Issues & Solutions**

### **Issue 1: Styles Not Loading**

**Symptoms:**
- No colors, everything is white/black
- No neon effects
- Layout broken

**Solution:**
```typescript
// Check /src/app/layout.tsx line 3:
import '../styles/globals.scss';  // ✅ CORRECT PATH

// NOT:
import './globals.scss';  // ❌ WRONG if file is in /src/styles/
```

---

### **Issue 2: CSS Variables Not Working**

**Symptoms:**
- Colors show as `var(--neon-purple)` literally
- No gradients
- Background is white

**Quick Test:**
1. Open DevTools → Elements
2. Click on `<body>` tag
3. Look at "Computed" tab
4. Search for `--neon-purple`
5. Should show: `#DD00FF`

**If it shows nothing:**
- Check that `globals.scss` is imported in `layout.tsx`
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

---

### **Issue 3: Fonts Not Loading**

**Symptoms:**
- Text looks like default Arial/Times
- No Space Grotesk or Inter

**Solution:**
Check `/src/app/layout.tsx` lines 8-19:
```typescript
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
```

Should be applied in HTML tag (line 140):
```typescript
<html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
```

---

### **Issue 4: Links Not Working**

**Symptoms:**
- Clicking links refreshes page
- Navigation doesn't work
- 404 errors

**Check:**
```typescript
// ✅ CORRECT - Next.js Link
import Link from 'next/link';
<Link href="/about">About</Link>

// ❌ WRONG - React Router (old)
import { Link } from 'react-router-dom';
<Link to="/about">About</Link>
```

---

### **Issue 5: Build Errors**

**Run build command to see detailed errors:**
```bash
npm run build
```

Common errors:
- **Module not found**: Check import paths
- **Type error**: TypeScript issue
- **CSS error**: Check SCSS syntax

---

## **STEP 5: Manual Component Test**

Create a simple test page to isolate issues:

```typescript
// src/app/test/page.tsx
'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-8">
      <h1 className="text-5xl font-black text-white mb-4">
        Test Page
      </h1>
      
      {/* Test neon colors */}
      <div className="space-y-4">
        <div className="w-32 h-32 bg-[var(--neon-purple)] rounded-2xl" />
        <div className="w-32 h-32 bg-[var(--neon-cyan)] rounded-2xl" />
        <div className="w-32 h-32 bg-[var(--neon-pink)] rounded-2xl" />
        <div className="w-32 h-32 bg-[var(--neon-green)] rounded-2xl" />
      </div>
      
      {/* Test gradient text */}
      <p className="gradient-text-cyber text-4xl font-black mt-8">
        Gradient Text Test
      </p>
    </div>
  );
}
```

Visit: `http://localhost:3000/test`

**What should you see:**
- Dark background (#05060A - almost black)
- 4 bright neon colored squares (purple, cyan, pink, green)
- Gradient text with neon effect

**If you see this correctly**, the CSS system works! The issue is elsewhere.

---

## **STEP 6: Browser-Specific Issues**

### **Clear Browser Cache**
**Chrome/Edge:**
- Cmd+Shift+Delete (Mac) or Ctrl+Shift+Delete (Windows)
- Select "Cached images and files"
- Click "Clear data"

**Firefox:**
- Cmd+Shift+Delete (Mac) or Ctrl+Shift+Delete (Windows)  
- Select "Cache"
- Click "Clear Now"

**Safari:**
- Cmd+Option+E
- Or Safari → Clear History

### **Try Incognito/Private Mode**
- Chrome: Cmd+Shift+N (Mac) or Ctrl+Shift+N (Windows)
- Firefox: Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
- Safari: Cmd+Shift+N

---

## **STEP 7: Check Specific Files**

### **Verify globals.scss starts correctly:**
```bash
cat src/styles/globals.scss | head -20
```

Should show:
```scss
/* ============================================
   AXIS CYBER TECHNOLOGIES - GLOBAL STYLES
   ============================================ */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-primary: #05060A;
    --neon-purple: #DD00FF;
    --neon-cyan: #00FFFF;
    ...
```

### **Verify layout.tsx imports:**
```bash
grep -n "globals.scss" src/app/layout.tsx
```

Should show:
```
3:import '../styles/globals.scss';
```

---

## **STEP 8: Environment Check**

### **Node Version**
```bash
node --version
```
Should be: **v18.x** or higher

### **npm Version**
```bash
npm --version
```
Should be: **v9.x** or higher

### **Next.js Version**
```bash
npm list next
```
Should show: **14.2.0** or similar

---

## **STEP 9: Specific Error Solutions**

### **Error: "Cannot find module 'sass'"**
```bash
npm install -D sass
```

### **Error: "Module parse failed"**
```bash
# Check postcss.config.js exists
cat postcss.config.js
```

### **Error: "TypeError: Cannot read property"**
- Usually means a component has a runtime error
- Check browser console
- Look for the specific component name in error

### **Error: "Hydration mismatch"**
- Add `suppressHydrationWarning` to body tag
- Already added in layout.tsx

---

## **STEP 10: Report Issues**

If still broken, please provide:

### **1. Screenshot of the page**
What you see vs what it should look like

### **2. Browser Console Errors**
F12 → Console → Screenshot any red errors

### **3. Terminal Output**
Copy any errors from where you ran `npm run dev`

### **4. Network Tab**
F12 → Network → Filter "CSS" → Screenshot

### **5. Build Output**
```bash
npm run build
```
Copy the entire output

### **6. Specific Issues**
Example format:
```
ISSUE: Header is white instead of transparent with blur
EXPECTED: Dark transparent background with backdrop blur
ACTUAL: Solid white background
BROWSER: Chrome 120
PAGE: Homepage (/)
CONSOLE ERRORS: None
```

---

## **Quick Checklist**

Before reporting issues, verify:

- [ ] Ran `rm -rf .next node_modules` and `npm install`
- [ ] Ran `npm run dev` successfully
- [ ] Cleared browser cache
- [ ] Tried incognito mode
- [ ] Checked console for errors (F12)
- [ ] Verified `globals.scss` is in `/src/styles/`
- [ ] Checked that `layout.tsx` imports `../styles/globals.scss`
- [ ] Created test page to isolate issue
- [ ] Tried different browser
- [ ] Node version is 18+

---

## **Expected Visual Results**

### **Homepage Should Show:**
- ✅ Dark background (#05060A - almost black)
- ✅ Neon purple (#DD00FF), cyan (#00FFFF), pink (#FF0099) colors
- ✅ Space Grotesk font on headings (geometric, modern)
- ✅ Glowing neon effects on hover
- ✅ Smooth animations and transitions
- ✅ Gradient text effects
- ✅ Transparent header with blur
- ✅ Stats showing "100%"
- ✅ Responsive grid layouts

### **About Page Should Show:**
- ✅ Same dark theme
- ✅ Stats cards with neon borders
- ✅ Mission/Vision cards with gradients
- ✅ Timeline with animated dots
- ✅ Global office cards (4 locations)
- ✅ 100% achievement badges
- ✅ All hover effects working

---

## **Contact for Support**

If all else fails, provide:
1. Full screenshots of the page
2. All console errors
3. Build output
4. OS and browser version
5. Node and npm versions

---

© 2024 Axis Cyber Technologies
