import { LogIn, FileText, CheckSquare, Clock } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Portal Login',
      description: 'Sign in to the official student portal using your Student ID (NIM / NPM) and password.',
      icon: <LogIn className="w-5 h-5 text-[#005CB9]" />
    },
    {
      number: '02',
      title: 'Choose Service',
      description: 'Select your required service type (e.g., Study Permit sponsor letter, Passport Mutation, or KITAS Support).',
      icon: <FileText className="w-5 h-5 text-[#005CB9]" />
    },
    {
      number: '03',
      title: 'Fill Single-Page Form',
      description: 'Provide your personal details, verify prefilled academic data, and submit relevant document scans as a PDF.',
      icon: <CheckSquare className="w-5 h-5 text-[#005CB9]" />
    },
    {
      number: '04',
      title: 'Live Tracking & Issue',
      description: 'KUI office verifies your request within 1 to 2 business days. Track progress in real-time on your dashboard.',
      icon: <Clock className="w-5 h-5 text-[#005CB9]" />
    }
  ];

  return (
    <section id="guide" className="py-20 bg-white border-b border-slate-205">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005CB9] bg-blue-50 px-3 py-1 rounded-full border border-blue-150 mb-4 inline-block">
            PANDUAN PROSES
          </span>
          {/* Yellow accent bar above section heading */}
          <div className="w-16 h-[4px] bg-[#F4D000] mx-auto rounded-full mb-3"></div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] font-sans">
            How It Works
          </h2>
          <p className="text-[#334155] text-sm mt-3 leading-relaxed font-semibold">
            Follow our streamlined administrative procedure to secure your official Indonesian stay permit documents.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200 hover:border-[#F4D000] hover:shadow-[0_12px_24px_rgba(244,208,0,0.08)] transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-[#F4D000] font-mono leading-none">{step.number}</span>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-[#1E293B] font-sans tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#334155] leading-relaxed font-semibold">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
