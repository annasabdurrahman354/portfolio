import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PortfolioContent } from '../../services/portfolioService';
import { Experience } from '../../types';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminExperiencePage: React.FC = () => {
  const { editedContent, setEditedContent, handleFileUpload } = useOutletContext<ContextType>();

  const updateExperience = (idx: number, updates: Partial<Experience>) => {
    const newExperiences = [...editedContent.experiences];
    newExperiences[idx] = { ...newExperiences[idx], ...updates };
    setEditedContent({ ...editedContent, experiences: newExperiences });
  };

  return (
    <div className="space-y-8">
      <button 
        onClick={() => {
          const newItem: Experience = { 
            id: Date.now().toString(), 
            company: 'New Company', 
            role: 'Software Engineer', 
            period: '2024 - Present', 
            location: 'Remote', 
            description: [], 
            media: [] 
          };
          setEditedContent({ ...editedContent, experiences: [newItem, ...editedContent.experiences] });
        }}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add Experience
      </button>
      
      {editedContent.experiences.map((exp, idx) => (
        <div key={exp.id} className="p-6 bg-white neo-brutal-border space-y-4 relative">
          <button 
            onClick={() => {
              const newExperiences = [...editedContent.experiences];
              newExperiences.splice(idx, 1);
              setEditedContent({ ...editedContent, experiences: newExperiences });
            }}
            className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Company</label>
              <input 
                type="text" 
                value={exp.company}
                onChange={(e) => updateExperience(idx, { company: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Role</label>
              <input 
                type="text" 
                value={exp.role}
                onChange={(e) => updateExperience(idx, { role: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Period</label>
              <input 
                type="text" 
                value={exp.period}
                onChange={(e) => updateExperience(idx, { period: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Location</label>
              <input 
                type="text" 
                value={exp.location}
                onChange={(e) => updateExperience(idx, { location: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-ink-black/40">Key Contributions</label>
            <div className="space-y-2">
              {exp.description.map((li, lIdx) => (
                <div key={lIdx} className="flex gap-2">
                  <input 
                    type="text" 
                    value={li}
                    onChange={(e) => {
                      const newDesc = [...exp.description];
                      newDesc[lIdx] = e.target.value;
                      updateExperience(idx, { description: newDesc });
                    }}
                    className="flex-1 p-2 border-b border-ink-black/20"
                  />
                  <button onClick={() => {
                    const newDesc = [...exp.description];
                    newDesc.splice(lIdx, 1);
                    updateExperience(idx, { description: newDesc });
                  }}><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              ))}
              <button 
                onClick={() => {
                  const newDesc = [...exp.description, ''];
                  updateExperience(idx, { description: newDesc });
                }}
                className="text-[10px] font-bold uppercase text-action-blue"
              >+ Add Bullet Point</button>
            </div>
          </div>

          {/* Media Section */}
          <div className="mt-6 pt-6 border-t-2 border-ink-black/5 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase text-ink-black/40">Experience Media</label>
              <button 
                onClick={() => {
                  const newMedia = [...(exp.media || [])];
                  newMedia.push({ type: 'image', url: '', title: '', description: '' });
                  updateExperience(idx, { media: newMedia });
                }}
                className="text-[10px] font-bold uppercase text-action-blue"
              >+ Add Media</button>
            </div>
            
            <div className="space-y-4">
              {exp.media?.map((m, mIdx) => (
                <div key={mIdx} className="p-4 bg-bg-primary rounded-xl space-y-3 relative neo-brutal-border border-ink-black/10">
                  <button 
                    onClick={() => {
                      const newMedia = [...(exp.media || [])];
                      newMedia.splice(mIdx, 1);
                      updateExperience(idx, { media: newMedia });
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
                          const newMedia = [...(exp.media || [])];
                          newMedia[mIdx].title = e.target.value;
                          updateExperience(idx, { media: newMedia });
                        }}
                        className="w-full p-2 bg-white neo-brutal-border text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-ink-black/30">Type</label>
                      <select 
                        value={m.type}
                        onChange={(e) => {
                          const newMedia = [...(exp.media || [])];
                          newMedia[mIdx].type = e.target.value as any;
                          updateExperience(idx, { media: newMedia });
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
                        const newMedia = [...(exp.media || [])];
                        newMedia[mIdx].description = e.target.value;
                        updateExperience(idx, { media: newMedia });
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
                          const newMedia = [...(exp.media || [])];
                          newMedia[mIdx].url = e.target.value;
                          updateExperience(idx, { media: newMedia });
                        }}
                        className="flex-1 p-2 bg-white neo-brutal-border text-xs"
                      />
                      <label className="cursor-pointer bg-white p-2 neo-brutal-border">
                        <Upload className="w-4 h-4" />
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'experience', (url) => {
                            const newMedia = [...(exp.media || [])];
                            newMedia[mIdx].url = url;
                            updateExperience(idx, { media: newMedia });
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

export default AdminExperiencePage;
