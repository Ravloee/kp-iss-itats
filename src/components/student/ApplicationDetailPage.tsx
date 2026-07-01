import {
  ArrowLeft,
  User,
  Clock,
  FileText,
  BookOpen,
  UserCheck,
  Download,
  Activity,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useStudentApps, getStatusBadge, ProgressTracker, downloadSupportLetter } from './shared';

export default function ApplicationDetailPage({ appId }: { appId: string }) {
  const studentApps = useStudentApps();
  const navigate = useNavigate();
  const activeApp = studentApps.find((app) => app.id === appId);

  if (!activeApp) {
    return (
      <div className="text-center py-6">
        <p className="text-sm font-semibold text-slate-500">Selected application not found.</p>
        <button
          onClick={() => navigate({ to: '/student/applications' })}
          className="mt-2 text-xs text-[#005CB9] font-bold underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  let estimationNote = '1 Working Day (Review)';
  if (activeApp.status === 'Verified') estimationNote = '1-2 Working Days';
  if (activeApp.status === 'Diproses') estimationNote = '2-3 Working Days (Immigration Stage)';
  if (activeApp.status === 'Disetujui') estimationNote = 'Completed Successfully (Instant Download)';
  if (activeApp.status === 'Ditolak') estimationNote = 'Awaiting Correction & Re-submission';

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          onClick={() => navigate({ to: '/student/applications' })}
          className="inline-flex items-center space-x-2 text-xs font-black text-[#005CB9] hover:text-blue-700 transition-colors uppercase tracking-wider font-mono cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to My Applications List</span>
        </button>

        <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-slate-400">
          <span>ISS-ITATS Portal</span>
          <span>•</span>
          <span>Official Track Journal No: {activeApp.id}</span>
        </div>
      </div>

      {/* Title & Status Header */}
      <div className="bg-white rounded-3xl border border-slate-205 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-extrabold text-[#005CB9] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-105">
              JOURNAL #{activeApp.id}
            </span>
            <span className="text-[10px] text-slate-400 font-bold">&#8212; Submitted on {activeApp.submissionDate}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 font-sans tracking-tight">{activeApp.serviceType}</h2>
          <p className="text-slate-500 text-xs font-bold flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Applicant: {activeApp.studentName} ({activeApp.nim})</span>
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 shrink-0">
          <div className="space-y-0.5 text-right">
            <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block tracking-wider">Status</span>
            {getStatusBadge(activeApp.status)}
          </div>
        </div>
      </div>

      {/* Pipeline Map */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left">
        <div className="border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#005CB9]" />
            <h3 className="text-sm font-black text-slate-800 font-sans uppercase tracking-wider">Immigration Pipeline Map</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#005CB9] bg-blue-50 px-2.5 py-0.5 rounded">Live Progress Tracker</span>
        </div>
        <ProgressTracker status={activeApp.status} />
      </div>

      {/* Two-column detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Metadata & Documents */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 text-left">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest px-1 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#005CB9]" />
              <span>Application Metadata & Estimates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase mb-1">Application ID</span>
                <span className="text-xs font-black text-slate-800 font-mono tracking-wider">{activeApp.id}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase mb-1">Service Type Requested</span>
                <span className="text-xs font-black text-slate-800">{activeApp.serviceType}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase mb-1">Submission Date</span>
                <span className="text-xs font-black text-slate-800 font-mono">{activeApp.submissionDate}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase mb-1">Estimated Completion Time</span>
                <span className="text-xs font-black text-[#005CB9] flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{estimationNote}</span>
                </span>
              </div>
            </div>

            {activeApp.notes && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase mb-1">Your Submission Notes / Remarks:</span>
                <p className="text-xs text-slate-700 font-semibold italic">"{activeApp.notes}"</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#005CB9]" />
                <span>UPLOADED DOCUMENTS & FILE ATTACHMENTS</span>
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Encrypted & Secure
              </span>
            </div>

            <div className="bg-slate-50 hover:bg-slate-100/75 transition-all p-4 rounded-2xl border border-slate-150 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="p-3 bg-red-50 text-red-650 rounded-xl shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black text-slate-800 block truncate leading-tight">{activeApp.documentName}</span>
                  <span className="text-[10px] text-slate-400 block font-semibold mt-0.5 font-mono">PDF Scanner Draft • Certified Digital Copy</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert(`Opening secure attachment preview for: ${activeApp.documentName}\n\nDisclaimer: In real production, this links securely with read-only authorization bounds via the Cloud Storage bucket.`);
                }}
                className="px-4 py-2 bg-white text-[#005CB9] hover:bg-[#005CB9]/5 border border-slate-200 hover:border-[#005CB9] font-black text-xs rounded-xl cursor-pointer transition-all shrink-0"
              >
                View Scan
              </button>
            </div>
          </div>
        </div>

        {/* Right: Operator Notes & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-left">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-[#005CB9]" />
              <span>Operator Decision Notes</span>
            </h3>

            {activeApp.operatorNotes ? (
              <div className="bg-amber-50/55 p-4 rounded-2xl border-l-4 border-l-[#F4D000] border-y border-r border-amber-200/50 space-y-2">
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-amber-800 uppercase block mb-1">
                  <span>OFFICIAL ISS OPERATOR:</span>
                  <span>{activeApp.verificationDate || 'Verified Recently'}</span>
                </div>
                <p className="text-xs text-slate-800 font-extrabold leading-relaxed">"{activeApp.operatorNotes}"</p>
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <p className="text-xs font-semibold text-slate-400 py-3">
                  No feedback notes entered by the ISS operator yet. The application is in active review queue.
                </p>
              </div>
            )}
          </div>

          {activeApp.status === 'Disetujui' && (
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white rounded-3xl p-6 shadow-md space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-black text-emerald-100 tracking-wider">
                  APPROVED & APPROVED CERTIFICATE READY
                </span>
                <h4 className="text-sm sm:text-base font-black font-sans leading-none">Download Reference Letter</h4>
                <p className="text-emerald-100 text-[10px] font-medium leading-relaxed pt-1.5">
                  Your official certified sponsorship recommendation letter has been compiled, digitally signed, and logged automatically. Use the physical file for immigration offices.
                </p>
              </div>

              <button
                type="button"
                onClick={() => downloadSupportLetter(activeApp)}
                className="w-full bg-[#F4D000] hover:bg-yellow-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-slate-900 stroke-[3.5]" />
                <span>Download Letter (PDF)</span>
              </button>
            </div>
          )}

          <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3.5 text-left">
            <div className="space-y-1">
              <h4 className="text-xs font-black font-sans uppercase text-[#F4D000]">Need Administrative Help?</h4>
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                If you submit data modifications or experience any legal immigration queue delay, contact our office directly.
              </p>
            </div>

            <button
              onClick={() => navigate({ to: '/student' })}
              className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-white text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer text-center"
            >
              Hubungi Loket ISS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
