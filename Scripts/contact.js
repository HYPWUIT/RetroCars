document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    clearErrors();

    let isValid = true;


    if (name === "") {

      showError('input[name="name"]', "Name is required.");
      isValid = false;

    } else if (name.length < 2) {

      showError('input[name="name"]', "Name must be at least 2 characters.");
      isValid = false;

    }

    if (email === "") {

      showError('input[name="email"]', "Email is required.");
      isValid = false;

    } else if (!isValidEmail(email)) {

      showError('input[name="email"]', "Please enter a valid email address.");
      isValid = false;

    }

    if (message === "") {

      showError('textarea[name="message"]', "Message cannot be empty.");
      isValid = false;

    } else if (message.length < 10) {

      showError('textarea[name="message"]', "Message must be at least 10 characters.");
      isValid = false;

    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    if (isValid) {
      fetch('Backend/contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        if (data.includes("New record created successfully")) {
          showSuccessMessage();
          form.reset();
        } else {
          // Display the error message from the server
          alert(data);
        }
      })
      .catch(() => {
        alert('There was a problem sending your message.');
      });
    }
  });

  function isValidEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    
  }


  function showError(selector, message) {

    const field = form.querySelector(selector);
    const error = document.createElement("span");
    error.classList.add("error-message");
    error.style.color = "red";
    error.style.fontSize = "0.85em";
    error.style.display = "block";
    error.style.marginTop = "4px";
    error.textContent = message;
    field.insertAdjacentElement("afterend", error);
    field.style.borderColor = "red";
  }

  function clearErrors() {
    const errors = form.querySelectorAll(".error-message");
    errors.forEach((e) => e.remove());

    const fields = form.querySelectorAll("input, textarea");
    fields.forEach((f) => (f.style.borderColor = ""));
  }


  function showSuccessMessage() {

    const existing = document.querySelector(".success-message");
    if (existing) existing.remove();

    const success = document.createElement("p");
    success.classList.add("success-message");
    success.style.color = "green";
    success.style.fontWeight = "bold";
    success.style.marginTop = "12px";
    success.textContent = "Your message has been sent! We will get back to you soon.";
    form.insertAdjacentElement("afterend", success);

    setTimeout(() => success.remove(), 5000);
  }
});
