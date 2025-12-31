# 🎨 **FRONTEND INTEGRATION GUIDE - PHASE 4**

Complete guide for integrating the upgraded API endpoints with Phase 4 features into your frontend.

---

## 🚀 **QUICK START**

### **Before (Old Way):**
```typescript
const response = await fetch('/api/services');
const data = await response.json();
const services = data.data.services; // Manual extraction
```

### **After (New Way):**
```typescript
const response = await fetch('/api/services?page=1&limit=12');
const data = await response.json();
const services = data.data; // Direct array
const pagination = data.pagination; // Pagination metadata
```

---

## 📦 **RESPONSE STRUCTURE**

### **All List Endpoints Now Return:**
```typescript
interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
    hasPrevious: boolean;
  };
}
```

### **Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "AI & Machine Learning",
      "slug": "ai-ml",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "totalPages": 5,
    "hasMore": true,
    "hasPrevious": false
  }
}
```

---

## 🎯 **REACT COMPONENTS**

### **1. Services List with Pagination**

```typescript
import { useState, useEffect } from 'react';

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  // ... other fields
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  hasPrevious: boolean;
}

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchServices = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services?page=${page}&limit=12`);
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (pagination?.hasPrevious) {
      setCurrentPage(p => p - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.hasMore) {
      setCurrentPage(p => p + 1);
    }
  };

  return (
    <div>
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={!pagination.hasPrevious || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="text-gray-700">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <button
            onClick={handleNext}
            disabled={!pagination.hasMore || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Results Count */}
      {pagination && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Showing {services.length} of {pagination.total} services
        </p>
      )}
    </div>
  );
}
```

---

### **2. Blog with Search & Filters**

```typescript
import { useState, useEffect } from 'react';

export function BlogList() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('published_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    params.append('page', page.toString());
    params.append('limit', '10');
    params.append('sortBy', sortBy);
    params.append('sortOrder', sortOrder);
    
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    return params.toString();
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/blog?${buildQueryString()}`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search, category, sortBy, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchPosts();
  };

  return (
    <div>
      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="flex-1 px-4 py-2 border rounded"
          />
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="design">Design</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
            className="px-4 py-2 border rounded"
          >
            <option value="published_at">Date</option>
            <option value="title">Title</option>
            <option value="views">Views</option>
            <option value="reading_time">Reading Time</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => { setSortOrder(e.target.value as 'asc' | 'desc'); setPage(1); }}
            className="px-4 py-2 border rounded"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="space-y-6">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            First
          </button>
          
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={!pagination.hasPrevious}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter(p => Math.abs(p - page) <= 2 || p === 1 || p === pagination.totalPages)
            .map((p, idx, arr) => (
              <React.Fragment key={p}>
                {idx > 0 && arr[idx - 1] !== p - 1 && <span>...</span>}
                <button
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border rounded ${
                    p === page ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}

          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!pagination.hasMore}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
          
          <button
            onClick={() => setPage(pagination.totalPages)}
            disabled={page === pagination.totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
```

---

### **3. Testimonials with Rating Filter**

```typescript
export function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [rating, setRating] = useState<number | null>(null);
  const [featured, setFeatured] = useState(false);

  const fetchTestimonials = async () => {
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '20');
    params.append('sortBy', 'rating');
    params.append('sortOrder', 'desc');
    
    if (rating) params.append('rating', rating.toString());
    if (featured) params.append('is_featured', 'true');

    const response = await fetch(`/api/testimonials?${params.toString()}`);
    const data = await response.json();
    
    if (data.success) {
      setTestimonials(data.data);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [rating, featured]);

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={rating || ''}
          onChange={(e) => setRating(e.target.value ? parseInt(e.target.value) : null)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured Only
        </label>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
```

---

### **4. Global Search Component**

```typescript
import { useState, useEffect } from 'react';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(query);
      getSuggestions(query);
    }, 300); // Wait 300ms after typing stops

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=20`
      );
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data.results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async (searchQuery: string) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      
      if (data.success) {
        setSuggestions(data.data.suggestions);
      }
    } catch (error) {
      console.error('Suggestions failed:', error);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search services, blog posts, case studies..."
        className="w-full px-4 py-2 border rounded"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded shadow-lg mt-1 z-10">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Search Results */}
      {query.length >= 2 && (
        <div className="mt-4">
          {loading ? (
            <p>Searching...</p>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Found {results.length} results for "{query}"
              </p>
              
              {results.map((result: any) => (
                <a
                  key={result.id}
                  href={result.url}
                  className="block p-4 border rounded hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {result.type}
                    </span>
                    <h3 className="font-semibold">{result.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 🔥 **CUSTOM HOOKS**

### **useAPI Hook (Reusable)**

```typescript
import { useState, useEffect } from 'react';

interface UseAPIOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export function useAPI<T>(endpoint: string, options: UseAPIOptions = {}) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    page = 1,
    limit = 10,
    search = '',
    sortBy = '',
    sortOrder = 'desc',
    filters = {},
  } = options;

  const buildURL = () => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (search) params.append('search', search);
    if (sortBy) {
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, value.toString());
      }
    });

    return `${endpoint}?${params.toString()}`;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(buildURL());
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setPagination(result.pagination);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, search, sortBy, sortOrder, JSON.stringify(filters)]);

  return {
    data,
    pagination,
    loading,
    error,
    refetch: fetchData,
  };
}

