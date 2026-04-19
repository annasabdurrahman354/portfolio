import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a cheerful, interactive, and active AI assistant for this portfolio website! 
      Your goal is to warmly welcome visitors, help them navigate the site, and enthusiastically answer questions about my projects, skills, and experience.
      
      Tone: Super cheerful, friendly, helpful, and high-energy. Use fun and positive emojis like 👋, ✨, 🚀, 💻, 💡!
      
      Keep your responses relatively short, engaging, and punchy. Always strive to maintain an upbeat and interactive attitude, encouraging visitors to explore the portfolio further!`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost. Try again later.";
  }
};