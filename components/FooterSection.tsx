import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="relative z-10 py-16 bg-ink-black text-bg-primary">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
           <div className="font-heading text-3xl font-bold tracking-tight mb-2 uppercase">ANNAS.DEV</div>
           <p className="font-accent text-lg opacity-60">Fullstack Software Developer</p>
        </div>

        <div className="flex gap-8">
          <a href="https://github.com/annasabdurrahman354" target="_blank" rel="noopener noreferrer" className="font-bold uppercase text-xs tracking-widest hover:text-action-blue hover:scale-110 hover:underline transition-all duration-300">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/annas-abdurrahman-09b16a22a" target="_blank" rel="noopener noreferrer" className="font-bold uppercase text-xs tracking-widest hover:text-action-blue hover:scale-110 hover:underline transition-all duration-300">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
