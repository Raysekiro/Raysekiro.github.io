const header = document.querySelector('[data-header]');
const nav = document.querySelector('#site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -60% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
