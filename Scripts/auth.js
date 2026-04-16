document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");

  const modal = document.createElement("div");
  modal.id = "authModal";
  modal.className = "auth-modal";
  modal.innerHTML = `
    <div class="auth-modal__dialog">
      <button class="auth-modal__close" type="button" aria-label="Close">✕</button>
      <div id="modalContent"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalContent = document.getElementById("modalContent");
  const closeButton = modal.querySelector(".auth-modal__close");

  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      openModal("signIn");
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      openModal("login");
    });
  }

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  async function openModal(type) {
    modal.style.display = "flex";
    modalContent.innerHTML = await loadModalTemplate(type);
    if (type === "signIn") {
      setupRegisterForm();
    } else {
      setupLoginForm();
    }
  }

  async function loadModalTemplate(type) {
    const path = type === "signIn" ? "Modals/signin.html" : "Modals/login.html";
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error("Modal template not found");
      }
      return await response.text();
    } catch (error) {
      return type === "signIn" ? getDefaultSignInHTML() : getDefaultLoginHTML();
    }
  }

  function getDefaultSignInHTML() {
    return `
      <div class="auth-modal__content">
        <h2>Sign in for Expo 2026</h2>
        <p class="auth-modal__subtitle">Create your account to join the expo.</p>

        <label for="reg-surname">Surname</label>
        <input id="reg-surname" type="text" placeholder="Doe">

        <label for="reg-name">Name</label>
        <input id="reg-name" type="text" placeholder="John">

        <label for="reg-email">Gmail</label>
        <input id="reg-email" type="email" placeholder="john@gmail.com">

        <label for="reg-password">Password</label>
        <input id="reg-password" type="password" placeholder="Create a password">

        <label for="reg-password-confirm">Confirm Password</label>
        <input id="reg-password-confirm" type="password" placeholder="Confirm password">

        <div id="modal-error" class="auth-modal__error"></div>
        <button id="submitReg" class="auth-modal__button">Create account</button>
      </div>
    `;
  }

  function getDefaultLoginHTML() {
    return `
      <div class="auth-modal__content">
        <h2>Log in</h2>
        <p class="auth-modal__subtitle">Access your Expo account.</p>

        <label for="login-email">Gmail</label>
        <input id="login-email" type="email" placeholder="john@gmail.com">

        <label for="login-password">Password</label>
        <input id="login-password" type="password" placeholder="Password">

        <div id="login-error" class="auth-modal__error"></div>
        <button id="submitLogin" class="auth-modal__button">Log in</button>
      </div>
    `;
  }

  function setupRegisterForm() {
    const submitReg = document.getElementById("submitReg");
    if (!submitReg) {
      return;
    }

    submitReg.onclick = function (event) {
      event.preventDefault(); // Prevent form from submitting and reloading the page
      const surname = document.getElementById("reg-surname").value.trim();
      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value.trim();
      const confirmPassword = document.getElementById("reg-password-confirm").value.trim();
      const errorBox = document.getElementById("modal-error");

      document.getElementById("reg-surname").style.borderColor = "";
      document.getElementById("reg-name").style.borderColor = "";
      document.getElementById("reg-email").style.borderColor = "";
      document.getElementById("reg-password").style.borderColor = "";
      document.getElementById("reg-password-confirm").style.borderColor = "";
      errorBox.textContent = "";

      if (surname === "") {
        errorBox.textContent = "Please enter your surname.";
        document.getElementById("reg-surname").style.borderColor = "red";
        return;
      }
      if (name === "") {
        errorBox.textContent = "Please enter your name.";
        document.getElementById("reg-name").style.borderColor = "red";
        return;
      }
      if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorBox.textContent = "Please enter a valid Gmail address.";
        document.getElementById("reg-email").style.borderColor = "red";
        return;
      }
      if (password.length < 8) {
        errorBox.textContent = "Password must be at least 8 characters.";
        document.getElementById("reg-password").style.borderColor = "red";
        return;
      }
      if (password !== confirmPassword) {
        errorBox.textContent = "Passwords do not match.";
        document.getElementById("reg-password").style.borderColor = "red";
        document.getElementById("reg-password-confirm").style.borderColor = "red";
        return;
      }

      const formData = new FormData();
      formData.append('surname', surname);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

            fetch('Backend/login.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        if (data.trim() === "New record created successfully") {
          closeModal();
          showToast(`Thanks, ${surname} ${name}! Your Expo account is ready.`);
        } else if (data.trim() === "A user with this email is already registered") {
          errorBox.textContent = data;
          document.getElementById("reg-email").style.borderColor = "red";
        } else {
          console.error('Error from PHP:', data);
          errorBox.textContent = "Something went wrong. Please try again.";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        errorBox.textContent = "Something went wrong. Please try again.";
      });
    };
  }

  function setupLoginForm() {
    const submitLogin = document.getElementById("submitLogin");
    if (!submitLogin) {
      return;
    }

    submitLogin.onclick = function (event) {
      event.preventDefault(); // Prevent form from submitting and reloading the page
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();
      const errorBox = document.getElementById("login-error");

      document.getElementById("login-email").style.borderColor = "";
      document.getElementById("login-password").style.borderColor = "";
      errorBox.textContent = "";

      if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorBox.textContent = "Please enter a valid Gmail address.";
        document.getElementById("login-email").style.borderColor = "red";
        return;
      }
      if (password === "") {
        errorBox.textContent = "Please enter your password.";
        document.getElementById("login-password").style.borderColor = "red";
        return;
      }

      const bodyParams = new URLSearchParams();
      bodyParams.append('email', email);
      bodyParams.append('password', password);

      fetch('Backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyParams
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.text();
      })
      .then(data => {
        if (data.startsWith("Login successful")) {
          const username = data.split(':')[1];
          sessionStorage.setItem('loggedInUser', username);
          updateNavForLoggedInUser(username);
          closeModal();
          showToast(`Welcome, ${username}!`);
        } else {
          errorBox.textContent = "Invalid email or password.";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        errorBox.textContent = "Something went wrong. Please try again.";
      });
    };
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px; left: 50%;
      transform: translateX(-50%);
      background: #2c7be5;
      color: #fff;
      padding: 14px 28px;
      border-radius: 8px;
      font-size: 1em;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      z-index: 2000;
      opacity: 1;
      transition: opacity 0.5s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  function updateNavForLoggedInUser(username) {
    const navActions = document.querySelector('.nav-actions');
    navActions.innerHTML = `
      <div class="user-profile">
        <span>${username}</span>
        <button id="signOutBtn">Sign Out</button>
      </div>
    `;
    document.getElementById('signOutBtn').addEventListener('click', () => {
      sessionStorage.removeItem('loggedInUser');
      window.location.reload();
    });
  }

  // Check for logged in user on page load
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (loggedInUser) {
    updateNavForLoggedInUser(loggedInUser);
  }
});
