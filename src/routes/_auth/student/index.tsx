import { createFileRoute } from '@tanstack/react-router'
import StudentDashboard from '../../../components/StudentDashboard'

export const Route = createFileRoute('/_auth/student/')({
  component: StudentDashboardRoute,
})

function StudentDashboardRoute() {
  return <StudentDashboard />
}