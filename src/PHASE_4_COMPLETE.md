# 🚀 PHASE 4: ADVANCED API FEATURES & ADMIN CMS - COMPLETE!

## ✅ **WHAT WAS BUILT**

Phase 4 adds powerful advanced features to your API including search, filtering, bulk operations, file uploads, analytics, and more!

---

## 📦 **NEW FILES CREATED**

### **Utilities (3 files)**
1. ✅ `/lib/api-utils.ts` - Advanced query utilities (pagination, filtering, sorting, search)
2. ✅ `/lib/storage.ts` - File upload & media management
3. ✅ `/lib/analytics.ts` - Analytics & statistics tracking

### **API Endpoints (5 files)**
4. ✅ `/app/api/admin/bulk/route.ts` - Bulk operations (create, update, delete, reorder)
5. ✅ `/app/api/admin/analytics/route.ts` - Dashboard analytics & data export
6. ✅ `/app/api/search/route.ts` - Advanced full-text search
7. ✅ `/app/api/upload/route.ts` - File upload endpoint
8. ✅ `/app/api/media/route.ts` - Media library management

---

## 🎯 **FEATURES INCLUDED**

### **1. Advanced Query Features**

#### **Pagination**
```typescript
// GET /api/services?page=2&limit=20
- Supports page/limit parameters
- Returns pagination metadata (total, hasMore, etc.)
- Default: page=1, limit=10
- Maximum limit: 100 per request
```

#### **Sorting**
```typescript
// GET /api/services?sortBy=name&sortOrder=asc
- Sort by any field
- Ascending or descending order
- Validates allowed sort fields
- Default: created_at DESC
```

#### **Filtering**
```typescript
// GET /api/services?is_active=true&is_featured=true
- Filter by any field
- Supports boolean, numeric, string values
- Comma-separated values for IN queries
- Example: ?tags=react,nextjs (matches any)
```

#### **Search**
```typescript
// GET /api/services?search=blockchain
- Full-text search across multiple fields
- Case-insensitive matching
- Searches: name, description, content
```

#### **Date Range**
```typescript
// GET /api/contact?startDate=2024-01-01&endDate=2024-12-31
- Filter by date ranges
- Works with any date field
```

#### **Combined Example**
```typescript
GET /api/services?
  search=web&
  is_active=true&
  sortBy=projects_completed&
  sortOrder=desc&
  page=1&
  limit=20
```

---

### **2. Admin Bulk Operations**

#### **Bulk Create**
```typescript
POST /api/admin/bulk
{
  "table": "services",
  "records": [
    { "name": "Service 1", "slug": "service-1", ... },
    { "name": "Service 2", "slug": "service-2", ... }
  ]
}

Response:
{
  "success": true,
  "data": {
    "created": 2,
    "records": [...]
  }
}
```

**Features:**
- Create up to 100 records at once
- Validates table names (whitelist)
- Returns all created records
- Requires admin authentication

**Allowed Tables:**
- services
- testimonials
- case_studies
- team_members
- blog_posts
- blog_categories
- blog_tags
- faqs
- career_listings

#### **Bulk Update**
```typescript
PUT /api/admin/bulk
{
  "table": "services",
  "updates": [
    { "id": "uuid-1", "is_featured": true },
    { "id": "uuid-2", "is_active": false }
  ]
}

Response:
{
  "success": true,
  "data": {
    "updated": 2,
    "failed": 0,
    "records": [...],
    "errors": []
  }
}
```

**Features:**
- Update up to 100 records at once
- Partial updates supported
- Reports success/failure for each record
- Requires admin authentication

#### **Bulk Delete**
```typescript
DELETE /api/admin/bulk
{
  "table": "services",
  "ids": ["uuid-1", "uuid-2", "uuid-3"]
}

Response:
{
  "success": true,
  "data": {
    "deleted": 3,
    "ids": [...]
  }
}
```

**Features:**
- Delete up to 100 records at once
- Cascading deletes handled by database
- Requires admin authentication

