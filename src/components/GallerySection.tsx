import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, ChevronLeft, ChevronRight, Share2, Instagram } from "lucide-react";
import { Language } from "../types";

const GALLERY_ITEMS = [
  {
    id: "g-1",
    url: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=800",
    title: { EN: "Song-Kul Yurt Camp", RU: "Юртовый Лагерь Сон-Куль" },
    location: { EN: "Song-Kul Lake, Kyrgyzstan", RU: "Озеро Сон-Куль, Нарын" },
  },
  {
    id: "g-2",
    url: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=800",
    title: { EN: "Nomadic Horseback Trek", RU: "Конный Поход Кочевников" },
    location: { EN: "Kochkor Mountains", RU: "Горы Кочкора, Тянь-Шань" },
  },
  {
    id: "g-3",
    url: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800",
    title: { EN: "Majestic Ala-Archa Peaks", RU: "Величественные Пики Ала-Арчи" },
    location: { EN: "Chuy Valley Highlands", RU: "Высокогорье Чуйской Долины" },
  },
  {
    id: "g-4",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
    title: { EN: "Pristine High Altitude Pass", RU: "Высокогорный Перевал" },
    location: { EN: "Song-Kul Ridge Trails", RU: "Тропы Хребта Сон-Куль" },
  },
  {
    id: "g-5",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
    title: { EN: "Starlit Yurt Night Skies", RU: "Звездное Небо над Юртой" },
    location: { EN: "Jailoo High Pastures", RU: "Высокогорные Джайлоо" },
  },
  {
    id: "g-6",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800",
    title: { EN: "Serene Kol-Ukok Waters", RU: "Спокойные Воды Кёль-Укок" },
    location: { EN: "Kol-Ukok Alpine Lake", RU: "Альпийское Озеро Кёль-Укок" },
  },
];

interface GallerySectionProps {
  language: Language;
}

export default function GallerySection({ language }: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const isRu = language === "RU";

  const handleOpen = (idx: number) => {
    setLightboxIndex(idx);
    setCopied(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    setCopied(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    setCopied(false);
  };

  const handleShare = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="blog">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-5 h-5 text-turquoise" />
              <span className="text-xs font-bold tracking-widest text-turquoise uppercase">
                {isRu ? "ЗАПЕЧАТЛЕННЫЕ МОМЕНТЫ" : "Captured Moments"}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isRu ? "Наши Экспедиции в Фото" : "Shared Explorations"}
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-turquoise transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>{isRu ? "Подпишитесь @NaturOExpeditions" : "Follow @NaturOExpeditions"}</span>
            </a>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => handleOpen(idx)}
              className="relative rounded-3xl overflow-hidden group cursor-pointer aspect-square shadow-md border border-slate-200/40 dark:border-slate-850 bg-slate-100 dark:bg-slate-900"
            >
              <img
                src={item.url}
                alt={isRu ? item.title.RU : item.title.EN}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              
              {/* Cover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10" />

              <div className="absolute bottom-0 inset-x-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-bold text-turquoise uppercase tracking-widest block mb-1">
                  {isRu ? item.location.RU : item.location.EN}
                </span>
                <h3 className="text-md font-bold text-white tracking-tight">
                  {isRu ? item.title.RU : item.title.EN}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-150 flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
              title={isRu ? "Закрыть" : "Close"}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-4xl w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video max-h-[70vh] w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                <img
                  src={GALLERY_ITEMS[lightboxIndex].url}
                  alt={isRu ? GALLERY_ITEMS[lightboxIndex].title.RU : GALLERY_ITEMS[lightboxIndex].title.EN}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />

                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/65 text-white border border-white/10 hover:bg-turquoise hover:text-slate-950 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/65 text-white border border-white/10 hover:bg-turquoise hover:text-slate-950 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Meta bar */}
              <div className="w-full flex justify-between items-center mt-5 text-white bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
                <div>
                  <span className="text-[10px] font-bold text-turquoise uppercase tracking-widest block">
                    {isRu ? GALLERY_ITEMS[lightboxIndex].location.RU : GALLERY_ITEMS[lightboxIndex].location.EN}
                  </span>
                  <h3 className="text-md md:text-lg font-bold">
                    {isRu ? GALLERY_ITEMS[lightboxIndex].title.RU : GALLERY_ITEMS[lightboxIndex].title.EN}
                  </h3>
                </div>
                
                {/* Share action */}
                <button
                  onClick={(e) => handleShare(e, GALLERY_ITEMS[lightboxIndex].url)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-turquoise" />
                  <span>{copied ? (isRu ? "Ссылка скопирована!" : "Copied Link!") : (isRu ? "Скопировать ссылку" : "Copy Link")}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
