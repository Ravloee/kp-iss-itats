import {
  FilePlus,
  Activity,
  Bell,
  User,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useStudentProfile } from '../../lib/studentProfile';
import { useStudentApps, getStatusBadge } from './shared';
import { NotificationCenter } from './StudentTopHeader';

export default function DashboardPage() {
  const { profile } = useStudentProfile();
  const studentApps = useStudentApps();
  const navigate = useNavigate();

  const goTo = (path: string) => navigate({ to: path });

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Card */}
      <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border-t-4 border-t-[#F4D000] border-x border-b border-x-slate-200 border-b-slate-200 shadow-[0_4px_25px_-5px_rgba(244,208,0,0.05)] hover:shadow-[0_12px_30px_rgba(244,208,0,0.06)] transition-all duration-300">
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50 px-2.5 py-1 rounded inline-block border border-blue-100">
            STUDENT PORTAL • ISS-ITATS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] font-sans">
            Welcome, {profile.name}!
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed max-w-xl font-semibold">
            Easily request study permits, visa sponsor letters, and KITAS extension files. Check the status of your documents, keep your records updated, and contact KUI Surabaya for help desk concerns.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => goTo('/student/apply')}
              className="bg-[#005CB9] text-white hover:bg-[#005CB9]/95 text-xs font-extrabold px-6 py-3 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-[#F4D000]/10 border border-transparent hover:border-[#F4D000] cursor-pointer transition-all active:scale-95 animate-pulse"
            >
              Apply Service Now
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded bg-[#005CB9]" />
          <span className="font-sans">Pilihan Cepat • Quick Actions</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => goTo('/student/apply')}
            className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#005CB9] rounded-2xl p-5 text-left transition-all hover:shadow-md cursor-pointer flex flex-col justify-between h-36"
          >
            <div className="p-2.5 bg-blue-50 group-hover:bg-[#005CB9]/10 rounded-xl w-fit transition-colors">
              <FilePlus className="w-5 h-5 text-[#005CB9]" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide group-hover:text-[#005CB9] transition-colors">
                Apply Service
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-1 line-clamp-2">
                Ajukan Layanan Dokumen Baru
              </p>
            </div>
          </button>

          <button
            onClick={() => goTo('/student/applications')}
            className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#005CB9] rounded-2xl p-5 text-left transition-all hover:shadow-md cursor-pointer flex flex-col justify-between h-36"
          >
            <div className="p-2.5 bg-blue-50/70 group-hover:bg-[#005CB9]/10 rounded-xl w-fit transition-all">
              <Activity className="w-5 h-5 text-[#005CB9] group-hover:text-[#005CB9] transition-colors" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide group-hover:text-[#005CB9] transition-colors">
                My Applications
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-1 line-clamp-2">
                Lacak Riwayat Permohonan Dokumen
              </p>
            </div>
          </button>

          <button
            onClick={() => document.getElementById('announcements-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#005CB9] rounded-2xl p-5 text-left transition-all hover:shadow-md cursor-pointer flex flex-col justify-between h-36"
          >
            <div className="p-2.5 bg-amber-50 group-hover:bg-[#005CB9]/10 rounded-xl w-fit transition-colors">
              <Bell className="w-5 h-5 text-amber-600 group-hover:text-[#005CB9] transition-colors" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide group-hover:text-[#005CB9] transition-colors">
                Announcements
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-1 line-clamp-2">
                Pusat Informasi & Buletin Terbaru
              </p>
            </div>
          </button>

          <button
            onClick={() => goTo('/student/profile')}
            className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#005CB9] rounded-2xl p-5 text-left transition-all hover:shadow-md cursor-pointer flex flex-col justify-between h-36"
          >
            <div className="p-2.5 bg-emerald-50 group-hover:bg-[#005CB9]/10 rounded-xl w-fit transition-colors">
              <User className="w-5 h-5 text-emerald-600 group-hover:text-[#005CB9] transition-colors" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide group-hover:text-[#005CB9] transition-colors">
                My Profile
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-1 line-clamp-2">
                Data Diri & Kebangsaan Mahasiswa
              </p>
            </div>
          </button>
        </div>
      </div>

      <NotificationCenter />

      {/* Announcements */}
      <div id="announcements-section" className="space-y-4 pt-2">
        <div className="flex items-center space-x-2 pb-1">
          <span className="w-2.5 h-2.5 rounded bg-[#F4D000] shadow-[0_0_8px_rgba(244,208,0,0.5)]" />
          <h3 className="text-base font-extrabold text-[#0F172A] font-sans">
            Pusat Informasi & Pengumuman • Announcements
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tag: 'Urgent', tagClass: 'bg-red-50 text-red-700 border-red-200', date: 'July 10, 2026', title: 'Visa Extension Deadline', body: 'Visa Extension submissions must be completed before July 25. Please gather and upload all letters early.' },
            { tag: 'Information', tagClass: 'bg-amber-50 text-amber-700 border-amber-200', date: 'June 30, 2026', title: 'New Student Study Permit', body: 'New international students must submit Study Permit documents before orientation starts.' },
            { tag: 'System Note', tagClass: 'bg-blue-50 text-[#005CB9] border-blue-100', date: 'June 15, 2026', title: 'KITAS Renewal Queue Duration', body: 'KITAS renewal may take 5-7 working days depending on immigration load. Plan accordingly.' },
          ].map((a) => (
            <div key={a.title} className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#005CB9] transition-all relative flex flex-col justify-between shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className={`${a.tagClass} text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border`}>
                    {a.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{a.date}</span>
                </div>
                <h4 className="text-xs font-extrabold text-[#0D172A] font-sans leading-snug">{a.title}</h4>
                <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-[#005CB9]" />
            <span className="font-sans">Permohonan Terbaru • Recent Applications</span>
          </h3>
          <button
            onClick={() => goTo('/student/applications')}
            className="text-xs text-[#005CB9] font-bold hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>View All Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {studentApps.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
            <p className="text-sm font-semibold">You have no submitted applications yet.</p>
            <p className="text-xs text-slate-400 mt-1">Click "Apply Service" to initiate a document request.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {studentApps.slice(0, 3).map((app) => (
              <div
                key={app.id}
                onClick={() => goTo(`/student/applications/${app.id}`)}
                className="bg-white rounded-3xl border border-slate-200 hover:border-[#005CB9] hover:shadow-[0_8px_30px_rgba(0,92,185,0.04)] transition-all cursor-pointer p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm text-left"
              >
                <div className="space-y-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#005CB9] uppercase">{app.id}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-[#64748B] font-bold">{app.submissionDate}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#1E293B] font-sans">{app.serviceType}</h4>
                  <p className="text-slate-500 text-[11px] font-semibold italic">Attached file: {app.documentName}</p>
                </div>
                <div className="shrink-0 flex items-center justify-between w-full sm:w-auto">
                  {getStatusBadge(app.status)}
                </div>
              </div>
            ))}

            {studentApps.length > 3 && (
              <button
                onClick={() => goTo('/student/applications')}
                className="text-xs text-[#005CB9] font-bold hover:underline"
              >
                View all applications &times;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
