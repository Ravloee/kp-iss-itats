import { useState, useEffect } from 'react';
import { Menu, X, Globe, LogIn, LayoutDashboard } from 'lucide-react';
import { Role } from '../types';

interface NavbarProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  onNavigate: (view: 'landing' | 'login' | 'dashboard') => void;
  currentView: 'landing' | 'login' | 'dashboard';
}

export default function Navbar({
  currentRole,
  setCurrentRole,
  onNavigate,
  currentView
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setCurrentRole('guest');
    onNavigate('landing');
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm border-b border-slate-200'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand left-aligned */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => onNavigate('landing')}>
            <div className="relative flex items-center justify-center p-1 rounded-xl bg-white border border-slate-150 shadow-sm w-12 h-12">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqqHEGMRQMx2Bku-uYKvmBhtzY7L4Vd91Bg&s"
                alt="ITATS Logo"
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block text-[#005CB9] leading-none">
                ISS <span className="text-[#F4D000] font-black">ITATS</span>
              </span>
              <span className="text-[9px] font-mono font-black tracking-widest text-slate-500 block uppercase mt-1">
                International Student Service
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Menu strictly centered or spaced evenly */}
          <div className="hidden lg:flex items-center justify-center space-x-12 flex-1 mx-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="relative text-[#334155] hover:text-[#005CB9] text-sm font-bold transition-colors cursor-pointer focus:outline-none group py-1.5"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#F4D000] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="relative text-[#334155] hover:text-[#005CB9] text-sm font-bold transition-colors cursor-pointer focus:outline-none group py-1.5"
            >
              <span>Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#F4D000] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('guide')}
              className="relative text-[#334155] hover:text-[#005CB9] text-sm font-bold transition-colors cursor-pointer focus:outline-none group py-1.5"
            >
              <span>Guide</span>
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#F4D000] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="relative text-[#334155] hover:text-[#005CB9] text-sm font-bold transition-colors cursor-pointer focus:outline-none group py-1.5"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#F4D000] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
          </div>

          {/* Right menu container for Portal Login or Session */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            {/* Language Selection Indicator */}
            <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-mono font-bold pr-2">
              <Globe className="w-3.5 h-3.5 text-[#F4D000] shrink-0" />
              <span>EN / ID</span>
            </div>

            <div className="h-4 w-px bg-slate-300"></div>

            {currentRole === 'guest' ? (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center space-x-2 bg-[#005CB9] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer border border-transparent whitespace-nowrap active:scale-95"
                id="btn-login-cta"
              >
                <LogIn className="w-4 h-4 text-white" />
                <span>Portal Login</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center space-x-1.5 bg-[#005CB9] hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburguer toggler */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-[#005CB9] cursor-pointer"
              id="mobile-menu-toggle"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg px-4 pt-2 pb-6 space-y-3 transition-all text-left">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 border-b border-slate-100 text-sm font-bold text-[#334155] focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 border-b border-slate-100 text-sm font-bold text-[#334155] focus:outline-none"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('guide')}
              className="text-left py-2 border-b border-slate-100 text-sm font-bold text-[#334155] focus:outline-none"
            >
              Guide
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 border-b border-slate-100 text-sm font-bold text-[#334155] focus:outline-none"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500 py-1.5 border-b border-slate-100">
            <span>Language Support:</span>
            <span className="text-emerald-700 font-bold">English & Bahasa</span>
          </div>

          <div className="pt-2">
            {currentRole === 'guest' ? (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-[#005CB9] hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Portal Login</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#005CB9] hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
