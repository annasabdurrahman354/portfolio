import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import GradientText from './GradientText';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <motion.section
        id="projects"
        className="relative z-10 py-12 md:py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <motion.div
               className="relative"
               initial={{ x: -50, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
             >
               <h2 className="text-6xl md:text-8xl font-heading font-bold text-ink-black leading-[0.9]">
                 <GradientText text="Featured" /> <br/>
                 <span className="text-action-blue">Projects</span>
               </h2>
               <div className="absolute -top-8 -right-8 text-pop-purple animate-spin-slow">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                 </svg>
               </div>
             </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink-black/40 backdrop-blur-sm cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-bg-primary card-container flex flex-col md:flex-row shadow-2xl max-h-[90vh] overflow-y-auto md:overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white neo-brutal-border text-ink-black hover:bg-action-blue transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-ink-black bg-white">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedProject.id}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-start md:overflow-y-auto relative bg-[#FDFCF8]">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="inline-block bg-sticker-yellow px-4 py-1 neo-brutal-border -rotate-2 mb-6">
                     <span className="font-bold text-xs uppercase">{selectedProject.date}</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-heading font-bold leading-none mb-2 text-ink-black">
                    {selectedProject.title}
                  </h3>

                  <p className="text-lg text-action-blue font-bold uppercase mb-6">
                    {selectedProject.category}
                  </p>

                  <div className="h-1 w-20 bg-ink-black mb-6" />

                  <p className="text-ink-black/70 leading-relaxed text-lg font-medium mb-8">
                    {selectedProject.description}
                  </p>

                  {selectedProject.media && selectedProject.media.length > 0 && (
                    <div className="space-y-6 mt-8">
                      <h4 className="font-heading font-bold text-xl border-b-2 border-ink-black pb-2 uppercase tracking-tighter">Project Media</h4>
                      <div className="grid grid-cols-1 gap-6">
                        {selectedProject.media.map((m, idx) => (
                          <div key={idx} className="bg-white p-4 neo-brutal-border rounded-xl space-y-3">
                            <div>
                              <p className="font-bold text-sm uppercase tracking-tight">{m.title}</p>
                              {m.description && <p className="text-xs text-ink-black/60">{m.description}</p>}
                            </div>
                            {m.type === 'image' && (
                              <img src={m.url} alt={m.title} className="w-full h-auto object-contain rounded-lg border border-ink-black/10" />
                            )}
                            {m.type === 'video' && (
                              <video src={m.url} controls className="w-full h-auto rounded-lg border border-ink-black/10" />
                            )}
                            {m.type === 'pdf' && (
                              <a href={m.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-bg-primary neo-brutal-border text-xs font-bold uppercase hover:bg-action-blue/10 transition-colors">
                                View PDF Document
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-12 flex flex-wrap gap-4">
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {selectedProject.codeUrl && (
                      <a 
                        href={selectedProject.codeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border-2 border-ink-black font-bold hover:bg-ink-black hover:text-white transition-all text-sm"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
