import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  hero: {
    title: string;
    subtitle: string;
    about: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
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
  );
};

export default HeroSection;
