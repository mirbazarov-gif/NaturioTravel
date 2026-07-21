import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, DollarSign, Users, MapPin, ArrowRight, CheckCircle2, Loader2, Sparkles, Phone, Mail, User, BookOpen } from "lucide-react";
import { Language } from "../types";
import { UI_TRANSLATIONS } from "../translations";

interface HeroSectionProps {
  onSearch: (searchData: {
    destination: string;
    date: string;
    budget: number;
    travelers: number;
  }) => void;
  onExploreClick: () => void;
  language: Language;
  tours?: any[];
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1920", // Ala Archa, high Tian Shan peaks
  "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1920", // Majestic Tian Shan valleys
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1920", // Tian Shan peaks and yurt at Song-Kul
];

const DEFAULT_TOURS = [
  {
    id: "tour-1",
    title: { EN: "Kol-Ukok Lake Horseback Expedition", RU: "Конная экспедиция на озеро Коль-Укок" },
    price: 280,
    dates: ["Jul 12 - Jul 15", "Aug 02 - Aug 05", "Aug 18 - Aug 21"]
  },
  {
    id: "tour-2",
    title: { EN: "Song-Kul Lake Alpine Nomad Sanctuary", RU: "Сон-Куль: Высокогорное Святилище Номадов" },
    price: 390,
    dates: ["Jul 24 - Jul 28", "Aug 10 - Aug 14", "Sep 02 - Sep 06"]
  }
];

