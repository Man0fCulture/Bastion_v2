import { sql, queryOne } from './db';
import type { User, Session } from './types';
import argon2 from 'argon2';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  });
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}

export async function createSession(userId: string): Promise<Session> {
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const session = await queryOne<Session>`
    INSERT INTO sessions (id, user_id, expires_at, created_at)
    VALUES (${id}, ${userId}, ${expiresAt}, NOW())
    RETURNING *
  `;

  if (!session) {
    throw new Error('Failed to create session');
  }

  return session;
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const session = await queryOne<Session>`
    SELECT * FROM sessions
    WHERE id = ${sessionId}
    AND expires_at > NOW()
  `;

  return session;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
}

export async function getUserFromSession(sessionId: string): Promise<User | null> {
  const user = await queryOne<User>`
    SELECT u.* FROM users u
    INNER JOIN sessions s ON s.user_id = u.id
    WHERE s.id = ${sessionId}
    AND s.expires_at > NOW()
  `;

  return user;
}

export async function authenticate(email: string, password: string): Promise<User | null> {
  const user = await queryOne<User & { password_hash: string }>`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (!user) {
    return null;
  }

  const valid = await verifyPassword(user.password_hash, password);
  if (!valid) {
    return null;
  }

  const { password_hash: _, ...safeUser } = user;
  return safeUser as User;
}

export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

export function verifyCsrfToken(token: string, expected: string): boolean {
  if (token.length !== expected.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

export function parseSessionCookie(cookie: string | null): string | null {
  if (!cookie) return null;

  const match = cookie.match(/session=([^;]+)/);
  return match ? match[1] : null;
}

export function createSessionCookie(sessionId: string): string {
  const expires = new Date(Date.now() + SESSION_DURATION_MS);
  return `session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=${expires.toUTCString()}`;
}

export function createLogoutCookie(): string {
  return 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0';
}
