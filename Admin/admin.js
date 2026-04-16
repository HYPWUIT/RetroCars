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
            setTimeout(fetchUsers, 500);
        }
        if (targetId === '#contacts') {
            fetchContacts();
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
            fetch('logout.php', {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'login/login.html';
                } else {
                    alert('Logout failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during logout. Please try again.');
            });
        });
    }

    function fetchContacts() {
        fetch('/Admin/get_contacts.php?', {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const totalContacts = document.getElementById('total-contacts');
                const contactList = document.getElementById('contact-list');

                if (data.error) {
                    console.error('Error fetching contacts:', data.error);
                    contactList.innerHTML = `<p>Error fetching contacts: ${data.error}</p>`;
                    return;
                }

                totalContacts.textContent = data.length;

                if (data.length === 0) {
                    contactList.innerHTML = '<p>No contacts found.</p>';
                    return;
                }

                let table = '<table><thead><tr><th>ID</th><th>Gmail</th><th>Name</th><th>Message</th></tr></thead><tbody>';
                data.forEach(contact => {
                    table += `<tr><td>${contact.id}</td><td>${contact.gmail}</td><td>${contact.name}</td><td>${contact.message}</td></tr>`;
                });
                table += '</tbody></table>';
                contactList.innerHTML = table;
            })
            .catch(error => {
                console.error('Error:', error);
                const contactList = document.getElementById('contact-list');
                contactList.innerHTML = `<p>Failed to load contact data. Error: ${error.message}. Please check the console for more details.</p>`;
            });
    }

    function fetchUsers() {
        fetch('/Admin/get_users.php?v=', {
            method: 'GET'
        })
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

                let table = '<table><thead><tr><th>ID</th><th>Name</th><th>Surname</th><th>Ticket Type</th><th>Email</th><th>Password</th></tr></thead><tbody>';
                data.forEach(user => {
                    table += `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.surname}</td><td>${user.ticket_type}</td><td>${user.email}</td><td>${user.password}</td></tr>`;
                });
                table += '</tbody></table>';
                userList.innerHTML = table;
            })
            .catch(error => {
                console.error('Error:', error);
                const userList = document.getElementById('user-list');
                userList.innerHTML = `<p>Failed to load user data. Error: ${error.message}. Please check the console for more details.</p>`;
            });
    }

    // Show initial section based on URL hash or default to #dashboard
    const initialSection = window.location.hash || '#dashboard';
    showSection(initialSection);
});