import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PortfolioContent } from '../../services/portfolioService';
import { Education } from '../../types';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
}

const AdminEducationPage: React.FC = () => {
  const { editedContent, setEditedContent } = useOutletContext<ContextType>();

  const updateEducation = (idx: number, updates: Partial<Education>) => {
    const newEducation = [...editedContent.education];
    newEducation[idx] = { ...newEducation[idx], ...updates };
    setEditedContent({ ...editedContent, education: newEducation });
  };

  return (
    <div className="space-y-8">
      <button 
        onClick={() => {
          const newItem: Education = { 
            id: Date.now().toString(), 
            institution: 'New Institution', 
            degree: 'Bachelor Degree', 
            period: '2020 - 2024', 
            description: [] 
          };
          setEditedContent({ ...editedContent, education: [newItem, ...editedContent.education] });
        }}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add Education
      </button>
      
      {editedContent.education.map((edu, idx) => (
        <div key={edu.id} className="p-6 bg-white neo-brutal-border space-y-4 relative">
          <button 
            onClick={() => {
              const newEducation = [...editedContent.education];
              newEducation.splice(idx, 1);
              setEditedContent({ ...editedContent, education: newEducation });
            }}
            className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Institution</label>
              <input 
                type="text" 
                value={edu.institution}
                onChange={(e) => updateEducation(idx, { institution: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Degree</label>
              <input 
                type="text" 
                value={edu.degree}
                onChange={(e) => updateEducation(idx, { degree: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold uppercase text-ink-black/40">Period</label>
              <input 
                type="text" 
                value={edu.period}
                onChange={(e) => updateEducation(idx, { period: e.target.value })}
                className="w-full p-2 border-b-2 border-ink-black font-bold"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-ink-black/40">Description</label>
            <div className="space-y-2">
              {(edu.description || []).map((li, lIdx) => (
                <div key={lIdx} className="flex gap-2">
                  <input 
                    type="text" 
                    value={li}
                    onChange={(e) => {
                      const newDesc = [...(edu.description || [])];
                      newDesc[lIdx] = e.target.value;
                      updateEducation(idx, { description: newDesc });
                    }}
                    className="flex-1 p-2 border-b border-ink-black/20"
                  />
                  <button onClick={() => {
                    const newDesc = [...(edu.description || [])];
                    newDesc.splice(lIdx, 1);
                    updateEducation(idx, { description: newDesc });
                  }}><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              ))}
              <button 
                onClick={() => {
                  const newDesc = [...(edu.description || []), ''];
                  updateEducation(idx, { description: newDesc });
                }}
                className="text-[10px] font-bold uppercase text-action-blue"
              >+ Add Bullet Point</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminEducationPage;
