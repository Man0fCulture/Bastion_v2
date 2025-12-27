export const prerender = false;

import type { APIRoute } from 'astro';
import { getClaims } from '@/lib/db';

export const GET: APIRoute = async ({ url }) => {
  const status = url.searchParams.get('status') || undefined;
  const store_id = url.searchParams.get('store_id') || undefined;

  const claims = getClaims({ status, store_id });

  return new Response(JSON.stringify({ claims }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
