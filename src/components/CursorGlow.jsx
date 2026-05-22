import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow = () => {
  const [isMobile, setIsMobile] = useState(true);
  
  // Track cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add physics smoothing using springs
  const springConfig = { damping: 40, stiffness: 250, mass: 0.5 };
  const glowX = useSpring(cursorX, springConfig);
  const glowY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 150); // Offset by half the glow diameter (300px)
      cursorY.set(e.clientY - 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.classList.add('custom-cursor-active');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile) return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gold/5 blur-[150px]" />
    </div>
  );

  return (
    <>
      {/* Cinematic Custom Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gold pointer-events-none z-50 mix-blend-difference"
        style={{
          x: useSpring(useMotionValue(0), springConfig),
          y: useSpring(useMotionValue(0), springConfig),
        }}
        animate={{
          x: glowX.get() + 144, // Center coordinate relative to larger glow box
          y: glowY.get() + 144,
        }}
      />

      {/* Physics-Based Ambient Follow Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full bg-radial from-gold/10 to-transparent pointer-events-none z-40 blur-[50px]"
        style={{
          x: glowX,
          y: glowY,
        }}
      />

      {/* Luxury Background Floating Circles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-gold/3 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gold/3 blur-[160px]" />
        
        {/* Soft Golden Particles */}
        <div className="absolute top-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-gold/30 animate-pulse" />
        <div className="absolute top-[70%] left-[15%] w-2 h-2 rounded-full bg-gold/20 animate-pulse duration-3000" />
        <div className="absolute top-[40%] right-[30%] w-2 h-2 rounded-full bg-gold/25 animate-pulse duration-2000" />
        <div className="absolute top-[80%] right-[20%] w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse duration-4000" />
      </div>
    </>
  );
};
