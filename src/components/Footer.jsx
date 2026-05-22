import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useContext(ShopContext);

  const handleLinkClick = (tabId) => {
    navigateTo(tabId);
  };

  return (
    <footer className="bg-charcoal border-t border-gold/15 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-gold text-2xl font-light tracking-widest">✦ LUXE JEWELERS</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Crafting timeless elegance and high-fashion luxury masterpieces since 1995. Your premier destination for bespoke, rare bridal collections and fine jewelry.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-gold/25 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-300">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gold/25 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-300">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gold/25 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-300">
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Section 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-white text-base tracking-widest font-medium uppercase text-xs">Quick Links</h3>
            <ul className="space-y-2.5">
              {['home', 'products', 'about', 'services', 'contact'].map((tab) => (
                <li key={tab}>
                  <button 
                    onClick={() => handleLinkClick(tab)}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm font-light uppercase tracking-wider cursor-pointer"
                  >
                    {tab === 'about' ? 'About Us' : tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white text-base tracking-widest font-medium uppercase text-xs">Contact Info</h3>
            <ul className="space-y-3.5 text-sm text-gray-400 font-light">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span>123 Luxury Lane, Diamond District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-gold transition-colors duration-300">(555) 123-4567</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:info@luxejewelers.com" className="hover:text-gold transition-colors duration-300">info@luxejewelers.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Globe size={16} className="text-gold flex-shrink-0" />
                <a href="#" className="hover:text-gold transition-colors duration-300">www.luxejewelers.com</a>
              </li>
            </ul>
          </div>

          {/* Section 4: Business Hours */}
          <div className="space-y-4">
            <h3 className="text-white text-base tracking-widest font-medium uppercase text-xs">Showroom Hours</h3>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Monday - Friday</span>
                <strong className="text-gold font-normal">10:00 AM - 7:00 PM</strong>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Saturday</span>
                <strong className="text-gold font-normal">10:00 AM - 6:00 PM</strong>
              </li>
              <li className="flex justify-between pb-1.5">
                <span>Sunday</span>
                <strong className="text-red-400/80 font-normal">Closed</strong>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright banner */}
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>&copy; 2026 Luxe Jewelers. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
