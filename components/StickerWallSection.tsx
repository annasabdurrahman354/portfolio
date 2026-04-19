import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Music, Globe, ExternalLink, X, FileText } from 'lucide-react';
import { Certification, Award, Language } from '../types';

interface StickerWallSectionProps {
  certifications: Certification[];
  awards: Award[];
  languages: Language[];
}

const StickerWallSection: React.FC<StickerWallSectionProps> = ({ certifications, awards, languages }) => {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  return (
    <>
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
    </>
  );
};

export default StickerWallSection;
