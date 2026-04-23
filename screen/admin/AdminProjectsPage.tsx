import React from 'react';
import { Plus, Trash2, Upload, ExternalLink, Github } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PortfolioContent } from '../../services/portfolioService';
import { Project } from '../../types';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminProjectsPage: React.FC = () => {
  const { editedContent, setEditedContent, handleFileUpload } = useOutletContext<ContextType>();

  const updateProject = (idx: number, updates: Partial<Project>) => {
    const newProjects = [...editedContent.projects];
    newProjects[idx] = { ...newProjects[idx], ...updates };
    setEditedContent({ ...editedContent, projects: newProjects });
  };

  return (
    <div className="space-y-8">
      <button 
        onClick={() => {
          const newProject: Project = { 
            id: Date.now().toString(), 
            title: 'New Project', 
            category: 'Web', 
            date: new Date().getFullYear().toString(), 
            image: '', 
            description: '',
            liveUrl: '',
            codeUrl: '',
            media: []
          };
          setEditedContent({ ...editedContent, projects: [newProject, ...editedContent.projects] });
        }}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add Project
      </button>
      
      {editedContent.projects.map((project, idx) => (
        <div key={project.id} className="p-6 bg-white neo-brutal-border space-y-4 relative">
          <button 
            onClick={() => {
              const newProjects = [...editedContent.projects];
              newProjects.splice(idx, 1);
              setEditedContent({ ...editedContent, projects: newProjects });
            }}
            className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Project Title</label>
              <input 
                type="text" 
                value={project.title}
                onChange={(e) => updateProject(idx, { title: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Year</label>
              <input 
                type="text" 
                value={project.date}
                onChange={(e) => updateProject(idx, { date: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold text-center"
                placeholder="2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Category</label>
              <input 
                type="text" 
                value={project.category}
                onChange={(e) => updateProject(idx, { category: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Main Thumbnail URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={project.image}
                  onChange={(e) => updateProject(idx, { image: e.target.value })}
                  className="flex-1 p-2 border-b-2 border-ink-black"
                />
                <label className="cursor-pointer bg-bg-primary p-2 neo-brutal-border">
                  <Upload className="w-4 h-4" />
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'projects', (url) => {
                      updateProject(idx, { image: url });
                    })}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Live Demo URL (Optional)
              </label>
              <input 
                type="text" 
                value={project.liveUrl || ''}
                onChange={(e) => updateProject(idx, { liveUrl: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40 flex items-center gap-1">
                <Github className="w-3 h-3" /> Source Code URL (Optional)
              </label>
              <input 
                type="text" 
                value={project.codeUrl || ''}
                onChange={(e) => updateProject(idx, { codeUrl: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-ink-black/40">Description</label>
            <textarea 
              value={project.description}
              onChange={(e) => updateProject(idx, { description: e.target.value })}
              className="w-full p-2 border-2 border-ink-black h-24"
            />
          </div>

          {/* Media Section */}
          <div className="mt-6 pt-6 border-t-2 border-ink-black/5 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase text-ink-black/40">Project Media (Screenshots/Videos)</label>
              <button 
                onClick={() => {
                  const newMedia = [...(project.media || [])];
                  newMedia.push({ type: 'image', url: '', title: '', description: '' });
                  updateProject(idx, { media: newMedia });
                }}
                className="text-[10px] font-bold uppercase text-action-blue hover:underline"
              >+ Add Media</button>
            </div>
            
            <div className="space-y-4">
              {project.media?.map((m, mIdx) => (
                <div key={mIdx} className="p-4 bg-bg-primary rounded-xl space-y-3 relative neo-brutal-border border-ink-black/10">
                  <button 
                    onClick={() => {
                      const newMedia = [...(project.media || [])];
                      newMedia.splice(mIdx, 1);
                      updateProject(idx, { media: newMedia });
                    }}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                  ><Trash2 className="w-4 h-4" /></button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-ink-black/30">Media Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Dashboard Screenshot" 
                        value={m.title}
                        onChange={(e) => {
                          const newMedia = [...(project.media || [])];
                          newMedia[mIdx].title = e.target.value;
                          updateProject(idx, { media: newMedia });
                        }}
                        className="w-full p-2 bg-white neo-brutal-border text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-ink-black/30">Type</label>
                      <select 
                        value={m.type}
                        onChange={(e) => {
                          const newMedia = [...(project.media || [])];
                          newMedia[mIdx].type = e.target.value as any;
                          updateProject(idx, { media: newMedia });
                        }}
                        className="w-full p-2 bg-white neo-brutal-border text-xs font-bold"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-ink-black/30">Description</label>
                    <input 
                      type="text" 
                      placeholder="Briefly describe this media..." 
                      value={m.description || ''}
                      onChange={(e) => {
                        const newMedia = [...(project.media || [])];
                        newMedia[mIdx].description = e.target.value;
                        updateProject(idx, { media: newMedia });
                      }}
                      className="w-full p-2 bg-white neo-brutal-border text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-ink-black/30">Media URL / Upload</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="URL" 
                        value={m.url}
                        onChange={(e) => {
                          const newMedia = [...(project.media || [])];
                          newMedia[mIdx].url = e.target.value;
                          updateProject(idx, { media: newMedia });
                        }}
                        className="flex-1 p-2 bg-white neo-brutal-border text-xs"
                      />
                      <label className="cursor-pointer bg-white p-2 neo-brutal-border hover:bg-action-blue/10 transition-colors">
                        <Upload className="w-4 h-4" />
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'project_media', (url) => {
                            const newMedia = [...(project.media || [])];
                            newMedia[mIdx].url = url;
                            updateProject(idx, { media: newMedia });
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

export default AdminProjectsPage;
