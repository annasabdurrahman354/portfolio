import React from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { PortfolioContent } from '../../services/portfolioService';
import { useOutletContext } from 'react-router-dom';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminHeroPage: React.FC = () => {
  const { editedContent, setEditedContent, handleFileUpload } = useOutletContext<ContextType>();

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
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-ink-black/40 flex items-center gap-1">
          <FileText className="w-3 h-3" /> Resume (PDF)
        </label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs">
            <Upload className="w-4 h-4" />
            Upload Resume
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              className="hidden" 
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'resume', (url) => {
                setEditedContent({ ...editedContent, hero: { ...editedContent.hero, resumeUrl: url } });
              })}
            />
          </label>
          {editedContent.hero.resumeUrl && (
            <div className="flex items-center gap-2">
              <a 
                href={editedContent.hero.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-action-blue underline truncate max-w-xs"
              >
                {editedContent.hero.resumeUrl.split('/').pop()?.split('_').slice(1).join('_') || 'resume.pdf'}
              </a>
              <button 
                onClick={() => setEditedContent({ ...editedContent, hero: { ...editedContent.hero, resumeUrl: undefined } })}
                className="p-1 text-red-500 hover:bg-red-50 bg-white neo-brutal-border"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeroPage;
