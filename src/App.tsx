import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DestinationsList from "./components/DestinationsList";
import ToursCarousel from "./components/ToursCarousel";
import EventsSection from "./components/EventsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import GallerySection from "./components/GallerySection";
import SpecialOffers from "./components/SpecialOffers";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import AIAssistantChat from "./components/AIAssistantChat";
import TourDetailsModal from "./components/TourDetailsModal";
import WishlistDrawer from "./components/WishlistDrawer";
import CompareDrawer from "./components/CompareDrawer";
import AdminPanel from "./components/AdminPanel";
import TianShanBackground from "./components/TianShanBackground";
import { Tour, Destination, Testimonial, BlogPost, Currency, Language } from "./types";
import { UI_TRANSLATIONS, getTranslation } from "./translations";
import { Filter, X, ArrowUp, Compass } from "lucide-react";

export default function App() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [language, setLanguage] = useState<Language>("EN");
  const [isDark, setIsDark] = useState(true);

  // Live database state
  const [tours, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Panels toggles
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isWishlistOpen, setIsWishOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Lists persistence
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Search/Filter states
  const [searchFilter, setSearchFilter] = useState<{
    destination: string;
    date: string;
    budget: number;
    travelers: number;
  } | null>(null);

  // Back to top scroll state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active page route (multi-page state synchronized with window hash)
  const [activePage, setActivePage] = useState<string>("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "destinations", "tours", "events", "about"].includes(hash)) {
        setActivePage(hash);
      } else {
        setActivePage("home");
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (pageId: string) => {
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = UI_TRANSLATIONS[language];

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("API status error: " + res.status);
      const data = await res.json();
      setTours(data.tours || []);
      setDestinations(data.destinations || []);
      setTestimonials(data.testimonials || []);
      setBlogPosts(data.blogPosts || []);
    } catch (err) {
      console.error("Failed to load content from dynamic server:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    const handleLocationCheck = () => {
      const path = window.location.pathname;
      if (path === "/admin" || path === "/admin/") {
        setIsAdminOpen(true);
      } else {
        setIsAdminOpen(false);
      }
    };

    handleLocationCheck();
    window.addEventListener("popstate", handleLocationCheck);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      const result = originalPushState.apply(this, args);
      handleLocationCheck();
      return result;
    };

    return () => {
      window.removeEventListener("popstate", handleLocationCheck);
      window.history.pushState = originalPushState;
    };
  }, []);

  const openAdmin = () => {
    if (window.location.pathname !== "/admin" && window.location.pathname !== "/admin/") {
      window.history.pushState({}, "", "/admin");
    }
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
      window.history.pushState({}, "", "/");
    }
    setIsAdminOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync stateful wishlist & comparison logs on load
  useEffect(() => {
    const savedWish = localStorage.getItem("naturo_wishlist");
    const savedComp = localStorage.getItem("naturo_compare");
    if (savedWish) setWishlist(JSON.parse(savedWish));
    if (savedComp) setCompareList(JSON.parse(savedComp));
  }, []);

  const toggleWishlist = (tourId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId];
      localStorage.setItem("naturo_wishlist", JSON.stringify(next));
      return next;
    });
  };

  const toggleCompare = (tourId: string) => {
    setCompareList((prev) => {
      let next = [...prev];
      if (prev.includes(tourId)) {
        next = prev.filter((id) => id !== tourId);
      } else {
        if (prev.length >= 3) {
          alert(language === "RU" ? "Вы можете сравнивать до 3 туров одновременно." : "You can compare up to 3 luxury tours at a time.");
          return prev;
        }
        next = [...prev, tourId];
      }
      localStorage.setItem("naturo_compare", JSON.stringify(next));
      return next;
    });
    setIsCompareOpen(true);
  };

  const handleSearch = (searchData: {
    destination: string;
    date: string;
    budget: number;
    travelers: number;
  }) => {
    setSearchFilter(searchData);
    navigateTo("tours");
  };

  const selectDestinationFilter = (destinationName: string) => {
    setSearchFilter({
      destination: destinationName,
      date: "",
      budget: 8000,
      travelers: 1,
    });
    navigateTo("tours");
  };

  const handleBookingSuccess = async (tourId: string, slots: number) => {
    try {
      const tourToUpdate = tours.find(t => t.id === tourId);
      if (tourToUpdate) {
        const nextSlots = Math.max(0, tourToUpdate.liveAvailability - slots);
        await fetch(`/api/tours/${tourId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ liveAvailability: nextSlots })
        });
        await fetchContent();
      }
    } catch (err) {
      console.error("Failed to record booking updates dynamically:", err);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Compass className="w-16 h-16 text-turquoise animate-spin mb-4" />
        <h2 className="text-xl font-bold tracking-widest bg-gradient-to-r from-turquoise to-white bg-clip-text text-transparent uppercase">
          NaturO Elite
        </h2>
        <p className="text-xs text-slate-500 font-mono tracking-wider mt-1">Configuring Immersive Ecosystem...</p>
      </div>
    );
  }

  return (
    <div className={isDark ? "dark bg-slate-950 text-white" : "bg-white text-slate-900"}>
      <div className="min-h-screen font-sans transition-colors duration-300 relative overflow-hidden flex flex-col justify-between">
        
        <div>
          {/* Draw the majestic high-altitude mountains of Tian Shan as a background pattern */}
          <TianShanBackground isDark={isDark} />
          
          {/* Navbar */}
          <Navbar
            currency={currency}
            setCurrency={setCurrency}
            language={language}
            setLanguage={setLanguage}
            wishlistCount={wishlist.length}
            openWishlist={() => setIsWishOpen(true)}
            activePage={activePage}
            onNavigate={navigateTo}
            isDark={isDark}
            toggleTheme={toggleTheme}
            openChat={() => setIsChatOpen(true)}
            openAdmin={openAdmin}
          />

          {/* Render Active Page view with smooth entry/exit animations */}
          <AnimatePresence mode="wait">
            <motion.main
              key={activePage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pt-24 pb-16 min-h-[calc(100vh-320px)] relative z-10"
            >
              {activePage === "home" && (
                <>
                  <HeroSection
                    onSearch={handleSearch}
                    onExploreClick={() => navigateTo("destinations")}
                    language={language}
                    tours={tours}
                  />
                  
                  {/* Majestic Multi-Page Welcome Block explaining NaturO Community Mission */}
                  <section className="py-20 max-w-7xl mx-auto px-4 md:px-8 border-t border-slate-100 dark:border-slate-900/60 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-turquoise tracking-widest uppercase block">
                          {language === "RU" ? "ЭКОЛОГИЧЕСКАЯ МИССИЯ" : "OUR CONSERVATION CUSTODY"}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                          {language === "RU" 
                            ? "Возрождение туризма через заботу о местной культуре" 
                            : "Redefining Travel Through Local Ownership"}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                          {language === "RU"
                            ? "NaturO — это не просто туры, а социальный проект поддержки отдаленных сообществ Кыргызстана. 100% доходов от проживания в юртах, аренды лошадей и услуг гидов напрямую поступает местным чабанам и их семьям."
                            : "NaturO operates hand-in-hand with nomadic shepherds in Kochkor and Song-Kul lake valleys. Every horse trek, traditional meal, and yurt stay is owned and hosted by local families, keeping profits completely within the mountain communities."}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                          <button
                            onClick={() => navigateTo("tours")}
                            className="px-6 py-3 bg-gradient-to-r from-deep-ocean to-turquoise text-white hover:scale-105 transition-all font-bold rounded-full cursor-pointer text-sm shadow-lg shadow-turquoise/10"
                          >
                            {language === "RU" ? "Посмотреть туры" : "Browse Expeditions"}
                          </button>
                          <button
                            onClick={() => navigateTo("about")}
                            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-300 transition-all font-bold rounded-full cursor-pointer text-sm"
                          >
                            {language === "RU" ? "Подробнее о нас" : "Learn More"}
                          </button>
                        </div>
                      </div>
                      
                      <div className="relative group overflow-hidden rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">
                        <img 
                          src="https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1200" 
                          alt="Kyrgyzstan High Valley" 
                          className="w-full h-80 md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-transparent flex items-end p-8">
                          <div className="text-white">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-turquoise block mb-1">
                              {language === "RU" ? "Сон-Кульская долина" : "Song-Kul High Valley"}
                            </span>
                            <p className="text-lg font-bold">
                              {language === "RU" ? "3016 метров над уровнем моря" : "3016 Meters Above Sea Level"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Special Offers Promotional Ribbon with timer on Home */}
                  <SpecialOffers 
                    onBookOffer={(tourId) => selectDestinationFilter("Song-Kul Lake")} 
                    language={language}
                  />

                  {/* Aesthetic Photo Grid */}
                  <GallerySection language={language} />
                </>
              )}

              {activePage === "destinations" && (
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="px-3 py-1 bg-turquoise/15 text-turquoise text-[11px] font-extrabold rounded-full uppercase tracking-widest block w-fit mx-auto mb-4">
                      {language === "RU" ? "ГЕОГРАФИЯ ЧУДЕС" : "GEOGRAPHIC SANCTUARIES"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                      {language === "RU" ? "Направления NaturO" : "NaturO Destinations"}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                      {language === "RU" 
                        ? "Эксклюзивные пропуски в красивейшие заповедные регионы, отдаленные альпийские озера и священные кочевые долины Кыргызстана."
                        : "Bespoke access to the most visually stunning high-altitude domains, pristine alpine waters, and sacred nomadic pasture valleys of Kyrgyzstan."}
                    </p>
                  </div>
                  <DestinationsList 
                    onSelectDestination={selectDestinationFilter} 
                    destinations={destinations}
                    language={language}
                  />
                </div>
              )}

              {activePage === "tours" && (
                <div>
                  <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                      <span className="px-3 py-1 bg-turquoise/15 text-turquoise text-[11px] font-extrabold rounded-full uppercase tracking-widest block w-fit mx-auto mb-4">
                        {language === "RU" ? "НАШИ ЭКСПЕДИЦИИ" : "EXPEDITION REGISTER"}
                      </span>
                      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                        {language === "RU" ? "Каталог Приключений" : "NaturO Expeditions"}
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400">
                        {language === "RU" 
                          ? "Управляйте фильтрами сложности и длительности, чтобы выбрать идеальный конный поход или проживание в юртах."
                          : "Configure duration, physical difficulty, and budget thresholds to discover your tailored community-hosted high-altitude mountain trek."}
                      </p>
                    </div>

                    {searchFilter && (
                      <div className="bg-turquoise/15 border border-turquoise/35 p-4 rounded-2xl flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <Filter className="w-5 h-5 text-turquoise" />
                          <span className="text-sm font-semibold text-turquoise">
                            {language === "RU" ? "Показаны экспедиции для:" : "Showing expeditions for:"} <strong>{searchFilter.destination || (language === "RU" ? "Все направления" : "Global")}</strong> 
                            {searchFilter.budget < 8000 && ` • ${language === "RU" ? "Бюджет до" : "Budget under"} $${searchFilter.budget.toLocaleString()}`}
                          </span>
                        </div>
                        <button
                          onClick={() => setSearchFilter(null)}
                          className="p-1.5 rounded-lg hover:bg-turquoise/20 text-turquoise transition-colors cursor-pointer"
                          title={language === "RU" ? "Очистить фильтр" : "Clear Filter"}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <ToursCarousel
                    onSelectTour={setSelectedTour}
                    currency={currency}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                    tours={tours}
                    language={language}
                    searchFilter={searchFilter}
                  />
                </div>
              )}

              {activePage === "events" && (
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="px-3 py-1 bg-turquoise/15 text-turquoise text-[11px] font-extrabold rounded-full uppercase tracking-widest block w-fit mx-auto mb-4">
                      {language === "RU" ? "НАСЛЕДИЕ И КУЛЬТУРА" : "NOMADIC CUSTOMS & SPIRIT"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                      {language === "RU" ? "События и Фестивали" : "Traditional Festivals"}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                      {language === "RU" 
                        ? "Станьте свидетелем древних конных игр, охоты с беркутами, возведения юрт и гастрономических фестивалей в самом сердце гор."
                        : "Experience live custom festivals, horseback games, eagle hunting showcases, and yurt-building masterclasses directly with our shepherd hosts."}
                    </p>
                  </div>
                  <EventsSection language={language} />
                </div>
              )}

              {activePage === "about" && (
                <div className="space-y-16">
                  <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                      <span className="px-3 py-1 bg-turquoise/15 text-turquoise text-[11px] font-extrabold rounded-full uppercase tracking-widest block w-fit mx-auto mb-4">
                        {language === "RU" ? "О НАШЕМ СЕМЕЙСТВЕ" : "THE NATURO MANIFESTO"}
                      </span>
                      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                        {language === "RU" ? "Стандарты Качества" : "Why Choose NaturO"}
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400">
                        {language === "RU" 
                          ? "Забота об экологии, поддержка местных пастухов и идеальная безопасность на суровых высокогорных перевалах."
                          : "Preserving historical legacies, guaranteeing ethical community wages, and maintaining flawless logistics across high-altitude passes."}
                      </p>
                    </div>
                  </div>
                  <WhyChooseUs language={language} />
                  <FAQSection language={language} />
                </div>
              )}
            </motion.main>
          </AnimatePresence>
        </div>

        {/* Footer info list newsletter */}
        <Footer language={language} openAdmin={openAdmin} />

        {/* Floating AI chat assistant concierge */}
        <AIAssistantChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} language={language} />

        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-100 p-3 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-950 border border-slate-800 dark:border-slate-200 rounded-full shadow-2xl hover:scale-108 transition-all cursor-pointer"
            title={language === "RU" ? "Наверх" : "Scroll to Top"}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Drawer: Saved Wishlist */}
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishOpen(false)}
          wishlistIds={wishlist}
          onRemove={toggleWishlist}
          onSelect={setSelectedTour}
          currency={currency}
          tours={tours}
          language={language}
        />

        {/* Drawer: Compare expeditions */}
        <CompareDrawer
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          compareIds={compareList}
          onRemove={toggleCompare}
          onSelect={setSelectedTour}
          currency={currency}
          tours={tours}
          language={language}
        />

        {/* Modal Dialog: Selected Tour detail reviews payment booking */}
        <TourDetailsModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
          currency={currency}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          onBookingSuccess={handleBookingSuccess}
          language={language}
        />

        {/* Content Administration Panel Overlay */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={closeAdmin}
          language={language}
          onRefreshAll={fetchContent}
          tours={tours}
          destinations={destinations}
          testimonials={testimonials}
          blogPosts={blogPosts}
        />

      </div>
    </div>
  );
}
