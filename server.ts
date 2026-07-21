import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Ensure uploads folder exists
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded files statically before other routes
app.use("/uploads", express.static(UPLOADS_DIR));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// JSON File Database setup
const DB_FILE = path.join(process.cwd(), "data_db.json");

const INITIAL_TOURS = [
  {
    id: "tour-1",
    title: {
      EN: "Kol-Ukok Lake Horseback Expedition",
      RU: "Конная экспедиция на озеро Коль-Укок"
    },
    category: "Adventure",
    destination: {
      EN: "Kol-Ukok Lake",
      RU: "Озеро Коль-Укок"
    },
    country: {
      EN: "Kyrgyzstan",
      RU: "Кыргызстан"
    },
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1200",
    price: 280,
    originalPrice: 350,
    duration: {
      EN: "3 Days",
      RU: "3 Дня"
    },
    rating: 4.9,
    reviews: 124,
    description: {
      EN: "Ride horses through the high wildflower meadows of Kol-Ukok, sleep in authentic yurt camps next to rushing streams, and dine with local shepherd families.",
      RU: "Конное путешествие по высокогорным цветущим лугам Коль-Укок, ночевки в аутентичных юрточных лагерях у бурных ручьев и ужины в гостях у местных семей чабанов."
    },
    dates: ["Jul 12 - Jul 15", "Aug 02 - Aug 05", "Aug 18 - Aug 21"],
    maxGroupSize: 6,
    highlights: {
      EN: [
        "Horseback trek through pristine jailoo",
        "Stay in a cozy lakeside yurt camp",
        "Traditional Kyrgyz food by Nomad Travel hosts",
        "Hike around the turquoise inner lake"
      ],
      RU: [
        "Конный переход по девственным джайлоо",
        "Размещение в уютном юрточном лагере",
        "Традиционная кухня от хозяев Nomad Travel",
        "Прогулка у бирюзового горного озера"
      ]
    },
    weatherLocation: "Kochkor",
    liveAvailability: 4
  },
  {
    id: "tour-2",
    title: {
      EN: "Song-Kul Lake Alpine Nomad Sanctuary",
      RU: "Сон-Куль: Высокогорное Святилище Номадов"
    },
    category: "Eco-Travel",
    destination: {
      EN: "Song-Kul Lake",
      RU: "Озеро Сон-Куль"
    },
    country: {
      EN: "Kyrgyzstan",
      RU: "Кыргызстан"
    },
    image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=1200",
    price: 390,
    originalPrice: 450,
    duration: {
      EN: "4 Days",
      RU: "4 Дня"
    },
    rating: 4.95,
    reviews: 98,
    description: {
      EN: "Experience the legendary high-altitude alpine lake Song-Kul. Witness Kyrgyz nomadic hospitality, watch sheep shearing, taste fresh kymyz, and sleep under millions of stars.",
      RU: "Ощутите легендарную красоту высокогорного озера Сон-Куль на высоте 3016 м. Познакомьтесь с бытом кочевников, попробуйте кумыс и заночуйте под миллионами звезд."
    },
    dates: ["Jul 24 - Jul 28", "Aug 10 - Aug 14", "Sep 02 - Sep 06"],
    maxGroupSize: 8,
    highlights: {
      EN: [
        "Sleep in beautiful felt-insulated yurts",
        "Observe nomadic national horse games",
        "Scenic ride over Kalmak-Ashuu pass",
        "Milky Way star observatory night"
      ],
      RU: [
        "Ночевки в традиционных войлочных юртах",
        "Показ национальных конных игр кочевников",
        "Поездка через перевал Калмак-Ашуу",
        "Наблюдение за Млечным Путем на джайлоо"
      ]
    },
    weatherLocation: "Song-Kul",
    liveAvailability: 6
  },
  {
    id: "tour-3",
    title: {
      EN: "Kyzart to Song-Kul High Pass Trekking",
      RU: "Пеший треккинг из Кызарта на Сон-Куль"
    },
    category: "Adventure",
    destination: {
      EN: "Song-Kul Lake",
      RU: "Озеро Сон-Куль"
    },
    country: {
      EN: "Kyrgyzstan",
      RU: "Кыргызстан"
    },
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
    price: 260,
    originalPrice: 310,
    duration: {
      EN: "3 Days",
      RU: "3 Дня"
    },
    rating: 4.85,
    reviews: 82,
    description: {
      EN: "Trek on foot over the spectacular Jalgyz-Karagay mountain pass into the endless pasture valleys of Song-Kul. Experience Nomad Travel community lodging with local shepherds.",
      RU: "Пеший поход через живописный горный перевал Жалгыз-Карагай в бескрайние пастбища озера Сон-Куль. Размещение в гостеприимных домах местных пастухов."
    },
    dates: ["Aug 01 - Aug 04", "Aug 15 - Aug 18", "Sep 10 - Sep 13"],
    maxGroupSize: 10,
    highlights: {
      EN: [
        "Cross Jalgyz-Karagay pass at 3,300m",
        "Baggage carried by local pack horses",
        "Organic farm-to-table Kyrgyz food",
        "Support sustainable community tourism"
      ],
      RU: [
        "Переход через перевал на высоте 3300 м",
        "Перевозка багажа на вьючных лошадях",
        "Органические кыргызские фермерские блюда",
        "Поддержка экологического туризма Nomad Travel"
      ]
    },
    weatherLocation: "Kyzart",
    liveAvailability: 5
  },
  {
    id: "tour-4",
    title: {
      EN: "Traditional Felt Making & Craft Workshop",
      RU: "Мастер-класс по войлоку Шырдак в Кочкоре"
    },
    category: "Cultural",
    destination: {
      EN: "Kochkor Valley",
      RU: "Долина Кочкор"
    },
    country: {
      EN: "Kyrgyzstan",
      RU: "Кыргызстан"
    },
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200",
    price: 75,
    originalPrice: 95,
    duration: {
      EN: "1 Day",
      RU: "1 День"
    },
    rating: 4.98,
    reviews: 145,
    description: {
      EN: "Immerse in the UNESCO-recognized craft of Kyrgyz Shyrdak felt carpets in Kochkor village. Collaborate with local grandmothers, dye natural organic wool, and create your own mosaic ornament.",
      RU: "Погрузитесь в охраняемое ЮНЕСКО ремесло изготовления войлочных ковров Шырдак в селе Кочкор. Мастер-класс от потомственных мастериц с обедом и музыкой."
    },
    dates: ["Daily Departures on Request"],
    maxGroupSize: 12,
    highlights: {
      EN: [
        "Hands-on tutorial with master craftswomen",
        "Dye organic mountain sheep wool",
        "Traditional family-style lunch",
        "Kyrgyz folk music and komuz concert"
      ],
      RU: [
        "Практический урок от опытных мастериц",
        "Окрашивание органической овечьей шерсти",
        "Традиционный семейный кыргызский обед",
        "Концерт фольклорной музыки на комузе"
      ]
    },
    weatherLocation: "Kochkor",
    liveAvailability: 10
  },
  {
    id: "tour-5",
    title: {
      EN: "Silk Road Secrets & Tash Rabat Stone Fortress",
      RU: "Тайны Шелкового Пути: Крепость Таш-Рабат"
    },
    category: "Cultural",
    destination: {
      EN: "Tash Rabat",
      RU: "Таш-Рабат"
    },
    country: {
      EN: "Kyrgyzstan",
      RU: "Кыргызстан"
    },
    image: "https://images.unsplash.com/photo-1566121318594-a834e355d144?q=80&w=1200",
    price: 550,
    originalPrice: 650,
    duration: {
      EN: "5 Days",
      RU: "5 Дней"
    },
    rating: 4.8,
    reviews: 73,
    description: {
      EN: "Journey along the historic Silk Road to Tash Rabat, a mysterious 15th-century stone castle. Stay in a neighboring yurt camp and horse ride to Chatyr-Kul alpine salt lake near the border.",
      RU: "Путешествие по Великому Шелковому Пути к Таш-Рабату — крепости 15 века. Ночевка в юрточном лагере и конная прогулка к высокогорному озеру Чатыр-Куль."
    },
    dates: ["Jul 15 - Jul 20", "Aug 05 - Aug 10", "Aug 25 - Aug 30"],
    maxGroupSize: 6,
    highlights: {
      EN: [
        "Explore the historic stone corridors of Tash Rabat",
        "Horse ride to high Chatyr-Kul salt lake",
        "Yurt lodging in remote Kara-Koyun canyon",
        "Folklore tales around a cozy campfire"
      ],
      RU: [
        "Исследование каменных коридоров замка",
        "Конный поход к соленому озеру Чатыр-Куль",
        "Юртовый лагерь в глухом ущелье Кара-Коюн",
        "Старинные легенды у вечернего костра"
      ]
    },
    weatherLocation: "At-Bashi",
    liveAvailability: 3
  },
  {
    id: "tour-6",
    title: {
      EN: "Ala-Archa Peak Uchitel Alpine Ascent",
      RU: "Пик Учитель: Восхождение в Ала-Арче"
    },
    category: "Adventure",
    destination: {
      EN: "Ala-Archa",
      RU: "Ала-Арча"
    },
    country: {
      EN: "Kyrgyzstan",
      RU: "Кыргызстан"
    },
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200",
    price: 220,
    originalPrice: 280,
    duration: {
      EN: "2 Days",
      RU: "2 Дня"
    },
    rating: 4.9,
    reviews: 110,
    description: {
      EN: "Conquer Uchitel Peak (4,540m) in the magnificent Ala-Archa national park. Stay overnight in the legendary Ratsek mountaineering cabin with scenic glacial views.",
      RU: "Покорите пик Учитель (4540 м) в великолепном национальном парке Ала-Арча. Ночевка в легендарной хижине Рацека с шикарным видом на вековые ледники."
    },
    dates: ["Jul 08 - Jul 10", "Jul 22 - Jul 24", "Aug 12 - Aug 14"],
    maxGroupSize: 5,
    highlights: {
      EN: [
        "Stay at Ratsek high-camp cabin at 3,300m",
        "Professional certified IFMGA alpine guide",
        "Breathtaking 360 views of Tien Shan glaciers",
        "Acclimatization hikes to Ak-Sai icefall"
      ],
      RU: [
        "Ночевка на базе Рацека на высоте 3300 м",
        "Профессиональный сертифицированный гид",
        "Потрясающий вид на ледники Тянь-Шаня",
        "Акклиматизационный выход к ледопаду Ак-Сай"
      ]
    },
    weatherLocation: "Ala-Archa",
    liveAvailability: 3
  }
];

