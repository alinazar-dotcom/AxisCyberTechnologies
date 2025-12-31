# ⚡ **PHASE 4 - QUICK START GUIDE**

Get started with Phase 4 features in 5 minutes!

---

## 🚀 **TL;DR - What You Can Do Now**

```bash
# Pagination
GET /api/services?page=2&limit=20

# Search
GET /api/services?search=blockchain

# Sort
GET /api/services?sortBy=views&sortOrder=desc

# Filter
GET /api/services?is_featured=true

# Everything combined
GET /api/services?search=web&is_featured=true&sortBy=projects_completed&sortOrder=desc&page=1&limit=12

# Global search
GET /api/search?q=AI&limit=20

# Analytics (admin)
GET /api/admin/analytics?type=dashboard

# Bulk operations (admin)
POST /api/admin/bulk (create)
PUT /api/admin/bulk (update)
DELETE /api/admin/bulk (delete)
PATCH /api/admin/bulk (reorder)
```

---

## 📦 **What's New?**

### **All List Endpoints:**
- ✅ Pagination
- ✅ Sorting
- ✅ Search
- ✅ Filtering

### **All Detail Endpoints:**
- ✅ Auto view tracking

### **New Endpoints:**
- ✅ Global search
- ✅ Analytics
- ✅ Bulk operations
- ✅ File upload
- ✅ Media library

---

## 🎯 **Quick Examples**

### **1. Paginated Services**
```typescript
const response = await fetch('/api/services?page=1&limit=12');
const { data, pagination } = await response.json();

// data = array of services
// pagination = { page, limit, total, totalPages, hasMore, hasPrevious }
```

### **2. Search Blog Posts**
```typescript
const response = await fetch('/api/blog?search=blockchain&page=1&limit=10');
const { data } = await response.json();
```

### **3. Filter Testimonials**
```typescript
const response = await fetch('/api/testimonials?rating=5&is_featured=true');
const { data } = await response.json();
```

### **4. Global Search**
```typescript
const response = await fetch('/api/search?q=AI&limit=20');
const { data } = await response.json();
// data.results = [{ type, id, title, description, url }, ...]
```

### **5. Get Analytics (Admin)**
```typescript
const response = await fetch('/api/admin/analytics?type=dashboard', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const { data } = await response.json();
// data = { services: {...}, testimonials: {...}, ... }
```

---

## 🔧 **Available on All Endpoints**

### **Pagination:**
```
?page=1          # Page number (default: 1)
?limit=10        # Items per page (default: 10, max: 100)
```

### **Sorting:**
```
?sortBy=name         # Field to sort by
?sortOrder=asc       # asc or desc (default: desc)
```

### **Search:**
```
?search=blockchain   # Search query (min 2 chars)
```

### **Filtering:**
```
?is_featured=true    # Boolean filter
?rating=5            # Numeric filter
?tags=react,nextjs   # Array filter (comma-separated)
```

---

## 📊 **Response Format**

### **Before:**
```json
{
  "success": true,
  "data": {
    "services": [...],
    "total": 12
  }
}
```

### **After:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasMore": true,
    "hasPrevious": false
  }
}
```

---

## 🎨 **React Example**

```typescript
import { useState, useEffect } from 'react';

