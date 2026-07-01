import { createFileRoute, useNavigate } from '@tanstack/react-router'
import RequirementsPage from '../../../components/RequirementsPage'
import StudentTopHeader from '../../../components/student/StudentTopHeader'

export const Route = createFileRoute('/_auth/student/requirements')({
  component: StudentRequirementsRoute,
})

function StudentRequirementsRoute() {
  const navigate = useNavigate()
  return (
    <>
      <StudentTopHeader sectionLabel="requirements" />
      <div className="space-y-6 text-left">
        <RequirementsPage
          currentRole="student"
          compact={true}
          onApplyService={(serviceTitle) => {
            navigate({ to: '/student/apply', search: { service: serviceTitle } })
          }}
          onBack={() => navigate({ to: '/student' })}
        />
      </div>
    </>
  )
}
