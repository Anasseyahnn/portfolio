import React, { useState, useEffect, useRef } from 'react';
import { useLang, tr, Icon } from '../components/PortLib';
import { scrollToId } from '../components/Nav';
import { DATA } from '../data';

function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const host = cv.parentElement;
    let W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    let nodes = [], raf, pulses = [];
    
    function resize() {
      W = host.offsetWidth || window.innerWidth;
      H = host.offsetHeight || window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((W * H) / 16000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .25,
        vy: (Math.random() - .5) * .25,
        r: Math.random() * 1.6 + .8
      }));
    }
    
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const DIST = 132;
    
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < DIST) {
            const al = (1 - d / DIST) * .5;
            ctx.strokeStyle = `rgba(96,165,250,${al * .55})`;
            ctx.lineWidth = .7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // occasional pulse
      if (Math.random() < .06 && nodes.length > 2) {
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
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        p.t += .03;
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.fillStyle = 'rgba(52,211,153,.9)';
        ctx.shadowColor = 'rgba(52,211,153,.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(200,225,255,.75)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 7);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}

function Pipeline() {
  const [lang] = useLang();
  const stages = ['PROMPT', 'EMBED', 'RETRIEVE', 'LLM', 'STREAM'];
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % (stages.length + 1)), 720);
    return () => clearInterval(id);
  }, [stages.length]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '16px 20px', border: '1px solid var(--line)', borderRadius: 14, background: 'rgba(8,10,14,.7)', backdropFilter: 'blur(8px)' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--faint)', marginRight: 18, whiteSpace: 'nowrap' }}>RAG · LLM PIPELINE</span>
      {stages.map((s, i) => {
        const on = i <= active - 1 || i === active;
        const cur = i === active;
        return (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <div style={{
                width: 13, height: 13, borderRadius: 7,
                background: on ? 'var(--em-glow)' : 'rgba(255,255,255,.14)',
                boxShadow: cur ? '0 0 16px 4px rgba(52,211,153,.8)' : on ? '0 0 8px rgba(52,211,153,.5)' : 'none',
                transition: 'all .3s',
              }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', color: on ? 'var(--ink)' : 'var(--faint)', transition: 'color .3s' }}>{s}</span>
            </div>
            {i < stages.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 10px', marginBottom: 18, background: 'rgba(255,255,255,.1)', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                <div style={{ position: 'absolute', inset: 0, width: i < active ? '100%' : '0%', background: 'linear-gradient(90deg,var(--em),var(--bl-glow))', transition: 'width .5s ease' }} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function HeroNeural() {
  const [lang] = useLang();
  const orbit = ['LLM', 'RAG', 'PyTorch', 'LangChain', 'Ollama', 'Groq'];
  
  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'radial-gradient(120% 100% at 80% 0%, #0a1622 0%, #060708 55%)', justifyContent: 'center' }}>
      <NeuralCanvas />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 60% at 30% 40%, transparent, rgba(6,7,8,.6))', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '120px clamp(20px,4vw,48px) 60px', display: 'flex', flexDirection: 'column' }}>
        {/* top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--mono)', fontSize: 12.5, letterSpacing: '.24em', color: 'var(--mut)' }}>
          <span style={{ position: 'relative', width: 8, height: 8 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'var(--em-glow)' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'var(--em-glow)', animation: 'dirPing 1.8s ease-out infinite' }} />
          </span>
          {tr(lang, 'LABORATOIRE IA · ABIDJAN', 'AI LABORATORY · ABIDJAN')}
        </div>

        {/* main */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr .85fr', gap: 'clamp(24px,4vw,64px)', alignItems: 'center', marginTop: 28 }} className="hero-grid">
          <div>
            <h1 style={{ margin: 0, fontWeight: 700, lineHeight: .9, letterSpacing: '-0.04em', fontSize: 'clamp(54px, 8vw, 104px)', textTransform: 'uppercase' }}>
              <div style={{ color: '#fff', textShadow: '0 0 40px rgba(96,165,250,.4)' }}>AI</div>
              <div style={{ background: 'linear-gradient(90deg,var(--em-glow),var(--bl-glow))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'dirGlow 4s ease-in-out infinite' }}>Engineer</div>
            </h1>
            <p style={{ marginTop: 22, maxWidth: 440, fontFamily: 'var(--mono)', fontSize: 'clamp(13px,1.3vw,14.5px)', lineHeight: 1.75, color: 'var(--mut)' }}>
              {tr(lang,
                'Je conçois des applications propulsées par les LLMs — du prompt à la production. Pipelines RAG, agents, et déploiements cloud robustes.',
                'I build LLM-powered applications — from prompt to production. RAG pipelines, agents, and robust cloud deployments.')}
            </p>
            <div style={{ marginTop: 32 }}><Pipeline /></div>
            
            <div style={{ marginTop: 32, display: 'flex', gap: 13, flexWrap: 'wrap' }}>
              <button onClick={() => scrollToId('chat')} data-cursor style={{
                padding: '13px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: '#06120d',
                background: 'var(--em-glow)', display: 'flex', alignItems: 'center', gap: 9, transition: 'transform .2s,box-shadow .25s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px -8px var(--em-glow)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                {tr(lang, 'Discuter avec mon IA', 'Chat with my AI')} {Icon.arrow({ s: 15 })}
              </button>
              <button onClick={() => scrollToId('work')} data-cursor style={{
                padding: '13px 24px', borderRadius: 10, cursor: 'pointer', fontFamily: 'var(--mono)',
                fontSize: 13, fontWeight: 600, color: 'var(--ink)', background: 'transparent',
                border: '1px solid var(--line)', transition: 'border-color .25s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--bl-glow)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                {tr(lang, 'Voir le portfolio', 'See portfolio')}
              </button>
            </div>
          </div>

          {/* portrait orbit */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 'clamp(200px, 25vw, 280px)', aspectRatio: '1', animation: 'dirFloat 6s ease-in-out infinite' }}>
              <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--em-glow), var(--bl-glow), var(--em-glow))', animation: 'dirSpin 8s linear infinite', filter: 'blur(2px)', opacity: .9 }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', border: '3px solid #060708' }}>
                <img src="assets/profile.jpg" alt="Anassé" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(.2) contrast(1.05)' }} />
              </div>
              {/* orbiting tags */}
              <div style={{ position: 'absolute', inset: -44, animation: 'dirSpin 18s linear infinite' }}>
                {orbit.map((t, i) => {
                  const ang = (i / orbit.length) * Math.PI * 2;
                  const R = window.innerWidth < 560 ? 120 : 168;
                  return (
                    <span key={t} style={{
                      position: 'absolute', left: '50%', top: '50%',
                      transform: `translate(-50%,-50%) translate(${Math.cos(ang) * R}px, ${Math.sin(ang) * R}px)`,
                    }}>
                      <span style={{ display: 'inline-block', animation: 'dirSpin 18s linear infinite reverse', padding: '4px 10px', borderRadius: 20, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)', background: 'rgba(13,18,26,.9)', border: '1px solid rgba(96,165,250,.4)', whiteSpace: 'nowrap' }}>{t}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* footer metrics */}
        <div style={{ display: 'flex', gap: 36, paddingTop: 28, borderTop: '1px solid var(--line)', fontFamily: 'var(--mono)', marginTop: 48, flexWrap: 'wrap' }} className="hero-metrics">
          {[['3+', tr(lang, 'ANS XP', 'YRS XP')], ['15+', tr(lang, 'PROJETS IA', 'AI PROJECTS')], ['50+', tr(lang, 'FORMÉS', 'TRAINED')], ['<150ms', tr(lang, 'LATENCE', 'LATENCY')]].map(([v, k]) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', fontFamily: 'var(--disp)' }}>{v}</span>
              <span style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--faint)' }}>{k}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div onClick={() => scrollToId('about')} data-cursor style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>Scroll</span>
        <span style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,var(--em-glow),transparent)' }} />
      </div>
    </section>
  );
}
export default HeroNeural;
