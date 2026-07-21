import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Language } from "../types";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS_EN: FAQItem[] = [
  {
    question: "What makes Nomad Travel expeditions 'carbon-neutral'?",
    answer: "We offset 100% of flight emissions via gold-standard certified ecological investments. In addition, our base camps and cliffside yachts operate exclusively on modern off-grid solar generators with a strict zero-single-use-plastic mandate.",
  },
  {
    question: "How large are the expedition groups?",
    answer: "To secure absolute privacy, luxury, and safety, our group sizes are capped between 4 to 10 guests depending on the difficulty of the territory. Private, fully dedicated expeditions can also be customized for individuals.",
  },
  {
    question: "Can I customize the pre-planned itineraries?",
    answer: "Absolutely. Our elite AI Travel Concierge and our human destination curators specialize in custom-tailored voyages. You can specify custom yacht charters, heli-ski guides, and specific culinary dining requests.",
  },
  {
    question: "What is your secure escrow refund policy?",
    answer: "All reservations are safely escrowed. We guarantee full, unconditional refunds up to 30 days prior to departure. Within 30 days, bookings can be transferred to any of our other global expeditions free of charge.",
  },
];

const FAQ_ITEMS_RU: FAQItem[] = [
  {
    question: "Что делает экспедиции Nomad Travel экологически нейтральными?",
    answer: "Мы компенсируем 100% выбросов от перелетов с помощью золотых экологических сертификатов. Наряду с этим, наши юрточные лагеря работают исключительно на автономных солнечных генераторах с полным отказом от одноразового пластика.",
  },
  {
    question: "Каков размер экспедиционных групп?",
    answer: "Для обеспечения конфиденциальности, роскоши и безопасности численность групп строго ограничена от 4 до 10 гостей в зависимости от сложности региона. Также возможна разработка полностью индивидуальных VIP-маршрутов.",
  },
  {
    question: "Могу ли я изменить готовые маршруты?",
    answer: "Безусловно. Наш ИИ-консьерж и опытные кураторы путешествий специализируются на индивидуальной адаптации поездок. Вы можете указать индивидуальные пожелания к транспорту, гидам и питанию.",
  },
  {
    question: "Какова политика возврата средств?",
    answer: "Все платежи проходят через безопасный эскроу-счет. Мы гарантируем полный и безоговорочный возврат средств при отмене более чем за 30 дней до старта. Менее чем за 30 дней бронирование можно бесплатно перенести на любое другое направление.",
  },
];

interface FAQSectionProps {
  language: Language;
}

export default function FAQSection({ language }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isRu = language === "RU";
  const faqItems = isRu ? FAQ_ITEMS_RU : FAQ_ITEMS_EN;

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-turquoise/10 border border-turquoise/20 rounded-full text-turquoise text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4.5 h-4.5" />
            <span>{isRu ? "Вопросы и Ответы" : "Common Questions"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isRu ? "Часто Задаваемые Вопросы" : "Frequently Asked"}
          </h2>
        </div>

        {/* FAQ List Accordion */}
        <div className="flex flex-col gap-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850/45 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-950 dark:text-white">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-turquoise" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="px-6 py-5 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed bg-slate-50/50 dark:bg-slate-950/20">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
