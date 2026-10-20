// ==========================================================================
// LiftPath Consulting — Interactive Behaviors
// 1. Dual Theme Switcher (Warm & Earthy <-> Engineer Dark Mode)
// 2. Mobile Menu Drawer
// 3. Scroll Reveal Observer
// 4. Direct Background Email via FormSubmit.co + mailto fallback
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle
  const rootEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const themeLabel = document.getElementById('theme-label');

  const applyTheme = (theme) => {
    rootEl.setAttribute('data-theme', theme);
    localStorage.setItem('liftpath-theme', theme);
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Warm Mode' : 'Dark Mode';
    }
  };

  const savedTheme = localStorage.getItem('liftpath-theme');
  if (savedTheme === 'dark' || savedTheme === 'warm') {
    applyTheme(savedTheme);
  } else {
    applyTheme('warm');
  }

  const handleToggle = () => {
    const current = rootEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'warm';
    applyTheme(current === 'dark' ? 'warm' : 'dark');
  };

  if (themeToggle) themeToggle.addEventListener('click', handleToggle);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', handleToggle);

  // 3. Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Scroll Reveal Observer
  const fadeElements = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach((el) => observer.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add('visible'));
  }

  // 5. Contact Form Handler (FormSubmit AJAX -> edwinyoung94@gmail.com)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const interest = document.getElementById('interest').value;
      const message = document.getElementById('message').value.trim();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      if (formStatus) {
        formStatus.textContent = 'Sending your message to Joe Young...';
        formStatus.style.color = '#C26547';
        formStatus.style.fontWeight = '600';
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/1bed6213bfbe846d0d689959fc0d65bc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            interest,
            message,
            _subject: `LiftPath Consulting Inquiry (${interest}) — ${name}`,
            _template: 'table',
          }),
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true)) {
          contactForm.reset();
          if (submitBtn) {
            submitBtn.textContent = 'Message Sent ✓';
          }
          if (formStatus) {
            formStatus.textContent = 'Thanks! Your message was sent directly to Joe Young.';
            formStatus.style.color = '#4A7C59';
          }
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        const subject = encodeURIComponent(`LiftPath Consulting Inquiry (${interest}) — ${name}`);
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nDetails:\n${message}`
        );
        window.location.href = `mailto:joe@liftpathconsulting.com?subject=${subject}&body=${body}`;

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        if (formStatus) {
          formStatus.textContent = 'Opened your email client to message Joe Young.';
        }
      }
    });
  }
});