const INITIAL_DESTINATIONS = [
  {
    id: "dest-1",
    name: { EN: "Song-Kul Lake", RU: "Озеро Сон-Куль" },
    country: { EN: "Kyrgyzstan", RU: "Кыргызстан" },
    image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=1200",
    description: {
      EN: "High-altitude alpine lake at 3,016m, pristine jailoo pastures, traditional yurts, and zero light pollution.",
      RU: "Высокогорное альпийское озеро на высоте 3016 м, нетронутые джайлоо, традиционные юрты и чистое звездное небо."
    },
    rating: 4.95,
    priceFrom: 260,
    coordinates: { x: 58, y: 42 }
  },
  {
    id: "dest-2",
    name: { EN: "Kol-Ukok Lake", RU: "Озеро Коль-Укок" },
    country: { EN: "Kyrgyzstan", RU: "Кыргызстан" },
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1200",
    description: {
      EN: "Nicknamed 'lake in a chest', a hidden turquoise pearl surrounded by sharp peaks, perfect for horseback riders.",
      RU: "Скрытая бирюзовая жемчужина, окруженная крутыми пиками — идеальное место для конных прогулок из Кочкора."
    },
    rating: 4.9,
    priceFrom: 280,
    coordinates: { x: 62, y: 43 }
  },
  {
    id: "dest-3",
    name: { EN: "Kochkor Valley", RU: "Долина Кочкор" },
    country: { EN: "Kyrgyzstan", RU: "Кыргызстан" },
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200",
    description: {
      EN: "The heartbeat of Kyrgyz craft tourism, world-renowned for handmade wool felt carpets and ancient traditions.",
      RU: "Центр кыргызского ремесленного туризма, всемирно известный коврами шырдак и вековыми традициями."
    },
    rating: 4.98,
    priceFrom: 75,
    coordinates: { x: 61, y: 45 }
  },
  {
    id: "dest-4",
    name: { EN: "Tash Rabat", RU: "Таш-Рабат" },
    country: { EN: "Kyrgyzstan", RU: "Кыргызстан" },
    image: "https://images.unsplash.com/photo-1566121318594-a834e355d144?q=80&w=1200",
    description: {
      EN: "Mysterious 15th-century stone caravanserai castle quietly nested deep in a rugged canyon near the Chinese border.",
      RU: "Загадочный каменный караван-сарай 15 века, уединенно расположенный в ущелье у границы с Китаем."
    },
    rating: 4.8,
    priceFrom: 550,
    coordinates: { x: 56, y: 55 }
  },
  {
    id: "dest-5",
    name: { EN: "Ala-Archa", RU: "Ала-Арча" },
    country: { EN: "Kyrgyzstan", RU: "Кыргызстан" },
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200",
    description: {
      EN: "Majestic alpine national park featuring alpine fir trees, dramatic icefalls, and sheer granite peaks near Bishkek.",
      RU: "Величественный национальный парк с арчовыми лесами, застывшими ледопадами и отвесными пиками у Бишкека."
    },
    rating: 4.9,
    priceFrom: 220,
    coordinates: { x: 52, y: 41 }
  },
  {
    id: "dest-6",
    name: { EN: "Karakol & Jeti-Oguz", "RU": "Каракол и Жети-Огуз" },
    country: { EN: "Kyrgyzstan", RU: "Кыргызстан" },
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
    description: {
      EN: "Vibrant red rock formations, alpine thermal springs, historical wooden cathedral, and multi-day trek passes.",
      RU: "Красные скалы 'Семь быков', горячие источники, исторический деревянный собор и треккинговые тропы."
    },
    rating: 4.88,
    priceFrom: 280,
    coordinates: { x: 72, y: 44 }
  }
];

