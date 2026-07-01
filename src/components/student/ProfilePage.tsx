import React, { useState } from 'react';
import {
  User,
  UserCheck,
  Globe,
  FileText,
  Mail,
  Clock,
  BookOpen,
} from 'lucide-react';
import { useStudentProfile } from '../../lib/studentProfile';
import { getCountryFlag } from './shared';

export default function ProfilePage() {
  const { profile, setProfile } = useStudentProfile();
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileEditing(false);
  };

  if (!isProfileEditing) {
    return (
      <div className="space-y-6 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="bg-gradient-to-r from-[#005CB9] to-blue-700 h-24 relative">
                <div className="absolute top-4 right-4 bg-[#F4D000] text-slate-950 text-[9px] font-mono font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                  ITS-VALIDAT
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#005CB9]/50 via-transparent to-transparent opacity-60" />
              </div>

              <div className="px-6 pb-6 pt-0 text-center relative -mt-12">
                <div className="inline-block relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-white shrink-0 mx-auto"
                  />
                  <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </span>
                </div>

                <div className="mt-3.5 space-y-1">
                  <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">{profile.name}</h3>
                  <p className="text-xs font-mono font-extrabold text-[#005CB9] tracking-tight">NIM • {profile.nim}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center">
                  <div className="inline-flex items-center space-x-2 bg-[#005CB9] hover:bg-blue-700 text-white px-4 py-2.5 rounded-2xl text-[11px] font-black shadow-md shadow-blue-500/15 border-l-4 border-l-[#F4D000] select-none transition-all">
                    <Globe className="w-4 h-4 text-[#F4D000] shrink-0" />
                    <span className="tracking-wide uppercase font-mono">International Scholar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 px-1">
                <UserCheck className="w-4 h-4 text-[#005CB9]" />
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Account Information</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between border-l-4 border-l-emerald-500 text-left">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Account Status</span>
                    <span className="text-xs font-black text-emerald-700">Active / Terdaftar</span>
                  </div>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse mr-2" />
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between border-l-4 border-l-[#005CB9] text-left">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Last Portal Session</span>
                    <span className="text-xs font-black text-slate-850 font-mono">Today, 08:30 AM</span>
                  </div>
                  <Clock className="w-4 h-4 text-blue-500 mr-1.5" />
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between border-l-4 border-l-[#F4D000] text-left">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Registry Date</span>
                    <span className="text-xs font-black text-slate-800 font-mono">September 15, 2024</span>
                  </div>
                  <BookOpen className="w-4 h-4 text-[#005CB9] mr-1.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Personal Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900 font-sans uppercase tracking-wide">Student Identity Credentials</h3>
                  <p className="text-[11px] text-[#64748B] font-semibold">Verified database registry of the International Student Services.</p>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#005CB9] bg-blue-50 px-2.5 py-1 rounded border border-blue-100">SECURE ID</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                  <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl"><User className="w-4 h-4" /></div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Full Name</span>
                    <span className="text-xs font-black text-slate-800 block truncate">{profile.name}</span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                  <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl"><UserCheck className="w-4 h-4" /></div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Student ID (NIM)</span>
                    <span className="text-xs font-bold font-mono text-slate-800 block truncate">{profile.nim}</span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                  <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl"><Globe className="w-4 h-4" /></div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Nationality</span>
                    <span className="text-xs font-black text-slate-800 flex items-center space-x-1.5 min-w-0">
                      <span className="text-base shrink-0 select-none">{getCountryFlag(profile.nationality)}</span>
                      <span className="block truncate">{profile.nationality}</span>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                  <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl"><FileText className="w-4 h-4" /></div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Passport Number</span>
                    <span className="text-xs font-bold font-mono uppercase text-slate-800 block truncate">{profile.passportNumber}</span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors sm:col-span-2">
                  <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl"><Mail className="w-4 h-4" /></div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Email Address</span>
                    <span className="text-xs font-bold font-mono text-slate-800 block truncate">{profile.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex">
                <button
                  onClick={() => setIsProfileEditing(true)}
                  className="bg-[#005CB9] hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-sm shadow-blue-500/10 cursor-pointer inline-flex items-center space-x-2 border border-transparent"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Edit Profile Fields</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit form
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-black text-slate-900 font-sans uppercase tracking-wide">Update Student Profile details</h3>
        <p className="text-[11px] text-slate-500 font-semibold mt-1">
          Correct any administrative details below. Click Save to log the modified profile credentials.
        </p>
      </div>

      <form onSubmit={handleProfileSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Edit Full Name</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 border border-slate-205 rounded-xl font-bold bg-transparent text-slate-800 text-xs focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] outline-none transition-all"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Edit Nationality</label>
              <span className="text-xs">{getCountryFlag(profile.nationality)}</span>
            </div>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 border border-slate-205 rounded-xl font-bold bg-transparent text-slate-800 text-xs focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] outline-none transition-all"
              value={profile.nationality}
              onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
              placeholder="e.g. jepang (japan)"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Edit Passport Number</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 border border-slate-205 rounded-xl font-mono uppercase bg-transparent text-slate-800 text-xs focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] outline-none transition-all"
              value={profile.passportNumber}
              onChange={(e) => setProfile({ ...profile, passportNumber: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Edit Email Address</label>
            <input
              type="email"
              className="w-full px-3.5 py-2.5 border border-slate-205 rounded-xl font-bold bg-transparent text-slate-800 text-xs focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] outline-none transition-all"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex gap-2.5 pt-2 border-t border-slate-100">
          <button
            type="submit"
            className="bg-[#005CB9] hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsProfileEditing(false)}
            className="bg-slate-105 text-slate-650 hover:bg-slate-200/85 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all border border-slate-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
