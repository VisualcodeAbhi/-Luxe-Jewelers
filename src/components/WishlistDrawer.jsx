import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WishlistDrawer = () => {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart 
  } = useContext(ShopContext);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleQuickAdd = (product) => {
    addToCart(product, 1);
    // Optionally remove from wishlist after adding to cart
    // toggleWishlist(product);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur click close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={() => setIsWishlistOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-charcoal/95 border-l border-gold/15 backdrop-blur-xl flex flex-col justify-between h-full"
            >
              {/* Header */}
              <div className="px-5 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Heart size={18} className="text-gold" fill="currentColor" />
                  <h2 className="text-white text-lg font-serif uppercase tracking-widest">My Wishlist</h2>
                </div>
                
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="text-gray-400 hover:text-gold transition-colors duration-300 w-7 h-7 rounded-full border border-white/5 bg-white/2 flex items-center justify-center cursor-pointer"
                  aria-label="Close wishlist"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto px-5 py-6 space-y-6">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-16 h-16 rounded-full border border-dashed border-gold/35 flex items-center justify-center text-gold/60">
                      <Heart size={24} />
                    </div>
                    <div>
                      <p className="text-white text-base font-serif tracking-wider">Your wishlist is empty</p>
                      <p className="text-gray-500 text-xs mt-1.5 leading-relaxed font-light">Bookmark your favorite pieces to review them here anytime.</p>
                    </div>
                    <button
                      onClick={() => setIsWishlistOpen(false)}
                      className="text-gold text-xs uppercase tracking-widest border border-gold/30 hover:bg-gold hover:text-charcoal transition-all duration-300 px-4 py-2 mt-4 cursor-pointer font-medium"
                    >
                      Browse Inventory
                    </button>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <motion.div 
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex space-x-4 border-b border-white/5 pb-5 last:border-0 last:pb-0"
                    >
                      {/* Thumb */}
                      <div className="w-20 h-20 bg-charcoal/80 border border-white/5 flex-shrink-0 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Content details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-white text-sm font-serif tracking-wide line-clamp-1 pr-2">{product.name}</h3>
                            <span className="text-gold text-sm font-medium">{formatPrice(product.price)}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 block">{product.category}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          {/* Quick Add Button */}
                          <button
                            onClick={() => handleQuickAdd(product)}
                            className="text-[10px] text-white hover:text-gold uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer bg-white/2 border border-white/5 px-2.5 py-1 hover:border-gold/30"
                          >
                            <ShoppingCart size={11} />
                            <span>Add to Cart</span>
                          </button>

                          {/* Delete Item */}
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-gray-500 hover:text-red-400/80 transition-colors cursor-pointer p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer banner */}
              <div className="px-5 py-5 border-t border-white/5 bg-black/10 text-center text-[10px] text-gray-500 tracking-wider uppercase">
                Free Worldwide Insured Delivery
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
