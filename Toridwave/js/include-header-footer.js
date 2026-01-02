// Include Header and Footer in all pages
(function() {
    // Function to include HTML file
    function includeHTML(file, elementId) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.outerHTML = data;
                    // Reinitialize scripts after including
                    if (file.includes('header')) {
                        initHeaderScripts();
                    }
                    if (file.includes('footer')) {
                        initFooterScripts();
                    }
                }
            })
            .catch(error => console.error('Error loading ' + file + ':', error));
    }
    
    // Initialize header scripts
    function initHeaderScripts() {
        // Set active nav link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Dropdown functionality
        const dropdowns = document.querySelectorAll('.has-dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth > 768) {
                        e.preventDefault();
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
        
        // Mobile menu toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }
    
    // Initialize footer scripts
    function initFooterScripts() {
        // Update current year
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // Load header and footer on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Only load if placeholders exist
        if (document.getElementById('header-placeholder')) {
            includeHTML('includes/header.html', 'header-placeholder');
        }
        if (document.getElementById('footer-placeholder')) {
            includeHTML('includes/footer.html', 'footer-placeholder');
        }
    });
})();

