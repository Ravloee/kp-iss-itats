import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { Role } from '../types'
import { useAppSession, SessionUser } from '../utils/session'

// ---------------------------------------------------------------------------
// Mock user database (replace with real API/backend later)
// ---------------------------------------------------------------------------
const MOCK_USERS: Array<SessionUser & { password: string }> = [
  { username: 'student', role: 'student', country: 'Jepang (Japan)', password: 'password123' },
  { username: 'operator', role: 'operator', country: 'Indonesia', password: 'password123' },
]

// ---------------------------------------------------------------------------
// Server functions — these run on the server and read/write the session cookie
// ---------------------------------------------------------------------------
export const login = createServerFn({ method: 'POST' })
  .validator((d: { username: string; password: string }) => d)
  .handler(async ({ data }) => {
    const session = await useAppSession()
    const user = MOCK_USERS.find(
      (u) => u.username === data.username && u.password === data.password,
    )
    if (!user) {
      throw new Error('Invalid username or password')
    }
    const { password: _pw, ...safeUser } = user
    await session.update({ user: safeUser })
    return safeUser as SessionUser
  })

export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.update({ user: null })
  return { success: true }
})

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  return (session.data.user as SessionUser | null) ?? null
})

// ---------------------------------------------------------------------------
// Client-side React context — reactive UI updates + calls server functions
// ---------------------------------------------------------------------------
export type AuthUser = SessionUser

export type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  role: Role
  login: (username: string, password: string) => Promise<AuthUser>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const refresh = useCallback(async () => {
    try {
      const u = await getUser()
      setUser(u)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      const u = await login({ data: { username, password } })
      setUser(u)
      return u
    },
    [],
  )

  const handleLogout = useCallback(async () => {
    await logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        role: user?.role ?? 'guest',
        login: handleLogin,
        logout: handleLogout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
