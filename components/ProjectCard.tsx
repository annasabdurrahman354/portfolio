/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      className="group relative h-[450px] w-full card-container cursor-pointer bg-white"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      onClick={onClick}
    >
      {/* Image Container with Neo-Brutal Border */}
      <div className="h-[65%] w-full overflow-hidden border-b-2 border-ink-black relative">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 }
          }}
        />
        {/* Sticker Badge for Date */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-sticker-yellow text-ink-black font-bold text-xs px-3 py-1 neo-brutal-border -rotate-3 sticker-effect">
            {project.date}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col justify-between h-[35%]">
        <div>
          <h3 className="font-heading text-2xl font-bold text-ink-black leading-tight">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-ink-black/60 mt-1">
            {project.category}
          </p>
        </div>
        
        <div className="flex justify-end items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ink-black/40 group-hover:text-action-blue transition-colors">View Project</span>
          <motion.div
            className="bg-action-blue p-2 rounded-full neo-brutal-border"
            variants={{
              rest: { rotate: 0 },
              hover: { rotate: 45 }
            }}
          >
            <ArrowUpRight className="w-5 h-5 text-ink-black" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
