import React from 'react';
import { Plus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PortfolioContent } from '../../services/portfolioService';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminLanguagesPage: React.FC = () => {
  const { editedContent, setEditedContent } = useOutletContext<ContextType>();

  return (
    <div className="space-y-8">
      <button 
        onClick={() => setEditedContent({ ...editedContent, languages: [{ name: 'New Language', proficiency: 'Fluent' }, ...editedContent.languages] })}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add Language
      </button>
      {editedContent.languages.map((lang, idx) => (
        <div key={idx} className="p-6 bg-white neo-brutal-border grid grid-cols-2 gap-4">
          <input 
            type="text" 
            value={lang.name}
            onChange={(e) => {
              const newLangs = [...editedContent.languages];
              newLangs[idx].name = e.target.value;
              setEditedContent({ ...editedContent, languages: newLangs });
            }}
            className="p-2 border-b-2 border-ink-black font-bold"
          />
          <input 
            type="text" 
            value={lang.proficiency}
            onChange={(e) => {
              const newLangs = [...editedContent.languages];
              newLangs[idx].proficiency = e.target.value;
              setEditedContent({ ...editedContent, languages: newLangs });
            }}
            className="p-2 border-b-2 border-ink-black font-bold"
          />
        </div>
      ))}
    </div>
  );
};

export default AdminLanguagesPage;
