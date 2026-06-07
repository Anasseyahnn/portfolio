import React, { useState, useEffect, useRef } from 'react';
import { useLang, tr, useTypewriter, useCountUp, Icon } from '../components/PortLib';
import { scrollToId } from '../components/Nav';
import { DATA } from '../data';

function MonoTerminal() {
  const [lang] = useLang();
  const cmds = [
    { t: '$ python pipeline.py --model llm-prod', c: 'var(--ink)' },
    { t: '> embedding 12.4k docs … ok', c: 'var(--em-glow)' },
    { t: '$ deploy-ml --target k8s-cluster', c: 'var(--ink)' },
    { t: '> rollout llm-endpoint … ✓ live', c: 'var(--bl-glow)' }
  ];
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    let to;
    const tick = () => {
      if (line >= cmds.length) {
        to = setTimeout(() => { setLine(0); setChars(0); }, 4000);
        return;
      }
      const text = cmds[line].t;
      if (chars < text.length) {
        setChars(c => c + 1);
        to = setTimeout(tick, text.startsWith('$') ? 35 : 10);
      } else {
        to = setTimeout(() => {
          setLine(l => l + 1);
          setChars(0);
        }, 500);
      }
    };
    to = setTimeout(tick, line === 0 && chars === 0 ? 1000 : 0);
    return () => clearTimeout(to);
  }, [line, chars]);

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'rgba(11,13,16,.72)', backdropFilter: 'blur(8px)', overflow: 'hidden', boxShadow: '0 20px 60px -30px rgba(0,0,0,.8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 15px', borderBottom: '1px solid var(--line)' }}>
        <span style={{ width: 11, height: 11, borderRadius: 6, background: '#ff5f57' }} />
        <span style={{ width: 11, height: 11, borderRadius: 6, background: '#febc2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: 6, background: '#28c840' }} />
        <span style={{ marginLeft: 8, fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--faint)' }}>~/anasse — zsh</span>
      </div>
      <div style={{ padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: 13.5, lineHeight: 1.95, minHeight: 140 }}>
        {cmds.slice(0, line).map((c, i) => (
          <div key={i} style={{ color: c.c }}>{c.t}</div>
        ))}
        {line < cmds.length && (
          <div style={{ color: cmds[line].c }}>
            {cmds[line].t.slice(0, chars)}
            <span style={{ animation: 'dirBlink 1s step-end infinite', color: 'var(--bl-glow)' }}>▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

function HeroMetric({ m, lang, run, delay }) {
  const v = useCountUp(m.v, run, 1400 + delay);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(28px,3.4vw,42px)', color: 'var(--ink)', lineHeight: 1 }}>
        {Math.round(v)}
        <span style={{ color: 'var(--em-glow)' }}>{m.suf}</span>
      </span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '.12em', color: 'var(--faint)', textTransform: 'uppercase' }}>{m[lang]}</span>
    </div>
  );
}

export function HeroMono() {
  const [lang] = useLang();
  const roles = lang === 'fr' 
    ? ['Data Scientist', 'Ingénieur IA', 'Spécialiste LLM', 'Formateur R / Python'] 
    : ['Data Scientist', 'AI Engineer', 'LLM Specialist', 'R / Python Instructor'];
  const role = useTypewriter(roles, { type: 65, pause: 1300 });
  const seen = true;

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px clamp(20px,4vw,48px) 60px' }}>
      {/* grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: .4,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.10) 1px, transparent 0)',
        backgroundSize: '40px 40px', animation: 'dirGrid 9s linear infinite', maskImage: 'radial-gradient(120% 90% at 70% 0%, #000 40%, transparent 100%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr .85fr', gap: 'clamp(24px,4vw,64px)', alignItems: 'center' }} className="hero-grid">
          {/* left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 48, height: 1, background: 'linear-gradient(90deg,var(--em),transparent)' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '.26em', color: 'var(--mut)', textTransform: 'uppercase' }}>
                {role}
                <span style={{ animation: 'dirBlink 1s step-end infinite', color: 'var(--em-glow)' }}>_</span>
              </span>
            </div>
            <h1 style={{ margin: '26px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, letterSpacing: '-.05em', lineHeight: .85, textTransform: 'uppercase', fontSize: 'clamp(54px, 9vw, 140px)' }}>
              {['Creative', 'Data'].map((w, i) => (
                <div key={w} style={{ color: i === 1 ? 'rgba(246,247,248,.30)' : 'var(--ink)' }}>{w}</div>
              ))}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px,2vw,26px)', flexWrap: 'wrap' }}>
                <span style={{ background: 'linear-gradient(90deg,var(--em-glow),var(--bl-glow))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Science</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px,4vw,56px)', fontWeight: 400, textTransform: 'none', color: 'var(--mut)', letterSpacing: 0, fontStyle: 'italic' }}>&amp; LLM apps</span>
              </div>
            </h1>
            <p style={{ marginTop: 28, maxWidth: 480, fontFamily: 'var(--mono)', fontSize: 'clamp(13px,1.3vw,15px)', lineHeight: 1.7, color: 'var(--mut)' }}>{DATA.tagline[lang]}</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 13, flexWrap: 'wrap' }}>
              <button onClick={() => scrollToId('contact')} data-cursor className="btn-primary" style={{
                padding: '13px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: '#06120d',
                background: 'var(--em-glow)', display: 'flex', alignItems: 'center', gap: 9, transition: 'transform .2s,box-shadow .25s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px -8px var(--em-glow)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                {tr(lang, 'Me contacter', 'Get in touch')} {Icon.arrow({ s: 15 })}
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
          {/* right: terminal + status */}
          <div>
            <MonoTerminal />
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.05em', textTransform: 'uppercase' }}>
              {[[tr(lang, 'Localisation', 'Location'), DATA.identity.location[lang]], [tr(lang, 'Expérience', 'Experience'), '3+ ' + tr(lang, 'ans', 'yrs')]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--line)', color: 'var(--faint)' }}>
                  <span>{k}</span>
                  <span style={{ color: 'var(--ink)' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', color: 'var(--faint)' }}>
                <span>{tr(lang, 'Statut', 'Status')}</span>
                <span style={{ color: 'var(--em-glow)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ position: 'relative', width: 8, height: 8 }}>
                    <span style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'var(--em-glow)' }} />
                    <span style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'var(--em-glow)', animation: 'dirPing 1.8s ease-out infinite' }} />
                  </span>
                  {tr(lang, 'Disponible', 'Available')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* metrics */}
        <div style={{ marginTop: 'clamp(40px,6vh,76px)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(12px,2vw,28px)', borderTop: '1px solid var(--line)', paddingTop: 28 }} className="hero-metrics">
          {DATA.metrics.map((m, i) => (
            <HeroMetric key={i} m={m} lang={lang} run={seen} delay={i * 120} />
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div onClick={() => scrollToId('about')} data-cursor style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>Scroll</span>
        <span style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,var(--em-glow),transparent)' }} />
      </div>
    </section>
  );
}
export default HeroMono;