export default function HeroSection({ onSearch, onExploreClick, language, tours = [] }: HeroSectionProps) {
  const [currentBg, setCurrentBg] = useState(0);
  
  // Active tours to use for dropdown
  const activeTours = tours.length > 0 ? tours : DEFAULT_TOURS;

  // Booking Form States
  const [selectedTourId, setSelectedTourId] = useState(activeTours[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // UI Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Update dates dropdown when selected tour changes
  const selectedTour = activeTours.find(t => t.id === selectedTourId) || activeTours[0];

  useEffect(() => {
    if (selectedTour) {
      setSelectedDate(selectedTour.dates?.[0] || "Daily Departures on Request");
    }
  }, [selectedTourId, tours]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const bookingPayload = {
      tourId: selectedTour.id,
      tourTitle: {
        EN: selectedTour.title?.EN || selectedTour.title,
        RU: selectedTour.title?.RU || selectedTour.title
      },
      date: selectedDate,
      travelers: travelers,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      specialRequests: specialRequests,
      totalPrice: selectedTour.price * travelers,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });

      if (!response.ok) {
        throw new Error(language === "RU" ? "Ошибка сервера при отправке брони." : "Server error while submitting booking.");
      }

      const savedBooking = await response.json();
      setBookingSuccess(savedBooking);

      // Reset form fields
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setSpecialRequests("");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen py-24 w-full flex items-center justify-center overflow-hidden" id="hero-section">
      {/* Immersive Slideshow Background with Ken-Burns scale effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBg}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-referrer"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentBg]})` }}
          />
        </AnimatePresence>
        {/* Dark Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-950 z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center">
        
        {/* Keynote Headline */}
        <div className="text-center max-w-3xl mb-8 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-slate-900/40 border border-white/20 backdrop-blur-md mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-turquoise animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              {language === "RU" ? "БРОНИРОВАНИЕ ОТКРЫТО" : "RESERVATIONS OPEN"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans text-shadow-md"
          >
            {language === "RU" ? "Забронируйте Приключение" : "Reserve Your Next Adventure"}{" "}<br />
            <span className="text-white italic font-serif">
              {language === "RU" ? "с местными гидами Nomad Travel" : "with Community Nomad Travel Guides"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-sm md:text-base text-slate-200 font-medium tracking-wide leading-relaxed max-w-2xl mx-auto drop-shadow-md"
          >
            {language === "RU" 
              ? "Оформите заявку на индивидуальное планирование экспедиции. Безупречный сервис, персональный подход и легендарное гостеприимство." 
              : "Submit your custom expedition request. Flawless logistical execution, bespoke itineraries, and absolute care."}
          </motion.p>
        </div>

        {/* Dynamic Glassmorphic Booking Panel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="w-full max-w-3xl"
        >
          <AnimatePresence mode="wait">
            {!bookingSuccess ? (
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white/95 dark:bg-white backdrop-blur-2xl border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-2xl shadow-slate-900/10 text-slate-900"
              >
                <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                  <div className="p-2 bg-turquoise/20 rounded-xl">
                    <BookOpen className="w-5 h-5 text-turquoise" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-wider">
                      {language === "RU" ? "Детали бронирования" : "Reservation details"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {language === "RU" ? "Заполните форму для оформления заказа" : "Fill out the form below to book your spot"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-6" id="hero-search-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Select Tour */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                        {language === "RU" ? "Выберите тур" : "Select Tour"}
                      </label>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                        <MapPin className="w-5 h-5 text-turquoise shrink-0" />
                        <select
                          value={selectedTourId}
                          onChange={(e) => setSelectedTourId(e.target.value)}
                          className="bg-transparent border-none text-slate-800 text-xs font-semibold w-full focus:outline-none cursor-pointer"
                        >
                          {activeTours.map((t) => (
                            <option key={t.id} value={t.id} className="text-slate-900">
                              {(language === "RU" ? t.title?.RU || t.title : t.title?.EN || t.title)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Available Dates */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                        {language === "RU" ? "Доступные даты" : "Available Dates"}
                      </label>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                        <Calendar className="w-5 h-5 text-turquoise shrink-0" />
                        <select
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="bg-transparent border-none text-slate-800 text-xs font-semibold w-full focus:outline-none cursor-pointer"
                        >
                          {selectedTour?.dates?.map((d: string) => (
                            <option key={d} value={d} className="text-slate-900">
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Guests Count */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                        {language === "RU" ? "Количество гостей" : "Number of Guests"}
                      </label>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                        <Users className="w-5 h-5 text-turquoise shrink-0" />
                        <select
                          value={travelers}
                          onChange={(e) => setTravelers(Number(e.target.value))}
                          className="bg-transparent border-none text-slate-800 text-xs font-semibold w-full focus:outline-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
                            <option key={num} value={num} className="text-slate-900">
                              {num} {num === 1 ? (language === "RU" ? "гость" : "guest") : (language === "RU" ? "гостей" : "guests")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Customer Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                        {language === "RU" ? "Ваше Имя" : "Your Name"}
                      </label>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                        <User className="w-5 h-5 text-turquoise shrink-0" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={language === "RU" ? "Иван Иванов" : "John Doe"}
                          className="bg-transparent border-none text-slate-800 text-xs font-semibold w-full focus:outline-none placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Customer Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                        {language === "RU" ? "Номер телефона" : "Phone Number"}
                      </label>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                        <Phone className="w-5 h-5 text-turquoise shrink-0" />
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+996 555 123456"
                          className="bg-transparent border-none text-slate-800 text-xs font-semibold w-full focus:outline-none placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Customer Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                        {language === "RU" ? "Email адрес" : "Email Address"}
                      </label>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                        <Mail className="w-5 h-5 text-turquoise shrink-0" />
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="client@example.com"
                          className="bg-transparent border-none text-slate-800 text-xs font-semibold w-full focus:outline-none placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                      {language === "RU" ? "Особые пожелания (вегетарианство, аренда лошадей и др.)" : "Special Requests (dietary, horse rental, etc.)"}
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder={language === "RU" ? "Например: Нужен вегетарианский рацион, аренда дополнительного снаряжения..." : "E.g. Vegetarian meal plan requested, extra mountain riding gear..."}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-turquoise placeholder-slate-400 resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-2xl text-xs text-red-600 font-bold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Pricing footer & submission */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
                    <div className="text-center sm:text-left max-w-sm">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {language === "RU" ? "Премиум Стандарт" : "Premium Standard"}
                      </p>
                      <p className="text-xs text-slate-500 font-medium leading-normal mt-1">
                        {language === "RU"
                          ? "Индивидуальное сопровождение, сертифицированные гиды и надежный автотранспорт на протяжении всего пути."
                          : "Dedicated private coordinators, certified expert guides, and premium support throughout your journey."}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-turquoise to-emerald-500 hover:from-emerald-500 hover:to-turquoise text-slate-950 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-turquoise/25 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>{language === "RU" ? "Отправка..." : "Reserving..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{language === "RU" ? "Подтвердить Бронь" : "Confirm Booking"}</span>
                          <ArrowRight className="w-4 h-4 text-slate-950" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl text-center relative overflow-hidden text-slate-900"
              >
                {/* Visual success accents */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full filter blur-2xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-turquoise/10 rounded-full filter blur-2xl pointer-events-none" />

                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                  {language === "RU" ? "Бронь Успешно Создана!" : "Reservation Created Successfully!"}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  {language === "RU" 
                    ? "Благодарим за доверие! Наш Nomad Travel координатор свяжется с вами по указанному телефону в течение часа."
                    : "Thank you for choosing Nomad Travel! Our coordinator will contact you by phone or email within an hour to confirm."}
                </p>

                <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-left space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">{language === "RU" ? "ID Бронирования:" : "Booking Reference:"}</span>
                    <span className="font-mono text-turquoise font-extrabold">{bookingSuccess.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">{language === "RU" ? "Тур:" : "Tour:"}</span>
                    <span className="text-slate-800 font-bold text-right max-w-[240px] truncate">
                      {language === "RU" ? bookingSuccess.tourTitle?.RU || bookingSuccess.tourTitle : bookingSuccess.tourTitle?.EN || bookingSuccess.tourTitle}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">{language === "RU" ? "Дата:" : "Date:"}</span>
                    <span className="text-slate-800 font-semibold">{bookingSuccess.date}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">{language === "RU" ? "Количество гостей:" : "Travelers:"}</span>
                    <span className="text-slate-800 font-semibold">{bookingSuccess.travelers}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{language === "RU" ? "Тип поддержки:" : "Eco Partnership:"}</span>
                    <span className="text-xs font-extrabold text-emerald-600">{language === "RU" ? "Прямая помощь семьям" : "Direct Family Support"}</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingSuccess(null)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  {language === "RU" ? "Забронировать еще" : "Book another trip"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll down mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          onClick={onExploreClick}
          className="mt-12 flex flex-col items-center gap-1.5 cursor-pointer group"
          id="scroll-indicator"
        >
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-turquoise transition-colors">
            {t.scrollToDiscover}
          </span>
          <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-500 rounded-full flex justify-center p-1 group-hover:border-turquoise transition-colors">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-turquoise rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
