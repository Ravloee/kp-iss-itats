import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  FilePlus,
  Activity,
  User,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Check,
  Upload,
  FileText,
  Menu,
  X,
  Bell,
  Download,
  ArrowRight,
  History,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  UserCheck,
  Globe,
  Mail,
  Search
} from 'lucide-react';
import { Application, ServiceType, StudentProfile } from '../types';
import { CAMPUS_SERVICES } from '../data';
import RequirementsPage from './RequirementsPage';

interface StudentDashboardProps {
  applications: Application[];
  onAddNewApplication: (newApp: Omit<Application, 'id' | 'submissionDate' | 'status'>) => void;
  onLogout: () => void;
  initialSelectedServiceTitle?: string;
  clearPreSelectedService?: () => void;
}

export default function StudentDashboard({
  applications,
  onAddNewApplication,
  onLogout,
  initialSelectedServiceTitle,
  clearPreSelectedService
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'apply' | 'status' | 'profile' | 'requirements'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'rejected'>('all');
  const [searchText, setSearchText] = useState('');
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  // Default student profile values (Japanese student Yuki Tanaka)
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Yuki Tanaka',
    nim: '14.2024.1.00010',
    NPM: '14.2024.1.00010',
    nationality: 'Jepang (Japan)',
    passportNumber: 'JP3371902',
    email: 'tanaka.yuki@itats.student.ac.id',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
  });

  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Form State
  const [fullName, setFullName] = useState(profile.name);
  const [studentId, setStudentId] = useState(profile.nim);
  const [nationality, setNationality] = useState(profile.nationality);
  const [passportNumber, setPassportNumber] = useState(profile.passportNumber);
  const [serviceType, setServiceType] = useState<ServiceType>('Surat Izin Belajar');
  const [documentName, setDocumentName] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (initialSelectedServiceTitle) {
      setServiceType(initialSelectedServiceTitle as ServiceType);
      setActiveTab('apply');
      setSuccessMessage(false);
      clearPreSelectedService?.();
    }
  }, [initialSelectedServiceTitle, clearPreSelectedService]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter student applications
  const studentApps = applications.filter(
    (app) => app.nim === profile.nim || app.studentName.toLowerCase() === profile.name.toLowerCase()
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentName(e.target.files[0].name);
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileEditing(false);
    setFullName(profile.name);
    setStudentId(profile.nim);
    setNationality(profile.nationality);
    setPassportNumber(profile.passportNumber);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentName) {
      alert('Please upload/attach the required documents.');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      onAddNewApplication({
        studentName: fullName,
        nim: studentId,
        nationality,
        passportNumber,
        serviceType,
        documentName,
        notes
      });
      setIsSubmitting(false);
      setSuccessMessage(true);
      // reset specific fields
      setDocumentName('');
      setNotes('');
    }, 850);
  };

  // Helper to resolve nationality flag emojis
  const getCountryFlag = (nat: string) => {
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
  };

  // Helper to get status badge styling
  const getStatusBadge = (status: string) => {
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
  };

  const handleDownloadSupportLetter = (app: Application) => {
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
  };

  const renderProgressTracker = (status: string) => {
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
      { num: 4, labelEn: 'Completed', labelId: 'Selesai' }
    ];

    // Compute progress track percentage
    let progressPercentage = 0;
    if (status === 'Ditolak') progressPercentage = 66;
    else if (currentStageIndex === 1) progressPercentage = 0;
    else if (currentStageIndex === 2) progressPercentage = 33;
    else if (currentStageIndex === 3) progressPercentage = 66;
    else if (currentStageIndex === 4) progressPercentage = 100;

    return (
      <div className="w-full py-4 text-left">
        {/* Dynamic Status Card */}
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

        {/* Happy/Normal Flow Message if Completed */}
        {status === 'Disetujui' && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">Application Completed Successfully</h4>
            <p className="text-[11px] text-slate-600 font-bold max-w-sm mx-auto">
              Your official sponsor certificate has been verified, approved and issued by the KUI Office.
            </p>
          </div>
        )}

        {/* Visual pipeline tracker */}
        <div className="flex items-center justify-between relative max-w-xl mx-auto px-1 py-4">
          
          {/* Connection Track Lines */}
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
                
                {/* Node representation with pulse effect */}
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
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 relative flex flex-col lg:flex-row text-slate-800 overflow-hidden">
      
      {/* Immersive Campus Background Image with smooth light overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.25]">
        <img
          src="https://itats.ac.id/kerjasama/wp-content/uploads/sites/27/2025/08/2024_03_20_14_15_IMG_2363-1-1-768x432.webp"
          alt="ITATS Campus Environment"
          className="w-full h-full object-cover scale-105 transform origin-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50" />
      </div>
      
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

        {/* Sidebar Menu Items */}
        <nav className="p-4 space-y-1">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#005CB9] text-white shadow-sm border-l-4 border-l-[#F4D000]'
                : 'text-slate-650 hover:bg-slate-200/50 hover:text-[#005CB9]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('apply');
              setSuccessMessage(false);
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'apply'
                ? 'bg-[#005CB9] text-white shadow-sm border-l-4 border-l-[#F4D000]'
                : 'text-slate-650 hover:bg-slate-200/50 hover:text-[#005CB9]'
            }`}
          >
            <FilePlus className="w-4 h-4 shrink-0" />
            <span>Apply Service</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('requirements');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'requirements'
                ? 'bg-[#005CB9] text-white shadow-sm border-l-4 border-l-[#F4D000]'
                : 'text-slate-650 hover:bg-slate-200/50 hover:text-[#005CB9]'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Advisory & Requirements</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('status');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'bg-[#005CB9] text-white shadow-sm border-l-4 border-l-[#F4D000]'
                : 'text-slate-650 hover:bg-slate-200/50 hover:text-[#005CB9]'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0" />
            <span>My Applications</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('profile');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#005CB9] text-white shadow-sm border-l-4 border-l-[#F4D000]'
                : 'text-slate-650 hover:bg-slate-200/50 hover:text-[#005CB9]'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Profile</span>
          </button>

          <hr className="my-4 border-slate-200" />

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onLogout();
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-650 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full relative z-10">
        
        {/* Universal Top Header with Notification Center Dropdown */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200/80">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50/70 px-2.5 py-1 rounded-md border border-blue-100">
              {activeTab === 'status' ? 'My Applications' : activeTab === 'requirements' ? 'Requirements' : activeTab === 'apply' ? 'Apply' : activeTab}
            </span>
            <div className="h-4 w-[1px] bg-slate-200" />
            <span className="text-[11px] text-slate-500 font-extrabold hidden sm:inline">ISS Portal • Surabaya</span>
          </div>
          
          <div className="relative">
            {/* Bell Trigger */}
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
            
            {/* Notification Dropdown Container */}
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
                        let alertBg = "bg-blue-50/45 border-blue-100/60 text-blue-800";
                        let statusText = "Submitted and queued for verification.";
                        if (app.status === 'Verified') {
                          alertBg = "bg-sky-55/40 border-sky-100/60 text-sky-800";
                          statusText = "Verified by KUI! Processing queue.";
                        } else if (app.status === 'Diproses') {
                          alertBg = "bg-blue-50/40 border-blue-100/60 text-blue-800";
                          statusText = "Currently in IMMIGRATION processing queue.";
                        } else if (app.status === 'Disetujui') {
                          alertBg = "bg-emerald-50/40 border-emerald-100/60 text-emerald-800";
                          statusText = "Approved! Recommendation letter is ready.";
                        } else if (app.status === 'Ditolak') {
                          alertBg = "bg-rose-50/40 border-rose-100/60 text-rose-800";
                          statusText = "Action required: Document rejected.";
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
                        setActiveTab('status');
                        setNotifDropdownOpen(false);
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

        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 text-left">
            {/* Simple Welcome Card */}
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
                    onClick={() => {
                      setActiveTab('apply');
                      setSuccessMessage(false);
                    }}
                    className="bg-[#005CB9] text-white hover:bg-[#005CB9]/95 text-xs font-extrabold px-6 py-3 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-[#F4D000]/10 border border-transparent hover:border-[#F4D000] cursor-pointer transition-all active:scale-95 animate-pulse"
                  >
                    Apply Service Now
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded bg-[#005CB9]" />
                <span className="font-sans">Pilihan Cepat • Quick Actions</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Action 1: Apply */}
                <button
                  onClick={() => {
                    setActiveTab('apply');
                    setSuccessMessage(false);
                  }}
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

                {/* Action 2: My Applications */}
                <button
                  onClick={() => setActiveTab('status')}
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

                {/* Action 3: Announcements */}
                <button
                  onClick={() => {
                    document.getElementById('announcements-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
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

                {/* Action 4: Profile */}
                <button
                  onClick={() => setActiveTab('profile')}
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

            {/* Notification Center */}
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
                    let alertBg = "bg-blue-50/40 text-blue-800 border-blue-100/50";
                    let statusText = "is successfully registered and is in pending verification.";
                    let icon = <Clock className="w-4 h-4 text-amber-500 shrink-0" />;

                    if (app.status === 'Verified') {
                      alertBg = "bg-blue-50/40 text-blue-800 border-blue-150/40";
                      statusText = "has been verified by KUI and is now being queued.";
                      icon = <Check className="w-4 h-4 text-blue-500 shrink-0" />;
                    } else if (app.status === 'Diproses') {
                      alertBg = "bg-blue-50/40 text-blue-800 border-blue-150/40";
                      statusText = "has been verified by KUI and is currently in IMMIGRATION processing queue.";
                      icon = <Activity className="w-4 h-4 text-blue-500 shrink-0 animate-pulse" />;
                    } else if (app.status === 'Disetujui') {
                      alertBg = "bg-emerald-50/40 text-emerald-800 border-emerald-150/40";
                      statusText = "has been APPROVED by KUI Office! Official sponsorship letter is ready for student download.";
                      icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
                    } else if (app.status === 'Ditolak') {
                      alertBg = "bg-rose-50/40 text-rose-850 border-rose-150/40";
                      statusText = `was rejected due to correction notes. Action required!`;
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

                {/* System-wide active administrative bulletin */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl border bg-slate-50 border-slate-200 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#F4D000] mt-1.5 shrink-0 shadow-sm shadow-[#F4D000]"></span>
                  <div className="flex-1 text-[#334155] text-left">
                    <span className="font-extrabold text-[#005CB9]">System Bulletin</span>: Immigration offices Surabaya are scheduled for holiday during June 15-18. Submit early.
                  </div>
                  <span className="text-[10px] text-slate-400 self-center font-mono whitespace-nowrap">2026-06-10</span>
                </div>
              </div>
            </div>

            {/* Announcements Section */}
            <div id="announcements-section" className="space-y-4 pt-2">
              <div className="flex items-center space-x-2 pb-1">
                <span className="w-2.5 h-2.5 rounded bg-[#F4D000] shadow-[0_0_8px_rgba(244,208,0,0.5)]" />
                <h3 className="text-base font-extrabold text-[#0F172A] font-sans">
                  Pusat Informasi & Pengumuman • Announcements
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Announcement 1 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#005CB9] transition-all relative flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="bg-red-50 text-red-700 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border border-red-200">
                        Urgent
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">July 10, 2026</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-[#0D172A] font-sans leading-snug">
                      Visa Extension Deadline
                    </h4>
                    <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                      Visa Extension submissions must be completed before July 25. Please gather and upload all letters early.
                    </p>
                  </div>
                </div>

                {/* Announcement 2 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#005CB9] transition-all relative flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="bg-amber-50 text-amber-700 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border border-amber-200">
                        Information
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">June 30, 2026</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-[#0D172A] font-sans leading-snug">
                      New Student Study Permit
                    </h4>
                    <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                      New international students must submit Study Permit documents before orientation starts.
                    </p>
                  </div>
                </div>

                {/* Announcement 3 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#005CB9] transition-all relative flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="bg-blue-50 text-[#005CB9] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border border-blue-100">
                        System Note
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">June 15, 2026</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-[#0D172A] font-sans leading-snug">
                      KITAS Renewal Queue Duration
                    </h4>
                    <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                      KITAS renewal may take 5-7 working days depending on immigration load. Plan accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#005CB9]" />
                  <span className="font-sans">Permohonan Terbaru • Recent Applications</span>
                </h3>
                <button 
                  onClick={() => setActiveTab('status')}
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
                      onClick={() => {
                        setSelectedAppId(app.id);
                        setActiveTab('status');
                      }}
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
                      onClick={() => setActiveTab('status')}
                      className="text-xs text-[#005CB9] font-bold hover:underline"
                    >
                      View all applications &times;
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. APPLY SERVICE TAB */}
        {activeTab === 'apply' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left">
            {!successMessage ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0F172A] font-sans">Single-Page Service Application</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the administrative application form below. Ensure all details exactly match your legal identity files.
                  </p>
                </div>

                <hr className="border-slate-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#334155] block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-1 focus:ring-itats-blue bg-white font-bold text-slate-800 text-xs"
                    />
                  </div>

                  {/* Student ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#334155] block">Student ID (NIM/NPM) *</label>
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-1 focus:ring-itats-blue bg-white font-bold text-slate-800 text-xs font-mono"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#334155] block">Nationality *</label>
                    <input
                      type="text"
                      required
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-1 focus:ring-itats-blue bg-white font-bold text-slate-800 text-xs"
                    />
                  </div>

                  {/* Passport Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#334155] block">Passport Number *</label>
                    <input
                      type="text"
                      required
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-1 focus:ring-itats-blue bg-white font-bold text-slate-800 text-xs font-mono uppercase"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#334155] block">Service Type Requested *</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as ServiceType)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-itats-blue bg-white text-slate-800 font-bold text-xs"
                  >
                    {CAMPUS_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title} ({srv.titleEn})
                      </option>
                    ))}
                  </select>

                  {/* Requirements Checklist Card */}
                  {(() => {
                    const selectedService = CAMPUS_SERVICES.find(srv => srv.title === serviceType);
                    return selectedService ? (
                      <div className="mt-3 bg-[#005CB9]/5 rounded-2xl p-4 border border-[#005CB9]/15 text-xs text-left">
                        <div className="flex items-center space-x-1.5 mb-2">
                          <span className="w-1.5 min-w-[6px] h-1.5 rounded-full bg-[#F4D000]"></span>
                          <span className="font-extrabold text-[#005CB9] uppercase tracking-wider text-[10px]">
                            Dokumen Persyaratan • {selectedService.titleEn} Checklist:
                          </span>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1 pl-0">
                          {selectedService.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-slate-705 font-bold">
                              <span className="text-[#F4D000] font-black text-sm leading-none shrink-0 shadow-sm shadow-[#F4D000]/10 font-mono">&#10003;</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] text-[#64748B] mt-2.5 border-t border-[#005CB9]/10 pt-2 font-semibold">
                          * Mohon gabungkan berkas di atas menjadi satu dokumen file PDF berkualitas tinggi sebelum mengunggah. (Please combine files above into a single PDF before uploading).
                        </p>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Document Upload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#334155] block">Upload Administrative Documents (PDF only) *</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#005CB9] rounded-2xl p-6 text-center cursor-pointer bg-slate-50 transition-colors"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">Click to choose files / raw pdf scans</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono">Accepts PDF files up to 10MB</p>
                    {documentName && (
                      <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg inline-flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold text-emerald-800">{documentName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#334155] block">Notes / Additional Information (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Provide additional details or passport expiration constraints..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-1 focus:ring-itats-blue bg-white text-xs"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#005CB9] text-white hover:bg-blue-700 font-extrabold text-xs py-3.5 rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center shadow-sm"
                >
                  {isSubmitting ? 'Submitting request...' : 'Submit Application'}
                </button>
              </form>
            ) : (
              <div className="py-12 px-6 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-[#005CB9]">Application Submitted!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Your immigration sponsorship files have been submitted successfully to the KUI Surabaya portal desk.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <button
                    onClick={() => setActiveTab('status')}
                    className="px-5 py-2.5 bg-[#005CB9] hover:bg-blue-750 text-white font-bold text-xs rounded-xl"
                  >
                    Track Status
                  </button>
                  <button
                    onClick={() => setSuccessMessage(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Submit New Request
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. MY APPLICATIONS TAB */}
        {activeTab === 'status' && (
          <div className="space-y-6 text-left">
            {selectedAppId === null ? (
              // ---------------- MAIN LIST VIEW ----------------
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0D172A] font-sans">Applications Status Monitor</h2>
                    <p className="text-xs text-[#64748B] mt-1 font-semibold">Verify decision letters, visual stage tracking, and operator review logs.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50 px-2.5 py-1 rounded border border-blue-100 self-start">
                    Total Files: {studentApps.length}
                  </span>
                </div>

                {studentApps.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-6 shadow-sm flex flex-col items-center justify-center">
                    <div className="w-14 h-14 bg-blue-50 text-[#005CB9] rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-sans">No applications logged yet</h3>
                    <p className="text-xs text-slate-500 mt-2 max-w-xs font-semibold">
                      You haven't initiated any study permit or visa sponsorship requests yet. Click the button below to start your first process.
                    </p>
                    <button
                      onClick={() => setActiveTab('apply')}
                      className="mt-5 bg-[#005CB9] hover:bg-blue-750 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      Initiate Document Application
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Search & Filter controls */}
                    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                      {/* Search Bar */}
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-[#005CB9] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search applications by Service Name or APP ID..."
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-[#005CB9]/20 focus:border-[#005CB9] outline-none transition-all shadow-sm"
                        />
                      </div>
                      
                      {/* Status Filter Chips / Buttons */}
                      <div className="flex flex-wrap items-center gap-2 bg-white/70 p-2 rounded-2xl border border-slate-300 shadow-sm">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2 shrink-0">
                          Filter Status:
                        </span>
                        {(['all', 'pending', 'processing', 'completed', 'rejected'] as const).map((filter) => {
                          const getStatusGroupLocal = (status: string) => {
                            const s = status.toLowerCase();
                            if (s === 'disetujui' || s === 'completed') return 'completed';
                            if (s === 'ditolak' || s === 'rejected') return 'rejected';
                            if (s === 'verified' || s === 'diproses' || s === 'processing') return 'processing';
                            return 'pending';
                          };

                          const count = filter === 'all' 
                            ? studentApps.length 
                            : studentApps.filter(app => getStatusGroupLocal(app.status) === filter).length;
                          
                          const isSelected = statusFilter === filter;
                          
                          const labelMap: Record<string, string> = {
                            all: "All",
                            pending: "Pending",
                            processing: "Processing",
                            completed: "Completed",
                            rejected: "Rejected"
                          };

                          return (
                            <button
                              key={filter}
                              onClick={() => setStatusFilter(filter)}
                              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#005CB9] text-white border-[#005CB9] shadow-md"
                                  : "bg-white border-slate-300 text-slate-700 hover:bg-blue-50/50"
                              }`}
                            >
                              <span>{labelMap[filter]}</span>
                              <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-black leading-none ${
                                isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-655"
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div> {/* End of Search & Filter Controls flex wrapper */}

                    {/* Applications Table */}
                    {(() => {
                      const getStatusGroupLocal = (status: string) => {
                        const s = status.toLowerCase();
                        if (s === 'disetujui' || s === 'completed') return 'completed';
                        if (s === 'ditolak' || s === 'rejected') return 'rejected';
                        if (s === 'verified' || s === 'diproses' || s === 'processing') return 'processing';
                        return 'pending';
                      };

                      const monitoredApps = studentApps.filter(app => {
                        const matchesStatus = statusFilter === 'all' || getStatusGroupLocal(app.status) === statusFilter;
                        const term = searchText.toLowerCase().trim();
                        if (!term) return matchesStatus;

                        // Map status for friendly search translations (English and Indonesian matchers)
                        const statusLower = app.status.toLowerCase();
                        let friendlyStatus = statusLower;
                        if (statusLower === 'disetujui') friendlyStatus = 'disetujui completed approved selesai';
                        else if (statusLower === 'ditolak') friendlyStatus = 'ditolak rejected denied';
                        else if (statusLower === 'diproses') friendlyStatus = 'diproses processing';
                        else if (statusLower === 'pending') friendlyStatus = 'pending submitted diajukan menunggu';
                        else if (statusLower === 'verified') friendlyStatus = 'verified terverifikasi';

                        const matchesSearch = 
                          app.serviceType.toLowerCase().includes(term) ||
                          app.id.toLowerCase().includes(term) ||
                          friendlyStatus.includes(term);

                        return matchesStatus && matchesSearch;
                      });

                      if (monitoredApps.length === 0) {
                        return (
                          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm flex flex-col items-center justify-center max-w-lg mx-auto my-6">
                            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                              <Search className="w-5 h-5 text-slate-500" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 font-sans">No applications found</h3>
                            <p className="text-xs text-slate-400 font-semibold mt-1 max-w-xs">
                              Try adjusting your search query, clearing filters, or resetting terms.
                            </p>
                            <button
                              onClick={() => {
                                setStatusFilter('all');
                                setSearchText('');
                              }}
                              className="mt-5 bg-[#005CB9]/10 text-[#005CB9] hover:bg-[#005CB9] hover:text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all border border-transparent cursor-pointer active:scale-95"
                            >
                              Clear Filters
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                          <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <History className="w-4 h-4 text-[#005CB9]" />
                              <h3 className="text-sm font-extrabold text-[#0D172A] font-sans">Daftar Pengajuan • My Applications History</h3>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400">Click a row to open detail view</span>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-100/70 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
                                  <th className="px-6 py-4 font-mono">ID Jurnal</th>
                                  <th className="px-6 py-4">Service Requested / Jenis Layanan</th>
                                  <th className="px-6 py-4">Submission Date</th>
                                  <th className="px-6 py-4">Status</th>
                                  <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                                {monitoredApps.map((app) => (
                                  <tr 
                                    key={app.id} 
                                    onClick={() => setSelectedAppId(app.id)}
                                    className="cursor-pointer hover:bg-blue-50/20 transition-all duration-150 group border-l-4 border-l-transparent hover:border-l-[#005CB9]"
                                  >
                                    <td className="px-6 py-4.5 font-mono font-extrabold text-[#005CB9]">{app.id}</td>
                                    <td className="px-6 py-4.5">
                                      <span className="text-[#0F172A] font-black block text-sm">
                                        {app.serviceType}
                                      </span>
                                      <span className="text-[10px] text-slate-400 font-bold font-mono block mt-0.5 uppercase tracking-wide">
                                        Document Reference
                                      </span>
                                    </td>
                                    <td className="px-6 py-4.5 text-slate-500 font-mono">{app.submissionDate}</td>
                                    <td className="px-6 py-4.5">{getStatusBadge(app.status)}</td>
                                    <td className="px-6 py-4.5 text-right">
                                      <button className="inline-flex items-center space-x-1 text-xs text-[#005CB9] font-black bg-slate-50 group-hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-slate-150/80 group-hover:border-[#005CB9]/30">
                                        <span>View Details</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              // ---------------- DEDICATED DETAIL PAGE VIEW ----------------
              (() => {
                const activeApp = studentApps.find(app => app.id === selectedAppId);
                if (!activeApp) {
                  // Fallback in case of invalid ID
                  return (
                    <div className="text-center py-6">
                      <p className="text-sm font-semibold text-slate-500">Selected application not found.</p>
                      <button onClick={() => setSelectedAppId(null)} className="mt-2 text-xs text-[#005CB9] font-bold underline">
                        Back to list
                      </button>
                    </div>
                  );
                }

                // Get estimation note
                let estimationNote = "1 Working Day (Review)";
                if (activeApp.status === "Verified") estimationNote = "1-2 Working Days";
                if (activeApp.status === "Diproses") estimationNote = "2-3 Working Days (Immigration Stage)";
                if (activeApp.status === "Disetujui") estimationNote = "Completed Successfully (Instant Download)";
                if (activeApp.status === "Ditolak") estimationNote = "Awaiting Correction & Re-submission";

                return (
                  <div className="space-y-6">
                    {/* Top Action Ribbon / Back Navigation */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <button
                        onClick={() => setSelectedAppId(null)}
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

                    {/* Main Title & Status Header Card */}
                    <div className="bg-white rounded-3xl border border-slate-205 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] font-extrabold text-[#005CB9] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-105">
                            JOURNAL #{activeApp.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">&#8212; Submitted on {activeApp.submissionDate}</span>
                        </div>
                        <h2 className="text-xl font-black text-slate-900 font-sans tracking-tight">
                          {activeApp.serviceType}
                        </h2>
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

                    {/* Immigration Pipeline map card (Full Width) */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left">
                      <div className="border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-[#005CB9]" />
                          <h3 className="text-sm font-black text-slate-800 font-sans uppercase tracking-wider">
                            Immigration Pipeline Map
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#005CB9] bg-blue-50 px-2.5 py-0.5 rounded">
                          Live Progress Tracker
                        </span>
                      </div>
                      {renderProgressTracker(activeApp.status)}
                    </div>

                    {/* Two Column Layout for detail metrics & operator notes */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left Side: Metadata & Documents Card (lg:col-span-8) */}
                      <div className="lg:col-span-8 space-y-6">
                        
                        {/* Summary Metrics Grid */}
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

                        {/* Uploaded Documents Attachment Card */}
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
                                <span className="text-xs font-black text-slate-800 block truncate leading-tight">
                                  {activeApp.documentName}
                                </span>
                                <span className="text-[10px] text-slate-400 block font-semibold mt-0.5 font-mono">
                                  PDF Scanner Draft • Certified Digital Copy
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                // Simulate attachment preview alert
                                const dummyLink = document.createElement('a');
                                dummyLink.href = '#';
                                alert(`Opening secure attachment preview for: ${activeApp.documentName}\n\nDisclaimer: In real production, this links securely with read-only authorization bounds via the Cloud Storage bucket.`);
                              }}
                              className="px-4 py-2 bg-white text-[#005CB9] hover:bg-[#005CB9]/5 border border-slate-200 hover:border-[#005CB9] font-black text-xs rounded-xl cursor-pointer transition-all shrink-0"
                            >
                              View Scan
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Right Side: Operator Notes & Signed Actions (lg:col-span-4) */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* Operator Notes Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-left">
                          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center space-x-2">
                            <UserCheck className="w-4 h-4 text-[#005CB9]" />
                            <span>Operator Decision Notes</span>
                          </h3>

                          {activeApp.operatorNotes ? (
                            <div className="bg-amber-50/55 p-4 rounded-2xl border-l-4 border-l-[#F4D000] border-y border-r border-amber-200/50 space-y-2">
                              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-amber-800 uppercase block mb-1">
                                <span>OFFICIAL ISS OPERATOR:</span>
                                <span>{activeApp.verificationDate || "Verified Recently"}</span>
                              </div>
                              <p className="text-xs text-slate-800 font-extrabold leading-relaxed">
                                "{activeApp.operatorNotes}"
                              </p>
                            </div>
                          ) : (
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                              <p className="text-xs font-semibold text-slate-400 py-3">
                                No feedback notes entered by the ISS operator yet. The application is in active review queue.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Approved Actions Card (Only active when 'Disetujui' / Approved/Completed) */}
                        {activeApp.status === 'Disetujui' && (
                          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white rounded-3xl p-6 shadow-md space-y-4 text-left">
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-mono font-black text-emerald-100 tracking-wider">
                                APPROVED & APPROVED CERTIFICATE READY
                              </span>
                              <h4 className="text-sm sm:text-base font-black font-sans leading-none">
                                Download Reference Letter
                              </h4>
                              <p className="text-emerald-100 text-[10px] font-medium leading-relaxed pt-1.5">
                                Your official certified sponsorship recommendation letter has been compiled, digitally signed, and logged automatically. Use the physical file for immigration offices.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownloadSupportLetter(activeApp)}
                              className="w-full bg-[#F4D000] hover:bg-yellow-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                            >
                              <Download className="w-4 h-4 text-slate-900 stroke-[3.5]" />
                              <span>Download Letter (PDF)</span>
                            </button>
                          </div>
                        )}

                        {/* Support Card */}
                        <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3.5 text-left">
                          <div className="space-y-1">
                            <h4 className="text-xs font-black font-sans uppercase text-[#F4D000]">Need Administrative Help?</h4>
                            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                              If you submit data modifications or experience any legal immigration queue delay, contact our office directly.
                            </p>
                          </div>
                          
                          <button
                            onClick={() => {
                              setSelectedAppId(null);
                              setActiveTab('dashboard');
                              setTimeout(() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                              }, 150);
                            }}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-white text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer text-center"
                          >
                            Hubungi Loket ISS
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* REQUIREMENTS ADVISORY GUIDE TAB */}
        {activeTab === 'requirements' && (
          <div className="space-y-6 text-left">
            <RequirementsPage
              currentRole="student"
              compact={true}
              onApplyService={(serviceTitle) => {
                setServiceType(serviceTitle as ServiceType);
                setActiveTab('apply');
                setSuccessMessage(false);
              }}
              onBack={() => setActiveTab('dashboard')}
            />
          </div>
        )}

        {/* 4. PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6 text-left">
            {!isProfileEditing ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN: SECTION 1 (Student Profile Card) & SECTION 3 (Account Info) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* SECTION 1: Student Profile Card */}
                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    {/* Visual Card Banner with ITATS Blue & Yellow Highlights */}
                    <div className="bg-gradient-to-r from-[#005CB9] to-blue-700 h-24 relative">
                      <div className="absolute top-4 right-4 bg-[#F4D000] text-slate-950 text-[9px] font-mono font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                        ITS-VALIDAT
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#005CB9]/50 via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="px-6 pb-6 pt-0 text-center relative -mt-12">
                      {/* Avatar container */}
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

                      {/* Name & NIM display */}
                      <div className="mt-3.5 space-y-1">
                        <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">{profile.name}</h3>
                        <p className="text-xs font-mono font-extrabold text-[#005CB9] tracking-tight">
                          NIM • {profile.nim}
                        </p>
                      </div>

                      {/* International Student Badge */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center">
                        <div className="inline-flex items-center space-x-2 bg-[#005CB9] hover:bg-blue-700 text-white px-4 py-2.5 rounded-2xl text-[11px] font-black shadow-md shadow-blue-500/15 border-l-4 border-l-[#F4D000] select-none transition-all">
                          <Globe className="w-4 h-4 text-[#F4D000] shrink-0" />
                          <span className="tracking-wide uppercase font-mono">International Scholar</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Account Information */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-1">
                      <UserCheck className="w-4 h-4 text-[#005CB9]" />
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                        Account Information
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                      {/* Account Status Card */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between border-l-4 border-l-emerald-500 text-left">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Account Status</span>
                          <span className="text-xs font-black text-emerald-700">Active / Terdaftar</span>
                        </div>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse mr-2" />
                      </div>

                      {/* Last Login Card */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between border-l-4 border-l-[#005CB9] text-left">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Last Portal Session</span>
                          <span className="text-xs font-black text-slate-850 font-mono">Today, 08:30 AM</span>
                        </div>
                        <Clock className="w-4 h-4 text-blue-500 mr-1.5" />
                      </div>

                      {/* Registration Date Card */}
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

                {/* RIGHT COLUMN: SECTION 2 (Personal Information Card) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* SECTION 2: Personal Information Card */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900 font-sans uppercase tracking-wide">
                          Student Identity Credentials
                        </h3>
                        <p className="text-[11px] text-[#64748B] font-semibold">
                          Verified database registry of the International Student Services.
                        </p>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#005CB9] bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
                        SECURE ID
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Full Name field */}
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                        <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Full Name</span>
                          <span className="text-xs font-black text-slate-800 block truncate">{profile.name}</span>
                        </div>
                      </div>

                      {/* Student ID field */}
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                        <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Student ID (NIM)</span>
                          <span className="text-xs font-bold font-mono text-slate-800 block truncate">{profile.nim}</span>
                        </div>
                      </div>

                      {/* Nationality field */}
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                        <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Nationality</span>
                          <span className="text-xs font-black text-slate-800 flex items-center space-x-1.5 min-w-0">
                            <span className="text-base shrink-0 select-none">{getCountryFlag(profile.nationality)}</span>
                            <span className="block truncate">{profile.nationality}</span>
                          </span>
                        </div>
                      </div>

                      {/* Passport Number field */}
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors">
                        <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Passport Number</span>
                          <span className="text-xs font-bold font-mono uppercase text-slate-800 block truncate">{profile.passportNumber}</span>
                        </div>
                      </div>

                      {/* Email Address field */}
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex items-start space-x-3.5 hover:bg-slate-100 transition-colors sm:col-span-2">
                        <div className="p-2 bg-blue-50 text-[#005CB9] rounded-xl">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Email Address</span>
                          <span className="text-xs font-bold font-mono text-slate-800 block truncate">{profile.email}</span>
                        </div>
                      </div>

                    </div>

                    {/* Action Button Strip */}
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
            ) : (
              /* Profile Editing Form View */
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-black text-slate-900 font-sans uppercase tracking-wide">
                    Update Student Profile details
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    Correct any administrative details below. Click Save to log the modified profile credentials.
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Name */}
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

                    {/* Nationality input */}
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

                    {/* Passport Number */}
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

                    {/* Email */}
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
            )}
          </div>
        )}
      </main>
    </div>
  );
}
