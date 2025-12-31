# ⚡ BACKEND QUICK REFERENCE CARD

## 🚀 **3-STEP ACTIVATION**

```bash
# 1. Install
npm install @supabase/supabase-js

# 2. Run SQL (in Supabase Dashboard)
# Copy supabase-schema.sql → SQL Editor → RUN

# 3. Restart
npm run dev
```

---

## 🧪 **QUICK TESTS**

### Newsletter:
`/` → Scroll to footer → Subscribe

### Contact:
`/contact` → Fill form → Submit

### Admin:
`/admin` → View all data

### Analytics:
Navigate pages → Check `page_views` table

---

## 📊 **DATABASE TABLES**

| Table | Route | Verification |
|-------|-------|--------------|
| `newsletter_subscriptions` | Footer | Supabase → Table Editor |
| `contact_submissions` | `/contact` | Supabase → Table Editor |
| `consultation_requests` | Modal | Supabase → Table Editor |
| `page_views` | Auto | Supabase → Table Editor |

---

## 🔗 **KEY URLS**

- **Homepage:** http://localhost:3000
- **Contact:** http://localhost:3000/contact
- **Admin:** http://localhost:3000/admin
- **Supabase:** https://qabouyfjaxumdcflktpm.supabase.co

---

## 📁 **KEY FILES**

```
/.env.local                    ← Credentials
/supabase-schema.sql           ← Run this in Supabase
/src/lib/supabase.ts           ← Client
/src/app/contact/page.tsx      ← Contact form
/src/app/admin/page.tsx        ← Dashboard
/src/components/ConsultationModal.tsx  ← Booking
```

---

## 🎨 **FEATURES**

✅ Newsletter (Footer)  
✅ Contact Form (/contact)  
✅ Consultation Modal (Reusable)  
✅ Analytics (Auto-tracking)  
✅ Admin Dashboard (/admin)  

---

## 🐛 **TROUBLESHOOTING**

| Issue | Solution |
|-------|----------|
| Missing env vars | Restart dev server |
| Table doesn't exist | Run SQL schema |
| Form not submitting | Check console (F12) |
| Empty admin | Submit test forms first |

---

## 📚 **DOCUMENTATION**

- **Quick Start:** BACKEND_QUICKSTART.md
- **Setup Guide:** SUPABASE_SETUP.md
- **Features:** BACKEND_COMPLETE.md
- **Summary:** BACKEND_SUMMARY.md
- **This Card:** QUICK_REFERENCE.md

---

## ✅ **CHECKLIST**

- [ ] Install @supabase/supabase-js
- [ ] Run supabase-schema.sql
- [ ] Restart dev server
- [ ] Test newsletter
- [ ] Test contact form
- [ ] Check admin dashboard
- [ ] Verify Supabase tables

---

**🎯 Ready in 3 minutes!**

**Next:** Execute SQL schema → Test features → Report results
