export const prerender = false;

import type { APIRoute } from 'astro';
import { getEmployee, deleteEmployee, updateEmployeeStore } from '@/lib/db';

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

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  const success = deleteEmployee(id!);

  if (!success) {
    return new Response(JSON.stringify({ error: 'Employé non trouvé' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;

  try {
    const data = await request.json();

    if (data.store_id) {
      const employee = updateEmployeeStore(id!, data.store_id);

      if (!employee) {
        return new Response(JSON.stringify({ error: 'Employé ou antenne non trouvé' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ employee }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Aucune modification demandée' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Données invalides' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
