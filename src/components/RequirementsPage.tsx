import { useState } from 'react';
import { CAMPUS_SERVICES, ServiceDetail } from '../data';
import { BookOpen, FileCheck, RefreshCw, Send, GraduationCap, HelpCircle, Clock, AlertTriangle, ArrowLeft, CheckCircle, FileText, ChevronRight, Bookmark } from 'lucide-react';
import { Role } from '../types';

interface RequirementsPageProps {
  currentRole: Role;
  onApplyService: (serviceTitle: string) => void;
  onBack: () => void;
  initialServiceId?: string;
  compact?: boolean;
}

export default function RequirementsPage({
  currentRole,
  onApplyService,
  onBack,
  initialServiceId,
  compact = false
}: RequirementsPageProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || CAMPUS_SERVICES[0].id
  );
  const [activeCategory, setActiveCategory] = useState<'all' | 'baru' | 'dokumen' | 'mutasi' | 'khusus'>('all');

  const selectedService = CAMPUS_SERVICES.find((s) => s.id === selectedServiceId) || CAMPUS_SERVICES[0];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'baru', label: 'Mahasiswa Baru' },
    { id: 'dokumen', label: 'Dokumen Tinggal' },
    { id: 'mutasi', label: 'Layanan Mutasi' },
    { id: 'khusus', label: 'Surat Khusus' }
  ];

  const filteredServices = activeCategory === 'all'
    ? CAMPUS_SERVICES
    : CAMPUS_SERVICES.filter(service => service.category === activeCategory);

  // Helper icons for categories
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
    <div className={compact ? "space-y-6" : "min-h-screen bg-[#F8FAFC] pt-24 pb-16"}>
      <div className={compact ? "space-y-6" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"}>
        
        {/* Back Link Header */}
        {!compact && (
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#005CB9] hover:text-blue-700 transition-colors cursor-pointer group uppercase tracking-widest font-mono"
              id="back-to-portal-btn"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Portal Home</span>
            </button>
            
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
              ISS-ITATS Document Advisory System
            </span>
          </div>
        )}

        {/* Page Title Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Yellow decorative accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#005CB9] via-[#005CB9] to-[#F4D000]" />
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-black uppercase text-[#005CB9] tracking-widest bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
              Official Requirements Guide
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 font-sans">
              Persyaratan Dokumen & Layanan Administrasi
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-2 leading-relaxed">
              Find complete check-lists, processing lead times, and official guidelines for all international student visas, KITAS sponsorships, and official recommendation processing at Institut Teknologi Adhi Tama Surabaya.
            </p>
          </div>
        </div>

        {/* Categories Tabs & Grid Panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of Services (Lg Column 4) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Category selection pill box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
                Filter Category / Kategori
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id as any);
                      // Auto select the first service in the newly filtered list if existing selected is filtered out
                      const firstFiltered = cat.id === 'all' 
                        ? CAMPUS_SERVICES[0]
                        : CAMPUS_SERVICES.find(s => s.category === cat.id);
                      if (firstFiltered) setSelectedServiceId(firstFiltered.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#005CB9] text-white border border-[#005CB9]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of services */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-4 pt-4 pb-2 border-b border-slate-100">
                Services List / Pilih Layanan ({filteredServices.length})
              </span>
              
              <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
                {filteredServices.map((srv) => {
                  const isSelected = srv.id === selectedServiceId;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`w-full p-4 text-left transition-all flex items-center justify-between group ${
                        isSelected 
                          ? 'bg-[#005CB9]/5 border-l-4 border-l-[#005CB9]' 
                          : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3 pr-2">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors shrink-0">
                          {getIcon(srv.title)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 line-clamp-1">
                            {srv.title}
                          </span>
                          <span className="text-[9px] font-mono font-bold tracking-wider text-slate-450 uppercase block mt-0.5">
                            {srv.titleEn}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-[#005CB9] translate-x-1' : 'text-slate-350'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Requirements Details (Lg Column 7) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 relative text-left">
              
              {/* Dynamic Badge Header context */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Bookmark className="w-5 h-5 text-[#005CB9]" />
                  <span className="text-xs font-black text-[#005CB9] uppercase tracking-wider font-mono">
                    Service Advisory & Brief / Panduan Resmi
                  </span>
                </div>
                
                <span className={`text-[10px] font-mono font-bold py-1 px-3 rounded-md uppercase tracking-wider ${
                  selectedService.category === 'baru' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                  selectedService.category === 'dokumen' ? 'bg-blue-50 text-[#005CB9] border border-blue-100' :
                  selectedService.category === 'mutasi' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                  'bg-emerald-50 text-emerald-700 border border-emerald-100'
                }`}>
                  {selectedService.category === 'baru' ? 'New Student / Maba' :
                   selectedService.category === 'dokumen' ? 'Temporary Stay Permit' :
                   selectedService.category === 'mutasi' ? 'Passport & Residence Mutation' : 'Special Certificates'}
                </span>
              </div>

              {/* Service Titles */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {selectedService.title}
                </h2>
                <div className="text-xs font-mono font-bold uppercase text-slate-400 italic">
                  {selectedService.titleEn}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 font-semibold leading-relaxed">
                  {selectedService.description}
                </p>
                <p className="text-[11px] text-slate-500 italic font-semibold leading-normal mb-1">
                  {selectedService.descriptionEn}
                </p>
              </div>

              {/* Compact Information Panel */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-405 block leading-none">
                    Service Category
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-800 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#005CB9]" />
                    <span>
                      {selectedService.category === 'khusus' ? 'Academic Sponsorship Service' : 'Immigration Service'}
                    </span>
                  </span>
                </div>
                <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] block leading-none">
                    ⏱ Estimated Processing Time
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block font-mono">
                    {selectedService.processingTime}
                  </span>
                </div>
              </div>

              {/* Required Documents Section */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 space-y-3.5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#005CB9]" />
                  <span>DOKUMEN PERSYARATAN • REQUIRED DOCUMENTS ({selectedService.requirements.length})</span>
                </h3>
                <ul className="space-y-2.5 pl-0">
                  {selectedService.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs font-bold text-slate-755">
                      <span className="text-[#005CB9] font-black text-base shrink-0 select-none md:mt-[-2px]">&#10003;</span>
                      <span className="text-slate-800 leading-normal">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Processing Time Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-3">
                <div className="md:col-span-5 flex items-start space-x-3 bg-blue-50/50 p-4 border border-blue-100/60 rounded-2xl">
                  <Clock className="w-5 h-5 text-[#005CB9] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block leading-none">
                      Processing Time
                    </span>
                    <span className="text-xs font-black text-slate-800 block">
                      {selectedService.processingTime}
                    </span>
                    <span className="text-[9px] text-slate-500 block font-semibold">
                      * Working days excluding weekends and national public holidays
                    </span>
                  </div>
                </div>

                {/* Important Notes Section */}
                <div className="md:col-span-7 flex items-start space-x-3 bg-amber-50/40 p-4 border border-amber-200/50 rounded-2xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B45309] block leading-none">
                      Catatan Penting • Important Notes
                    </span>
                    <ul className="space-y-1 list-none pl-0">
                      {selectedService.importantNotes.map((note, idx) => (
                        <li key={idx} className="text-[10px] font-bold text-slate-700 leading-relaxed list-item">
                          • {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Call to Action Button */}
              <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 font-bold text-left leading-relaxed max-w-sm">
                  {currentRole === 'guest' 
                    ? "Log in to the Student Portal with your active ITATS credentials to apply for this administrative support service."
                    : "Proceed to apply for this document. Verify your personal details on the form before document upload."}
                </span>

                <button
                  onClick={() => onApplyService(selectedService.title)}
                  className="w-full md:w-auto px-6 py-3 bg-[#005CB9] hover:bg-blue-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-[#005CB9]/20 cursor-pointer text-center"
                  id={`btn-apply-service-${selectedService.id}`}
                >
                  {currentRole === 'guest' ? "Login to Apply Service" : "Apply This Service"}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Advisory FAQ Prompt Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <h4 className="text-base font-extrabold font-sans">Need Immigration Consultation?</h4>
            <p className="text-slate-400 text-xs font-semibold max-w-xl">
              Our campus International Affairs Office coordinates daily with Surabaya Immigration class-1 officers. If your visa expiration is extremely critical (under 7 days), contact our support officers immediately.
            </p>
          </div>
          <button 
            onClick={() => {
              onBack();
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            className="px-5 py-2.5 bg-white text-slate-905 hover:bg-slate-100 text-xs font-black uppercase rounded-xl transition-all cursor-pointer inline-block text-[#0D172A]"
          >
            Contact Help Desk
          </button>
        </div>

      </div>
    </div>
  );
}
