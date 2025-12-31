/**
 * Standardized API Response Utilities
 * Axis Cyber Technologies - Backend Infrastructure
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, meta?: any): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
}

/**
 * Error response helper
 */
export function errorResponse(
  message: string,
  code?: string,
  details?: any,
  statusCode: number = 400
): { response: ApiResponse; status: number } {
  return {
    response: {
      success: false,
      error: {
        message,
        code,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    status: statusCode,
  };
}

/**
 * Validation error response
 */
export function validationError(fields: Record<string, string>) {
  return errorResponse(
    'Validation failed',
    'VALIDATION_ERROR',
    { fields },
    422
  );
}

/**
 * Unauthorized error response
 */
export function unauthorizedError(message: string = 'Unauthorized access') {
  return errorResponse(message, 'UNAUTHORIZED', null, 401);
}

/**
 * Not found error response
 */
export function notFoundError(resource: string = 'Resource') {
  return errorResponse(`${resource} not found`, 'NOT_FOUND', null, 404);
}

/**
 * Server error response
 */
export function serverError(message: string = 'Internal server error') {
  return errorResponse(message, 'SERVER_ERROR', null, 500);
}

/**
 * Rate limit error response
 */
export function rateLimitError(retryAfter?: number) {
  return errorResponse(
    'Too many requests',
    'RATE_LIMIT_EXCEEDED',
    { retryAfter },
    429
  );
}
