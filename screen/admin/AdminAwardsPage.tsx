import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PortfolioContent } from '../../services/portfolioService';
import { Award } from '../../types';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminAwardsPage: React.FC = () => {
  const { editedContent, setEditedContent, handleFileUpload } = useOutletContext<ContextType>();

  const updateAward = (idx: number, updates: Partial<Award>) => {
    const newAwards = [...editedContent.awards];
    newAwards[idx] = { ...newAwards[idx], ...updates };
    setEditedContent({ ...editedContent, awards: newAwards });
  };

  return (
    <div className="space-y-8">
      <button 
        onClick={() => {
          const newItem: Award = { 
            id: Date.now().toString(), 
            title: 'New Award', 
            date: '2024', 
            media: [] 
          };
          setEditedContent({ ...editedContent, awards: [newItem, ...editedContent.awards] });
        }}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add Award
      </button>
      
      {editedContent.awards.map((award, idx) => (
        <div key={award.id} className="p-6 bg-white neo-brutal-border space-y-4 relative">
          <button 
            onClick={() => {
              const newAwards = [...editedContent.awards];
              newAwards.splice(idx, 1);
              setEditedContent({ ...editedContent, awards: newAwards });
            }}
            className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Award Title</label>
              <input 
                type="text" 
                value={award.title}
                onChange={(e) => updateAward(idx, { title: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Date</label>
              <input 
                type="text" 
                value={award.date}
                onChange={(e) => updateAward(idx, { date: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
          </div>
          
          {/* Media Section */}
          <div className="mt-6 pt-6 border-t-2 border-ink-black/5 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase text-ink-black/40">Attached Media</label>
              <button 
                onClick={() => {
                  const newMedia = [...(award.media || [])];
                  newMedia.push({ type: 'image', url: '', title: '', description: '' });
                  updateAward(idx, { media: newMedia });
                }}
                className="text-[10px] font-bold uppercase text-action-blue"
              >+ Add Media</button>
            </div>
            
            <div className="space-y-4">
              {award.media?.map((m, mIdx) => (
                <div key={mIdx} className="p-4 bg-bg-primary rounded-xl space-y-3 relative neo-brutal-border border-ink-black/10">
                  <button 
                    onClick={() => {
                      const newMedia = [...(award.media || [])];
                      newMedia.splice(mIdx, 1);
                      updateAward(idx, { media: newMedia });
                    }}
                    className="absolute top-2 right-2 text-red-400"
                  ><Trash2 className="w-4 h-4" /></button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-ink-black/30">Title</label>
                      <input 
                        type="text" 
                        placeholder="Title" 
                        value={m.title}
                        onChange={(e) => {
                          const newMedia = [...(award.media || [])];
                          newMedia[mIdx].title = e.target.value;
                          updateAward(idx, { media: newMedia });
                        }}
                        className="w-full p-2 bg-white neo-brutal-border text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-ink-black/30">Type</label>
                      <select 
                        value={m.type}
                        onChange={(e) => {
                          const newMedia = [...(award.media || [])];
                          newMedia[mIdx].type = e.target.value as any;
                          updateAward(idx, { media: newMedia });
                        }}
                        className="w-full p-2 bg-white neo-brutal-border text-xs font-bold"
                      >
                        <option value="image">Image</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-ink-black/30">Description</label>
                    <input 
                      type="text" 
                      placeholder="Description" 
                      value={m.description || ''}
                      onChange={(e) => {
                        const newMedia = [...(award.media || [])];
                        newMedia[mIdx].description = e.target.value;
                        updateAward(idx, { media: newMedia });
                      }}
                      className="w-full p-2 bg-white neo-brutal-border text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-ink-black/30">URL / Upload</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="URL" 
                        value={m.url}
                        onChange={(e) => {
                          const newMedia = [...(award.media || [])];
                          newMedia[mIdx].url = e.target.value;
                          updateAward(idx, { media: newMedia });
                        }}
                        className="flex-1 p-2 bg-white neo-brutal-border text-xs"
                      />
                      <label className="cursor-pointer bg-white p-2 neo-brutal-border">
                        <Upload className="w-4 h-4" />
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'award', (url) => {
                            const newMedia = [...(award.media || [])];
                            newMedia[mIdx].url = url;
                            updateAward(idx, { media: newMedia });
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAwardsPage;
