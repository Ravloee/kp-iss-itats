import { useState } from 'react';
import { Bell, Clock, Check, CheckCircle2, XCircle, AlertCircle, Activity } from 'lucide-react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useStudentApps } from './shared';

export default function StudentTopHeader({ sectionLabel }: { sectionLabel: string }) {
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const studentApps = useStudentApps();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200/80">
      <div className="flex items-center space-x-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50/70 px-2.5 py-1 rounded-md border border-blue-100">
          {sectionLabel}
        </span>
        <div className="h-4 w-[1px] bg-slate-200" />
        <span className="text-[11px] text-slate-500 font-extrabold hidden sm:inline">ISS Portal • Surabaya</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 hover:text-[#005CB9] relative cursor-pointer flex items-center justify-center shadow-sm"
        >
          <Bell className="w-4.5 h-4.5" />
          {studentApps.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 animate-pulse border-2 border-white shadow-sm">
              {studentApps.length}
            </span>
          )}
        </button>

        {notifDropdownOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setNotifDropdownOpen(false)} />
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-xl p-5 z-50 text-left animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-[#005CB9]" />
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Recent Activity Logs</h4>
                </div>
                <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md font-mono">
                  {studentApps.length} ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {studentApps.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-6 font-medium">
                    No notifications found for your account.
                  </div>
                ) : (
                  studentApps.map((app) => {
                    let alertBg = 'bg-blue-50/45 border-blue-100/60 text-blue-800';
                    let statusText = 'Submitted and queued for verification.';
                    if (app.status === 'Verified') {
                      alertBg = 'bg-sky-55/40 border-sky-100/60 text-sky-800';
                      statusText = 'Verified by KUI! Processing queue.';
                    } else if (app.status === 'Diproses') {
                      alertBg = 'bg-blue-50/40 border-blue-100/60 text-blue-800';
                      statusText = 'Currently in IMMIGRATION processing queue.';
                    } else if (app.status === 'Disetujui') {
                      alertBg = 'bg-emerald-50/40 border-emerald-100/60 text-emerald-800';
                      statusText = 'Approved! Recommendation letter is ready.';
                    } else if (app.status === 'Ditolak') {
                      alertBg = 'bg-rose-50/40 border-rose-100/60 text-rose-800';
                      statusText = 'Action required: Document rejected.';
                    }
                    return (
                      <div key={`dropnotif-${app.id}`} className={`p-3 rounded-2xl border ${alertBg} text-[11px] font-semibold space-y-1`}>
                        <div className="flex items-center justify-between">
                          <span className="font-black font-mono text-[#005CB9]">{app.id}</span>
                          <span className="text-[8.5px] font-mono text-slate-400 font-extrabold">{app.submissionDate}</span>
                        </div>
                        <p className="text-slate-600 font-medium">
                          Your <span className="font-extrabold">{app.serviceType}</span> is <span className="underline">{statusText}</span>
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setNotifDropdownOpen(false);
                    if (location.pathname !== '/student/applications') {
                      navigate({ to: '/student/applications' });
                    }
                  }}
                  className="text-[#005CB9] hover:underline text-[10px] uppercase font-black tracking-wider block"
                >
                  View All Submissions
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Export the Notification Center block used on the dashboard page
export function NotificationCenter() {
  const studentApps = useStudentApps();
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
        <Bell className="w-5 h-5 text-[#005CB9]" />
        <h3 className="text-base font-extrabold text-[#0D172A] font-sans">
          Pusat Pemberitahuan • Notification Center
        </h3>
        <span className="w-2 h-2 rounded-full bg-[#F4D000] animate-ping shrink-0 ml-1"></span>
      </div>
      <div className="space-y-3">
        {studentApps.length === 0 ? (
          <div className="text-xs text-slate-500 italic py-2">No notifications found for your submissions.</div>
        ) : (
          studentApps.map((app) => {
            let alertBg = 'bg-blue-50/40 text-blue-800 border-blue-100/50';
            let statusText = 'is successfully registered and is in pending verification.';
            let icon = <Clock className="w-4 h-4 text-amber-500 shrink-0" />;

            if (app.status === 'Verified') {
              alertBg = 'bg-blue-50/40 text-blue-800 border-blue-150/40';
              statusText = 'has been verified by KUI and is now being queued.';
              icon = <Check className="w-4 h-4 text-blue-500 shrink-0" />;
            } else if (app.status === 'Diproses') {
              alertBg = 'bg-blue-50/40 text-blue-800 border-blue-150/40';
              statusText = 'has been verified by KUI and is currently in IMMIGRATION processing queue.';
              icon = <Activity className="w-4 h-4 text-blue-500 shrink-0 animate-pulse" />;
            } else if (app.status === 'Disetujui') {
              alertBg = 'bg-emerald-50/40 text-emerald-800 border-emerald-150/40';
              statusText = 'has been APPROVED by KUI Office! Official sponsorship letter is ready for student download.';
              icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
            } else if (app.status === 'Ditolak') {
              alertBg = 'bg-rose-50/40 text-rose-850 border-rose-150/40';
              statusText = 'was rejected due to correction notes. Action required!';
              icon = <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
            }

            return (
              <div key={`notif-${app.id}`} className={`flex items-start gap-3 p-3.5 rounded-2xl border ${alertBg} text-xs font-semibold`}>
                {icon}
                <div className="flex-1 text-slate-700">
                  <span className="font-extrabold font-mono text-[#005CB9]">{app.id}</span>: Your request for <span className="font-bold underline text-slate-900">{app.serviceType}</span> {statusText}
                </div>
                <span className="text-[10px] text-slate-400 self-center font-mono whitespace-nowrap">{app.submissionDate}</span>
              </div>
            );
          })
        )}

        <div className="flex items-start gap-3 p-3.5 rounded-2xl border bg-slate-50 border-slate-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#F4D000] mt-1.5 shrink-0 shadow-sm shadow-[#F4D000]"></span>
          <div className="flex-1 text-[#334155] text-left">
            <span className="font-extrabold text-[#005CB9]">System Bulletin</span>: Immigration offices Surabaya are scheduled for holiday during June 15-18. Submit early.
          </div>
          <span className="text-[10px] text-slate-400 self-center font-mono whitespace-nowrap">2026-06-10</span>
        </div>
      </div>
    </div>
  );
}