const INITIAL_TESTIMONIALS = [
  {
    id: "test-1",
    name: "Svetlana Volkova",
    role: { EN: "Ethnography Researcher", RU: "Исследователь-этнограф" },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    rating: 5,
    text: {
      EN: "My horse trek to Kol-Ukok lake organized by Nomad Travel was the highlight of my research. True nomad hospitality, preserved customs, and stunning landscapes.",
      RU: "Мой конный поход на Коль-Укок, организованный Nomad Travel, стал главным событием поездки. Настоящее гостеприимство, бережно хранимые обычаи и сказочные пейзажи."
    },
    location: { EN: "Moscow, Russia", RU: "Москва, Россия" }
  },
  {
    id: "test-2",
    name: "David Mercer",
    role: { EN: "Adventure Photographer", RU: "Приключенческий фотограф" },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 5,
    text: {
      EN: "Song-Kul is a paradise on earth. Staying in traditional felt yurts, waking up to the sight of wild horses, and zero light pollution made for stellar photos.",
      RU: "Сон-Куль — это рай на земле. Проживание в традиционных войлочных юртах, рассветы под ржание диких табунов лошадей и звездное небо без лишнего света."
    },
    location: { EN: "London, UK", RU: "Лондон, Великобритания" }
  },
  {
    id: "test-3",
    name: "Aisuluu Mamytova",
    role: { EN: "Bespoke Expedition Client", RU: "Клиент индивидуальных туров" },
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    rating: 5,
    text: {
      EN: "Nomad Travel organized a flawless high-altitude expedition for our family. The private yurt setups, professional mountain guides, and seamless coordination made it an extraordinary journey.",
      RU: "Nomad Travel организовали безупречную высокогорную экспедицию для нашей семьи. Приватные юрты премиум-класса, профессиональные горные гиды и идеальная логистика сделали путешествие незабываемым."
    },
    location: { EN: "Bishkek, Kyrgyzstan", RU: "Бишкек, Кыргызстан" }
  }
];

const INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: {
      EN: "The Art of Shyrdak: Felt-Making Legacy in Kochkor",
      RU: "Искусство Шырдака: наследие войлока в Кочкоре"
    },
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200",
    date: { EN: "July 15, 2026", RU: "15 июля 2026 г." },
    readTime: { EN: "5 min read", RU: "5 мин чтения" },
    category: { EN: "Nomadic Craft", RU: "Ремесла Номадов" },
    author: "Aisuluu Mamytova",
    excerpt: {
      EN: "Discover the deep history behind Kyrgyz felt carpets, how ornaments represent water, mountain goats, and stars, and why Kochkor grandmothers are protecting it.",
      RU: "Узнайте историю кыргызских войлочных ковров шырдак, что означают узоры в виде горных козлов и звезд, и как кочкорские бабушки защищают это ремесло."
    }
  },
  {
    id: "blog-2",
    title: {
      EN: "How to Plan Your First Alpine Horseback Ride to Song-Kul",
      RU: "Инструкция: твой первый конный поход на Сон-Куль"
    },
    image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=1200",
    date: { EN: "July 02, 2026", RU: "2 июля 2026 г." },
    readTime: { EN: "7 min read", RU: "7 мин чтения" },
    category: { EN: "Survival & Tips", RU: "Советы туристам" },
    author: "Nurbek Usubaliev",
    excerpt: {
      EN: "A professional Nomad Travel guide shares packing lists, safety tips, and horse-riding etiquette for navigating high altitude passes and staying in shepherd yurt camps.",
      RU: "Профессиональный гид Nomad Travel делится списком вещей, правилами безопасности и этикетом езды на лошадях для прохождения перевалов и ночевок в юрточном лагере."
    }
  },
  {
    id: "blog-3",
    title: {
      EN: "Yurt Etiquette: Honoring Traditional Nomad Hospitality",
      RU: "Этикет в юрте: законы традиционного гостеприимства"
    },
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1200",
    date: { EN: "June 18, 2026", RU: "18 июня 2026 г." },
    readTime: { EN: "4 min read", RU: "4 мин чтения" },
    category: { EN: "Nomad Culture", RU: "Культура кочевников" },
    author: "Ermek Satybaldyev",
    excerpt: {
      EN: "Wander inside the architecture of the Kyrgyz yurt. Learn why you should never step on the threshold and how to respect the sacred upper dome (tunduk).",
      RU: "Исследуйте архитектуру кыргызской юрты. Узнайте, почему никогда нельзя наступать на порог и как выразить почтение священному верхнему куполу (тюндюку)."
    }
  }
];

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const defaultData = {
      tours: INITIAL_TOURS,
      destinations: INITIAL_DESTINATIONS,
      testimonials: INITIAL_TESTIMONIALS,
      blogPosts: INITIAL_BLOGS,
      bookings: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf8");
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const data = JSON.parse(raw);
    if (!data.bookings) {
      data.bookings = [];
    }
    return data;
  } catch (error) {
    console.error("Database reading error:", error);
    return {
      tours: INITIAL_TOURS,
      destinations: INITIAL_DESTINATIONS,
      testimonials: INITIAL_TESTIMONIALS,
      blogPosts: INITIAL_BLOGS,
      bookings: []
    };
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Database writing error:", error);
  }
}

