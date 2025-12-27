export const prerender = false;

import type { APIRoute } from 'astro';
import { getEmployee } from '@/lib/db';

export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let employee = null;

  if (user.employee_id) {
    employee = getEmployee(user.employee_id);
  }

  return new Response(JSON.stringify({
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    },
    employee
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
