export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params }) => {
  const { id } = params;

  return new Response(JSON.stringify({ success: true, id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
