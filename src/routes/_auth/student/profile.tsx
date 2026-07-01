import { createFileRoute } from '@tanstack/react-router'
import ProfilePage from '../../../components/student/ProfilePage'
import StudentTopHeader from '../../../components/student/StudentTopHeader'

export const Route = createFileRoute('/_auth/student/profile')({
  component: StudentProfileRoute,
})

function StudentProfileRoute() {
  return (
    <>
      <StudentTopHeader sectionLabel="profile" />
      <ProfilePage />
    </>
  )
}
