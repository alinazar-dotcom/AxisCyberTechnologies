// ============================================
// ADMIN BULK OPERATIONS API - PHASE 4
// ============================================
// Bulk create, update, delete operations
// ============================================

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateAuth } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// BULK CREATE
// ============================================

export async function POST(request: NextRequest) {
  try {
    // Validate admin authentication
    const authResult = await validateAuth(request);
    if (!authResult.valid || authResult.user?.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { table, records } = body;

    if (!table || !records || !Array.isArray(records)) {
      return errorResponse('Table name and records array are required');
    }

    if (records.length === 0) {
      return errorResponse('Records array cannot be empty');
    }

    if (records.length > 100) {
      return errorResponse('Maximum 100 records per bulk operation');
    }

    // Validate table name (whitelist)
    const allowedTables = [
      'services',
      'testimonials',
      'case_studies',
      'team_members',
      'blog_posts',
      'blog_categories',
      'blog_tags',
      'faqs',
      'career_listings',
    ];

    if (!allowedTables.includes(table)) {
      return errorResponse('Invalid table name');
    }

    // Perform bulk insert
    const { data, error } = await supabase
      .from(table)
      .insert(records)
      .select();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse({
      created: data.length,
      records: data,
    }, `Successfully created ${data.length} ${table} records`);

  } catch (error: any) {
    console.error('Bulk create error:', error);
    return errorResponse(error.message || 'Failed to create records', 500);
  }
}

// ============================================
// BULK UPDATE
// ============================================

export async function PUT(request: NextRequest) {
  try {
    // Validate admin authentication
    const authResult = await validateAuth(request);
    if (!authResult.valid || authResult.user?.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { table, updates } = body;

    if (!table || !updates || !Array.isArray(updates)) {
      return errorResponse('Table name and updates array are required');
    }

    if (updates.length === 0) {
      return errorResponse('Updates array cannot be empty');
    }

    if (updates.length > 100) {
      return errorResponse('Maximum 100 records per bulk operation');
    }

    // Validate table name (whitelist)
    const allowedTables = [
      'services',
      'testimonials',
      'case_studies',
      'team_members',
      'blog_posts',
      'blog_categories',
      'blog_tags',
      'faqs',
      'career_listings',
    ];

    if (!allowedTables.includes(table)) {
      return errorResponse('Invalid table name');
    }

    // Perform bulk update (one by one for now, could be optimized)
    const results = [];
    const errors = [];

    for (const update of updates) {
      const { id, ...data } = update;

      if (!id) {
        errors.push({ error: 'Missing ID for update', data: update });
        continue;
      }

      const { data: updatedData, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        errors.push({ id, error: error.message });
      } else {
        results.push(updatedData);
      }
    }

    return successResponse({
      updated: results.length,
      failed: errors.length,
      records: results,
      errors: errors.length > 0 ? errors : undefined,
    }, `Successfully updated ${results.length} ${table} records`);

  } catch (error: any) {
    console.error('Bulk update error:', error);
    return errorResponse(error.message || 'Failed to update records', 500);
  }
}

// ============================================
// BULK DELETE
// ============================================

export async function DELETE(request: NextRequest) {
  try {
    // Validate admin authentication
    const authResult = await validateAuth(request);
    if (!authResult.valid || authResult.user?.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { table, ids } = body;

    if (!table || !ids || !Array.isArray(ids)) {
      return errorResponse('Table name and ids array are required');
    }

    if (ids.length === 0) {
      return errorResponse('IDs array cannot be empty');
    }

    if (ids.length > 100) {
      return errorResponse('Maximum 100 records per bulk operation');
    }

    // Validate table name (whitelist)
    const allowedTables = [
      'services',
      'testimonials',
      'case_studies',
      'team_members',
      'blog_posts',
      'blog_categories',
      'blog_tags',
      'faqs',
      'career_listings',
    ];

    if (!allowedTables.includes(table)) {
      return errorResponse('Invalid table name');
    }

    // Perform bulk delete
    const { data, error } = await supabase
      .from(table)
      .delete()
      .in('id', ids)
      .select();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse({
      deleted: data.length,
      ids: ids,
    }, `Successfully deleted ${data.length} ${table} records`);

  } catch (error: any) {
    console.error('Bulk delete error:', error);
    return errorResponse(error.message || 'Failed to delete records', 500);
  }
}

// ============================================
// BULK REORDER (Update display_order)
// ============================================

export async function PATCH(request: NextRequest) {
  try {
    // Validate admin authentication
    const authResult = await validateAuth(request);
    if (!authResult.valid || authResult.user?.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { table, order } = body;

    if (!table || !order || !Array.isArray(order)) {
      return errorResponse('Table name and order array are required');
    }

    if (order.length === 0) {
      return errorResponse('Order array cannot be empty');
    }

    // Validate table name (whitelist)
    const allowedTables = [
      'services',
      'testimonials',
      'case_studies',
      'team_members',
      'blog_posts',
      'blog_categories',
      'faqs',
    ];

    if (!allowedTables.includes(table)) {
      return errorResponse('Invalid table name');
    }

    // Update display_order for each record
    const results = [];
    const errors = [];

    for (let i = 0; i < order.length; i++) {
      const id = order[i];
      const display_order = i + 1;

      const { data, error } = await supabase
        .from(table)
        .update({ display_order })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        errors.push({ id, error: error.message });
      } else {
        results.push(data);
      }
    }

    return successResponse({
      reordered: results.length,
      failed: errors.length,
      records: results,
      errors: errors.length > 0 ? errors : undefined,
    }, `Successfully reordered ${results.length} ${table} records`);

  } catch (error: any) {
    console.error('Bulk reorder error:', error);
    return errorResponse(error.message || 'Failed to reorder records', 500);
  }
}
