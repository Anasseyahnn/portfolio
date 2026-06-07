import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

/* ── language store ─────────────────────────────────────────── */
const Lstore = {
  lang: 'fr',
  subs: new Set(),
  set(l) {
    this.lang = l;
    try {
      localStorage.setItem('pf-lang', l);
    } catch (e) {}
    this.subs.forEach(f => f(l));
  }
};

try {
  const s = localStorage.getItem('pf-lang');
  if (s === 'en' || s === 'fr') Lstore.lang = s;
} catch (e) {}

export function useLang() {
  const [l, set] = useState(Lstore.lang);
  useEffect(() => {
    const f = x => set(x);
    Lstore.subs.add(f);
    set(Lstore.lang);
    return () => Lstore.subs.delete(f);
  }, []);
  return [l, x => Lstore.set(x)];
}

export function tr(l, fr, en) {
  return l === 'fr' ? fr : en;
}

/* ── scroll reveal ─────────────────────────────────────────── */
export function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > -40) {
        done = true;
        setSeen(true);
        cleanup();
      }
    };
    const cleanup = () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const t = setTimeout(check, 250);
    return () => {
      cleanup();
      clearTimeout(t);
    };
  }, []);
  return [ref, seen];
}

export function Reveal({ children, delay = 0, y = 22, style, as = 'div', ...rest }) {
  const [ref, seen] = useReveal();
  const T = as;
  return React.createElement(
    T,
    {
      ref,
      style: {
        opacity: seen ? 1 : 0,
        transform: seen ? 'none' : `translateY(${y}px)`,
        transition: `opacity .8s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform .8s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
        ...style
      },
      ...rest
    },
    children
  );
}

/* ── typewriter ─────────────────────────────────────────────── */
export function useTypewriter(strings, opts) {
  const o = Object.assign({ type: 60, pause: 1500, del: 30 }, opts || {});
  const [txt, setTxt] = useState('');
  const st = useRef({ i: 0, j: 0, del: false });
  useEffect(() => {
    st.current = { i: 0, j: 0, del: false };
    let to;
    const tick = () => {
      const s = strings[st.current.i % strings.length];
      if (!st.current.del) {
        st.current.j++;
        setTxt(s.slice(0, st.current.j));
        if (st.current.j >= s.length) {
          st.current.del = true;
          to = setTimeout(tick, o.pause);
          return;
        }
        to = setTimeout(tick, o.type);
      } else {
        st.current.j--;
        setTxt(s.slice(0, Math.max(0, st.current.j)));
        if (st.current.j <= 0) {
          st.current.del = false;
          st.current.i++;
          to = setTimeout(tick, 360);
          return;
        }
        to = setTimeout(tick, o.del);
      }
    };
    to = setTimeout(tick, 400);
    return () => clearTimeout(to);
  }, [strings.join('|')]);
  return txt;
}

/* ── count up ──────────────────────────────────────────────── */
export function useCountUp(target, run, dur = 1500) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(target * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return v;
}

/* ── neural background ─────────────────────────────────────────── */
export function NeuralBg({ mode = 'neural', accent = '#34d399', accent2 = '#60a5fa' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (mode === 'off') return;
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, dpr = Math.min(2, window.devicePixelRatio || 1), nodes = [], raf, pulses = [], mouse = { x: -999, y: -999 };
    const hex = (c) => {
      const m = c.replace('#', '');
      return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
    };
    const A = hex(accent), B = hex(accent2);
    function resize() {
      W = cv.width = window.innerWidth * dpr;
      H = cv.height = window.innerHeight * dpr;
      cv.style.width = window.innerWidth + 'px';
      cv.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((window.innerWidth * window.innerHeight) / (mode === 'grid' ? 22000 : 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - .5) * .22,
        vy: (Math.random() - .5) * .22,
        r: Math.random() * 1.5 + .7
      }));
    }
    resize();
    window.addEventListener('resize', resize);
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);
    const DIST = 130;
    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
        if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;
        const dxm = n.x - mouse.x, dym = n.y - mouse.y, dm = Math.hypot(dxm, dym);
        if (dm < 150) {
          n.x += dxm / dm * .6;
          n.y += dym / dm * .6;
        }
      }
      if (mode !== 'grid') {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < DIST) {
              const al = (1 - d / DIST) * .4;
              ctx.strokeStyle = `rgba(${B[0]},${B[1]},${B[2]},${al})`;
              ctx.lineWidth = .6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        if (Math.random() < .05 && nodes.length > 2) {
          const a = nodes[(Math.random() * nodes.length) | 0];
          let best = null, bd = DIST;
          for (const b of nodes) {
            if (b === a) continue;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < bd) {
              bd = d;
              best = b;
            }
          }
          if (best) pulses.push({ a, b: best, t: 0 });
        }
        pulses = pulses.filter(p => p.t <= 1);
        for (const p of pulses) {
          p.t += .028;
          const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
          ctx.fillStyle = `rgba(${A[0]},${A[1]},${A[2]},.9)`;
          ctx.shadowColor = `rgba(${A[0]},${A[1]},${A[2]},.9)`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 7);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = mode === 'grid' ? `rgba(${B[0]},${B[1]},${B[2]},.5)` : 'rgba(210,225,255,.6)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 7);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [mode, accent, accent2]);
  if (mode === 'off') return null;
  return React.createElement('canvas', {
    ref,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      opacity: mode === 'grid' ? .5 : .75
    }
  });
}

/* ── custom cursor ─────────────────────────────────────────── */
export function CustomCursor({ enabled = true, color = '#34d399' }) {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!enabled || matchMedia('(pointer:coarse)').matches) {
      document.body.style.cursor = '';
      return;
    }
    document.body.style.cursor = 'none';
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my, raf, hover = false, down = false;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target;
      hover = !!(t.closest && t.closest('a,button,[data-cursor],input,textarea'));
    };
    const dn = () => { down = true; };
    const up = () => { down = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', dn);
    window.addEventListener('mouseup', up);
    const loop = () => {
      rx += (mx - rx) * .18;
      ry += (my - ry) * .18;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      }
      if (ring.current) {
        const s = (hover ? 1.9 : 1) * (down ? .8 : 1);
        ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${s})`;
        ring.current.style.borderColor = hover ? color : 'rgba(255,255,255,.4)';
        ring.current.style.opacity = hover ? '1' : '.7';
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', dn);
      window.removeEventListener('mouseup', up);
      document.body.style.cursor = '';
    };
  }, [enabled, color]);
  if (!enabled) return null;
  return (
    <>
      <div ref={dot} style={{ position: 'fixed', top: 0, left: 0, width: 7, height: 7, borderRadius: 7, background: color, zIndex: 9999, pointerEvents: 'none', mixBlendMode: 'difference' }} />
      <div ref={ring} style={{ position: 'fixed', top: 0, left: 0, width: 30, height: 30, borderRadius: 30, border: '1.5px solid rgba(255,255,255,.4)', zIndex: 9999, pointerEvents: 'none', transition: 'opacity .2s, border-color .2s' }} />
    </>
  );
}

