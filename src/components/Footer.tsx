import React, { useState } from "react";
import { Compass, Mail, Phone, MapPin, Award, CheckCircle, Heart, Globe } from "lucide-react";
import { Language } from "../types";
import Logo from "./Logo";

interface FooterProps {
  language: Language;
  openAdmin: () => void;
}

const FOOTER_TRANSLATIONS = {
  EN: {
    desc: "NaturO delivers premier, low-footprint, bespoke outdoor expeditions. We pair uncompromising custom luxury comfort with deep environmental integrity.",
    subJournal: "Subscribe to the NaturO Journal",
    subDesc: "Receive seasonal expedition dispatches, secret destination maps, and priority early-slot updates.",
    subscribedMsg: "Thank you! Your dispatch access is secured.",
    emailPlaceholder: "e.g. HenrySterling@gmail.com",
    subscribeBtn: "Subscribe",
    officesHeader: "Global Offices",
    address: "60 Park Lane, Mayfair, London, W1K 1QB, UK",
    accentsHeader: "Luxury Accents",
    destinations: "Destinations",
    bespokeTours: "Bespoke Tours",
    expeditionMap: "Expedition Map",
    ourValues: "Our Values",
    guestReviews: "Guest Reviews",
    theJournal: "The Journal",
    accredHeader: "Distinguished Accreditations",
    awardNominee: "Awwwards nominee 2026",
    awardDesc: "World Luxury Design Excellence",
    earthAlliance: "Earth Alliance Member",
    carbonNeutral: "100% Carbon-Neutral certified",
    rightsReserved: "© 2026 NaturO Luxury Expeditions Ltd. All privileges reserved.",
    madeWith: "Made with",
    by: "by AI Studio Build"
  },
  RU: {
    desc: "NaturO предлагает первоклассные экологичные индивидуальные экспедиции в Кочкоре и на озере Сон-Куль. Мы сочетаем комфорт с глубокой заботой об окружающей среде.",
    subJournal: "Подписаться на вестник NaturO",
    subDesc: "Получайте сезонные отчеты об экспедициях, секретные карты маршрутов и приоритетные обновления мест.",
    subscribedMsg: "Спасибо! Ваш доступ успешно зарегистрирован.",
    emailPlaceholder: "напр. ivan@gmail.com",
    subscribeBtn: "Подписаться",
    officesHeader: "Наши Офисы",
    address: "Кыргызстан, Нарынская обл., с. Кочкор, ул. Орозбакова 60",
    accentsHeader: "Разделы Сайта",
    destinations: "Направления",
    bespokeTours: "Индивидуальные Туры",
    expeditionMap: "Карта Маршрутов",
    ourValues: "Наши Ценности",
    guestReviews: "Отзывы Гостей",
    theJournal: "Блог Путешествий",
    accredHeader: "Выдающиеся Аккредитации",
    awardNominee: "Номинант Awwwards 2026",
    awardDesc: "Мировое совершенство роскошного дизайна",
    earthAlliance: "Член Альянса Земли",
    carbonNeutral: "Сертифицировано 100% углеродно-нейтрально",
    rightsReserved: "© 2026 NaturO Luxury Expeditions Ltd. Все права защищены.",
    madeWith: "Сделано с",
    by: "в AI Studio Build"
  }
};

export default function Footer({ language, openAdmin }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const isRu = language === "RU";
  const t = isRu ? FOOTER_TRANSLATIONS.RU : FOOTER_TRANSLATIONS.EN;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-20 pb-12 relative overflow-hidden" id="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Segment: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 text-2xl font-black tracking-widest uppercase mb-4">
              <Logo className="w-10 h-10 text-turquoise" isDark={true} />
              <span>Natur<span className="text-turquoise">O</span></span>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
              {t.desc}
            </p>
          </div>

          {/* Newsletter Panel */}
          <div className="lg:col-span-7">
            <h3 className="text-lg font-bold tracking-tight mb-2">{t.subJournal}</h3>
            <p className="text-xs text-slate-400 font-medium mb-4">
              {t.subDesc}
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-turquoise/10 border border-turquoise/30 rounded-xl flex items-center gap-2.5 text-turquoise text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="w-5 h-5 fill-turquoise/5" />
                <span>{t.subscribedMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-turquoise placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-turquoise hover:bg-turquoise/80 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  {t.subscribeBtn}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Segment: Contacts, Links & Partners */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16">
          
          {/* Column 1: Contacts */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">{t.officesHeader}</h4>
            <div className="flex flex-col gap-4 text-xs text-slate-400 font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-turquoise shrink-0 mt-0.5" />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-turquoise shrink-0" />
                <span>{isRu ? "+996 (555) 123-456" : "+44 (20) 7946 0192"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-turquoise shrink-0" />
                <span>curator@natur-o-expeditions.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick actions */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">{t.accentsHeader}</h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 font-semibold">
              <a href="#destinations" className="hover:text-turquoise transition-colors">{t.destinations}</a>
              <a href="#tours" className="hover:text-turquoise transition-colors">{t.bespokeTours}</a>
              <a href="#why-us" className="hover:text-turquoise transition-colors">{t.ourValues}</a>
              <a href="#testimonials" className="hover:text-turquoise transition-colors">{t.guestReviews}</a>
              <a href="#blog" className="hover:text-turquoise transition-colors">{t.theJournal}</a>
              <button onClick={openAdmin} className="text-left text-xs font-bold text-slate-500 hover:text-turquoise transition-colors cursor-pointer">
                {isRu ? "Админ Панель" : "Admin Panel"}
              </button>
            </div>
          </div>

          {/* Column 3: Awards & Partners */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">{t.accredHeader}</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">{t.awardNominee}</h5>
                  <span className="text-[10px] text-slate-500">{t.awardDesc}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-turquoise shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">{t.earthAlliance}</h5>
                  <span className="text-[10px] text-slate-500">{t.carbonNeutral}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright Segment */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-semibold">
          <p>{t.rightsReserved}</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            <span>{t.madeWith}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>{t.by}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