#### **Bulk Reorder (Drag & Drop)**
```typescript
PATCH /api/admin/bulk
{
  "table": "services",
  "order": ["uuid-3", "uuid-1", "uuid-2"]
}

Response:
{
  "success": true,
  "data": {
    "reordered": 3,
    "records": [...]
  }
}
```

**Features:**
- Update display_order based on array position
- Perfect for drag-and-drop interfaces
- Maintains order in database

---

### **3. File Upload & Media Management**

#### **Upload Single File**
```typescript
POST /api/upload
Content-Type: multipart/form-data

FormData:
- file: <File>
- type: "image" | "document" | "avatar"
- folder: "uploads" (optional)
- altText: "Description" (optional)
- userId: "uuid" (required for avatars)

Response:
{
  "success": true,
  "data": {
    "url": "https://...storage.../image.png",
    "path": "uploads/image-123.png",
    "metadata": {
      "size": 1024000,
      "type": "image/png"
    }
  }
}
```

**Features:**
- Automatic file validation
- Unique filename generation
- Image optimization
- Stores in Supabase Storage
- Saves metadata to media_library table

**Validation:**
- Images: Max 5MB, JPG/PNG/GIF/WEBP/SVG
- Documents: Max 10MB, PDF/DOC/DOCX
- Automatic file type detection

#### **Upload Multiple Files**
```typescript
PUT /api/upload
Content-Type: multipart/form-data

FormData:
- files: [<File>, <File>, ...]
- folder: "uploads" (optional)

Response:
{
  "success": true,
  "data": {
    "uploaded": 5,
    "failed": 0,
    "files": [...],
    "errors": []
  }
}
```

**Features:**
- Upload up to 10 files at once
- Parallel processing
- Individual error handling
- Admin only

#### **Media Library API**

**Get Media Files:**
```typescript
GET /api/media?page=1&limit=50&fileType=image

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3,
    "hasMore": true
  }
}
```

**Update Media Metadata:**
```typescript
PUT /api/media
{
  "id": "uuid",
  "altText": "New description",
  "tags": ["product", "featured"],
  "description": "Product photo"
}
```

**Delete Media File:**
```typescript
DELETE /api/media?id=uuid

- Deletes from storage
- Removes from database
- Cascading cleanup
```

---

### **4. Analytics & Reporting**

#### **Dashboard Statistics**
```typescript
GET /api/admin/analytics?type=dashboard

Response:
{
  "success": true,
  "data": {
    "services": {
      "total": 12,
      "active": 12,
      "featured": 6
    },
    "testimonials": {
      "total": 25,
      "published": 20,
      "averageRating": 4.8
    },
    "caseStudies": {
      "total": 15,
      "published": 12,
      "featured": 6
    },
    "teamMembers": {
      "total": 45,
      "active": 40,
      "leadership": 8
    },
    "blogPosts": {
      "total": 100,
      "published": 85,
      "draft": 15
    },
    "contactSubmissions": {
      "total": 500,
      "thisMonth": 45,
      "thisWeek": 12
    }
  }
}
```

#### **Popular Content**
```typescript
GET /api/admin/analytics?type=popular&limit=10

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "AI & Machine Learning",
      "slug": "ai-ml",
      "views": 5000,
      "type": "service"
    },
    ...
  ]
}
```

#### **Time Series Data**
```typescript
GET /api/admin/analytics?type=timeseries&entity=contact_submissions&days=30

Response:
{
  "success": true,
  "data": [
    { "date": "2024-01-01", "count": 15 },
    { "date": "2024-01-02", "count": 22 },
    ...
  ]
}
```

**Available Entities:**
- contact_submissions
- blog_posts
- job_applications

#### **Other Analytics Types:**

**Services Breakdown:**
```typescript
GET /api/admin/analytics?type=services-breakdown
- Projects completed per service
- Success rates
- View counts
```

