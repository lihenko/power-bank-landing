import { LucideIcon } from "lucide-react";

export interface Review {
  name: string;
  city: string;
  rating: number;
  date: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  text: string;
  large?: boolean;
}

export interface HeroConfig {
  badgeText?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  checklist?: string[];
  ratingSubtext?: string;
  ctaText?: string;
  ctaHref?: string;
  disclaimer?: string;
}

export interface FeaturesConfig {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FeatureItem[];
}

export interface ImageTextConfig {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
}

export interface PackageConfig {
  eyebrow?: string;
  title: string;
  description: string;
  items?: string[];
  image: string;
  imageAlt: string;
}

export interface ProductConfig {
  productName: string;
  productSlug: string;
  price: number;
  oldPrice?: number;
  stockCount?: number;

  hero: HeroConfig;
  features?: FeaturesConfig;
  compact?: ImageTextConfig;
  ports?: ImageTextConfig;
  package?: PackageConfig;
  reviews?: Review[];
  faq?: FaqItem[];

  viewersRange?: { min: number; max: number };
}