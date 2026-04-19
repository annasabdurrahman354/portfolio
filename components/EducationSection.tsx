import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../types';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <motion.section
      id="education"
      className="relative z-10 py-20 md:py-32 bg-white border-y-4 border-ink-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/3">
            <div className="bg-sticker-yellow p-8 neo-brutal-border rotate-3 sticker-effect">
              <h2 className="text-4xl font-heading font-bold mb-4 uppercase">Education</h2>
              <div className="w-12 h-1 bg-ink-black mb-4" />
              <p className="font-bold text-sm uppercase tracking-widest">Academic Foundation</p>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-8 border-l-4 border-action-blue">
                <div className="absolute -left-3 top-0 w-5 h-5 bg-action-blue rounded-full neo-brutal-border" />
                <h3 className="text-2xl font-heading font-bold">{edu.institution}</h3>
                <p className="text-action-blue font-bold mb-2">{edu.degree}</p>
                <p className="text-ink-black/50 font-bold text-sm mb-4">{edu.period}</p>
                {edu.description && (
                  <ul className="space-y-2">
                    {edu.description.map((item, idx) => (
                      <li key={idx} className="text-sm font-medium text-ink-black/70 italic">
                        "{item}"
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default EducationSection;
