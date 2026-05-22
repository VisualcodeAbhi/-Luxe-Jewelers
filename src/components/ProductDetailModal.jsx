import React, { useContext, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Heart, Star, ShoppingBag, CreditCard, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetailModal = () => {
  const { 
    activeProductDetail, 
    setActiveProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCheckoutOpen 
  } = useContext(ShopContext);

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const inWishlist = isInWishlist(product.id);

  // States
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [addedNotify, setAddedNotify] = useState(false);
  const imgRef = useRef(null);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Magnifying Glass Zoom Effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '220%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Instant Add-to-Cart Trigger
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotify(true);
    setTimeout(() => setAddedNotify(false), 2000);
  };

  // Buy Now Trigger
  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveProductDetail(null);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 pt-24"
      >
        {/* Backdrop click close */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={() => setActiveProductDetail(null)}
        />

        {/* Cinematic Card Container */}
        <motion.div
          initial={{ y: 50, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl glass-panel bg-charcoal/90 rounded-none border border-gold/20 flex flex-col md:grid md:grid-cols-2 overflow-hidden max-h-[85vh] md:max-h-[90vh] z-10"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveProductDetail(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors duration-300 w-8 h-8 rounded-full border border-white/5 bg-charcoal/80 flex items-center justify-center z-30 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Left Column: Gallery & Zoom */}
          <div className="p-6 md:p-8 flex flex-col space-y-4 border-b md:border-b-0 md:border-r border-white/5 overflow-y-auto">
            {/* Main Interactive Zoom Box */}
            <div 
              className="relative aspect-square w-full bg-charcoal/60 overflow-hidden border border-white/5 shimmer-container select-none cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imgRef}
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Zoomed viewport */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-150 border border-gold/10"
                style={{
                  ...zoomStyle,
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>

            {/* Thumbnails Row */}
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(thumb)}
                  className={`relative w-20 h-20 flex-shrink-0 bg-charcoal border overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImage === thumb ? 'border-gold scale-95 shadow-lg' : 'border-white/10 opacity-70 hover:opacity-100 hover:border-gold/50'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Customer Reviews Section */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <h4 className="text-white text-base tracking-wider font-serif uppercase mb-5">Customer Reviews</h4>
              <div className="space-y-5">
                {product.reviews.map((rev, idx) => (
                  <div key={idx} className="bg-white/2 p-4 border border-white/5 rounded-none space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-medium text-gray-200">{rev.name}</strong>
                      <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            fill={i < rev.rating ? "currentColor" : "none"}
                            strokeWidth={2}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Details & Call-to-actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[90vh]">
            <div>
              {/* Breadcrumb / Category */}
              <div className="flex items-center space-x-1.5 text-xs text-gold uppercase tracking-[0.25em] font-medium mb-3">
                <span>Collections</span>
                <ChevronRight size={10} strokeWidth={3} className="text-gray-600" />
                <span>{product.category}</span>
              </div>

              {/* Title & Pricing */}
              <h2 className="text-white text-3xl md:text-4xl font-serif tracking-wide mb-3 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gold text-2xl font-light">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-500 text-base line-through font-light">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-gold/20">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Rating Summary */}
              <div className="flex items-center space-x-2.5 pb-6 border-b border-white/5 mb-6">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      strokeWidth={1.8}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-xs tracking-wider mt-0.5">
                  {product.rating.toFixed(1)} / 5.0 (based on {product.reviewCount} verified purchases)
                </span>
              </div>

              {/* Description */}
              <div className="space-y-4 mb-8">
                <p className="text-gray-300 text-sm font-light leading-relaxed italic">
                  &ldquo;{product.desc}&rdquo;
                </p>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {product.longDesc}
                </p>
              </div>

              {/* Specifications / Details list */}
              <div className="border border-white/5 p-4 bg-white/1.5 mb-8">
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <span className="text-gray-500">Stock Availability:</span>
                  <span className={product.stock > 0 ? 'text-green-400 font-normal' : 'text-red-400 font-normal'}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                  
                  <span className="text-gray-500">Shipping:</span>
                  <span className="text-gray-300">Complimentary Over-Night Shipping</span>
                  
                  <span className="text-gray-500">Guarantee:</span>
                  <span className="text-gray-300">Lifetime Luster Guarantee</span>
                </div>
              </div>
            </div>

            {/* Shopping Action Row */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              {/* Quantity Selector & Wishlist Toggle */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-white/10 bg-charcoal">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer text-base"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-medium text-white select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer text-base"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex-grow h-10 border flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer text-xs uppercase tracking-widest font-medium ${
                    inWishlist 
                      ? 'bg-gold border-gold text-charcoal' 
                      : 'border-white/10 text-gray-300 hover:bg-white/5 hover:border-gold hover:text-gold'
                  }`}
                >
                  <Heart size={13} fill={inWishlist ? "currentColor" : "none"} />
                  <span>{inWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Add to Cart & Instant Purchase Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="h-12 bg-charcoal border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-500 cursor-pointer flex items-center justify-center space-x-2 uppercase tracking-widest text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addedNotify ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      <span>Added Successfully</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="h-12 bg-gold hover:bg-gold-hover text-charcoal transition-colors duration-300 cursor-pointer flex items-center justify-center space-x-2 uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ boxShadow: "0 4px 15px rgba(197, 160, 89, 0.25)" }}
                >
                  <CreditCard size={14} />
                  <span>Buy It Now</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
