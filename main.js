// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // WhatsApp button functionality
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

  // Mobile menu functionality
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

  // Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get all image links
  const imageLinks = document.querySelectorAll(".image-link");

  // Function to create and display the pop-up
  function openPopup(imageUrl) {
    // Create the pop-up container
    const popup = document.createElement("div");
    popup.classList.add("popup");

    // Create the close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-popup");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.color = "#fff";
    closeButton.style.fontSize = "24px";
    closeButton.style.cursor = "pointer";

    // Create the image element
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "Full Image";
    image.style.maxWidth = "90%";
    image.style.maxHeight = "90%";
    image.style.borderRadius = "8px";
    image.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";

    // Append elements to the pop-up
    popup.appendChild(closeButton);
    popup.appendChild(image);

    // Add the pop-up to the document body
    document.body.appendChild(popup);

    // Close the pop-up when the close button is clicked
    closeButton.addEventListener("click", () => {
      document.body.removeChild(popup);
    });

    // Close the pop-up when clicking outside the image
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        document.body.removeChild(popup);
      }
    });

    // Close the pop-up when pressing the Esc key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.body.removeChild(popup);
      }
    });
  }

  // Attach click event listeners to image links
  imageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default link behavior
      const fullImage = this.dataset.fullImage;
      if (fullImage) {
        openPopup(fullImage); // Open the pop-up with the full image
      }
    });
  });
});

  console.log("main.js loaded and all event listeners attached.");
});

// Contact form functionality
document.getElementById("home-contact-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent form from actually submitting

  // Collect form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Build the WhatsApp message
  const whatsappMessage = `Hello, I'm reaching out from your website.\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Your WhatsApp number (no plus sign)
  const phoneNumber = "252672085009";

  // Redirect to WhatsApp
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
});

