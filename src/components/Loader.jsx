import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hold screen focus for 1.8 seconds to display luxury branding
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-charcoal z-9999 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Shimmering Ambient Light Backing */}
          <div className="absolute w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] animate-pulse" />

          <div className="relative flex flex-col items-center">
            {/* Spinning Diamond Geometry Outline */}
            <motion.div
              className="relative w-24 h-24 flex items-center justify-center"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              {/* Outer Golden Sparkle Rings */}
              <div className="absolute inset-0 border-2 border-gold/15 rounded-full" />
              <div className="absolute inset-2 border border-dashed border-gold/30 rounded-full" />
              
              {/* Core Vector Jewel Shape */}
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-gold fill-none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 2L2 9l10 13 10-13-10-7z" />
                <path d="M2 9h20M12 2v20M6.5 5.5l11 11" />
              </svg>
            </motion.div>

            {/* Glowing Brand Logomark */}
            <motion.h1
              className="text-gold text-4xl mt-8 font-light tracking-[0.25em] font-serif uppercase text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ textShadow: "0 0 15px rgba(197, 160, 89, 0.4)" }}
            >
              ✦ Luxe Jewelers
            </motion.h1>

            <motion.p
              className="text-gray-500 text-xs mt-3 tracking-[0.4em] uppercase text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Timeless Elegance
            </motion.p>
          </div>

          {/* Luxury Loading Line */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gold/10">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
