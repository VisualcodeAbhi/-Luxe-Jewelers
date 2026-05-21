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
