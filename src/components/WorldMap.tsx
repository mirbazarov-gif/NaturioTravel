import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Plane, Star, ArrowRight, Activity } from "lucide-react";
import { Destination, Language } from "../types";
import { getTranslation } from "../translations";

interface WorldMapProps {
  onSelectDestination: (name: string) => void;
  destinations: Destination[];
  language: Language;
}

export default function WorldMap({ onSelectDestination, destinations, language }: WorldMapProps) {
  const [activePin, setActivePin] = useState<Destination | null>(null);

  // Coordinates of our custom center hub: e.g. London (x: 46, y: 28)
  const HUB = { x: 46, y: 28, name: "London HQ" };

  const isRu = language === "RU";

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-900 text-white transition-colors duration-300 relative overflow-hidden" id="world-map">
      {/* Background stars / details */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise/10 border border-turquoise/20 text-turquoise text-xs font-bold uppercase tracking-widest mb-4">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>{isRu ? "Глобальные Сети в Реальном Времени" : "Real-time Global Networks"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {isRu ? "Интерактивная Карта Экспедиций" : "Interactive Expedition Map"}
          </h2>
          <p className="text-slate-400 font-medium">
            {isRu 
              ? "Наведите на маркеры, чтобы визуализировать частные перелеты и открыть детали эко-курортов." 
              : "Hover over global markers to visualize private charter flight corridors and unlock premium eco-resort details."}
          </p>
        </div>

        {/* Custom World Map Interactive Sandbox */}
        <div className="relative aspect-[16/9] w-full bg-slate-950/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Base SVG World Outline (Abstract Geometric Dot Projection) */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full opacity-35 text-slate-800"
            fill="currentColor"
          >
            {/* Outline mock continent paths for luxury aesthetic */}
            {/* North America */}
            <path d="M 5,20 Q 15,15 25,22 T 35,18 T 32,45 T 15,35 Z" />
            {/* South America */}
            <path d="M 22,46 Q 28,52 30,65 T 28,88 T 24,75 Z" />
            {/* Greenland */}
            <path d="M 38,10 Q 42,5 48,12 T 40,22 Z" />
            {/* Eurasia / Africa */}
            <path d="M 45,25 Q 55,20 65,15 T 85,18 T 92,30 T 78,45 T 58,40 Z" />
            <path d="M 46,42 Q 52,48 55,62 T 58,78 T 48,82 Z" />
            {/* Australia */}
            <path d="M 78,65 Q 85,62 92,72 T 82,85 Z" />

            {/* Flight Path Arc Lines from London HQ to Hovered Pin */}
            {activePin && (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                d={`M ${HUB.x},${HUB.y} Q ${(HUB.x + activePin.coordinates.x) / 2},${
                  Math.min(HUB.y, activePin.coordinates.y) - 12
                } ${activePin.coordinates.x},${activePin.coordinates.y}`}
                fill="none"
                stroke="url(#arc-gradient)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            )}

            {/* Gradients */}
            <defs>
              <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#40e0d0" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Layer */}
          <div className="absolute inset-0 z-20">
            {/* Central Hub Pin (London HQ) */}
            <div
              className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-help"
              style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
            >
              <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-slate-950 flex items-center justify-center relative">
                <span className="absolute -inset-2 bg-yellow-400/30 rounded-full animate-ping pointer-events-none" />
              </div>
              <span className="absolute left-full ml-1.5 top-1/2 -translate-y-1/2 bg-slate-950/90 text-[9px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-wider border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {HUB.name}
              </span>
            </div>

            {/* Destination Interactive Pins */}
            {destinations.map((dest) => {
              const isActive = activePin?.id === dest.id;
              const nameTrans = getTranslation(dest.name, language);
              return (
                <div
                  key={dest.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-25 group"
                  style={{ left: `${dest.coordinates.x}%`, top: `${dest.coordinates.y}%` }}
                  onMouseEnter={() => setActivePin(dest)}
                  onClick={() => onSelectDestination(getTranslation(dest.name, "EN"))}
                >
                  <div className="relative">
                    {/* Ring scale pulses */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-turquoise text-slate-950 scale-120 shadow-lg shadow-turquoise/45"
                          : "bg-slate-950 border border-turquoise/40 text-turquoise hover:scale-110"
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                    </div>
                    
                    {/* Pulsing rings */}
                    <span className="absolute -inset-3 bg-turquoise/20 rounded-full animate-ping pointer-events-none" />
                  </div>

                  {/* Tiny floating title tooltip */}
                  <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950 border border-slate-850 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white shadow-md group-hover:opacity-100 transition-opacity">
                    {nameTrans}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating glassmorphic details card */}
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              {activePin ? (
                <motion.div
                  key={activePin.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl shadow-2xl pointer-events-auto"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                    <img
                      src={activePin.image}
                      alt={getTranslation(activePin.name, language)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-turquoise text-slate-950 px-2.5 py-0.5 rounded-full">
                      {getTranslation(activePin.country, language)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-md font-bold text-white">{getTranslation(activePin.name, language)}</h3>
                    <div className="flex items-center gap-0.5 text-gold-accent font-bold text-xs">
                      <Star className="w-3 h-3 fill-gold-accent" />
                      <span>{activePin.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed mb-4">
                    {getTranslation(activePin.description, language)}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">
                        {isRu ? "Эксклюзив" : "Exclusive Deals"}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        {isRu ? "От" : "From"}{" "}
                        <strong className="text-white text-sm font-extrabold">
                          ${activePin.priceFrom}
                        </strong>
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectDestination(getTranslation(activePin.name, "EN"))}
                      className="px-4 py-2 bg-turquoise text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 hover:bg-turquoise/80 transition-colors cursor-pointer"
                    >
                      <span>{isRu ? "Исследовать" : "Explore"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-950/70 backdrop-blur-md border border-slate-900 p-4 rounded-xl shadow-lg hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-turquoise/15 rounded-lg border border-turquoise/20 text-turquoise">
                      <Plane className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                        {isRu ? "Интерактивная Маршрутизация" : "Interactive Route Mapping"}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {isRu ? "Наведите на метку для симуляции пути." : "Hover pins to simulate flight paths."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
