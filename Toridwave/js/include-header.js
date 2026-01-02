// Include Header in all pages
(function() {
    function includeHeader() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        
        if (!headerPlaceholder) {
            console.warn('Header placeholder not found');
            return;
        }

        fetch('includes/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load header');
                }
                return response.text();
            })
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Initialize header scripts after loading with delay to ensure DOM is ready
                setTimeout(() => {
                    if (window.initHeaderScripts) {
                        window.initHeaderScripts();
                    } else {
                        // If header.js hasn't loaded yet, wait a bit more
                        setTimeout(() => {
                            if (window.initHeaderScripts) {
                                window.initHeaderScripts();
                            }
                        }, 200);
                    }
                }, 50);
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }

    // Load header when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', includeHeader);
    } else {
        includeHeader();
    }
})();