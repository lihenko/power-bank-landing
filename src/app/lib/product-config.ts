import { LucideIcon } from "lucide-react";

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage: string;
  canonicalPath: string;
}

export interface BundleOption {
  quantity: number;
  bonus?: number; 
  discountPercent?: number; 
  label?: string;
}
 
export interface BundlesConfig {
  eyebrow?: string;
  title?: string;
  unitLabel?: string;
  options: BundleOption[];
}

interface ProductKitOption {
  quantity: number;
  discountPercent: number;
  label?: string;
}

interface ProductKit {
  eyebrow: string;
  title: string;
  unitLabel: string;
  options: ProductKitOption[];
}

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

  seo: SeoConfig;
  hero: HeroConfig;
  features?: FeaturesConfig;
  bundles?: BundlesConfig;
  kit?: ProductKit;
  compact?: ImageTextConfig;
  ports?: ImageTextConfig;
  package?: PackageConfig;
  reviews?: Review[];
  faq?: FaqItem[];

  viewersRange?: { min: number; max: number };
}