**Contacts by Status:**
```typescript
GET /api/admin/analytics?type=contacts-by-status
- Groups contacts by status
- Returns count for each status
```

**Blog by Category:**
```typescript
GET /api/admin/analytics?type=blog-by-category
- Post count per category
- Ordered by popularity
```

**Team Distribution:**
```typescript
GET /api/admin/analytics?type=team-distribution
- By department
- By office location
- Leadership vs staff
```

#### **Data Export**
```typescript
POST /api/admin/analytics
{
  "table": "contact_submissions",
  "format": "csv", // or "json"
  "filters": {
    "status": "new"
  }
}

Response: CSV or JSON file download
```

**Features:**
- Export any table to CSV or JSON
- Apply filters before export
- Automatic file download
- Timestamp in filename

---

### **5. Advanced Search**

#### **Full-Text Search**
```typescript
GET /api/search?q=blockchain&limit=20

Response:
{
  "success": true,
  "data": {
    "query": "blockchain",
    "total": 15,
    "results": [
      {
        "type": "service",
        "id": "uuid",
        "title": "Blockchain Development",
        "slug": "blockchain",
        "description": "Build the future...",
        "url": "/services/blockchain"
      },
      {
        "type": "blog",
        "id": "uuid",
        "title": "Understanding Blockchain",
        "slug": "understanding-blockchain",
        "description": "A comprehensive guide...",
        "url": "/blog/understanding-blockchain"
      },
      ...
    ]
  }
}
```

**Searches Across:**
- Services (name, descriptions)
- Blog posts (title, excerpt, content)
- Case studies (title, summary, challenge, solution)
- FAQs (question, answer)
- Team members (name, role, bio)

**Features:**
- Relevance sorting (exact matches first)
- Type filtering (?type=blog)
- Pagination support
- Case-insensitive
- Minimum 2 characters

#### **Search Suggestions**
```typescript
POST /api/search
{
  "query": "block"
}

Response:
{
  "success": true,
  "data": {
    "suggestions": [
      "Blockchain Development",
      "Blockchain Security Best Practices",
      "Understanding Blockchain Technology",
      ...
    ]
  }
}
```

**Features:**
- Autocomplete suggestions
- Based on service names and blog titles
- Prefix matching
- Limit 8 suggestions

---

## 🛠️ **UTILITY FUNCTIONS**

### **API Utils (`/lib/api-utils.ts`)**

```typescript
// Pagination
getPaginationParams(request) // Extract page & limit
createPaginatedResponse(data, total, page, limit) // Build response

// Sorting
getSortParams(request, allowedFields, defaultField)
applySorting(query, sortBy, sortOrder)

// Filtering
getFilterParams(request, allowedFilters)
applyFilters(query, filters)

// Search
getSearchParams(request)
applySearch(query, searchQuery, searchFields)

// Date Range
getDateRangeParams(request)
applyDateRange(query, field, startDate, endDate)

// Combined Query Builder
buildAdvancedQuery(request, baseQuery, options)

// Response Builders
successResponse(data, message?)
errorResponse(message, statusCode, errors?)
paginatedResponse(data, total, page, limit)

// Validation
validateRequiredFields(data, requiredFields)
isValidUUID(uuid)
isValidEmail(email)
isValidURL(url)

// Sanitization
sanitizeString(str)
sanitizeObject(obj)

// Slugs
generateSlug(text)
generateUniqueSlug(text)
```

### **Storage Utils (`/lib/storage.ts`)**

```typescript
// Upload
uploadFile(file, bucket, folder)
uploadImage(file, folder)
uploadAvatar(file, userId)
uploadDocument(file, folder)
uploadFromURL(imageUrl, filename?)

// Delete
deleteFile(filePath, bucket)
deleteFiles(filePaths, bucket)
deleteMediaFile(mediaId) // Both storage & DB

// Media Library
saveMediaMetadata(...)
getMediaFiles(filters?)

// Validation
validateFileType(mimeType, allowedTypes)
validateFileSize(size, maxSize)
validateImageFile(file)

// Utils
generateUniqueFilename(originalFilename)
getFileTypeCategory(mimeType)

// Buckets
ensureBucketsExist()
```

