import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { getUser, useAuth } from '../lib/auth'
import LoginPage from '../components/LoginPage'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const redirect = typeof search.redirect === 'string' ? search.redirect : undefined
    return redirect ? { redirect } : {}
  },
  beforeLoad: async () => {
    const user = await getUser()
    if (user) {
      const target = user.role === 'student' ? '/student' : '/operator'
      throw redirect({ to: target })
    }
  },
  component: LoginRoute,
})

function LoginRoute() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLoginSuccess = async (username: string, password: string) => {
    try {
      const user = await login(username, password)
      const target = user.role === 'student' ? '/student' : '/operator'
      navigate({ to: target, replace: true })
    } catch (err) {
      alert('Login gagal: username atau password salah.')
    }
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} />
}
