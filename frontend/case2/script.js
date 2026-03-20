// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeButtonRedirects();
    initializeParkingAnimation();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.about, .how-it-works, .features, .footer');
    sections.forEach(section => {
        section.classList.add('fade-in-on-scroll');
        observer.observe(section);
    });

    // Animate individual cards and steps
    const cards = document.querySelectorAll('.step, .feature-card, .stat-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Button redirect functionality
function initializeButtonRedirects() {
    const subscribedBtn = document.getElementById('subscribed-btn');
    const guestBtn = document.getElementById('guest-btn');

    subscribedBtn.addEventListener('click', function() {
        // Add loading state
        this.style.opacity = '0.7';
        this.style.transform = 'scale(0.98)';
        
        // Simulate redirect with smooth transition
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 200);
    });

    guestBtn.addEventListener('click', function() {
        // Add loading state
        this.style.opacity = '0.7';
        this.style.transform = 'scale(0.98)';
        
        // Simulate redirect with smooth transition
        setTimeout(() => {
            window.location.href = 'guest-form.html';
        }, 200);
    });
}

// Parking slots animation
function initializeParkingAnimation() {
    const parkingSlots = document.querySelectorAll('.parking-slot');
    
    // Random animation intervals for parking slots
    parkingSlots.forEach((slot, index) => {
        setInterval(() => {
            slot.style.transform = `scale(${0.95 + Math.random() * 0.1})`;
            setTimeout(() => {
                slot.style.transform = 'scale(1)';
            }, 200);
        }, 2000 + index * 500);
    });

    // Simulate parking availability changes
    setInterval(() => {
        const randomSlot = parkingSlots[Math.floor(Math.random() * parkingSlots.length)];
        const isOccupied = randomSlot.classList.contains('occupied');
        
        randomSlot.style.transition = 'all 0.5s ease';
        randomSlot.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            if (Math.random() > 0.7) { // 30% chance to change status
                if (isOccupied) {
                    randomSlot.classList.remove('occupied');
                    randomSlot.classList.add('available');
                } else {
                    randomSlot.classList.remove('available');
                    randomSlot.classList.add('occupied');
                }
            }
            randomSlot.style.transform = 'scale(1)';
        }, 250);
    }, 3000);
}

// Utility function for smooth scrolling
function smoothScrollTo(target) {
    const targetElement = document.getElementById(target);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Enhanced button interactions
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('btn')) {
        e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttled scroll handler for better performance
const throttledScrollHandler = throttle(function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Form validation for future use
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading states for better UX
function addLoadingState(button) {
    button.disabled = true;
    button.style.opacity = '0.7';
    button.style.cursor = 'not-allowed';
    
    const originalText = button.innerHTML;
    button.innerHTML = '<span>Loading...</span>';
    
    return function removeLoading() {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
        button.innerHTML = originalText;
    };
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    console.log(`Event: ${eventName}`, properties);
    // Integrate with your analytics service here
}

// Track button clicks for analytics
document.addEventListener('click', function(e) {
    if (e.target.id === 'subscribed-btn') {
        trackEvent('subscribed_user_click', {
            location: 'hero_section',
            timestamp: new Date().toISOString()
        });
    } else if (e.target.id === 'guest-btn') {
        trackEvent('guest_user_click', {
            location: 'hero_section',
            timestamp: new Date().toISOString()
        });
    }
});

// Error handling for navigation
window.addEventListener('error', function(e) {
    console.error('Navigation error:', e.error);
    // Implement error reporting here
});

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add CSS for screen reader only content
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .keyboard-navigation button:focus,
    .keyboard-navigation a:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);