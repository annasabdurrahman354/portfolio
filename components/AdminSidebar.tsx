import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const tabs = [
    { id: 'hero', label: 'Hero & About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'awards', label: 'Awards' },
    { id: 'skills', label: 'Skills' },
    { id: 'languages', label: 'Languages' },
  ];

  const navContent = (
    <>
      {tabs.map(tab => (
        <NavLink
          key={tab.id}
          to={`/admin/${tab.id}`}
          onClick={onClose}
          className={({ isActive }) =>
            `block w-full text-left p-3 font-bold uppercase text-xs tracking-widest transition-all ${isActive ? 'bg-ink-black text-white translate-x-2' : 'hover:bg-ink-black/5'}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on md+ */}
      <div className="hidden md:flex w-64 bg-white border-r-4 border-ink-black overflow-y-auto p-4 flex-col space-y-2">
        {navContent}
      </div>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] bg-ink-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className={`fixed inset-y-0 left-0 z-[210] w-72 bg-white border-r-4 border-ink-black overflow-y-auto flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-ink-black">
          <span className="font-heading font-bold uppercase tracking-tighter text-sm">Navigation</span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-ink-black/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-2 flex-1">
          {navContent}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