/* ── icons ──────────────────────────────────────────────────── */
export const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" width={p.s || 18} height={p.s || 18} fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width={p.s || 18} height={p.s || 18} fill="currentColor">
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.3a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6S12.6 13 12.6 14.2V19h-3v-9h2.9v1.2h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7z" />
    </svg>
  ),
  x: (p) => (
    <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="currentColor">
      <path d="M18.2 2h3.3l-7.2 8.3L23 22h-6.6l-5.2-6.8L5.2 22H1.9l7.7-8.8L1 2h6.8l4.7 6.2zm-1.2 18h1.8L7.1 3.9H5.2z" />
    </svg>
  ),
  kaggle: (p) => (
    <svg viewBox="0 0 24 24" width={p.s || 18} height={p.s || 18} fill="currentColor">
      <path d="M18.7 22h-2.9a.3.3 0 0 1-.26-.13l-4.2-5.3-1.18 1.13v4.04c0 .17-.13.26-.3.26H7.4c-.17 0-.3-.09-.3-.26V2.26c0-.17.13-.26.3-.26h2.27c.17 0 .3.09.3.26v12.07l5.05-5.1a.4.4 0 0 1 .3-.13h3a.22.22 0 0 1 .17.39l-5.3 5.13 5.5 7a.24.24 0 0 1-.19.39z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" width={p.s || 18} height={p.s || 18} fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  send: (p) => (
    <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  )
};
