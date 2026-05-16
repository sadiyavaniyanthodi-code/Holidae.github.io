// makes the navbar look different when you scroll down
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// opens and closes the mobile menu when the hamburger icon is clicked
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// animates elements into view as the user scrolls down the page
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
}

// animates elements into view as the user scrolls down the page
function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

// adds a slow zoom effect to the hero background image when the page loads
function initHeroBg() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  setTimeout(function () {
    heroBg.style.transform = 'scale(1)';
  }, 100);
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
    });
  });
}

// checks all the booking form fields before submitting and shows errors if something is wrong
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const allGroups = form.querySelectorAll('.form-group');
    allGroups.forEach(function (g) {
      g.classList.remove('error');
    });

    const name = document.getElementById('name');
    if (name && name.value.trim().length < 2) {
      showError(name, 'Please enter your full name.');
      valid = false;
    }

    const email = document.getElementById('email');
    if (email && !isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    const dest = document.getElementById('destination');
    if (dest && dest.value === '') {
      showError(dest, 'Please choose a destination.');
      valid = false;
    }

    const date = document.getElementById('travelDate');
    if (date && date.value === '') {
      showError(date, 'Please select a travel date.');
      valid = false;
    }

    const guests = document.getElementById('guests');
    if (guests && (guests.value < 1 || guests.value === '')) {
      showError(guests, 'Please enter number of guests.');
      valid = false;
    }

    // if everything is filled correctly, hide the form and show the success message
    if (valid) {
      const successMsg = document.getElementById('successMsg');
      if (successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      }
    }
  });
}

function showError(input, message) {
  const group = input.closest('.form-group');
  if (!group) return;
  group.classList.add('error');

  const errEl = group.querySelector('.form-error');
  if (errEl) {
    errEl.textContent = message;
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

const signupForm = document.getElementById('signupForm');

if (signupForm) {

  signupForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');

    const nameError = document.getElementById('signupNameError');
    const emailError = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');

    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    let valid = true;

    if (name.value.trim() === '') {
      nameError.textContent = 'Please enter your name';
      valid = false;
    }

    if (email.value.trim() === '') {
      emailError.textContent = 'Please enter your email';
      valid = false;
    }

    if (password.value.trim() === '') {
      passwordError.textContent = 'Please create a password';
      valid = false;
    }

    if (valid) {

    
      localStorage.setItem(
        'holidaeUser',
        name.value.trim()
      );

      alert('Account created successfully!');

      window.location.href = 'index.html';

    }

  });

}


document.addEventListener('DOMContentLoaded', function () {

  const userBtn = document.getElementById('userBtn');

  const savedUser = localStorage.getItem('holidaeUser');

  if (userBtn && savedUser) {

    userBtn.textContent = `Hi, ${savedUser}`;

    userBtn.removeAttribute('href');

  }

});

// runs all the functions above once the page has fully loaded
document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  setActiveNav();
  initHeroBg();
  initFilterTabs();
  initBookingForm();
  initSmoothScroll();
});