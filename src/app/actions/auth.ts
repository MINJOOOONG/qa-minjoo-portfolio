'use server'

import { cookies } from 'next/headers'
import crypto from 'crypto'

const COOKIE_NAME = 'edit-auth'
const COOKIE_MAX_AGE = 60 * 60 // 1 hour

// HMAC signing key derived from password (so we don't need a separate secret)
function getSigningKey(): string {
  const password = process.env.BLOG_EDIT_PASSWORD
  if (!password) throw new Error('BLOG_EDIT_PASSWORD not configured')
  return crypto.createHash('sha256').update(password).digest('hex')
}

function createSignedToken(): string {
  const payload = Date.now().toString()
  const key = getSigningKey()
  const signature = crypto.createHmac('sha256', key).update(payload).digest('hex')
  return `${payload}.${signature}`
}

function verifySignedToken(token: string): boolean {
  try {
    const [payload, signature] = token.split('.')
    if (!payload || !signature) return false

    const key = getSigningKey()
    const expectedSignature = crypto.createHmac('sha256', key).update(payload).digest('hex')
    if (signature !== expectedSignature) return false

    // Check expiry
    const timestamp = parseInt(payload, 10)
    if (Date.now() - timestamp > COOKIE_MAX_AGE * 1000) return false

    return true
  } catch {
    return false
  }
}

export async function verifyPassword(password: string): Promise<{ success: boolean; error?: string }> {
  const expected = process.env.BLOG_EDIT_PASSWORD
  if (!expected) {
    return { success: false, error: 'Server configuration error' }
  }

  if (password !== expected) {
    return { success: false, error: 'Incorrect password' }
  }

  const token = createSignedToken()
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  return { success: true }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return false
    return verifySignedToken(token)
  } catch {
    return false
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
