// ============================================
// API UTILITIES - PHASE 4
// ============================================
// Advanced query features: pagination, filtering, sorting, search
// ============================================

import { NextRequest } from 'next/server';

// ============================================
// TYPES
// ============================================

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface SortParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
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

export interface FilterParams {
  [key: string]: string | string[] | number | boolean | null;
}

export interface SearchParams {
  query: string;
  fields: string[];
}

// ============================================
// PAGINATION
// ============================================

/**
 * Extract pagination parameters from request
 */
export function getPaginationParams(request: NextRequest): PaginationParams {
  const searchParams = request.nextUrl.searchParams;
  
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * Create paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}

// ============================================
// SORTING
// ============================================

/**
 * Extract sort parameters from request
 */
export function getSortParams(
  request: NextRequest,
  allowedFields: string[] = [],
  defaultField: string = 'created_at'
): SortParams {
  const searchParams = request.nextUrl.searchParams;
  
  const sortBy = searchParams.get('sortBy') || defaultField;
  const sortOrder = (searchParams.get('sortOrder') || 'desc').toLowerCase() as 'asc' | 'desc';

  // Validate sort field
  const validSortBy = allowedFields.length > 0 && !allowedFields.includes(sortBy)
    ? defaultField
    : sortBy;

  return {
    sortBy: validSortBy,
    sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc',
  };
}

/**
 * Build Supabase sort query
 */
export function applySorting(
  query: any,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
) {
  return query.order(sortBy, { ascending: sortOrder === 'asc' });
}

// ============================================
// FILTERING
// ============================================

/**
 * Extract filter parameters from request
 */
export function getFilterParams(
  request: NextRequest,
  allowedFilters: string[] = []
): FilterParams {
  const searchParams = request.nextUrl.searchParams;
  const filters: FilterParams = {};

  allowedFilters.forEach(filter => {
    const value = searchParams.get(filter);
    if (value !== null) {
      // Handle boolean values
      if (value === 'true') {
        filters[filter] = true;
      } else if (value === 'false') {
        filters[filter] = false;
      } else if (!isNaN(Number(value))) {
        // Handle numeric values
        filters[filter] = Number(value);
      } else {
        filters[filter] = value;
      }
    }
  });

  return filters;
}

/**
 * Apply filters to Supabase query
 */
export function applyFilters(query: any, filters: FilterParams) {
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (typeof value === 'boolean') {
        query = query.eq(key, value);
      } else if (typeof value === 'number') {
        query = query.eq(key, value);
      } else if (typeof value === 'string') {
        // Check if it's a comma-separated list (for IN queries)
        if (value.includes(',')) {
          const values = value.split(',').map(v => v.trim());
          query = query.in(key, values);
        } else {
          query = query.eq(key, value);
        }
      }
    }
  });

  return query;
}

// ============================================
// SEARCH
// ============================================

/**
 * Extract search parameters from request
 */
export function getSearchParams(request: NextRequest): string | null {
  const searchParams = request.nextUrl.searchParams;
  return searchParams.get('search') || searchParams.get('q') || null;
}

/**
 * Apply full-text search to Supabase query
 */
export function applySearch(
  query: any,
  searchQuery: string,
  searchFields: string[]
) {
  if (!searchQuery || searchFields.length === 0) {
    return query;
  }

  // Build OR conditions for multiple fields
  const searchConditions = searchFields
    .map(field => `${field}.ilike.%${searchQuery}%`)
    .join(',');

  return query.or(searchConditions);
}

// ============================================
// DATE RANGE FILTERING
// ============================================

export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

/**
 * Extract date range parameters from request
 */
export function getDateRangeParams(request: NextRequest): DateRangeParams {
  const searchParams = request.nextUrl.searchParams;
  
  return {
    startDate: searchParams.get('startDate') || undefined,
    endDate: searchParams.get('endDate') || undefined,
  };
}

/**
 * Apply date range filter to Supabase query
 */
export function applyDateRange(
  query: any,
  dateField: string,
  startDate?: string,
  endDate?: string
) {
  if (startDate) {
    query = query.gte(dateField, startDate);
  }
  if (endDate) {
    query = query.lte(dateField, endDate);
  }
  return query;
}

