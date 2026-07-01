import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Check,
  X,
} from 'lucide-react';
import { Application } from '../../types';
import { useApplications } from '../../lib/applications';
import { useStudentProfile } from '../../lib/studentProfile';

export function getCountryFlag(nat: string) {
  const norm = nat.trim().toLowerCase();
  if (norm.includes('jepang') || norm.includes('japan') || norm.includes('jp')) return '🇯🇵';
  if (norm.includes('korea') || norm.includes('kr')) return '🇰🇷';
  if (norm.includes('thailand') || norm.includes('thai') || norm.includes('th')) return '🇹🇭';
  if (norm.includes('indonesia') || norm.includes('id')) return '🇮🇩';
  if (norm.includes('usa') || norm.includes('america') || norm.includes('united states') || norm.includes('us')) return '🇺🇸';
  if (norm.includes('jerman') || norm.includes('germany') || norm.includes('de')) return '🇩🇪';
  if (norm.includes('china') || norm.includes('cn')) return '🇨🇳';
  if (norm.includes('malaysia') || norm.includes('my')) return '🇲🇾';
  if (norm.includes('singapore') || norm.includes('sg')) return '🇸🇬';
  if (norm.includes('vietnam') || norm.includes('vn')) return '🇻🇳';
  if (norm.includes('philippines') || norm.includes('ph')) return '🇵🇭';
  return '🏳️';
}

export function getStatusBadge(status: string) {
  switch (status) {
    case 'Disetujui':
      return (
        <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Completed (Disetujui)</span>
        </span>
      );
    case 'Verified':
      return (
        <span className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
          <Check className="w-3.5 h-3.5 text-blue-600" />
          <span>Verified (Processing)</span>
        </span>
      );
    case 'Diproses':
      return (
        <span className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Processing (Diproses)</span>
        </span>
      );
    case 'Ditolak':
      return (
        <span className="inline-flex items-center space-x-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
          <XCircle className="w-3.5 h-3.5 text-red-600" />
          <span>Rejected (Ditolak)</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center space-x-1.5 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-250">
          <AlertCircle className="w-3.5 h-3.5 text-yellow-600" />
          <span>Pending</span>
        </span>
      );
  }
}

export function useStudentApps(): Application[] {
  const { applications } = useApplications();
  const { profile } = useStudentProfile();
  return applications.filter(
    (app) => app.nim === profile.nim || app.studentName.toLowerCase() === profile.name.toLowerCase()
  );
}

