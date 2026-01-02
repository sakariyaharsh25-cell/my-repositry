/**
 * Responsive JavaScript for User & Admin Pages
 * Handles mobile menu, sidebar, and responsive interactions
 */

(function() {
    'use strict';

    // Admin Sidebar Mobile Toggle
    function initAdminSidebar() {
        const sidebar = document.querySelector('.main-sidebar');
        const pushMenuBtn = document.querySelector('[data-widget="pushmenu"]');
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.style.cssText = 'display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1037;';
        document.body.appendChild(overlay);

        if (pushMenuBtn && sidebar) {
            pushMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.innerWidth <= 991) {
                    sidebar.classList.toggle('sidebar-open');
                    overlay.style.display = sidebar.classList.contains('sidebar-open') ? 'block' : 'none';
                    document.body.style.overflow = sidebar.classList.contains('sidebar-open') ? 'hidden' : '';
                }
            });

            overlay.addEventListener('click', function() {
                sidebar.classList.remove('sidebar-open');
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            });

            // Close sidebar on window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 991) {
                    sidebar.classList.remove('sidebar-open');
                    overlay.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Table Responsive Wrapper
    function initResponsiveTables() {
        const tables = document.querySelectorAll('table');
        tables.forEach(function(table) {
            if (!table.closest('.table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    // Touch-friendly improvements
    function initTouchImprovements() {
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Increase tap target sizes on mobile
            const buttons = document.querySelectorAll('button, a.btn, input[type="submit"]');
            buttons.forEach(function(btn) {
                if (window.innerWidth <= 768) {
                    btn.style.minHeight = '44px';
                    btn.style.minWidth = '44px';
                }
            });
        }
    }

    // Prevent zoom on input focus (iOS)
    function preventZoomOnFocus() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(function(input) {
            if (window.innerWidth <= 768) {
                input.style.fontSize = '16px';
            }
        });
    }

    // Responsive Image Loading
    function initResponsiveImages() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // Smooth Scroll for Mobile
    function initSmoothScroll() {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href.length > 1) {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAdminSidebar();
            initResponsiveTables();
            initTouchImprovements();
            preventZoomOnFocus();
            initResponsiveImages();
            initSmoothScroll();
        });
    } else {
        initAdminSidebar();
        initResponsiveTables();
        initTouchImprovements();
        preventZoomOnFocus();
        initResponsiveImages();
        initSmoothScroll();
    }

    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initResponsiveTables();
            preventZoomOnFocus();
        }, 250);
    });

})();

