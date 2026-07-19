import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Star, ArrowRight, Compass } from "lucide-react";
import { Destination, Language } from "../types";
import { UI_TRANSLATIONS, getTranslation } from "../translations";

interface DestinationsListProps {
  onSelectDestination: (name: string) => void;
  destinations: Destination[];
  language: Language;
}

export default function DestinationsList({ 
  onSelectDestination,
  destinations,
  language
}: DestinationsListProps) {
  const t = UI_TRANSLATIONS[language];

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="destinations">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-turquoise" />
              <span className="text-xs font-bold tracking-widest text-turquoise uppercase">
                {t.destinationsTitle}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
              {t.destinationsSubtitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg font-medium">
              {t.destinationsDesc}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-sm font-bold text-slate-400 dark:text-slate-600 font-mono">
              [ {String(destinations.length).padStart(2, "0")} TOP REGIONS ]
            </span>
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              index={index}
              language={language}
              onClick={() => onSelectDestination(getTranslation(dest.name, "EN"))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 3D Tilt Card Component using Framer Motion Springs
function DestinationCard({
  dest,
  index,
  language,
  onClick,
}: {
  key?: React.Key;
  dest: Destination;
  index: number;
  language: Language;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Configure smooth springs for 3D tilt rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates around central zero point (-0.5 to +0.5)
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const nameTrans = getTranslation(dest.name, language);
  const countryTrans = getTranslation(dest.country, language);
  const descTrans = getTranslation(dest.description, language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onClick={onClick}
        className="relative group h-[450px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-slate-200/50 dark:border-slate-900/50 bg-slate-100 dark:bg-slate-900"
        id={`dest-card-${dest.id}`}
      >
        {/* Background Image with zoom on hover */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={dest.image}
            alt={nameTrans}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Shading gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-slate-950/40 to-transparent p-6 z-10 flex justify-between items-center">
            <span className="text-xs font-bold px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full">
              {countryTrans}
            </span>
            <div className="flex items-center gap-1 text-gold-accent font-semibold text-sm">
              <Star className="w-4 h-4 fill-gold-accent" />
              <span>{dest.rating}</span>
            </div>
          </div>
        </div>

        {/* Content Panel (Floating inside 3D space) */}
        <div 
          className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end transform transition-transform"
          style={{ transform: "translateZ(50px)" }}
        >
          <span className="text-xs text-turquoise font-bold uppercase tracking-widest mb-1.5 font-mono">
            {language === "RU" ? "Экспедиции от" : "Expeditions From"} ${dest.priceFrom}
          </span>
          <h3 className="text-2xl font-extrabold text-white tracking-tight leading-none mb-2">
            {nameTrans}
          </h3>
          <p className="text-sm text-slate-300 font-medium mb-4 line-clamp-2">
            {descTrans}
          </p>

          <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
            <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-turquoise transition-colors flex items-center gap-1.5">
              <span>{language === "RU" ? "Смотреть Экспедиции" : "View Expeditions"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
