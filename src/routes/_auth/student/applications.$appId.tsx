import { createFileRoute } from '@tanstack/react-router'
import ApplicationDetailPage from '../../../components/student/ApplicationDetailPage'
import StudentTopHeader from '../../../components/student/StudentTopHeader'

export const Route = createFileRoute('/_auth/student/applications/$appId')({
  component: StudentApplicationDetailRoute,
})

function StudentApplicationDetailRoute() {
  const { appId } = Route.useParams()
  return (
    <>
      <StudentTopHeader sectionLabel="status" />
      <ApplicationDetailPage appId={appId} />
    </>
  )
}
