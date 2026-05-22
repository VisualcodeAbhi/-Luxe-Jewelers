import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow = () => {
  const [isMobile, setIsMobile] = useState(true);
  
  // Track raw cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Add physics smoothing using springs
  const springConfig = { damping: 40, stiffness: 250, mass: 0.5 };
  const dotSpringX = useSpring(mouseX, { damping: 20, stiffness: 800, mass: 0.1 });
  const dotSpringY = useSpring(mouseY, { damping: 20, stiffness: 800, mass: 0.1 });
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Add mousemove listener if desktop
    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {/* Ambient background particles and glows - always render to keep aesthetic */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-gold/3 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gold/3 blur-[160px]" />
        
        {/* Soft Golden Particles */}
        <div className="absolute top-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-gold/30 animate-pulse" />
        <div className="absolute top-[70%] left-[15%] w-2 h-2 rounded-full bg-gold/20 animate-pulse duration-3000" />
        <div className="absolute top-[40%] right-[30%] w-2 h-2 rounded-full bg-gold/25 animate-pulse duration-2000" />
        <div className="absolute top-[80%] right-[20%] w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse duration-4000" />
      </div>

      {!isMobile && (
        <>
          {/* Cinematic Custom Pointer Dot */}
          <motion.div
            className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gold pointer-events-none z-50 mix-blend-difference"
            style={{
              x: dotSpringX,
              y: dotSpringY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />

          {/* Physics-Based Ambient Follow Glow */}
          <motion.div
            className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(197,160,89,0.15)_0%,_transparent_70%)] pointer-events-none z-40 blur-[40px]"
            style={{
              x: glowX,
              y: glowY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        </>
      )}
    </>
  );
};

