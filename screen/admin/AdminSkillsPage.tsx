import React from 'react';
import { Plus, X, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PortfolioContent } from '../../services/portfolioService';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

const AdminSkillsPage: React.FC = () => {
  const { editedContent, setEditedContent } = useOutletContext<ContextType>();

  return (
    <div className="space-y-8">
      <button 
        onClick={() => setEditedContent({ ...editedContent, skills: [{ category: 'New Category', items: [] }, ...editedContent.skills] })}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add Skill Category
      </button>
      {editedContent.skills.map((skill, idx) => (
        <div key={idx} className="p-6 bg-white neo-brutal-border space-y-4 relative group pr-32">
          <div className="absolute right-4 top-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                if (idx > 0) {
                  const newSkills = [...editedContent.skills];
                  [newSkills[idx - 1], newSkills[idx]] = [newSkills[idx], newSkills[idx - 1]];
                  setEditedContent({ ...editedContent, skills: newSkills });
                }
              }}
              disabled={idx === 0}
              className="p-1 hover:bg-gray-100 disabled:opacity-30 bg-white neo-brutal-border"
            ><ArrowUp className="w-4 h-4" /></button>
            <button 
              onClick={() => {
                if (idx < editedContent.skills.length - 1) {
                  const newSkills = [...editedContent.skills];
                  [newSkills[idx], newSkills[idx + 1]] = [newSkills[idx + 1], newSkills[idx]];
                  setEditedContent({ ...editedContent, skills: newSkills });
                }
              }}
              disabled={idx === editedContent.skills.length - 1}
              className="p-1 hover:bg-gray-100 disabled:opacity-30 bg-white neo-brutal-border"
            ><ArrowDown className="w-4 h-4" /></button>
            <button 
              onClick={() => {
                const newSkills = editedContent.skills.filter((_, i) => i !== idx);
                setEditedContent({ ...editedContent, skills: newSkills });
              }}
              className="p-1 text-red-500 hover:bg-red-50 bg-white neo-brutal-border"
            ><Trash2 className="w-4 h-4" /></button>
          </div>
          <input 
            type="text" 
            value={skill.category}
            onChange={(e) => {
              const newSkills = [...editedContent.skills];
              newSkills[idx].category = e.target.value;
              setEditedContent({ ...editedContent, skills: newSkills });
            }}
            className="w-full p-2 border-b-2 border-ink-black font-bold text-xl"
          />
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, sIdx) => (
              <div key={sIdx} className="flex items-center gap-2 bg-bg-primary px-3 py-1 neo-brutal-border">
                <input 
                  type="text" 
                  value={item}
                  onChange={(e) => {
                    const newSkills = [...editedContent.skills];
                    newSkills[idx].items[sIdx] = e.target.value;
                    setEditedContent({ ...editedContent, skills: newSkills });
                  }}
                  className="bg-transparent text-xs font-bold w-24"
                />
                <button onClick={() => {
                  const newSkills = [...editedContent.skills];
                  newSkills[idx].items.splice(sIdx, 1);
                  setEditedContent({ ...editedContent, skills: newSkills });
                }}><X className="w-3 h-3" /></button>
              </div>
            ))}
            <button 
              onClick={() => {
                const newSkills = [...editedContent.skills];
                newSkills[idx].items.push('New Skill');
                setEditedContent({ ...editedContent, skills: newSkills });
              }}
              className="px-3 py-1 border-2 border-dashed border-ink-black/20 text-xs font-bold"
            >+ Add</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSkillsPage;
