export const prerender = false;

import type { APIRoute } from 'astro';
import { getEmployeeAssets } from '@/lib/db';

export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user || !user.employee_id) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const assets = getEmployeeAssets(user.employee_id);

  return new Response(JSON.stringify({ assets }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
