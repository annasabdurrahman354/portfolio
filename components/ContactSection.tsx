import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
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
  );
};

export default ContactSection;
