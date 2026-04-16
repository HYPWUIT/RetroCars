document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar navigation
    const links = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.admin-section');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ensure it's an anchor link for our sections
            if (!targetId || !targetId.startsWith('#')) return;
            
            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            // Update active link styling
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Show the target section and hide others
            sections.forEach(section => {
                section.style.display = 'none';
            });
            if(targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // Since HTTP Basic Auth doesn't have a server-side "logout" action,
    // this button is removed from the HTML. If you add it back, this code will work.
    const logoutLink = document.getElementById('logout-link-admin');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Note: This doesn't truly log out from HTTP Basic Auth.
            // The browser caches credentials. The only reliable way is to close the browser.
            alert("You have been 'logged out'. Please close your browser to fully clear credentials.");
            window.location.href = '../index.html';
        });
    }
});