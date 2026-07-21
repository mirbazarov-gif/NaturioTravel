import { LocalizedText, LocalizedArray } from "./types";

export const getTranslation = (
  field: string | LocalizedText | undefined,
  lang: "EN" | "RU"
): string => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field["EN"] || "";
};

export const getTranslationArray = (
  field: string[] | LocalizedArray | undefined,
  lang: "EN" | "RU"
): string[] => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  return field[lang] || field["EN"] || [];
};

export const UI_TRANSLATIONS = {
  EN: {
    // Navbar & Common
    destinations: "Destinations",
    featuredTours: "Featured Tours",
    interactiveMap: "Interactive Map",
    whyNomadTravel: "Why Nomad Travel",
    testimonials: "Testimonials",
    travelBlog: "Travel Blog",
    aiPlanner: "AI Assistant",
    adminDashboard: "Admin Dashboard",
    bookNow: "Book Expedition",
    slotsLeft: "slots left",
    reviews: "reviews",
    days: "Days",
    priceFrom: "From",
    originalPrice: "Original",
    exploreNow: "Explore Now",
    scrollExplore: "Scroll to Explore",
    viewDetails: "View Details",
    compare: "Compare",
    wishlist: "Wishlist",
    addedToWishlist: "Added to Wishlist",
    removedFromWishlist: "Removed from Wishlist",

    // Navbar Custom
    navHome: "Home",
    navDestinations: "Destinations",
    navTours: "Tours",
    navEvents: "Events",
    navWhyUs: "Why Nomad Travel",
    navAbout: "About & FAQ",
    navAiAssistant: "AI Assistant",

    // Hero Section
    awardWinning: "Nomad Travel ECO-TOURISM OF KYRGYZSTAN",
    heroTitlePart1: "Explore Kyrgyzstan in its",
    heroTitlePart2: "Nomadic Spirit",
    heroSubtitle: "Indulge in authentic community-based expeditions, horseback mountain treks, and traditional yurt stays designed around pristine landscapes of Kochkor & Song-Kul.",
    whereTo: "Where to?",
    dates: "Dates",
    maxBudget: "Max Budget",
    travelers: "Travelers",
    findTours: "Find Tours",
    quickSearch: "Quick Search:",
    scrollToDiscover: "Scroll To Discover",
    guest: "Guest",
    guests: "Guests",
    popularChoices: "Popular Choices",

    // Search Section
    searchTitle: "Where shall we guide your curiosity?",
    destinationPlaceholder: "Destination (e.g., Alps, Amalfi...)",
    durationPlaceholder: "Select Duration",
    categoryPlaceholder: "All Categories",
    travelersPlaceholder: "Travelers",
    searchButton: "Initiate Expedition",
    searchReset: "Clear Filters",

    // Destinations Section
    destinationsTitle: "EPICENTERS OF WONDER",
    destinationsSubtitle: "Curated Geographic Masterpieces",
    destinationsDesc: "We do not offer mere vacations; we provide exclusive passage to the most visually stunning, ecologically fragile, and culturally sacred environments on Earth.",

    // Tours Section
    toursTitle: "PRIVATE EXPEDITIONS",
    toursSubtitle: "Elite Curated Journeys",
    toursDesc: "Bespoke itineraries designed for discerning travelers. Every route is staffed with master specialists, fully carbon-offset, and tailored to absolute physical comfort.",

    // Why Us Section
    whyTitle: "WHY NOMAD TRAVEL ELITE",
    whySubtitle: "Standard of Absolute Care",
    whyDesc: "Serving a community of international explorers with high-discretion hospitality, ecological conservation custody, and flawless logistical executions.",
    stat1Title: "Exclusive Routes",
    stat1Desc: "Completely private permits for restricted conservation domains.",
    stat2Title: "Elite Guardians",
    stat2Desc: "Accompanied by veteran biologists, alpine conquerors, and master curators.",
    stat3Title: "Flawless Score",
    stat3Desc: "A peerless reputation verified by independent luxury auditors.",

    // Testimonials
    testimonialsTitle: "EXPLORER CHRONICLES",
    testimonialsSubtitle: "Voices of the Discerning Community",

    // Blog
    blogTitle: "DISPATCHES FROM THE WILD",
    blogSubtitle: "Aesthetic Notes & Observations",
    readTime: "read",

    // FAQ
    faqTitle: "DUE DILIGENCE",
    faqSubtitle: "Frequently Asked Questions",

    // Chat
    chatTitle: "AI Assistant",
    chatSubtitle: "Elite Bespoke Itinerary Architect",
    chatPlaceholder: "Inquire about premium travel, route customizations, or weather conditions...",
    chatIntro: "Greetings! I am Nomad Travel's AI Assistant. I can coordinate custom itineraries, check real-time weather, or adjust package durations according to your timeline.",

    // Modal / Checkout
    bookTour: "Secure Your Passage",
    bookingForm: "Expedition Booking Ledger",
    fullName: "Full Name",
    emailAddress: "Email Address",
    pax: "Number of Guests",
    preferredDate: "Select Launch Date",
    customDuration: "Bespoke Duration (Days)",
    additionalRequests: "Bespoke Specifications",
    guaranteedSecurity: "Guaranteed Security via Encrypted Quantum Ledger",
    submitBooking: "Authorize Reservation",
    bookingSuccess: "Passage Authorized Successfully!",
    bookingSuccessDesc: "Your luxury travel specialist is reviewing your bespoke itinerary. An encrypted confirmation packet has been dispatched to your email address.",
    close: "Close",

    // Admin Panel UI
    adminTitle: "Nomad Travel Content Administration Console",
    adminSubtitle: "Manage Tours, Destinations, Blogs, and Testimonials",
    addTour: "Create New Tour",
    addDest: "Create New Destination",
    addBlog: "Create New Blog",
    addTestimonial: "Create New Testimonial",
    save: "Save Content",
    edit: "Edit",
    delete: "Delete",
    actions: "Actions",
    titleField: "Title",
    descField: "Description",
    categoryField: "Category",
    countryField: "Country",
    priceField: "Price",
    durationField: "Duration",
    imageField: "Image URL",
    highlightsField: "Highlights (one per line)",
    cancel: "Cancel",
    confirmDelete: "Are you sure you want to delete this item?",
  },
  RU: {
    // Navbar & Common
    destinations: "Направления",
    featuredTours: "Лучшие Туры",
    interactiveMap: "Интерактивная Карта",
    whyNomadTravel: "Почему Nomad Travel",
    testimonials: "Отзывы",
    travelBlog: "Блог Путешествий",
    aiPlanner: "ИИ помощник",
    adminDashboard: "Панель Управления",
    bookNow: "Заказать Экспедицию",
    slotsLeft: "мест осталось",
    reviews: "отзывов",
    days: "Дней",
    priceFrom: "От",
    originalPrice: "Обычная",
    exploreNow: "Исследовать",
    scrollExplore: "Прокрутите для исследования",
    viewDetails: "Детали Тура",
    compare: "Сравнить",
    wishlist: "Избранное",
    addedToWishlist: "Добавлено в избранное",
    removedFromWishlist: "Удалено из избранного",

    // Navbar Custom
    navHome: "Главная",
    navDestinations: "Направления",
    navTours: "Туры",
    navEvents: "События",
    navWhyUs: "Почему Nomad Travel",
    navAbout: "О нас и FAQ",
    navAiAssistant: "ИИ помощник",

    // Hero Section
    awardWinning: "ОБЩЕСТВЕННЫЙ ЭКО-ТУРИЗМ Nomad Travel В КЫРГЫЗСТАНЕ",
    heroTitlePart1: "Исследуйте Кыргызстан в его",
    heroTitlePart2: "Кочевом Духе",
    heroSubtitle: "Позвольте себе подлинные экспедиции от местных сообществ Nomad Travel, конные прогулки и уютные юрточные лагеря среди нетронутых пейзажей Кочкора и Сон-Куля.",
    whereTo: "Куда едем?",
    dates: "Даты",
    maxBudget: "Макс. Бюджет",
    travelers: "Путешественники",
    findTours: "Найти Туры",
    quickSearch: "Быстрый поиск:",
    scrollToDiscover: "Прокрутите, Чтобы Начать",
    guest: "Гость",
    guests: "Гостей",
    popularChoices: "Популярный Выбор",

    // Search Section
    searchTitle: "Куда влечет вас любопытство?",
    destinationPlaceholder: "Направление (напр. Альпы, Амальфи...)",
    durationPlaceholder: "Длительность",
    categoryPlaceholder: "Все категории",
    travelersPlaceholder: "Путешественники",
    searchButton: "Начать Поиск",
    searchReset: "Сбросить фильтры",

    // Destinations Section
    destinationsTitle: "ЭПИЦЕНТРЫ ЧУДЕС",
    destinationsSubtitle: "Кураторские географические шедевры",
    destinationsDesc: "Мы не предлагаем просто отпуск; мы открываем эксклюзивный доступ в самые визуально ошеломляющие, экологически хрупкие и священные уголки нашей планеты.",

    // Tours Section
    toursTitle: "ЧАСТНЫЕ ЭКСПЕДИЦИИ",
    toursSubtitle: "Элитные Кураторские Маршруты",
    toursDesc: "Индивидуальные программы, разработанные для взыскательных путешественников. Каждый маршрут сопровождается экспертами и полностью компенсирует углеродный след.",

    // Why Us Section
    whyTitle: "ПОЧЕМУ NOMAD TRAVEL ELITE",
    whySubtitle: "Стандарт Абсолютной Заботы",
    whyDesc: "Обслуживание сообщества международных исследователей с высоким уровнем конфиденциальности, экологической ответственностью и безупречной логистикой.",
    stat1Title: "Эксклюзивные Пути",
    stat1Desc: "Абсолютно приватные разрешения для закрытых заповедных зон.",
    stat2Title: "Элитные Проводники",
    stat2Desc: "В сопровождении опытных биологов, покорителей вершин и экспертов.",
    stat3Title: "Безупречный Рейтинг",
    stat3Desc: "Безупречная репутация, подтвержденная независимыми люкс-аудиторами.",

    // Testimonials
    testimonialsTitle: "ХРОНИКИ ПУТЕШЕСТВЕННИКОВ",
    testimonialsSubtitle: "Голоса Взыскательного Сообщества",

    // Blog
    blogTitle: "ДЕПЕШИ ИЗ ДИКОЙ ПРИРОДЫ",
    blogSubtitle: "Эстетические Заметки и Наблюдения",
    readTime: "мин",

    // FAQ
    faqTitle: "ПРАВОВАЯ ПРОВЕРКА",
    faqSubtitle: "Часто Задаваемые Вопросы",

    // Chat
    chatTitle: "ИИ помощник",
    chatSubtitle: "Архитектор Индивидуальных Маршрутов",
    chatPlaceholder: "Спросите о премиум-турах, погоде или изменении маршрута...",
    chatIntro: "Приветствую! Я ИИ помощник Nomad Travel. Я могу составить индивидуальный маршрут, проверить погоду в реальном времени или изменить длительность тура.",

    // Modal / Checkout
    bookTour: "Забронировать Место",
    bookingForm: "Регистрационная Книга Экспедиции",
    fullName: "Полное Имя",
    emailAddress: "Электронная Почта",
    pax: "Количество Гостей",
    preferredDate: "Дата Вылета",
    customDuration: "Желаемая Длительность (Дней)",
    additionalRequests: "Особые Пожелания",
    guaranteedSecurity: "Гарантированная Безопасность через Шифрованный Реестр",
    submitBooking: "Авторизовать Бронирование",
    bookingSuccess: "Экспедиция Успешно Авторизована!",
    bookingSuccessDesc: "Наш специалист по элитному туризму уже изучает ваш индивидуальный маршрут. Шифрованный пакет подтверждения отправлен на вашу почту.",
    close: "Закрыть",

    // Admin Panel UI
    adminTitle: "Консоль Администрирования Контента Nomad Travel",
    adminSubtitle: "Управление турами, направлениями, статьями и отзывами",
    addTour: "Создать Новый Тур",
    addDest: "Создать Новое Направление",
    addBlog: "Создать Статью",
    addTestimonial: "Создать Отзыв",
    save: "Сохранить",
    edit: "Редактировать",
    delete: "Удалить",
    actions: "Действия",
    titleField: "Название",
    descField: "Описание",
    categoryField: "Категория",
    countryField: "Страна",
    priceField: "Цена",
    durationField: "Длительность",
    imageField: "Ссылка на Картинку",
    highlightsField: "Особенности (по одной в строке)",
    cancel: "Отмена",
    confirmDelete: "Вы уверены, что хотите удалить этот элемент?",
  },
};
