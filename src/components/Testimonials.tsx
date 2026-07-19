import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial, Language } from "../types";
import { UI_TRANSLATIONS, getTranslation } from "../translations";

interface TestimonialsProps {
  testimonials: Testimonial[];
  language: Language;
}

export default function Testimonials({ testimonials, language }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  const roleTrans = getTranslation(current.role, language);
  const textTrans = getTranslation(current.text, language);
  const locTrans = getTranslation(current.location, language);

  return (
    <section className="py-24 px-4 md:px-8 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden" id="testimonials">
      {/* Background glowing rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-turquoise/5 dark:bg-turquoise/5 rounded-full border border-turquoise/10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-turquoise uppercase tracking-widest bg-turquoise/10 px-3.5 py-1 rounded-full">
            {t.testimonialsTitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4">
            {t.testimonialsSubtitle}
          </h2>
        </div>

        {/* Testimonial Glass Slider Card */}
        <div className="relative bg-slate-50/80 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 p-8 md:p-14 rounded-3xl shadow-2xl">
          {/* Quote mark decoration */}
          <div className="absolute top-6 right-8 text-slate-200 dark:text-slate-800 pointer-events-none select-none">
            <Quote className="w-16 h-16 fill-current opacity-30" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Avatar picture */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-turquoise shadow-xl">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Glowing ring */}
                <span className="absolute inset-0 border-4 border-turquoise/25 rounded-full animate-pulse pointer-events-none" />
              </div>

              {/* Text content details */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating stars */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold-accent text-gold-accent" />
                  ))}
                </div>

                <p className="text-md md:text-xl font-medium text-slate-800 dark:text-slate-250 leading-relaxed italic mb-6">
                  "{textTrans}"
                </p>

                <div>
                  <h4 className="text-md font-bold text-slate-950 dark:text-white">
                    {current.name}
                  </h4>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold uppercase tracking-wider">
                    <span>{roleTrans}</span>
                    <span>•</span>
                    <span className="text-turquoise">{locTrans}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls buttons */}
          {testimonials.length > 1 && (
            <div className="flex justify-center md:justify-end gap-3 mt-8 md:mt-0">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-turquoise transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-turquoise transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bullet indicator anchors */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? "w-6 bg-turquoise" : "w-2 bg-slate-200 dark:bg-slate-800"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
