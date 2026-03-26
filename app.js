/* ============================================================
   MAYUR NAYAK — PORTFOLIO JS
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initThemeToggle();
  initNav();
  initMobileMenu();
  initTypingEffect();
  initScrollReveal();
  initScrollProgress();
  initBlogModal();
  initSmoothScroll();
});

/* ── PARTICLE CANVAS ── */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const COUNT = Math.min(60, Math.floor(window.innerWidth / 18));

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.life = 1;
    }
    update() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.4;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10 || this.x < -20 || this.x > W + 20) this.reset();
    }
    draw() {
      const color = isDark() ? '0, 194, 255' : '0, 100, 180';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    const color = isDark() ? '0, 194, 255' : '0, 100, 180';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${(1 - dist / 120) * 0.12})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }
  loop();
}

/* ── THEME TOGGLE ── */
function initThemeToggle() {
  const btn = document.getElementById('theme-btn');
  const html = document.documentElement;

  const saved = localStorage.getItem('mn-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  btn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('mn-theme', next);
  });
}

/* ── NAVIGATION ── */
function initNav() {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  let lastY = 0;

  function onScroll() {
    const y = window.scrollY;

    // Scrolled class
    if (y > 40) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');

    // Active link
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      const bot = top + sec.offsetHeight;
      if (y >= top && y < bot) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__link[data-section="${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });

    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('mobile-menu');
  const close     = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
  close?.addEventListener('click', closeMenu);
  mobileLinks.forEach(l => l.addEventListener('click', closeMenu));
}

/* ── TYPING EFFECT ── */
function initTypingEffect() {
  const target = document.getElementById('typing-target');
  if (!target) return;

  const phrases = [
    'AI Enthusiast',
    'ML Engineer',
    'NLP Practitioner',
    'LLM Fine-tuner',
    'AI Agent Builder',
  ];

  let pi = 0, ci = 0, deleting = false;
  const PAUSE = 1800, TYPE_SPEED = 80, DEL_SPEED = 45;

  function tick() {
    const word = phrases[pi];
    if (!deleting) {
      target.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    } else {
      target.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? DEL_SPEED : TYPE_SPEED);
  }
  setTimeout(tick, 600);
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep them visible
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── SCROLL PROGRESS ── */
function initScrollProgress() {
  const bar = document.getElementById('nav-progress');
  if (!bar) return;

  function update() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
}

/* ── BLOG MODAL ── */
function initBlogModal() {
  const overlay = document.getElementById('modal-overlay');
  const body    = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay) return;

  function openPost(id) {
    const tpl = document.getElementById(`post-${id}`);
    if (!tpl) return;
    body.innerHTML = tpl.innerHTML;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Scroll overlay to top
    overlay.scrollTop = 0;
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // "Read More" buttons
  document.querySelectorAll('.bcard__btn').forEach(btn => {
    btn.addEventListener('click', () => openPost(btn.dataset.post));
  });

  // Close button
  closeBtn?.addEventListener('click', closeModal);

  // Click outside modal
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
