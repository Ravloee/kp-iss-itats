import { createFileRoute } from '@tanstack/react-router'
import ApplyServicePage from '../../../components/student/ApplyServicePage'
import StudentTopHeader from '../../../components/student/StudentTopHeader'

export const Route = createFileRoute('/_auth/student/apply')({
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    const service = typeof search.service === 'string' ? search.service : undefined
    return service ? { service } : {}
  },
  component: StudentApplyRoute,
})

function StudentApplyRoute() {
  return (
    <>
      <StudentTopHeader sectionLabel="apply" />
      <ApplyServicePage />
    </>
  )
}
