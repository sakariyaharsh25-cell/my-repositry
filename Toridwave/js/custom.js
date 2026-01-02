/* ============================================
   TORRIDWAVE - CUSTOM JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Load Header and Footer
    loadHeaderFooter();
    
    // Theme Toggle
    initThemeToggle();
    
    // Navigation Toggle
    initMobileMenu();
    
    // Scroll Effects
    initScrollEffects();
    
    // Animations on Scroll
    initScrollAnimations();
    
    // Floating Particles
    initParticles();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Current Year in Footer
    updateCurrentYear();
    
    // Form Handling
    initFormHandling();
    
    // Counter Animation
    initCounters();
    
    // Parallax Effects
    initParallax();
    
    // Typing Effect
    initTypingEffect();
    
    // FAQ Accordion
    initFAQ();
    
    // Dropdown functionality
    initDropdowns();
});

// Dropdown Functionality - Fixed for all pages
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            // Remove existing event listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add click event to new link
            newLink.addEventListener('click', function(e) {
                e.stopPropagation();
                if (window.innerWidth > 768) {
                    e.preventDefault();
                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-dropdown')) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
}
// Hero Slider Functionality
function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const slideCounter = document.getElementById('slideCounter');

    if (!slider || slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;
    const slideDuration = 5000; // 5 seconds

    // Update slide counter
    function updateCounter() {
        if (slideCounter) {
            slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
        }
    }

    // Go to specific slide
    function goToSlide(n) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Update current slide
        currentSlide = (n + slides.length) % slides.length;

        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }

        updateCounter();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Start auto slide
    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
        isPlaying = true;
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.title = 'Pause';
        }
    }

    // Stop auto slide
    function stopAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        isPlaying = false;
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.title = 'Play';
        }
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }

    // Initialize slider
    function init() {
        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoSlide();
                setTimeout(startAutoSlide, 10000); // Restart after 10 seconds
            });
        });

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 10000);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 10000);
            });
        }

        // Play/Pause button
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 10000);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 10000);
            } else if (e.key === ' ') {
                e.preventDefault();
                togglePlayPause();
            }
        });

        // Pause on hover (optional)
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', () => {
            if (isPlaying) startAutoSlide();
        });

        // Start auto slide
        startAutoSlide();
        updateCounter();
    }

    // Initialize
    init();
}

// Call on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    initHeroSlider();
});
// Load Header and Footer
function loadHeaderFooter() {
    // Load Header
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                initMobileMenu(); // Reinitialize after loading
            }
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load Footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
                updateCurrentYear(); // Update year after loading
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class to header
        if (currentScroll > 100) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            if (header) header.style.transform = 'translateY(-100%)';
        } else {
            if (header) header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Scroll Animations
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .zoom-in');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0, 0) scale(1)';
                }, index * 100);
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        elementObserver.observe(element);
    });
}

// Floating Particles
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update Current Year
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Form Handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            form.reset();
        });
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        let index = 0;
        
        element.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        
        // Start typing when element is visible
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    typingObserver.unobserve(entry.target);
                }
            });
        });
        
        typingObserver.observe(element);
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }
}

function updateThemeIcon(theme, icon) {
    if (icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

