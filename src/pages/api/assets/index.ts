export const prerender = false;

import type { APIRoute } from 'astro';
import { getAssets } from '@/lib/db';

export const GET: APIRoute = async ({ url }) => {
  const store_id = url.searchParams.get('store_id') || undefined;
  const category = url.searchParams.get('category') || undefined;
  const state = url.searchParams.get('state') || undefined;
  const search = url.searchParams.get('search') || undefined;

  const assets = getAssets({ store_id, category, state, search });

  return new Response(JSON.stringify({ assets }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
