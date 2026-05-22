import React, { useContext, useState } from 'react';
import { ShopContext } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Testimonials } from './components/Testimonials';
import { InstagramFeed } from './components/InstagramFeed';
import { Loader } from './components/Loader';
import { CursorGlow } from './components/CursorGlow';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Award, ShieldCheck, HeartHandshake, Gem, 
  MapPin, Phone, Mail, Clock, Send, Search, Check 
} from 'lucide-react';

export const App = () => {
  const { 
    currentTab, 
    navigateTo, 
    products, 
    activeCategory, 
    setActiveCategory, 
    sortBy, 
    setSortBy, 
    searchQuery, 
    setSearchQuery 
  } = useContext(ShopContext);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.id - a.id; // Assume higher IDs are newer
    return 0; // default / featured
  });

  // Page Transition Motion Settings
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white flex flex-col justify-between overflow-x-hidden selection:bg-gold selection:text-charcoal relative">
      
      {/* Cinematic Effects */}
      <Loader />
      <CursorGlow />
      <Navbar />

      {/* Global Shopping Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
      <CheckoutModal />

      {/* Main Single Page View Container */}
      <main className="flex-grow pt-20 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ================= HOME VIEW ================= */}
          {currentTab === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-24"
            >
              {/* Hero Banner Section */}
              <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background Banner Shimmer */}
                <div className="absolute inset-0 bg-[url('/images/eternal_elegance_banner.png')] bg-cover bg-center bg-no-repeat scale-105 filter brightness-[0.4] saturate-[0.8]" />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/50" />
                
                <div className="relative max-w-4xl mx-auto px-4 text-center space-y-6 z-10">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs uppercase tracking-[0.4em] font-semibold text-gold"
                  >
                    Est. 1995 • Haute Joaillerie
                  </motion.span>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.15em] font-serif leading-tight"
                    style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
                  >
                    Timeless Elegance <br />
                    <span className="text-gold italic font-normal">Redefined</span>
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-300 text-xs sm:text-sm tracking-[0.12em] font-light max-w-xl mx-auto leading-relaxed"
                  >
                    Crafting bespoke jewelry and royal diamond tiaras that celebrate life's most exquisite moments. Experience international high-fashion luxury.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-6"
                  >
                    <button
                      onClick={() => navigateTo('products')}
                      className="bg-gold hover:bg-gold-hover text-charcoal px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg shadow-gold/15"
                    >
                      Explore Collections
                    </button>
                  </motion.div>
                </div>
              </section>

              {/* High End Brand Values */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="glass-panel p-8 text-center space-y-4 border border-gold/15 gold-glow-hover hover:-translate-y-1 duration-500">
                    <div className="w-12 h-12 border border-gold/20 rounded-full flex items-center justify-center text-gold mx-auto bg-gold/5">
                      <Sparkles size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white text-lg font-serif tracking-widest uppercase">Bespoke Artistry</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                      Every gemstone is hand-selected and mounted by our master craftsmen to guarantee absolute artistic longevity.
                    </p>
                  </div>

                  <div className="glass-panel p-8 text-center space-y-4 border border-gold/15 gold-glow-hover hover:-translate-y-1 duration-500">
                    <div className="w-12 h-12 border border-gold/20 rounded-full flex items-center justify-center text-gold mx-auto bg-gold/5">
                      <Award size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white text-lg font-serif tracking-widest uppercase">Royal Credentials</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                      With over 50 global couture design laurels, we represent a premier standard in international jewelry luxury.
                    </p>
                  </div>

                  <div className="glass-panel p-8 text-center space-y-4 border border-gold/15 gold-glow-hover hover:-translate-y-1 duration-500">
                    <div className="w-12 h-12 border border-gold/20 rounded-full flex items-center justify-center text-gold mx-auto bg-gold/5">
                      <ShieldCheck size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white text-lg font-serif tracking-widest uppercase">Purity Guaranteed</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                      All diamonds and gold rest on certified ethical origins, with full verified documentation docket reports.
                    </p>
                  </div>
                </div>
              </section>

              {/* Home Featured Products Catalog Grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">Exquisite Pieces</span>
                    <h2 className="text-white text-3xl font-serif tracking-widest uppercase">The Signature Series</h2>
                    <div className="w-12 h-[1px] bg-gold/45 md:mx-0 mx-auto" />
                  </div>
                  <button
                    onClick={() => navigateTo('products')}
                    className="text-xs text-gold uppercase tracking-[0.2em] font-semibold border-b border-gold/30 pb-0.5 hover:text-white hover:border-white transition-colors duration-300"
                  >
                    View All Products &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </section>

              {/* High Fashion Showroom Editorial Split */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">Flagship Showroom</span>
                    <h2 className="text-white text-3xl md:text-4xl font-serif tracking-widest leading-snug uppercase">
                      A Sanctuary Of <br />Rare Gems
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                      Located in New York's historic Diamond District, our Fifth Avenue flagship showroom is designed as a sanctuary of absolute aesthetic luxury. Velvet panelings, custom acoustic gold domes, and champagne crystal fixtures provide a high-end personal boutique preview.
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                      We host private client viewings daily by appointment. Walk through bespoke gold tiaras, high-fashion necklaces, and certified gem carvings with our in-house geologists.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => navigateTo('contact')}
                        className="border border-gold text-gold hover:bg-gold hover:text-charcoal px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                      >
                        Book Private Tour
                      </button>
                    </div>
                  </div>

                  <div className="luxury-double-border gold-leaf-frame">
                    <img 
                      src="/images/flagship_showroom.png" 
                      alt="Flagship Showroom sanctuary" 
                      className="w-full aspect-[4/3] object-cover border border-gold/20"
                    />
                  </div>
                </div>
              </section>

              {/* Elite components */}
              <Testimonials />
              <InstagramFeed />

            </motion.div>
          )}

          {/* ================= PRODUCTS VIEW ================= */}
          {currentTab === 'products' && (
            <motion.div
              key="products"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              {/* Header */}
              <div className="text-center space-y-3">
                <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">FINE JEWELRY</span>
                <h1 className="text-white text-4xl font-serif tracking-widest uppercase">Our Master Catalog</h1>
                <p className="text-gray-400 text-xs tracking-wider max-w-md mx-auto leading-relaxed font-light">
                  Meticulously sorted and filtered to assist you in selecting the ultimate heirloom accent. Enjoy complimentary overnight secure transit on all orders.
                </p>
                <div className="w-12 h-[1px] bg-gold/45 mx-auto" />
              </div>

              {/* Advanced Real-time Search & Filter Panel */}
              <div className="glass-panel p-5 border border-gold/15 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-charcoal/60">
                {/* Search Bar Input */}
                <div className="relative flex-grow max-w-md">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                  <input
                    type="text"
                    placeholder="Search master collection (e.g. Sapphire, Swiss, Bridal)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light placeholder:text-gray-600"
                  />
                </div>

                {/* Sort By Dropdown */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <span className="text-gray-400 text-xs font-light">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-black/60 border border-white/10 px-4 py-2 text-xs text-gold focus:border-gold outline-none cursor-pointer"
                  >
                    <option value="default">Featured Collection</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Recent Releases</option>
                  </select>
                </div>
              </div>

              {/* Categorized Filter Buttons */}
              <div className="flex gap-2.5 overflow-x-auto pb-2 justify-start sm:justify-center border-b border-white/5">
                {['all', 'rings', 'necklaces', 'earrings', 'bracelets', 'watches', 'bridal'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4.5 py-2 text-[10px] uppercase tracking-widest font-semibold border transition-all duration-300 cursor-pointer ${
                      activeCategory === cat 
                        ? 'bg-gold border-gold text-charcoal font-bold' 
                        : 'border-white/10 text-gray-400 hover:text-white hover:border-gold/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Catalog Grid: 4 per row on desktop, 2 per row on mobile as requested! */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/1.5 border border-dashed border-white/5 space-y-4">
                  <div className="text-gold/45 text-2xl">✦</div>
                  <h3 className="text-white font-serif text-lg tracking-wider">No Precious Pieces Found</h3>
                  <p className="text-gray-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
                    No items matched your specific parameters. Try clearing search keywords or choosing alternate category categories.
                  </p>
                  <button
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="text-gold text-xs uppercase tracking-widest font-medium border border-gold/30 px-4 py-2 mt-2 hover:bg-gold hover:text-charcoal duration-300 cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {/* Results Count Summary */}
                  <div className="text-center text-xs text-gray-500 tracking-wider pt-6 border-t border-white/5">
                    Showing <strong className="text-white font-medium">{sortedProducts.length}</strong> of {products.length} luxury jewelry products
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ================= ABOUT US VIEW ================= */}
          {currentTab === 'about' && (
            <motion.div
              key="about"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24"
            >
              {/* editorial Story section */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">OUR JOURNEY</span>
                  <h1 className="text-white text-4xl font-serif tracking-widest uppercase">The Heritage Story</h1>
                  <p className="editorial-dropcap text-gray-300 text-xs sm:text-sm font-light leading-relaxed text-justify">
                    Founded in 1995, Luxe Jewelers has been a cornerstone of fine jewelry craftsmanship for over 25 years. What started as a small family workshop has grown into one of the most trusted names in luxury jewelry, celebrated globally for its high-fashion bespoke creations.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed text-justify">
                    Our founder, Master Craftsman Robert Sterling, envisioned a place where traditional artistry meets contemporary design. Today, we continue that legacy, combining time-honored techniques with innovative design to create pieces that celebrate life's most precious moments.
                  </p>
                  
                  {/* Cursive Signature Card */}
                  <div className="border border-gold/15 p-5 bg-white/2 space-y-4">
                    <p className="text-gold text-xs italic leading-relaxed font-light">
                      "True luxury lies in the unseen details—the dedication of the craftsman, the selection of the perfect gem, and the heritage that resides in every piece."
                    </p>
                    <div className="flex items-center space-x-3 pt-2">
                      <svg viewBox="0 0 200 60" fill="none" stroke="#c5a059" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[120px] h-[36px]">
                        <path d="M20,45 C25,25 35,5 30,15 C25,25 15,35 25,35 C35,35 45,15 50,30 C55,45 60,40 65,30 C70,20 75,30 80,35 C85,40 90,30 95,25 C100,20 105,30 110,35 C115,40 120,25 125,20 C130,15 135,30 140,35 C145,40 150,25 155,20 C160,15 165,35 170,30 C175,25 180,30 190,25" />
                        <path d="M15,22 L45,22" />
                      </svg>
                      <div>
                        <cite className="text-white text-xs font-serif not-italic font-medium block">Robert Sterling</cite>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-light">Founder & Master Craftsman</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="luxury-double-border gold-leaf-frame">
                  <img 
                    src="/images/flagship_showroom.png" 
                    alt="Sanctuary studio showroom" 
                    className="w-full aspect-[4/3] object-cover border border-gold/20"
                  />
                </div>
              </section>

              {/* Legacy Timeline Section with Glowing Rotating Diamonds */}
              <section className="space-y-12">
                <div className="text-center space-y-2">
                  <h2 className="text-white text-2xl md:text-3xl font-serif tracking-widest uppercase">Chronological Landmark</h2>
                  <div className="w-10 h-[1px] bg-gold/45 mx-auto" />
                </div>

                <div className="max-w-3xl mx-auto relative border-l border-gold/20 pl-8 ml-4 md:ml-auto space-y-12 py-4">
                  
                  {/* Node 1 */}
                  <div className="relative space-y-2.5">
                    {/* Glowing timeline dot */}
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-charcoal border border-gold flex items-center justify-center text-[10px] text-gold animate-pulse">
                      ✦
                    </div>
                    <span className="text-gold text-sm tracking-widest font-semibold font-serif">1995</span>
                    <div className="glass-panel p-5 border border-white/5">
                      <h4 className="text-white text-sm font-serif font-medium uppercase tracking-wider mb-1.5">The Workshop Genesis</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-light">
                        Robert Sterling establishes a small workshop in New York's historic Diamond District, dedicated strictly to bespoke, hand-crafted gold mounts.
                      </p>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="relative space-y-2.5">
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-charcoal border border-gold flex items-center justify-center text-[10px] text-gold">
                      ✦
                    </div>
                    <span className="text-gold text-sm tracking-widest font-semibold font-serif">2005</span>
                    <div className="glass-panel p-5 border border-white/5">
                      <h4 className="text-white text-sm font-serif font-medium uppercase tracking-wider mb-1.5">Royal Recognition</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-light">
                        Luxe Jewelers receives prestigious design awards for exceptional high-jewelry collections, solidifying our rank among master artisans.
                      </p>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="relative space-y-2.5">
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-charcoal border border-gold flex items-center justify-center text-[10px] text-gold">
                      ✦
                    </div>
                    <span className="text-gold text-sm tracking-widest font-semibold font-serif">2015</span>
                    <div className="glass-panel p-5 border border-white/5">
                      <h4 className="text-white text-sm font-serif font-medium uppercase tracking-wider mb-1.5">Fifth Avenue Flagship</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-light">
                        We open our flagship showroom on Fifth Avenue, introducing a collection of certified diamonds that celebrate life's most precious moments.
                      </p>
                    </div>
                  </div>

                  {/* Node 4 */}
                  <div className="relative space-y-2.5">
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-charcoal border border-gold flex items-center justify-center text-[10px] text-gold animate-pulse">
                      ✦
                    </div>
                    <span className="text-gold text-sm tracking-widest font-semibold font-serif">2026</span>
                    <div className="glass-panel p-5 border border-white/5">
                      <h4 className="text-white text-sm font-serif font-medium uppercase tracking-wider mb-1.5">A Digital Showroom</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-light">
                        Bridging traditional craftsmanship and modern design, we launch our digital collection, providing an exquisite, bespoke online experience worldwide.
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Master Craftsmen Section */}
              <section className="space-y-12">
                <div className="text-center space-y-2">
                  <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">THE ARTISANS</span>
                  <h2 className="text-white text-2xl md:text-3xl font-serif tracking-widest uppercase">Meet Our Master Craftsmen</h2>
                  <div className="w-10 h-[1px] bg-gold/45 mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Robert */}
                  <div className="text-center space-y-4">
                    <div className="aspect-[4/5] overflow-hidden border border-gold/15 gold-leaf-frame bg-charcoal">
                      <img src="/images/team_robert.png" alt="Robert Sterling" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-serif tracking-wide">Robert Sterling</h4>
                      <p className="text-gold text-[10px] uppercase tracking-wider mt-0.5">Founder / Gem Carver</p>
                      <p className="text-gray-500 text-[11px] font-light mt-2 max-w-[200px] mx-auto leading-relaxed">
                        30+ years of fine jewelry design and gemstone mounting expertise.
                      </p>
                    </div>
                  </div>

                  {/* Sophia */}
                  <div className="text-center space-y-4">
                    <div className="aspect-[4/5] overflow-hidden border border-gold/15 gold-leaf-frame bg-charcoal">
                      <img src="/images/team_sophia.png" alt="Sophia Martinez" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-serif tracking-wide">Sophia Martinez</h4>
                      <p className="text-gold text-[10px] uppercase tracking-wider mt-0.5">Lead Designer</p>
                      <p className="text-gray-500 text-[11px] font-light mt-2 max-w-[200px] mx-auto leading-relaxed">
                        Award-winning artist in contemporary high-fashion boutique styling.
                      </p>
                    </div>
                  </div>

                  {/* David */}
                  <div className="text-center space-y-4">
                    <div className="aspect-[4/5] overflow-hidden border border-gold/15 gold-leaf-frame bg-charcoal">
                      <img src="/images/team_david.png" alt="David Chen" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-serif tracking-wide">David Chen</h4>
                      <p className="text-gold text-[10px] uppercase tracking-wider mt-0.5">Lead Gemologist</p>
                      <p className="text-gray-500 text-[11px] font-light mt-2 max-w-[200px] mx-auto leading-relaxed">
                        Certified expert in rare precious diamonds and gemstone sourcing.
                      </p>
                    </div>
                  </div>

                  {/* Emma */}
                  <div className="text-center space-y-4">
                    <div className="aspect-[4/5] overflow-hidden border border-gold/15 gold-leaf-frame bg-charcoal">
                      <img src="/images/team_emma.png" alt="Emma Thompson" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-serif tracking-wide">Emma Thompson</h4>
                      <p className="text-gold text-[10px] uppercase tracking-wider mt-0.5">VIP Guest Host</p>
                      <p className="text-gray-500 text-[11px] font-light mt-2 max-w-[200px] mx-auto leading-relaxed">
                        Dedicated director of VIP guest hosting and bespoke shopping experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ================= SERVICES VIEW ================= */}
          {currentTab === 'services' && (
            <motion.div
              key="services"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              {/* Header */}
              <div className="text-center space-y-3">
                <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">VIP ASSISTANCE</span>
                <h1 className="text-white text-4xl font-serif tracking-widest uppercase">Our Signature Services</h1>
                <p className="text-gray-400 text-xs tracking-wider max-w-md mx-auto leading-relaxed font-light">
                  Tailored consulting programs to preserve, custom craft, and certifiably verify your priceless acquisitions.
                </p>
                <div className="w-12 h-[1px] bg-gold/45 mx-auto" />
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Custom Tiara Design */}
                <div className="glass-panel p-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 border border-gold/15 bg-charcoal/40 gold-glow-hover Shimmer-container">
                  <div className="w-12 h-12 rounded-full border border-gold/25 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0">
                    <Gem size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white text-lg font-serif tracking-widest uppercase">Bespoke Jewelry Commissions</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                      Collaborate privately with Robert Sterling and our lead artisans to forge custom tiaras, engagement masterworks, and matching high-fashion collections forged uniquely to your creative blueprint.
                    </p>
                  </div>
                </div>

                {/* Sizing & Customization */}
                <div className="glass-panel p-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 border border-gold/15 bg-charcoal/40 gold-glow-hover Shimmer-container">
                  <div className="w-12 h-12 rounded-full border border-gold/25 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0">
                    <Sparkles size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white text-lg font-serif tracking-widest uppercase">Elite Custom Sizing</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                      Our boutique offers micro-precision adjustment fittings for all necklaces, rings, and integrated luxury watch bracelets to assure comfort fit and flawless alignment.
                    </p>
                  </div>
                </div>

                {/* Valuation */}
                <div className="glass-panel p-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 border border-gold/15 bg-charcoal/40 gold-glow-hover Shimmer-container">
                  <div className="w-12 h-12 rounded-full border border-gold/25 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0">
                    <Award size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white text-lg font-serif tracking-widest uppercase">Certified Diamond Valuations</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                      Verify gem color grading, laser cut quality, and carat weight statistics. Our certified in-house diamond appraisers provide complete formal docket verification for insurance claims.
                    </p>
                  </div>
                </div>

                {/* Lifetime Restoration */}
                <div className="glass-panel p-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 border border-gold/15 bg-charcoal/40 gold-glow-hover Shimmer-container">
                  <div className="w-12 h-12 rounded-full border border-gold/25 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0">
                    <HeartHandshake size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white text-lg font-serif tracking-widest uppercase">Insured Lifetime Restoration</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                      Ensure your family heirlooms continue to shine eternally. We provide ultra-sonic cleaning baths, stone prong inspections, and complete metal repolishing programs for valued patrons.
                    </p>
                  </div>
                </div>

              </div>

              {/* Booking CTA banner */}
              <div className="border border-gold/15 p-8 text-center space-y-4 max-w-2xl mx-auto bg-white/2">
                <h3 className="text-white text-xl font-serif tracking-wide uppercase">Request Custom Concierge Assistance</h3>
                <p className="text-gray-400 text-xs font-light max-w-sm mx-auto leading-relaxed">
                  Our private geologists and concierge directors stand prepared to host your personal request.
                </p>
                <button
                  onClick={() => navigateTo('contact')}
                  className="bg-gold hover:bg-gold-hover text-charcoal px-6 py-3 text-xs uppercase tracking-widest font-bold duration-300 mt-2 cursor-pointer"
                >
                  Initiate Commission
                </button>
              </div>

            </motion.div>
          )}

          {/* ================= CONTACT VIEW ================= */}
          {currentTab === 'contact' && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              {/* Header */}
              <div className="text-center space-y-3">
                <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">GET IN TOUCH</span>
                <h1 className="text-white text-4xl font-serif tracking-widest uppercase">The Guest Registry</h1>
                <p className="text-gray-400 text-xs tracking-wider max-w-md mx-auto leading-relaxed font-light">
                  Submit a message to our showroom directors or locate our Fifth Avenue boutique district.
                </p>
                <div className="w-12 h-[1px] bg-gold/45 mx-auto" />
              </div>

              {/* Editorial split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* Left Side: Contact Information details */}
                <div className="space-y-8 bg-charcoal/50 border border-gold/15 p-6 md:p-8">
                  <h3 className="text-white text-xl font-serif tracking-widest uppercase border-b border-white/5 pb-3">Showroom Registry</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-gold mt-1 flex-shrink-0" size={18} />
                      <div className="space-y-1">
                        <strong className="text-white text-xs uppercase tracking-wider font-semibold block">Address</strong>
                        <span className="text-gray-400 text-xs font-light leading-relaxed block">
                          123 Luxury Lane, Diamond District,<br />New York, NY 10001
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="text-gold mt-1 flex-shrink-0" size={18} />
                      <div className="space-y-1">
                        <strong className="text-white text-xs uppercase tracking-wider font-semibold block">Phone Line</strong>
                        <a href="tel:+15551234567" className="text-gray-400 text-xs font-light hover:text-gold transition-colors block">
                          (555) 123-4567
                        </a>
                        <span className="text-[9px] text-gray-500 tracking-wider block">Toll-Free Worldwide VIP Hotline</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="text-gold mt-1 flex-shrink-0" size={18} />
                      <div className="space-y-1">
                        <strong className="text-white text-xs uppercase tracking-wider font-semibold block">Email Dispatch</strong>
                        <a href="mailto:info@luxejewelers.com" className="text-gray-400 text-xs font-light hover:text-gold transition-colors block">
                          info@luxejewelers.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="text-gold mt-1 flex-shrink-0" size={18} />
                      <div className="space-y-1">
                        <strong className="text-white text-xs uppercase tracking-wider font-semibold block">Hours of Operation</strong>
                        <span className="text-gray-400 text-xs font-light block">Monday - Friday: 10:00 AM - 7:00 PM</span>
                        <span className="text-gray-400 text-xs font-light block">Saturday: 10:00 AM - 6:00 PM</span>
                        <span className="text-red-400/80 text-xs font-light block">Sunday: Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Secure message Registry Input Form */}
                <div className="glass-panel p-6 md:p-8 border border-gold/15 bg-charcoal/30 relative">
                  <h3 className="text-white text-xl font-serif tracking-widest uppercase border-b border-white/5 pb-3 mb-6">Send Secure Inquiry</h3>
                  
                  <AnimatePresence mode="wait">
                    {formSent ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                      >
                        <div className="w-14 h-14 rounded-full border border-gold flex items-center justify-center text-gold">
                          <Check size={24} />
                        </div>
                        <h4 className="text-white text-lg font-serif uppercase tracking-widest">Inquiry Dispatched</h4>
                        <p className="text-gray-400 text-xs max-w-[280px] leading-relaxed font-light">
                          Your communication has resolved on our client ledger. A VIP hosting director will follow-up within 12 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="Detail your request or commission inquiry..."
                            required
                            rows={5}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-gold outline-none transition-colors font-light"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full h-11 bg-gold hover:bg-gold-hover text-charcoal transition-colors duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-xs font-bold cursor-pointer"
                        >
                          <Send size={12} />
                          <span>Dispatch Communication</span>
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};
