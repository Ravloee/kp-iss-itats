import { createFileRoute } from '@tanstack/react-router'
import ApplicationsListPage from '../../../../components/student/ApplicationsListPage'
import StudentTopHeader from '../../../../components/student/StudentTopHeader'

export const Route = createFileRoute('/_auth/student/applications/')({
  component: StudentApplicationsRoute,
})

function StudentApplicationsRoute() {
  return (
    <>
      <StudentTopHeader sectionLabel="status" />
      <ApplicationsListPage />
    </>
  )
}
