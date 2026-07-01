import { useState } from 'react';
import {
  FileText,
  History,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useStudentApps, getStatusBadge } from './shared';

const STATUS_FILTERS = ['all', 'pending', 'processing', 'completed', 'rejected'] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const STATUS_LABELS: Record<StatusFilter, string> = {
  all: 'All',
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  rejected: 'Rejected',
};

function getStatusGroup(status: string): StatusFilter {
  const s = status.toLowerCase();
  if (s === 'disetujui' || s === 'completed') return 'completed';
  if (s === 'ditolak' || s === 'rejected') return 'rejected';
  if (s === 'verified' || s === 'diproses' || s === 'processing') return 'processing';
  return 'pending';
}

export default function ApplicationsListPage() {
  const studentApps = useStudentApps();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchText, setSearchText] = useState('');

  return (
    <div className="space-y-6 text-left">
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
            onClick={() => navigate({ to: '/student/apply' })}
            className="mt-5 bg-[#005CB9] hover:bg-blue-750 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Initiate Document Application
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
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

            <div className="flex flex-wrap items-center gap-2 bg-white/70 p-2 rounded-2xl border border-slate-300 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2 shrink-0">
                Filter Status:
              </span>
              {STATUS_FILTERS.map((filter) => {
                const count = filter === 'all'
                  ? studentApps.length
                  : studentApps.filter((app) => getStatusGroup(app.status) === filter).length;
                const isSelected = statusFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#005CB9] text-white border-[#005CB9] shadow-md'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50/50'
                    }`}
                  >
                    <span>{STATUS_LABELS[filter]}</span>
                    <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-black leading-none ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-655'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table */}
          {(() => {
            const monitoredApps = studentApps.filter((app) => {
              const matchesStatus = statusFilter === 'all' || getStatusGroup(app.status) === statusFilter;
              const term = searchText.toLowerCase().trim();
              if (!term) return matchesStatus;

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
                          onClick={() => navigate({ to: '/student/applications/$appId', params: { appId: app.id } })}
                          className="cursor-pointer hover:bg-blue-50/20 transition-all duration-150 group border-l-4 border-l-transparent hover:border-l-[#005CB9]"
                        >
                          <td className="px-6 py-4.5 font-mono font-extrabold text-[#005CB9]">{app.id}</td>
                          <td className="px-6 py-4.5">
                            <span className="text-[#0F172A] font-black block text-sm">{app.serviceType}</span>
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
  );
}
