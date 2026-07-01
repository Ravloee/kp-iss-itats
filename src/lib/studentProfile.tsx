import { createContext, useContext, useState, ReactNode } from 'react';
import { StudentProfile } from '../types';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Yuki Tanaka',
  nim: '14.2024.1.00010',
  NPM: '14.2024.1.00010',
  nationality: 'Jepang (Japan)',
  passportNumber: 'JP3371902',
  email: 'tanaka.yuki@itats.student.ac.id',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
};

type StudentProfileContextType = {
  profile: StudentProfile;
  setProfile: (profile: StudentProfile) => void;
};

const StudentProfileContext = createContext<StudentProfileContextType | null>(null);

export function StudentProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  return (
    <StudentProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </StudentProfileContext.Provider>
  );
}

export function useStudentProfile(): StudentProfileContextType {
  const context = useContext(StudentProfileContext);
  if (!context) {
    throw new Error('useStudentProfile must be used within a StudentProfileProvider');
  }
  return context;
}
