import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getUser } from '../../lib/auth'

export const Route = createFileRoute('/_auth/operator')({
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) {
      throw redirect({ to: '/login' })
    }
    if (user.role !== 'operator') {
      throw redirect({ to: '/student' })
    }
  },
  component: OperatorLayout,
})

function OperatorLayout() {
  return <Outlet />
}
