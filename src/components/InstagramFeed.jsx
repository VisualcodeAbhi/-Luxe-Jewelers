import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const instagramPhotos = [
  {
    id: 1,
    image: "/images/eternal_elegance_banner.png",
    likes: "2.4k",
    comments: "148"
  },
  {
    id: 2,
    image: "/images/flagship_showroom.png",
    likes: "1.8k",
    comments: "94"
  },
  {
    id: 3,
    image: "/images/diadem_necklace.png",
    likes: "3.2k",
    comments: "256"
  },
  {
    id: 4,
    image: "/images/bridal_tiara_set.png",
    likes: "4.1k",
    comments: "305"
  },
  {
    id: 5,
    image: "/images/chronos_gold_watch.png",
    likes: "1.5k",
    comments: "72"
  },
  {
    id: 6,
    image: "/images/diamond_solitaire_ring.png",
    likes: "2.9k",
    comments: "189"
  }
];

export const InstagramFeed = () => {
  return (
    <section className="py-24 bg-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">Luxury Lifestyle</span>
          <h2 className="text-white text-3xl md:text-4xl font-serif tracking-widest uppercase">The Luxe Journal</h2>
          <p className="text-gray-400 text-xs tracking-wider max-w-sm mx-auto font-light leading-relaxed">
            Follow our digital high-fashion journal for curated jewelry styling, elite lifestyle editorials, and private previews.
          </p>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPhotos.map((photo) => (
            <motion.a
              key={photo.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group relative aspect-square overflow-hidden border border-white/5 bg-charcoal cursor-pointer gold-glow-hover"
            >
              {/* Image */}
              <img
                src={photo.image}
                alt="Luxe styling collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gilded overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-3 z-10">
                <Instagram size={20} className="text-gold" />
                
                {/* Stats */}
                <div className="flex space-x-4 text-white text-[10px] uppercase tracking-wider font-medium">
                  <span className="flex items-center space-x-1">
                    <Heart size={11} fill="currentColor" className="text-gold" />
                    <span>{photo.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle size={11} fill="currentColor" className="text-gold" />
                    <span>{photo.comments}</span>
                  </span>
                </div>
              </div>

            </motion.a>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gold uppercase tracking-[0.25em] font-semibold border-b border-gold/40 pb-1 hover:text-white hover:border-white transition-all duration-300"
          >
            ✦ Join @LuxeJewelers Privé
          </a>
        </div>

      </div>
    </section>
  );
};
