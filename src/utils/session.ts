import { useSession } from '@tanstack/react-start/server'

export type Role = 'student' | 'operator'

export type SessionUser = {
  username: string
  role: Role
  country: string
}

export type SessionData = {
  user: SessionUser | null
}

export const SESSION_CONFIG = {
  name: 'app-session',
  password: process.env.SESSION_SECRET || 'itats-iss-portal-session-secret-key-2026-secure',
  cookie: {
    sameSite: 'lax' as const,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export function useAppSession() {
  return useSession<SessionData>(SESSION_CONFIG)
}
