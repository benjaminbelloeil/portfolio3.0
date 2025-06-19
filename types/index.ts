import { LucideIcon } from 'lucide-react';

export interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: 'web' | 'mobile';
  github?: string;
  live?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  details?: string[];
}

export interface Skill {
  name: string;
  level: 'Learning' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: string;
  description: string;
}

export interface Service {
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  price: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  features: string[];
}

export interface Thought {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  tags: string[];
  details: string;
  image: string;
}
