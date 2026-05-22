// ===================================
// PRODUCT FILTER FUNCTIONALITY
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const featuredCards = document.querySelectorAll('.featured-card');
const productCards = document.querySelectorAll('.product-card');
const sortSelect = document.getElementById('sortProducts');
const productsGrid = document.getElementById('productsGrid');
const noResults = document.getElementById('noResults');
const productCount = document.getElementById('productCount');

// Filter functionality for featured cards (index.html)
if (filterButtons.length > 0 && featuredCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            featuredCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Filter functionality for products page
if (filterButtons.length > 0 && productCards.length > 0) {
    let currentFilter = 'all';
    let currentSort = 'default';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentFilter = button.getAttribute('data-filter');
            filterAndSortProducts(currentFilter, currentSort);
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            filterAndSortProducts(currentFilter, currentSort);
        });
    }

    function filterAndSortProducts(filter, sort) {
        let visibleProducts = [];

        // Filter products
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                visibleProducts.push(card);
            } else {
                card.classList.add('hidden');
            }
        });

        // Sort products
        if (sort !== 'default' && visibleProducts.length > 0) {
            const productsArray = Array.from(visibleProducts);
            
            productsArray.sort((a, b) => {
                switch(sort) {
                    case 'price-low':
                        return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                    case 'price-high':
                        return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
                    case 'rating':
                        return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
                    case 'newest':
                        return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
                    default:
                        return 0;
                }
            });

            // Re-append sorted products
            productsArray.forEach(product => {
                productsGrid.appendChild(product);
            });
        }

        // Update product count
        if (productCount) {
            productCount.textContent = visibleProducts.length;
        }

        // Show/hide no results message
        if (noResults) {
            if (visibleProducts.length === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===================================
// CONTACT FORM VALIDATION
// ===================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (if provided)
        if (phone !== '' && !isValidPhone(phone)) {
            showError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', { name, email, phone, service, message });
            
            // Show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// ===================================
// NEWSLETTER FORM SUBMISSION
// ===================================
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const emailValue = emailInput.value.trim();
        
        if (emailValue !== '') {
            console.log('Newsletter subscription email:', emailValue);
            
            // Hide form and show success message
            newsletterForm.style.display = 'none';
            if (newsletterSuccess) {
                newsletterSuccess.style.display = 'block';
                newsletterSuccess.style.opacity = '0';
                newsletterSuccess.style.transform = 'translateY(10px)';
                newsletterSuccess.style.transition = 'all 0.5s ease';
                setTimeout(() => {
                    newsletterSuccess.style.opacity = '1';
                    newsletterSuccess.style.transform = 'translateY(0)';
                }, 50);
            }
            
            // Reset form after 5 seconds
            setTimeout(() => {
                newsletterForm.reset();
                newsletterForm.style.display = 'flex';
                if (newsletterSuccess) {
                    newsletterSuccess.style.display = 'none';
                }
            }, 5000);
        }
    });
}

// ===================================
// HELPER FUNCTIONS
// ===================================
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.featured-card, .value-card, .team-card, .service-card-large, .testimonial-card, .faq-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Run on page load
setActiveNavigation();

// ===================================
// FORM INPUT ANIMATIONS
// ===================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===================================
// PERFORMANCE: LAZY LOAD IMAGES (IF ANY)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c✦ Welcome to Luxe Jewelers ✦', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cCrafting timeless elegance since 1995', 'color: #666; font-size: 12px;');

