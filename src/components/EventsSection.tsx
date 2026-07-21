import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Award, ShieldCheck, Flame, ChevronRight, Sparkles, Filter } from "lucide-react";
import { Language } from "../types";
import { getTranslation, getTranslationArray } from "../translations";

interface EventItem {
  id: string;
  title: { EN: string; RU: string };
  category: { EN: string; RU: string };
  date: { EN: string; RU: string };
  location: { EN: string; RU: string };
  image: string;
  description: { EN: string; RU: string };
  highlights: { EN: string[]; RU: string[] };
  intensity: string;
}

const EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: {
      EN: "National Nomadic Horse Games Festival",
      RU: "Фестиваль Национальных Конных Игр"
    },
    category: {
      EN: "Heritage & Sports",
      RU: "Спорт и Наследие"
    },
    date: {
      EN: "August 3 - August 5, 2026",
      RU: "3 августа - 5 августа 2026 г."
    },
    location: {
      EN: "Song-Kul Lake Jailoo",
      RU: "Джайлоо у озера Сон-Куль"
    },
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800",
    description: {
      EN: "Witness the sheer adrenaline of authentic nomad horse sports. Watch Kok-Boru (team goat-polo), Kyz-Kuumai (chasing the bride on horseback), and Tyiyn-Enmei (grabbing coins from the ground at full gallop). Fully organized by local shepherd cooperatives.",
      RU: "Станьте свидетелем адреналина конных игр кочевников. Наблюдайте за Кок-Бору (командная игра на лошадях), Кыз-Куумай (догони невесту) и Тыйын-Энмей (поднятие монет с земли на полном скаку). Организовано пастушескими кооперативами."
    },
    highlights: {
      EN: ["Live Kok-Boru championship matches", "Traditional food stalls with boorsok & kymyz", "Evening nomad folklore around bonfire"],
      RU: ["Чемпионат по Кок-Бору вживую", "Дегустация боорсоков, кумыса и плова", "Вечерний фольклорный концерт у костра"]
    },
    intensity: "High Adrenaline"
  },
  {
    id: "evt-2",
    title: {
      EN: "Birds of Prey & Eagle Hunting Showcase",
      RU: "Фестиваль Хищных Птиц и Охоты Салбурун"
    },
    category: {
      EN: "Nomadic Traditions",
      RU: "Традиции Кочевников"
    },
    date: {
      EN: "August 15 - August 16, 2026",
      RU: "15 августа - 16 августа 2026 г."
    },
    location: {
      EN: "Bokonbaevo / Southern Pastures",
      RU: "Боконбаево / Южные Пастбища"
    },
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
    description: {
      EN: "An intimate demonstration of the ancient, UNESCO-recognized art of eagle hunting (Burkutchu). Learn how master hunters train golden eagles and Taigan hounds. Participate in archery contests and listen to traditional tales.",
      RU: "Камерный показ древнего искусства охоты с беркутом (Буркутчу), признанного ЮНЕСКО. Вы узнаете, как мастера тренируют золотых орлов и кыргызских борзых — тайганов. Участвуйте в стрельбе из лука и слушайте легенды."
    },
    highlights: {
      EN: ["Golden eagle speed & accuracy flight tests", "Taigan hound hunt demonstration", "Archery contest with traditional wood bows"],
      RU: ["Испытание беркутов на скорость полета", "Забеги кыргызских борзых (тайганов)", "Стрельба из традиционного лука"]
    },
    intensity: "Deep Culture"
  },
  {
    id: "evt-3",
    title: {
      EN: "Oimo Felt and Craft Heritage Festival",
      RU: "Фестиваль Войлока и Ремесел 'Оймо'"
    },
    category: {
      EN: "Art & Handcrafts",
      RU: "Искусство и Ремесла"
    },
    date: {
      EN: "July 26 - July 28, 2026",
      RU: "26 июля - 28 июля 2026 г."
    },
    location: {
      EN: "Kochkor Nomad Travel Crafts Center",
      RU: "Ремесленный центр Nomad Travel в Кочкоре"
    },
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
    description: {
      EN: "Celebrate the colorful world of Central Asian crafts in Kochkor. Watch master artisans sew traditional Shyrdak mosaic carpets, dye natural mountain sheep wool, and join a lively parade of traditional nomad clothing.",
      RU: "Отпразднуйте яркий мир ремесел Центральной Азии в Кочкоре. Наблюдайте, как мастера шьют шерстяные ковры Шырдак, красят натуральную шерсть горных овец и участвуйте в параде национальных кочевых костюмов."
    },
    highlights: {
      EN: ["Interactive Shyrdak sewing masterclasses", "Central Asian artisans market & bazaar", "National fashion runway & folklore show"],
      RU: ["Интерактивный урок по шитью шырдаков", "Ярмарка мастеров со всей Средней Азии", "Показ этнической моды и фольклор"]
    },
    intensity: "Creative & Artisan"
  },
  {
    id: "evt-4",
    title: {
      EN: "Summer Jailoo & Kymyz Festival",
      RU: "Фестиваль Джайлоо и Кумыса"
    },
    category: {
      EN: "Gastronomy & Nomad Life",
      RU: "Кулинария и Быт"
    },
    date: {
      EN: "June 20 - June 22, 2026",
      RU: "20 июня - 22 июня 2026 г."
    },
    location: {
      EN: "Suusamyr Valley pastures",
      RU: "Пастбища долины Суусамыр"
    },
    image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=800",
    description: {
      EN: "Celebrate the arrival of summer pastoral nomad migration. Taste fresh horse-milk beverage (kymyz), try authentic nomadic food prepared on wooden hearths, and compete in rapid yurt assembly contests.",
      RU: "Празднуйте приход летнего сезона кочевок пастухов на джайлоо. Попробуйте свежий кобылий напиток (кумыс), домашние блюда кочевников на дровах и посмотрите состязание по сборке юрты на скорость."
    },
    highlights: {
      EN: ["Kymyz brewing secrets & blind tastings", "Yurt assembling speed championship", "Traditional dairy food and sheep cheese market"],
      RU: ["Секреты варки кумыса и слепая дегустация", "Чемпионат по скоростной сборке юрт", "Ярмарка традиционных сыров и молочных блюд"]
    },
    intensity: "Festive Feast"
  }
];

