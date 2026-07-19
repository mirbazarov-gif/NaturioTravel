import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Scale, ArrowUpRight, Check } from "lucide-react";
import { Tour, Currency, Language } from "../types";
import { getTranslation, getTranslationArray } from "../translations";

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  compareIds: string[];
  onRemove: (tourId: string) => void;
  onSelect: (tour: Tour) => void;
  currency: Currency;
  tours: Tour[];
  language: Language;
}

export default function CompareDrawer({
  isOpen,
  onClose,
  compareIds,
  onRemove,
  onSelect,
  currency,
  tours,
  language,
}: CompareDrawerProps) {
  const comparedTours = tours.filter((t) => compareIds.includes(t.id));

  const getPrice = (price: number) => {
    switch (currency) {
      case "EUR": return `€ ${(price * 0.92).toFixed(0)}`;
      case "GBP": return `£ ${(price * 0.79).toFixed(0)}`;
      default: return `$ ${price.toLocaleString()}`;
    }
  };

  const getCategoryLabel = (cat: string) => {
    if (language === "RU") {
      switch (cat) {
        case "Luxury": return "Люкс";
        case "Adventure": return "Приключения";
        case "Eco-Travel": return "Эко-Туры";
        case "Cultural": return "Культура";
        default: return cat;
      }
    }
    return cat;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[120]"
            onClick={onClose}
          />

          {/* Drawer Panel (Bottom Slide Up) */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-[130] shadow-2xl flex flex-col justify-between text-slate-900 dark:text-white"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-turquoise" />
                <h3 className="text-sm font-bold uppercase tracking-widest">
                  {language === "RU" 
                    ? `Сравнение Экспедиций (${comparedTours.length} / 3)`
                    : `Compare Selected Expeditions (${comparedTours.length} / 3)`}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Side-by-side comparison matrix */}
            <div className="flex-1 overflow-x-auto p-6">
              {comparedTours.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
                  <Scale className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                  <p className="text-slate-400 font-semibold text-xs">
                    {language === "RU"
                      ? "Экспедиции для сравнения не выбраны. Нажмите «Сравнить Тур» на карточках туров!"
                      : "No expeditions marked for comparison. Tap 'Compare Tour' on any featured tour card!"}
                  </p>
                </div>
              ) : (
                <div className="min-w-[600px] grid grid-cols-12 gap-6">
                  {comparedTours.map((tour) => {
                    const titleTrans = getTranslation(tour.title, language);
                    const durationTrans = getTranslation(tour.duration, language);
                    const highlightsTrans = getTranslationArray(tour.highlights, language);

                    return (
                      <div
                        key={tour.id}
                        className="col-span-4 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-850 relative"
                      >
                        {/* Delete button */}
                        <button
                          onClick={() => onRemove(tour.id)}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-200 hover:bg-red-500 hover:text-white dark:bg-slate-850 text-slate-400 transition-all cursor-pointer"
                          title="Remove comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="h-28 rounded-xl overflow-hidden mb-4">
                          <img
                            src={tour.image}
                            alt={titleTrans}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h4 className="font-bold text-xs leading-snug text-slate-950 dark:text-white mb-3 min-h-8">
                          {titleTrans}
                        </h4>

                        {/* Details row stack */}
                        <div className="flex flex-col gap-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-150 dark:border-slate-800">
                            <span className="text-slate-400 uppercase text-[9px] font-semibold">
                              {language === "RU" ? "Цена" : "Price"}
                            </span>
                            <strong className="text-turquoise">{getPrice(tour.price)}</strong>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-150 dark:border-slate-800">
                            <span className="text-slate-400 uppercase text-[9px] font-semibold">
                              {language === "RU" ? "Категория" : "Category"}
                            </span>
                            <span className="font-medium">{getCategoryLabel(tour.category)}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-150 dark:border-slate-800">
                            <span className="text-slate-400 uppercase text-[9px] font-semibold">
                              {language === "RU" ? "Длительность" : "Duration"}
                            </span>
                            <span className="font-medium">{durationTrans}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-150 dark:border-slate-800">
                            <span className="text-slate-400 uppercase text-[9px] font-semibold">
                              {language === "RU" ? "Лимит Группы" : "Group Limit"}
                            </span>
                            <span className="font-medium">
                              {language === "RU" ? `Макс. ${tour.maxGroupSize} гостей` : `Max ${tour.maxGroupSize} guests`}
                            </span>
                          </div>
                          <div className="py-2">
                            <span className="text-slate-400 uppercase text-[9px] font-semibold block mb-1">
                              {language === "RU" ? "Ключевые Особенности" : "Key Highlights"}
                            </span>
                            <div className="flex flex-col gap-1">
                              {highlightsTrans.slice(0, 2).map((hl, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[10px] font-semibold">
                                  <Check className="w-3 h-3 text-turquoise shrink-0" />
                                  <span className="truncate">{hl}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Explore */}
                        <button
                          onClick={() => {
                            onSelect(tour);
                            onClose();
                          }}
                          className="w-full mt-4 py-2 bg-slate-950 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{language === "RU" ? "Подробнее" : "Explore Tour"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-center">
              <button
                onClick={onClose}
                className="px-8 py-2.5 bg-turquoise text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-turquoise/80 transition-all cursor-pointer"
              >
                {language === "RU" ? "Закрыть Сравнение" : "Close Comparison"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
