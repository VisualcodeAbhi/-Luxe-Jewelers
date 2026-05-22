import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: "Victoria Hastings",
    role: "Collector / Voguish Editor",
    avatar: "/images/team_emma.png",
    rating: 5,
    quote: "Luxe Jewelers offers an absolute standard in high-end design. The diamond solitaire ring I acquired features an unmatched fire and scintillation under every light. An heirloom masterwork."
  },
  {
    id: 2,
    name: "Charles Sterling",
    role: "Private Investor / Patron",
    avatar: "/images/team_david.png",
    rating: 5,
    quote: "The bridal set was a centerpiece of our special day. From the delicate platinum claws to the majestic weight of the tiara, their attention to craft represents a premium world standard."
  },
  {
    id: 3,
    name: "Genevieve Mercer",
    role: "Sartorialist Designer",
    avatar: "/images/team_sophia.png",
    rating: 5,
    quote: "Bespoke jewelry has found its true temple. Their Italian gold link chain is crafted with heavy, rich solid 18-karat metal that rests beautifully against the collar. Absolutely flawless."
  }
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length);
  };

  const activeReview = reviewsData[activeIndex];

  return (
    <section className="py-24 bg-velvet border-t border-b border-white/5 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">Client Testimonials</span>
          <h2 className="text-white text-3xl md:text-4xl font-serif tracking-widest uppercase">Praise From Collectors</h2>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
        </div>

        {/* Carousel Content */}
        <div className="w-full relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center space-y-6 max-w-2xl px-8"
            >
              {/* Quote Mark Icon */}
              <Quote className="text-gold/25 w-10 h-10 flex-shrink-0" />

              {/* Review Quote text */}
              <blockquote className="text-white text-base md:text-xl font-serif italic tracking-wide leading-relaxed font-light">
                &ldquo;{activeReview.quote}&rdquo;
              </blockquote>

              {/* Star Breakdown */}
              <div className="flex text-gold justify-center">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" className="mx-0.5" />
                ))}
              </div>

              {/* Profile Card details */}
              <div className="flex items-center space-x-4 pt-4">
                {/* Profile Portrait */}
                <div className="w-12 h-12 rounded-full border border-gold/25 overflow-hidden flex-shrink-0 bg-charcoal">
                  <img src={activeReview.avatar} alt={activeReview.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <cite className="text-white text-sm font-serif tracking-wide font-medium not-italic block">{activeReview.name}</cite>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{activeReview.role}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Control navigation Buttons */}
        <div className="flex space-x-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-gold hover:text-gold text-gray-400 flex items-center justify-center transition-all duration-300 cursor-pointer"
            aria-label="Previous Review"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-gold hover:text-gold text-gray-400 flex items-center justify-center transition-all duration-300 cursor-pointer"
            aria-label="Next Review"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
