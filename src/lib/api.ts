// lib/api.ts
// Single source of truth for all API calls in the client app.
//
// All calls go to NEXT_PUBLIC_API_URL under /api/client/*
// If NEXT_PUBLIC_API_URL is not set or unreachable, it falls back to
// the local client API routes seamlessly.
// credentials: 'include' sends the session cookie cross-origin so
// the server can verify the JWT.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';
const PREFIX = '/api/client';

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const url = `${BASE}${PREFIX}${path}`;
  let res: Response;

  try {
    res = await fetch(url, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch (netErr) {
    // If external BASE failed to connect (e.g. admin server not running on 3001),
    // fallback to local client API route if BASE was configured
    if (BASE) {
      const localUrl = `${PREFIX}${path}`;
      res = await fetch(localUrl, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    } else {
      throw netErr;
    }
  }

  // If external BASE returned 404, fallback to local client API route
  if (!res.ok && res.status === 404 && BASE) {
    const localUrl = `${PREFIX}${path}`;
    const localRes = await fetch(localUrl, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}),
    }).catch(() => null);

    if (localRes && localRes.ok) {
      return localRes.json() as Promise<T>;
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get:    <T>(path: string)                  => request<T>('GET',    path),
  post:   <T>(path: string, body: unknown)   => request<T>('POST',   path, body),
  put:    <T>(path: string, body: unknown)   => request<T>('PUT',    path, body),
  patch:  <T>(path: string, body: unknown)   => request<T>('PATCH',  path, body),
  delete: <T>(path: string)                  => request<T>('DELETE', path),
};

// Convenience: public endpoints that don't need auth (cities list etc.)
// These still go to the admin app but without the /client prefix
export async function publicGet<T>(path: string): Promise<T> {
  const url = `${BASE}/api${path}`;
  let res: Response;

  try {
    res = await fetch(url, { credentials: 'include' });
  } catch (err) {
    if (BASE) {
      res = await fetch(`/api${path}`, { credentials: 'include' });
    } else {
      throw err;
    }
  }

  if (!res.ok && res.status === 404 && BASE) {
    const localRes = await fetch(`/api${path}`, { credentials: 'include' }).catch(() => null);
    if (localRes && localRes.ok) {
      return localRes.json() as Promise<T>;
    }
  }

  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json() as Promise<T>;
}
