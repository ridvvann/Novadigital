// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js loaded and all event listeners attached.");

  // ======================
  // WhatsApp Button Logic
  // ======================
  const whatsappBtns = document.querySelectorAll(".whatsapp-btn");
  whatsappBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const phone = this.getAttribute("data-phone") || "+252672085009";
      const message = encodeURIComponent(this.getAttribute("data-message") || "Hello, I'm interested in your services.");
      const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
  });

  // ======================
  // Mobile Menu Functionality
  // ======================
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav .nav-link");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      const isExpanded = mobileMenu.classList.contains("active");
      mobileMenuBtn.setAttribute("aria-expanded", isExpanded);
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.toggle("fa-bars", !isExpanded);
      icon.classList.toggle("fa-times", isExpanded);
    });

    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });

    mobileNavLinks.forEach((link, index) => {
      link.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && index === 0) {
            e.preventDefault();
            mobileMenu.classList.remove("active");
            mobileMenuBtn.setAttribute("aria-expanded", "false");
            mobileMenuBtn.focus();
          } else if (!e.shiftKey && index === mobileNavLinks.length - 1) {
            mobileMenu.classList.remove("active");
            mobileMenuBtn.setAttribute("aria-expanded", "false");
          }
        }
      });
    });
  }

  // ======================
  // Image Popup Functionality
  // ======================
  const imageLinks = document.querySelectorAll(".image-link");

  function openPopup(imageUrl) {
    // Remove existing popup if present
    const existingPopup = document.querySelector(".popup");
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement("div");
    popup.classList.add("popup");
    Object.assign(popup.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    });

    const closeButton = document.createElement("span");
    closeButton.classList.add("close-popup");
    closeButton.innerHTML = "&times;";
    Object.assign(closeButton.style, {
      position: "absolute",
      top: "10px",
      right: "20px",
      color: "#fff",
      fontSize: "32px",
      cursor: "pointer",
      fontWeight: "bold",
    });

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "Full Image";
    Object.assign(image.style, {
      maxWidth: "90%",
      maxHeight: "90%",
      borderRadius: "8px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    });

    popup.appendChild(closeButton);
    popup.appendChild(image);
    document.body.appendChild(popup);

    closeButton.addEventListener("click", () => popup.remove());
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.remove();
    });
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        popup.remove();
        document.removeEventListener("keydown", escHandler);
      }
    });
  }

  imageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const fullImage = this.dataset.fullImage;
      if (fullImage) openPopup(fullImage);
    });
  });

  // ======================
  // Contact Form → WhatsApp Redirect
  // ======================
  const contactForm = document.getElementById("home-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      const whatsappMessage = `Hello, I'm reaching out from your website.\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const phoneNumber = "252672085009";

      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    });
  }
});

  // Select all cards (both regular and featured)
  const cards = document.querySelectorAll('.portfolio-card, .featured-card');
  const popup = document.querySelector('.popup-image');
  const popupImg = document.querySelector('.popup-img');
  const closePopup = document.querySelector('.close-popup');

  // Add click event to all cards
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const fullImageUrl = this.querySelector('.image-link').getAttribute('data-full-image');
      popupImg.src = fullImageUrl;
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close popup
  closePopup.addEventListener('click', function() {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close when clicking outside image
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
