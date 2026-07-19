import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Flame, Star, Clock, Gift, ArrowUpRight } from "lucide-react";
import { Language } from "../types";

interface SpecialOffersProps {
  onBookOffer: (tourId: string) => void;
  language: Language;
}

export default function SpecialOffers({ onBookOffer, language }: SpecialOffersProps) {
  const isRu = language === "RU";

  // Timer states representing ticking countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 28,
    seconds: 52,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const labels = isRu 
    ? ["Дней", "Часов", "Минут", "Секунд"]
    : ["Days", "Hours", "Mins", "Secs"];

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-950 text-white transition-colors duration-300 relative overflow-hidden" id="special-offers">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-turquoise/10 to-deep-ocean/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Banner Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900 border border-slate-800 p-8 md:p-14 rounded-3xl shadow-2xl relative">
          
          {/* Animated Gold Discount Badge */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-24 h-24 rounded-full bg-gold-accent border-2 border-dashed border-white text-slate-950 flex flex-col items-center justify-center font-bold font-sans shadow-lg z-20 pointer-events-none"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest leading-none">{isRu ? "СКИДКА" : "SAVE"}</span>
            <span className="text-xl font-extrabold leading-none my-0.5">30%</span>
            <span className="text-[10px] uppercase font-bold tracking-widest leading-none">{isRu ? "АКЦИЯ" : "OFFER"}</span>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Flame className="w-4 h-4 animate-pulse" />
              <span>{isRu ? "Лимитированное Предложение" : "Limited Edition Odyssey"}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {isRu ? "Сон-Куль: Высокогорный Юртовый Рай" : "Song-Kul Lake Alpine Nomad Sanctuary"}
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-6 max-w-xl">
              {isRu 
                ? "Воспользуйтесь эксклюзивной скидкой 30% на наше фирменное приключение на озере Сон-Куль. Живите в традиционной войлочной юрте на высоте 3016 м, катайтесь на лошадях по бескрайним пастбищам джайлоо и засыпайте под чистейшим звездным небом."
                : "Seize an extraordinary 30% discount on our hallmark Song-Kul Lake exploration. Stay in custom felt-insulated yurts at 3,016m, ride horses across infinite pastures, and sleep under the star-flooded skies of Tian Shan."}
            </p>

            {/* Countdown layout */}
            <div className="mb-8">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-turquoise" />
                <span>{isRu ? "ПРЕДЛОЖЕНИЕ ИСТЕКАЕТ ЧЕРЕЗ" : "OFFER EXPIRES IN"}</span>
              </span>

              <div className="flex gap-4">
                {[
                  { value: timeLeft.days, label: labels[0] },
                  { value: timeLeft.hours, label: labels[1] },
                  { value: timeLeft.minutes, label: labels[2] },
                  { value: timeLeft.seconds, label: labels[3] },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center font-mono text-2xl font-black text-turquoise shadow-inner">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price values */}
            <div className="flex items-center gap-4 mb-8">
              <div>
                <span className="text-xs text-slate-500 font-semibold block uppercase">{isRu ? "Обычная Стоимость" : "Original Privilege"}</span>
                <span className="text-lg text-slate-400 line-through font-bold">$450</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-850" />
              <div>
                <span className="text-xs text-turquoise font-bold block uppercase">{isRu ? "Особая Цена" : "Bespoke Offer"}</span>
                <span className="text-3xl font-extrabold text-white">$315</span>
              </div>
            </div>

            <button
              onClick={() => onBookOffer("tour-2")}
              className="px-8 py-4 bg-gradient-to-r from-turquoise to-deep-ocean hover:from-deep-ocean hover:to-turquoise text-white text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-turquoise/15 cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>{isRu ? "Заказать со Скидкой" : "Claim Limited Offer"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Large image banner */}
          <div className="lg:col-span-5 h-[320px] lg:h-[450px] rounded-3xl overflow-hidden relative shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=800"
              alt="Song-Kul yurt valley offer"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-1 text-gold-accent text-sm font-bold">
                <Star className="w-4 h-4 fill-gold-accent" />
                <span>4.95</span>
                <span className="text-slate-300 font-medium">({isRu ? "98 отзывов" : "98 reviews"})</span>
              </div>
              <span className="text-xs text-white/90 font-medium mt-1 block">{isRu ? "Озеро Сон-Куль, Кыргызстан" : "Song-Kul Lake, Kyrgyzstan"}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
