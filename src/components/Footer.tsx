import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function Footer() {
  const navigate = useNavigate();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t-4 border-t-[#F4D000] pt-16 pb-8 text-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 text-left">
          
          {/* Col-1: Brand representation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate({ to: '/' })}>
              <div className="flex items-center justify-center p-1.5 rounded-xl bg-white border border-slate-150 shadow-sm w-12 h-12 shrink-0">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqqHEGMRQMx2Bku-uYKvmBhtzY7L4Vd91Bg&s"
                  alt="ITATS Logo"
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight block text-[#0F172A] leading-tight">
                  International Student Service (ISS-ITATS)
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#64748B] block mt-0.5 uppercase">
                  KUI INSTITUT TEKNOLOGI ADHI TAMA SURABAYA
                </span>
              </div>
            </div>

            <p className="text-xs text-[#334155] leading-relaxed max-w-sm pt-2 font-medium">
              The official digital administrative platform providing study permit sponsorships, KITAS support, and international visa advice for international scholars at ITATS Surabaya.
            </p>

            {/* Social media connections */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-[#005CB9] hover:text-white text-[#64748B] transition-colors border border-slate-200"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-[#005CB9] hover:text-white text-[#64748B] transition-colors border border-slate-200"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-[#005CB9] hover:text-white text-[#64748B] transition-colors border border-slate-200"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-[#64748B] transition-colors border border-slate-200"
                title="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col-2: Services quick references */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A]">
              Sponsor Services
            </h4>
            <ul className="space-y-2 text-xs font-bold text-[#64748B]">
              <li>
                <button
                  onClick={() => {
                    navigate({ to: '/' });
                    setTimeout(() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-[#005CB9] transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Permohonan Izin Belajar Baru
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate({ to: '/' });
                    setTimeout(() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-[#005CB9] transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Telex Visa Pelajar (Study Visa)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate({ to: '/' });
                    setTimeout(() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-[#005CB9] transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Perpanjangan KITAS Elektronik
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate({ to: '/' });
                    setTimeout(() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-[#005CB9] transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Surat Rekomendasi Rektorat
                </button>
              </li>
            </ul>
          </div>

          {/* Col-3: Academic references */}
          <div className="lg:col-span-4 space-y-4 text-[#334155]">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A]">
              ITATS Hubungan Internasional
            </h4>
            <div className="space-y-3 text-xs leading-relaxed font-semibold">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                <span>Jl. Arief Rachman Hakim No.100, Sukolilo, Surabaya, Jawa Timur, 60117</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#64748B] shrink-0" />
                <span>international@itats.ac.id</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#64748B] shrink-0" />
                <span>+62 (031) 599 7244 / Ext. 104</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 border-t border-slate-205 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#64748B]">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} KUI Institut Teknologi Adhi Tama Surabaya (ITATS). All rights reserved.
          </div>
          <div className="flex items-center space-x-3">
            <span>Surabaya, Indonesia</span>
            <span>•</span>
            <button
              onClick={handleScrollToTop}
              className="flex items-center space-x-1 hover:text-[#005CB9] transition-colors cursor-pointer focus:outline-none"
              title="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#F4D000] stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
