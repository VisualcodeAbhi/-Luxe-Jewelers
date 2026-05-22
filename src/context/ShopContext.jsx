import React, { createContext, useState, useEffect } from 'react';
import { products } from '../data/products';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation Routing (SPA)
  const [currentTab, setCurrentTab] = useState(() => {
    return localStorage.getItem('luxe_currentTab') || 'home';
  });

  // State initialization with localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('luxe_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('luxe_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Filters and Sorting
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  // UI Control Triggers
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Synchronize tabs, carts, and wishlists to localStorage
  useEffect(() => {
    localStorage.setItem('luxe_currentTab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Functions
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity }];
    });
    // Trigger small animation or notify
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyIn = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyIn) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Helper values
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Navigate to top of page smoothly when changing tabs
  const navigateTo = (tabName) => {
    setCurrentTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currentTab,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartTotalItems,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
        activeProductDetail,
        setActiveProductDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
