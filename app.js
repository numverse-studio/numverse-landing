/* NumVerse Landing — app.js */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .step, .feature-card, .team-card').forEach(el => {
  revealObserver.observe(el);
});

// ── Step stagger ──
document.querySelectorAll('.step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.15}s`;
});

// ── Feature cards stagger ──
document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// ── Smooth active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Floating numbers parallax ──
const floatingNums = document.querySelectorAll('.floating-num');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  floatingNums.forEach((num, i) => {
    const depth = (i % 3 + 1) * 6;
    num.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
});

// ── Download button — replace # with real link ──
// To set your APK download link, change the href of #download-app
// To set the manual link, change the href of #manual-link
const downloadApp  = document.getElementById('download-app');
const manualLink   = document.getElementById('manual-link');

// Example (uncomment and fill in when ready):
// downloadApp.href = 'https://your-server.com/numverse.apk';
// manualLink.href  = 'https://docs.google.com/your-manual-id';

// ── Ripple effect on download buttons ──
document.querySelectorAll('.dl-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
      showComingSoon(this);
    }
  });
});

function showComingSoon(btn) {
  const toast = document.createElement('div');
  toast.textContent = '¡Enlace próximamente disponible!';
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
    color: #fff;
    padding: 14px 28px;
    border-radius: 100px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: .9rem;
    z-index: 9999;
    box-shadow: 0 8px 30px rgba(124,58,237,.5);
    animation: toastIn .3s ease;
    white-space: nowrap;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(-50%) translateY(20px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity .3s, transform .3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => { toast.remove(); style.remove(); }, 300);
  }, 2500);
}
