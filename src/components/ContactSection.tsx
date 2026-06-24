import { MapPin, Mail, Phone, ExternalLink, Calendar, Map } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50 px-3 py-1 rounded-full border border-blue-150 mb-4 inline-block">
            HUBUNGI KAMI
          </span>
          {/* Yellow accent bar above section heading */}
          <div className="w-16 h-[4px] bg-[#F4D000] mx-auto rounded-full mb-3"></div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] font-sans">
            Get in Touch / Kontak Kantor
          </h2>
          <p className="text-[#334155] text-sm mt-3 leading-relaxed font-semibold">
            Need in-person consultation or want to schedule a physical review of your student credentials? Feel free to contact the Kantor Urusan Internasional (KUI) office.
          </p>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left info panel - Col-5 */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-t-4 border-t-[#F4D000] border-x border-b border-x-slate-205 border-b-slate-205 shadow-sm h-full flex flex-col justify-between text-left hover:shadow-[0_12px_30px_rgba(244,208,0,0.06)] hover:border-[#F4D000]/40 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#005CB9] font-sans">
                    Institut Teknologi Adhi Tama Surabaya (ITATS)
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-slate-500 mt-1 uppercase tracking-wider">
                    KUI • Rektorat Lt. 2, Campus ITATS
                  </p>
                </div>

                {/* Info List */}
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-[#005CB9] border border-blue-100 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                        Address (Alamat)
                      </span>
                      <span className="text-xs font-extrabold text-[#334155] block mt-1.5 leading-relaxed">
                        Jl. Arief Rachman Hakim No.100, Klampis Ngasem, Kec. Sukolilo, Surabaya, Jawa Timur 60117
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700 border border-emerald-100 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                        Email Support
                      </span>
                      <a
                        href="mailto:international@itats.ac.id"
                        className="text-xs font-extrabold text-[#005CB9] hover:underline block mt-1.5"
                      >
                        international@itats.ac.id
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700 border border-amber-100 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                        Phone (Telepon)
                      </span>
                      <span className="text-xs font-extrabold text-[#334155] block mt-1.5">
                        +62 (031) 599 7244 / Ext. 104
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-[#005CB9] border border-blue-100 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                        Service Hours
                      </span>
                      <span className="text-xs font-extrabold text-[#334155] block mt-1.5">
                        Monday - Friday | 08:00 AM - 04:00 PM (WIB)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action trigger map */}
              <div className="pt-6 border-t border-slate-100 mt-6">
                <a
                  href="https://maps.google.com/?q=Institut+Teknologi+Adhi+Tama+Surabaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#005CB9] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right map mockup visual - Col-7 */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 hover:border-[#F4D000]/60 hover:shadow-[0_12px_30px_rgba(244,208,0,0.06)] transition-all duration-300 overflow-hidden h-full flex flex-col justify-between text-left">
              {/* Map header */}
              <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-2">
                  <Map className="w-4 h-4 text-[#005CB9]" />
                  <span className="text-xs font-bold tracking-tight text-[#1E293B]">
                    ITATS Campus Map Location (Surabaya Timur)
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 block"></span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Interactive Map</span>
                </div>
              </div>

              {/* Styled Mock Vector map interactive placeholder */}
              <div className="relative bg-slate-50 p-4 h-[320px] flex-grow flex items-center justify-center overflow-hidden">
                {/* Visual grid representation of map lines */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

                {/* Major streets paths represented visually */}
                <div className="absolute w-[2px] h-full bg-blue-500/10 left-1/3 transform -rotate-12 pointer-events-none"></div>
                <div className="absolute w-[2px] h-full bg-blue-500/10 left-1/2 transform rotate-45 pointer-events-none"></div>
                <div className="absolute h-[2px] w-full bg-blue-500/10 top-2/3 pointer-events-none"></div>
                <div className="absolute h-[4px] w-full bg-[#F4D000]/20 top-1/3 transform -rotate-6 pointer-events-none">
                  <span className="absolute left-6 -top-4 text-[9px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                    JL. ARIEF RACHMAN HAKIM
                  </span>
                </div>

                {/* Main ITATS complex marker card */}
                <div className="absolute z-10 bottom-1/4 left-1/2 -translate-x-1/2 bg-white border border-[#005CB9]/25 shadow-lg p-5 rounded-2xl max-w-[240px]">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></div>
                    <span className="text-[10px] font-extrabold text-[#005CB9] uppercase tracking-wider block">
                      Kampus ITATS
                    </span>
                  </div>
                  <p className="text-xs font-black text-slate-900 mt-1 leading-normal">
                    Institut Teknologi Adhi Tama Surabaya
                  </p>
                  <p className="text-[11px] font-bold text-[#64748B] mt-1 leading-normal">
                    Lantai 2, Gedung Kantor Rektorat (Internasional Affairs).
                  </p>
                </div>

                {/* Decorative map radar pulse pin */}
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center pointer-events-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-30"></span>
                  <div className="relative h-4 w-4 rounded-full bg-[#005CB9] border border-white shadow"></div>
                </div>

                {/* Adjacency landmarks tags */}
                <div className="absolute top-10 right-10 text-[10px] bg-white border border-slate-205 px-2.5 py-1 rounded-md font-bold text-slate-500 shadow-sm">
                  Surabaya Timur
                </div>
                <div className="absolute bottom-6 right-8 text-[10px] bg-white border border-slate-205 px-2.5 py-1 rounded-md font-bold text-slate-500 shadow-sm">
                  Kec. Sukolilo
                </div>
              </div>

              {/* Map Footer instructions info */}
              <div className="px-6 py-3.5 border-t border-slate-200 text-xs font-bold text-slate-500 bg-slate-50/50">
                Pendaftaran secara fisik dapat langsung menuju unit Kantor Kerjasama Internasional (KUI) di jam pelayanan operasional kampus.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
