import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Upload, Loader2, ChevronDown, ChevronUp, Image as ImageIcon, FileText, Smartphone } from 'lucide-react';
import { PortfolioContent, updatePortfolioContent, uploadMedia } from '../services/portfolioService';
import { Project, Experience, Education, Certification, Award, Skill, Language } from '../types';

interface AdminDashboardProps {
  content: PortfolioContent;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'experience' | 'education' | 'certifications' | 'awards' | 'skills' | 'languages'>('hero');
  const [editedContent, setEditedContent] = useState<PortfolioContent>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePortfolioContent(editedContent);
      alert('Content saved successfully!');
    } catch (error) {
      alert('Failed to save content.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (file: File, path: string, callback: (url: string) => void) => {
    setUploading(path);
    try {
      const url = await uploadMedia(file, `portfolio/${path}/${Date.now()}_${file.name}`);
      callback(url);
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const renderHeroTab = () => (
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
    </div>
  );

  const renderProjectsTab = () => (
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

  // Helper for generic list items (Experience, Education, Certs, Awards)
  const renderListTab = (
    items: any[], 
    setItems: (newItems: any[]) => void, 
    fields: { key: string, label: string, type: 'text' | 'textarea' | 'list' }[],
    newItemTemplate: any,
    sectionName: string
  ) => (
    <div className="space-y-8">
      <button 
        onClick={() => setItems([newItemTemplate, ...items])}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add {sectionName}
      </button>
      
      {items.map((item, idx) => (
        <div key={item.id || idx} className="p-6 bg-white neo-brutal-border space-y-4 relative">
          <button 
            onClick={() => {
              const newItems = [...items];
              newItems.splice(idx, 1);
              setItems(newItems);
            }}
            className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.key} className={`space-y-2 ${field.type === 'textarea' || field.type === 'list' ? 'md:col-span-2' : ''}`}>
                <label className="text-[10px] font-bold uppercase text-ink-black/40">{field.label}</label>
                {field.type === 'text' && (
                  <input 
                    type="text" 
                    value={item[field.key]}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx][field.key] = e.target.value;
                      setItems(newItems);
                    }}
                    className="w-full p-2 border-b-2 border-ink-black font-bold"
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea 
                    value={item[field.key]}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx][field.key] = e.target.value;
                      setItems(newItems);
                    }}
                    className="w-full p-2 border-2 border-ink-black h-24"
                  />
                )}
                {field.type === 'list' && (
                  <div className="space-y-2">
                    {item[field.key].map((li: string, lIdx: number) => (
                      <div key={lIdx} className="flex gap-2">
                        <input 
                          type="text" 
                          value={li}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[idx][field.key][lIdx] = e.target.value;
                            setItems(newItems);
                          }}
                          className="flex-1 p-2 border-b border-ink-black/20"
                        />
                        <button onClick={() => {
                          const newItems = [...items];
                          newItems[idx][field.key].splice(lIdx, 1);
                          setItems(newItems);
                        }}><Trash2 className="w-4 h-4 text-red-400" /></button>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newItems = [...items];
                        newItems[idx][field.key].push('');
                        setItems(newItems);
                      }}
                      className="text-[10px] font-bold uppercase text-action-blue"
                    >+ Add Bullet Point</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Media Section for Experience, Certs, Awards */}
          {('media' in item) && (
            <div className="mt-6 pt-6 border-t-2 border-ink-black/5 space-y-4">
              <label className="text-xs font-bold uppercase text-ink-black/40">Attached Media</label>
              <div className="space-y-4">
                {item.media?.map((m: any, mIdx: number) => (
                  <div key={mIdx} className="p-4 bg-bg-primary rounded-xl space-y-3 relative">
                    <button 
                      onClick={() => {
                        const newItems = [...items];
                        newItems[idx].media.splice(mIdx, 1);
                        setItems(newItems);
                      }}
                      className="absolute top-2 right-2 text-red-400"
                    ><Trash2 className="w-4 h-4" /></button>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Title" 
                        value={m.title}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].media[mIdx].title = e.target.value;
                          setItems(newItems);
                        }}
                        className="p-2 bg-white neo-brutal-border text-xs font-bold"
                      />
                      <select 
                        value={m.type}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].media[mIdx].type = e.target.value;
                          setItems(newItems);
                        }}
                        className="p-2 bg-white neo-brutal-border text-xs font-bold"
                      >
                        <option value="image">Image</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="URL" 
                        value={m.url}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].media[mIdx].url = e.target.value;
                          setItems(newItems);
                        }}
                        className="flex-1 p-2 bg-white neo-brutal-border text-xs"
                      />
                      <label className="cursor-pointer bg-white p-2 neo-brutal-border">
                        <Upload className="w-4 h-4" />
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], sectionName, (url) => {
                            const newItems = [...items];
                            newItems[idx].media[mIdx].url = url;
                            setItems(newItems);
                          })}
                        />
                      </label>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const newItems = [...items];
                    if (!newItems[idx].media) newItems[idx].media = [];
                    newItems[idx].media.push({ type: 'image', url: '', title: '', description: '' });
                    setItems(newItems);
                  }}
                  className="text-[10px] font-bold uppercase text-action-blue"
                >+ Add Media Item</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-bg-primary flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-white border-b-4 border-ink-black p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-sticker-yellow p-2 neo-brutal-border rotate-3">
            <Smartphone className="w-6 h-6 text-ink-black" />
          </div>
          <h1 className="text-2xl font-heading font-bold uppercase tracking-tighter">Content Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-pop-purple px-6 py-2 neo-brutal-border font-bold uppercase text-sm hover:translate-x-1 hover:-translate-y-1 transition-transform"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-ink-black/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r-4 border-ink-black overflow-y-auto p-4 space-y-2">
          {[
            { id: 'hero', label: 'Hero & About' },
            { id: 'projects', label: 'Projects' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'certifications', label: 'Certifications' },
            { id: 'awards', label: 'Awards' },
            { id: 'skills', label: 'Skills' },
            { id: 'languages', label: 'Languages' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left p-3 font-bold uppercase text-xs tracking-widest transition-all ${activeTab === tab.id ? 'bg-ink-black text-white translate-x-2' : 'hover:bg-ink-black/5'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-bg-primary">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'hero' && renderHeroTab()}
            {activeTab === 'projects' && renderProjectsTab()}
            {activeTab === 'experience' && renderListTab(
              editedContent.experiences, 
              (items) => setEditedContent({ ...editedContent, experiences: items }),
              [
                { key: 'company', label: 'Company', type: 'text' },
                { key: 'role', label: 'Role', type: 'text' },
                { key: 'period', label: 'Period', type: 'text' },
                { key: 'location', label: 'Location', type: 'text' },
                { key: 'description', label: 'Key Contributions', type: 'list' },
              ],
              { id: Date.now().toString(), company: '', role: '', period: '', location: '', description: [], media: [] },
              'Experience'
            )}
            {activeTab === 'education' && renderListTab(
              editedContent.education,
              (items) => setEditedContent({ ...editedContent, education: items }),
              [
                { key: 'institution', label: 'Institution', type: 'text' },
                { key: 'degree', label: 'Degree', type: 'text' },
                { key: 'period', label: 'Period', type: 'text' },
                { key: 'description', label: 'Description', type: 'list' },
              ],
              { id: Date.now().toString(), institution: '', degree: '', period: '', description: [] },
              'Education'
            )}
            {activeTab === 'certifications' && renderListTab(
              editedContent.certifications,
              (items) => setEditedContent({ ...editedContent, certifications: items }),
              [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'issuer', label: 'Issuer', type: 'text' },
                { key: 'date', label: 'Date', type: 'text' },
              ],
              { id: Date.now().toString(), title: '', issuer: '', date: '', media: [] },
              'Certification'
            )}
            {activeTab === 'awards' && renderListTab(
              editedContent.awards,
              (items) => setEditedContent({ ...editedContent, awards: items }),
              [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'date', label: 'Date', type: 'text' },
              ],
              { id: Date.now().toString(), title: '', date: '', media: [] },
              'Award'
            )}
            {activeTab === 'skills' && (
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
            )}
            {activeTab === 'languages' && (
              <div className="space-y-8">
                <button 
                  onClick={() => setEditedContent({ ...editedContent, languages: [{ name: 'New Language', proficiency: 'Fluent' }, ...editedContent.languages] })}
                  className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
                >
                  <Plus className="w-4 h-4" /> Add Language
                </button>
                {editedContent.languages.map((lang, idx) => (
                  <div key={idx} className="p-6 bg-white neo-brutal-border grid grid-cols-2 gap-4">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
