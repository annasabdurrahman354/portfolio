import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
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
        <div key={idx} className="p-6 bg-white neo-brutal-border grid grid-cols-2 gap-4 relative group pr-32">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                if (idx > 0) {
                  const newLangs = [...editedContent.languages];
                  [newLangs[idx - 1], newLangs[idx]] = [newLangs[idx], newLangs[idx - 1]];
                  setEditedContent({ ...editedContent, languages: newLangs });
                }
              }}
              disabled={idx === 0}
              className="p-1 hover:bg-gray-100 disabled:opacity-30 bg-white neo-brutal-border"
            ><ArrowUp className="w-4 h-4" /></button>
            <button 
              onClick={() => {
                if (idx < editedContent.languages.length - 1) {
                  const newLangs = [...editedContent.languages];
                  [newLangs[idx], newLangs[idx + 1]] = [newLangs[idx + 1], newLangs[idx]];
                  setEditedContent({ ...editedContent, languages: newLangs });
                }
              }}
              disabled={idx === editedContent.languages.length - 1}
              className="p-1 hover:bg-gray-100 disabled:opacity-30 bg-white neo-brutal-border"
            ><ArrowDown className="w-4 h-4" /></button>
            <button 
              onClick={() => {
                const newLangs = editedContent.languages.filter((_, i) => i !== idx);
                setEditedContent({ ...editedContent, languages: newLangs });
              }}
              className="p-1 text-red-500 hover:bg-red-50 bg-white neo-brutal-border"
            ><Trash2 className="w-4 h-4" /></button>
          </div>
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
