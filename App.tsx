/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Github, Linkedin, Mail, ExternalLink, Code, Terminal, Smartphone, Database } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GradientText';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import { Project, Experience, Education, Certification, Award, Skill, Language } from './types';

// Portfolio Data
const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Generus ERP', 
    category: 'Fullstack Web Development', 
    date: '2024 - 2026', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'A multi-tenant ERP system supporting multiple Islamic boarding schools under a centralized foundation. Built with Laravel (Livewire, Filament) and React.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', title: 'Dashboard Overview', description: 'The main administrative dashboard for managing multiple tenants.' }
    ]
  },
  { 
    id: '2', 
    title: 'SAYFINE', 
    category: 'Mobile Development', 
    date: '2021 - 2023', 
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop',
    description: 'An Android application built with Java and Firebase that connects food sellers with customers through real-time chat, menu management, and ordering features.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop', title: 'Order Management', description: 'Real-time order tracking and seller-customer communication.' }
    ]
  },
  { 
    id: '3', 
    title: 'CABBLE', 
    category: 'Mobile Development', 
    date: '2021 - 2023', 
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    description: 'A Kotlin-based collaborative social platform designed to support open-source teamwork. Selected as Top 40 Finalist in a national startup competition.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop', title: 'Collaboration Hub', description: 'Interface for team members to collaborate on open-source projects.' }
    ]
  },
  { 
    id: '4', 
    title: 'LokaSee', 
    category: 'Mobile Development', 
    date: '2022', 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    description: 'A property listing application developed during the Bangkit Academy cohort. Implemented Clean Architecture, Kotlin, and Firebase.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop', title: 'Property Search', description: 'Real-time property search and filtering interface.' }
    ]
  },
  { 
    id: '5', 
    title: 'Wallet Codes', 
    category: 'Backend Development', 
    date: '2022', 
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    description: 'Developed RESTful APIs for the Wallet Codes backend using C# and ASP.NET Core. Contributed to the admin panel using React.js.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop', title: 'API Documentation', description: 'Structured API endpoints for secure transactions.' }
    ]
  }
];

const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    company: 'Pondok Pesantren Walibarokah Kediri',
    role: 'Full Stack Engineer',
    period: 'Nov 2024 - Apr 2026',
    location: 'Kediri City',
    description: [
      'Led digital transformation by architecting web and mobile information systems for academic, financial, and administrative operations.',
      'Designed and implemented a multi-tenant ERP system ("Generus") using Laravel (Livewire, Filament) and React.',
      'Built scalable modules covering student management, finance, academic tracking, and IoT-based attendance systems (RFID smartcard integration).',
      'Developed RESTful APIs to support mobile apps, IoT devices, and external systems integration.'
    ]
  },
  {
    id: 'e2',
    company: 'Pondok Pesantren Walibarokah Kediri',
    role: 'ICT Teacher',
    period: 'Jan 2025 - Mar 2026',
    location: 'Kediri City',
    description: [
      'Taught ICT fundamentals to 10th-grade students, covering basic programming, computer systems, and digital literacy.',
      'Simplified complex technical concepts into structured, easy-to-understand learning materials.',
      'Mentored students in developing problem-solving and computational thinking skills.'
    ]
  },
  {
    id: 'e3',
    company: 'Freelance | Self-Employed',
    role: 'Freelance Mobile Developer',
    period: 'Nov 2021 - Dec 2023',
    location: 'Remote',
    description: [
      'Developed SAYFINE, an Android application built with Java and Firebase for food seller-customer connection.',
      'Implemented features including authentication, chat system, order management, and BMI calculator.',
      'Contributed to CABBLE, a Kotlin-based collaborative social platform.',
      'Selected as Top 40 Finalist in a national startup competition for CABBLE.'
    ]
  },
  {
    id: 'e4',
    company: 'Bangkit Academy',
    role: 'Mobile Development Cohort',
    period: 'Jan 2022 - Aug 2022',
    location: 'Indonesia',
    description: [
      'Completed intensive Android development program covering Kotlin, Jetpack, and modern development best practices.',
      'Collaborated in an Agile team to develop "LokaSee", a property listing application.',
      'Implemented Clean Architecture principles and integrated Firebase and Google Cloud services.',
      'Earned the globally recognized Associate Android Developer (AAD) certification.'
    ]
  },
  {
    id: 'e5',
    company: 'Forest Interactive',
    role: 'Software Engineer',
    period: 'Feb 2022 - June 2022',
    location: 'Malaysia',
    description: [
      'Developed RESTful APIs for the Wallet Codes backend using C# and ASP.NET Core.',
      'Contributed to the development of the Wallet Codes admin panel using React.js.',
      'Collaborated within a multinational development team gaining hands-on experience in enterprise workflows.'
    ]
  },
  {
    id: 'e6',
    company: 'Tradeasia International',
    role: 'IT Student Trainee',
    period: 'Feb 2022 - May 2022',
    location: 'Singapore',
    description: [
      'Analyzed and identified technical issues on the company website, delivering actionable SEO improvements.',
      'Applied On-Page and Off-Page SEO strategies to increase organic traffic and search engine ranking.',
      'Recognized with the "Best Individual Performance" award for outstanding analytical insights.'
    ]
  },
  {
    id: 'e7',
    company: 'Universitas Sebelas Maret',
    role: 'Assistant Lecturer of Digital System',
    period: 'Sep 2020 - Jan 2021',
    location: 'Surakarta',
    description: [
      'Prepared practical course materials and conducted engaging teaching activities for undergraduate students.',
      'Evaluated student performance and provided comprehensive grade reports to head lecturers.'
    ]
  }
];