function ServicesList() {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/services?page=${page}&limit=12`)
      .then(res => res.json())
      .then(data => setServices(data.data));
  }, [page]);

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
      <button onClick={() => setPage(p => p - 1)}>Previous</button>
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}
```

---

## 🔍 **Searchable Endpoints**

All these endpoints support `?search=query`:

- `/api/services` - Search name, descriptions
- `/api/blog` - Search title, excerpt, content
- `/api/case-studies` - Search title, summary, challenge, solution
- `/api/faqs` - Search question, answer
- `/api/careers` - Search title, description, qualifications
- `/api/testimonials` - Search client name, company, content
- `/api/team` - Search name, role, bio

---

## 📈 **Analytics Endpoints (Admin Only)**

```bash
# Dashboard stats
GET /api/admin/analytics?type=dashboard

# Popular content (most viewed)
GET /api/admin/analytics?type=popular&limit=10

# Time series data
GET /api/admin/analytics?type=timeseries&entity=contact_submissions&days=30

# Service breakdown
GET /api/admin/analytics?type=services-breakdown

# Contacts by status
GET /api/admin/analytics?type=contacts-by-status

# Export data
POST /api/admin/analytics
{
  "table": "contact_submissions",
  "format": "csv",
  "filters": { "status": "new" }
}
```

---

## 🔥 **Bulk Operations (Admin Only)**

```typescript
// Bulk create
POST /api/admin/bulk
{
  "table": "faqs",
  "records": [
    { "question": "Q1", "answer": "A1" },
    { "question": "Q2", "answer": "A2" }
  ]
}

// Bulk update
PUT /api/admin/bulk
{
  "table": "services",
  "updates": [
    { "id": "uuid-1", "is_featured": true },
    { "id": "uuid-2", "is_featured": false }
  ]
}

// Bulk delete
DELETE /api/admin/bulk
{
  "table": "services",
  "ids": ["uuid-1", "uuid-2"]
}

// Bulk reorder (drag & drop)
PATCH /api/admin/bulk
{
  "table": "services",
  "order": ["uuid-3", "uuid-1", "uuid-2"]
}
```

---

## 📤 **File Upload**

```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('type', 'image');
formData.append('folder', 'uploads');
formData.append('altText', 'Description');

const response = await fetch('/api/upload', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData,
});

const { data } = await response.json();
// data.url = uploaded file URL
```

---

## 🧪 **Test Commands**

```bash
# Test pagination
curl "http://localhost:3000/api/services?page=1&limit=5"

# Test search
curl "http://localhost:3000/api/services?search=blockchain"

# Test sorting
curl "http://localhost:3000/api/services?sortBy=views&sortOrder=desc"

# Test filtering
curl "http://localhost:3000/api/services?is_featured=true"

# Test combined
curl "http://localhost:3000/api/services?search=web&is_featured=true&page=1&limit=10"

# Test global search
curl "http://localhost:3000/api/search?q=blockchain&limit=20"

# Test analytics (admin)
curl "http://localhost:3000/api/admin/analytics?type=dashboard" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test bulk delete (admin)
curl -X DELETE http://localhost:3000/api/admin/bulk \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"table":"faqs","ids":["uuid1","uuid2"]}'
```

---

## 📚 **Full Documentation**

- **`/PHASE_4_COMPLETE.md`** - Complete Phase 4 docs (700+ lines)
- **`/PHASE_4_QUICK_REFERENCE.md`** - Quick reference
- **`/ENDPOINTS_UPGRADED.md`** - Upgrade details
- **`/FRONTEND_INTEGRATION_GUIDE.md`** - Frontend examples

---

## ✅ **What Works Out of the Box**

| Feature | All List Endpoints | All Detail Endpoints |
|---------|-------------------|---------------------|
| Pagination | ✅ | N/A |
| Sorting | ✅ | N/A |
| Search | ✅ | N/A |
| Filtering | ✅ | N/A |
| View Tracking | N/A | ✅ |

---

## 🎯 **Common Use Cases**

### **1. Blog with Pagination**
```
GET /api/blog?page=1&limit=10
```

### **2. Featured Services**
```
GET /api/services?is_featured=true&sortBy=projects_completed&sortOrder=desc
```

### **3. Search Everything**
```
GET /api/search?q=blockchain&limit=20
```

### **4. 5-Star Testimonials**
```
GET /api/testimonials?rating=5&sortBy=display_order
```

### **5. Remote Jobs**
```
GET /api/careers?remote=true&department=Engineering
```

### **6. Team by Office**
```
GET /api/team?office=Lahore&leadership=true
```

---

## 🚨 **Important Notes**

1. **Backward Compatible** - All old queries still work
2. **Optional Parameters** - New features are opt-in
3. **Defaults** - Sensible defaults maintain old behavior
4. **Max Limits** - Page limit capped at 100 items
5. **Search Minimum** - Search requires 2+ characters
6. **Admin Only** - Analytics, bulk ops, upload require auth

---

## 🔜 **Next Steps**

1. Test the new features with curl commands above
2. Update frontend to use pagination
3. Add search functionality
4. Implement filters and sorting UI
5. Build admin dashboard with analytics
6. Add file upload interface

---

**Phase 4 is live! Start using advanced features now!** 🚀

See full docs in `/PHASE_4_COMPLETE.md` for detailed examples and best practices.
