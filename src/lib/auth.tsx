import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Role } from '../types';

export type AuthUser = {
  role: 'student' | 'operator';
  email: string;
  name: string;
};

// Global auth store (accessible outside React — needed for beforeLoad guards)
let _currentUser: AuthUser | null = null;
let _listeners: Set<() => void> = new Set();

function notifyListeners() {
  _listeners.forEach((fn) => fn());
}

export function subscribeToAuth(fn: () => void): () => void {
  _listeners.add(fn);
  return () => {
    _listeners.delete(fn);
  };
}

export function getCurrentUser(): AuthUser | null {
  return _currentUser;
}

export function setCurrentUser(user: AuthUser | null) {
  _currentUser = user;
  notifyListeners();
}

// React context for reactive UI updates
export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  role: Role;
  login: (role: 'student' | 'operator', email?: string, name?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(_currentUser);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(() => {
      setUserState(_currentUser);
    });
    return unsubscribe;
  }, []);

  const login = useCallback((role: 'student' | 'operator', email?: string, name?: string) => {
    const defaultEmail = role === 'student' ? 'student@itats.ac.id' : 'operator@itats.ac.id';
    const defaultName = role === 'student' ? 'Yuki Tanaka' : 'Bambang Purnomo';
    const newUser: AuthUser = {
      role,
      email: email || defaultEmail,
      name: name || defaultName,
    };
    setCurrentUser(newUser);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        role: user?.role ?? 'guest',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}