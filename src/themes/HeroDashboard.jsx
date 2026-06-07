import React, { useState, useEffect, useRef } from 'react';
import { useLang, tr, useCountUp } from '../components/PortLib';
import { scrollToId } from '../components/Nav';

function LineChart({ run }) {
  const pts = [12, 22, 18, 30, 26, 38, 34, 48, 44, 60, 56, 72];
  const W = 520, H = 180, pad = 8;
  const max = 80;
  const coords = pts.map((p, i) => [pad + (i / (pts.length - 1)) * (W - pad * 2), H - pad - (p / max) * (H - pad * 2)]);
  const d = coords.map((c, i) => (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1)).join(' ');
  const area = d + ` L ${coords[coords.length - 1][0].toFixed(1)} ${H} L ${coords[0][0].toFixed(1)} ${H} Z`;
  const ref = useRef(null);
  const [len, setLen] = useState(900);
  
  useEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength());
  }, []);
  
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(16,185,129,.34)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
        </linearGradient>
        <linearGradient id="dashLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--em-glow)" />
          <stop offset="100%" stopColor="var(--bl-glow)" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,.06)" />)}
      <path d={area} fill="url(#dashArea)" style={{ opacity: run ? 1 : 0, transition: 'opacity 1s ease 0.5s' }} />
      <path ref={ref} d={d} fill="none" stroke="url(#dashLine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: len, strokeDashoffset: run ? 0 : len, transition: 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)' }} />
      {coords.map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r="3" fill="#0b0d10" stroke="var(--em-glow)" strokeWidth="2"
          style={{ opacity: run ? 1 : 0, transition: `opacity .3s ease ${0.6 + i * 0.08}s` }} />
      ))}
    </svg>
  );
}

function KpiCard({ value, suffix, label, run, delay, color }) {
  const v = useCountUp(value, run, 1500 + (delay || 0));
  const display = value >= 10 ? Math.round(v) : v.toFixed(1).replace('.0', '');
  return (
    <div style={{ padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 12, background: 'rgba(255,255,255,.02)' }}>
      <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 26, color: color || '#fff', lineHeight: 1 }}>
        {display}<span style={{ fontSize: 16, color: 'var(--mut)' }}>{suffix}</span>
      </div>
      <div style={{ marginTop: 7, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.1em', color: 'var(--faint)', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function Bars({ run }) {
  const vals = [40, 65, 52, 78, 90, 70];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 56 }}>
      {vals.map((v, i) => (
        <div key={i} style={{ flex: 1, height: run ? `${v}%` : '4%', borderRadius: 3, background: i === 4 ? 'var(--em-glow)' : 'rgba(96,165,250,.45)', transition: `height .9s cubic-bezier(.4,0,.2,1) ${i * 0.08}s` }} />
      ))}
    </div>
  );
}

