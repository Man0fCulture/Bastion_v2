import { defineMiddleware } from 'astro:middleware';

const MOCK_USER = {
  id: 'demo-user-id',
  email: 'commandant@raid.gouv.fr',
  role: 'UNIT_CHIEF' as const,
  password_hash: '',
  employee_id: undefined,
  created_at: new Date(),
  updated_at: new Date()
};

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.user = MOCK_USER;

  const response = await next();

  if (response instanceof Response) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  }

  return response;
});
