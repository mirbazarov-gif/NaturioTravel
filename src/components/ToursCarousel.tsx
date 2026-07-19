import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, ChevronRight, Star, Heart, Flame, ArrowUpRight, Scale, 
  Leaf, Users, Calendar, ShieldCheck, Check, Info, Compass, HelpCircle, Activity, LayoutGrid, SlidersHorizontal 
} from "lucide-react";
import { Tour, Currency, Language } from "../types";
import { UI_TRANSLATIONS, getTranslation, getTranslationArray } from "../translations";

interface ToursCarouselProps {
  onSelectTour: (tour: Tour) => void;
  currency: Currency;
  wishlist: string[];
  toggleWishlist: (tourId: string) => void;
  compareList: string[];
  toggleCompare: (tourId: string) => void;
  tours: Tour[];
  language: Language;
  searchFilter: any;
}

export default function ToursCarousel({
  onSelectTour,
  currency,
  wishlist,
  toggleWishlist,
  compareList,
  toggleCompare,
  tours,
  language,
  searchFilter
}: ToursCarouselProps) {
  // Switch between "carousel" (Cinematic Slider) and "directory" (NaturO Kochkor inspired directory grid)
  const [viewMode, setViewMode] = useState<"carousel" | "directory">("directory");
  
  // Category filter (All, Luxury, Adventure, Eco-Travel, Cultural)
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Directory specific filters
  const [activityType, setActivityType] = useState<string>("All"); // All, Horseback, Trekking, Craft
  const [difficulty, setDifficulty] = useState<string>("All"); // All, Easy, Moderate, Challenging
  const [durationGroup, setDurationGroup] = useState<string>("All"); // All, Short (1-2), Medium (3-4), Long (5+)
  
  // Carousel slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = UI_TRANSLATIONS[language];
  const categories = ["All", "Horse Trekking", "Hiking & Trekking", "Cultural Heritage"];

  // Dynamic helper functions for classifying NaturO Kochkor tours in directory mode
  const getTourType = (tourItem: Tour) => {
    const title = getTranslation(tourItem.title, "EN").toLowerCase();
    const desc = getTranslation(tourItem.description, "EN").toLowerCase();
    if (title.includes("horse") || desc.includes("horse") || title.includes("конная") || title.includes("конный")) return "Horseback";
    if (title.includes("trek") || desc.includes("trek") || title.includes("пеший") || title.includes("пик") || title.includes("восхождение") || title.includes("поход")) return "Trekking";
    if (title.includes("felt") || title.includes("craft") || title.includes("workshop") || title.includes("мастер-класс") || title.includes("шырдак") || title.includes("shyrdak")) return "Craft";
    return "Cultural";
  };

  const getTourDurationDays = (tourItem: Tour): number => {
    const dur = getTranslation(tourItem.duration, "EN").toLowerCase();
    const match = dur.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  };

  const getTourDifficulty = (tourItem: Tour): "Easy" | "Moderate" | "Challenging" => {
    const title = getTranslation(tourItem.title, "EN");
    if (title.includes("Uchitel") || title.includes("Ascent") || title.includes("Peak") || title.includes("Glacier")) return "Challenging";
    if (title.includes("Horseback") || title.includes("Pass Trekking") || title.includes("Tash Rabat") || title.includes("Song-Kul") || title.includes("Kol-Ukok")) return "Moderate";
    return "Easy";
  };

  const getCategoryLabel = (cat: string) => {
    if (language === "RU") {
      switch (cat) {
        case "All": return "Все";
        case "Horse Trekking": return "Конные туры";
        case "Hiking & Trekking": return "Пешие туры";
        case "Cultural Heritage": return "Культура и ремесла";
        default: return cat;
      }
    }
    return cat;
  };

  // Filter application
  const filteredTours = tours.filter((tourItem) => {
    // 1. Core Category Filter (Vitals)
    if (activeCategory !== "All") {
      if (tourItem.category !== activeCategory) return false;
    }

    // 2. Search Box Filter (from Hero search form)
    if (searchFilter) {
      const q = searchFilter.destination.toLowerCase();
      const title = getTranslation(tourItem.title, language).toLowerCase();
      const country = getTranslation(tourItem.country, language).toLowerCase();
      const desc = getTranslation(tourItem.description, language).toLowerCase();
      const destName = tourItem.destination ? getTranslation(tourItem.destination, language).toLowerCase() : "";

      const matchesDestination = !q || title.includes(q) || country.includes(q) || desc.includes(q) || destName.includes(q);
      const matchesBudget = !searchFilter.budget || tourItem.price <= searchFilter.budget;

      if (!matchesDestination || !matchesBudget) return false;
    }

    // 3. Directory Specific Filters (Active only when viewMode === "directory")
    if (viewMode === "directory") {
      // Activity Type
      if (activityType !== "All") {
        const type = getTourType(tourItem);
        if (type !== activityType) return false;
      }

      // Difficulty Level
      if (difficulty !== "All") {
        const diff = getTourDifficulty(tourItem);
        if (diff !== difficulty) return false;
      }

      // Duration Filter
      if (durationGroup !== "All") {
        const daysCount = getTourDurationDays(tourItem);
        if (durationGroup === "1-2") {
          if (daysCount > 2) return false;
        } else if (durationGroup === "3-4") {
          if (daysCount < 3 || daysCount > 4) return false;
        } else if (durationGroup === "5+") {
          if (daysCount < 5) return false;
        }
      }
    }

    return true;
  });

  const nextSlide = () => {
    if (filteredTours.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredTours.length);
  };

  const prevSlide = () => {
    if (filteredTours.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredTours.length) % filteredTours.length);
  };

  const getPrice = (price: number) => {
    switch (currency) {
      case "EUR": return `€ ${(price * 0.92).toFixed(0)}`;
      case "GBP": return `£ ${(price * 0.79).toFixed(0)}`;
      default: return `$ ${price.toLocaleString()}`;
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden" id="tours">
      {/* Background design accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-turquoise/5 dark:bg-turquoise/10 rounded-full filter blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-deep-ocean/5 dark:bg-deep-ocean/10 rounded-full filter blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-turquoise/15 text-turquoise text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                {language === "RU" ? "ПРОГРАММЫ NaturO КЫРГЫЗСТАНА" : "COMMUNITY-BASED NaturO TOURS"}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === "RU" ? "Наши Аутентичные Туры" : "Explore Nomadic Journeys"}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium max-w-xl text-sm leading-relaxed">
              {language === "RU" 
                ? "Наши туры разработаны совместно с местными жителями и ремесленниками Кочкора. 100% вашего платежа напрямую поддерживает сельские семьи Кыргызстана." 
                : "Created in cooperation with local shepherds, grandmothers, and guides of Kochkor. Every booking supports family businesses, felt-carpet weavers, and mountain horse breeders."}
            </p>
          </div>

          {/* Dual Layout Toggle Switch */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex gap-1 self-start lg:self-end">
            <button
              onClick={() => setViewMode("directory")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === "directory"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{language === "RU" ? "Каталог NaturO" : "NaturO Directory"}</span>
            </button>
            <button
              onClick={() => setViewMode("carousel")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{language === "RU" ? "Иммерсивный Слайдер" : "Cinematic Slider"}</span>
            </button>
          </div>
        </div>

        {/* Global category buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-slate-100 dark:border-slate-800/40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? "bg-turquoise text-white shadow-md shadow-turquoise/10"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* VIEW 1: NaturO KOCHKOR DETAILED DIRECTORY */}
        {viewMode === "directory" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Filters Sidebar Column */}
            <div className="lg:col-span-1 bg-slate-50/50 dark:bg-slate-950/20 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-850 h-fit space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-turquoise" />
                  {language === "RU" ? "Фильтры Туров" : "NaturO Tour Filters"}
                </span>
                {(activityType !== "All" || difficulty !== "All" || durationGroup !== "All") && (
                  <button 
                    onClick={() => {
                      setActivityType("All");
                      setDifficulty("All");
                      setDurationGroup("All");
                    }}
                    className="text-[10px] font-bold text-turquoise hover:underline uppercase cursor-pointer"
                  >
                    {language === "RU" ? "Сбросить" : "Reset"}
                  </button>
                )}
              </div>

              {/* 1. Activity Type Selector */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  {language === "RU" ? "Тип Активности" : "Adventure Style"}
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "All", labelEN: "All Activities", labelRU: "Все активности" },
                    { id: "Horseback", labelEN: "🐎 Horse Riding", labelRU: "🐎 Конные прогулки" },
                    { id: "Trekking", labelEN: "🥾 Alpine Trekking", labelRU: "🥾 Горный треккинг" },
                    { id: "Craft", labelEN: "🎨 Traditional Crafts", labelRU: "🎨 Народные ремесла" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setActivityType(style.id)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        activityType === style.id
                          ? "bg-turquoise/15 text-turquoise"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <span>{language === "RU" ? style.labelRU : style.labelEN}</span>
                      {activityType === style.id && <Check className="w-3.5 h-3.5 text-turquoise" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Difficulty Level */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  {language === "RU" ? "Сложность" : "Difficulty Level"}
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "All", labelEN: "All Levels", labelRU: "Все уровни" },
                    { id: "Easy", labelEN: "🟢 Easy Walk", labelRU: "🟢 Легкий поход" },
                    { id: "Moderate", labelEN: "🟡 Moderate Active", labelRU: "🟡 Средняя активность" },
                    { id: "Challenging", labelEN: "🔴 High Altitude Trek", labelRU: "🔴 Сложное восхождение" }
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setDifficulty(diff.id)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        difficulty === diff.id
                          ? "bg-turquoise/15 text-turquoise"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <span>{language === "RU" ? diff.labelRU : diff.labelEN}</span>
                      {difficulty === diff.id && <Check className="w-3.5 h-3.5 text-turquoise" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Duration Group */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  {language === "RU" ? "Длительность" : "Duration Filter"}
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "All", labelEN: "Any Duration", labelRU: "Любая длительность" },
                    { id: "1-2", labelEN: "1-2 Days", labelRU: "1-2 Дня" },
                    { id: "3-4", labelEN: "3-4 Days", labelRU: "3-4 Дня" },
                    { id: "5+", labelEN: "5+ Days", labelRU: "5+ Дней" }
                  ].map((dur) => (
                    <button
                      key={dur.id}
                      onClick={() => setDurationGroup(dur.id)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        durationGroup === dur.id
                          ? "bg-turquoise/15 text-turquoise"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <span>{language === "RU" ? dur.labelRU : dur.labelEN}</span>
                      {durationGroup === dur.id && <Check className="w-3.5 h-3.5 text-turquoise" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Support Impact Info Box */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Leaf className="w-4 h-4 shrink-0" />
                  <span>{language === "RU" ? "Эко-Локальный Продукт NaturO" : "NaturO Eco-Impact Guarantee"}</span>
                </div>
                <p>
                  {language === "RU" 
                    ? "Услуги предоставляются напрямую кыргызскими семьями чабанов. Без посредников."
                    : "100% of local payments reach hosts directly, funding rural schools and cultural conservation."}
                </p>
              </div>
            </div>

            {/* Tours Grid Column */}
            <div className="lg:col-span-3">
              {filteredTours.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800/60">
                  <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-500 font-bold text-sm">
                    {language === "RU" ? "Подходящие туры NaturO не найдены." : "No NaturO tours match the selected filters."}
                  </p>
                  <button
                    onClick={() => {
                      setActivityType("All");
                      setDifficulty("All");
                      setDurationGroup("All");
                    }}
                    className="mt-3 text-xs font-bold text-turquoise underline cursor-pointer"
                  >
                    {language === "RU" ? "Сбросить все фильтры" : "Reset all filters"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTours.map((tour) => {
                    const titleTrans = getTranslation(tour.title, language);
                    const countryTrans = getTranslation(tour.country, language);
                    const descTrans = getTranslation(tour.description, language);
                    const durationTrans = getTranslation(tour.duration, language);
                    const tourType = getTourType(tour);
                    const difficultyLevel = getTourDifficulty(tour);

                    return (
                      <motion.div
                        key={tour.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-md rounded-3xl border border-emerald-500/10 dark:border-slate-850 shadow-xl hover:shadow-2xl hover:border-emerald-500/25 transition-all duration-300 flex flex-col h-[520px] overflow-hidden group relative"
                      >
                        {/* Green Impact Banner Rib */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-500/40 group-hover:bg-emerald-500" />

                        {/* Image Frame */}
                        <div className="relative h-[220px] overflow-hidden">
                          <img
                            src={tour.image}
                            alt={titleTrans}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

                          {/* Quick Spec Tags */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-950/40 backdrop-blur-md text-white border border-white/10 rounded-full">
                              {tourType === "Horseback" ? "🐎 Horse Riding" : tourType === "Trekking" ? "🥾 Trekking" : "🎨 Craft Workshop"}
                            </span>
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 text-white rounded-full ${
                              difficultyLevel === "Easy" ? "bg-emerald-500" : difficultyLevel === "Moderate" ? "bg-amber-500" : "bg-rose-500"
                            }`}>
                              {difficultyLevel}
                            </span>
                          </div>

                          {/* Heart Icon */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(tour.id);
                            }}
                            className="absolute top-4 right-4 p-2 bg-white/20 dark:bg-slate-950/30 backdrop-blur-md hover:bg-white/40 border border-white/10 text-white rounded-full transition-all cursor-pointer"
                          >
                            <Heart className={`w-3.5 h-3.5 ${wishlist.includes(tour.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                          </button>

                          {/* Support Local Shepherd Ribbon */}
                          <div className="absolute bottom-3 left-3 bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-white text-[9px] font-bold tracking-wider">
                            <Leaf className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{language === "RU" ? "100% Местный доход (NaturO)" : "100% NaturO Community Profit"}</span>
                          </div>
                        </div>

                        {/* Content Detail */}
                        <div className="p-5 flex flex-col justify-between flex-1">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                {language === "RU" ? "Старт: Кочкор / Бишкек" : "Starts: Kochkor / Bishkek"}
                              </span>
                              <div className="flex items-center gap-1 text-amber-500 font-bold">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{tour.rating}</span>
                                <span className="text-slate-400 font-medium">({tour.reviews})</span>
                              </div>
                            </div>

                            <h3 className="text-base font-bold text-slate-950 dark:text-white leading-snug line-clamp-2 hover:text-turquoise transition-colors cursor-pointer" onClick={() => onSelectTour(tour)}>
                              {titleTrans}
                            </h3>

                            <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
                              {descTrans}
                            </p>

                            {/* Bullet specs inspired by cbtkochkor.com */}
                            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-slate-400 font-medium font-mono border-t border-slate-100 dark:border-slate-800/40">
                              <div className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-turquoise" />
                                <span>Max Group: {tour.maxGroupSize}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-turquoise" />
                                <span>Duration: {durationTrans}</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer specs / Booking */}
                          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between">
                            <div>
                              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-widest">
                                {language === "RU" ? "СТОИМОСТЬ NaturO" : "NaturO COMMUNITY PRICE"}
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-sm line-through text-slate-400 text-left font-semibold">
                                  {getPrice(tour.originalPrice)}
                                </span>
                                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                                  {getPrice(tour.price)}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-1.5">
                              <button
                                onClick={() => onSelectTour(tour)}
                                className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                              >
                                {language === "RU" ? "Инфо" : "Info"}
                              </button>
                              <button
                                onClick={() => onSelectTour(tour)}
                                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-turquoise hover:from-turquoise hover:to-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1 cursor-pointer"
                              >
                                <span>{language === "RU" ? "Заказать" : "Book"}</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: CINEMATIC CAROUSEL SLIDER */}
        {viewMode === "carousel" && (
          <div className="relative">
            {filteredTours.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800/60">
                <p className="text-slate-500 font-medium">
                  {language === "RU" ? "Подходящие экспедиции не найдены." : "No premium tours match this criteria."}
                </p>
              </div>
            ) : (
              <>
                {/* Slidable Window */}
                <div className="overflow-hidden p-2">
                  <div
                    className="flex gap-8 transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 32}px))`,
                    }}
                  >
                    {filteredTours.map((tour) => {
                      const titleTrans = getTranslation(tour.title, language);
                      const countryTrans = getTranslation(tour.country, language);
                      const descTrans = getTranslation(tour.description, language);
                      const durationTrans = getTranslation(tour.duration, language);
                      const catLabel = getCategoryLabel(tour.category);

                      return (
                        <div
                          key={tour.id}
                          className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.3px)] shrink-0"
                        >
                          <div className="bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-md rounded-3xl border border-slate-200/50 dark:border-slate-850 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-[560px]">
                            
                            {/* Image Frame */}
                            <div className="relative h-[250px] overflow-hidden">
                              <img
                                src={tour.image}
                                alt={titleTrans}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                              
                              {/* Category & Duration Badges */}
                              <div className="absolute top-4 left-4 flex gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/20 dark:bg-slate-950/30 backdrop-blur-md text-white border border-white/10 rounded-full">
                                  {catLabel}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-turquoise text-white rounded-full shadow-md">
                                  {durationTrans}
                                </span>
                              </div>

                              {/* Heart Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWishlist(tour.id);
                                }}
                                className="absolute top-4 right-4 p-2 bg-white/25 dark:bg-slate-950/25 backdrop-blur-md hover:bg-white/40 border border-white/10 text-white rounded-full transition-all cursor-pointer"
                              >
                                <Heart className={`w-4 h-4 ${wishlist.includes(tour.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                              </button>

                              {/* Live Availability Flame Indicator */}
                              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-slate-950/80 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-wider">
                                {tour.liveAvailability <= 2 ? (
                                  <>
                                    <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                                    <span className="text-red-400">
                                      {language === "RU" ? `ПОСЛЕДНИЕ ${tour.liveAvailability} МЕСТ` : `LAST ${tour.liveAvailability} SLOTS`}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                    <span className="text-emerald-400">
                                      {language === "RU" ? `ДОСТУПНО (${tour.liveAvailability})` : `AVAILABLE (${tour.liveAvailability})`}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Details Content */}
                            <div className="p-6 flex flex-col justify-between flex-1">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                                    {countryTrans}
                                  </span>
                                  <div className="flex items-center gap-1 text-gold-accent font-bold text-xs">
                                    <Star className="w-3.5 h-3.5 fill-gold-accent text-gold-accent" />
                                    <span>{tour.rating}</span>
                                    <span className="text-slate-400 font-medium">({tour.reviews})</span>
                                  </div>
                                </div>

                                <h3 className="text-lg font-bold text-slate-950 dark:text-white leading-tight line-clamp-2 hover:text-turquoise transition-colors cursor-pointer" onClick={() => onSelectTour(tour)}>
                                  {titleTrans}
                                </h3>

                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                                  {descTrans}
                                </p>
                              </div>

                              {/* Action buttons footer */}
                              <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                                <div className="flex items-center justify-between mb-4">
                                  <button
                                    onClick={() => toggleCompare(tour.id)}
                                    className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-turquoise transition-colors cursor-pointer"
                                  >
                                    <Scale className={`w-3.5 h-3.5 ${compareList.includes(tour.id) ? "text-turquoise fill-turquoise/10" : ""}`} />
                                    <span>{compareList.includes(tour.id) ? t.compare : t.compare}</span>
                                  </button>
                                  <div className="text-right">
                                    <span className="text-[10px] text-slate-400 line-through mr-1.5 font-semibold">
                                      {getPrice(tour.originalPrice)}
                                    </span>
                                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                                      {getPrice(tour.price)}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => onSelectTour(tour)}
                                    className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                                  >
                                    <span>{t.viewDetails}</span>
                                  </button>
                                  <button
                                    onClick={() => onSelectTour(tour)}
                                    className="flex-1 py-2.5 bg-gradient-to-r from-deep-ocean to-turquoise hover:from-turquoise hover:to-deep-ocean text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <span>{language === "RU" ? "Заказать" : "Book"}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Left/Right Buttons for slider (Desktop Overlay) */}
                {filteredTours.length > 3 && (
                  <div className="hidden lg:block">
                    <button
                      onClick={prevSlide}
                      className="absolute top-1/2 left-0 -translate-x-6 -translate-y-1/2 p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full shadow-xl hover:scale-110 text-slate-700 dark:text-slate-300 hover:text-turquoise transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute top-1/2 right-0 translate-x-6 -translate-y-1/2 p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full shadow-xl hover:scale-110 text-slate-700 dark:text-slate-300 hover:text-turquoise transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Slider counter controls (Mobile layout fallback) */}
                {filteredTours.length > 1 && (
                  <div className="flex justify-center items-center gap-6 mt-8">
                    <button
                      onClick={prevSlide}
                      className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-bold font-mono">
                      {currentIndex + 1} / {filteredTours.length}
                    </span>
                    <button
                      onClick={nextSlide}
                      className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