export function HeroDashboard() {
  const [lang] = useLang();
  const run = true;
  const [lat, setLat] = useState(142);
  
  useEffect(() => {
    const id = setInterval(() => setLat(120 + Math.round(Math.random() * 46)), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.08fr', overflow: 'hidden', background: 'var(--bg)' }} className="hero-grid">
      {/* LEFT editorial */}
      <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid var(--line)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -120, left: -100, width: 360, height: 360, background: 'radial-gradient(circle, rgba(59,130,246,.14), transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.24em', color: 'var(--mut)' }}>
            <span style={{ width: 30, height: 1, background: 'var(--em)' }} />
            {tr(lang, 'DATA · IA · DÉCISION', 'DATA · AI · DECISIONS')}
          </div>
          <h1 style={{ margin: '24px 0 0', fontWeight: 700, fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: .96, letterSpacing: '-0.03em' }}>
            {tr(lang, 'Transformer la', 'Turning')}<br />
            <span style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(50px, 5.5vw, 80px)', background: 'linear-gradient(90deg,var(--em-glow),var(--bl-glow))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              {tr(lang, 'donnée', 'data')}
            </span><br />
            {tr(lang, 'en décision.', 'into decisions.')}
          </h1>
          <p style={{ marginTop: 26, maxWidth: 380, fontSize: 15, lineHeight: 1.6, color: 'var(--mut)' }}>
            {tr(lang,
              'Data Scientist & Spécialiste LLM. Je construis des produits data et des applications IA qui passent en production — du modèle au dashboard.',
              'Data Scientist & LLM Specialist. I build data products and AI apps that ship to production — from model to dashboard.')}
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 13, flexWrap: 'wrap' }}>
            <button onClick={() => scrollToId('chat')} data-cursor style={{
              padding: '13px 24px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: '#06120d',
              background: 'var(--em-glow)', display: 'flex', alignItems: 'center', gap: 9, transition: 'transform .2s,box-shadow .25s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px -8px var(--em-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              {tr(lang, 'Discuter avec mon IA', 'Chat with my AI')} →
            </button>
            <button onClick={() => scrollToId('work')} data-cursor style={{
              padding: '13px 24px', borderRadius: 9, cursor: 'pointer', fontFamily: 'var(--mono)',
              fontSize: 13, fontWeight: 600, color: 'var(--ink)', background: 'transparent',
              border: '1px solid var(--line)', transition: 'border-color .25s'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--bl-glow)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
              {tr(lang, 'Voir le portfolio', 'See portfolio')}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT dashboard */}
      <div style={{ padding: '40px 44px', display: 'flex', flexDirection: 'column', gap: 16, background: 'linear-gradient(180deg,#0a0c0f,#070708)', justifyContent: 'center', position: 'relative' }}>
        {/* chart card */}
        <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'rgba(13,14,16,.6)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.14em', color: 'var(--faint)', textTransform: 'uppercase' }}>{tr(lang, 'Impact projet · 12 mois', 'Project impact · 12 mo')}</div>
              <div style={{ fontWeight: 700, fontSize: 22, marginTop: 4 }}>+72% <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--em-glow)' }}>{tr(lang, 'efficacité', 'efficiency')}</span></div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['1S', '6M', '1A'].map((t, i) => <span key={t} style={{ padding: '5px 11px', borderRadius: 7, fontFamily: 'var(--mono)', fontSize: 11, color: i === 2 ? '#06120d' : 'var(--mut)', background: i === 2 ? 'var(--em-glow)' : 'rgba(255,255,255,.05)' }}>{t}</span>)}
            </div>
          </div>
          <LineChart run={run} />
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          <KpiCard value={3} suffix="+" label={tr(lang, 'ans xp', 'yrs xp')} run={run} delay={0} color="#fff" />
          <KpiCard value={15} suffix="+" label={tr(lang, 'projets', 'projects')} run={run} delay={120} color="var(--em-glow)" />
          <KpiCard value={50} suffix="+" label={tr(lang, 'formés', 'trained')} run={run} delay={240} color="#fff" />
          <KpiCard value={10} suffix="+" label="LLM apps" run={run} delay={360} color="var(--bl-glow)" />
        </div>

        {/* bottom row: bars + live latency */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'rgba(13,14,16,.6)', padding: '16px 18px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--faint)', textTransform: 'uppercase', marginBottom: 12 }}>{tr(lang, 'Compétences · maîtrise', 'Skills · proficiency')}</div>
            <Bars run={run} />
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'rgba(13,14,16,.6)', padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: 'var(--em-glow)', boxShadow: '0 0 8px var(--em-glow)' }} />{tr(lang, 'latence LLM · live', 'LLM latency · live')}
            </div>
            <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 34, marginTop: 8 }}>{lat}<span style={{ fontSize: 16, color: 'var(--mut)' }}>ms</span></div>
            <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, (lat / 200) * 100)}%`, background: 'linear-gradient(90deg,var(--em-glow),var(--bl-glow))', transition: 'width .6s ease', borderRadius: 3 }} />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div onClick={() => scrollToId('about')} data-cursor style={{ position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>Scroll</span>
          <span style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,var(--em-glow),transparent)' }} />
        </div>
      </div>
    </section>
  );
}
export default HeroDashboard;
