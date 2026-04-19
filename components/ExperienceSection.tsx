import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Zap, Code, Smartphone, Terminal, Database, FileText, X } from 'lucide-react';
import { Experience } from '../types';
import GradientText from './GradientText';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -45]);
  
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  return (
    <>
      <motion.section
        id="experience"
        className="relative z-10 py-20 md:py-32 bg-bg-secondary text-bg-primary overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Floating Sticker in Experience */}
        <motion.div
          className="absolute top-20 right-10 w-40 h-40 bg-blush-pink starburst sticker-effect flex items-center justify-center rotate-12 opacity-20"
          style={{ y: yMedium, rotate: rotateReverse }}
        >
          <span className="font-accent text-ink-black text-2xl font-bold">WORK</span>
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-10 w-32 h-32 bg-sticker-yellow rounded-full sticker-effect flex items-center justify-center -rotate-12 opacity-20"
          style={{ y: ySlow, rotate }}
        >
          <span className="font-accent text-ink-black text-xl font-bold">TECH</span>
        </motion.div>

        {/* Decorative Vector Texture */}
        <motion.div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#F7F4EB 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            y: ySlow
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div
              className="lg:col-span-5"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight text-bg-primary">
                Professional <br/> <GradientText text="Journey" className="text-sticker-yellow" />
              </h2>
              <p className="text-lg md:text-xl text-bg-primary/80 mb-12 font-medium leading-relaxed">
                A track record of building robust systems and mentoring the next generation of developers.
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Code />, label: 'Laravel/PHP' },
                  { icon: <Smartphone />, label: 'Android/Kotlin' },
                  { icon: <Terminal />, label: 'React/Vue' },
                  { icon: <Database />, label: 'SQL/NoSQL' },
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                    {tech.icon}
                    <span className="font-bold text-sm uppercase">{tech.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-7 space-y-8"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  className={`bg-white p-8 rounded-[24px] border-2 border-ink-black text-ink-black relative group transition-all ${exp.media ? 'cursor-pointer hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]' : ''}`}
                  whileHover={exp.media ? { x: 10, y: -10 } : { x: 10 }}
                  onClick={() => exp.media && setSelectedExperience(exp)}
                >
                  <div className="absolute -top-4 -left-4 bg-action-blue px-4 py-1 neo-brutal-border -rotate-2 sticker-effect">
                    <span className="font-bold text-xs uppercase">{exp.period}</span>
                  </div>

                  {exp.media && (
                    <div className="absolute -top-4 -right-4 bg-sticker-yellow px-3 py-1 neo-brutal-border rotate-3 sticker-effect flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span className="font-bold text-[10px] uppercase">View Media</span>
                    </div>
                  )}

                  <h3 className="text-2xl font-heading font-bold mb-1">{exp.role}</h3>
                  <p className="text-action-blue font-bold mb-4">{exp.company} ● {exp.location}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-ink-black/70">
                        <span className="text-pop-purple">★</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExperience(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink-black/70 backdrop-blur-lg cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, x: 50 }}
              animate={{ scale: 1, x: 0 }}
              exit={{ scale: 0.9, x: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-white neo-brutal-border flex flex-col md:flex-row shadow-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-6 right-6 z-30 p-2 rounded-full bg-white neo-brutal-border text-ink-black hover:bg-action-blue transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Media Gallery (Scrollable) */}
              <div className="w-full md:w-3/5 p-6 md:p-10 bg-[#F0F0F0] overflow-y-auto border-b-2 md:border-b-0 md:border-r-2 border-ink-black">
                <div className="space-y-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-action-blue p-3 neo-brutal-border -rotate-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-heading font-bold text-2xl uppercase tracking-tighter">Experience Artifacts</h4>
                  </div>

                  {selectedExperience.media?.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="space-y-4"
                    >
                      <div className="bg-white p-6 neo-brutal-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center gap-2 mb-4 border-b border-ink-black/10 pb-2">
                          {m.type === 'pdf' ? <FileText className="text-action-blue w-5 h-5" /> : <Smartphone className="text-pop-purple w-5 h-5" />}
                          <span className="font-bold text-sm uppercase">{m.title}</span>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-ink-black/5 bg-bg-primary">
                          {m.type === 'image' ? (
                            <img src={m.url} alt={m.title} className="w-full h-auto" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="aspect-video w-full">
                              <iframe src={`${m.url}#toolbar=0`} className="w-full h-full" title={m.title} />
                            </div>
                          )}
                        </div>

                        {m.description && (
                          <p className="mt-4 text-sm font-medium text-ink-black/60 italic leading-relaxed">
                            {m.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side: Details (Memo Style) */}
              <div className="w-full md:w-2/5 p-8 md:p-12 bg-[#FDFCF8] overflow-y-auto flex flex-col">
                <div className="mb-10">
                  <div className="inline-block bg-sticker-yellow px-4 py-1 neo-brutal-border -rotate-2 mb-6">
                    <span className="font-bold text-xs uppercase">{selectedExperience.period}</span>
                  </div>
                  <h3 className="text-4xl font-heading font-bold leading-none mb-4 text-ink-black">
                    {selectedExperience.role}
                  </h3>
                  <p className="text-xl text-action-blue font-bold uppercase tracking-tight">
                    {selectedExperience.company}
                  </p>
                  <p className="text-ink-black/40 font-bold text-sm mt-1">{selectedExperience.location}</p>
                </div>

                <div className="h-1 w-full bg-ink-black/10 mb-10" />

                <div className="space-y-6 flex-1">
                  <h5 className="font-bold text-xs uppercase tracking-widest text-ink-black/40">Key Contributions</h5>
                  <ul className="space-y-4">
                    {selectedExperience.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base font-medium text-ink-black/80">
                        <span className="text-pop-purple mt-1">★</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 pt-8 border-t border-ink-black/10">
                  <div className="bg-bg-primary p-4 neo-brutal-border rotate-1">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-ink-black/40 mb-1">Status</p>
                    <p className="text-xs font-bold text-action-blue uppercase">Verified Experience Record</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceSection;
