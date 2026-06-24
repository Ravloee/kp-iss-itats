import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getCurrentUser } from '../../lib/auth'

export const Route = createFileRoute('/_auth/operator')({
  beforeLoad: () => {
    // Only check auth on client — server doesn't have in-memory auth state
    if (typeof document !== 'undefined') {
      const user = getCurrentUser()
      if (!user) {
        throw redirect({ to: '/login' })
      }
      if (user.role !== 'operator') {
        throw redirect({ to: '/student' })
      }
    }
  },
  component: OperatorLayout,
})

function OperatorLayout() {
  return <Outlet />
}