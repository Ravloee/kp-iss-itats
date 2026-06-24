import { Eye, Target, Compass, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-slate-50 text-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header layout - split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-mono font-extrabold uppercase bg-amber-100 text-amber-850 px-3 py-1 rounded-full leading-none">
              KAMI SIAP MEMBANTU
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 mt-4 font-sans">
              International Affairs Office (KUI)
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed max-w-xl font-medium">
              Kantor Urusan Internasional ITATS bertugas mengelola kemitraan global, menyambut mahasiswa asing, dan mengawal keabsahan izin dokumen imigrasi demi menunjang pendidikan berbasis teknologi yang unggul dan inklusif.
            </p>
          </div>
          <div className="lg:col-span-6 relative rounded-2xl shadow-xl overflow-hidden min-h-[220px] sm:min-h-[260px] flex items-end p-6 sm:p-8 border border-slate-200/55">
            <div className="absolute inset-0 z-0">
              <img
                src="https://itats.ac.id/wp-content/uploads/2024/03/meeting-room1-2-copy.webp"
                alt="ITATS KUI Meeting Room"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent pointer-events-none" />
            </div>
            
            <div className="relative z-10 flex items-start space-x-4 text-white">
              <Sparkles className="w-8 h-8 text-itats-gold shrink-0 mt-1" />
              <div>
                <h3 className="font-extrabold text-lg tracking-tight text-white">Kenyamanan Akademis Anda Prioritas Kami</h3>
                <p className="text-xs text-slate-250 mt-2 leading-relaxed font-semibold">
                  Kami bertekad menciptakan birokrasi bebas hambatan sehingga Anda dapat memfokuskan kreativitas dan penelitian teknologi sepenuhnya di kampus Institut Teknologi Adhi Tama Surabaya.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Modern Cards Layout: Vision, Mission, Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Card 1: Visi */}
          <div
            className="rounded-2xl p-6 sm:p-8 border bg-white border-slate-200/80 hover:border-itats-blue/30 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-itats-blue mb-6 shadow-sm border border-blue-100/50">
              <Eye className="w-6 h-6 text-[#005CB9]" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Visi KUI ITATS</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Menjadi pusat layanan imigrasi dan kemitraan global terpercaya yang mengantarkan ITATS sebagai pionir perguruan tinggi swasta berwawasan internasional, berteknologi tinggi, serta adaptif terhadap keberagaman budaya.
            </p>
          </div>

          {/* Card 2: Misi */}
          <div
            className="rounded-2xl p-6 sm:p-8 border bg-white border-slate-200/80 hover:border-itats-gold/30 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-[#F4D000] mb-6 shadow-sm border border-yellow-101">
              <Target className="w-6 h-6 text-[#F4D000]" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Misi Layanan</h3>
            <ul className="space-y-3.5 text-sm text-slate-600 leading-relaxed text-left font-medium">
              <li className="flex items-start space-x-2">
                <span className="text-[#F4D000] font-bold shrink-0 mt-0.5">•</span>
                <span>Mengotomasi proses izin belajar dan KITAS sehingga transparan serta akurat.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#F4D000] font-bold shrink-0 mt-0.5">•</span>
                <span>Menjembatani komunikasi intensif antara mahasiswa asing dengan Dirjen Imigrasi.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#F4D000] font-bold shrink-0 mt-0.5">•</span>
                <span>Memberikan bimbingan regulasi tinggal terbaik selama berkuliah di Surabaya.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Tujuan */}
          <div
            className="rounded-2xl p-6 sm:p-8 border bg-white border-slate-200/80 hover:border-emerald-400/30 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 shadow-sm border border-emerald-100/50">
              <Compass className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Tujuan Layanan</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Mewujudkan kemudahan legalitas berkas mahasiswa asing dari 10+ negara mitra, memititgasi pelanggaran visa tinggal terbatas, dan meningkatkan kenyamanan berkehidupan akademis sejalan dengan misi luhur Tri Dharma Perguruan Tinggi.
            </p>
          </div>
        </div>

        {/* Brand New Academic Environment Billboard Section */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Visual Part */}
            <div className="lg:col-span-7 relative min-h-[260px] lg:min-h-full">
              <img
                src="https://itats.ac.id/wp-content/uploads/2024/10/suasana-kuliah-di-itats.webp"
                alt="ITATS Interactive Class Session"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-transparent" />
            </div>
            
            {/* Context Part */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#005CB9] to-[#00428A] text-white p-8 sm:p-12 flex flex-col justify-center text-left">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#F4D000]">
                Interactive Classroom atmosphere
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-3 font-sans leading-tight">
                Empowering Minds, Advancing Technology
              </h3>
              <p className="text-sm text-blue-50/90 mt-4 leading-relaxed font-semibold">
                Explore tech innovation labs, spacious multimedia amphitheatres, and high-impact guidance. We bridge cultural perspectives with high-level science.
              </p>
              
              <ul className="mt-6 space-y-2.5 text-xs text-blue-100 font-extrabold">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4D000]"></span>
                  <span>Modern Hybrid Learning Ecosystems</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4D000]"></span>
                  <span>Multi-cultural Collaboration Facilities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4D000]"></span>
                  <span>Direct Integration with Campus Admin</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
