import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PortfolioContent } from '../../services/portfolioService';

interface ContextType {
  editedContent: PortfolioContent;
  setEditedContent: (content: PortfolioContent) => void;
  handleFileUpload: (file: File, path: string, callback: (url: string) => void) => void;
}

interface AdminListPageProps {
  sectionKey: keyof PortfolioContent;
  fields: { key: string, label: string, type: 'text' | 'textarea' | 'list' }[];
  newItemTemplate: any;
  sectionName: string;
}

const AdminListPage: React.FC<AdminListPageProps> = ({ sectionKey, fields, newItemTemplate, sectionName }) => {
  const { editedContent, setEditedContent, handleFileUpload } = useOutletContext<ContextType>();
  
  // Need to explicitly cast as any[] for generic operations.
  const items = editedContent[sectionKey] as any[];

  const setItems = (newItems: any[]) => {
    setEditedContent({ ...editedContent, [sectionKey]: newItems });
  };

  return (
    <div className="space-y-8">
      <button 
        onClick={() => setItems([newItemTemplate, ...items])}
        className="flex items-center gap-2 bg-action-blue px-4 py-2 neo-brutal-border font-bold uppercase text-xs"
      >
        <Plus className="w-4 h-4" /> Add {sectionName}
      </button>
      
      {items.map((item: any, idx: number) => (
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
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], sectionName.toLowerCase(), (url) => {
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
};

export default AdminListPage;
