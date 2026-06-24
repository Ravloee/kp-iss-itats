import { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../lib/auth'
import Hero from '../components/Hero'
import ServicesSection from '../components/ServicesSection'
import HowItWorksSection from '../components/HowItWorksSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { isAuthenticated, role } = useAuth()
  const navigate = useNavigate()

  // Keep dark mode strictly disabled
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark')
  }, [])

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    } else {
      navigate({ to: role === 'student' ? '/student' : '/operator' })
    }
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="pt-0">
      <Hero
        onApplyClick={handleApply}
        onLearnMoreClick={() => scrollTo('services')}
      />

      <ServicesSection
        onApplyService={(serviceTitle) => {
          if (!isAuthenticated) {
            navigate({ to: '/login' })
          } else {
            navigate({ to: role === 'student' ? '/student' : '/operator' })
          }
        }}
        onViewRequirements={(serviceId) => {
          scrollTo('services')
        }}
      />

      <HowItWorksSection />

      <FAQSection />

      <ContactSection />
    </div>
  )
}