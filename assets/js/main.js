/**
 * QuantArth — Main JavaScript
 *
 * Responsibilities:
 *  1. Neural-network canvas animation (background)
 *  2. Scroll-driven reveal for theme cards
 *  3. Respects prefers-reduced-motion
 */

'use strict';

/* ── 1. Reduced-motion guard ──────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 2. Neural-network canvas background ─────────────────── */
(function initNeuralCanvas() {
  if (prefersReducedMotion) return;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes, animId;

  const CONFIG = {
    nodeCount:      72,
    minRadius:      1.2,
    maxRadius:      2.8,
    connectionDist: 160,
    speed:          0.18,
    lineOpacityMax: 0.22,
    nodePrimaryColor:   '0, 212, 255',    /* --color-accent-primary */
    nodeSecondaryColor: '99, 102, 241',   /* --color-accent-tertiary */
    nodeTertColor:      '20, 184, 166',   /* --color-accent-teal    */
  };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function pickColor() {
    const palette = [
      CONFIG.nodePrimaryColor,
      CONFIG.nodePrimaryColor,
      CONFIG.nodeSecondaryColor,
      CONFIG.nodeTertColor,
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  function createNodes() {
    nodes = Array.from({ length: CONFIG.nodeCount }, () => ({
      x:    randomBetween(0, W),
      y:    randomBetween(0, H),
      vx:   randomBetween(-CONFIG.speed, CONFIG.speed),
      vy:   randomBetween(-CONFIG.speed, CONFIG.speed),
      r:    randomBetween(CONFIG.minRadius, CONFIG.maxRadius),
      color: pickColor(),
      pulse: randomBetween(0, Math.PI * 2),
    }));
  }

  function drawFrame(ts) {
    ctx.clearRect(0, 0, W, H);

    /* Update positions */
    for (const n of nodes) {
      n.x  += n.vx;
      n.y  += n.vy;
      n.pulse += 0.018;

      if (n.x < -20)  n.x = W + 20;
      if (n.x > W+20) n.x = -20;
      if (n.y < -20)  n.y = H + 20;
      if (n.y > H+20) n.y = -20;
    }

    /* Draw connections */
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CONFIG.connectionDist) continue;

        const alpha = (1 - dist / CONFIG.connectionDist) * CONFIG.lineOpacityMax;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${a.color}, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    /* Draw nodes */
    for (const n of nodes) {
      const pulsedR = n.r + Math.sin(n.pulse) * 0.6;
      /* Outer glow */
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsedR * 5);
      grad.addColorStop(0, `rgba(${n.color}, 0.28)`);
      grad.addColorStop(1, `rgba(${n.color}, 0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, pulsedR * 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      /* Core dot */
      ctx.beginPath();
      ctx.arc(n.x, n.y, pulsedR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color}, 0.85)`;
      ctx.fill();
    }

    animId = requestAnimationFrame(drawFrame);
  }

  function init() {
    resize();
    createNodes();
    animId = requestAnimationFrame(drawFrame);
  }

  function handleResize() {
    cancelAnimationFrame(animId);
    resize();
    createNodes();
    animId = requestAnimationFrame(drawFrame);
  }

  window.addEventListener('resize', handleResize, { passive: true });
  init();
})();

/* ── 3. Scroll-reveal for theme cards ────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (prefersReducedMotion) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();

/* ── 4. Hero SVG node micro-animation via JS ──────────────── */
(function animateHeroNodes() {
  if (prefersReducedMotion) return;

  const nodes = document.querySelectorAll('.hero-node-js');
  if (!nodes.length) return;

  nodes.forEach((node, i) => {
    let phase = (i / nodes.length) * Math.PI * 2;
    const baseR = parseFloat(node.getAttribute('r') || '4');

    function tick() {
      phase += 0.025 + i * 0.003;
      const r = baseR + Math.sin(phase) * 1.4;
      node.setAttribute('r', r.toFixed(2));
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
})();
