import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
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

  return (
    <div className="space-y-8">
      <button 
        onClick={() => {
          const newProject: Project = { id: Date.now().toString(), title: 'New Project', category: 'Web', date: '2024', image: '', description: '' };
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Project Title</label>
              <input 
                type="text" 
                value={project.title}
                onChange={(e) => {
                  const newProjects = [...editedContent.projects];
                  newProjects[idx].title = e.target.value;
                  setEditedContent({ ...editedContent, projects: newProjects });
                }}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Category</label>
              <input 
                type="text" 
                value={project.category}
                onChange={(e) => {
                  const newProjects = [...editedContent.projects];
                  newProjects[idx].category = e.target.value;
                  setEditedContent({ ...editedContent, projects: newProjects });
                }}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-ink-black/40">Main Image URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={project.image}
                onChange={(e) => {
                  const newProjects = [...editedContent.projects];
                  newProjects[idx].image = e.target.value;
                  setEditedContent({ ...editedContent, projects: newProjects });
                }}
                className="flex-1 p-2 border-b-2 border-ink-black"
              />
              <label className="cursor-pointer bg-bg-primary p-2 neo-brutal-border">
                <Upload className="w-4 h-4" />
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'projects', (url) => {
                    const newProjects = [...editedContent.projects];
                    newProjects[idx].image = url;
                    setEditedContent({ ...editedContent, projects: newProjects });
                  })}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-ink-black/40">Description</label>
            <textarea 
              value={project.description}
              onChange={(e) => {
                const newProjects = [...editedContent.projects];
                newProjects[idx].description = e.target.value;
                setEditedContent({ ...editedContent, projects: newProjects });
              }}
              className="w-full p-2 border-2 border-ink-black h-24"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProjectsPage;