// ============================================
// ARRAY FILTERING
// ============================================

/**
 * Apply array contains filter (for JSONB/array columns)
 */
export function applyArrayContains(
  query: any,
  field: string,
  value: string | string[]
) {
  const values = Array.isArray(value) ? value : [value];
  return query.contains(field, values);
}

/**
 * Apply array overlap filter (for JSONB/array columns)
 */
export function applyArrayOverlap(
  query: any,
  field: string,
  values: string[]
) {
  return query.overlaps(field, values);
}

// ============================================
// COMBINED QUERY BUILDER
// ============================================

export interface QueryOptions {
  pagination?: boolean;
  sorting?: boolean;
  filtering?: boolean;
  search?: boolean;
  allowedSortFields?: string[];
  allowedFilterFields?: string[];
  searchFields?: string[];
  defaultSortField?: string;
}

/**
 * Build complete query with all features
 */
export async function buildAdvancedQuery(
  request: NextRequest,
  baseQuery: any,
  options: QueryOptions = {}
) {
  const {
    pagination = true,
    sorting = true,
    filtering = true,
    search = true,
    allowedSortFields = [],
    allowedFilterFields = [],
    searchFields = [],
    defaultSortField = 'created_at',
  } = options;

  let query = baseQuery;

  // Apply search
  if (search && searchFields.length > 0) {
    const searchQuery = getSearchParams(request);
    if (searchQuery) {
      query = applySearch(query, searchQuery, searchFields);
    }
  }

  // Apply filtering
  if (filtering && allowedFilterFields.length > 0) {
    const filters = getFilterParams(request, allowedFilterFields);
    query = applyFilters(query, filters);
  }

  // Apply sorting
  if (sorting) {
    const { sortBy, sortOrder } = getSortParams(request, allowedSortFields, defaultSortField);
    query = applySorting(query, sortBy, sortOrder);
  }

  // Apply pagination
  if (pagination) {
    const { limit, offset } = getPaginationParams(request);
    query = query.range(offset, offset + limit - 1);
  }

  return query;
}

// ============================================
// RESPONSE BUILDERS
// ============================================

/**
 * Success response
 */
export function successResponse(data: any, message?: string) {
  return Response.json({
    success: true,
    data,
    ...(message && { message }),
  });
}

/**
 * Error response
 */
export function errorResponse(
  message: string,
  statusCode: number = 400,
  errors?: any
) {
  return Response.json(
    {
      success: false,
      error: message,
      ...(errors && { errors }),
    },
    { status: statusCode }
  );
}

/**
 * Paginated success response
 */
export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return Response.json(createPaginatedResponse(data, total, page, limit));
}

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Validate required fields
 */
export function validateRequiredFields(
  data: any,
  requiredFields: string[]
): { valid: boolean; missing: string[] } {
  const missing = requiredFields.filter(field => !data[field]);
  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================
// SANITIZATION
// ============================================

/**
 * Sanitize string input
 */
export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '');
}

/**
 * Sanitize object (remove undefined/null values)
 */
export function sanitizeObject(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null)
  );
}

// ============================================
// SLUG GENERATION
// ============================================

/**
 * Generate URL-friendly slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate unique slug with timestamp
 */
export function generateUniqueSlug(text: string): string {
  const baseSlug = generateSlug(text);
  const timestamp = Date.now();
  return `${baseSlug}-${timestamp}`;
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  // Pagination
  getPaginationParams,
  createPaginatedResponse,
  
  // Sorting
  getSortParams,
  applySorting,
  
  // Filtering
  getFilterParams,
  applyFilters,
  
  // Search
  getSearchParams,
  applySearch,
  
  // Date Range
  getDateRangeParams,
  applyDateRange,
  
  // Arrays
  applyArrayContains,
  applyArrayOverlap,
  
  // Combined
  buildAdvancedQuery,
  
  // Responses
  successResponse,
  errorResponse,
  paginatedResponse,
  
  // Validation
  validateRequiredFields,
  isValidUUID,
  isValidEmail,
  isValidURL,
  
  // Sanitization
  sanitizeString,
  sanitizeObject,
  
  // Slugs
  generateSlug,
  generateUniqueSlug,
};
