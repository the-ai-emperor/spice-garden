export interface Product {
  slug: string;
  name: string;
  /** Compact label used in WhatsApp order messages to keep URLs short */
  shortName: string;
  price: number;
  thumbnail: string;
  gallery: string[];
  description: string;
  category: string;
  tags: string[];
  badge?: string;
  featured?: boolean;
  popular?: boolean;
}
