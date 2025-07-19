export interface Usta {
  id: string;
  name: string;
  category: string;
  rating: number;
  experience: number;
  location: string;
  phone: string;
  description: string;
  image: string;
  hourlyRate: number;
  reviews: number;
  specialties?: string[];
  availability?: string;
  verified?: boolean;
}

export interface Kategori {
  id: string;
  name: string;
  description: string;
  icon: string;
  ustalar: Usta[];
  image?: string;
  popularServices?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
} 