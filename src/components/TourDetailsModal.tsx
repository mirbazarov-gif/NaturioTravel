import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Calendar, Users, MapPin, Check, CloudSun, CreditCard, ShieldCheck, HelpCircle, Activity, Heart, Flame } from "lucide-react";
import { Tour, Currency, Language } from "../types";
import { UI_TRANSLATIONS, getTranslation, getTranslationArray } from "../translations";

interface TourDetailsModalProps {
  tour: Tour | null;
  onClose: () => void;
  currency: Currency;
  wishlist: string[];
  toggleWishlist: (tourId: string) => void;
  onBookingSuccess: (tourId: string, slots: number) => void;
  language: Language;
}

export default function TourDetailsModal({
  tour,
  onClose,
  currency,
  wishlist,
  toggleWishlist,
  onBookingSuccess,
  language,
}: TourDetailsModalProps) {
  const [bookingStep, setBookingStep] = useState<"details" | "form" | "payment" | "success">("details");
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Payment states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  // Weather state
  const [weather, setWeather] = useState<{ temp: number; text: string; humidity: number; wind: string } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Fetch Weather Forecast
  useEffect(() => {
    if (!tour) return;
    setWeatherLoading(true);
    fetch(`/api/weather?location=${encodeURIComponent(tour.weatherLocation)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWeather({
            temp: data.temp,
            text: data.text,
            humidity: data.humidity,
            wind: data.wind,
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setWeatherLoading(false));

    // Reset Steps
    setBookingStep("details");
    setSelectedDate(tour.dates[0] || "");
    setGuests(1);
    setName("");
    setEmail("");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
  }, [tour]);

  if (!tour) return null;

  const getPriceValue = (price: number) => {
    switch (currency) {
      case "EUR": return price * 0.92;
      case "GBP": return price * 0.79;
      default: return price;
    }
  };

  const getPriceString = (price: number) => {
    const val = getPriceValue(price);
    switch (currency) {
      case "EUR": return `€ ${val.toFixed(0)}`;
      case "GBP": return `£ ${val.toFixed(0)}`;
      default: return `$ ${val.toLocaleString()}`;
    }
  };

  const totalPrice = getPriceValue(tour.price) * guests;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setBookingStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) return;
    
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setBookingStep("success");
      onBookingSuccess(tour.id, guests);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-120 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden text-slate-900 dark:text-white relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-950/40 text-white rounded-full hover:bg-slate-950/60 transition-colors z-30 cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left: Immersive Media Frame */}
            <div className="md:col-span-5 relative h-52 md:h-auto min-h-[250px] bg-slate-950">
              <img
                src={tour.image}
                alt={getTranslation(tour.title, language)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-slate-950/60 z-10" />
              
              {/* Floating detail tag overlay */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[10px] font-bold tracking-widest px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full uppercase">
                  {tour.category === "Luxury" ? (language === "RU" ? "Люкс" : "Luxury") : tour.category === "Adventure" ? (language === "RU" ? "Приключения" : "Adventure") : tour.category === "Eco-Travel" ? (language === "RU" ? "Эко-Туры" : "Eco-Travel") : tour.category === "Cultural" ? (language === "RU" ? "Культура" : "Cultural") : tour.category}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2 leading-tight">
                  {getTranslation(tour.title, language)}
                </h3>
              </div>
            </div>

            {/* Right: Dynamic Workflow panels */}
            <div className="md:col-span-7 p-6 md:p-8 max-h-[85vh] overflow-y-auto">
              
              <AnimatePresence mode="wait">
                {/* Panel 1: Details and Information */}
                {bookingStep === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-turquoise uppercase tracking-wider font-mono">
                        {getTranslation(tour.country, language)} {language === "RU" ? "Экспедиция" : "Expedition"}
                      </span>
                      <div className="flex items-center gap-1 text-gold-accent font-bold text-xs">
                        <Star className="w-4 h-4 fill-gold-accent" />
                        <span>{tour.rating}</span>
                        <span className="text-slate-400 font-semibold">({tour.reviews} {language === "RU" ? "отзывов" : "reviews"})</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-tight mb-4">
                      {getTranslation(tour.title, language)}
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                      {getTranslation(tour.description, language)}
                    </p>

                    {/* Highlights Shelf */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                        {language === "RU" ? "Особенности Экспедиции" : "Expedition Highlights"}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {getTranslationArray(tour.highlights, language).map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-semibold">
                            <Check className="w-4 h-4 text-turquoise shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live Weather Widget */}
                    <div className="mb-6 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-turquoise/15 rounded-xl text-turquoise">
                          <CloudSun className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-slate-400">{language === "RU" ? "Погода Направления" : "Destination Weather"}</h4>
                          {weatherLoading ? (
                            <span className="text-xs text-slate-400 animate-pulse block">Retrieving forecast...</span>
                          ) : weather ? (
                            <span className="text-xs font-bold text-slate-850 dark:text-slate-200">
                              {weather.text} • {weather.temp}°C
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">Unavailable</span>
                          )}
                        </div>
                      </div>
                      {weather && (
                        <div className="text-right text-[10px] text-slate-400 font-semibold">
                          <div>Wind: {weather.wind}</div>
                          <div>Humidity: {weather.humidity}%</div>
                        </div>
                      )}
                    </div>

                    {/* Booking metadata and Actions */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Privilege Fee</span>
                        <span className="text-2xl font-black text-slate-950 dark:text-white">
                          {getPriceString(tour.price)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleWishlist(tour.id)}
                          className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                            wishlist.includes(tour.id)
                              ? "bg-red-500/10 border-red-500 text-red-500"
                              : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-red-500 hover:border-red-500"
                          }`}
                          title="Save to Wishlist"
                        >
                          <Heart className={`w-5 h-5 ${wishlist.includes(tour.id) ? "fill-red-500" : ""}`} />
                        </button>
                        <button
                          onClick={() => setBookingStep("form")}
                          className="px-6 py-3.5 bg-gradient-to-r from-deep-ocean to-turquoise hover:from-turquoise hover:to-deep-ocean text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          Configure Booking
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Panel 2: Online Reservation form */}
                {bookingStep === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-bold tracking-tight mb-2">Configure Reservation</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                      Fill out your contact credentials to register. Our system is secured using TLS 1.3 encryption.
                    </p>

                    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Sir Henry Sterling"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-turquoise"
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Email Credentials</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. henry@sterlingphilanthropy.com"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-turquoise"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Select Date */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Expedition Date</label>
                          <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                          >
                            {tour.dates.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        {/* Guest Count */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Number of Guests</label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <option key={num} value={num}>{num} {num === 1 ? "Guest" : "Guests"}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Summary box */}
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 mt-2 flex items-center justify-between text-xs">
                        <span className="font-bold uppercase text-[10px] text-slate-400">Total Booking Sum:</span>
                        <strong className="text-md font-extrabold text-turquoise">
                          {getPriceString(tour.price * guests)}
                        </strong>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setBookingStep("details")}
                          className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase rounded-xl hover:bg-slate-200 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-gradient-to-r from-deep-ocean to-turquoise text-white text-xs font-bold uppercase rounded-xl shadow-md hover:from-turquoise hover:to-deep-ocean transition-all"
                        >
                          Proceed to Secure Escrow
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Panel 3: Premium Online Payment Simulation */}
                {bookingStep === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-bold tracking-tight mb-2">Escrow Payment Gateway</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                      Simulated VIP credit card processor. No real funds will be debited.
                    </p>

                    {/* Glassmorphic Credit Card mockup */}
                    <div className="bg-gradient-to-br from-turquoise/40 via-deep-ocean to-slate-950 border border-white/20 p-6 rounded-2xl shadow-xl text-white mb-6 relative overflow-hidden">
                      {/* Decors */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full filter blur-xl pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-6">
                        <CreditCard className="w-8 h-8 text-white/80" />
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/10">
                          NaturO Gold Card
                        </span>
                      </div>

                      <div className="font-mono text-lg tracking-widest mb-6 text-white/90">
                        {cardNumber ? cardNumber : "•••• •••• •••• ••••"}
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[8px] text-slate-400 block font-bold">CARDHOLDER</span>
                          <span className="text-xs font-bold tracking-wider uppercase">
                            {cardName ? cardName : "Henry Sterling"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[8px] text-slate-400 block font-bold">EXPIRES</span>
                          <span className="text-xs font-bold tracking-wider">
                            {cardExpiry ? cardExpiry : "MM/YY"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
                      {/* Number inputs */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-turquoise"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Cardholder Name</label>
                          <input
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Henry Sterling"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Expiry</label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">CVV Security Code</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-24 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          disabled={isPaying}
                          onClick={() => setBookingStep("form")}
                          className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase rounded-xl"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isPaying}
                          className="flex-1 py-3 bg-gradient-to-r from-deep-ocean to-turquoise text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg flex items-center justify-center gap-2"
                        >
                          {isPaying ? (
                            <>
                              <Activity className="w-4 h-4 animate-spin" />
                              <span>Processing Escrow...</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              <span>Secure Pay {getPriceString(totalPrice)}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Panel 4: Celebration Success layout */}
                {bookingStep === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <Check className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-black tracking-tight mb-2">Expedition Registered!</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto mb-6">
                      Congratulations, your bespoke slot on the <strong>{tour.title}</strong> is fully secured! A personal charter voucher has been logged to your inbox.
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 text-left w-full max-w-sm mb-8 text-xs font-semibold">
                      <div className="flex justify-between py-1.5 border-b border-slate-200/40 dark:border-slate-800/40">
                        <span className="text-slate-400 uppercase text-[9px] font-bold">Booking Holder:</span>
                        <span className="text-slate-950 dark:text-white font-bold">{name}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200/40 dark:border-slate-800/40">
                        <span className="text-slate-400 uppercase text-[9px] font-bold">Bespoke Date:</span>
                        <span className="text-slate-950 dark:text-white font-bold">{selectedDate}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200/40 dark:border-slate-800/40">
                        <span className="text-slate-400 uppercase text-[9px] font-bold">Guests Count:</span>
                        <span className="text-slate-950 dark:text-white font-bold">{guests} Explorer</span>
                      </div>
                      <div className="flex justify-between py-1.5 pt-3">
                        <span className="text-turquoise uppercase text-[9px] font-bold">Total Paid (Secure):</span>
                        <strong className="text-emerald-500 font-extrabold">{getPriceString(totalPrice)}</strong>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="px-8 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-85 transition-opacity"
                    >
                      Continue Discoveries
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
