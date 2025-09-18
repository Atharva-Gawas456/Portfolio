// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initActiveNavHighlighting();
    initMobileMenu();
    initTypingAnimation();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const mobileMenu = document.getElementById('mobile-menu');
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
}

// Active navigation link highlighting
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial check
    updateActiveLink();
}

// Mobile hamburger menu functionality
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Typing animation for hero subtitle
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    const phrases = [
        'Software Engineer',
        'Web Developer', 
        'Problem Solver',
        'Tech Enthusiast',
        'Full Stack Developer'
    ];
    
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let isTypingPaused = false;
    
    function typeAnimation() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting && !isTypingPaused) {
            // Typing
            typedTextElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            
            if (letterIndex === currentPhrase.length) {
                // Finished typing current phrase
                isTypingPaused = true;
                setTimeout(() => {
                    isTypingPaused = false;
                    isDeleting = true;
                }, 2000); // Pause for 2 seconds
            }
        } else if (isDeleting && !isTypingPaused) {
            // Deleting
            typedTextElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
            
            if (letterIndex === 0) {
                // Finished deleting
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(() => {
                    typeAnimation();
                }, 500); // Pause before starting next phrase
                return;
            }
        }
        
        if (!isTypingPaused) {
            // Adjust typing speed
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeAnimation, typingSpeed);
        }
    }
    
    // Start the typing animation
    typeAnimation();
}

// Additional utility functions

// Navbar background opacity on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    }
});

// Add scroll reveal animation for sections
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll reveal when page loads
window.addEventListener('load', initScrollReveal);

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add click event listener to logo for scroll to top
document.querySelector('.nav-logo a').addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#home') {
        e.preventDefault();
        scrollToTop();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(function() {
    // Any scroll-intensive operations can be placed here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);