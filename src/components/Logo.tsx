import React from "react";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className = "w-8 h-8", isDark = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="custom-luxury-logo"
    >
      {/* Outer elegant golden thin ring */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="url(#luxuryGoldGrad)"
        strokeWidth="1.5"
        className="opacity-90"
      />

      {/* Outer compass dashes */}
      <line x1="50" y1="4" x2="50" y2="7" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="93" x2="50" y2="96" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="50" x2="7" y2="50" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="93" y1="50" x2="96" y2="50" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Stellar North Star */}
      <polygon
        points="50,14 52,21 59,23 52,25 50,32 48,25 41,23 48,21"
        fill="url(#luxuryGoldGrad)"
      />

      {/* The Sacred Kyrgyz Shanyrak / Tunduk (Nomadic Sun Crown) */}
      <g transform="translate(50, 42)">
        {/* Shanyrak Ring */}
        <circle cx="0" cy="0" r="14" stroke="url(#luxuryGoldGrad)" strokeWidth="2" fill="none" />
        
        {/* Criss-cross bent dome struts representing the traditional crown */}
        <path d="M-13,5 C-5,-5 5,-5 13,5" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" fill="none" />
        <path d="M-13,-5 C-5,5 5,5 13,-5" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" fill="none" />
        <path d="M-5,-13 C-5,-5 -5,5 -5,13" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" fill="none" />
        <path d="M5,-13 C5,-5 5,5 5,13" stroke="url(#luxuryGoldGrad)" strokeWidth="1.5" fill="none" />
      </g>

      {/* Minimalist Peak 1: Back Ridge (Deep Turquoise) */}
      <path
        d="M16 82 L42 46 L62 72 L84 82 Z"
        fill="url(#mountainBackGrad)"
        stroke={isDark ? "#020617" : "#FFFFFF"}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Minimalist Peak 2: Front Ridge (Bright Turquoise/Emerald) */}
      <path
        d="M28 82 L58 38 L80 82 Z"
        fill="url(#mountainFrontGrad)"
        stroke={isDark ? "#020617" : "#FFFFFF"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Snowcaps on Peaks */}
      <polygon
        points="58,38 52,48 56,47 58,51 61,46 64,48"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <polygon
        points="42,46 38,52 41,51 43,54 45,51"
        fill="#FFFFFF"
        opacity="0.8"
      />

      {/* Reflective Lake ripples at base */}
      <line x1="32" y1="86" x2="68" y2="86" stroke="url(#luxuryTealGrad)" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />
      <line x1="42" y1="90" x2="58" y2="90" stroke="url(#luxuryGoldGrad)" strokeWidth="1.2" strokeLinecap="round" className="opacity-70" />

      {/* Gradients declarations */}
      <defs>
        <linearGradient id="luxuryGoldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="luxuryTealGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="mountainBackGrad" x1="42" y1="46" x2="42" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#115E59" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="mountainFrontGrad" x1="54" y1="38" x2="54" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="50%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>
    </svg>
  );
}