// API Routes to Fetch and Administer Content

// Upload file to local server
app.post("/api/upload", (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image data provided" });
    }

    // Match base64 prefix
    const matches = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 image data format" });
    }

    const extension = matches[1] === "jpeg" ? "jpg" : matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");
    
    const fileName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${extension}`;
    const filePath = path.join(process.cwd(), "uploads", fileName);
    
    fs.writeFileSync(filePath, buffer);
    
    const fileUrl = `/uploads/${fileName}`;
    res.json({ url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message || "Failed to upload image" });
  }
});

// Get all content
app.get("/api/content", (req, res) => {
  const data = readDB();
  res.json(data);
});

// Create item
app.post("/api/:type", (req, res) => {
  const { type } = req.params;
  const item = req.body;
  if (!["tours", "destinations", "testimonials", "blogPosts", "bookings"].includes(type)) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  const data = readDB();
  const newItem = {
    ...item,
    id: `${type.slice(0, 4)}-${Date.now()}`
  };

  data[type].push(newItem);
  writeDB(data);

  res.status(201).json(newItem);
});

// Update item
app.put("/api/:type/:id", (req, res) => {
  const { type, id } = req.params;
  const updatedFields = req.body;
  if (!["tours", "destinations", "testimonials", "blogPosts", "bookings"].includes(type)) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  const data = readDB();
  const idx = data[type].findIndex((x: any) => x.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  data[type][idx] = {
    ...data[type][idx],
    ...updatedFields,
    id // keep original ID
  };

  writeDB(data);
  res.json(data[type][idx]);
});

// Delete item
app.delete("/api/:type/:id", (req, res) => {
  const { type, id } = req.params;
  if (!["tours", "destinations", "testimonials", "blogPosts", "bookings"].includes(type)) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  const data = readDB();
  const filtered = data[type].filter((x: any) => x.id !== id);
  data[type] = filtered;

  writeDB(data);
  res.json({ success: true, id });
});

// Mock weather database for travel destinations
const WEATHER_DATA: Record<string, { temp: number; text: string; humidity: number; wind: string; icon: string }> = {
  "Song-Kul": { temp: 12, text: "Chilly Meadows", humidity: 40, wind: "18 km/h", icon: "wind" },
  "Kochkor": { temp: 20, text: "Sunny Valley", humidity: 45, wind: "8 km/h", icon: "sun" },
  "Kyzart": { temp: 18, text: "Clear Mountain Pass", humidity: 48, wind: "10 km/h", icon: "sun" },
  "At-Bashi": { temp: 15, text: "Brisk & Fresh", humidity: 50, wind: "12 km/h", icon: "cloud-sun" },
  "Ala-Archa": { temp: 10, text: "Alpine Sunshine", humidity: 35, wind: "15 km/h", icon: "sun" },
  "Karakol": { temp: 22, text: "Lakeside Warmth", humidity: 55, wind: "7 km/h", icon: "cloud-sun" },
};

// API: Gemini Chat Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({ 
        text: "Hi there! I am Nomad Travel's AI Assistant. Please note that the GEMINI_API_KEY environment variable is not configured yet. Once configured, I will be fully functional to plan your dream vacation. For now, feel free to explore our pre-planned premium tours!" 
      });
    }

    // Format chat history for Gemini chat structure
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "You are Nomad Travel's AI Assistant. Nomad Travel is an award-winning premium travel agency specializing in immersive adventures, scenic nature excursions, and curated experiential journeys. Assist users with custom itineraries, tour recommendations, budgeting tips, and travel guidance. Keep your tone inspiring, professional, highly helpful, and conversational. Keep answers beautifully structured with clear markdown bullet points and paragraphs.",
      },
      history: formattedHistory
    });

    const result = await chat.sendMessage({ message });
    res.json({ text: result.text || "I apologize, but I could not formulate a response." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with our AI Assistant." });
  }
});

// API: Weather endpoint for destinations
app.get("/api/weather", (req, res) => {
  const location = req.query.location as string;
  if (!location) {
    return res.json({ success: false, error: "Location is required" });
  }
  const weather = WEATHER_DATA[location] || { temp: 22, text: "Splendid", humidity: 55, wind: "9 km/h", icon: "sun" };
  res.json({ success: true, location, ...weather });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback for production (Express v4 format)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Nomad Travel] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
