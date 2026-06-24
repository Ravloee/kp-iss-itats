import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { getCurrentUser, useAuth } from '../lib/auth'
import LoginPage from '../components/LoginPage'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    // Only check auth on client — server doesn't have in-memory auth state
    if (typeof document !== 'undefined') {
      const user = getCurrentUser()
      if (user) {
        const target = user.role === 'student' ? '/student' : '/operator'
        throw redirect({ to: target })
      }
    }
  },
  component: LoginRoute,
})

function LoginRoute() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLoginSuccess = (role: 'student' | 'operator') => {
    login(role)
    const target = role === 'student' ? '/student' : '/operator'
    navigate({ to: target, replace: true })
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} />
}