interface EventsSectionProps {
  language: Language;
}

export default function EventsSection({ language }: EventsSectionProps) {
  const isRu = language === "RU";
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = isRu
    ? ["Все", "Спорт и Наследие", "Традиции Кочевников", "Искусство и Ремесла", "Кулинария и Быт"]
    : ["All", "Heritage & Sports", "Nomadic Traditions", "Art & Handcrafts", "Gastronomy & Nomad Life"];

  const filteredEvents = EVENTS.filter((evt) => {
    if (selectedCategory === "All" || selectedCategory === "Все") return true;
    const cat = getTranslation(evt.category, language);
    return cat === selectedCategory;
  });

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-900/40 border-y border-slate-800/40 relative overflow-hidden" id="events">
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-turquoise/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-turquoise/10 border border-turquoise/20 text-turquoise text-[11px] font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{isRu ? "Праздники кочевой жизни" : "Nomadic Living Celebrations"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white uppercase">
            {isRu ? "Культурные События" : "Traditional Nomadic Events"}
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
            {isRu 
              ? "Погрузитесь в подлинный ритм жизни номадов. Планируйте свое путешествие под даты проведения ярких фестивалей, поддерживающих культуру и общины Кыргызстана."
              : "Immerse yourself in the authentic heartbeat of Kyrgyzstan. Synchronize your custom expedition with vibrant local community festivals that keep nomadic soul and crafts alive."}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>{isRu ? "Фильтр:" : "Filter:"}</span>
          </span>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-turquoise border-turquoise text-slate-950 shadow-md shadow-turquoise/15 font-black scale-102"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((evt, index) => (
              <motion.div
                layout
                key={evt.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-950/80 border border-slate-850 rounded-3xl overflow-hidden hover:border-turquoise/30 hover:shadow-xl hover:shadow-turquoise/5 transition-all duration-300 flex flex-col group h-full relative"
              >
                
                {/* Event Image Banner with Badge overlay */}
                <div className="h-64 relative overflow-hidden shrink-0">
                  <img
                    src={evt.image}
                    alt={getTranslation(evt.title, language)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 text-[9px] font-black tracking-widest px-3 py-1.5 bg-turquoise text-slate-950 rounded-full uppercase">
                    {getTranslation(evt.category, language)}
                  </span>

                  {/* Intensity Tag */}
                  <span className="absolute top-4 right-4 text-[9px] font-black tracking-widest px-3 py-1.5 bg-slate-900/80 backdrop-blur-md text-white border border-slate-800 rounded-full uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-400" />
                    <span>{evt.intensity}</span>
                  </span>
                </div>

                {/* Event Body Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Time & Location Row */}
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-semibold text-slate-400 mb-4 font-mono">
                      <span className="flex items-center gap-1.5 text-turquoise">
                        <Calendar className="w-4 h-4 text-turquoise" />
                        <span>{getTranslation(evt.date, language)}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{getTranslation(evt.location, language)}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-4 uppercase group-hover:text-turquoise transition-colors">
                      {getTranslation(evt.title, language)}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                      {getTranslation(evt.description, language)}
                    </p>

                    {/* Highlights Shell */}
                    <div className="border-t border-slate-900/60 pt-4 mb-6">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-3 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-turquoise" />
                        <span>{isRu ? "Программа & Детали" : "Festival Highlights"}</span>
                      </span>
                      <div className="flex flex-col gap-2">
                        {getTranslationArray(evt.highlights, language).map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-300">
                            <ShieldCheck className="w-4 h-4 text-turquoise shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking prompt line */}
                  <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-bold text-turquoise uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform">
                    <span>{isRu ? "Добавить в тур" : "Integrate to Expedition"}</span>
                    <ChevronRight className="w-4 h-4 text-turquoise" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
