import React from "react";

interface TianShanBackgroundProps {
  isDark: boolean;
}

export default function TianShanBackground({ isDark }: TianShanBackgroundProps) {
  return (
    <div className="absolute inset-x-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Real photographic majestic background of Kyrgyz Tian-Shan mountains */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 opacity-[0.08] dark:opacity-[0.05] transition-opacity duration-300">
        <img 
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1920" 
          alt="Kyrgyz Tian-Shan Mountains Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Absolute floating mountain drawings placed strategically on the pages */}
      
      {/* SECTION 1: Left floating peak decoration (behind Destinations/Tours) */}
      <div className="absolute top-[850px] left-0 w-80 md:w-[450px] h-[400px] opacity-45 dark:opacity-55 -translate-x-12 md:-translate-x-6 transition-all duration-500">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Vibrant Turquoise to Deep Slate Gradient */}
            <linearGradient id="vibrant-peak-1" x1="200" y1="100" x2="200" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
            </linearGradient>
            
            {/* Glowing Golden Sun Gradient */}
            <radialGradient id="sun-glow-1" cx="200" cy="180" r="150" fx="200" fy="180">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </radialGradient>

            {/* Radiant Sunburst */}
            <linearGradient id="sun-ring" x1="100" y1="100" x2="300" y2="300">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>

            {/* Pure white snowcap with a touch of gold */}
            <linearGradient id="snow-cap-grad" x1="200" y1="100" x2="200" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Glowing sunrise background behind Khan Tengri */}
          <circle cx="200" cy="180" r="130" fill="url(#sun-glow-1)" />
          
          {/* Sunbeams */}
          <line x1="200" y1="60" x2="200" y2="10" stroke="url(#sun-ring)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="120" y1="100" x2="80" y2="70" stroke="url(#sun-ring)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="280" y1="100" x2="320" y2="70" stroke="url(#sun-ring)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Main Peak 1 (Khan Tengri Inspired - Sharp pyramid) */}
          <path
            d="M50 350 L200 100 L350 350 Z"
            fill="url(#vibrant-peak-1)"
            stroke="#06b6d4"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          
          {/* Snow Cap */}
          <path
            d="M165 160 L200 100 L235 160 L218 148 L200 165 L182 148 Z"
            fill="url(#snow-cap-grad)"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          
          {/* Glowing Golden Ridge line */}
          <path
            d="M200 100 L208 210 L192 280 L200 350"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          
          {/* Small Secondary Peak */}
          <path
            d="M220 350 L310 210 L380 350 Z"
            fill="url(#vibrant-peak-1)"
            stroke="#0d9488"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
          <path
            d="M290 240 L310 210 L330 240 L320 235 L310 242 L300 235 Z"
            fill="#ffffff"
            fillOpacity="0.9"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Altitude Label Decoration */}
          <g className="opacity-80 dark:opacity-90">
            <text
              x="200"
              y="80"
              className="font-mono text-[10px] font-extrabold tracking-widest fill-amber-500 dark:fill-amber-400 uppercase"
              textAnchor="middle"
            >
              Khan Tengri Peak — 7010m
            </text>
            <circle cx="200" cy="90" r="2.5" fill="#fbbf24" />
            <line x1="200" y1="92" x2="200" y2="100" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        </svg>
      </div>

      {/* SECTION 2: Right floating peak decoration (behind WhyChooseUs) */}
      <div className="absolute top-[2050px] right-0 w-80 md:w-[460px] h-[400px] opacity-40 dark:opacity-50 translate-x-12 md:translate-x-8 transition-all duration-500">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich Teal to Emerald Gradient */}
            <linearGradient id="vibrant-peak-2" x1="200" y1="80" x2="200" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.0" />
            </linearGradient>

            {/* Sunrise Warm Light Background */}
            <radialGradient id="sun-glow-2" cx="200" cy="150" r="160" fx="200" fy="150">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </radialGradient>

            <linearGradient id="snow-cap-grad-2" x1="200" y1="80" x2="200" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Soft sunrise circle behind Pobeda Peak */}
          <circle cx="200" cy="150" r="140" fill="url(#sun-glow-2)" />

          {/* Main Peak 2 (Jengish Chokusu / Pobeda Peak) */}
          <path
            d="M20 380 L180 80 L340 380 Z"
            fill="url(#vibrant-peak-2)"
            stroke="#14b8a6"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          
          {/* Snow Cap with broad crest */}
          <path
            d="M145 145 L180 80 L215 145 L198 132 L180 150 L162 132 Z"
            fill="url(#snow-cap-grad-2)"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          
          {/* Jagged Ridge line */}
          <path
            d="M180 80 L172 190 L188 290 L180 380"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />

          {/* Side jagged companion peak */}
          <path
            d="M140 380 L250 170 L380 380 Z"
            fill="url(#vibrant-peak-2)"
            stroke="#10b981"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
          <path
            d="M232 205 L250 170 L268 205 L260 200 L250 208 L240 200 Z"
            fill="#ffffff"
            fillOpacity="0.9"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Altitude Label Decoration */}
          <g className="opacity-80 dark:opacity-90">
            <text
              x="180"
              y="60"
              className="font-mono text-[10px] font-extrabold tracking-widest fill-emerald-600 dark:fill-emerald-400 uppercase"
              textAnchor="middle"
            >
              Jengish Chokusu — 7439m
            </text>
            <circle cx="180" cy="70" r="2.5" fill="#10b981" />
            <line x1="180" y1="72" x2="180" y2="80" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        </svg>
      </div>

      {/* SECTION 3: Bottom Full-Width Multi-layered Mountain Range (before Footer) */}
      <div className="absolute top-[4100px] left-0 right-0 h-56 md:h-72 opacity-50 dark:opacity-60 transition-all duration-500">
        <svg
          viewBox="0 0 1440 250"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Multi-layered custom vibrant gradients */}
            <linearGradient id="tian-shan-vibrant-back" x1="720" y1="0" x2="720" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.0" />
            </linearGradient>
            
            <linearGradient id="tian-shan-vibrant-mid" x1="720" y1="50" x2="720" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.0" />
            </linearGradient>
            
            <linearGradient id="tian-shan-vibrant-front" x1="720" y1="100" x2="720" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#115e59" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.1" />
            </linearGradient>

            {/* Glowing Golden Sun Disc */}
            <radialGradient id="mountain-sun" cx="720" cy="80" r="180">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* Radiant Sun behind the mountain ridge */}
          <circle cx="720" cy="85" r="120" fill="url(#mountain-sun)" />

          {/* Back distant sharp ridge */}
          <path
            d="M0 250 L0 110 L120 60 L250 140 L380 50 L510 130 L690 30 L840 120 L1010 40 L1180 150 L1310 70 L1440 170 L1440 250 Z"
            fill="url(#tian-shan-vibrant-back)"
            stroke="#0891b2"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />

          {/* Mid ridge with snow caps */}
          <path
            d="M0 250 L0 150 L180 90 L320 170 L490 100 L640 180 L780 110 L960 190 L1120 110 L1280 180 L1440 130 L1440 250 Z"
            fill="url(#tian-shan-vibrant-mid)"
            stroke="#0d9488"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          {/* Snow caps on mid ridge */}
          <polygon points="180,90 165,108 180,103 195,108" fill="#ffffff" fillOpacity="0.95" />
          <polygon points="490,100 475,118 490,113 505,118" fill="#ffffff" fillOpacity="0.95" />
          <polygon points="780,110 765,128 780,123 795,128" fill="#ffffff" fillOpacity="0.95" />
          <polygon points="1120,110 1105,128 1120,123 1135,128" fill="#ffffff" fillOpacity="0.95" />

          {/* Front close range */}
          <path
            d="M0 250 L0 190 L110 150 L240 200 L410 140 L580 210 L720 160 L890 220 L1050 150 L1210 200 L1360 160 L1440 200 L1440 250 Z"
            fill="url(#tian-shan-vibrant-front)"
            stroke="#0f766e"
            strokeWidth="1.8"
            strokeOpacity="0.95"
          />
          <polygon points="110,150 98,165 110,161 122,165" fill="#ffffff" fillOpacity="0.95" stroke="#ffffff" strokeWidth="0.5" />
          <polygon points="410,140 398,155 410,151 422,155" fill="#ffffff" fillOpacity="0.95" stroke="#ffffff" strokeWidth="0.5" />
          <polygon points="720,160 708,175 720,171 732,175" fill="#ffffff" fillOpacity="0.95" stroke="#ffffff" strokeWidth="0.5" />
          <polygon points="1050,150 1038,165 1050,161 1062,165" fill="#ffffff" fillOpacity="0.95" stroke="#ffffff" strokeWidth="0.5" />
          <polygon points="1360,160 1348,175 1360,171 1372,175" fill="#ffffff" fillOpacity="0.95" stroke="#ffffff" strokeWidth="0.5" />

          {/* Coordinates graphic label */}
          <g className="opacity-80">
            <rect x="520" y="215" width="400" height="24" rx="12" fill="#022c22" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="1" />
            <text
              x="720"
              y="231"
              className="font-mono text-[10px] font-extrabold tracking-widest fill-[#fbbf24] uppercase"
              textAnchor="middle"
            >
              ★ TIAN SHAN RANGE — HIGHEST MOUNTAINS OF CENTRAL ASIA ★
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

