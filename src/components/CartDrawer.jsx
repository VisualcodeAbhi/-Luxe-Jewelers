import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQty, 
    removeFromCart, 
    cartSubtotal, 
    setIsCheckoutOpen 
  } = useContext(ShopContext);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur click close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={() => setIsCartOpen(false)}
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
                  <ShoppingBag size={18} className="text-gold" />
                  <h2 className="text-white text-lg font-serif uppercase tracking-widest">Shopping Cart</h2>
                </div>
                
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gold transition-colors duration-300 w-7 h-7 rounded-full border border-white/5 bg-white/2 flex items-center justify-center cursor-pointer"
                  aria-label="Close cart"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto px-5 py-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-16 h-16 rounded-full border border-dashed border-gold/35 flex items-center justify-center text-gold/60">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <p className="text-white text-base font-serif tracking-wider">Your cart is empty</p>
                      <p className="text-gray-500 text-xs mt-1.5 leading-relaxed font-light">Explore our curated collections and begin your luxury journey.</p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gold text-xs uppercase tracking-widest border border-gold/30 hover:bg-gold hover:text-charcoal transition-all duration-300 px-4 py-2 mt-4 cursor-pointer font-medium"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
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
                            <span className="text-gold text-sm font-medium">{formatPrice(product.price * quantity)}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 block">{product.category}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          {/* Qty count control */}
                          <div className="flex items-center border border-white/10 bg-black/40">
                            <button
                              onClick={() => updateCartQty(product.id, quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-white">{quantity}</span>
                            <button
                              onClick={() => updateCartQty(product.id, quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeFromCart(product.id)}
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

              {/* Summary Footer */}
              {cart.length > 0 && (
                <div className="px-5 py-6 border-t border-white/5 bg-black/30 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400 tracking-wider">
                      <span>Complimentary Shipping</span>
                      <span className="text-gold uppercase text-[9px] font-bold">Standard Free</span>
                    </div>
                    <div className="flex justify-between text-white font-serif text-base tracking-widest pt-2 border-t border-white/5">
                      <span>Subtotal</span>
                      <span className="text-gold">{formatPrice(cartSubtotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full h-12 bg-gold hover:bg-gold-hover text-charcoal transition-colors duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-xs font-bold cursor-pointer"
                    style={{ boxShadow: "0 4px 15px rgba(197, 160, 89, 0.25)" }}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
