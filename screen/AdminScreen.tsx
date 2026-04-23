import React, { useState } from 'react';
import { Loader2, Menu, Save, Smartphone, X } from 'lucide-react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PortfolioContent, updatePortfolioContent, uploadMedia } from '../services/portfolioService';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeroPage from './admin/AdminHeroPage';
import AdminProjectsPage from './admin/AdminProjectsPage';
import AdminExperiencePage from './admin/AdminExperiencePage';
import AdminEducationPage from './admin/AdminEducationPage';
import AdminCertificationsPage from './admin/AdminCertificationsPage';
import AdminAwardsPage from './admin/AdminAwardsPage';
import AdminSkillsPage from './admin/AdminSkillsPage';
import AdminLanguagesPage from './admin/AdminLanguagesPage';

interface AdminScreenProps {
  content: PortfolioContent;
  onClose: () => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ content, onClose }) => {
  const [editedContent, setEditedContent] = useState<PortfolioContent>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const outletContext = {
    editedContent,
    setEditedContent,
    handleFileUpload,
  };

  return (
    <div className="fixed inset-0 z-[100] bg-bg-primary flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-white border-b-4 border-ink-black px-4 py-4 md:px-6 md:py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Burger button — mobile only */}
          <button
            className="md:hidden p-2 hover:bg-ink-black/5 rounded transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="bg-sticker-yellow p-2 neo-brutal-border rotate-3 hidden sm:block">
            <Smartphone className="w-6 h-6 text-ink-black" />
          </div>
          <h1 className="text-lg sm:text-2xl font-heading font-bold uppercase tracking-tighter">Content Manager</h1>
          {uploading && (
            <span className="text-xs font-bold text-action-blue flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading {uploading}...
            </span>
          )}
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
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 bg-bg-primary">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Outlet context={outletContext} />}>
                <Route index element={<Navigate to="hero" replace />} />
                <Route path="hero" element={<AdminHeroPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="experience" element={<AdminExperiencePage />} />
                <Route path="education" element={<AdminEducationPage />} />
                <Route path="certifications" element={<AdminCertificationsPage />} />
                <Route path="awards" element={<AdminAwardsPage />} />
                <Route path="skills" element={<AdminSkillsPage />} />
                <Route path="languages" element={<AdminLanguagesPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
