export const prerender = false;

import type { APIRoute } from 'astro';
import { getEmployee } from '@/lib/db';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const employee = getEmployee(id!);

  if (!employee) {
    return new Response(JSON.stringify({ error: 'Employé non trouvé' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ employee }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
