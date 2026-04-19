import React from 'react';
import { PortfolioContent } from '../../services/portfolioService';
import { useOutletContext } from 'react-router-dom';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminHeroPage: React.FC = () => {
  const { editedContent, setEditedContent } = useOutletContext<ContextType>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-ink-black/40">Hero Title</label>
        <input 
          type="text" 
          value={editedContent.hero.title}
          onChange={(e) => setEditedContent({ ...editedContent, hero: { ...editedContent.hero, title: e.target.value } })}
          className="w-full p-3 neo-brutal-border bg-white font-bold"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-ink-black/40">Hero Subtitle</label>
        <input 
          type="text" 
          value={editedContent.hero.subtitle}
          onChange={(e) => setEditedContent({ ...editedContent, hero: { ...editedContent.hero, subtitle: e.target.value } })}
          className="w-full p-3 neo-brutal-border bg-white font-bold"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-ink-black/40">About Description</label>
        <textarea 
          value={editedContent.hero.about}
          onChange={(e) => setEditedContent({ ...editedContent, hero: { ...editedContent.hero, about: e.target.value } })}
          className="w-full p-3 neo-brutal-border bg-white font-medium h-32"
        />
      </div>
    </div>
  );
};

export default AdminHeroPage;