### **Analytics Utils (`/lib/analytics.ts`)**

```typescript
// Tracking
trackView(entityType, entityId)
trackFAQHelpful(faqId)

// Statistics
getDashboardStats()
getPopularContent(limit?)
getServiceStats(serviceId)
getTimeSeriesData(entityType, days?)

// Export
exportToCSV(data, filename)
exportToJSON(data, filename)
```

---

## 📊 **EXAMPLE USAGE**

### **Enhanced Services API with All Features**

```typescript
// /app/api/services/route.ts (updated)

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { buildAdvancedQuery, paginatedResponse, errorResponse } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  const supabase = createClient(...);
  
  const baseQuery = supabase
    .from('services')
    .select('*', { count: 'exact' });

  // Apply all advanced features
  const query = await buildAdvancedQuery(request, baseQuery, {
    pagination: true,
    sorting: true,
    filtering: true,
    search: true,
    allowedSortFields: ['name', 'projects_completed', 'success_rate', 'created_at'],
    allowedFilterFields: ['is_active', 'is_featured', 'success_rate'],
    searchFields: ['name', 'short_description', 'full_description'],
    defaultSortField: 'display_order',
  });

  const { data, error, count } = await query;

  if (error) {
    return errorResponse(error.message, 500);
  }

  const { page, limit } = getPaginationParams(request);
  return paginatedResponse(data, count || 0, page, limit);
}
```

**Usage Examples:**

```bash
# Basic pagination
GET /api/services?page=1&limit=10

# Search + filter + sort
GET /api/services?search=web&is_active=true&sortBy=name&sortOrder=asc

# All features combined
GET /api/services?search=AI&is_featured=true&sortBy=projects_completed&sortOrder=desc&page=1&limit=20
```

---

## 🔒 **SECURITY**

### **Authentication**
- All admin endpoints require authentication
- Role-based access control (admin only for sensitive operations)
- Uses `validateAuth()` from Phase 1

### **File Upload Security**
- File type validation (whitelist)
- File size limits (5MB images, 10MB docs)
- Unique filename generation (prevents overwrites)
- Virus scanning (recommended to add)

### **Bulk Operations**
- Table name whitelist (prevents SQL injection)
- Maximum limits (100 records per operation)
- Admin-only access
- Input validation

### **Data Export**
- Admin authentication required
- Table whitelist
- No sensitive data exposure

---

## 🎨 **FRONTEND INTEGRATION**

### **Using Advanced Search**

```typescript
// components/SearchBar.tsx
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);

const handleSearch = async (q: string) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await response.json();
  
  if (data.success) {
    setResults(data.data.results);
  }
};

// With autocomplete
const [suggestions, setSuggestions] = useState([]);

const getSuggestions = async (q: string) => {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: q }),
  });
  
  const data = await response.json();
  if (data.success) {
    setSuggestions(data.data.suggestions);
  }
};
```

### **Using Bulk Operations**

```typescript
// Admin panel - Bulk delete
const handleBulkDelete = async (selectedIds: string[]) => {
  const response = await fetch('/api/admin/bulk', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      table: 'services',
      ids: selectedIds,
    }),
  });

  const data = await response.json();
  console.log(`Deleted ${data.data.deleted} records`);
};

// Drag & drop reorder
const handleReorder = async (newOrder: string[]) => {
  const response = await fetch('/api/admin/bulk', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      table: 'services',
      order: newOrder,
    }),
  });

  const data = await response.json();
  console.log(`Reordered ${data.data.reordered} records`);
};
```

### **Using File Upload**

```typescript
// File upload component
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');
  formData.append('folder', 'blog-images');
  formData.append('altText', 'Blog featured image');

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  
  if (data.success) {
    console.log('Uploaded:', data.data.url);
    return data.data.url;
  }
};
```

### **Using Analytics**

