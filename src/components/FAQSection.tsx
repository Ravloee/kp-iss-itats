import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs = [
    {
      id: 'faq-1',
      question: 'How do I apply for a Study Permit?',
      answer: 'Submit the required documents through ISS-ITATS and wait for verification by the International Office.'
    },
    {
      id: 'faq-2',
      question: 'How long does the Study Permit process take?',
      answer: 'The process usually takes 3–5 working days after all required documents have been verified.'
    },
    {
      id: 'faq-3',
      question: 'How do I request a Student Visa Letter?',
      answer: 'Select the Student Visa Letter service and upload all required supporting documents.'
    },
    {
      id: 'faq-4',
      question: 'How can I extend my KITAS?',
      answer: 'Submit a KITAS Extension request before your current permit expires.'
    },
    {
      id: 'faq-5',
      question: 'Can I update my passport information?',
      answer: 'Yes. Use the Passport Mutation service available in the dashboard.'
    },
    {
      id: 'faq-6',
      question: 'How can I apply for a Scholarship Recommendation Letter?',
      answer: 'Submit the recommendation request and provide all supporting academic documents.'
    }
  ];

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005CB9] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            PERTANYAAN UMUM
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-4 font-sans">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed font-semibold">
            Common questions from international students regarding administrative services at ITATS.
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-[#005CB9]/30 ring-1 ring-[#005CB9]/15 shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${
                      isOpen ? 'text-[#005CB9]' : 'text-slate-450'
                    }`} />
                    <span className="text-sm sm:text-base font-semibold text-slate-900 font-sans leading-tight">
                      {item.question}
                    </span>
                  </div>
                  <span className={`p-1.5 rounded-full transition-colors shrink-0 ${
                    isOpen ? 'bg-blue-50' : 'bg-slate-100'
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#005CB9]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-56' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 sm:p-6 text-sm leading-relaxed text-slate-700 font-medium border-t border-slate-100">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
