/* CORE 3 STUDIO - interactions
   Vanilla JS. No scroll listeners for animation (IntersectionObserver only). */
(function () {
  "use strict";

  /* ---------- Header scrolled state (rAF-throttled, passive) ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          header.classList.toggle("scrolled", window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Full-screen menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var fsmenu = document.getElementById("fsmenu");
  var fsClose = document.querySelector(".fsmenu-close");
  function setMenu(open) {
    if (!fsmenu) return;
    fsmenu.classList.toggle("open", open);
    fsmenu.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
    if (menuBtn) menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(!fsmenu.classList.contains("open")); });
  if (fsClose) fsClose.addEventListener("click", function () { setMenu(false); });
  if (fsmenu) fsmenu.querySelectorAll("a").forEach(function (el) {
    el.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Generic accordion (disciplines + benefits) ---------- */
  function bindAccordion(selector, itemClass, headSelector) {
    document.querySelectorAll(selector).forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.closest("." + itemClass);
        var wasOpen = item.classList.contains("open");
        item.classList.toggle("open", !wasOpen);
        head.setAttribute("aria-expanded", !wasOpen ? "true" : "false");
      });
    });
  }
  bindAccordion(".disc-toggle", "disc", ".disc-toggle");
  bindAccordion(".benefit-head", "benefit", ".benefit-head");

  /* ---------- Lead form: progressive optional reveal + validation ---------- */
  var leadForm = document.getElementById("lead-form");
  if (leadForm) {
    var optional = leadForm.querySelector(".lead-optional");
    var nameF = leadForm.querySelector('[name="nombre"]');
    var emailF = leadForm.querySelector('[name="email"]');

    // reveal optional block once required fields have content or on focus of continue
    function maybeReveal() {
      if (optional && !optional.classList.contains("show")) {
        if (nameF.value.trim() && /\S+@\S+\.\S+/.test(emailF.value)) optional.classList.add("show");
      }
    }
    [nameF, emailF].forEach(function (f) { if (f) f.addEventListener("blur", maybeReveal); });
    var revealBtn = leadForm.querySelector(".reveal-optional");
    if (revealBtn) revealBtn.addEventListener("click", function () {
      if (optional) optional.classList.add("show");
      revealBtn.style.display = "none";
    });

    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = validateForm(leadForm);
      if (!ok) return;
      // NOTE: integration point - POST to Google Sheets / Airtable / bsport CRM here.
      showSuccess(leadForm, "lead-success");
    });
  }

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(contactForm)) return;
      showSuccess(contactForm, "contact-success");
    });
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll("[data-required]").forEach(function (field) {
      var input = field.querySelector(".input");
      if (!input) return;
      var v = input.value.trim();
      var bad = !v;
      if (input.type === "email") bad = !/\S+@\S+\.\S+/.test(v);
      field.classList.toggle("invalid", bad);
      if (bad && valid) input.focus();
      if (bad) valid = false;
    });
    return valid;
  }
  // clear error on input
  document.querySelectorAll(".field[data-required] .input").forEach(function (input) {
    input.addEventListener("input", function () {
      input.closest(".field").classList.remove("invalid");
    });
  });

  function showSuccess(form, successId) {
    var success = document.getElementById(successId);
    if (success) {
      form.querySelectorAll(".form-body").forEach(function (b) { b.style.display = "none"; });
      success.classList.add("show");
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---------- Calendar filters reset ---------- */
  var calReset = document.getElementById("cal-reset");
  if (calReset) {
    calReset.addEventListener("click", function () {
      document.querySelectorAll(".cal-filters select").forEach(function (s) { s.selectedIndex = 0; });
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
