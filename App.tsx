/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Github, Linkedin, Mail, ExternalLink, Code, Terminal, Smartphone, Database, FileText, Lock, Loader2 } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GradientText';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import AdminDashboard from './components/AdminDashboard';
import { Project, Experience, Education, Certification, Award, Skill, Language } from './types';
import { PortfolioContent, subscribeToPortfolioContent, initializePortfolioData } from './services/portfolioService';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Scroll Spy State
  const [activeSection, setActiveSection] = useState('hero');

  // Admin State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Content State
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await initializePortfolioData();
      const unsubscribe = subscribeToPortfolioContent((data) => {
        setContent(data);
        setIsLoading(false);
      });
      return () => unsubscribe();
    };
    init();
  }, []);

  useEffect(() => {
    const sections = ['hero', 'experience', 'projects', 'education', 'skills', 'about'];
    const observers = sections.map(section => {
      const element = document.getElementById(section);
      if (!element) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(section);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [isLoading]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'annas3120') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setIsAdminOpen(true);
    } else {
      alert('Incorrect password');
    }
  };
  
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-action-blue animate-spin" />
          <p className="font-heading font-bold uppercase tracking-widest text-ink-black/40">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  const { hero, projects, experiences, education, certifications, awards, skills, languages } = content;

  return (
    <div className="relative min-h-screen text-ink-black selection:bg-action-blue selection:text-white overflow-x-hidden font-sans">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none">
        <nav className="nav-pill flex items-center justify-between w-full max-w-4xl pointer-events-auto relative">
          <div className="font-heading text-xl md:text-2xl font-bold tracking-tight text-ink-black cursor-default z-10">ANNAS.DEV</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 lg:gap-8 text-sm font-bold tracking-wide uppercase relative z-10">
            {['Experience', 'Projects', 'Education', 'Skills', 'About'].map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <motion.button 
                  key={item} 
                  onClick={() => scrollToSection(id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`relative px-4 py-2 transition-all cursor-pointer bg-transparent border-none group ${isActive ? 'text-white' : 'text-ink-black hover:text-action-blue'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#9c3535] border-2 border-[#193e8e] rounded-full -z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </motion.button>
              );
            })}
            <button 
              onClick={() => isLoggedIn ? setIsAdminOpen(true) : setShowLogin(true)}
              className="p-2 hover:bg-bg-primary rounded-full transition-colors pointer-events-auto"
              title="Admin Panel"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
          
          <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-ink-black/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-action-blue"
              style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
            />
          </div>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-primary text-xs tracking-widest uppercase hidden md:block relative z-10"
          >
            Contact Me
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-ink-black relative w-10 h-10 flex items-center justify-center z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {['Experience', 'Projects', 'Education', 'Skills', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-heading font-bold text-ink-black hover:text-action-blue transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary mt-8"
            >
              Contact Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-12">
        {/* Decorative Starburst Sticker */}
        <motion.div 
          className="absolute top-32 right-[10%] w-32 h-32 bg-sticker-yellow starburst sticker-effect flex items-center justify-center -rotate-12 z-10"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -12 }}
          style={{ y: yFast, rotate }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <span className="font-accent text-ink-black text-xl font-bold">HELLO!</span>
        </motion.div>

        {/* Floating Pop Purple Circle */}
        <motion.div 
          className="absolute top-1/4 left-[5%] w-24 h-24 bg-pop-purple rounded-full sticker-effect z-0"
          style={{ y: yMedium, rotate: rotateReverse }}
        />

        {/* Floating Action Blue Square */}
        <motion.div 
          className="absolute bottom-1/4 right-[15%] w-20 h-20 bg-action-blue neo-brutal-border rotate-12 sticker-effect z-0"
          style={{ y: ySlow, rotate }}
        />

        <motion.div 
          style={{ y: ySlow, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl"
        >
           {/* Title Sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-blush-pink text-ink-black font-bold text-sm md:text-base px-6 py-2 neo-brutal-border rotate-2 sticker-effect mb-8"
          >
            FULLSTACK SOFTWARE DEVELOPER
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full">
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.8] font-heading font-bold tracking-tighter text-ink-black text-center mb-4 uppercase">
              {hero.title.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word} {i === 0 && <br/>}
                </React.Fragment>
              ))}
            </h1>
            
            {/* Hand-drawn Arrow Decoration */}
            <div className="absolute -bottom-12 left-[20%] hidden md:block">
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="text-ink-black">
                <path d="M10 10C30 40 80 50 110 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                <path d="M100 15L112 20L105 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-accent text-lg absolute top-12 left-0 w-48 text-left">Based in Yogyakarta</span>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-2xl font-medium max-w-2xl mx-auto text-ink-black/70 leading-relaxed mt-12"
          >
            {hero.subtitle}
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="w-full py-4 bg-ink-black text-white z-20 overflow-hidden rotate-1 scale-105 border-y-2 border-white mt-16 mb-4">
          <motion.div 
            className="flex w-fit"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-2xl md:text-5xl font-heading font-bold px-8 flex items-center gap-4 uppercase">
                    Fullstack Web <span className="text-sticker-yellow">★</span> 
                    Android Native <span className="text-blush-pink">★</span> 
                    React Native <span className="text-action-blue">★</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* EXPERIENCE SECTION */}
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
              {experiences.map((exp, i) => (
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

      {/* PROJECTS SECTION */}
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
               {/* Decorative Star */}
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

      {/* EDUCATION SECTION */}
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

      {/* SKILLS SECTION */}
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

      {/* STICKER WALL (Certs, Awards, Languages) */}
      <section className="relative z-10 py-20 bg-ink-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Certifications */}
            <div className="space-y-6">
              <h3 className="text-white font-heading font-bold text-2xl uppercase tracking-tighter flex items-center gap-2">
                <Zap className="text-sticker-yellow" /> Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <motion.div 
                    key={cert.id} 
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => setSelectedCertification(cert)}
                    className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm cursor-pointer group hover:bg-white/10 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-bold text-sm group-hover:text-sticker-yellow transition-colors">{cert.title}</p>
                        <p className="text-white/40 text-xs uppercase font-bold mt-1">{cert.issuer}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="space-y-6">
              <h3 className="text-white font-heading font-bold text-2xl uppercase tracking-tighter flex items-center gap-2">
                <Music className="text-blush-pink" /> Honors & Awards
              </h3>
              <div className="space-y-4">
                {awards.map((award) => (
                  <motion.div 
                    key={award.id} 
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => setSelectedAward(award)}
                    className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm cursor-pointer group hover:bg-white/10 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-bold text-sm group-hover:text-blush-pink transition-colors">{award.title}</p>
                        <p className="text-white/40 text-xs uppercase font-bold mt-1">{award.date}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-6">
              <h3 className="text-white font-heading font-bold text-2xl uppercase tracking-tighter flex items-center gap-2">
                <Globe className="text-action-blue" /> Languages
              </h3>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang, i) => (
                  <div key={i} className="bg-action-blue p-4 neo-brutal-border rotate-2 sticker-effect">
                    <p className="text-ink-black font-bold text-sm uppercase">{lang.name}</p>
                    <p className="text-ink-black/60 text-[10px] font-bold uppercase">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 py-20 md:py-32 px-6 bg-white border-y-4 border-ink-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-pop-purple px-8 py-2 neo-brutal-border rotate-1 sticker-effect mb-12">
            <h2 className="text-3xl font-heading font-bold text-ink-black uppercase">About Me</h2>
          </div>
          <p className="text-xl md:text-3xl font-heading font-medium text-ink-black leading-relaxed mb-12">
            "{hero.about}"
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

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-6xl md:text-9xl font-heading font-bold text-ink-black/10 uppercase">
               CONNECT
             </h2>
             <div className="bg-sticker-yellow inline-block px-8 py-2 neo-brutal-border -rotate-2 sticker-effect -mt-12 relative z-10">
               <span className="font-bold text-ink-black uppercase tracking-widest">Let's build something together</span>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Email', value: 'annasabdurrahman354@gmail.com', icon: <Mail />, color: 'bg-action-blue', link: 'mailto:annasabdurrahman354@gmail.com' },
              { name: 'LinkedIn', value: 'Annas Abdurrahman', icon: <Linkedin />, color: 'bg-pop-purple', link: 'https://www.linkedin.com/in/annas-abdurrahman-09b16a22a' },
              { name: 'GitHub', value: 'annasabdurrahman354', icon: <Github />, color: 'bg-blush-pink', link: 'https://github.com/annasabdurrahman354' },
            ].map((contact, i) => (
              <motion.a
                key={i}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
                className="card-container p-10 flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-full mb-8 neo-brutal-border ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(contact.icon as React.ReactElement, { className: 'w-8 h-8 text-ink-black' })}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2 text-ink-black">{contact.name}</h3>
                <p className="text-ink-black/60 font-medium break-all">{contact.value}</p>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-action-blue opacity-0 group-hover:opacity-100 transition-opacity">
                  Get in touch <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

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

      <AIChat />

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
                      <h4 className="font-heading font-bold text-xl border-b-2 border-ink-black pb-2">Project Media</h4>
                      {selectedProject.media.map((m, idx) => (
                        <div key={idx} className="bg-white p-4 neo-brutal-border rounded-xl">
                          <p className="font-bold text-sm mb-1">{m.title}</p>
                          {m.description && <p className="text-xs text-ink-black/60 mb-2">{m.description}</p>}
                          <img src={m.url} alt={m.title} className="w-full h-32 object-cover rounded-lg border border-ink-black/10" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex gap-4">
                    <button className="btn-primary flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </button>
                    <button className="px-6 py-3 rounded-full border-2 border-ink-black font-bold hover:bg-ink-black hover:text-white transition-all">
                      View Code
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Certification Detail Modal */}
      <AnimatePresence>
        {selectedCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertification(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-bg-primary card-container flex flex-col shadow-2xl max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertification(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white neo-brutal-border text-ink-black hover:bg-action-blue transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="inline-block bg-sticker-yellow px-4 py-1 neo-brutal-border -rotate-2 mb-6">
                   <span className="font-bold text-xs uppercase">{selectedCertification.issuer}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-8 text-ink-black">
                  {selectedCertification.title}
                </h3>

                {selectedCertification.media && selectedCertification.media.length > 0 && (
                  <div className="space-y-12">
                    {selectedCertification.media.map((m, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="flex items-center gap-3 border-b-2 border-ink-black pb-2">
                          {m.type === 'pdf' ? <FileText className="text-action-blue" /> : <Zap className="text-pop-purple w-5 h-5" />}
                          <h4 className="font-heading font-bold text-xl">{m.title}</h4>
                        </div>
                        
                        {m.description && (
                          <p className="text-ink-black/70 font-medium italic">"{m.description}"</p>
                        )}

                        <div className="bg-white p-4 neo-brutal-border rounded-2xl overflow-hidden">
                          {m.type === 'image' ? (
                            <img 
                              src={m.url} 
                              alt={m.title} 
                              className="w-full h-auto rounded-xl border border-ink-black/10" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="aspect-[4/3] w-full">
                              <iframe 
                                src={`${m.url}#toolbar=0`} 
                                className="w-full h-full rounded-xl border border-ink-black/10"
                                title={m.title}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Award Detail Modal */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAward(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-bg-primary card-container flex flex-col shadow-2xl max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAward(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white neo-brutal-border text-ink-black hover:bg-blush-pink transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="inline-block bg-blush-pink px-4 py-1 neo-brutal-border rotate-2 mb-6">
                   <span className="font-bold text-xs uppercase text-ink-black">{selectedAward.date}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-8 text-ink-black">
                  {selectedAward.title}
                </h3>

                {selectedAward.media && selectedAward.media.length > 0 && (
                  <div className="space-y-12">
                    {selectedAward.media.map((m, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="flex items-center gap-3 border-b-2 border-ink-black pb-2">
                          {m.type === 'pdf' ? <FileText className="text-action-blue" /> : <Music className="text-blush-pink w-5 h-5" />}
                          <h4 className="font-heading font-bold text-xl">{m.title}</h4>
                        </div>
                        
                        {m.description && (
                          <p className="text-ink-black/70 font-medium italic">"{m.description}"</p>
                        )}

                        <div className="bg-white p-4 neo-brutal-border rounded-2xl overflow-hidden">
                          {m.type === 'image' ? (
                            <img 
                              src={m.url} 
                              alt={m.title} 
                              className="w-full h-auto rounded-xl border border-ink-black/10" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="aspect-[4/3] w-full">
                              <iframe 
                                src={`${m.url}#toolbar=0`} 
                                className="w-full h-full rounded-xl border border-ink-black/10"
                                title={m.title}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 neo-brutal-border w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-sticker-yellow p-2 neo-brutal-border">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-heading font-bold uppercase">Admin Access</h2>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-ink-black/40">Secret Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 neo-brutal-border bg-bg-primary font-bold"
                    placeholder="Enter password..."
                    autoFocus
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-action-blue py-3 neo-brutal-border font-bold uppercase tracking-widest hover:translate-x-1 hover:-translate-y-1 transition-transform"
                >
                  Enter Dashboard
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Dashboard */}
      <AnimatePresence>
        {isAdminOpen && isLoggedIn && (
          <AdminDashboard 
            content={content} 
            onClose={() => setIsAdminOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