```typescript
// Dashboard component
const [stats, setStats] = useState(null);

useEffect(() => {
  const fetchStats = async () => {
    const response = await fetch('/api/admin/analytics?type=dashboard', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    const data = await response.json();
    if (data.success) {
      setStats(data.data);
    }
  };

  fetchStats();
}, []);

// Display stats
{stats && (
  <div>
    <h2>Services: {stats.services.total}</h2>
    <h2>Blog Posts: {stats.blogPosts.published}</h2>
    <h2>Contacts This Week: {stats.contactSubmissions.thisWeek}</h2>
  </div>
)}
```

---

## 🧪 **TESTING**

### **Test Advanced Query Features**

```bash
# Pagination
curl "http://localhost:3000/api/services?page=2&limit=5"

# Sorting
curl "http://localhost:3000/api/services?sortBy=name&sortOrder=asc"

# Filtering
curl "http://localhost:3000/api/services?is_active=true&is_featured=true"

# Search
curl "http://localhost:3000/api/services?search=blockchain"

# Combined
curl "http://localhost:3000/api/services?search=web&is_active=true&sortBy=projects_completed&sortOrder=desc&page=1&limit=10"
```

### **Test Bulk Operations**

```bash
# Bulk create
curl -X POST http://localhost:3000/api/admin/bulk \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "table": "faqs",
    "records": [
      {
        "question": "What is AI?",
        "answer": "Artificial Intelligence...",
        "category": "Technical"
      },
      {
        "question": "How much does it cost?",
        "answer": "Pricing varies...",
        "category": "Pricing"
      }
    ]
  }'

# Bulk delete
curl -X DELETE http://localhost:3000/api/admin/bulk \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "table": "faqs",
    "ids": ["uuid-1", "uuid-2"]
  }'
```

### **Test Search**

```bash
# Full-text search
curl "http://localhost:3000/api/search?q=blockchain&limit=10"

# Filter by type
curl "http://localhost:3000/api/search?q=development&type=service"

# Get suggestions
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "web"}'
```

### **Test Analytics**

```bash
# Dashboard stats
curl "http://localhost:3000/api/admin/analytics?type=dashboard" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Popular content
curl "http://localhost:3000/api/admin/analytics?type=popular&limit=5" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Export data
curl -X POST http://localhost:3000/api/admin/analytics \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "table": "contact_submissions",
    "format": "csv",
    "filters": { "status": "new" }
  }' \
  --output contacts-export.csv
```

---

## 📈 **PERFORMANCE**

### **Optimizations Included:**

1. **Database Indexing** - Schema includes indexes on frequently queried fields
2. **Pagination** - Limits data transfer and DB load
3. **Selective Queries** - Only fetch needed columns with `.select()`
4. **Batch Operations** - Bulk endpoints reduce API calls
5. **Caching Headers** - Add cache control headers (recommended)

### **Recommended Improvements:**

```typescript
// Add caching
export async function GET(request: NextRequest) {
  // ... your code
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}

// Add rate limiting (use a library like `rate-limiter-flexible`)
```

---

## 🎉 **PHASE 4 COMPLETE!**

You now have:

✅ **Advanced Query Features** - Pagination, sorting, filtering, search  
✅ **Admin CMS** - Bulk operations, reordering, management  
✅ **File Upload** - Images, documents, media library  
✅ **Analytics** - Dashboard stats, reporting, data export  
✅ **Advanced Search** - Full-text search with suggestions  
✅ **Utility Functions** - Reusable helpers for all features  

---

## 🔜 **NEXT: PHASE 5**

Ready to move to Phase 5? Let me know what you'd like to build next!

**Possible Phase 5 features:**
- Email templates & automation
- Notification system (in-app alerts)
- Advanced caching layer
- API documentation (Swagger/OpenAPI)
- Webhooks for external integrations
- Real-time features (WebSockets)
- Multi-language support (i18n)
- API versioning

**What would you like in Phase 5?** 🚀
