/**
 * API Request Validation Utilities
 * Axis Cyber Technologies - Backend Infrastructure
 */

export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'email' | 'number' | 'boolean' | 'array' | 'object';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single field
 */
function validateField(
  value: any,
  fieldName: string,
  rule: ValidationRule
): string | null {
  // Required check
  if (rule.required && (value === undefined || value === null || value === '')) {
    return `${fieldName} is required`;
  }

  // Skip other validations if field is not required and empty
  if (!rule.required && (value === undefined || value === null || value === '')) {
    return null;
  }

  // Type validation
  if (rule.type) {
    switch (rule.type) {
      case 'string':
        if (typeof value !== 'string') {
          return `${fieldName} must be a string`;
        }
        break;
      case 'email':
        if (typeof value !== 'string' || !EMAIL_REGEX.test(value)) {
          return `${fieldName} must be a valid email`;
        }
        break;
      case 'number':
        if (typeof value !== 'number' && isNaN(Number(value))) {
          return `${fieldName} must be a number`;
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          return `${fieldName} must be a boolean`;
        }
        break;
      case 'array':
        if (!Array.isArray(value)) {
          return `${fieldName} must be an array`;
        }
        break;
      case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) {
          return `${fieldName} must be an object`;
        }
        break;
    }
  }

  // String length validation
  if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
    return `${fieldName} must be at least ${rule.minLength} characters`;
  }

  if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
    return `${fieldName} must be at most ${rule.maxLength} characters`;
  }

  // Number range validation
  if (rule.min !== undefined && Number(value) < rule.min) {
    return `${fieldName} must be at least ${rule.min}`;
  }

  if (rule.max !== undefined && Number(value) > rule.max) {
    return `${fieldName} must be at most ${rule.max}`;
  }

  // Pattern validation
  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }

  // Custom validation
  if (rule.custom) {
    const customResult = rule.custom(value);
    if (typeof customResult === 'string') {
      return customResult;
    }
    if (customResult === false) {
      return `${fieldName} validation failed`;
    }
  }

  return null;
}

/**
 * Validate data against schema
 */
export function validate(
  data: Record<string, any>,
  schema: ValidationSchema
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [fieldName, rule] of Object.entries(schema)) {
    const error = validateField(data[fieldName], fieldName, rule);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Common validation schemas
 */
export const commonSchemas = {
  email: {
    email: { required: true, type: 'email' as const },
  },
  
  contact: {
    name: { required: true, type: 'string' as const, minLength: 2, maxLength: 100 },
    email: { required: true, type: 'email' as const },
    company: { required: false, type: 'string' as const, maxLength: 100 },
    phone: { required: false, type: 'string' as const, maxLength: 20 },
    message: { required: true, type: 'string' as const, minLength: 10, maxLength: 2000 },
    services: { required: true, type: 'array' as const },
  },

  newsletter: {
    email: { required: true, type: 'email' as const },
    source: { required: false, type: 'string' as const },
  },

  consultation: {
    name: { required: true, type: 'string' as const, minLength: 2, maxLength: 100 },
    email: { required: true, type: 'email' as const },
    company: { required: false, type: 'string' as const, maxLength: 100 },
    phone: { required: false, type: 'string' as const, maxLength: 20 },
    project_type: { required: true, type: 'string' as const },
    budget_range: { required: false, type: 'string' as const },
    timeline: { required: false, type: 'string' as const },
    message: { required: false, type: 'string' as const, maxLength: 2000 },
  },

  login: {
    email: { required: true, type: 'email' as const },
    password: { required: true, type: 'string' as const, minLength: 6 },
  },
};
