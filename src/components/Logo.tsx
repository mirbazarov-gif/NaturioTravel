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
      id="custom-logo-svg"
    >
      {/* Outer compass-like fine ring */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#compassGrad)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        className="opacity-70"
      />
      
      {/* Golden Rising Sun */}
      <circle cx="50" cy="38" r="10" fill="url(#sunGrad)" />

      {/* Sun rays (subtle aesthetic ticks) */}
      <line x1="50" y1="23" x2="50" y2="26" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="65" y1="38" x2="62" y2="38" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="38" x2="38" y2="38" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60.6" y1="27.4" x2="58.5" y2="29.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="39.4" y1="27.4" x2="41.5" y2="29.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Majestic Mountain Ridge (Tian Shan) in background */}
      <path
        d="M10 75 L38 35 L52 53 L76 25 L90 75 Z"
        fill="url(#mountainGrad)"
        stroke={isDark ? "#1E293B" : "#F1F5F9"}
        strokeWidth="1"
      />

      {/* Snow caps */}
      <path
        d="M38 35 L33 42 L42 42 L38 35 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <path
        d="M76 25 L68 38 L81 36 L76 25 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />

      {/* Foreground Mountain details */}
      <path
        d="M25 75 L45 48 L60 75 Z"
        fill="url(#foregroundMountainGrad)"
        opacity="0.85"
      />

      {/* Nomadic Yurt (Kыргызская боз-үй) at the center foreground */}
      <g transform="translate(42, 60)">
        {/* Yurt Dome */}
        <path
          d="M2 15 C2 3, 14 3, 14 15 Z"
          fill="#F8FAFC"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        {/* Yurt Walls */}
        <rect
          x="2"
          y="15"
          width="12"
          height="6"
          rx="1"
          fill="#F1F5F9"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        {/* Yurt Door (glowing warm gold inside) */}
        <path
          d="M6 21 L6 15 C6 14, 10 14, 10 15 L10 21 Z"
          fill="#FBBF24"
          stroke="#1E293B"
          strokeWidth="1.2"
        />
        {/* Shanyrak (Tunduk) crisscross crown lines */}
        <circle cx="8" cy="4" r="2.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1" />
        <line x1="8" y1="1.5" x2="8" y2="6.5" stroke="#1E293B" strokeWidth="0.8" />
        <line x1="5.5" y1="4" x2="10.5" y2="4" stroke="#1E293B" strokeWidth="0.8" />
      </g>

      {/* Gradients */}
      <defs>
        <linearGradient id="sunGrad" x1="50" y1="28" x2="50" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="mountainGrad" x1="50" y1="25" x2="50" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="foregroundMountainGrad" x1="42.5" y1="48" x2="42.5" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="compassGrad" x1="50" y1="6" x2="50" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
