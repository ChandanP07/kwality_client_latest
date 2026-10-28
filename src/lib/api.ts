// lib/api.ts
// Single source of truth for all API calls in the client app.
//
// All calls go to NEXT_PUBLIC_API_URL (admin app) under /api/client/*
// credentials: 'include' sends the session cookie cross-origin so
// the admin app can verify the JWT.
//
// Usage:
//   import { api } from '@/lib/api'
//   const orders = await api.get('/orders')
//   const order  = await api.post('/orders', { productName: '...' })

const BASE = process.env.NEXT_PUBLIC_API_URL ?? ''
const PREFIX = '/api/client'

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const url = `${BASE}${PREFIX}${path}`
  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? `Request failed: ${res.status}`)
  }

  return res.json() as Promise<T>
}

export const api = {
  get:    <T>(path: string)                  => request<T>('GET',    path),
  post:   <T>(path: string, body: unknown)   => request<T>('POST',   path, body),
  put:    <T>(path: string, body: unknown)   => request<T>('PUT',    path, body),
  patch:  <T>(path: string, body: unknown)   => request<T>('PATCH',  path, body),
  delete: <T>(path: string)                  => request<T>('DELETE', path),
}

// Convenience: public endpoints that don't need auth (cities list etc.)
// These still go to the admin app but without the /client prefix
export async function publicGet<T>(path: string): Promise<T> {
  const url = `${BASE}/api${path}`
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  return res.json() as Promise<T>
}