import React from "react";
import { motion } from "motion/react";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost, Language } from "../types";
import { UI_TRANSLATIONS, getTranslation } from "../translations";

interface BlogSectionProps {
  blogPosts: BlogPost[];
  language: Language;
}

export default function BlogSection({ blogPosts, language }: BlogSectionProps) {
  const t = UI_TRANSLATIONS[language];

  return (
    <section className="py-24 px-4 md:px-8 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden" id="blog">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-turquoise" />
              <span className="text-xs font-bold tracking-widest text-turquoise uppercase">
                {t.blogTitle}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === "RU" ? "Журнал Nomad Travel" : "The Nomad Travel Journal"}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg font-medium">
              {t.blogSubtitle}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-sm font-bold text-slate-400 dark:text-slate-600 font-mono">
              [ EDITORIAL ISSUES ]
            </span>
          </div>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => {
            const titleTrans = getTranslation(post.title, language);
            const excerptTrans = getTranslation(post.excerpt, language);
            const categoryTrans = getTranslation(post.category, language);
            const dateTrans = getTranslation(post.date, language);
            const readTimeTrans = getTranslation(post.readTime, language);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50/50 dark:bg-slate-950/40 rounded-3xl border border-slate-200/50 dark:border-slate-850 overflow-hidden shadow-md hover:shadow-xl transition-all group flex flex-col justify-between h-[480px]"
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={titleTrans}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-turquoise text-slate-950 rounded-full">
                    {categoryTrans}
                  </span>
                </div>

                {/* Text content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-slate-450 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{dateTrans}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{readTimeTrans}</span>
                      </span>
                    </div>

                    <h3 className="text-md font-bold text-slate-950 dark:text-white line-clamp-2 leading-snug hover:text-turquoise transition-colors cursor-pointer">
                      {titleTrans}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {excerptTrans}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-250/50 dark:border-slate-800/50 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                      {language === "RU" ? "Автор:" : "By"} {post.author}
                    </span>
                    <button className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider group-hover:text-turquoise transition-colors flex items-center gap-1 cursor-pointer">
                      <span>{language === "RU" ? "Читать Журнал" : "Read Journal"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
