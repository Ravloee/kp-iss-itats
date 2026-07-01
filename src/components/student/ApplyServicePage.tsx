import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  Upload,
  FileText,
} from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ServiceType } from '../../types';
import { CAMPUS_SERVICES } from '../../data';
import { useApplications } from '../../lib/applications';
import { useStudentProfile } from '../../lib/studentProfile';

export default function ApplyServicePage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { service?: string };
  const { addApplication } = useApplications();
  const { profile } = useStudentProfile();

  const [fullName, setFullName] = useState(profile.name);
  const [studentId, setStudentId] = useState(profile.nim);
  const [nationality, setNationality] = useState(profile.nationality);
  const [passportNumber, setPassportNumber] = useState(profile.passportNumber);
  const [serviceType, setServiceType] = useState<ServiceType>(
    (search.service as ServiceType) || 'Surat Izin Belajar'
  );
  const [documentName, setDocumentName] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill from ?service= query if present (e.g. coming from Requirements page)
  useEffect(() => {
    if (search.service) {
      setServiceType(search.service as ServiceType);
      setSuccessMessage(false);
    }
  }, [search.service]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentName(e.target.files[0].name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentName) {
      alert('Please upload/attach the required documents.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addApplication({
        studentName: fullName,
        nim: studentId,
        nationality,
        passportNumber,
        serviceType,
        documentName,
        notes,
      });
      setIsSubmitting(false);
      setSuccessMessage(true);
      setDocumentName('');
      setNotes('');
    }, 850);
  };

  return (
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

            {(() => {
              const selectedService = CAMPUS_SERVICES.find((srv) => srv.title === serviceType);
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
              onClick={() => navigate({ to: '/student/applications' })}
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
  );
}
