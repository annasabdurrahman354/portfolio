import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';

interface SkillSectionProps {
  skills: Skill[];
}

const SkillSection: React.FC<SkillSectionProps> = ({ skills }) => {
  return (
    <motion.section
      id="skills"
      className="relative z-10 py-20 md:py-32 bg-[#FDFCF8]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-ink-black mb-4">
            Technical <span className="text-pop-purple">Arsenal</span>
          </h2>
          <div className="h-2 w-24 bg-pop-purple mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border-2 border-ink-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="text-xl font-heading font-bold mb-6 pb-2 border-b-2 border-ink-black/10 text-action-blue">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-bg-primary rounded-lg border border-ink-black/10 text-xs font-bold uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillSection;
