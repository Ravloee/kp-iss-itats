import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowLeft, Users } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface LoginPageProps {
  onLoginSuccess: (username: string, password: string) => void | Promise<void>;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'student' | 'operator'>('student');
  const [username, setUsername] = useState('student');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleToggle = (role: 'student' | 'operator') => {
    setSelectedRole(role);
    setUsername(role);
    setPassword('password123');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    Promise.resolve(onLoginSuccess(username, password)).finally(() => setIsLoading(false));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#F8FAFC] text-slate-800 text-left">
      <div className="max-w-5xl w-full mx-auto px-4">
        
        {/* Back Link */}
        <button
          onClick={() => navigate({ to: '/' })}
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#64748B] hover:text-[#005CB9] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#005CB9]" />
          <span>Back to Home Page</span>
        </button>

        {/* Dual Column Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Vertical College Life Illustration */}
          <div className="md:col-span-5 relative bg-gradient-to-br from-[#005CB9] to-[#003C7A] min-h-[300px] md:min-h-[500px] flex flex-col justify-between p-8 text-white text-left">
            <div className="absolute inset-0 z-0">
              <img
                src="https://itats.ac.id/wp-content/uploads/2024/10/suasana-kuliah-di-itats-surabaya-683x1024.webp"
                alt="ITATS Student Life"
                className="w-full h-full object-cover opacity-35 mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 self-start">
                <span className="w-2 h-2 rounded-full bg-[#F4D000]"></span>
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider">ITATS Global Campus</span>
              </div>

              <div className="mt-auto space-y-3">
                <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight">
                  Start Your International Creative Tech Journey
                </h3>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  Join our vibrant global community in Surabaya. Easily submit documents, track VISA/KITAS validity, and receive administrative sponsor services from anywhere.
                </p>
                <div className="pt-2 flex items-center space-x-1 text-[10px] font-mono text-[#F4D000] font-bold uppercase tracking-widest">
                  <span>International Student Service (ISS-ITATS)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Login Container Form */}
          <div className="md:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-center">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-150 shadow-sm w-14 h-14 shrink-0">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqqHEGMRQMx2Bku-uYKvmBhtzY7L4Vd91Bg&s"
                  alt="ITATS Logo"
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#005CB9] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded inline-block">
                  SECURE ACCESS
                </span>
                <h2 className="text-2xl font-extrabold text-[#0F172A] mt-2 font-sans leading-none">
                  Portal Sign-In
                </h2>
                <p className="text-xs text-[#334155] mt-2 font-semibold leading-relaxed">
                  International Student Service (ISS-ITATS). Select your role below and complete your sign in.
                </p>
              </div>
            </div>

            {/* Role selector triggers */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleToggle('student')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === 'student'
                    ? 'bg-white text-[#005CB9] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Student (Mahasiswa)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleToggle('operator')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === 'operator'
                    ? 'bg-white text-[#005CB9] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ISS Operator</span>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#334155] block">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-itats-blue bg-white text-slate-800 font-bold outline-none"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#334155] block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-itats-blue bg-white text-slate-800 font-bold outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#005CB9] hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center active:scale-95"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Masuk Portal Sekarang</span>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Help */}
            <div className="border-t border-slate-100 pt-4 text-[11px] text-[#64748B] space-y-1.5 font-bold bg-slate-50 p-4 rounded-xl">
              <span className="uppercase text-[#005CB9] tracking-wider block mb-1">
                Demo Identity Account:
              </span>
              <div className="flex justify-between">
                <span>Account Type:</span>
                <span className="text-slate-800 capitalize">{selectedRole}</span>
              </div>
              <div className="flex justify-between">
                <span>Autofilled Username:</span>
                <span className="text-[#005CB9] font-mono">{username}</span>
              </div>
              <div className="flex justify-between">
                <span>Password:</span>
                <span className="text-[#005CB9] font-mono">{password}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
