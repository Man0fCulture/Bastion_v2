export const prerender = false;

import type { APIRoute } from 'astro';
import { getEmployees, createEmployee } from '@/lib/db';

export const GET: APIRoute = async ({ url }) => {
  const store_id = url.searchParams.get('store_id') || undefined;
  const search = url.searchParams.get('search') || undefined;

  const employees = getEmployees({ store_id, search });

  return new Response(JSON.stringify({ employees }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.store_id || !data.firstname || !data.lastname || !data.matricule || !data.rio || !data.indicatif || !data.affectation) {
      return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const employee = createEmployee(data);

    return new Response(JSON.stringify({ employee }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Données invalides' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
