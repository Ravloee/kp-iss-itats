import { useState } from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getUser } from '../../lib/auth'
import { StudentProfileProvider } from '../../lib/studentProfile'
import StudentSidebar from '../../components/student/StudentSidebar'

export const Route = createFileRoute('/_auth/student')({
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) {
      throw redirect({ to: '/login' })
    }
    if (user.role !== 'student') {
      throw redirect({ to: '/operator' })
    }
  },
  component: StudentLayout,
})

function StudentLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <StudentProfileProvider>
      <div className="pt-20 min-h-screen bg-slate-50 relative flex flex-col lg:flex-row text-slate-800 overflow-hidden">
        {/* Campus Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.25]">
          <img
            src="https://itats.ac.id/kerjasama/wp-content/uploads/sites/27/2025/08/2024_03_20_14_15_IMG_2363-1-1-768x432.webp"
            alt="ITATS Campus Environment"
            className="w-full h-full object-cover scale-105 transform origin-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50" />
        </div>

        <StudentSidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        <main className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full relative z-10">
          <Outlet />
        </main>
      </div>
    </StudentProfileProvider>
  )
}
