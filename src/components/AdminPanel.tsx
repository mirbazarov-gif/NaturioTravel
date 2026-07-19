import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Plus, Trash2, Edit2, Save, FileText, Compass, MessageSquare, BookOpen, 
  Settings, Check, AlertCircle, RefreshCw, Upload, Image as ImageIcon 
} from "lucide-react";
import { Tour, Destination, Testimonial, BlogPost, Language } from "../types";
import { UI_TRANSLATIONS, getTranslation } from "../translations";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onRefreshAll: () => Promise<void>;
  tours: Tour[];
  destinations: Destination[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}

type TabType = "tours" | "destinations" | "testimonials" | "blogs" | "bookings";

export default function AdminPanel({
  isOpen,
  onClose,
  language,
  onRefreshAll,
  tours,
  destinations,
  testimonials,
  blogPosts
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("tours");
  const [bookings, setBookings] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Admin authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("naturo_admin_authenticated") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (username === "admin" && password === "naturoadmin@#") {
      setIsAuthenticated(true);
      sessionStorage.setItem("naturo_admin_authenticated", "true");
    } else {
      setLoginError(
        language === "RU" 
          ? "Неверный логин или пароль." 
          : "Invalid username or password."
      );
    }
  };

  const t = UI_TRANSLATIONS[language];

  // Forms states
  const [tourForm, setTourForm] = useState({
    titleEN: "",
    titleRU: "",
    category: "Luxury" as any,
    destinationEN: "",
    destinationRU: "",
    countryEN: "",
    countryRU: "",
    image: "",
    price: 1000,
    originalPrice: 1200,
    durationEN: "7 Days",
    durationRU: "7 Дней",
    rating: 5.0,
    reviews: 1,
    descriptionEN: "",
    descriptionRU: "",
    dates: ["Aug 12 - Aug 19"],
    maxGroupSize: 10,
    highlightsEN: "",
    highlightsRU: "",
    weatherLocation: "",
    liveAvailability: 5
  });

  const [destForm, setDestForm] = useState({
    nameEN: "",
    nameRU: "",
    countryEN: "",
    countryRU: "",
    image: "",
    descriptionEN: "",
    descriptionRU: "",
    rating: 5.0,
    priceFrom: 1000,
    coordinatesX: 50,
    coordinatesY: 50
  });

  const [testiForm, setTestiForm] = useState({
    name: "",
    roleEN: "",
    roleRU: "",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    rating: 5,
    textEN: "",
    textRU: "",
    locationEN: "",
    locationRU: ""
  });

  const [blogForm, setBlogForm] = useState({
    titleEN: "",
    titleRU: "",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200",
    dateEN: "July 20, 2026",
    dateRU: "20 июля 2026 г.",
    readTimeEN: "5 min read",
    readTimeRU: "5 мин чтения",
    categoryEN: "Eco-Luxe",
    categoryRU: "Эко-Люкс",
    author: "NaturO Specialist",
    excerptEN: "",
    excerptRU: ""
  });

  const resetForms = () => {
    setTourForm({
      titleEN: "",
      titleRU: "",
      category: "Luxury",
      destinationEN: "",
      destinationRU: "",
      countryEN: "",
      countryRU: "",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
      price: 3000,
      originalPrice: 3500,
      durationEN: "7 Days",
      durationRU: "7 Дней",
      rating: 4.9,
      reviews: 10,
      descriptionEN: "",
      descriptionRU: "",
      dates: ["Aug 12 - Aug 19"],
      maxGroupSize: 8,
      highlightsEN: "Private transport\nLuxury Lodge\nExpert guidance",
      highlightsRU: "Частный транспорт\nЛюкс лодж\nПрофессиональный гид",
      weatherLocation: "Swiss Alps",
      liveAvailability: 4
    });

    setDestForm({
      nameEN: "",
      nameRU: "",
      countryEN: "",
      countryRU: "",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
      descriptionEN: "",
      descriptionRU: "",
      rating: 4.9,
      priceFrom: 2500,
      coordinatesX: 50,
      coordinatesY: 50
    });

    setTestiForm({
      name: "",
      roleEN: "",
      roleRU: "",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
      rating: 5,
      textEN: "",
      textRU: "",
      locationEN: "",
      locationRU: ""
    });

    setBlogForm({
      titleEN: "",
      titleRU: "",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200",
      dateEN: "July 20, 2026",
      dateRU: "20 июля 2026 г.",
      readTimeEN: "5 min read",
      readTimeRU: "5 мин чтения",
      categoryEN: "Eco-Luxe",
      categoryRU: "Эко-Люкс",
      author: "Elena Rostov",
      excerptEN: "",
      excerptRU: ""
    });

    setEditingId(null);
    setIsCreating(false);
    setErrorMsg("");
  };

  useEffect(() => {
    resetForms();
  }, [activeTab]);

  const showFeedback = (type: "success" | "error", msg: string) => {
    if (type === "success") {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error("Error loading bookings:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen, activeTab]);

  const handleToggleBookingStatus = async (booking: any) => {
    const newStatus = booking.status === "Confirmed" ? "Pending" : "Confirmed";
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showFeedback("success", language === "RU" ? "Статус бронирования обновлен!" : "Booking status updated!");
        fetchBookings();
      } else {
        throw new Error("Failed to update booking status");
      }
    } catch (err: any) {
      showFeedback("error", err.message);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm(language === "RU" ? "Вы уверены, что хотите удалить это бронирование?" : "Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        showFeedback("success", language === "RU" ? "Бронирование удалено!" : "Booking deleted!");
        fetchBookings();
      } else {
        throw new Error("Failed to delete booking");
      }
    } catch (err: any) {
      showFeedback("error", err.message);
    }
  };

  // LOAD FOR EDITING
  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setIsCreating(true);

    if (activeTab === "tours") {
      const tItem = item as Tour;
      setTourForm({
        titleEN: typeof tItem.title === "string" ? tItem.title : tItem.title?.EN || "",
        titleRU: typeof tItem.title === "string" ? tItem.title : tItem.title?.RU || "",
        category: tItem.category,
        destinationEN: typeof tItem.destination === "string" ? tItem.destination : tItem.destination?.EN || "",
        destinationRU: typeof tItem.destination === "string" ? tItem.destination : tItem.destination?.RU || "",
        countryEN: typeof tItem.country === "string" ? tItem.country : tItem.country?.EN || "",
        countryRU: typeof tItem.country === "string" ? tItem.country : tItem.country?.RU || "",
        image: tItem.image,
        price: tItem.price,
        originalPrice: tItem.originalPrice,
        durationEN: typeof tItem.duration === "string" ? tItem.duration : tItem.duration?.EN || "",
        durationRU: typeof tItem.duration === "string" ? tItem.duration : tItem.duration?.RU || "",
        rating: tItem.rating,
        reviews: tItem.reviews,
        descriptionEN: typeof tItem.description === "string" ? tItem.description : tItem.description?.EN || "",
        descriptionRU: typeof tItem.description === "string" ? tItem.description : tItem.description?.RU || "",
        dates: tItem.dates || ["Aug 12 - Aug 19"],
        maxGroupSize: tItem.maxGroupSize || 8,
        highlightsEN: Array.isArray(tItem.highlights) ? tItem.highlights.join("\n") : tItem.highlights?.EN.join("\n") || "",
        highlightsRU: Array.isArray(tItem.highlights) ? tItem.highlights.join("\n") : tItem.highlights?.RU.join("\n") || "",
        weatherLocation: tItem.weatherLocation,
        liveAvailability: tItem.liveAvailability
      });
    } else if (activeTab === "destinations") {
      const dItem = item as Destination;
      setDestForm({
        nameEN: typeof dItem.name === "string" ? dItem.name : dItem.name?.EN || "",
        nameRU: typeof dItem.name === "string" ? dItem.name : dItem.name?.RU || "",
        countryEN: typeof dItem.country === "string" ? dItem.country : dItem.country?.EN || "",
        countryRU: typeof dItem.country === "string" ? dItem.country : dItem.country?.RU || "",
        image: dItem.image,
        descriptionEN: typeof dItem.description === "string" ? dItem.description : dItem.description?.EN || "",
        descriptionRU: typeof dItem.description === "string" ? dItem.description : dItem.description?.RU || "",
        rating: dItem.rating,
        priceFrom: dItem.priceFrom,
        coordinatesX: dItem.coordinates?.x || 50,
        coordinatesY: dItem.coordinates?.y || 50
      });
    } else if (activeTab === "testimonials") {
      const testiItem = item as Testimonial;
      setTestiForm({
        name: testiItem.name,
        roleEN: typeof testiItem.role === "string" ? testiItem.role : testiItem.role?.EN || "",
        roleRU: typeof testiItem.role === "string" ? testiItem.role : testiItem.role?.RU || "",
        avatar: testiItem.avatar,
        rating: testiItem.rating,
        textEN: typeof testiItem.text === "string" ? testiItem.text : testiItem.text?.EN || "",
        textRU: typeof testiItem.text === "string" ? testiItem.text : testiItem.text?.RU || "",
        locationEN: typeof testiItem.location === "string" ? testiItem.location : testiItem.location?.EN || "",
        locationRU: typeof testiItem.location === "string" ? testiItem.location : testiItem.location?.RU || ""
      });
    } else if (activeTab === "blogs") {
      const bItem = item as BlogPost;
      setBlogForm({
        titleEN: typeof bItem.title === "string" ? bItem.title : bItem.title?.EN || "",
        titleRU: typeof bItem.title === "string" ? bItem.title : bItem.title?.RU || "",
        image: bItem.image,
        dateEN: typeof bItem.date === "string" ? bItem.date : bItem.date?.EN || "",
        dateRU: typeof bItem.date === "string" ? bItem.date : bItem.date?.RU || "",
        readTimeEN: typeof bItem.readTime === "string" ? bItem.readTime : bItem.readTime?.EN || "",
        readTimeRU: typeof bItem.readTime === "string" ? bItem.readTime : bItem.readTime?.RU || "",
        categoryEN: typeof bItem.category === "string" ? bItem.category : bItem.category?.EN || "",
        categoryRU: typeof bItem.category === "string" ? bItem.category : bItem.category?.RU || "",
        author: bItem.author,
        excerptEN: typeof bItem.excerpt === "string" ? bItem.excerpt : bItem.excerpt?.EN || "",
        excerptRU: typeof bItem.excerpt === "string" ? bItem.excerpt : bItem.excerpt?.RU || ""
      });
    }
  };

  // SUBMIT SAVE (ADD OR UPDATE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    let url = "";
    let method = editingId ? "PUT" : "POST";
    let bodyData: any = {};

    const apiType = activeTab === "blogs" ? "blogPosts" : activeTab;

    if (editingId) {
      url = `/api/${apiType}/${editingId}`;
    } else {
      url = `/api/${apiType}`;
    }

    try {
      if (activeTab === "tours") {
        if (!tourForm.titleEN || !tourForm.titleRU) throw new Error("Title (both EN and RU) is required.");
        bodyData = {
          title: { EN: tourForm.titleEN, RU: tourForm.titleRU },
          category: tourForm.category,
          destination: { EN: tourForm.destinationEN || tourForm.titleEN, RU: tourForm.destinationRU || tourForm.titleRU },
          country: { EN: tourForm.countryEN, RU: tourForm.countryRU },
          image: tourForm.image,
          price: Number(tourForm.price),
          originalPrice: Number(tourForm.originalPrice),
          duration: { EN: tourForm.durationEN, RU: tourForm.durationRU },
          rating: Number(tourForm.rating),
          reviews: Number(tourForm.reviews),
          description: { EN: tourForm.descriptionEN, RU: tourForm.descriptionRU },
          dates: tourForm.dates,
          maxGroupSize: Number(tourForm.maxGroupSize),
          highlights: {
            EN: tourForm.highlightsEN.split("\n").filter(Boolean),
            RU: tourForm.highlightsRU.split("\n").filter(Boolean)
          },
          weatherLocation: tourForm.weatherLocation || tourForm.destinationEN,
          liveAvailability: Number(tourForm.liveAvailability)
        };
      } else if (activeTab === "destinations") {
        if (!destForm.nameEN || !destForm.nameRU) throw new Error("Name (both EN and RU) is required.");
        bodyData = {
          name: { EN: destForm.nameEN, RU: destForm.nameRU },
          country: { EN: destForm.countryEN, RU: destForm.countryRU },
          image: destForm.image,
          description: { EN: destForm.descriptionEN, RU: destForm.descriptionRU },
          rating: Number(destForm.rating),
          priceFrom: Number(destForm.priceFrom),
          coordinates: { x: Number(destForm.coordinatesX), y: Number(destForm.coordinatesY) }
        };
      } else if (activeTab === "testimonials") {
        if (!testiForm.name || !testiForm.textEN) throw new Error("Name and testimonial content are required.");
        bodyData = {
          name: testiForm.name,
          role: { EN: testiForm.roleEN, RU: testiForm.roleRU },
          avatar: testiForm.avatar,
          rating: Number(testiForm.rating),
          text: { EN: testiForm.textEN, RU: testiForm.textRU },
          location: { EN: testiForm.locationEN, RU: testiForm.locationRU }
        };
      } else if (activeTab === "blogs") {
        if (!blogForm.titleEN || !blogForm.titleRU) throw new Error("Title (both EN and RU) is required.");
        bodyData = {
          title: { EN: blogForm.titleEN, RU: blogForm.titleRU },
          image: blogForm.image,
          date: { EN: blogForm.dateEN, RU: blogForm.dateRU },
          readTime: { EN: blogForm.readTimeEN, RU: blogForm.readTimeRU },
          category: { EN: blogForm.categoryEN, RU: blogForm.categoryRU },
          author: blogForm.author,
          excerpt: { EN: blogForm.excerptEN, RU: blogForm.excerptRU }
        };
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });

      if (!res.ok) {
        throw new Error("HTTP request failed with status: " + res.status);
      }

      await onRefreshAll();
      showFeedback("success", editingId ? "Content Updated Successfully!" : "New Content Created Successfully!");
      resetForms();
    } catch (err: any) {
      console.error(err);
      showFeedback("error", err.message || "Failed to save item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE TRIGGER
  const handleDelete = async (id: string) => {
    if (!window.confirm(t.confirmDelete)) return;
    try {
      const apiType = activeTab === "blogs" ? "blogPosts" : activeTab;
      const res = await fetch(`/api/${apiType}/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Delete request failed.");
      await onRefreshAll();
      showFeedback("success", "Item deleted successfully!");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to delete item.");
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative bg-slate-900/95 dark:bg-slate-950/95 border border-slate-800 w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Background design accents */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-turquoise/10 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full filter blur-2xl pointer-events-none" />

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-turquoise/15 rounded-2xl border border-turquoise/25">
                  <Settings className="w-6 h-6 text-turquoise animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight bg-gradient-to-r from-turquoise to-teal-300 bg-clip-text text-transparent uppercase">
                    {language === "RU" ? "Панель управления" : "Admin Portal"}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">NaturO Elite Ecosystem</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-850 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {language === "RU" ? "Логин" : "Username"}
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={language === "RU" ? "Введите логин" : "Enter username"}
                  className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-turquoise transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {language === "RU" ? "Пароль" : "Password"}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === "RU" ? "Введите пароль" : "Enter password"}
                  className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-turquoise transition-all"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/15 border border-red-500/20 rounded-xl text-xs text-red-400 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-turquoise hover:from-turquoise hover:to-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>{language === "RU" ? "Войти" : "Access Console"}</span>
              </button>
            </form>

            <div className="mt-6 text-center relative z-10">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                🔒 NaturO SECURITY PANEL
              </span>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="relative bg-slate-900/90 dark:bg-slate-950/90 border border-slate-800/80 w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/40">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-turquoise animate-spin-slow" />
              <div>
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-turquoise to-teal-300 bg-clip-text text-transparent">
                  {t.adminTitle}
                </h2>
                <p className="text-xs text-slate-400 font-medium">{t.adminSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  sessionStorage.removeItem("naturo_admin_authenticated");
                }}
                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {language === "RU" ? "Выйти" : "Log Out"}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-850 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Feedback banners */}
          {successMsg && (
            <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2.5 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-500/15 border-b border-red-500/30 px-6 py-2.5 flex items-center gap-2 text-xs text-red-400 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Body structure with sidebar tabs and main listing/forms */}
          <div className="flex-1 flex overflow-hidden">
            {/* Tabs sidebar */}
            <div className="w-60 border-r border-slate-800/80 bg-slate-900/20 p-4 flex flex-col gap-2 shrink-0">
              <button
                onClick={() => { setActiveTab("tours"); }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "tours" ? "bg-turquoise text-slate-950 font-extrabold shadow-md" : "text-slate-400 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <Compass className="w-4.5 h-4.5" />
                <span>{t.featuredTours}</span>
              </button>
              <button
                onClick={() => { setActiveTab("destinations"); }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "destinations" ? "bg-turquoise text-slate-950 font-extrabold shadow-md" : "text-slate-400 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <Compass className="w-4.5 h-4.5" />
                <span>{t.destinations}</span>
              </button>
              <button
                onClick={() => { setActiveTab("testimonials"); }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "testimonials" ? "bg-turquoise text-slate-950 font-extrabold shadow-md" : "text-slate-400 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span>{t.testimonials}</span>
              </button>
              <button
                onClick={() => { setActiveTab("blogs"); }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "blogs" ? "bg-turquoise text-slate-950 font-extrabold shadow-md" : "text-slate-400 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>{t.travelBlog}</span>
              </button>
              <button
                onClick={() => { setActiveTab("bookings"); }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "bookings" ? "bg-turquoise text-slate-950 font-extrabold shadow-md" : "text-slate-400 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <FileText className="w-4.5 h-4.5" />
                <span>{language === "RU" ? "Бронирования" : "Bookings"}</span>
              </button>
            </div>

            {/* Work space content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-900/10">
              {isCreating ? (
                /* FORM VIEW */
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-bold uppercase tracking-wider text-turquoise flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{editingId ? "Modify" : "Create"} {activeTab}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={resetForms}
                      className="px-4 py-1.5 border border-slate-700 hover:bg-slate-850 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {t.cancel}
                    </button>
                  </div>

                  {/* TOURS FORM */}
                  {activeTab === "tours" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-800/60 p-4 rounded-2xl bg-slate-950/25">
                        <div className="col-span-2 text-xs font-bold text-turquoise tracking-wider uppercase">Bilingual Titles & Countries</div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Title (EN)</label>
                          <input type="text" required value={tourForm.titleEN} onChange={e => setTourForm({ ...tourForm, titleEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Title (RU)</label>
                          <input type="text" required value={tourForm.titleRU} onChange={e => setTourForm({ ...tourForm, titleRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Country (EN)</label>
                          <input type="text" required value={tourForm.countryEN} onChange={e => setTourForm({ ...tourForm, countryEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Country (RU)</label>
                          <input type="text" required value={tourForm.countryRU} onChange={e => setTourForm({ ...tourForm, countryRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.categoryField}</label>
                        <select value={tourForm.category} onChange={e => setTourForm({ ...tourForm, category: e.target.value as any })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise [color-scheme:dark]">
                          <option value="Luxury">Luxury</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Eco-Travel">Eco-Travel</option>
                          <option value="Cultural">Cultural</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.imageField}</label>
                        <input type="text" required value={tourForm.image} onChange={e => setTourForm({ ...tourForm, image: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.priceField} ($ USD)</label>
                        <input type="number" required value={tourForm.price} onChange={e => setTourForm({ ...tourForm, price: Number(e.target.value) })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Original Price ($ USD)</label>
                        <input type="number" required value={tourForm.originalPrice} onChange={e => setTourForm({ ...tourForm, originalPrice: Number(e.target.value) })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Duration (EN)</label>
                        <input type="text" required value={tourForm.durationEN} onChange={e => setTourForm({ ...tourForm, durationEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Duration (RU)</label>
                        <input type="text" required value={tourForm.durationRU} onChange={e => setTourForm({ ...tourForm, durationRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Live Slots left</label>
                        <input type="number" required value={tourForm.liveAvailability} onChange={e => setTourForm({ ...tourForm, liveAvailability: Number(e.target.value) })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Weather Location Key</label>
                        <input type="text" required value={tourForm.weatherLocation} onChange={e => setTourForm({ ...tourForm, weatherLocation: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Description (EN)</label>
                        <textarea required value={tourForm.descriptionEN} onChange={e => setTourForm({ ...tourForm, descriptionEN: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Description (RU)</label>
                        <textarea required value={tourForm.descriptionRU} onChange={e => setTourForm({ ...tourForm, descriptionRU: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.highlightsField} (EN) (One per line)</label>
                        <textarea required value={tourForm.highlightsEN} onChange={e => setTourForm({ ...tourForm, highlightsEN: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.highlightsField} (RU) (One per line)</label>
                        <textarea required value={tourForm.highlightsRU} onChange={e => setTourForm({ ...tourForm, highlightsRU: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                    </div>
                  )}

                  {/* DESTINATIONS FORM */}
                  {activeTab === "destinations" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Name (EN)</label>
                        <input type="text" required value={destForm.nameEN} onChange={e => setDestForm({ ...destForm, nameEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Name (RU)</label>
                        <input type="text" required value={destForm.nameRU} onChange={e => setDestForm({ ...destForm, nameRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Country (EN)</label>
                        <input type="text" required value={destForm.countryEN} onChange={e => setDestForm({ ...destForm, countryEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Country (RU)</label>
                        <input type="text" required value={destForm.countryRU} onChange={e => setDestForm({ ...destForm, countryRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.imageField}</label>
                        <input type="text" required value={destForm.image} onChange={e => setDestForm({ ...destForm, image: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.priceField} From ($ USD)</label>
                        <input type="number" required value={destForm.priceFrom} onChange={e => setDestForm({ ...destForm, priceFrom: Number(e.target.value) })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Map Coordinate X (%)</label>
                        <input type="number" required min="5" max="95" value={destForm.coordinatesX} onChange={e => setDestForm({ ...destForm, coordinatesX: Number(e.target.value) })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Map Coordinate Y (%)</label>
                        <input type="number" required min="5" max="95" value={destForm.coordinatesY} onChange={e => setDestForm({ ...destForm, coordinatesY: Number(e.target.value) })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Description (EN)</label>
                        <textarea required value={destForm.descriptionEN} onChange={e => setDestForm({ ...destForm, descriptionEN: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Description (RU)</label>
                        <textarea required value={destForm.descriptionRU} onChange={e => setDestForm({ ...destForm, descriptionRU: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>
                    </div>
                  )}

                  {/* TESTIMONIALS FORM */}
                  {activeTab === "testimonials" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Guest Name</label>
                        <input type="text" required value={testiForm.name} onChange={e => setTestiForm({ ...testiForm, name: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Avatar Image URL</label>
                        <input type="text" required value={testiForm.avatar} onChange={e => setTestiForm({ ...testiForm, avatar: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Guest Role (EN)</label>
                        <input type="text" required value={testiForm.roleEN} onChange={e => setTestiForm({ ...testiForm, roleEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Guest Role (RU)</label>
                        <input type="text" required value={testiForm.roleRU} onChange={e => setTestiForm({ ...testiForm, roleRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Guest Location (EN)</label>
                        <input type="text" required value={testiForm.locationEN} onChange={e => setTestiForm({ ...testiForm, locationEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Guest Location (RU)</label>
                        <input type="text" required value={testiForm.locationRU} onChange={e => setTestiForm({ ...testiForm, locationRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Testimonial Text (EN)</label>
                        <textarea required value={testiForm.textEN} onChange={e => setTestiForm({ ...testiForm, textEN: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Testimonial Text (RU)</label>
                        <textarea required value={testiForm.textRU} onChange={e => setTestiForm({ ...testiForm, textRU: e.target.value })} className="w-full h-24 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>
                    </div>
                  )}

                  {/* BLOG POSTS FORM */}
                  {activeTab === "blogs" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Title (EN)</label>
                        <input type="text" required value={blogForm.titleEN} onChange={e => setBlogForm({ ...blogForm, titleEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Title (RU)</label>
                        <input type="text" required value={blogForm.titleRU} onChange={e => setBlogForm({ ...blogForm, titleRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Publish Date (EN)</label>
                        <input type="text" required value={blogForm.dateEN} onChange={e => setBlogForm({ ...blogForm, dateEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Publish Date (RU)</label>
                        <input type="text" required value={blogForm.dateRU} onChange={e => setBlogForm({ ...blogForm, dateRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Read Time (EN)</label>
                        <input type="text" required value={blogForm.readTimeEN} onChange={e => setBlogForm({ ...blogForm, readTimeEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Read Time (RU)</label>
                        <input type="text" required value={blogForm.readTimeRU} onChange={e => setBlogForm({ ...blogForm, readTimeRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Blog Category (EN)</label>
                        <input type="text" required value={blogForm.categoryEN} onChange={e => setBlogForm({ ...blogForm, categoryEN: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Blog Category (RU)</label>
                        <input type="text" required value={blogForm.categoryRU} onChange={e => setBlogForm({ ...blogForm, categoryRU: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{t.imageField}</label>
                        <input type="text" required value={blogForm.image} onChange={e => setBlogForm({ ...blogForm, image: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Author Name</label>
                        <input type="text" required value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} className="w-full bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Excerpt (EN)</label>
                        <textarea required value={blogForm.excerptEN} onChange={e => setBlogForm({ ...blogForm, excerptEN: e.target.value })} className="w-full h-20 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Excerpt (RU)</label>
                        <textarea required value={blogForm.excerptRU} onChange={e => setBlogForm({ ...blogForm, excerptRU: e.target.value })} className="w-full h-20 bg-slate-850 border border-slate-750 p-2.5 rounded-xl text-sm focus:outline-none focus:border-turquoise resize-none" />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-turquoise to-deep-ocean hover:from-deep-ocean hover:to-turquoise text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSubmitting ? "Saving..." : t.save}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForms}
                      className="px-6 py-3 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      {t.cancel}
                    </button>
                  </div>
                </form>
              ) : (
                /* LISTINGS VIEW */
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-turquoise">
                      {activeTab === "tours" && t.featuredTours}
                      {activeTab === "destinations" && t.destinations}
                      {activeTab === "testimonials" && t.testimonials}
                      {activeTab === "blogs" && t.travelBlog}
                      {activeTab === "bookings" && (language === "RU" ? "Управление Бронированиями" : "Manage Bookings")}
                    </h3>
                    {activeTab !== "bookings" && (
                      <button
                        onClick={() => setIsCreating(true)}
                        className="px-4 py-2 bg-turquoise text-slate-950 text-xs font-extrabold uppercase tracking-widest rounded-xl flex items-center gap-1.5 hover:bg-white hover:scale-103 transition-all cursor-pointer shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        <span>
                          {activeTab === "tours" && t.addTour}
                          {activeTab === "destinations" && t.addDest}
                          {activeTab === "testimonials" && t.addTestimonial}
                          {activeTab === "blogs" && t.addBlog}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Tours list */}
                  {activeTab === "tours" && (
                    <div className="border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl bg-slate-950/25">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900/60 border-b border-slate-800/80 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="p-4">{t.titleField}</th>
                            <th className="p-4">{t.categoryField}</th>
                            <th className="p-4">{t.countryField}</th>
                            <th className="p-4">{t.priceField}</th>
                            <th className="p-4 text-right">{t.actions}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {tours.map(tour => (
                            <tr key={tour.id} className="hover:bg-slate-900/40 transition-colors">
                              <td className="p-4 font-bold flex items-center gap-3">
                                <img src={tour.image} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                                <span className="line-clamp-1 max-w-[200px]">{getTranslation(tour.title, language)}</span>
                              </td>
                              <td className="p-4 font-medium text-slate-300">{tour.category}</td>
                              <td className="p-4 font-medium text-slate-400">{getTranslation(tour.country, language)}</td>
                              <td className="p-4 font-bold text-turquoise">${tour.price}</td>
                              <td className="p-4 text-right space-x-1.5">
                                <button onClick={() => handleStartEdit(tour)} className="p-2 hover:bg-slate-800 text-yellow-400 hover:text-yellow-300 rounded-lg transition-colors cursor-pointer" title={t.edit}>
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(tour.id)} className="p-2 hover:bg-slate-800 text-red-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer" title={t.delete}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Destinations list */}
                  {activeTab === "destinations" && (
                    <div className="border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl bg-slate-950/25">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900/60 border-b border-slate-800/80 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="p-4">Name</th>
                            <th className="p-4">Country</th>
                            <th className="p-4">Price From</th>
                            <th className="p-4 text-right">{t.actions}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {destinations.map(dest => (
                            <tr key={dest.id} className="hover:bg-slate-900/40 transition-colors">
                              <td className="p-4 font-bold flex items-center gap-3">
                                <img src={dest.image} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                                <span className="line-clamp-1 max-w-[200px]">{getTranslation(dest.name, language)}</span>
                              </td>
                              <td className="p-4 font-medium text-slate-300">{getTranslation(dest.country, language)}</td>
                              <td className="p-4 font-bold text-turquoise">${dest.priceFrom}</td>
                              <td className="p-4 text-right space-x-1.5">
                                <button onClick={() => handleStartEdit(dest)} className="p-2 hover:bg-slate-800 text-yellow-400 hover:text-yellow-300 rounded-lg transition-colors cursor-pointer" title={t.edit}>
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(dest.id)} className="p-2 hover:bg-slate-800 text-red-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer" title={t.delete}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Testimonials list */}
                  {activeTab === "testimonials" && (
                    <div className="border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl bg-slate-950/25">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900/60 border-b border-slate-800/80 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="p-4">Guest</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Text Snippet</th>
                            <th className="p-4 text-right">{t.actions}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {testimonials.map(testi => (
                            <tr key={testi.id} className="hover:bg-slate-900/40 transition-colors">
                              <td className="p-4 font-bold flex items-center gap-3">
                                <img src={testi.avatar} className="w-10 h-10 object-cover rounded-full border border-turquoise/20" referrerPolicy="no-referrer" />
                                <span className="line-clamp-1 max-w-[150px]">{testi.name}</span>
                              </td>
                              <td className="p-4 font-medium text-slate-300">{getTranslation(testi.role, language)}</td>
                              <td className="p-4 text-slate-400 line-clamp-1 max-w-[280px] pt-7">{getTranslation(testi.text, language)}</td>
                              <td className="p-4 text-right space-x-1.5">
                                <button onClick={() => handleStartEdit(testi)} className="p-2 hover:bg-slate-800 text-yellow-400 hover:text-yellow-300 rounded-lg transition-colors cursor-pointer" title={t.edit}>
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(testi.id)} className="p-2 hover:bg-slate-800 text-red-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer" title={t.delete}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Blogs list */}
                  {activeTab === "blogs" && (
                    <div className="border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl bg-slate-950/25">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900/60 border-b border-slate-800/80 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Author</th>
                            <th className="p-4 text-right">{t.actions}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {blogPosts.map(post => (
                            <tr key={post.id} className="hover:bg-slate-900/40 transition-colors">
                              <td className="p-4 font-bold flex items-center gap-3">
                                <img src={post.image} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                                <span className="line-clamp-1 max-w-[200px]">{getTranslation(post.title, language)}</span>
                              </td>
                              <td className="p-4 font-medium text-slate-300">{getTranslation(post.category, language)}</td>
                              <td className="p-4 font-medium text-slate-400">{post.author}</td>
                              <td className="p-4 text-right space-x-1.5">
                                <button onClick={() => handleStartEdit(post)} className="p-2 hover:bg-slate-800 text-yellow-400 hover:text-yellow-300 rounded-lg transition-colors cursor-pointer" title={t.edit}>
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-slate-800 text-red-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer" title={t.delete}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Bookings list */}
                  {activeTab === "bookings" && (
                    <div className="border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl bg-slate-950/25">
                      {bookings.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 font-semibold text-xs">
                          {language === "RU" ? "Нет активных бронирований." : "No bookings found."}
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-900/60 border-b border-slate-800/80 text-slate-400 font-bold uppercase tracking-wider">
                                <th className="p-4">{language === "RU" ? "Клиент" : "Customer"}</th>
                                <th className="p-4">{language === "RU" ? "Тур / Дата" : "Tour / Date"}</th>
                                <th className="p-4">{language === "RU" ? "Контакты" : "Contact"}</th>
                                <th className="p-4">{language === "RU" ? "Стоимость" : "Price"}</th>
                                <th className="p-4">{language === "RU" ? "Статус" : "Status"}</th>
                                <th className="p-4 text-right">{language === "RU" ? "Действия" : "Actions"}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                              {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-900/40 transition-colors">
                                  {/* Customer Info */}
                                  <td className="p-4 font-bold">
                                    <div className="text-white text-xs">{booking.customerName}</div>
                                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{booking.id}</div>
                                  </td>
                                  {/* Tour and Date */}
                                  <td className="p-4">
                                    <div className="text-white font-semibold line-clamp-1 max-w-[200px]">
                                      {language === "RU" ? booking.tourTitle?.RU || booking.tourTitle : booking.tourTitle?.EN || booking.tourTitle}
                                    </div>
                                    <div className="text-[10px] text-turquoise font-medium mt-0.5">{booking.date}</div>
                                    {booking.specialRequests && (
                                      <div className="text-[9px] text-amber-500 font-bold line-clamp-1 max-w-[200px] mt-1" title={booking.specialRequests}>
                                        ⚠️ {booking.specialRequests}
                                      </div>
                                    )}
                                  </td>
                                  {/* Contact details */}
                                  <td className="p-4 font-medium text-slate-300">
                                    <div>{booking.customerPhone}</div>
                                    <div className="text-slate-500 font-semibold">{booking.customerEmail}</div>
                                  </td>
                                  {/* Price */}
                                  <td className="p-4 font-bold text-emerald-400">
                                    ${booking.totalPrice}
                                    <div className="text-[9px] text-slate-500 font-normal">{booking.travelers} {booking.travelers === 1 ? (language === "RU" ? "гость" : "guest") : (language === "RU" ? "гостей" : "guests")}</div>
                                  </td>
                                  {/* Status */}
                                  <td className="p-4 font-bold">
                                    <button
                                      onClick={() => handleToggleBookingStatus(booking)}
                                      className={`px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                                        booking.status === "Confirmed"
                                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
                                          : "bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25"
                                      }`}
                                      title={language === "RU" ? "Нажмите для изменения статуса" : "Click to toggle status"}
                                    >
                                      {booking.status === "Confirmed" 
                                        ? (language === "RU" ? "Подтверждена" : "Confirmed") 
                                        : (language === "RU" ? "В ожидании" : "Pending")}
                                    </button>
                                  </td>
                                  {/* Actions */}
                                  <td className="p-4 text-right">
                                    <button
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="p-2 hover:bg-slate-800 text-red-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                                      title={language === "RU" ? "Удалить" : "Delete"}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
