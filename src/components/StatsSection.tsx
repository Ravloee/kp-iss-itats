import { Users, FileText, Globe, Clock, Sparkles } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 'stat-1',
      icon: <Users className="w-8 h-8 text-itats-gold" />,
      number: '500+',
      label: 'International Students',
      description: 'Mahasiswa dari berbagai belahan dunia aktif berkuliah.'
    },
    {
      id: 'stat-2',
      icon: <FileText className="w-8 h-8 text-itats-gold" />,
      number: '1,000+',
      label: 'Documents Processed',
      description: 'Selesai diverifikasi tanpa kendala imigrasi.'
    },
    {
      id: 'stat-3',
      icon: <Globe className="w-8 h-8 text-itats-gold" />,
      number: '10+',
      label: 'Partner Countries',
      description: 'Asal negara mahasiswa asing di lingkungan ITATS.'
    },
    {
      id: 'stat-4',
      icon: <Clock className="w-8 h-8 text-itats-gold" />,
      number: '24/7',
      label: 'Online Service',
      description: 'Akses permohonan mandiri kapan pun di mana pun.'
    }
  ];

  return (
    <section
      className="py-16 sm:py-20 relative overflow-hidden transition-colors bg-gradient-to-r from-itats-blue to-itats-blue/95 text-white"
    >
      {/* Decorative background vectors */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 -ml-32"></div>
      <div className="absolute -bottom-12 right-12 w-48 h-48 bg-itats-gold/10 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-itats-gold/40 hover:bg-white/10 transition-all duration-300 group shadow-sm hover:shadow-lg"
            >
              <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {item.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-itats-gold uppercase font-sans animate-pulse">
                {item.number}
              </div>
              <div className="text-sm font-bold text-white mt-1.5 font-sans">
                {item.label}
              </div>
              <div className="text-xs text-blue-100/70 mt-2 leading-relaxed max-w-[180px] mx-auto hidden sm:block">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* Small motivational banner */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-itats-gold text-slate-900 text-xs font-bold hover:scale-105 transition-transform px-4 sm:px-6 py-2 rounded-full shadow-lg leading-none select-none">
            <Sparkles className="w-4 h-4 text-slate-900 animate-spin" />
            <span>KUI ITATS Terdaftar Resmi di Dirjen Keimigrasian & Kemendikbudristek RI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
