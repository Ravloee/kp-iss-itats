import { useState } from 'react';
import { CAMPUS_SERVICES } from '../data';
import { BookOpen, FileCheck, RefreshCw, Send, ArrowUpRight, HelpCircle, GraduationCap } from 'lucide-react';

interface ServicesSectionProps {
  onApplyService: (serviceTitle: string) => void;
  onViewRequirements: (serviceId: string) => void;
}

export default function ServicesSection({ onApplyService, onViewRequirements }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'baru' | 'dokumen' | 'mutasi' | 'khusus'>('all');

  const categories = [
    { id: 'all', label: 'All Services (Semua)' },
    { id: 'baru', label: 'Mahasiswa Baru' },
    { id: 'dokumen', label: 'Dokumen Tinggal' },
    { id: 'mutasi', label: 'Layanan Mutasi' },
    { id: 'khusus', label: 'Surat Khusus' }
  ];

  const filteredServices = activeTab === 'all'
    ? CAMPUS_SERVICES
    : CAMPUS_SERVICES.filter(service => service.category === activeTab);

  // Helper to match category context icons
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('izin belajar')) return <BookOpen className="w-5 h-5 text-[#005CB9]" />;
    if (t.includes('visa')) return <Send className="w-5 h-5 text-amber-600" />;
    if (t.includes('kitas')) return <FileCheck className="w-5 h-5 text-[#005CB9]" />;
    if (t.includes('mutasi')) return <RefreshCw className="w-5 h-5 text-amber-600" />;
    if (t.includes('beasiswa') || t.includes('rekomendasi')) return <GraduationCap className="w-5 h-5 text-emerald-700" />;
    return <HelpCircle className="w-5 h-5 text-[#005CB9]" />;
  };

  return (
    <section id="services" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50 px-3 py-1 rounded-full border border-blue-150 mb-4 inline-block">
            Layanan Portal Administrasi
          </span>
          {/* Yellow accent bar above section heading */}
          <div className="w-16 h-[4px] bg-[#F4D000] mx-auto rounded-full mb-3"></div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] font-sans">
            Available International Services
          </h2>
          <p className="text-[#334155] mt-3 leading-relaxed text-sm sm:text-base font-semibold">
            We provide official administrative support for all active international students at ITATS Surabaya. Select a service below to fill out the application.
          </p>
        </div>

        {/* Category Tabs Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#005CB9] text-white border-[#005CB9] shadow-[0_4px_12px_rgba(0,92,185,0.2)]'
                  : 'bg-white hover:bg-[#F4D000]/10 hover:border-[#F4D000]/40 text-slate-600 border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Render Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isHighlightCard = service.title.toLowerCase().includes('belajar baru') || service.title.toLowerCase().includes('telex');
            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 text-left flex flex-col justify-between hover:-translate-y-1 ${
                  isHighlightCard 
                    ? 'border-t-4 border-t-[#F4D000] border-x-[#F4D000]/20 border-b-[#F4D000]/10 shadow-[0_8px_30px_rgba(244,208,0,0.06)] hover:border-[#F4D000] hover:shadow-[0_12px_35px_rgba(244,208,0,0.12)]'
                    : 'border-slate-200 shadow-sm hover:border-[#F4D000] hover:shadow-[0_12px_35px_rgba(244,208,0,0.10)]'
                }`}
              >
                <div>
                  {/* Card visual badge header */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-205">
                      {getIcon(service.title)}
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      service.category === 'baru' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      service.category === 'dokumen' ? 'bg-blue-50 text-[#005CB9] border border-blue-100' :
                      service.category === 'mutasi' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {service.category === 'baru' ? 'Maba' :
                       service.category === 'dokumen' ? 'Tinggal' :
                       service.category === 'mutasi' ? 'Mutasi' : 'Khusus'}
                    </span>
                  </div>

                  {/* Title & info description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-[#0D172A] font-sans">
                      {service.title}
                    </h3>
                    <p className="text-[10px] font-mono font-bold text-slate-500 italic uppercase">
                      {service.titleEn}
                    </p>
                    <p className="text-xs text-[#334155] leading-relaxed mt-2 font-semibold">
                      {service.description}
                    </p>

                    {/* Processing Time Pill */}
                    {service.processingTime && (
                      <div className="inline-flex items-center space-x-1.5 bg-slate-100/85 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider mt-2 border border-slate-200">
                        <span className="text-[#005CB9]">⏱ Estimated Processing Time:</span>
                        <span className="text-slate-900 font-extrabold">{service.processingTime}</span>
                      </div>
                    )}

                    {/* Requirements Sub-List */}
                    {service.requirements && (
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                          Required Documents Checklist:
                        </span>
                        <ul className="space-y-1">
                          {service.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx} className="text-[11px] text-[#334155] flex items-start gap-1.5 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F4D000] mt-1 shrink-0 shadow-sm shadow-[#F4D000]"></span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interaction buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 font-sans grid grid-cols-2 gap-3.5">
                  <button
                    onClick={() => onViewRequirements(service.id)}
                    className="flex items-center justify-center space-x-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-[11px] sm:text-xs transition-all cursor-pointer border border-slate-200"
                  >
                    <span>View Requirements</span>
                  </button>
                  <button
                    onClick={() => onApplyService(service.title)}
                    className="flex items-center justify-center space-x-1.5 bg-[#005CB9] hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(0,92,185,0.15)] text-white font-bold py-2.5 rounded-xl text-[11px] sm:text-xs transition-all cursor-pointer border border-transparent"
                  >
                    <span>Apply Service</span>
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5] text-[#F4D000] shrink-0" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
