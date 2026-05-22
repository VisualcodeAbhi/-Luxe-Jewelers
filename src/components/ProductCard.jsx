import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setActiveProductDetail } = useContext(ShopContext);

  const inWishlist = isInWishlist(product.id);

  // Formatting currency helper
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-panel rounded-none border border-gold/15 overflow-hidden flex flex-col h-full bg-charcoal/40 gold-glow-hover shimmer-container"
    >
      {/* Product Image Wrapper with Overlays */}
      <div className="relative aspect-square overflow-hidden bg-charcoal/80">
        
        {/* Dynamic Zoom Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
        />

        {/* Dynamic Badge Tag */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 z-10">
            Sale -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
        {product.stock <= 2 && (
          <div className="absolute top-4 right-4 bg-red-950/80 border border-red-500/30 text-red-300 text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 z-10">
            Only {product.stock} Left
          </div>
        )}

        {/* Cinematic Blur Overlay on Hover */}
        <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-20">
          {/* Wishlist Toggle Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
              inWishlist 
                ? 'bg-gold border-gold text-charcoal' 
                : 'border-white/20 text-white hover:bg-white/10 hover:border-white'
            }`}
            aria-label="Add to Wishlist"
          >
            <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={() => setActiveProductDetail(product)}
            className="w-11 h-11 rounded-full border border-white/20 text-white hover:bg-gold hover:border-gold hover:text-charcoal flex items-center justify-center transition-all duration-300 cursor-pointer"
            aria-label="Quick View"
          >
            <Eye size={16} />
          </button>

          {/* Quick Add to Cart */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-11 h-11 rounded-full border border-white/20 text-white hover:bg-gold hover:border-gold hover:text-charcoal flex items-center justify-center transition-all duration-300 cursor-pointer"
            aria-label="Add to Cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Info Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-medium block mb-1">
            {product.category}
          </span>

          {/* Product Title */}
          <h3 
            onClick={() => setActiveProductDetail(product)}
            className="text-white text-lg font-serif tracking-wide hover:text-gold transition-colors duration-300 cursor-pointer line-clamp-1 mb-1.5"
          >
            {product.name}
          </h3>

          {/* Subtitle / Desc snippet */}
          <p className="text-gray-400 text-xs font-light tracking-wide line-clamp-2 leading-relaxed mb-3.5">
            {product.desc}
          </p>
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-4">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  strokeWidth={1.8}
                />
              ))}
            </div>
            <span className="text-gray-500 text-[10px] tracking-wider mt-0.5">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>

          {/* Pricing Row & Add to Cart button */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-baseline space-x-2">
              <span className="text-gold text-lg font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 text-xs line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              className="text-[10px] text-white uppercase tracking-[0.18em] font-medium flex items-center space-x-1 hover:text-gold transition-colors cursor-pointer"
            >
              <span>Add to Cart</span>
              <span className="text-gold group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
