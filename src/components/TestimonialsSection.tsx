import { useState } from 'react';
import { MOCK_TESTIMONIALS } from '../data';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? MOCK_TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === MOCK_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimony = MOCK_TESTIMONIALS[currentIndex];

  return (
    <section
      className="py-20 sm:py-24 bg-white text-slate-800 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#005CB9]">
            TESTIMONI MAHASISWA
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mt-3 font-sans pb-1.5">
            What Our International Students Say
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-semibold">
            Dengarkan langsung cerita para pelajar asing yang telah dibantu pengurusan administrasinya oleh tim KUI ITATS.
          </p>
        </div>

        {/* Dynamic Carousel Slide Card Container */}
        <div className="relative">
          <div
            className="rounded-3xl p-8 sm:p-12 border bg-white border-slate-200/80 shadow-xl shadow-blue-100/50 hover:border-itats-blue/20 transition-all duration-300 relative overflow-hidden"
          >
            {/* Visual Quote element */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-itats-blue/5 rotate-12 shrink-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              {/* Stars ratings */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < activeTestimony.rating
                        ? 'text-itats-gold fill-itats-gold'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Speech bubble review content */}
              <blockquote className="text-base sm:text-lg md:text-xl font-semibold italic text-slate-700 leading-relaxed max-w-2xl">
                "{activeTestimony.content}"
              </blockquote>

              {/* Divider */}
              <div className="w-12 h-1 bg-itats-gold rounded"></div>

              {/* Student Metadata Card info */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src={activeTestimony.avatar}
                  alt={activeTestimony.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-itats-blue/10"
                />
                <div className="text-center sm:text-left">
                  <h4 className="font-extrabold text-slate-950 text-base leading-none">
                    {activeTestimony.name}
                  </h4>
                  <p className="text-xs text-[#005CB9] font-bold tracking-wider mt-1 uppercase font-mono">
                    {activeTestimony.country}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {activeTestimony.major}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sliding Carousel Controllers Left & Right */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-[#005CB9] hover:text-white hover:border-[#005CB9] transition-all shadow-md active:scale-90 cursor-pointer pointer-events-auto"
              title="Previous testimony"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slider track dots indicator */}
            <div className="flex items-center space-x-2">
              {MOCK_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    i === currentIndex ? 'w-6 bg-itats-blue' : 'w-2.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-[#005CB9] hover:text-white hover:border-[#005CB9] transition-all shadow-md active:scale-90 cursor-pointer pointer-events-auto"
              title="Next testimony"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
