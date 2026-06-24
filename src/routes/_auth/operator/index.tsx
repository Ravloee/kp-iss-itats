import { createFileRoute } from '@tanstack/react-router'
import OperatorDashboard from '../../../components/OperatorDashboard'

export const Route = createFileRoute('/_auth/operator/')({
  component: OperatorDashboardRoute,
})

function OperatorDashboardRoute() {
  return <OperatorDashboard />
}