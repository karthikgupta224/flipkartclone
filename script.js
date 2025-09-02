/**
 * Flipkart Clone - Main JavaScript File
 * 
 * Features:
 * - Product search functionality
 * - Interactive product cards
 * - Responsive navigation
 * - Cart simulation
 * - Error handling for images
 * - Accessibility enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.querySelector('.header__search-input');
    const searchButton = document.querySelector('.header__search-button');
    const productCards = document.querySelectorAll('.product-card');
    const viewAllButton = document.querySelector('.section__view-all');
    const loginButton = document.querySelector('.header__login');
    const navItems = document.querySelectorAll('.nav__item');
    const cartButton = document.querySelector('.header__cart');
    
    // State Management
    const state = {
        cart: [],
        products: [
            {
                id: 1,
                name: "APPLE iPhone 14 (Blue, 128 GB)",
                price: 58999,
                discount: 6000,
                image: "https://rukminim1.flixcart.com/image/312/312/xif0q/mobile/m/o/b/-original-imaghx9qkugt2rnv.jpeg?q=70"
            },
            {
                id: 2,
                name: "HP Pavilion Ryzen 5 Hexa Core",
                price: 54990,
                discount: 4000,
                image: "https://rukminim1.flixcart.com/image/312/312/xif0q/computer/z/n/q/-original-imagjuewzzgwzezj.jpeg?q=70"
            },
            // Add other products similarly
        ]
    };

    // Initialize the application
    init();

    function init() {
        // Set up event listeners
        setupEventListeners();
        
        // Handle broken images
        handleImageErrors();
        
        // Initialize any other required functionality
        console.log('Flipkart clone initialized');
    }

    function setupEventListeners() {
        // Search functionality
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSearch();
        });

        // Product interactions
        productCards.forEach(card => {
            card.addEventListener('click', handleProductClick);
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleProductClick.call(this, e);
                }
            });
        });

        // View all button
        viewAllButton.addEventListener('click', handleViewAll);

        // Login button
        loginButton.addEventListener('click', handleLogin);

        // Navigation items
        navItems.forEach(item => {
            item.addEventListener('click', handleNavItemClick);
        });

        // Cart button
        cartButton.addEventListener('click', handleCartClick);
    }

    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.onerror = function() {
                // Fallback to placeholder image
                this.src = 'https://via.placeholder.com/312x312.png?text=Product+Image';
                this.alt = 'Image not available';
                console.warn(`Image failed to load: ${this.dataset.src || this.src}`);
            };
            
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            // In a real app, this would trigger an API call or filter products
            displaySearchResults(searchTerm);
            
            // Clear the input
            searchInput.value = '';
            
            // For demo purposes, just show an alert
            showFeedback(`Showing results for: ${searchTerm}`);
        } else {
            showFeedback('Please enter a search term', 'error');
            searchInput.focus();
        }
    }

    function displaySearchResults(term) {
        // This would be replaced with actual search logic
        const results = state.products.filter(product => 
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        
        console.log(`Found ${results.length} products matching "${term}"`);
    }

    function handleProductClick(event) {
        // Get product ID from data attribute or other source
        const productId = this.dataset.productId || 
                         Array.from(productCards).indexOf(this) + 1;
        
        console.log(`Product clicked: ${productId}`);
        
        // In a real app, this would navigate to product detail page
        showFeedback(`Added product to cart`);
        
        // Add to cart
        addToCart(productId);
    }

    function addToCart(productId) {
        const product = state.products.find(p => p.id === productId);
        
        if (product) {
            state.cart.push(product);
            updateCartCount();
            console.log(`Added to cart: ${product.name}`);
        }
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        
        if (!cartCount) {
            // Create cart count element if it doesn't exist
            const countEl = document.createElement('span');
            countEl.className = 'cart-count';
            countEl.textContent = state.cart.length;
            cartButton.appendChild(countEl);
        } else {
            cartCount.textContent = state.cart.length;
        }
    }

    function handleViewAll() {
        console.log('View all products clicked');
        // In a real app, this would show all products
        showFeedback('Showing all products');
    }

    function handleLogin() {
        console.log('Login button clicked');
        // Simulate login modal
        showFeedback('Login/Signup modal would appear here');
    }

    function handleNavItemClick() {
        const category = this.querySelector('span').textContent;
        console.log(`Category selected: ${category}`);
        showFeedback(`Showing ${category} products`);
    }

    function handleCartClick() {
        console.log('Cart button clicked');
        console.log('Current cart:', state.cart);
        
        if (state.cart.length > 0) {
            showFeedback(`You have ${state.cart.length} items in your cart`);
        } else {
            showFeedback('Your cart is empty');
        }
    }

    function showFeedback(message, type = 'success') {
        // Remove any existing feedback
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `feedback-message feedback-${type}`;
        feedback.textContent = message;
        
        // Add to DOM
        document.body.appendChild(feedback);
        
        // Position and style (would be handled by CSS)
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.padding = '12px 20px';
        feedback.style.backgroundColor = type === 'error' ? '#ff6161' : '#2874f0';
        feedback.style.color = 'white';
        feedback.style.borderRadius = '4px';
        feedback.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        feedback.style.zIndex = '1000';
        feedback.style.animation = 'fadeIn 0.3s ease-out';
        
        // Auto-remove after delay
        setTimeout(() => {
            feedback.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    // Add CSS for feedback animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(10px); }
        }
    `;
    document.head.appendChild(style);
});
// Add to your existing JavaScript
function setupLoginDropdown() {
    const loginContainer = document.querySelector('.login-container');
    const loginDropdown = document.querySelector('.login-dropdown');
    
    // Show dropdown on hover
    loginContainer.addEventListener('mouseenter', function() {
        loginDropdown.style.opacity = '1';
        loginDropdown.style.visibility = 'visible';
        loginDropdown.style.transform = 'translateY(0)';
    });
    
    // Hide dropdown when mouse leaves
    loginContainer.addEventListener('mouseleave', function() {
        loginDropdown.style.opacity = '0';
        loginDropdown.style.visibility = 'hidden';
        loginDropdown.style.transform = 'translateY(10px)';
    });
    
    // Handle dropdown item clicks
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('span').textContent;
            showFeedback(`${itemName} clicked - would navigate to ${itemName} page`);
        });
    });
    
    // Handle signup link
    const signupLink = document.querySelector('.signup-link');
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showFeedback('Sign Up form would appear here');
    });
}

// Call this in your init function
function init() {
    setupEventListeners();
    handleImageErrors();
    setupLoginDropdown(); // Add this line
    console.log('Flipkart clone initialized');
}
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  
  // State
  let currentIndex = 0;
  const slideCount = slides.length;
  let slideInterval;
  let isHovering = false;

  // Initialize
  function initSlider() {
    updateSlider();
    startAutoSlide();
    addEventListeners();
  }

  // Update slider position
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update ARIA attributes
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
      slide.setAttribute('aria-hidden', index !== currentIndex);
    });
    
    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive);
      dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  // Navigation functions
  function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    else if (index >= slideCount) index = 0;
    
    currentIndex = index;
    updateSlider();
    resetAutoSlide();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Auto-slide control
  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      if (!isHovering) nextSlide();
    }, 5000);
  }

  function resetAutoSlide() {
    startAutoSlide();
  }

  // Event listeners
  function addEventListeners() {
    // Button controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.dataset.slide));
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Pause on hover
    sliderTrack.addEventListener('mouseenter', () => {
      isHovering = true;
    });
    
    sliderTrack.addEventListener('mouseleave', () => {
      isHovering = false;
      resetAutoSlide();
    });
    
    // Touch events
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) nextSlide();
      if (touchEndX > touchStartX + threshold) prevSlide();
    }
  }

  // Initialize
  initSlider();
});