document.addEventListener("DOMContentLoaded", function () {

  const eventDate = new Date("2026-07-18T09:00:00");

  const heroSection = document.querySelector(".hero");
  const countdown = document.createElement("div");
  countdown.classList.add("countdown");
  countdown.style.marginTop = "16px";
  countdown.style.fontSize = "1.1em";
  countdown.style.fontWeight = "bold";
  heroSection.appendChild(countdown);

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      countdown.textContent = "The event is happening now!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdown.textContent = `Event starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000); 


  const registerBtn = document.querySelector("button");

  registerBtn.removeAttribute("onclick");
  registerBtn.addEventListener("click", openModal);


  const modal = document.createElement("div");
  modal.id = "registerModal";
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 1000;
    justify-content: center;
    align-items: center;
  `;

  modal.innerHTML = `
    <div style="
      background: #fff;
      padding: 32px;
      border-radius: 10px;
      width: 360px;
      max-width: 90%;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      position: relative;
    ">
      <button id="closeModal" style="
        position: absolute; top: 12px; right: 16px;
        background: none; border: none;
        font-size: 1.4em; cursor: pointer; color: #555;
      ">✕</button>

      <h2 style="margin-bottom: 16px; color: #222;">Register for Expo 2026</h2>

      <label style="display:block; margin-bottom:4px;">Full Name:</label>
      <input id="reg-name" type="text" placeholder="John Doe" style="
        width: 100%; padding: 8px; margin-bottom: 12px;
        border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;
      ">

      <label style="display:block; margin-bottom:4px;">Email Address:</label>
      <input id="reg-email" type="email" placeholder="john@example.com" style="
        width: 100%; padding: 8px; margin-bottom: 12px;
        border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;
      ">

      <label style="display:block; margin-bottom:4px;">Ticket Type:</label>
      <select id="reg-ticket" style="
        width: 100%; padding: 8px; margin-bottom: 20px;
        border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;
      ">
        <option value="">-- Select a ticket --</option>
        <option value="general">General Admission — Free</option>
        <option value="vip">VIP Pass — $99</option>
        <option value="workshop">Workshop Bundle — $149</option>
      </select>

      <div id="modal-error" style="color:red; font-size:0.85em; margin-bottom:10px;"></div>

      <button id="submitReg" style="
        width: 100%; padding: 10px;
        background: #2c7be5; color: #fff;
        border: none; border-radius: 6px;
        font-size: 1em; cursor: pointer;
      ">Confirm Registration</button>
    </div>
  `;

  document.body.appendChild(modal);


  function openModal() {
    modal.style.display = "flex";
    document.getElementById("modal-error").textContent = "";
    document.getElementById("reg-name").style.borderColor = "";
    document.getElementById("reg-email").style.borderColor = "";
    document.getElementById("reg-ticket").style.borderColor = "";
  }

  
  document.getElementById("closeModal").addEventListener("click", function () {
    modal.style.display = "none";
  });


  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });


  document.getElementById("submitReg").addEventListener("click", function () {
    const name   = document.getElementById("reg-name").value.trim();
    const email  = document.getElementById("reg-email").value.trim();
    const ticket = document.getElementById("reg-ticket").value;
    const errorBox = document.getElementById("modal-error");


    document.getElementById("reg-name").style.borderColor  = "";
    document.getElementById("reg-email").style.borderColor = "";
    document.getElementById("reg-ticket").style.borderColor = "";
    errorBox.textContent = "";


    if (name === "") {
      errorBox.textContent = "Please enter your full name.";
      document.getElementById("reg-name").style.borderColor = "red";
      return;
    }
    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorBox.textContent = "Please enter a valid email address.";
      document.getElementById("reg-email").style.borderColor = "red";
      return;
    }
    if (ticket === "") {
      errorBox.textContent = "Please select a ticket type.";
      document.getElementById("reg-ticket").style.borderColor = "red";
      return;
    }

    modal.style.display = "none";
    showToast(`Thanks, ${name}! You're registered for Expo 2026.`);
  });



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


  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.style.transform = "translateY(-4px)";
      card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
      card.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "";
    });
  });

});
