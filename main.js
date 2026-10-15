document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark / Light Theme Switcher
  const rootEl = document.documentElement;
  const themeBtn = document.querySelector("#theme-btn");
  const themeIcon = document.querySelector("#theme-icon");

  if (themeBtn && themeIcon) {
    themeBtn.addEventListener("click", () => {
      const currentTheme = rootEl.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      rootEl.setAttribute("data-theme", nextTheme);
      themeIcon.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    });
  }

  // 2. Mobile Navigation Drawer
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      primaryNav.classList.toggle("is-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        primaryNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Interactive Service Category Filtering
  const tabBtns = document.querySelectorAll(".tab-btn");
  const serviceCards = document.querySelectorAll(".service-item");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      tabBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      serviceCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Pre-select service in form when clicking a package button
  const selectServiceBtns = document.querySelectorAll(".select-service-btn");
  const serviceSelect = document.querySelector("#service");

  selectServiceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-service");
      if (serviceSelect && val) {
        serviceSelect.value = val;
      }
    });
  });

  // 4. Live Character Counter & Form Validation
  const contactForm = document.querySelector("#contact-form");
  const messageInput = document.querySelector("#message");
  const charCounter = document.querySelector("#char-counter");

  if (messageInput && charCounter) {
    messageInput.addEventListener("input", () => {
      charCounter.textContent = `${messageInput.value.length} / 500`;
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let isValid = true;

      const nameInput = document.querySelector("#full-name");
      const emailInput = document.querySelector("#email");

      const nameError = document.querySelector("#name-error");
      const emailError = document.querySelector("#email-error");
      const messageError = document.querySelector("#message-error");
      const successBanner = document.querySelector("#form-success");

      [nameError, emailError, messageError].forEach((el) => (el.textContent = ""));
      [nameInput, emailInput, messageInput].forEach((el) => el.classList.remove("input-error"));
      successBanner.hidden = true;

      if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Please enter your full name (minimum 2 characters).";
        nameInput.classList.add("input-error");
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid work email address.";
        emailInput.classList.add("input-error");
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Please share at least 10 characters about your project scope.";
        messageInput.classList.add("input-error");
        isValid = false;
      }

      if (isValid) {
        contactForm.reset();
        if (charCounter) charCounter.textContent = "0 / 500";
        successBanner.hidden = false;
      }
    });
  }
});
