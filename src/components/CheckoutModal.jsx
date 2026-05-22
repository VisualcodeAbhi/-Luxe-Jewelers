import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Lock, CheckCircle, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    clearCart 
  } = useContext(ShopContext);

  if (!isCheckoutOpen) return null;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardHolder: ''
  });

  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
  const [orderId, setOrderId] = useState('');

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate premium transaction gateway latency (2.5 seconds)
    setTimeout(() => {
      setOrderId('LX-' + Math.floor(100000 + Math.random() * 900000));
      setPaymentStatus('success');
      clearCart();
    }, 2500);
  };

  const taxAmount = cartSubtotal * 0.088; // 8.8% Simulated NY Tax
  const finalTotal = cartSubtotal + taxAmount;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 pt-24"
      >
        {/* Backdrop click close */}
        {paymentStatus !== 'processing' && (
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsCheckoutOpen(false)}
          />
        )}

        <motion.div
          initial={{ y: 50, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl glass-panel bg-charcoal/95 border border-gold/20 overflow-hidden flex flex-col z-10"
        >
          {/* Close Button */}
          {paymentStatus !== 'processing' && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors duration-300 w-8 h-8 rounded-full border border-white/5 bg-charcoal/80 flex items-center justify-center z-30 cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )}

          {paymentStatus === 'success' ? (
            /* ================= SUCCESS SCREEN ================= */
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-16 flex flex-col items-center text-center space-y-6 max-w-xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                className="w-20 h-20 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold"
              >
                <CheckCircle size={40} />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-white text-3xl font-serif tracking-widest uppercase">Transaction Authorized</h2>
                <p className="text-gold text-xs uppercase tracking-[0.25em] font-medium">Thank you for your patronage</p>
              </div>

              <div className="w-full bg-white/2 border border-white/5 p-5 text-left text-xs font-light space-y-3.5 my-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Order Reference:</span>
                  <strong className="text-white font-medium">{orderId}</strong>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Delivery Address:</span>
                  <span className="text-white font-medium text-right max-w-[200px] line-clamp-1">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Method:</span>
                  <span className="text-white font-medium">Insured Express Courier</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-400">Total Authorized:</span>
                  <strong className="text-gold font-normal text-sm">{formatPrice(finalTotal)}</strong>
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed max-w-md font-light">
                A verification email and luxury tracking docket has been forwarded to <strong className="text-white font-medium">{formData.email}</strong>. Our courier will contact you shortly to coordinate hand-off.
              </p>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="bg-gold hover:bg-gold-hover text-charcoal px-8 py-3 text-xs uppercase tracking-widest font-bold transition-colors duration-300 mt-6 cursor-pointer"
              >
                Return to Store
              </button>
            </motion.div>
          ) : (
            /* ================= CHECKOUT FORM VIEW ================= */
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Side: Fields Form */}
              <form onSubmit={handlePaymentSubmit} className="p-6 md:p-10 space-y-8 border-b md:border-b-0 md:border-r border-white/5 overflow-y-auto max-h-[85vh]">
                <div className="flex items-center space-x-2 pb-4 border-b border-white/5">
                  <Lock size={15} className="text-gold" />
                  <h2 className="text-white text-lg font-serif uppercase tracking-widest">Secure Checkout</h2>
                </div>

                {/* Section 1: Billing & Delivery */}
                <div className="space-y-4">
                  <h3 className="text-gold text-xs uppercase tracking-widest font-semibold">1. Delivery Destination</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Shipping Address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                      />
                      <input
                        type="text"
                        name="zip"
                        placeholder="Postal ZIP Code"
                        required
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Premium Payment Simulator */}
                <div className="space-y-5">
                  <h3 className="text-gold text-xs uppercase tracking-widest font-semibold">2. Luxury Credit Card</h3>
                  
                  {/* Glowing Metal Card Graphic Mock */}
                  <div className="relative w-full aspect-[1.586/1] bg-gradient-to-tr from-[#141414] via-[#241f17] to-[#121212] border border-gold/30 p-6 flex flex-col justify-between overflow-hidden shadow-2xl rounded-sm">
                    {/* Glow Overlay */}
                    <div className="absolute inset-0 bg-radial from-gold/5 to-transparent pointer-events-none" />
                    
                    <div className="flex justify-between items-start z-10">
                      <div className="text-gold text-[10px] tracking-[0.2em] font-light">LUXE PRIVÉ</div>
                      <div className="text-white/40 text-xs"><CreditCard size={18} className="text-gold/60" /></div>
                    </div>

                    {/* Chip Graphic */}
                    <div className="w-9 h-7 bg-gradient-to-r from-gold/30 to-gold/60 border border-gold/40 rounded-xs z-10" />

                    <div className="space-y-2 z-10">
                      <div className="text-white text-base md:text-lg tracking-[0.2em] font-light font-sans font-medium">
                        {formData.cardNumber ? formData.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-gray-500 text-[7px] uppercase tracking-wider">Card Holder</div>
                          <div className="text-white text-[10px] uppercase tracking-wider font-light line-clamp-1 max-w-[150px]">
                            {formData.cardHolder || 'VALUED CUSTOMER'}
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-500 text-[7px] uppercase tracking-wider">Expires</div>
                          <div className="text-white text-[10px] tracking-wider font-light">
                            {formData.cardExpiry || 'MM/YY'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Card Inputs */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="Cardholder Name"
                      required
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      maxLength={16}
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light font-sans"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                      />
                      <input
                        type="text"
                        name="cardCvc"
                        placeholder="CVC"
                        maxLength={3}
                        required
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={paymentStatus === 'processing'}
                  className="w-full h-12 bg-gold hover:bg-gold-hover text-charcoal transition-colors duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-xs font-bold disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
                  style={{ boxShadow: "0 4px 15px rgba(197, 160, 89, 0.25)" }}
                >
                  <Lock size={13} />
                  <span>
                    {paymentStatus === 'processing' ? 'Authorizing Secure Payment...' : `Authorize ${formatPrice(finalTotal)}`}
                  </span>
                </button>
              </form>

              {/* Right Side: Order Summary Checkout Detail */}
              <div className="p-6 md:p-10 bg-black/20 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
                <div className="space-y-6">
                  <h3 className="text-white text-sm font-serif tracking-widest uppercase pb-3 border-b border-white/5">Order Ledger</h3>
                  
                  {/* Cart Item Rows */}
                  <div className="space-y-4 divide-y divide-white/5">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="flex justify-between items-center pt-4 first:pt-0">
                        <div className="flex items-center space-x-3 pr-4">
                          <div className="w-12 h-12 border border-white/5 bg-charcoal/80 overflow-hidden flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-white text-xs font-serif tracking-wide line-clamp-1">{product.name}</h4>
                            <span className="text-[9px] text-gray-500 tracking-wider block">Qty: {quantity} &times; {formatPrice(product.price)}</span>
                          </div>
                        </div>
                        <span className="text-gold text-xs font-medium">{formatPrice(product.price * quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotals & Fees */}
                <div className="pt-6 border-t border-white/5 space-y-3.5 mt-8">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Simulated State Sales Tax (8.8%)</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Delivery Courier (Insured Night)</span>
                    <span className="text-gold uppercase text-[9px] font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-white font-serif text-base tracking-widest pt-4 border-t border-white/5 mt-4">
                    <span>Total Bill</span>
                    <span className="text-gold text-lg">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
