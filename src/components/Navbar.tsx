import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Heart, Globe, DollarSign, Menu, X, Moon, Sun, ArrowUpRight, Settings } from "lucide-react";
import { Currency, Language } from "../types";
import { UI_TRANSLATIONS } from "../translations";
import Logo from "./Logo";

interface NavbarProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  wishlistCount: number;
  openWishlist: () => void;
  activePage: string;
  onNavigate: (sectionId: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  openChat: () => void;
  openAdmin: () => void;
}

export default function Navbar({
  currency,
  setCurrency,
  language,
  setLanguage,
  wishlistCount,
  openWishlist,
  activePage,
  onNavigate,
  isDark,
  toggleTheme,
  openChat,
  openAdmin,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.navHome, id: "home" },
    { label: t.navDestinations, id: "destinations" },
    { label: t.navTours, id: "tours" },
    { label: t.navEvents, id: "events" },
    { label: t.navAbout, id: "about" },
  ];

  const handleNavItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case "RU": return "RU (Русский)";
      default: return "EN (English)";
    }
  };

  const getCurrencySymbol = (cur: Currency) => {
    switch (cur) {
      case "EUR": return "€ EUR";
      case "GBP": return "£ GBP";
      default: return "$ USD";
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800/20 py-2"
            : "bg-transparent py-4"
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-2xl font-bold font-sans tracking-widest text-slate-900 dark:text-white group"
            id="nav-logo"
          >
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" isDark={isDark} />
            <span className="bg-gradient-to-r from-deep-ocean to-turquoise bg-clip-text text-transparent dark:from-white dark:to-sky-blue font-extrabold uppercase">
              Natur<span className="text-turquoise dark:text-gold-accent">O</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`text-sm font-medium transition-colors relative group py-2 cursor-pointer ${
                  activePage === item.id
                    ? "text-turquoise font-bold"
                    : "text-slate-700 hover:text-turquoise dark:text-slate-300 dark:hover:text-turquoise"
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-turquoise transition-all duration-300 ${
                  activePage === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </button>
            ))}
          </nav>

          {/* Right Tools (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors relative cursor-pointer"
              id="nav-wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
                id="nav-lang-selector"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language}</span>
              </button>
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-lg bg-opacity-95"
                  >
                    {(["EN", "RU"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                          language === lang ? "text-turquoise font-semibold bg-slate-50 dark:bg-slate-800/40" : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {getLanguageLabel(lang)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                  setIsLangDropdownOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
                id="nav-currency-selector"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>{currency}</span>
              </button>
              <AnimatePresence>
                {isCurrencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-lg bg-opacity-95"
                  >
                    {(["USD", "EUR", "GBP"] as Currency[]).map((cur) => (
                      <button
                        key={cur}
                        onClick={() => {
                          setCurrency(cur);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                          currency === cur ? "text-turquoise font-semibold bg-slate-50 dark:bg-slate-800/40" : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {getCurrencySymbol(cur)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Dashboard Control Trigger */}
            <button
              onClick={openAdmin}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              title={t.adminTitle}
              id="nav-admin-trigger"
            >
              <Settings className="w-5 h-5 text-slate-500 hover:text-turquoise transition-colors" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              id="nav-theme-toggle"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-gold-accent" /> : <Moon className="w-5 h-5 text-deep-ocean" />}
            </button>

            {/* Book Now Button */}
            <button
              onClick={openChat}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-deep-ocean to-turquoise hover:from-turquoise hover:to-deep-ocean text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-turquoise/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              id="nav-book-now"
            >
              <span>{t.navAiAssistant}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openAdmin}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Settings className="w-5 h-5 text-slate-500" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-gold-accent" /> : <Moon className="w-5 h-5 text-deep-ocean" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
              id="nav-mobile-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-14 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`text-left text-lg font-semibold transition-colors cursor-pointer ${
                    activePage === item.id ? "text-turquoise font-extrabold" : "text-slate-800 dark:text-slate-100 hover:text-turquoise"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800 my-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 font-medium">Currency</span>
                <div className="flex gap-2">
                  {(["USD", "EUR", "GBP"] as Currency[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => setCurrency(cur)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border cursor-pointer ${
                        currency === cur
                          ? "bg-turquoise border-turquoise text-white"
                          : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 font-medium">Language</span>
                <div className="flex gap-2">
                  {(["EN", "RU"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border cursor-pointer ${
                        language === lang
                          ? "bg-turquoise border-turquoise text-white"
                          : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openWishlist();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openChat();
                  }}
                  className="flex-1 py-3 bg-turquoise text-slate-950 text-sm font-bold uppercase tracking-wider rounded-full text-center shadow-lg hover:bg-turquoise/90 transition-all cursor-pointer"
                >
                  {t.navAiAssistant}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
