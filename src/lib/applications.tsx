import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Application, ApplicationStatus } from '../types';
import { INITIAL_APPLICATIONS } from '../data';

type ApplicationsContextType = {
  applications: Application[];
  addApplication: (newApp: Omit<Application, 'id' | 'submissionDate' | 'status'>) => void;
  updateStatus: (id: string, status: ApplicationStatus, operatorNotes?: string) => void;
};

const ApplicationsContext = createContext<ApplicationsContextType | null>(null);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  const addApplication = useCallback((newApp: Omit<Application, 'id' | 'submissionDate' | 'status'>) => {
    const formattedId = `APP-09${Math.floor(10 + Math.random() * 90)}`;
    const today = new Date().toISOString().split('T')[0];
    const finalApp: Application = {
      ...newApp,
      id: formattedId,
      submissionDate: today,
      status: 'Pending',
    };
    setApplications((prev) => [finalApp, ...prev]);
  }, []);

  const updateStatus = useCallback((id: string, status: ApplicationStatus, operatorNotes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status,
              operatorNotes: operatorNotes || app.operatorNotes,
              verificationDate: today,
            }
          : app,
      ),
    );
  }, []);

  return (
    <ApplicationsContext.Provider value={{ applications, addApplication, updateStatus }}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications(): ApplicationsContextType {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
}