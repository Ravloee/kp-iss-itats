import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getCurrentUser } from '../../lib/auth'

export const Route = createFileRoute('/_auth/student')({
  beforeLoad: () => {
    // Only check auth on client — server doesn't have in-memory auth state
    if (typeof document !== 'undefined') {
      const user = getCurrentUser()
      if (!user) {
        throw redirect({ to: '/login' })
      }
      if (user.role !== 'student') {
        throw redirect({ to: '/operator' })
      }
    }
  },
  component: StudentLayout,
})

function StudentLayout() {
  return <Outlet />
}