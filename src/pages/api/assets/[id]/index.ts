export const prerender = false;

import type { APIRoute } from 'astro';
import { getAsset } from '@/lib/db';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const asset = getAsset(id!);

  if (!asset) {
    return new Response(JSON.stringify({ error: 'Asset non trouvé' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ asset }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
