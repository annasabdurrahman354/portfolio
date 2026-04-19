import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
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

  return (
    <div className="w-64 bg-white border-r-4 border-ink-black overflow-y-auto p-4 space-y-2">
      {tabs.map(tab => (
        <NavLink
          key={tab.id}
          to={`/admin/${tab.id}`}
          className={({ isActive }) => 
            `block w-full text-left p-3 font-bold uppercase text-xs tracking-widest transition-all ${isActive ? 'bg-ink-black text-white translate-x-2' : 'hover:bg-ink-black/5'}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSidebar;
