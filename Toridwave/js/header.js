// Header JavaScript Functionality
(function() {
    // Mobile Menu Toggle
    function initHeaderScripts() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navCenter = document.getElementById('navCenter');
        const overlay = document.getElementById('overlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        // Function to close mobile menu
        function closeMobileMenu() {
            if (navCenter) navCenter.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Function to open mobile menu
        function openMobileMenu() {
            if (navCenter) navCenter.classList.add('active');
            if (mobileToggle) mobileToggle.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        if (mobileToggle && navCenter) {
            mobileToggle.addEventListener('click', () => {
                if (navCenter.classList.contains('active')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            // Close button in mobile menu
            if (mobileMenuClose) {
                mobileMenuClose.addEventListener('click', closeMobileMenu);
            }

            // Overlay click to close
            if (overlay) {
                overlay.addEventListener('click', closeMobileMenu);
            }
        }

        // Initialize dropdown functionality
        initDropdowns();

        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.main-header');
            if (header) {
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.1)';
                    header.style.backdropFilter = 'blur(25px)';
                } else {
                    header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.06)';
                    header.style.backdropFilter = 'blur(20px)';
                }
            }
        });

        // Active Navigation Link
        function setActiveNavLink() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                }
            });
        }

        // Initialize active link
        setActiveNavLink();

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Close mobile menu only for non-dropdown links
                if (window.innerWidth <= 992 && navCenter && !link.closest('.has-dropdown')) {
                    closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking dropdown items
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992 && navCenter) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close mobile menu when clicking mobile action buttons
        document.querySelectorAll('.mobile-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 992 && navCenter) {
                    // Small delay to allow navigation
                    setTimeout(() => {
                        closeMobileMenu();
                    }, 100);
                }
            });
        });
    }

    // Dropdown functionality
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.has-dropdown');
        
        // Clear all existing event listeners first
        dropdowns.forEach(dropdown => {
            const newDropdown = dropdown.cloneNode(true);
            dropdown.parentNode.replaceChild(newDropdown, dropdown);
        });

        // Get fresh references
        const freshDropdowns = document.querySelectorAll('.has-dropdown');
        
        freshDropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            const icon = link.querySelector('.dropdown-icon');
            
            if (!link || !menu) return;
            
            // MOBILE BEHAVIOR (≤ 992px)
            if (window.innerWidth <= 992) {
                // Mobile click to toggle dropdown
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = menu.classList.contains('active');
                    
                    // Close all other dropdowns
                    freshDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            const otherIcon = otherDropdown.querySelector('.dropdown-icon');
                            otherMenu.classList.remove('active');
                            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isActive) {
                        menu.classList.remove('active');
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    } else {
                        menu.classList.add('active');
                        if (icon) icon.style.transform = 'rotate(180deg)';
                    }
                });
            } 
            // DESKTOP BEHAVIOR (> 992px)
            else {
                let closeTimer;
                
                // Hover to show dropdown
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(closeTimer);
                    showDropdown(menu, icon);
                });
                
                // Hover to hide dropdown with delay
                dropdown.addEventListener('mouseleave', function() {
                    closeTimer = setTimeout(() => {
                        hideDropdown(menu, icon);
                    }, 200);
                });
                
                // Click to toggle dropdown (for touch devices)
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const isShowing = menu.classList.contains('show');
                    
                    // Close all other dropdowns
                    freshDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            const otherIcon = otherDropdown.querySelector('.dropdown-icon');
                            hideDropdown(otherMenu, otherIcon);
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isShowing) {
                        hideDropdown(menu, icon);
                    } else {
                        showDropdown(menu, icon);
                    }
                });
                
                // Keep dropdown open when hovering over it
                menu.addEventListener('mouseenter', function() {
                    clearTimeout(closeTimer);
                    showDropdown(menu, icon);
                });
                
                menu.addEventListener('mouseleave', function() {
                    closeTimer = setTimeout(() => {
                        hideDropdown(menu, icon);
                    }, 200);
                });
            }
        });
        
        // Close dropdowns when clicking outside (desktop only)
        document.addEventListener('click', function(e) {
            if (window.innerWidth > 992) {
                if (!e.target.closest('.has-dropdown') && !e.target.closest('.dropdown-menu')) {
                    freshDropdowns.forEach(dropdown => {
                        const menu = dropdown.querySelector('.dropdown-menu');
                        const icon = dropdown.querySelector('.dropdown-icon');
                        hideDropdown(menu, icon);
                    });
                }
            }
        });
        
        // Helper functions
        function showDropdown(menu, icon) {
            if (menu && window.innerWidth > 992) {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateX(-50%) translateY(0)';
                menu.classList.add('show');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        }
        
        function hideDropdown(menu, icon) {
            if (menu && window.innerWidth > 992) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateX(-50%) translateY(10px)';
                menu.classList.remove('show');
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        }
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                initDropdowns();
            }, 250);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderScripts);
    } else {
        initHeaderScripts();
    }

    // Re-initialize after header is loaded
    window.initHeaderScripts = initHeaderScripts;
})();