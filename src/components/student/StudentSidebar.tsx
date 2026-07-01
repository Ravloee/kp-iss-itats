import {
  LayoutDashboard,
  FilePlus,
  Activity,
  User,
  LogOut,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { useAuth } from '../../lib/auth';
import { useStudentProfile } from '../../lib/studentProfile';

const NAV_ITEMS = [
  { to: '/student' as const, label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/student/apply' as const, label: 'Apply Service', icon: FilePlus },
  { to: '/student/requirements' as const, label: 'Advisory & Requirements', icon: BookOpen },
  { to: '/student/applications' as const, label: 'My Applications', icon: Activity },
  { to: '/student/profile' as const, label: 'Profile', icon: User },
];

export default function StudentSidebar({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const { logout } = useAuth();
  const { profile } = useStudentProfile();
  const location = useLocation();

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <>
      {/* Mobile Top Header for Sidebar Toggle */}
      <div className="lg:hidden bg-[#F8FAFC]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 shadow-sm w-full relative z-30">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-150 flex items-center justify-center p-0.5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqqHEGMRQMx2Bku-uYKvmBhtzY7L4Vd91Bg&s"
              alt="ITATS Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-extrabold text-[#005CB9] text-xs font-sans uppercase">Student Portal</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#005CB9] rounded-lg hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 bg-transparent" /> : <Menu className="w-5 h-5 bg-transparent" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 bg-[#F8FAFC] border-r border-slate-200 shrink-0 lg:min-h-[calc(100vh-5rem)] z-30`}
      >
        <div className="p-6 border-b border-slate-200 hidden lg:block">
          <div className="flex items-center space-x-3 text-left">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-black text-slate-900 truncate" title={profile.name}>{profile.name}</h4>
              <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{profile.nim}</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#005CB9] text-white shadow-sm border-l-4 border-l-[#F4D000]'
                    : 'text-slate-650 hover:bg-slate-200/50 hover:text-[#005CB9]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <hr className="my-4 border-slate-200" />

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              logout();
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-650 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
