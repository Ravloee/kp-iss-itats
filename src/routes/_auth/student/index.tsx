import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '../../../components/student/DashboardPage'
import StudentTopHeader from '../../../components/student/StudentTopHeader'

export const Route = createFileRoute('/_auth/student/')({
  component: StudentDashboardRoute,
})

function StudentDashboardRoute() {
  return (
    <>
      <StudentTopHeader sectionLabel="dashboard" />
      <DashboardPage />
    </>
  )
}
