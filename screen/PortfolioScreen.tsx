import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock } from 'lucide-react';
import FluidBackground from '../components/FluidBackground';
import AIChat from '../components/AIChat';
import CustomCursor from '../components/CustomCursor';
import HeroSection from '../components/HeroSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import SkillSection from '../components/SkillSection';
import StickerWallSection from '../components/StickerWallSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import FooterSection from '../components/FooterSection';
import { PortfolioContent } from '../services/portfolioService';

interface PortfolioScreenProps {
  content: PortfolioContent;
  onAdminClick: () => void;
  isLoggedIn: boolean;
}

const PortfolioScreen: React.FC<PortfolioScreenProps> = ({ content, onAdminClick, isLoggedIn }) => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { hero, projects, experiences, education, certifications, awards, skills, languages } = content;

  useEffect(() => {
    const sections = ['hero', 'experience', 'projects', 'education', 'skills', 'about'];

    const getActiveSection = () => {
      const viewportHeight = window.innerHeight;
      let maxOverlap = -1;
      let active = 'hero';

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        // Calculate how much of the element overlaps with the viewport
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const overlap = Math.max(0, visibleBottom - visibleTop);

        if (overlap > maxOverlap) {
          maxOverlap = overlap;
          active = id;
        }
      });

      setActiveSection(active);
    };

    window.addEventListener('scroll', getActiveSection, { passive: true });
    window.addEventListener('resize', getActiveSection, { passive: true });
    getActiveSection();

    return () => {
      window.removeEventListener('scroll', getActiveSection);
      window.removeEventListener('resize', getActiveSection);
    };
  }, []);

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
          </div>

          <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-ink-black/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-action-blue"
              style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
            />
          </div>


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

      <section id="hero">
        <HeroSection hero={hero} />
      </section>

      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <EducationSection education={education} />
      <SkillSection skills={skills} />
      <StickerWallSection certifications={certifications} awards={awards} languages={languages} />
      <AboutSection aboutText={hero.about} />
      <ContactSection />
      <FooterSection />
      <AIChat onAdminCommand={onAdminClick} />

    </div>
  );
};

export default PortfolioScreen;