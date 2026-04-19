import React from 'react';
import { Plus, X } from 'lucide-react';
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
        <div key={idx} className="p-6 bg-white neo-brutal-border space-y-4">
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
