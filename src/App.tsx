import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import HowItWorksSection from './components/HowItWorksSection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import OperatorDashboard from './components/OperatorDashboard';
import RequirementsPage from './components/RequirementsPage';
import { Role, Application, ApplicationStatus } from './types';
import { INITIAL_APPLICATIONS } from './data';

export default function App() {
  const [currentRole, setCurrentRole] = useState<Role>('guest');
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard' | 'requirements'>('landing');
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [preSelectedService, setPreSelectedService] = useState<string | undefined>(undefined);

  // Keep dark mode strictly disabled for minimalist university portal design
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
  }, []);

  // Handle addition of a new application from student workspace
  const handleAddNewApplication = (newApp: Omit<Application, 'id' | 'submissionDate' | 'status'>) => {
    const formattedId = `APP-09${Math.floor(10 + Math.random() * 90)}`;
    const today = new Date().toISOString().split('T')[0];

    const finalApp: Application = {
      ...newApp,
      id: formattedId,
      submissionDate: today,
      status: 'Pending'
    };

    setApplications((prev) => [finalApp, ...prev]);
  };

  // Handle status update from operator workspace
  const handleUpdateStatus = (id: string, status: ApplicationStatus, operatorNotes?: string) => {
    const today = new Date().toISOString().split('T')[0];

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status,
              operatorNotes: operatorNotes || app.operatorNotes,
              verificationDate: today
            }
          : app
      )
    );
  };

  const handleLoginSuccess = (role: Role) => {
    setCurrentRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentRole('guest');
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased bg-white">
      {/* Sticky Global Navigation */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onNavigate={(view) => {
          if (view === 'dashboard' && currentRole === 'guest') {
            setCurrentView('login');
          } else {
            setCurrentView(view);
          }
        }}
        currentView={currentView}
      />

      {/* Main Orchestration routing */}
      {currentView === 'landing' && (
        <div className="pt-0">
          <Hero
            onApplyClick={() => {
              if (currentRole === 'guest') {
                setCurrentView('login');
              } else {
                setCurrentView('dashboard');
              }
            }}
            onLearnMoreClick={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <ServicesSection
            onApplyService={(serviceTitle) => {
              setPreSelectedService(serviceTitle);
              if (currentRole === 'guest') {
                setCurrentView('login');
              } else {
                setCurrentView('dashboard');
              }
            }}
            onViewRequirements={(serviceId) => {
              setSelectedServiceId(serviceId);
              setCurrentView('requirements');
            }}
          />

          <HowItWorksSection />

          <FAQSection />

          <ContactSection />

          <Footer onNavigate={(view) => {
            if (view === 'dashboard' && currentRole === 'guest') {
              setCurrentView('login');
            } else {
              setCurrentView(view);
            }
          }} />
        </div>
      )}

      {currentView === 'requirements' && (
        <RequirementsPage
          currentRole={currentRole}
          initialServiceId={selectedServiceId}
          onBack={() => {
            setCurrentView('landing');
            setSelectedServiceId(undefined);
          }}
          onApplyService={(serviceTitle) => {
            setPreSelectedService(serviceTitle);
            if (currentRole === 'guest') {
              setCurrentView('login');
            } else {
              setCurrentView('dashboard');
            }
          }}
        />
      )}

      {currentView === 'login' && (
        <LoginPage
          onNavigate={setCurrentView}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'dashboard' && (
        <>
          {currentRole === 'student' && (
            <StudentDashboard
              applications={applications}
              onAddNewApplication={handleAddNewApplication}
              onLogout={handleLogout}
              initialSelectedServiceTitle={preSelectedService}
              clearPreSelectedService={() => setPreSelectedService(undefined)}
            />
          )}

          {currentRole === 'operator' && (
            <OperatorDashboard
              applications={applications}
              onUpdateStatus={handleUpdateStatus}
              onLogout={handleLogout}
            />
          )}
        </>
      )}
    </div>
  );
}
