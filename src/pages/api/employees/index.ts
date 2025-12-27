export const prerender = false;

import type { APIRoute } from 'astro';
import { getEmployees } from '@/lib/db';

export const GET: APIRoute = async ({ url }) => {
  const store_id = url.searchParams.get('store_id') || undefined;
  const search = url.searchParams.get('search') || undefined;

  const employees = getEmployees({ store_id, search });

  return new Response(JSON.stringify({ employees }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
