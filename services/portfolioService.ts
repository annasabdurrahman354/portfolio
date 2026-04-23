import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { supabase } from './supabase';
import { Project, Experience, Education, Certification, Award, Skill, Language } from '../types';
import * as initialData from '../constants';

export interface PortfolioContent {
  hero: {
    title: string;
    subtitle: string;
    about: string;
  };
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  skills: Skill[];
  languages: Language[];
}

const CONTENT_DOC_ID = 'main';
const CONTENT_COLLECTION = 'content';

export const getPortfolioContent = async (): Promise<PortfolioContent | null> => {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioContent;
    }
    return null;
  } catch (error) {
    console.error('Error fetching portfolio content:', error);
    return null;
  }
};

export const subscribeToPortfolioContent = (callback: (content: PortfolioContent) => void) => {
  const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as PortfolioContent);
    }
  }, (error) => {
    console.error('Firestore Error: ', error);
  });
};

export const updatePortfolioContent = async (content: PortfolioContent) => {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
    await setDoc(docRef, content);
  } catch (error) {
    console.error('Error updating portfolio content:', error);
    throw error;
  }
};

export const uploadMedia = async (file: File, path: string): Promise<string> => {
  try {
    // We assume a bucket named 'portfolio' exists.
    // Path should include the filename.
    const { data, error } = await supabase.storage
      .from('portfolio')
      .upload(path, file, {
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading media to Supabase:', error);
    throw error;
  }
};

export const initializePortfolioData = async () => {
  const existing = await getPortfolioContent();
  if (!existing) {
    const defaultContent: PortfolioContent = {
      hero: {
        title: "Annas Abdurrahman",
        subtitle: "Software Engineer & Digital Strategist",
        about: "I am an Informatics graduate with a strong passion for software engineering. My experience spans across full-stack web development (Frontend & Backend) and mobile systems (Native Android & React Native)."
      },
      projects: initialData.PROJECTS,
      experiences: initialData.EXPERIENCES,
      education: initialData.EDUCATION,
      certifications: initialData.CERTIFICATIONS,
      awards: initialData.AWARDS,
      skills: initialData.SKILLS,
      languages: initialData.LANGUAGES
    };
    await updatePortfolioContent(defaultContent);
  }
};
