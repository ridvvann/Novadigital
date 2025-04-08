// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // WhatsApp button functionality - FIXED to only handle specific buttons
    const whatsappBtns = document.querySelectorAll(".whatsapp-btn");
  
    // Process only buttons with the whatsapp-btn class
    whatsappBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
  
        const phone = this.getAttribute("data-phone") || "+252672085009";
        const message = encodeURIComponent(this.getAttribute("data-message") || "Hello, I'm interested in your services.");
        const source = this.getAttribute("data-source") || "Website";
  
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`;
  
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, "_blank");
      });
    });
  
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav .nav-link");
  
    if (mobileMenuBtn && mobileMenu) {
      // Toggle mobile menu
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
  
        // Update aria-expanded attribute
        const isExpanded = mobileMenu.classList.contains("active");
        mobileMenuBtn.setAttribute("aria-expanded", isExpanded);
  
        // Toggle icon between bars and times
        const icon = mobileMenuBtn.querySelector("i");
        if (isExpanded) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
  
      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          mobileMenu.classList.contains("active") &&
          !mobileMenu.contains(e.target) &&
          !mobileMenuBtn.contains(e.target)
        ) {
          mobileMenu.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          const icon = mobileMenuBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
  
      // Close mobile menu when pressing Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          const icon = mobileMenuBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
  
      // Add keyboard navigation for mobile menu links
      mobileNavLinks.forEach((link, index) => {
        link.addEventListener("keydown", (e) => {
          // Handle tab navigation
          if (e.key === "Tab") {
            if (e.shiftKey && index === 0) {
              // If shift+tab on first item, close menu and focus menu button
              e.preventDefault();
              mobileMenu.classList.remove("active");
              mobileMenuBtn.setAttribute("aria-expanded", "false");
              mobileMenuBtn.focus();
            } else if (!e.shiftKey && index === mobileNavLinks.length - 1) {
              // If tab on last item, close menu and focus next element
              mobileMenu.classList.remove("active");
              mobileMenuBtn.setAttribute("aria-expanded", "false");
            }
          }
        });
      });
    }
  
  });
  