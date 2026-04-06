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

});
