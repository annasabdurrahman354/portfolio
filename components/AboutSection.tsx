import React from 'react';
import { Globe, Smartphone, Zap } from 'lucide-react';

interface AboutSectionProps {
  aboutText: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutText }) => {
  return (
    <section id="about" className="relative z-10 py-20 md:py-32 px-6 bg-white border-y-4 border-ink-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-pop-purple px-8 py-2 neo-brutal-border rotate-1 sticker-effect mb-12">
          <h2 className="text-3xl font-heading font-bold text-ink-black uppercase">About Me</h2>
        </div>
        <p className="text-xl md:text-3xl font-heading font-medium text-ink-black leading-relaxed mb-12">
          "{aboutText}"
        </p>
        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-action-blue rounded-full neo-brutal-border sticker-effect flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-ink-black" />
            </div>
            <span className="font-bold text-sm uppercase">Fullstack</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-sticker-yellow rounded-full neo-brutal-border sticker-effect flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 text-ink-black" />
            </div>
            <span className="font-bold text-sm uppercase">Mobile</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blush-pink rounded-full neo-brutal-border sticker-effect flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-ink-black" />
            </div>
            <span className="font-bold text-sm uppercase">Agile</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