// ===================================
// SHOPPING CART FUNCTIONALITY
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const cartTrigger = document.getElementById('cartTrigger');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartCount = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Initialize Cart
    let cart = JSON.parse(localStorage.getItem('luxe_cart')) || [];
    
    // Toggle Cart Drawer
    function openCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        }
    }
    
    function closeCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore body scroll
        }
    }
    
    if (cartTrigger) {
        cartTrigger.addEventListener('click', openCart);
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Save Cart to LocalStorage and Update
    function saveCart() {
        localStorage.setItem('luxe_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
    
    // Update Badge Counter
    function updateCartCount() {
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Animation pop effect
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Add Item to Cart
    function addToCart(name, price, image) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: parseFloat(price),
                image: image,
                quantity: 1
            });
        }
        
        saveCart();
        openCart(); // Show drawer immediately for premium feedback
    }
    
    // Render Cart HTML
    function renderCart() {
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="cart-empty-diamond-svg">
                        <path d="M6 3h12l4 6-10 12L2 9z"/>
                        <path d="M11 3l-3 6 4 12"/>
                        <path d="M13 3l3 6-4 12"/>
                        <path d="M2 9h20"/>
                    </svg>
                    <p>Your collection is currently empty.</p>
                    <a href="products.html" class="btn btn-primary" style="margin-top: 1rem;">Discover Pieces</a>
                </div>
            `;
            if (cartSubtotal) {
                cartSubtotal.textContent = '$0';
            }
            return;
        }
        
        let html = '';
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            html += `
                <div class="cart-item" data-index="${index}">
                    <img class="cart-item-img" src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                        <div class="cart-item-qty-row">
                            <div class="cart-item-qty">
                                <button class="qty-btn dec-btn" data-index="${index}">&minus;</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn inc-btn" data-index="${index}">&plus;</button>
                            </div>
                            <button class="cart-item-remove" data-index="${index}">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = html;
        
        if (cartSubtotal) {
            cartSubtotal.textContent = `$${subtotal.toLocaleString()}`;
        }
    }
    
    // Bind Add-to-Cart Buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                const name = card.querySelector('.product-name').textContent;
                const price = card.getAttribute('data-price');
                const image = card.querySelector('.product-image img').getAttribute('src');
                addToCart(name, price, image);
            }
        });
    });
    
    // Quantity Controls Event Delegation
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const index = parseInt(target.getAttribute('data-index'));
            
            if (isNaN(index)) return;
            
            if (target.classList.contains('inc-btn')) {
                cart[index].quantity += 1;
                saveCart();
            } else if (target.classList.contains('dec-btn')) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
            } else if (target.classList.contains('cart-item-remove')) {
                cart.splice(index, 1);
                saveCart();
            }
        });
    }
    
    // Mock Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your collection is empty.');
                return;
            }
            
            // Create elegant custom feedback modal for checkout
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.background = 'rgba(0, 0, 0, 0.85)';
            modal.style.backdropFilter = 'blur(15px)';
            modal.style.zIndex = '2000';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.animation = 'fadeIn 0.5s ease';
            
            modal.innerHTML = `
                <div class="checkout-success-modal" style="
                    background: linear-gradient(135deg, #161616 0%, #0c0c0c 100%);
                    border: 1px solid #c5a059;
                    padding: 3rem;
                    border-radius: 15px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 10px 40px rgba(197, 160, 89, 0.2);
                    animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                ">
                    <span style="font-size: 4rem; display: block; margin-bottom: 1.5rem; animation: pulse 2s infinite;">✦</span>
                    <h2 style="font-family: 'Cormorant Garamond', serif; color: #fff; font-size: 2.2rem; font-weight: 400; margin-bottom: 1rem; letter-spacing: 0.1em; text-transform: uppercase;">Purchase Completed</h2>
                    <p style="color: #c5a059; font-size: 1.1rem; font-weight: 500; margin-bottom: 1.5rem; font-family: 'Cormorant Garamond', serif; letter-spacing: 0.05em;">Timeless Elegance Awaits You</p>
                    <p style="color: #bbb; font-size: 0.95rem; line-height: 1.6; margin-bottom: 2.5rem; font-family: 'Montserrat', sans-serif;">Thank you for choosing Luxe Jewelers. Your order has been placed. Our personal concierge will contact you shortly to arrange complimentary insured white-glove shipping.</p>
                    <button id="closeCheckoutSuccess" class="btn btn-primary" style="width: 100%; letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 0;">Acknowledge</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            closeCart();
            
            // Add scaleUp keyframes if not present
            if (!document.getElementById('checkoutStyles')) {
                const style = document.createElement('style');
                style.id = 'checkoutStyles';
                style.innerHTML = `
                    @keyframes scaleUp {
                        from { transform: scale(0.9); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.getElementById('closeCheckoutSuccess').addEventListener('click', () => {
                modal.style.animation = 'fadeIn 0.3s ease reverse';
                setTimeout(() => {
                    modal.remove();
                }, 300);
                
                // Clear cart
                cart = [];
                saveCart();
            });
        });
    }
    
    // Initial Render
    updateCartCount();
    renderCart();
});

// ===================================
// TESTIMONIALS SLIDER CAROUSEL
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    // Create Dots
    cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoPlay();
        });
        if (dotsContainer) dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
    
    function goToSlide(index) {
        // Bounds checking
        if (index < 0) {
            index = cards.length - 1;
        } else if (index >= cards.length) {
            index = 0;
        }
        
        // Remove active class from old slide and dot
        cards[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
        
        // Update current index
        currentIndex = index;
        
        // Add active class to new slide and dot
        cards[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        });
    }
    
    // Auto Play Function
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 6000); // Shift every 6 seconds
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Initialize Auto Play
    startAutoPlay();
});
