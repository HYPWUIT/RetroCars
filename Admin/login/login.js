document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('showPassword');

    // Create an error message element
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    loginForm.insertBefore(errorDiv, loginForm.querySelector('button'));

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            errorDiv.textContent = ''; // Clear previous errors
            emailInput.style.borderColor = '';
            passwordInput.style.borderColor = '';

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errorDiv.textContent = 'Please enter a valid email address.';
                emailInput.style.borderColor = 'red';
                return;
            }

            if (password === '') {
                errorDiv.textContent = 'Please enter your password.';
                passwordInput.style.borderColor = 'red';
                return;
            }

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            fetch('login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '../admin.php'; // Redirect to admin page
                } else {
                    errorDiv.textContent = data.message || 'Invalid email or password.';
                    emailInput.style.borderColor = 'red';
                    passwordInput.style.borderColor = 'red';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorDiv.textContent = 'An error occurred. Please try again.';
            });
        });
    }

    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener('change', function () {
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    }
});