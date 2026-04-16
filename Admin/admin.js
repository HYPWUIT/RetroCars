document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.admin-section');
    const logoutLink = document.getElementById('logout-link-admin');

    function showSection(targetId) {
        sections.forEach(section => {
            section.style.display = 'none';
        });

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        links.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        if (targetId === '#dashboard') {
            fetchUsers();
        }
    }

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                showSection(targetId);
            }
        });
    });

    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert("You have been 'logged out'. Please close your browser to fully clear credentials.");
            window.location.href = '../index.html';
        });
    }

    function fetchUsers() {
        fetch('../Backend/get_users.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const totalUsers = document.getElementById('total-users');
                const userList = document.getElementById('user-list');

                if (data.error) {
                    console.error('Error fetching users:', data.error);
                    userList.innerHTML = `<p>Error fetching users: ${data.error}</p>`;
                    return;
                }

                totalUsers.textContent = data.length;

                if (data.length === 0) {
                    userList.innerHTML = '<p>No registered users found.</p>';
                    return;
                }

                let table = '<table><thead><tr><th>ID</th><th>Name</th><th>Surname</th><th>Email</th><th>Ticket Type</th></tr></thead><tbody>';
                data.forEach(user => {
                    table += `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.surname}</td><td>${user.email}</td><td>${user.ticket_type}</td></tr>`;
                });
                table += '</tbody></table>';
                userList.innerHTML = table;
            })
            .catch(error => {
                console.error('Error:', error);
                const userList = document.getElementById('user-list');
                userList.innerHTML = `<p>Failed to load user data. Please check the console for more details.</p>`;
            });
    }

    // Show initial section based on URL hash or default to #dashboard
    const initialSection = window.location.hash || '#dashboard';
    showSection(initialSection);
});