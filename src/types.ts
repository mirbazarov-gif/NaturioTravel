export interface LocalizedText {
  EN: string;
  RU: string;
}

export interface LocalizedArray {
  EN: string[];
  RU: string[];
}

export interface Tour {
  id: string;
  title: string | LocalizedText;
  category: "Luxury" | "Adventure" | "Eco-Travel" | "Cultural";
  destination: string | LocalizedText;
  country: string | LocalizedText;
  image: string;
  price: number;
  originalPrice: number;
  duration: string | LocalizedText;
  rating: number;
  reviews: number;
  description: string | LocalizedText;
  dates: string[];
  maxGroupSize: number;
  highlights: string[] | LocalizedArray;
  weatherLocation: string;
  liveAvailability: number; // slots left
}

export interface Destination {
  id: string;
  name: string | LocalizedText;
  country: string | LocalizedText;
  image: string;
  description: string | LocalizedText;
  rating: number;
  priceFrom: number;
  coordinates: { x: number; y: number }; // Percentage coordinate for the custom world map
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | LocalizedText;
  avatar: string;
  rating: number;
  text: string | LocalizedText;
  location: string | LocalizedText;
}

export interface BlogPost {
  id: string;
  title: string | LocalizedText;
  image: string;
  date: string | LocalizedText;
  readTime: string | LocalizedText;
  category: string | LocalizedText;
  author: string;
  excerpt: string | LocalizedText;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type Currency = "USD" | "EUR" | "GBP";
export type Language = "EN" | "RU";

