import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { 
    currentTab, 
    navigateTo, 
    cartTotalItems, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen 
  } = useContext(ShopContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId) => {
    navigateTo(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Elegant Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center group"
          >
            <h1 className="text-gold text-2xl md:text-3xl font-light tracking-[0.18em] transition-all duration-300 group-hover:opacity-85">
              ✦ LUXE <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] font-medium text-gray-400 align-middle ml-1">JEWELERS</span>
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 lg:space-x-12 items-center">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-300 cursor-pointer ${
                    currentTab === link.id ? 'text-gold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
                {/* Custom animated gold bar beneath links */}
                <motion.div
                  className={`absolute -bottom-2 left-0 right-0 h-[1.5px] bg-gold ${
                    currentTab === link.id ? 'opacity-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                  style={{ transformOrigin: 'left' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center space-x-5 lg:space-x-7">
            {/* User Icon Shortcut */}
            <button className="text-gray-300 hover:text-gold transition-colors duration-300 relative cursor-pointer hidden sm:block">
              <User size={18} strokeWidth={1.8} />
            </button>

            {/* Wishlist Button Trigger */}
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="text-gray-300 hover:text-gold transition-colors duration-300 relative cursor-pointer"
              aria-label="Open Wishlist"
            >
              <Heart size={18} strokeWidth={1.8} />
              {wishlist.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2.5 -right-2.5 bg-gold text-charcoal text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-charcoal"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-300 hover:text-gold transition-colors duration-300 relative cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              {cartTotalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2.5 -right-2.5 bg-gold text-charcoal text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-charcoal"
                >
                  {cartTotalItems}
                </motion.span>
              )}
            </button>

            {/* Hamburger Mobile Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-gold transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-0 right-0 bg-charcoal/95 border-b border-gold/15 backdrop-blur-xl px-4 py-8 z-30 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-sm uppercase tracking-[0.25em] font-medium py-2 border-b border-white/5 cursor-pointer ${
                  currentTab === link.id ? 'text-gold pl-2 border-gold/30' : 'text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
