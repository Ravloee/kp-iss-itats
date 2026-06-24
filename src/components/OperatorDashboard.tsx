import { useState } from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  CheckCircle2,
  Menu,
  X,
  FileText,
  Activity,
  Bell
} from 'lucide-react';
import { Application, ApplicationStatus } from '../types';
import { useAuth } from '../lib/auth';
import { useApplications } from '../lib/applications';

export default function OperatorDashboard() {
  const { logout } = useAuth();
  const { applications, updateStatus } = useApplications();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'students'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  
  // Selected application state for detail view
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  
  // Operator decision note state
  const [operatorNotes, setOperatorNotes] = useState('');
  const [decisionSuccess, setDecisionSuccess] = useState(false);

  // Status counters
  const pendingCount = applications.filter((app) => app.status === 'Pending').length;
  const processingCount = applications.filter((app) => app.status === 'Diproses').length;
  const approvedCount = applications.filter((app) => app.status === 'Disetujui').length;
  const rejectedCount = applications.filter((app) => app.status === 'Ditolak').length;

  // Filter application list based on search and status
  const filteredApps = applications.filter((app) => {
    // 1. Status Filter
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      const s = app.status.toLowerCase();
      if (statusFilter === 'pending') matchesStatus = s === 'pending';
      else if (statusFilter === 'verified') matchesStatus = s === 'verified';
      else if (statusFilter === 'processing') matchesStatus = s === 'diproses';
      else if (statusFilter === 'completed') matchesStatus = s === 'disetujui';
      else if (statusFilter === 'rejected') matchesStatus = s === 'ditolak';
    }

    // 2. Search query
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      app.studentName.toLowerCase().includes(query) ||
      app.id.toLowerCase().includes(query) ||
      app.serviceType.toLowerCase().includes(query) ||
      app.nim.includes(query);

    return matchesStatus && matchesSearch;
  });

  // Extract unique students for "Student Data"
  const studentMap = new Map<string, { name: string; nim: string; nationality: string; passport: string }>();
  applications.forEach((app) => {
    if (!studentMap.has(app.nim)) {
      studentMap.set(app.nim, {
        name: app.studentName,
        nim: app.nim,
        nationality: app.nationality,
        passport: app.passportNumber
      });
    }
  });
  const studentsList = Array.from(studentMap.values());

  const handleDecision = (status: ApplicationStatus) => {
    if (!selectedApp) return;
    updateStatus(selectedApp.id, status, operatorNotes);
    setDecisionSuccess(true);
    setOperatorNotes('');
    setTimeout(() => {
      setSelectedApp(null);
      setDecisionSuccess(false);
    }, 1000);
  };

  // Helper to choose status color background
  const getStatusRowClass = (status: string) => {
    switch (status) {
      case 'Disetujui':
        return 'bg-emerald-50 text-emerald-800';
      case 'Diproses':
        return 'bg-blue-50 text-blue-800';
      case 'Verified':
        return 'bg-sky-50 text-sky-800';
      case 'Ditolak':
        return 'bg-rose-50 text-rose-800';
      default:
        return 'bg-amber-50 text-amber-800';
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 relative flex flex-col lg:flex-row text-left overflow-hidden">
      
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

      {/* Mobile Header */}
      <div className="lg:hidden bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200 shadow-sm w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-white border border-slate-150 flex items-center justify-center p-0.5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqqHEGMRQMx2Bku-uYKvmBhtzY7L4Vd91Bg&s"
              alt="ITATS Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-extrabold text-[#005CB9] text-sm font-sans">Operator Desk</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-itats-blue rounded hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 bg-white border-r border-slate-200 shrink-0 lg:min-h-[calc(100vh-5rem)] z-30`}
      >
        <div className="p-6 border-b border-slate-100 hidden lg:block">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-150 flex items-center justify-center p-0.5 shadow-sm">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqqHEGMRQMx2Bku-uYKvmBhtzY7L4Vd91Bg&s"
                alt="ITATS Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#005CB9]">ISS-ITATS Operator</h4>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">ID: OFFICE-2026</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1 font-sans">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#005CB9] text-white shadow-md border-l-4 border-l-[#F4D000]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('applications');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#005CB9] text-white shadow-md border-l-4 border-l-[#F4D000]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-4 h-4 shrink-0" />
            <span>Incoming Applications</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('students');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-[#005CB9] text-white shadow-md border-l-4 border-l-[#F4D000]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Student Data</span>
          </button>

          <hr className="my-4 border-slate-100" />

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              logout();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Universal Top Header with Notification Dropdown for Operators */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-205">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50/70 px-2.5 py-1 rounded-md border border-blue-100">
              Operator {activeTab === 'applications' ? 'incoming' : activeTab}
            </span>
            <div className="h-4 w-[1px] bg-slate-200" />
            <span className="text-[11px] text-slate-500 font-extrabold hidden sm:inline">ITATS International Oﬃce Desk</span>
          </div>
          
          <div className="relative">
            {/* Bell Trigger */}
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2.5 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 transition-all text-slate-600 hover:text-[#005CB9] relative cursor-pointer flex items-center justify-center shadow-sm"
            >
              <Bell className="w-4.5 h-4.5" />
              {pendingCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-amber-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center px-1 animate-pulse border-2 border-white shadow-sm">
                  {pendingCount}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown Container */}
            {notifDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setNotifDropdownOpen(false)} />
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-xl p-5 z-50 text-left animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 block">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-[#005CB9]" />
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-sans">Operator Alert Center</h4>
                    </div>
                    <span className="text-[9px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md font-mono">
                      {pendingCount} PENDING
                    </span>
                  </div>
                  
                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {applications.filter(app => app.status === 'Pending').length === 0 ? (
                      <div className="text-xs text-slate-400 text-center py-6 font-medium">
                        All clear! No pending applications require verification.
                      </div>
                    ) : (
                      applications.filter(app => app.status === 'Pending').map((app) => {
                        return (
                          <div
                            key={`opnotif-${app.id}`}
                            onClick={() => {
                              setActiveTab('applications');
                              setSelectedApp(app);
                              setNotifDropdownOpen(false);
                            }}
                            className="p-3 rounded-2xl border border-amber-200/60 bg-amber-50/45 cursor-pointer hover:bg-amber-100/40 transition-colors text-[11px] font-semibold space-y-1 text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-[#005CB9]">{app.id}</span>
                              <span className="text-[8.5px] font-mono text-slate-400 font-extrabold">{app.submissionDate}</span>
                            </div>
                            <p className="text-slate-700">
                              NEW APPLICATION: <span className="font-bold">{app.studentName}</span> requested sponsor letter for <span className="font-extrabold">{app.serviceType}</span>.
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        setActiveTab('applications');
                        setNotifDropdownOpen(false);
                      }}
                      className="text-[#005CB9] hover:underline text-[10px] uppercase font-black tracking-wider block"
                    >
                      View All Verification Folders
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">Operator Administration Desk</h2>
              <p className="text-xs text-slate-500 mt-1">Official dashboard representing current pending student requests and document approvals.</p>
            </div>

            {/* Verification Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Pending */}
              <div className="bg-white rounded-2xl p-5 border-t-4 border-t-[#F4D000] border-x border-b border-x-slate-205 border-b-slate-205 shadow-[0_4px_25px_-5px_rgba(244,208,0,0.05)] hover:shadow-[0_12px_30px_rgba(244,208,0,0.06)] hover:border-[#F4D000]/40 transition-all duration-300 flex items-center space-x-4">
                <div className="p-3 bg-[#F4D000]/15 rounded-xl text-amber-850">
                  <AlertCircle className="w-6 h-6 text-[#F4D000]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider font-mono">Pending</span>
                  <span className="text-2xl font-black text-slate-900 font-sans">{pendingCount}</span>
                </div>
              </div>

              {/* Card 2: Processing */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Processing</span>
                  <span className="text-2xl font-black text-slate-800 font-sans">{processingCount}</span>
                </div>
              </div>

              {/* Card 3: Approved */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Approved</span>
                  <span className="text-2xl font-black text-slate-800 font-sans">{approvedCount}</span>
                </div>
              </div>

              {/* Card 4: Rejected */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Rejected</span>
                  <span className="text-2xl font-black text-slate-800 font-sans">{rejectedCount}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Board */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-itats-blue uppercase">Helpdesk Actions</span>
                <h4 className="text-sm font-bold text-slate-800">You have {pendingCount} requests waiting for initial review.</h4>
                <p className="text-xs text-slate-500 font-semibold select-none">Verify student records and generate official rectorate certificates.</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('applications');
                  setSelectedApp(null);
                }}
                className="bg-[#005CB9] hover:bg-blue-750 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow cursor-pointer whitespace-nowrap"
              >
                Go to Incoming Folder
              </button>
            </div>

            {/* Recent Activities Timeline Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[#005CB9]" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider font-sans">
                    Recent Desk Activities
                  </h3>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#005CB9] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-105">
                  Real-time Desk Log
                </span>
              </div>

              <div className="relative border-l border-slate-200 pl-6 ml-3 space-y-6">
                
                {/* Timeline item 1 */}
                <div className="relative">
                  {/* Glowing dot indicator */}
                  <span className="absolute -left-[31px] top-1 mt-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-50 border border-amber-300 shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-extrabold text-[#0D172A] leading-relaxed">
                        John Smith <span className="text-slate-500 font-semibold">submitted</span> <span className="font-black text-[#005CB9]">KITAS Extension</span>
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono font-bold block mt-0.5">
                        Incoming immigration journal generated • Ready for stay permit verification
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono font-bold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded border border-slate-100 self-start sm:self-center">
                      Today, 10:24 AM
                    </span>
                  </div>
                </div>

                {/* Timeline item 2 */}
                <div className="relative">
                  {/* Glowing dot indicator */}
                  <span className="absolute -left-[31px] top-1 mt-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-50 border border-blue-300 shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-extrabold text-[#0D172A] leading-relaxed">
                        Ali Hassan <span className="text-slate-500 font-semibold">submitted</span> <span className="font-black text-[#005CB9]">Visa Application</span>
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono font-bold block mt-0.5">
                        New single entry sponsor recommendation letter logged in active folder
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono font-bold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded border border-slate-100 self-start sm:self-center">
                      Today, 08:15 AM
                    </span>
                  </div>
                </div>

                {/* Timeline item 3 */}
                <div className="relative">
                  {/* Static dot indicator */}
                  <span className="absolute -left-[31px] top-1 mt-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-50 border border-emerald-300 shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-extrabold text-[#0D172A] leading-relaxed">
                        International Office <span className="text-slate-500 font-semibold">processed approval for</span> <span className="font-black text-emerald-700">Yuki Tanaka</span>
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono font-bold block mt-0.5">
                        Digital support recommendation letter compiled and signed under NIM 2220456102
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono font-bold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded border border-slate-100 self-start sm:self-center">
                      Yesterday, 03:40 PM
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 2. INCOMING APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex-1">
                <h2 className="text-sm font-extrabold text-[#0D172A] uppercase tracking-wider font-sans">Stay Permit Verification</h2>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Review official file uploads and approve or reject academic sponsor requests.</p>
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-1.5 self-start">
                {['all', 'pending', 'verified', 'processing', 'completed', 'rejected'].map((filter) => {
                  const isSelected = statusFilter === filter;
                  const labelMap: Record<string, string> = {
                    all: 'All',
                    pending: 'Pending',
                    verified: 'Verified',
                    processing: 'Processing',
                    completed: 'Completed',
                    rejected: 'Rejected'
                  };
                  return (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#005CB9] text-white border-[#005CB9] shadow-md'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50/50'
                      }`}
                    >
                      {labelMap[filter]}
                    </button>
                  );
                })}
              </div>

              {/* Minimal Search Bar */}
              <div className="relative w-full md:w-60">
                <Search className="w-3.5 h-3.5 text-[#005CB9] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search student or APP ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#005CB9]/20 focus:border-[#005CB9] outline-none font-semibold transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Master List (Left Column) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase tracking-wider">
                  Applications Folder ({filteredApps.length})
                </div>
                {filteredApps.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-3 border border-slate-100">
                      <Search className="w-5 h-5 text-slate-500" />
                    </div>
                    <p className="text-sm font-extrabold text-slate-700 font-sans">No matching applications found</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs font-semibold">
                      Please try adjusting your search filters or terms to locate files.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setSelectedApp(app);
                          setDecisionSuccess(false);
                          setOperatorNotes(app.operatorNotes || '');
                        }}
                        className={`p-4 text-left cursor-pointer transition-colors relative ${
                          selectedApp?.id === app.id
                            ? 'bg-blue-50/40 border-l-4 border-l-itats-blue'
                            : 'hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-[11px] font-bold text-itats-blue">{app.id}</span>
                            <h4 className="text-sm font-bold text-slate-800 mt-1">{app.studentName}</h4>
                            <span className="text-[10px] text-slate-400 font-mono">NIM: {app.nim} • {app.nationality}</span>
                          </div>
                          <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase ${getStatusRowClass(app.status)}`}>
                            {app.status === 'Pending' ? 'Pending' : app.status === 'Verified' ? 'Verified' : app.status === 'Diproses' ? 'Diproses' : app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold truncate mt-2">
                          Service: {app.serviceType}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail & Decision Card (Right Column) */}
              <div className="lg:col-span-5">
                {selectedApp ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 text-left">
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-itats-blue">{selectedApp.id}</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${getStatusRowClass(selectedApp.status)}`}>
                        {selectedApp.status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Student info */}
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block leading-none">Student Name</span>
                        <span className="text-base font-extrabold text-slate-800 mt-1 block">{selectedApp.studentName}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Student ID / NIM</span>
                          <span className="text-slate-800 font-mono mt-0.5 block">{selectedApp.nim}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Passport No.</span>
                          <span className="text-slate-800 font-mono uppercase mt-0.5 block">{selectedApp.passportNumber}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Nationality</span>
                        <span className="text-xs font-bold text-slate-700 block mt-0.5">{selectedApp.nationality}</span>
                      </div>

                      <hr className="border-slate-100" />

                      {/* Service request info */}
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Requested Service</span>
                        <span className="text-sm font-extrabold text-slate-800 block mt-0.5">{selectedApp.serviceType}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Attached Document</span>
                        <div className="mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-itats-blue shrink-0" />
                          <span className="text-xs font-bold text-slate-800 truncate" title={selectedApp.documentName}>
                            {selectedApp.documentName}
                          </span>
                        </div>
                      </div>

                      {selectedApp.notes && (
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Student Note Remark</span>
                          <p className="text-xs text-slate-650 bg-slate-50/50 p-3 rounded-xl border border-slate-150 font-medium mt-1">
                            "{selectedApp.notes}"
                          </p>
                        </div>
                      )}

                      <hr className="border-slate-100" />

                      {/* Verification Decision Form */}
                      {!decisionSuccess ? (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 block">Operator Notes (Sponsor details, feedback, etc.)</label>
                            <textarea
                              rows={2}
                              value={operatorNotes}
                              onChange={(e) => setOperatorNotes(e.target.value)}
                              placeholder="Write instructions, dates, or correction messages here..."
                              className="w-full text-xs p-3 border rounded-xl outline-none focus:ring-1 focus:ring-itats-blue font-medium bg-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleDecision('Disetujui')}
                              style={{ backgroundColor: '#005CB9' }}
                              className="text-white hover:bg-blue-700 font-extrabold text-[11px] py-1.5 px-2 rounded-xl transition-colors cursor-pointer text-center"
                            >
                              Selesai (Completed)
                            </button>
                            <button
                              onClick={() => handleDecision('Diproses')}
                              className="bg-blue-50 text-[#005CB9] hover:bg-blue-100 font-extrabold text-[11px] py-2.5 px-2 rounded-xl transition-colors cursor-pointer text-center border border-blue-200"
                            >
                              Proses (Process)
                            </button>
                            <button
                              onClick={() => handleDecision('Verified')}
                              className="bg-sky-50 text-sky-700 hover:bg-sky-100 font-extrabold text-[11px] py-2.5 px-2 rounded-xl transition-colors cursor-pointer text-center border border-sky-200"
                            >
                              Verifikasi (Verify)
                            </button>
                            <button
                              onClick={() => handleDecision('Ditolak')}
                              className="bg-rose-50 text-rose-700 hover:bg-rose-100 font-extrabold text-[11px] py-2.5 px-2 rounded-xl transition-colors cursor-pointer text-center border border-rose-200"
                            >
                              Tolak (Reject)
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
                          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                          <h4 className="text-xs font-bold text-emerald-800">Decision Dispatched Successfully!</h4>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-100 border border-slate-200 rounded-3xl p-8 text-center text-slate-500 font-bold text-xs">
                    Select an application from the folder list to review documents and log decisions.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. STUDENT DATA TAB */}
        {activeTab === 'students' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">Active International Students</h2>
              <p className="text-xs text-slate-500 mt-1">Registry database of currently active foreign student passports and visa identifiers.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[650px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="py-4 px-6">Official Name</th>
                      <th className="py-4 px-6">Student ID (NIM)</th>
                      <th className="py-4 px-6">Passport ID</th>
                      <th className="py-4 px-6">Nationality</th>
                      <th className="py-4 px-6">Affiliation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {studentsList.map((std, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 text-slate-900 font-extrabold">{std.name}</td>
                        <td className="py-4 px-6 font-mono font-bold text-itats-blue">{std.nim}</td>
                        <td className="py-4 px-6 font-mono uppercase text-slate-550">{std.passport}</td>
                        <td className="py-4 px-6 font-bold">{std.nationality}</td>
                        <td className="py-4 px-6">
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full border border-emerald-200">
                            Active Student
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
