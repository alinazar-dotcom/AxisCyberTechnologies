# 📡 API Documentation - Axis Cyber Technologies

## 🎯 **Phase 1, 2 & 3 COMPLETE: Full API Infrastructure + Notifications**

---

## 📋 **Table of Contents**

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Phase 1 API Routes](#phase-1-api-routes)
5. [Phase 2 API Routes](#phase-2-api-routes)
6. [Phase 3 Webhooks & Notifications](#phase-3-webhooks--notifications)
7. [Response Format](#response-format)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)

---

## 🌐 **Overview**

The Axis Cyber Technologies API provides RESTful endpoints for:
- Contact form submissions
- Newsletter subscriptions
- Consultation requests
- Admin authentication
- Analytics tracking
- **Blog posts & content**
- **Services catalog (all 12 services)**
- **Case studies & projects**
- **Testimonials & reviews**
- **Team members**
- **Career listings & applications**
- **FAQs**
- **Office locations**
- **🆕 Email notifications**
- **🆕 Webhook integrations (Slack, Discord, Custom)**

All API routes follow Next.js 14 App Router conventions and return standardized JSON responses.

---

## 🔗 **Base URL**

```
Development: http://localhost:3000/api
Production:  https://axiscyber.tech/api
```

---

## 🔐 **Authentication**

### **Public Endpoints** (No Auth Required)
- POST `/api/contact`
- POST `/api/newsletter`
- POST `/api/consultation`

### **Protected Endpoints** (Requires Auth)
- All `/api/admin/*` routes
- Admin dashboard `/admin`

### **Authentication Method**
- Supabase Auth with email/password
- Session-based authentication
- HTTP-only cookies

---

## 📡 **Phase 1 API Routes**

### **1. Contact Form**

#### **POST** `/api/contact`

Submit a contact form inquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",  // optional
  "phone": "+1 555 0000",  // optional
  "message": "I'm interested in AI solutions",
  "services": ["ai-ml", "web-dev"]  // required array
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `company`: Optional, max 100 characters
- `phone`: Optional, max 20 characters
- `message`: Required, 10-2000 characters
- `services`: Required, must be array with at least 1 item

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "message": "Contact form submitted successfully"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (422):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "fields": {
        "email": "Invalid email format",
        "message": "Message is required"
      }
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Example cURL:**
```bash
curl -X POST https://axiscyber.tech/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in your services",
    "services": ["ai-ml", "cloud-devops"]
  }'
```

---

### **2. Newsletter Subscription**

#### **POST** `/api/newsletter`

Subscribe to the newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "source": "homepage_footer"  // optional
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `source`: Optional, string

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "message": "Successfully subscribed to newsletter!"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "subscribedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Duplicate Email (409):**
```json
{
  "success": false,
  "error": {
    "message": "This email is already subscribed",
    "code": "DUPLICATE_EMAIL"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Reactivation Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Successfully reactivated your subscription!",
    "id": "uuid-here"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **3. Consultation Request**

#### **POST** `/api/consultation`

Submit a consultation booking request.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Startup Inc",  // optional
  "phone": "+1 555 0000",  // optional
  "project_type": "Web Application",
  "budget_range": "$50,000 - $100,000",  // optional
  "timeline": "2-3 Months",  // optional
  "message": "Need help with scaling our platform"  // optional
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `company`: Optional, max 100 characters
- `phone`: Optional, max 20 characters
- `project_type`: Required, string
- `budget_range`: Optional, string
- `timeline`: Optional, string
- `message`: Optional, max 2000 characters

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "message": "Consultation request submitted successfully. We will contact you within 24 hours."
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### **4. Authentication**

#### **POST** `/api/auth/login`

Admin login endpoint.

**Request Body:**
```json
{
  "email": "admin@axiscyber.tech",
  "password": "your-secure-password"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "admin@axiscyber.tech"
    },
    "message": "Login successful"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Invalid Credentials (401):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid email or password",
    "code": "INVALID_CREDENTIALS"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

#### **POST** `/api/auth/logout`

Admin logout endpoint.

**Request:** No body required

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Logout successful"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

#### **GET** `/api/auth/session`

Get current session information.

**Request:** No body required

**Authenticated Response (200):**
```json
{
  "success": true,
  "data": {
    "authenticated": true,
    "user": {
      "id": "uuid-here",
      "email": "admin@axiscyber.tech"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Unauthenticated Response (200):**
```json
{
  "success": true,
  "data": {
    "authenticated": false,
    "user": null
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📡 **Phase 2 API Routes**

### **1. Blog Posts**

#### **GET** `/api/blog`

Fetch blog posts with pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Number of posts per page (default: 10)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid-here",
        "title": "Introduction to AI",
        "content": "AI is transforming industries...",
        "author": "John Doe",
        "published_at": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **2. Services Catalog**

#### **GET** `/api/services`

Fetch all 12 services.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "uuid-here",
        "name": "AI & Machine Learning",
        "description": "Advanced AI solutions for your business..."
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **3. Case Studies**

#### **GET** `/api/case-studies`

Fetch project showcases.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "case_studies": [
      {
        "id": "uuid-here",
        "title": "E-commerce Platform",
        "description": "A scalable e-commerce solution...",
        "client": "Tech Corp",
        "completed_at": "2024-01-15T10:30:00Z"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **4. Testimonials**

#### **GET** `/api/testimonials`

Fetch client reviews.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "testimonials": [
      {
        "id": "uuid-here",
        "review": "Axis Cyber Technologies exceeded our expectations...",
        "client": "Jane Smith",
        "company": "Startup Inc",
        "rating": 5
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **5. Team Members**

#### **GET** `/api/team`

Fetch team members.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "team": [
      {
        "id": "uuid-here",
        "name": "John Doe",
        "position": "CEO",
        "bio": "Experienced leader in technology..."
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **6. Career Listings**

#### **GET** `/api/careers`

Fetch job listings.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "careers": [
      {
        "id": "uuid-here",
        "title": "Software Engineer",
        "description": "Develop and maintain software applications...",
        "location": "Remote",
        "posted_at": "2024-01-15T10:30:00Z"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **7. FAQs**

#### **GET** `/api/faqs`

Fetch frequently asked questions.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "faqs": [
      {
        "id": "uuid-here",
        "question": "What services do you offer?",
        "answer": "We offer a wide range of technology solutions..."
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **8. Office Locations**

#### **GET** `/api/locations`

Fetch office locations.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "locations": [
      {
        "id": "uuid-here",
        "name": "Main Office",
        "address": "123 Tech Street, City, Country",
        "phone": "+1 555 0000",
        "email": "info@axiscyber.tech"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📡 **Phase 3 Webhooks & Notifications**

### **1. Email Notifications**

#### **POST** `/api/notifications/email`

Send an email notification.

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "New Contact Form Submission",
  "body": "A new contact form submission has been received."
}
```

**Validation Rules:**
- `to`: Required, valid email format
- `subject`: Required, string
- `body`: Required, string

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Email sent successfully"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

### **2. Webhook Integrations**

#### **POST** `/api/notifications/webhook`

Send a webhook notification.

**Request Body:**
```json
{
  "url": "https://example.com/webhook",
  "payload": {
    "event": "contact_form_submission",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Interested in AI solutions"
    }
  }
}
```

**Validation Rules:**
- `url`: Required, valid URL
- `payload`: Required, object

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Webhook sent successfully"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📤 **Response Format**

All API responses follow a standardized format:

### **Success Response:**
```typescript
{
  success: true,
  data: any,  // The actual response data
  meta?: {
    timestamp: string,  // ISO 8601 format
    ...additionalMeta
  }
}
```

### **Error Response:**
```typescript
{
  success: false,
  error: {
    message: string,  // Human-readable error message
    code?: string,    // Machine-readable error code
    details?: any     // Additional error details
  },
  meta: {
    timestamp: string
  }
}
```

---

## ⚠️ **Error Codes**

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `INVALID_CREDENTIALS` | 401 | Invalid login credentials |
| `UNAUTHORIZED` | 401 | Authentication required |
| `DUPLICATE_EMAIL` | 409 | Email already exists |
| `NOT_FOUND` | 404 | Resource not found |
| `DATABASE_ERROR` | 500 | Database operation failed |
| `SERVER_ERROR` | 500 | Internal server error |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |

---

## 🔥 **Error Handling**

### **Common Error Responses:**

**Validation Error (422):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "fields": {
        "email": "Invalid email format"
      }
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Unauthorized (401):**
```json
{
  "success": false,
  "error": {
    "message": "Unauthorized access",
    "code": "UNAUTHORIZED"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": {
    "message": "Internal server error",
    "code": "SERVER_ERROR"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🚦 **Rate Limiting**

**Status:** Planned for Phase 8

Rate limiting will be implemented in Phase 8 with the following limits:
- **Public endpoints:** 100 requests per 15 minutes per IP
- **Authenticated endpoints:** 1000 requests per 15 minutes per user
- **Newsletter:** 10 requests per hour per IP (to prevent spam)

**Rate Limit Response (429):**
```json
{
  "success": false,
  "error": {
    "message": "Too many requests",
    "code": "RATE_LIMIT_EXCEEDED",
    "details": {
      "retryAfter": 900  // seconds
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🧪 **Testing Examples**

### **JavaScript / Fetch:**
```javascript
// Contact Form Submission
const submitContact = async () => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Interested in AI solutions',
        services: ['ai-ml', 'web-dev']
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Success:', data.data.message);
    } else {
      console.error('Error:', data.error.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

### **Axios:**
```javascript
import axios from 'axios';

// Newsletter Subscription
const subscribe = async (email) => {
  try {
    const { data } = await axios.post('/api/newsletter', { email });
    console.log(data.data.message);
  } catch (error) {
    console.error(error.response.data.error.message);
  }
};
```

---

## 📊 **API Status**

| Endpoint | Method | Status | Auth Required |
|----------|--------|--------|---------------|
| `/api/contact` | POST | ✅ Live | No |
| `/api/newsletter` | POST | ✅ Live | No |
| `/api/consultation` | POST | ✅ Live | No |
| `/api/auth/login` | POST | ✅ Live | No |
| `/api/auth/logout` | POST | ✅ Live | Yes |
| `/api/auth/session` | GET | ✅ Live | No |
| `/api/blog` | GET | ✅ Live | No |
| `/api/services` | GET | ✅ Live | No |
| `/api/case-studies` | GET | ✅ Live | No |
| `/api/testimonials` | GET | ✅ Live | No |
| `/api/team` | GET | ✅ Live | No |
| `/api/careers` | GET | ✅ Live | No |
| `/api/faqs` | GET | ✅ Live | No |
| `/api/locations` | GET | ✅ Live | No |
| `/api/notifications/email` | POST | ✅ Live | No |
| `/api/notifications/webhook` | POST | ✅ Live | No |

---

## 🔜 **Coming in Future Phases**

### **Phase 3-4: Content Management APIs**
- `PATCH /api/admin/contacts/:id` - Update contact status
- `DELETE /api/admin/contacts/:id` - Delete contact
- `POST /api/admin/blog` - Create blog post
- `PATCH /api/admin/blog/:id` - Update blog post
- `DELETE /api/admin/blog/:id` - Delete blog post

### **Phase 5: Admin CRUD APIs**
- `POST /api/admin/project-inquiry` - Project requests
- `PATCH /api/admin/case-studies/:id` - Update case study
- `DELETE /api/admin/case-studies/:id` - Delete case study
- `POST /api/admin/testimonials` - Add testimonial
- `PATCH /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial
- `POST /api/admin/team` - Add team member
- `PATCH /api/admin/team/:id` - Update team member
- `DELETE /api/admin/team/:id` - Delete team member
- `POST /api/admin/careers` - Add job listing
- `PATCH /api/admin/careers/:id` - Update job listing
- `DELETE /api/admin/careers/:id` - Delete job listing
- `POST /api/admin/faqs` - Add FAQ
- `PATCH /api/admin/faqs/:id` - Update FAQ
- `DELETE /api/admin/faqs/:id` - Delete FAQ
- `POST /api/admin/locations` - Add office location
- `PATCH /api/admin/locations/:id` - Update office location
- `DELETE /api/admin/locations/:id` - Delete office location

---

## 📚 **Additional Resources**

- **Supabase Setup:** See `SUPABASE_SETUP.md`
- **Backend Summary:** See `BACKEND_SUMMARY.md`
- **Quick Reference:** See `QUICK_REFERENCE.md`

---

## 📞 **Support**

For API-related questions:
- Check response error codes and messages
- Review browser console (F12) for detailed errors
- Verify request payload matches validation rules
- Ensure proper Content-Type headers

---

**Last Updated:** Phase 3 Complete  
**Version:** 1.0  
**Status:** ✅ PRODUCTION READY

**Next:** Phase 4 - Advanced Analytics