const EDUCATION: Education[] = [
  {
    id: 'edu1',
    institution: 'Universitas Sebelas Maret',
    degree: "Bachelor's Degree, Computer Science",
    period: 'Aug 2019 - Dec 2023',
    description: ['Informatics graduate with a strong passion for software engineering.']
  }
];

const SKILLS: Skill[] = [
  {
    category: 'Top Skills',
    items: ['Database Administration', 'Relational Databases', 'SQL']
  },
  {
    category: 'Web Development',
    items: ['Laravel', 'Filament PHP', 'Livewire', 'Inertia.js', 'React', 'Vue', 'TailwindCSS', 'ASP.NET Core (C#)', 'RESTful APIs']
  },
  {
    category: 'Mobile Development',
    items: ['Android Native', 'React Native', 'Kotlin', 'Java', 'Jetpack', 'Firebase']
  },
  {
    category: 'Others',
    items: ['SEO', 'Digital Product Optimization', 'Domain-Driven Design (DDD)', 'Object-Oriented Programming (OOP)']
  }
];

const LANGUAGES: Language[] = [
  { name: 'English', proficiency: 'Limited Working' },
  { name: 'Indonesian', proficiency: 'Native or Bilingual' }
];

const CERTIFICATIONS: Certification[] = [
  { id: 'c1', title: 'Associate Android Developer', issuer: 'Google' },
  { id: 'c2', title: 'Microsoft Technology Associate: Database Administration Fundamentals (MTA)', issuer: 'Microsoft' }
];

const AWARDS: Award[] = [
  { id: 'a1', title: 'Finalist - Lomba Inovasi Digital Mahasiswa (LIDM) 2020: Division I', date: '2020' },
  { id: 'a2', title: 'Best Individual Performance - Tradeasia International', date: '2022' }
];

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

  return (
    <div className="relative min-h-screen text-ink-black selection:bg-action-blue selection:text-white overflow-x-hidden font-sans">
      <FluidBackground />
      
      {/* Navigation */}
      <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none">
        <nav className="nav-pill flex items-center justify-between w-full max-w-4xl pointer-events-auto">
          <div className="font-heading text-xl md:text-2xl font-bold tracking-tight text-ink-black cursor-default">ANNAS.DEV</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide uppercase">
            {['Projects', 'Experience', 'Education', 'Skills', 'About'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-action-blue hover:scale-110 transition-all text-ink-black cursor-pointer bg-transparent border-none"
              >
                {item}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-primary text-xs tracking-widest uppercase hidden md:block"
          >
            Contact Me
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-ink-black relative w-10 h-10 flex items-center justify-center"
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
            {['Projects', 'Experience', 'Education', 'Skills', 'About'].map((item) => (
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
              ANNAS <br/> ABDURRAHMAN
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
            Building scalable digital solutions with a focus on high-performance web and mobile systems.
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
            {PROJECTS.map((project, i) => (
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
              {EXPERIENCES.map((exp, i) => (
                <motion.div 
                  key={exp.id}
                  className="bg-white p-8 rounded-[24px] border-2 border-ink-black text-ink-black relative group"
                  whileHover={{ x: 10 }}
                >
                  <div className="absolute -top-4 -left-4 bg-action-blue px-4 py-1 neo-brutal-border -rotate-2 sticker-effect">
                    <span className="font-bold text-xs uppercase">{exp.period}</span>
                  </div>
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
              {EDUCATION.map((edu) => (
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
            {SKILLS.map((skillGroup, i) => (
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
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-white font-bold text-sm">{cert.title}</p>
                    <p className="text-white/40 text-xs uppercase font-bold mt-1">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="space-y-6">
              <h3 className="text-white font-heading font-bold text-2xl uppercase tracking-tighter flex items-center gap-2">
                <Music className="text-blush-pink" /> Honors & Awards
              </h3>
              <div className="space-y-4">
                {AWARDS.map((award) => (
                  <div key={award.id} className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-white font-bold text-sm">{award.title}</p>
                    <p className="text-white/40 text-xs uppercase font-bold mt-1">{award.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-6">
              <h3 className="text-white font-heading font-bold text-2xl uppercase tracking-tighter flex items-center gap-2">
                <Globe className="text-action-blue" /> Languages
              </h3>
              <div className="flex flex-wrap gap-4">
                {LANGUAGES.map((lang, i) => (
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
            "I am an Informatics graduate with a strong passion for software engineering. My experience spans across full-stack web development (Frontend & Backend) and mobile systems (Native Android & React Native)."
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
    </div>
  );
};

export default App;
