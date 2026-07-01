import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getUser } from '../lib/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location }) => {
    const user = await getUser()
    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return <Outlet />
}