export function downloadSupportLetter(app: Application) {
  const content = `================================================
KANTOR URUSAN INTERNASIONAL
INSTITUT TEKNOLOGI ADHI TAMA SURABAYA (ITATS)
Jalan Arief Rachman Hakim No. 100, Surabaya
================================================

SURAT REKOMENDASI SPONSORSHIP / RECOMMENDATION LETTER
Nomor Surat: KUI-ITATS/SPONSOR/${app.id}/${new Date().getFullYear()}

Dengan ini Kantor Urusan Internasional ITATS menyatakan dukungan penuh untuk:
Nama Lengkap      : ${app.studentName}
NIM / NPM Student : ${app.nim}
Kebangsaan        : ${app.nationality}
Nomor Paspor      : ${app.passportNumber}

Untuk pengajuan layanan administrasi:
Jenis Permohonan  : ${app.serviceType}
Tanggal Pengajuan : ${app.submissionDate}
Status Verifikasi : DISETUJUI / APPROVED oleh Administrator KUI ITATS

File Lampiran     : ${app.documentName}
Catatan Operator  : ${app.operatorNotes || 'Sesuai dengan ketentuan imigrasi.'}

Dokumen ini sah dikeluarkan oleh Sistem Administrasi Digital KUI ITATS Surabaya.
Generated At      : ${new Date().toISOString()}
================================================`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Sponsor_Letter_KUI_ITATS_${app.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function ProgressTracker({ status }: { status: string }) {
  let currentStageIndex = 1;
  if (status === 'Verified') currentStageIndex = 2;
  else if (status === 'Diproses') currentStageIndex = 3;
  else if (status === 'Disetujui') currentStageIndex = 4;

  const getStageState = (stageNum: number) => {
    if (status === 'Ditolak') {
      if (stageNum < 3) return 'completed';
      if (stageNum === 3) return 'failed';
      return 'upcoming';
    }
    if (stageNum < currentStageIndex) return 'completed';
    if (stageNum === currentStageIndex) {
      if (currentStageIndex === 4) return 'completed';
      return 'active';
    }
    return 'upcoming';
  };

  const stages = [
    { num: 1, labelEn: 'Submitted', labelId: 'Dikirim' },
    { num: 2, labelEn: 'Verified', labelId: 'Diverifikasi' },
    { num: 3, labelEn: 'Processing', labelId: 'Diproses' },
    { num: 4, labelEn: 'Completed', labelId: 'Selesai' },
  ];

  let progressPercentage = 0;
  if (status === 'Ditolak') progressPercentage = 66;
  else if (currentStageIndex === 1) progressPercentage = 0;
  else if (currentStageIndex === 2) progressPercentage = 33;
  else if (currentStageIndex === 3) progressPercentage = 66;
  else if (currentStageIndex === 4) progressPercentage = 100;

  return (
    <div className="w-full py-4 text-left">
      <div className="bg-[#005CB9]/5 border border-[#005CB9]/10 rounded-2xl p-4 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] block">
            Current Status / Status Sekarang
          </span>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              status === 'Disetujui' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
              status === 'Ditolak' ? 'bg-rose-500' :
              status === 'Diproses' ? 'bg-[#005CB9] animate-pulse' :
              status === 'Verified' ? 'bg-[#005CB9] animate-pulse' :
              'bg-amber-500 animate-pulse'
            }`} />
            <span className="text-sm font-extrabold text-slate-800">
              {status === 'Pending' && 'Submitted (Dikirim)'}
              {status === 'Verified' && 'Verified by Office (Diverifikasi)'}
              {status === 'Diproses' && 'Processing Queue (Diproses)'}
              {status === 'Disetujui' && 'Completed Successfully (Selesai)'}
              {status === 'Ditolak' && 'Action Required / Rejected (Ditolak)'}
            </span>
          </div>
        </div>
        <div className="space-y-1 md:text-right border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#64748B] block">
            Estimated Completion / Estimasi Selesai
          </span>
          <span className="text-xs font-black text-slate-700 block">
            {status === 'Pending' && '1 Working Day (Review)'}
            {status === 'Verified' && '1-2 Working Days'}
            {status === 'Diproses' && '2-3 Working Days'}
            {status === 'Disetujui' && 'Selesai (Instant Download)'}
            {status === 'Ditolak' && 'Awaiting correction re-submission'}
          </span>
        </div>
      </div>

      {status === 'Disetujui' && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
          <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">Application Completed Successfully</h4>
          <p className="text-[11px] text-slate-600 font-bold max-w-sm mx-auto">
            Your official sponsor certificate has been verified, approved and issued by the KUI Office.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between relative max-w-xl mx-auto px-1 py-4">
        <div className="absolute left-[8%] right-[8%] top-[34px] h-[3px] bg-slate-200 z-0">
          <div
            className="h-full bg-[#005CB9] transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {stages.map((stage) => {
          const state = getStageState(stage.num);
          return (
            <div key={stage.num} className="z-10 flex flex-col items-center flex-1 text-center">
              <div className="relative">
                {state === 'active' && (
                  <span className="absolute -inset-1.5 rounded-full bg-[#005CB9]/25 animate-ping opacity-75"></span>
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 relative ${
                  state === 'completed'
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : state === 'active'
                    ? 'bg-[#005CB9] border-[#005CB9] text-white shadow-[0_0_12px_rgba(0,92,185,0.45)] border-t-[#F4D000]'
                    : state === 'failed'
                    ? 'bg-rose-500 border-rose-500 text-white shadow-[#FF0000]/10 shadow-md'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {state === 'completed' ? (
                    <Check className="w-5 h-5 text-white stroke-[3.5]" />
                  ) : state === 'failed' ? (
                    <X className="w-5 h-5 text-white stroke-[3]" />
                  ) : (
                    <span>{stage.num}</span>
                  )}
                </div>
              </div>

              <span className={`text-[10px] font-sans font-black uppercase tracking-wider block mt-3 ${
                state === 'active' ? 'text-[#005CB9]' : state === 'completed' ? 'text-emerald-600' : 'text-slate-500'
              }`}>
                {stage.num}. {stage.labelEn}
              </span>
              <span className="text-[9px] text-[#64748B] font-semibold block mt-0.5">
                {stage.labelId}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const STUDENT_NAV_ITEMS = [
  { to: '/student', label: 'Dashboard', icon: 'LayoutDashboard', match: 'dashboard' },
  { to: '/student/apply', label: 'Apply Service', icon: 'FilePlus', match: 'apply' },
  { to: '/student/requirements', label: 'Advisory & Requirements', icon: 'BookOpen', match: 'requirements' },
  { to: '/student/applications', label: 'My Applications', icon: 'Activity', match: 'applications' },
  { to: '/student/profile', label: 'Profile', icon: 'User', match: 'profile' },
] as const;