// Usage:
function ServicesList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const { data: services, pagination, loading } = useAPI<Service>('/api/services', {
    page,
    limit: 12,
    search,
    sortBy: 'display_order',
    filters: { is_featured: true },
  });

  // ... render UI
}
```

---

## 🎨 **TAILWIND COMPONENTS**

### **Pagination Component**

```typescript
interface PaginationProps {
  pagination: {
    page: number;
    totalPages: number;
    hasMore: boolean;
    hasPrevious: boolean;
  };
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={!pagination.hasPrevious}
        className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>

      <span className="px-4 py-2">
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <button
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={!pagination.hasMore}
        className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
}
```

---

## 📚 **API ENDPOINTS REFERENCE**

### **Services:**
```
GET /api/services?page=1&limit=12&search=web&sortBy=views&sortOrder=desc&is_featured=true
GET /api/services/[slug] (auto-tracks views)
```

### **Blog:**
```
GET /api/blog?page=1&limit=10&search=AI&category=technology&sortBy=published_at&sortOrder=desc
GET /api/blog/[slug] (auto-tracks views)
```

### **Case Studies:**
```
GET /api/case-studies?page=1&limit=12&search=fintech&industry=Finance&sortBy=completion_date
GET /api/case-studies/[slug] (auto-tracks views)
```

### **FAQs:**
```
GET /api/faqs?page=1&limit=50&search=pricing&category=General&sortBy=helpful_count
```

### **Careers:**
```
GET /api/careers?page=1&search=developer&department=Engineering&location=Lahore&remote=true
```

### **Testimonials:**
```
GET /api/testimonials?page=1&rating=5&is_featured=true&sortBy=rating&sortOrder=desc
```

### **Team:**
```
GET /api/team?page=1&search=john&office=Lahore&leadership=true&department=Engineering
```

### **Search:**
```
GET /api/search?q=blockchain&type=service&limit=20
POST /api/search (body: { query: "block" }) - Get suggestions
```

---

## ✅ **BEST PRACTICES**

1. **Always handle pagination** - Don't assume all data fits on one page
2. **Debounce search inputs** - Wait 300ms after typing stops
3. **Show loading states** - Users need feedback
4. **Handle errors gracefully** - Network issues happen
5. **Use query params in URL** - Enable sharing and bookmarking
6. **Prefetch next page** - For smooth UX
7. **Cache responses** - Use React Query or SWR
8. **Reset to page 1** - When filters/search change

---

## 🚀 **PRODUCTION TIPS**

```typescript
// Use React Query for better caching
import { useQuery } from '@tanstack/react-query';

function useServices(page: number) {
  return useQuery({
    queryKey: ['services', page],
    queryFn: async () => {
      const res = await fetch(`/api/services?page=${page}&limit=12`);
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    keepPreviousData: true, // Smooth pagination
  });
}
```

**Your frontend is now ready to leverage all Phase 4 features!** 🎉
