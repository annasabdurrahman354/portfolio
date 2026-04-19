
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  description: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    title: string;
    description?: string;
  }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  media?: {
    type: 'image' | 'pdf';
    url: string;
    title: string;
    description?: string;
  }[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  media?: {
    type: 'image' | 'pdf';
    url: string;
    title: string;
    description?: string;
  }[];
}

export interface Award {
  id: string;
  title: string;
  date: string;
  media?: {
    type: 'image' | 'pdf';
    url: string;
    title: string;
    description?: string;
  }[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  SKILLS = 'skills',
  CONTACT = 'contact',
}
