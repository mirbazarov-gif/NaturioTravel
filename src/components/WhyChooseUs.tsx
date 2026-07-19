import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, HeartHandshake, Leaf, Globe, CheckCircle } from "lucide-react";
import { Language } from "../types";

const STATS_EN = [
  { id: "stat-1", label: "Guest Satisfaction Ratio", targetValue: 99.8, suffix: "%", icon: HeartHandshake, desc: "A flawless track record of elite reviews." },
  { id: "stat-2", label: "Curated Private Regions", targetValue: 120, suffix: "+", icon: Globe, desc: "Exclusive, remote conservation properties." },
  { id: "stat-3", label: "Bespoke Years Operated", targetValue: 15, suffix: " Years", icon: Award, desc: "An legacy of luxury outdoor craft." },
  { id: "stat-4", label: "Carbon-Offset Guarantee", targetValue: 100, suffix: "%", icon: Leaf, desc: "100% of flight emissions verified offset." },
];

const STATS_RU = [
  { id: "stat-1", label: "Уровень Довольства Гостей", targetValue: 99.8, suffix: "%", icon: HeartHandshake, desc: "Безупречная история отличных отзывов." },
  { id: "stat-2", label: "Кураторские Направления", targetValue: 120, suffix: "+", icon: Globe, desc: "Эксклюзивные отдаленные заповедные зоны." },
  { id: "stat-3", label: "Лет Работы на Рынке", targetValue: 15, suffix: " Лет", icon: Award, desc: "Наследие мастерства загородного эко-туризма." },
  { id: "stat-4", label: "Компенсация Углерода", targetValue: 100, suffix: "%", icon: Leaf, desc: "100% выбросов от экспедиций компенсировано." },
];

const TIMELINE_EN = [
  { year: "2011", title: "Inception of NaturO", desc: "Formed by world-class mountaineers & conservation biologists to deliver premium wilderness access." },
  { year: "2016", title: "Community Partnerships", desc: "Established direct profit-sharing with Kochkor community shepherd families for horse rentals." },
  { year: "2021", title: "The Zero-Footprint Pledge", desc: "First travel agency to guarantee total solar-powered lodges and 100% verified carbon offset flights." },
  { year: "2026", title: "Elite AI Concierge Launch", desc: "Pioneered interactive real-time multi-agent systems for instant hyper-custom route planning." },
];

const TIMELINE_RU = [
  { year: "2011", title: "Создание NaturO", desc: "Создано альпинистами и биологами мирового класса для экологичного доступа к дикой природе." },
  { year: "2016", title: "Общинное Партнерство", desc: "Организовали прямое распределение доходов с семьями пастухов в Кочкоре за аренду лошадей и юрт." },
  { year: "2021", title: "Нулевой Экологический След", desc: "Первый туроператор с юрточными лагерями на 100% солнечной энергии и полной компенсацией перелетов." },
  { year: "2026", title: "Запуск ИИ-Консьержа", desc: "Внедрили передовые интерактивные мультиагентные ИИ-системы для мгновенного планирования туров." },
];

interface WhyChooseUsProps {
  language: Language;
}

export default function WhyChooseUs({ language }: WhyChooseUsProps) {
  const [activeStep, setActiveStep] = useState(0);
  const isRu = language === "RU";
  const stats = isRu ? STATS_RU : STATS_EN;
  const timeline = isRu ? TIMELINE_RU : TIMELINE_EN;

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden" id="why-us">
      {/* Background decoration lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-dashed border-slate-200 dark:border-slate-850 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 bg-turquoise rounded-full" />
            <span className="text-xs font-bold tracking-widest text-turquoise uppercase">
              {isRu ? "ОТЛИЧИЯ NATURO" : "The NaturO Distinction"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isRu ? "Бескомпромиссное Видение" : "An Uncompromising Vision"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg font-medium">
            {isRu 
              ? "Мы объединяем первоклассный комфорт с строгой заботой об экологии, создавая экспедиции, которые вдохновляют душу и защищают природу."
              : "We merge high-end comfort with strict ecological integrity, mapping expeditions that inspire the soul while protecting the earth."}
          </p>
        </div>

        {/* Statistics Grid with Counter simulation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-turquoise/15 border border-turquoise/20 text-turquoise flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  {/* Target value text */}
                  <span className="text-3xl font-extrabold text-slate-950 dark:text-white block mb-2">
                    <Counter value={stat.targetValue} suffix={stat.suffix} />
                  </span>
                  
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-150 mb-2">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Interactive Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-850 p-8 md:p-12 rounded-3xl shadow-xl">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-turquoise uppercase tracking-widest block mb-2">
              {isRu ? "ХРОНИКА НАШЕГО ПУТИ" : "Our Journey Timeline"}
            </span>
            <h3 className="text-2xl md:text-3.5xl font-extrabold text-slate-950 dark:text-white leading-tight mb-4">
              {isRu ? <>Создавая Наследие <br />Эко-Сообщества</> : <>Building a Legacy <br />of Conservation</>}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
              {isRu
                ? "NaturO начинался как социальный пакт поддержки местных чабанов. Сегодня мы являемся ведущей углеродно-нейтральной сетью эко-экспедиций в Кочкоре."
                : "NaturO began as a simple pact to support local high-altitude shepherds. Today, we stand as the region's premier carbon-neutral community-hosted travel network."}
            </p>

            {/* Interactive Timeline navigation buttons */}
            <div className="flex flex-col gap-2">
              {timeline.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left px-5 py-3 rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
                    activeStep === idx
                      ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950 shadow-md"
                      : "border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850"
                  }`}
                >
                  <span className="text-sm font-bold">{item.title}</span>
                  <span className="text-xs font-mono font-bold opacity-80">{item.year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline display details */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/40 dark:border-slate-800/40 p-8 rounded-2xl h-64 flex flex-col justify-between relative overflow-hidden">
            {/* Decors */}
            <div className="absolute top-2 right-2 text-7xl font-extrabold font-mono text-slate-200 dark:text-slate-900/60 pointer-events-none select-none">
              {timeline[activeStep].year}
            </div>

            <div className="relative z-10">
              <span className="px-3 py-1 bg-turquoise/15 text-turquoise text-[10px] font-bold uppercase tracking-wider rounded-full">
                {isRu ? "Ключевое Достижение" : "Milestone Achievement"}
              </span>
              <h4 className="text-lg md:text-xl font-bold text-slate-950 dark:text-white mt-4">
                {timeline[activeStep].title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-2.5">
                {timeline[activeStep].desc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-turquoise text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 fill-turquoise/10" />
              <span>{isRu ? "Подтвержденный Показатель Экосистемы" : "Verified Ecosystem Milestone"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simulated active Counter component
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Number(start.toFixed(1)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
