# ⚡ PHASE 4 - QUICK REFERENCE

## 🎯 **NEW ENDPOINTS**

### **Admin Bulk Operations**
```
POST   /api/admin/bulk          - Bulk create records
PUT    /api/admin/bulk          - Bulk update records
DELETE /api/admin/bulk          - Bulk delete records
PATCH  /api/admin/bulk          - Bulk reorder (display_order)
```

### **Analytics & Reporting**
```
GET  /api/admin/analytics?type=dashboard           - Dashboard stats
GET  /api/admin/analytics?type=popular&limit=10    - Popular content
GET  /api/admin/analytics?type=timeseries&entity=contact_submissions&days=30
GET  /api/admin/analytics?type=services-breakdown
GET  /api/admin/analytics?type=contacts-by-status
GET  /api/admin/analytics?type=blog-by-category
GET  /api/admin/analytics?type=team-distribution
POST /api/admin/analytics      - Export data (CSV/JSON)
```

### **Search**
```
GET  /api/search?q=blockchain&limit=20&type=service  - Full-text search
POST /api/search {"query": "web"}                    - Search suggestions
```

### **File Upload**
```
POST /api/upload              - Upload single file
PUT  /api/upload              - Upload multiple files (max 10)
```

### **Media Library**
```
GET    /api/media?page=1&limit=50&fileType=image  - Get media files
PUT    /api/media             - Update media metadata
DELETE /api/media?id=uuid     - Delete media file
```

---

## 🔧 **QUERY PARAMETERS**

### **All GET Endpoints Support:**

```
?page=1                    - Page number (default: 1)
?limit=20                  - Results per page (default: 10, max: 100)
?sortBy=name               - Sort field
?sortOrder=asc             - Sort order (asc/desc)
?search=query              - Full-text search
?is_active=true            - Filter by boolean
?status=published          - Filter by string
?tags=react,nextjs         - Filter by array (comma-separated)
?startDate=2024-01-01      - Date range start
?endDate=2024-12-31        - Date range end
```

### **Example: Combined Query**
```
GET /api/services?
  search=web&
  is_active=true&
  is_featured=true&
  sortBy=projects_completed&
  sortOrder=desc&
  page=1&
  limit=20
```

---

## 📦 **UTILITY FUNCTIONS**

### **Import:**
```typescript
import { 
  getPaginationParams, 
  getSortParams, 
  getFilterParams,
  applySearch,
  buildAdvancedQuery,
  successResponse,
  errorResponse,
  paginatedResponse
} from '@/lib/api-utils';

import { 
  uploadImage, 
  uploadDocument, 
  deleteFile,
  getMediaFiles 
} from '@/lib/storage';

import { 
  getDashboardStats, 
  trackView,
  getPopularContent 
} from '@/lib/analytics';
```

### **Common Usage:**
```typescript
// Pagination
const { page, limit, offset } = getPaginationParams(request);

// Sorting
const { sortBy, sortOrder } = getSortParams(request, allowedFields, 'created_at');

// Filtering
const filters = getFilterParams(request, ['is_active', 'status']);

// Complete query builder
const query = await buildAdvancedQuery(request, baseQuery, {
  pagination: true,
  sorting: true,
  filtering: true,
  search: true,
  allowedSortFields: ['name', 'created_at'],
  allowedFilterFields: ['is_active', 'status'],
  searchFields: ['name', 'description'],
});

// Responses
return successResponse(data, 'Success message');
return errorResponse('Error message', 400);
return paginatedResponse(data, total, page, limit);
```

---

## 🔒 **AUTHENTICATION**

All admin endpoints require authentication:

```typescript
import { validateAuth } from '@/lib/auth';

const authResult = await validateAuth(request);
if (!authResult.valid || authResult.user?.role !== 'admin') {
  return errorResponse('Unauthorized', 401);
}
```

---

## 📊 **DASHBOARD STATS RESPONSE**

```json
{
  "services": { "total": 12, "active": 12, "featured": 6 },
  "testimonials": { "total": 25, "published": 20, "averageRating": 4.8 },
  "caseStudies": { "total": 15, "published": 12, "featured": 6 },
  "teamMembers": { "total": 45, "active": 40, "leadership": 8 },
  "blogPosts": { "total": 100, "published": 85, "draft": 15 },
  "contactSubmissions": { "total": 500, "thisMonth": 45, "thisWeek": 12 }
}
```

---

## 📁 **BULK OPERATIONS**

### **Allowed Tables:**
- services
- testimonials
- case_studies
- team_members
- blog_posts
- blog_categories
- blog_tags
- faqs
- career_listings

### **Limits:**
- Max 100 records per operation
- Admin authentication required

---

## 🔍 **SEARCH SCOPE**

**Searches across:**
- Services (name, short_description, full_description)
- Blog Posts (title, excerpt, content)
- Case Studies (title, summary, challenge, solution)
- FAQs (question, answer)
- Team Members (name, role, bio)

**Features:**
- Relevance sorting
- Type filtering
- Case-insensitive
- Minimum 2 characters

---

## 📤 **FILE UPLOAD**

### **Validation:**
```
Images:    Max 5MB  | JPG, PNG, GIF, WEBP, SVG
Documents: Max 10MB | PDF, DOC, DOCX
```

### **Storage Buckets:**
- images
- documents
- videos
- avatars

### **FormData Example:**
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('type', 'image');
formData.append('folder', 'uploads');
formData.append('altText', 'Description');
```

---

## 📈 **ANALYTICS TYPES**

```
dashboard           - Overall statistics
popular             - Most viewed content
timeseries          - Time-based data
services-breakdown  - Service performance
contacts-by-status  - Contact distribution
blog-by-category    - Blog categorization
team-distribution   - Team composition
```

---

## 🧪 **TESTING COMMANDS**

```bash
# Search
curl "http://localhost:3000/api/search?q=blockchain"

# Pagination
curl "http://localhost:3000/api/services?page=2&limit=10"

# Analytics
curl "http://localhost:3000/api/admin/analytics?type=dashboard" \
  -H "Authorization: Bearer TOKEN"

# Bulk delete
curl -X DELETE http://localhost:3000/api/admin/bulk \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"table":"faqs","ids":["uuid1","uuid2"]}'
```

---

## ✅ **FILES CREATED**

```
/lib/api-utils.ts                      - Query utilities
/lib/storage.ts                        - File upload/storage
/lib/analytics.ts                      - Analytics functions
/app/api/admin/bulk/route.ts           - Bulk operations
/app/api/admin/analytics/route.ts      - Analytics API
/app/api/search/route.ts               - Search API
/app/api/upload/route.ts               - Upload API
/app/api/media/route.ts                - Media library API
/PHASE_4_COMPLETE.md                   - Full documentation
/PHASE_4_QUICK_REFERENCE.md            - This file
```

---

**Phase 4 Complete!** 🚀

See `/PHASE_4_COMPLETE.md` for full documentation.
