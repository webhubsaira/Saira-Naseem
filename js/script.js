/**
 * ==========================================================================
 * Alex Morgan | Personal Portfolio Website
 * Script: js/script.js
 * Tech: Vanilla JavaScript (ES6+)
 * Description: Client-side interactive behavior for navigation, animations,
 *              skill progress bars, project filtering, form validation, and back-to-top.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DOM Elements Cache
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.getElementById('navbarResponsive');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const currentYearSpan = document.getElementById('currentYear');
  const contactForm = document.getElementById('portfolioContactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const progressBars = document.querySelectorAll('.skill-progress-bar');
  const revealElements = document.querySelectorAll('.reveal-item');

  // --------------------------------------------------------------------------
  // 2. Set Dynamic Copyright Year in Footer
  // --------------------------------------------------------------------------
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 3. Sticky Navbar & Scroll Effects
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Toggle .scrolled class for compact styling and shadow
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Toggle Back-To-Top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial check on load
  handleScroll();

  // --------------------------------------------------------------------------
  // 4. Smooth Scrolling & Active Section Highlighting
  // --------------------------------------------------------------------------
  // Handle mobile navbar collapse on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();

          // Calculate navbar offset
          const navHeight = navbar ? navbar.offsetHeight : 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight - 10);

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile hamburger menu if open
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            // Using Bootstrap Collapse API if available, or class removal fallback
            if (window.bootstrap && window.bootstrap.Collapse) {
              const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse);
              bsCollapse.hide();
            } else {
              navbarCollapse.classList.remove('show');
            }
          }
        }
      }
    });
  });

  // Active Link on Scroll (Intersection Observer approach)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // --------------------------------------------------------------------------
  // 5. Back to Top Button
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Scroll Reveal Animations (Fade & Slide In)
  // --------------------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Trigger animation once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 7. Animated Skill Progress Bars
  // --------------------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target;
            const targetWidth = progressBar.getAttribute('data-progress');
            if (targetWidth) {
              progressBar.style.width = `${targetWidth}%`;
            }
            observer.unobserve(progressBar);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    progressBars.forEach((bar) => skillObserver.observe(bar));
  } else {
    // Fallback if IntersectionObserver is not supported
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-progress');
      if (targetWidth) bar.style.width = `${targetWidth}%`;
    });
  }

  // --------------------------------------------------------------------------
  // 8. Project Filtering (Vanilla JS)
  // --------------------------------------------------------------------------
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // 1. Update active button state
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      const selectedFilter = this.getAttribute('data-filter');

      // 2. Filter projects with smooth fade transition
      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');

        if (selectedFilter === 'all' || itemCategory === selectedFilter) {
          item.classList.remove('hidden-project');
          // Trigger slight reflow for animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.classList.add('hidden-project');
          }, 300);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 9. Contact Form Validation & Submission
  // --------------------------------------------------------------------------
  /**
   * NOTE FOR USER:
   * To connect this static contact form to a live service like Formspree or EmailJS:
   * 1. FORMSPREE:
   *    Change the <form> attributes in index.html to:
   *    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   * 2. EMAILJS:
   *    Include EmailJS SDK and call emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', this)
   */
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      contactForm.classList.add('was-validated');

      // Simulate sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Sending Message...
      `;

      // Simulating a fast asynchronous response (500ms)
      setTimeout(() => {
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Show friendly success alert
        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('d-none');
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form fields
        contactForm.reset();
        contactForm.classList.remove('was-validated');

        // Automatically hide success alert after 6 seconds
        setTimeout(() => {
          if (formSuccessAlert) {
            formSuccessAlert.classList.add('d-none');
          }
        }, 6000);
      }, 600);
    });
  }

  // --------------------------------------------------------------------------
  // 10. Smooth CV Download Feedback
  // --------------------------------------------------------------------------
  const cvButtons = document.querySelectorAll('.btn-download-cv');
  cvButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Creates a temporary dummy blob or alert notifying user of CV download in demo
      const notification = document.createElement('div');
      notification.className = 'toast-notification';
      notification.style.position = 'fixed';
      notification.style.bottom = '90px';
      notification.style.right = '28px';
      notification.style.backgroundColor = '#111827';
      notification.style.color = '#ffffff';
      notification.style.padding = '14px 20px';
      notification.style.borderRadius = '12px';
      notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
      notification.style.zIndex = '9999';
      notification.style.fontSize = '0.9rem';
      notification.style.display = 'flex';
      notification.style.alignItems = 'center';
      notification.style.gap = '10px';
      notification.innerHTML = '<i class="bi bi-file-earmark-arrow-down-fill text-info"></i> Resume/CV file download initiated (Alex-Morgan-CV.pdf)';

      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.transition = 'opacity 0.4s ease';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 400);
      }, 3500);
    });
  });
});
