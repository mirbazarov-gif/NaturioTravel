import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Trash2, ArrowRight } from "lucide-react";
import { Tour, Currency, Language } from "../types";
import { getTranslation } from "../translations";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemove: (tourId: string) => void;
  onSelect: (tour: Tour) => void;
  currency: Currency;
  tours: Tour[];
  language: Language;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  onRemove,
  onSelect,
  currency,
  tours,
  language,
}: WishlistDrawerProps) {
  const savedTours = tours.filter((t) => wishlistIds.includes(t.id));

  const getPrice = (price: number) => {
    switch (currency) {
      case "EUR": return `€ ${(price * 0.92).toFixed(0)}`;
      case "GBP": return `£ ${(price * 0.79).toFixed(0)}`;
      default: return `$ ${price.toLocaleString()}`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[120]"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-[130] shadow-2xl flex flex-col justify-between text-slate-900 dark:text-white"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h3 className="text-md font-bold uppercase tracking-widest">
                  {language === "RU" ? `Избранное (${savedTours.length})` : `Saved Wishlist (${savedTours.length})`}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {savedTours.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
                  <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                  <p className="text-slate-400 font-medium text-xs">
                    {language === "RU" 
                      ? "Ваш список избранного пуст. Добавляйте понравившиеся экспедиции!"
                      : "Your luxury favorites list is empty. Explore and tap the heart icon on any expedition card!"}
                  </p>
                </div>
              ) : (
                savedTours.map((tour) => {
                  const titleTrans = getTranslation(tour.title, language);
                  const countryTrans = getTranslation(tour.country, language);

                  return (
                    <div
                      key={tour.id}
                      className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-850 shadow-sm relative group overflow-hidden"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={tour.image}
                          alt={titleTrans}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
                            {countryTrans}
                          </span>
                          <h4 className="text-xs font-bold text-slate-950 dark:text-white leading-tight line-clamp-1">
                            {titleTrans}
                          </h4>
                          <span className="text-xs font-mono font-bold text-turquoise mt-1 block">
                            {getPrice(tour.price)}
                          </span>
                        </div>

                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              onSelect(tour);
                              onClose();
                            }}
                            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>{language === "RU" ? "Исследовать" : "Explore"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onRemove(tour.id)}
                            className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                            title="Remove from favorites"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-gradient-to-r from-deep-ocean to-turquoise hover:from-turquoise hover:to-deep-ocean text-white text-xs font-bold uppercase tracking-widest rounded-xl text-center shadow-lg transition-all cursor-pointer"
              >
                {language === "RU" ? "Продолжить Поиски" : "Continue Discoveries"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
