import React from 'react';
import { PortfolioContent } from '../../services/portfolioService';
import { useOutletContext } from 'react-router-dom';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminConfigPage: React.FC = () => {
  const { editedContent, setEditedContent } = useOutletContext<ContextType>();

  const config = editedContent.config || { adminPassword: 'annas3120', chatSecretWord: 'open admin' };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-ink-black/40">Chat Secret Word</label>
        <p className="text-xs text-ink-black/60 mb-2">The secret message you can type in the chat to prompt the admin login modal.</p>
        <input 
          type="text" 
          value={config.chatSecretWord || ''}
          onChange={(e) => setEditedContent({ 
            ...editedContent, 
            config: { ...config, chatSecretWord: e.target.value } 
          })}
          className="w-full p-3 neo-brutal-border bg-white font-bold"
        />
      </div>
    </div>
  );
};

export default AdminConfigPage;
