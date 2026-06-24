import '../index.css'
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthProvider } from '../lib/auth'
import { ApplicationsProvider } from '../lib/applications'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'International Student Service (ISS-ITATS)' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <AuthProvider>
        <ApplicationsProvider>
          <Navbar />
          <main className="min-h-screen text-slate-800 font-sans antialiased bg-white">
            <Outlet />
          </main>
          <FooterWrapper />
        </ApplicationsProvider>
      </AuthProvider>
      <TanStackRouterDevtools />
    </RootDocument>
  )
}

function FooterWrapper() {
  const location = useLocation()
  // Only show footer on public pages (not on login, student, or operator pages)
  const hideFooter = location.pathname === '/login' || location.pathname.startsWith('/student') || location.pathname.startsWith('/operator')
  if (hideFooter) return null
  return <Footer />
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}