export const prerender = false;

import type { APIRoute } from 'astro';
import { getEmployeeAssets } from '@/lib/db';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const assets = getEmployeeAssets(id!);

  return new Response(JSON.stringify({ assets }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
