import { ArrowRight, BookOpen } from 'lucide-react';

interface HeroProps {
  onApplyClick: () => void;
  onLearnMoreClick: () => void;
}

export default function Hero({ onApplyClick, onLearnMoreClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-50 border-b border-slate-200 overflow-hidden"
    >
      {/* Immersive Campus Background Image with smooth light overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.35]">
        <img
          src="https://itats.ac.id/kerjasama/wp-content/uploads/sites/27/2025/08/2024_03_20_14_15_IMG_2363-1-1-768x432.webp"
          alt="ITATS Campus Campus Environment"
          className="w-full h-full object-cover scale-105 transform origin-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50" />
      </div>

      {/* Subtle decorative low-opacity yellow shapes & gradient accents */}
      <div className="absolute right-[5%] top-[10%] w-96 h-96 bg-gradient-to-tr from-[#005CB9]/10 to-[#F4D000]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute right-[15%] top-[20%] w-36 h-36 rounded-full border-4 border-[#F4D000] opacity-15 animate-pulse pointer-events-none -z-10" />
      <div className="absolute left-[5%] bottom-[10%] w-60 h-60 bg-[#F4D000] rounded-full blur-3xl opacity-[0.05] pointer-events-none -z-10" />
      <div className="absolute right-20 bottom-12 w-48 h-48 border-2 border-dashed border-[#F4D000]/15 rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#005CB9] px-3.5 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-[#F4D000] animate-[#F4D000]"></span>
              <span>KUI ITATS • Kantor Urusan Internasional</span>
            </div>

            {/* Yellow accent bar above heading */}
            <div className="w-16 h-1 bg-[#F4D000] rounded-full mb-2"></div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] font-sans leading-none">
              International Student <br />
              <span className="bg-gradient-to-r from-[#005CB9] via-[#005CB9] to-[#F4D000] bg-clip-text text-transparent">
                Service (ISS-ITATS)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl font-medium">
              The official administrative service system for international students at{' '}
              <strong className="text-[#005CB9] font-bold border-b-2 border-[#F4D000]/40">Institut Teknologi Adhi Tama Surabaya</strong>. 
              Apply for study permits, request official visas sponsor documents, or track your active stay permits from a single secure portal.
            </p>

            {/* Core Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onApplyClick}
                className="flex items-center justify-center space-x-2 bg-[#005CB9] hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-[0_4px_15px_-3px_rgba(0,92,185,0.3)] transition-all cursor-pointer text-center hover:scale-[1.02] active:scale-95"
                id="btn-apply-services"
              >
                <span>Apply Service</span>
                <ArrowRight className="w-4 h-4 text-[#F4D000] stroke-[3]" />
              </button>
              <button
                onClick={onLearnMoreClick}
                className="flex items-center justify-center space-x-2 bg-[#F8FAFC] hover:bg-white text-[#1E293B] hover:text-[#005CB9] font-bold px-6 py-3.5 rounded-xl text-sm transition-all border border-slate-200 hover:border-[#F4D000] shadow-sm cursor-pointer text-center hover:scale-[1.02] active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#64748B] group-hover:text-[#005CB9]" />
                <span>Explore Services</span>
              </button>
            </div>
          </div>

          {/* Right Column: Beautiful Campus Spot Showcase (Pemanis/Latar) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative group w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-8 ring-slate-100/50">
              <img
                src="https://pbs.twimg.com/profile_images/1357172797106098183/QmgiXxMy_400x400.jpg"
                alt="ITATS Surabaya Monument Campus"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent flex items-end p-6">
                <div className="text-white text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#F4D000]">Campus Landmark</span>
                  <h3 className="text-lg font-black tracking-tight mt-0.5">Institut Teknologi Adhi Tama Surabaya</h3>
                  <p className="text-xs text-slate-200 italic mt-1 font-medium">Jl. Arief Rachman Hakim 100, Surabaya</p>
                </div>
              </div>
            </div>
            
            {/* Absolute badge */}
            <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-gradient-to-br from-[#005CB9] to-[#004A99] text-white px-4 py-2.5 rounded-2xl shadow-lg border border-white/20 flex items-center space-x-2 rotate-6 hover:rotate-12 transition-all">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqqHEGMRQMx2Bku-uYKvmBhtzY7L4Vd91Bg&s" 
                alt="ITATS Mini Logo" 
                className="w-6 h-6 object-contain bg-white rounded-md p-0.5"
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-black tracking-wider uppercase font-mono">Official Campus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
