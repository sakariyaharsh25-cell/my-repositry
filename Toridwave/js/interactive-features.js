/* ============================================
   TORRIDWAVE - INTERACTIVE FEATURES
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PRELOADER ANIMATION
    initPreloader();
    
    // 2. INTERACTIVE HERO SECTION
    initInteractiveHero();
    
    // 3. SCROLL PROGRESS BAR
    initScrollProgress();
    
    // 4. SCROLL-TRIGGERED ANIMATIONS
    initScrollAnimations();
    
    // 5. FLOATING ACTION BUTTONS
    initFloatingButtons();
    
    // 6. TESTIMONIALS SLIDER
    initTestimonialsSlider();
    
    // 7. MICRO-INTERACTIONS
    initMicroInteractions();
    
    // 8. 3D TILT CARDS
    init3DTiltCards();
    
    // 9. CURSOR FOLLOW EFFECT
    initCursorFollow();
    
    // 10. PAGE TRANSITION
    initPageTransition();
});

// ============================================
// 1. PRELOADER ANIMATION
// ============================================
// function initPreloader() {
//     const preloader = document.createElement('div');
//     preloader.id = 'preloader';
//     preloader.innerHTML = `
//         <div class="preloader-content">
//             <div class="preloader-logo">
//                 <i class="fas fa-wave-square"></i>
//             </div>
//             <div class="preloader-text">TorridWave</div>
//             <div class="preloader-progress">
//                 <div class="preloader-bar"></div>
//             </div>
//         </div>
//     `;
//     document.body.prepend(preloader);
    
//     // Simulate loading
//     let progress = 0;
//     const interval = setInterval(() => {
//         progress += Math.random() * 15;
//         if (progress >= 100) {
//             progress = 100;
//             clearInterval(interval);
//             setTimeout(() => {
//                 preloader.style.opacity = '0';
//                 setTimeout(() => {
//                     preloader.remove();
//                 }, 500);
//             }, 300);
//         }
//         document.querySelector('.preloader-bar').style.width = progress + '%';
//     }, 100);
// }
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';

    preloader.innerHTML = `
        <div class="preloader-content">
            <img src="img/logo.png"
                 alt="TorridWave Technologies"
                 class="preloader-image" />
        </div>
    `;

    document.body.prepend(preloader);

    // Fake loading animation (optional)
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1200);
}


// ============================================
// 2. INTERACTIVE HERO SECTION
// ============================================
function initInteractiveHero() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    // Mouse move parallax effect
    hero.addEventListener('mousemove', function(e) {
        const shapes = hero.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Floating gradient blobs
    createFloatingBlobs(hero);
    
    // Text reveal animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.style.animation = 'fadeInUp 1s ease-out', 200);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.animation = 'fadeInUp 1s ease-out 0.3s both', 500);
    }
    if (heroDescription) {
        setTimeout(() => heroDescription.style.animation = 'fadeInUp 1s ease-out 0.6s both', 800);
    }
}

function createFloatingBlobs(container) {
    for (let i = 0; i < 3; i++) {
        const blob = document.createElement('div');
        blob.className = 'gradient-blob';
        blob.style.cssText = `
            position: absolute;
            width: ${300 + Math.random() * 200}px;
            height: ${300 + Math.random() * 200}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 120, 212, 0.3) 0%, rgba(0, 188, 242, 0.1) 100%);
            filter: blur(60px);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatBlob ${15 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 1;
        `;
        container.appendChild(blob);
    }
}

// ============================================
// 3. SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        document.querySelector('.progress-fill').style.width = scrolled + '%';
    });
}

// ============================================
// 4. SCROLL-TRIGGERED ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal, .service-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// 5. FLOATING ACTION BUTTONS
// ============================================
// function initFloatingButtons() {
//     // WhatsApp Button
//     const whatsappBtn = document.createElement('a');
//     whatsappBtn.href = 'https://wa.me/8866181556'; // Replace with your number
//     whatsappBtn.className = 'fab-btn fab-whatsapp';
//     whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
//     whatsappBtn.setAttribute('aria-label', 'Contact on WhatsApp');
//     whatsappBtn.target = '_blank';
//     document.body.appendChild(whatsappBtn);
    
//     // Call Button (Mobile only)
//     if (window.innerWidth <= 768) {
//         const callBtn = document.createElement('a');
//         callBtn.href = 'tel:+918866181556'; // Replace with your number
//         callBtn.className = 'fab-btn fab-call';
//         callBtn.innerHTML = '<i class="fas fa-phone"></i>';
//         callBtn.setAttribute('aria-label', 'Call us');
//         document.body.appendChild(callBtn);
//     }
    
//     // Back to Top (already exists, just enhance)
//     const scrollTop = document.getElementById('scrollToTop');
//     if (scrollTop) {
//         window.addEventListener('scroll', function() {
//             if (window.pageYOffset > 300) {
//                 scrollTop.classList.add('show');
//             } else {
//                 scrollTop.classList.remove('show');
//             }
//         });
//     }
// }

// ============================================
// 6. TESTIMONIALS SLIDER
// ============================================
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-item');
    let currentSlide = 0;
    let autoSlideInterval;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    startAutoSlide();
    showSlide(0);
}

// ============================================
// 7. MICRO-INTERACTIONS
// ============================================
function initMicroInteractions() {
    // Button Ripple Effect
    document.querySelectorAll('.btn, .service-card, .nav-link').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// 8. 3D TILT CARDS
// ============================================
function init3DTiltCards() {
    document.querySelectorAll('.service-card, .card-hover').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ============================================
// 9. CURSOR FOLLOW EFFECT
// ============================================
function initCursorFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    document.querySelectorAll('a, button, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ============================================
// 10. PAGE TRANSITION
// ============================================
function initPageTransition() {
    document.querySelectorAll('a[href^="/"], a[href^="./"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                const overlay = document.createElement('div');
                overlay.className = 'page-transition';
                document.body.appendChild(overlay);
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

