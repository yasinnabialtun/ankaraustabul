export interface Usta {
  id: string;
  name: string;
  category: string;
  rating: number;
  experience: number;
  location: string;
  phone: string;
  description: string;
  image?: string;
  hourlyRate: number;
  reviews: number;
}

export interface Kategori {
  id: string;
  name: string;
  description: string;
  icon: string;
  ustalar: Usta[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  slug: string;
} 