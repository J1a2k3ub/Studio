document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const mainContent = document.getElementById('main');
  const showCenikBtn = document.getElementById('show-cenik-btn');
  const cenikSection = document.getElementById('cenik-section');
  const navBackdrop = document.getElementById('navBackdrop');

  const openMenu = () => {
    if (!navLinks.classList.contains('active')) {
      navLinks.classList.add('active');
      hamburger.classList.add('active');
      mainContent.classList.add('menu-open');
      document.body.classList.add('menu-open');
    }
  };
  const closeMenu = () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    mainContent.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
  };
  const toggleMenu = () => navLinks.classList.contains('active') ? closeMenu() : openMenu();

  if (hamburger && navLinks && mainContent) {
    hamburger.addEventListener('click', toggleMenu);
  }
  if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  if (showCenikBtn && cenikSection) {
    showCenikBtn.addEventListener('click', () => {
      const isActive = cenikSection.classList.toggle('active');
      showCenikBtn.textContent = isActive ? 'Skrýt ceník' : 'Zobrazit ceník';
      if (isActive) {
        setTimeout(() => {
          cenikSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      }
    });
  }

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  window.initGallery = function(galleryId) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;
    let isDown = false, startX, scrollLeft;

    const start = (x) => { isDown = true; gallery.classList.add('active'); startX = x - gallery.offsetLeft; scrollLeft = gallery.scrollLeft; };
    const move = (x, e) => {
      if (!isDown) return;
      e && e.preventDefault();
      const walk = (x - startX) * 2;
      gallery.scrollLeft = scrollLeft - walk;
    };
    const end = () => { isDown = false; gallery.classList.remove('active'); };

    gallery.addEventListener('mousedown', (e) => start(e.pageX));
    gallery.addEventListener('mousemove', (e) => move(e.pageX, e));
    gallery.addEventListener('mouseleave', end);
    gallery.addEventListener('mouseup', end);

    gallery.addEventListener('touchstart', (e) => start(e.touches[0].pageX), { passive: true });
    gallery.addEventListener('touchmove', (e) => move(e.touches[0].pageX), { passive: false });
    gallery.addEventListener('touchend', end);
  };
});
