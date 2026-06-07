import React, { useState, useRef } from 'react';
import { useLang, tr, Reveal, Icon } from './PortLib';
import { SecHead } from './About';
import { DATA } from '../data';

// Premium Breast Cancer ML Demo
function BreastCancerDemo({ onClose, lang }) {
  const [radius, setRadius] = useState(14);
  const [texture, setTexture] = useState(19);
  const [area, setArea] = useState(650);
  const [concavity, setConcavity] = useState(0.08);

  const score = -12.5 + (0.45 * radius) + (0.08 * texture) + (0.0045 * area) + (12.0 * concavity);
  const probability = 1 / (1 + Math.exp(-score));
  const isMalignant = probability >= 0.5;
  const accent = isMalignant ? '#f43f5e' : 'var(--em-glow)';

  const Slider = ({ label, value, min, max, step, unit, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'rgba(255,255,255,0.015)', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 11.5, fontFamily: 'var(--mono)', color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</span>
        <span style={{ fontSize: 16, fontFamily: 'var(--disp)', fontWeight: 600, color: 'var(--ink)' }}>{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(3) : value} <span style={{ fontSize: 11, color: 'var(--faint)' }}>{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} style={{ width: '100%', cursor: 'pointer', accentColor: accent, transition: 'accent-color 0.3s' }} />
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999, display: 'grid', placeItems: 'center',
      background: 'rgba(5,6,8,0.85)', backdropFilter: 'blur(16px)', padding: 20
    }}>
      <div style={{
        width: '100%', maxWidth: 860, background: '#0d0e12', border: '1px solid var(--line)',
        borderRadius: 24, color: 'var(--ink)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        position: 'relative', animation: 'dirRise 0.4s cubic-bezier(0.2,0.8,0.2,1)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }}>
        {/* Top Glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transition: 'background 0.5s' }} />
        
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--line)', color: 'var(--ink)', width: 34, height: 34,
          borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'background 0.2s'
        }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>✕</button>

        <div style={{ padding: '32px 40px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: accent, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.3s' }}>
            {tr(lang, 'Démo Interactive · Inférence Locale', 'Interactive Demo · Local Inference')}
          </div>
          <h3 style={{ margin: 0, fontSize: 26, fontFamily: 'var(--disp)', fontWeight: 700, letterSpacing: '-.02em' }}>
            {tr(lang, 'Diagnostic IA du Cancer du Sein', 'AI Breast Cancer Diagnostic')}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left: Sliders */}
          <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Slider label={tr(lang, 'Rayon Moyen', 'Mean Radius')} value={radius} min={6} max={28} step={0.1} unit="mm" onChange={e => setRadius(parseFloat(e.target.value))} />
            <Slider label={tr(lang, 'Texture Moyenne', 'Mean Texture')} value={texture} min={9} max={38} step={0.1} unit="" onChange={e => setTexture(parseFloat(e.target.value))} />
            <Slider label={tr(lang, 'Aire Moyenne', 'Mean Area')} value={area} min={140} max={2200} step={10} unit="mm²" onChange={e => setArea(parseInt(e.target.value))} />
            <Slider label={tr(lang, 'Concavité Moyenne', 'Mean Concavity')} value={concavity} min={0} max={0.45} step={0.005} unit="" onChange={e => setConcavity(parseFloat(e.target.value))} />
          </div>

          {/* Right: Results Panel */}
          <div style={{ padding: '32px 40px', background: 'rgba(255,255,255,0.015)', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${accent}15, transparent 70%)`, opacity: 0.6, transition: 'background 0.5s' }} />
            
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: 140, height: 140, display: 'grid', placeItems: 'center', marginBottom: 24 }}>
                <svg width="140" height="140" viewBox="0 0 36 36" style={{ filter: `drop-shadow(0 0 12px ${accent}40)` }}>
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                  <circle cx="18" cy="18" r="15.91" fill="none" 
                    stroke={accent} 
                    strokeWidth="2.5" 
                    strokeDasharray={`${probability * 100} ${100 - probability * 100}`}
                    strokeDashoffset="25"
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.2,0.8,0.2,1), stroke 0.4s' }}
                  />
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--disp)', fontSize: 32, fontWeight: 700, color: 'var(--ink)' }}>{Math.round(probability * 100)}<span style={{ fontSize: 18, color: 'var(--mut)' }}>%</span></span>
                  <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 2 }}>{tr(lang, 'Probabilité', 'Probability')}</span>
                </div>
              </div>

              <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 8 }}>
                {tr(lang, 'DIAGNOSTIC PRÉDIT', 'PREDICTED DIAGNOSIS')}
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--disp)', color: accent, letterSpacing: '-.02em', transition: 'color 0.4s', textShadow: `0 0 20px ${accent}40` }}>
                {isMalignant ? tr(lang, 'MALIN', 'MALIGNANT') : tr(lang, 'BÉNIN', 'BENIGN')}
              </div>
              <p style={{ margin: '16px 0 0', fontSize: 14, fontFamily: 'var(--disp)', color: 'var(--mut)', lineHeight: 1.6, maxWidth: 280 }}>
                {isMalignant 
                  ? tr(lang, 'Attention : Les mesures indiquent des caractéristiques typiques de tumeurs agressives.', 'Warning: Measurements show characteristics typical of aggressive tumors.')
                  : tr(lang, 'Rassurant : Les caractéristiques cellulaires suggèrent une tumeur non-cancéreuse.', 'Reassuring: Cellular features suggest a non-cancerous tumor.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ item, lang, i, onOpenDemo }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5;
    const py = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)';
  };
  return (
    <Reveal delay={(i % 3) * 90}>
      <a ref={ref} href={item.link} target="_blank" rel="noopener noreferrer" data-cursor onMouseMove={onMove} onMouseLeave={onLeave}
        className="work-card" style={{ display: 'block', borderRadius: 16, overflow: 'hidden', background: 'var(--panel)', border: '1px solid var(--line)', textDecoration: 'none', transition: 'transform .3s cubic-bezier(.2,.7,.3,1),border-color .3s', transformStyle: 'preserve-3d', position: 'relative' }}>
        
        <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(.7)', transition: 'filter .5s,transform .6s' }}
            onError={e => { e.currentTarget.style.display = 'none'; }} />
          <div className="wc-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(7,8,10,.1),rgba(7,8,10,.92))', display: 'flex', alignItems: 'flex-end', padding: 16, opacity: 0, transition: 'opacity .4s' }}>
            <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink)' }}>{item[lang]}</p>
          </div>
          <span style={{ position: 'absolute', top: 12, right: 12, width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center', background: 'rgba(7,8,10,.6)', backdropFilter: 'blur(6px)', color: 'var(--em-glow)', border: '1px solid var(--line)' }}>
            {Icon.arrow({ s: 15 })}
          </span>
        </div>
        
        <div style={{ padding: '16px 18px' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 19, letterSpacing: '-.01em', color: 'var(--ink)' }}>{item.title}</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {item.tags.slice(0, 2).map(t => <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.04em', color: 'var(--faint)', padding: '3px 8px', borderRadius: 6, border: '1px solid var(--line)' }}>{t}</span>)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {item.github && (
                <a href={item.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--mut)', transition: 'color .2s', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--mut)'} title="Code Source">
                  {Icon.github({ s: 18 })}
                </a>
              )}
              {/* Custom interactive ML demo trigger */}
              {item.id === 'cancer-predict' && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenDemo();
                  }}
                  data-cursor
                  style={{
                    background: 'rgba(52,211,153,0.1)', color: 'var(--em-glow)', border: '1px solid rgba(52,211,153,0.3)',
                    padding: '5px 10px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
                    transition: 'background 0.2s', position: 'relative', zIndex: 10
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(52,211,153,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(52,211,153,0.1)'}
                >
                  {tr(lang, 'Démo Live', 'Live Demo')}
                </button>
              )}
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export function Work() {
  const [lang] = useLang();
  const [tab, setTab] = useState('llm');
  const items = DATA.work[tab];
  
  // State to trigger the breast cancer predictor popup modal
  const [showMLDemo, setShowMLDemo] = useState(false);

  return (
    <section id="work" style={{ padding: 'clamp(72px,11vh,130px) clamp(20px,4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <SecHead num="03 /" kicker={tr(lang, 'Sélection de projets', 'Selected work')} title="Portfolio" />
          <Reveal>
            <div style={{ display: 'flex', gap: 6, padding: 5, borderRadius: 12, border: '1px solid var(--line)', marginBottom: 'clamp(32px,5vh,56px)' }}>
              {[['llm', 'LLM Engineering'], ['science', 'Data Science']].map(([k, label]) => (
                <button key={k} onClick={() => setTab(k)} data-cursor style={{
                  padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--mono)', fontSize: 12.5, fontWeight: 600, letterSpacing: '.02em',
                  color: tab === k ? '#06120d' : 'var(--mut)',
                  background: tab === k ? 'var(--em-glow)' : 'transparent',
                  transition: 'all .25s'
                }}>{label}</button>
              ))}
            </div>
          </Reveal>
        </div>
        <div key={tab} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 'clamp(16px,2vw,24px)', animation: 'dirRise .5s ease' }} className="work-grid">
          {items.map((it, i) => (
            <WorkCard key={it.id} item={it} lang={lang} i={i} onOpenDemo={() => setShowMLDemo(true)} />
          ))}
        </div>

        {/* spotlight */}
        <Reveal>
          <a href={DATA.spotlight.link} target="_blank" rel="noopener noreferrer" data-cursor style={{ marginTop: 'clamp(32px,5vh,56px)', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 0, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--line)', background: 'linear-gradient(120deg,rgba(16,185,129,.06),rgba(59,130,246,.06))', textDecoration: 'none', position: 'relative' }} className="spotlight">
            <div style={{ padding: 'clamp(28px,4vw,52px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.22em', color: 'var(--em-glow)', textTransform: 'uppercase', marginBottom: 16 }}>★ {DATA.spotlight.kicker[lang]}</div>
              <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(34px,5vw,58px)', letterSpacing: '-.03em', lineHeight: 1, color: 'var(--ink)' }}>{DATA.spotlight.title}</h3>
              <p style={{ margin: '18px 0 0', maxWidth: 440, fontFamily: 'var(--disp)', fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.6, color: 'var(--mut)' }}>{DATA.spotlight.desc[lang]}</p>
              <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DATA.spotlight.stack.map(s => <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)', padding: '5px 11px', borderRadius: 7, border: '1px solid var(--line)' }}>{s}</span>)}
              </div>
              <span style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: 'var(--em-glow)' }}>{tr(lang, 'Ouvrir l’application', 'Open the app')} {Icon.arrow({ s: 16 })}</span>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280, borderLeft: '1px solid var(--line)' }}>
              <img src={DATA.spotlight.img} alt="BRVM AI" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,var(--bg),transparent 30%)' }} />
            </div>
          </a>
        </Reveal>
      </div>

      {/* Render ML Demo Modal */}
      {showMLDemo && <BreastCancerDemo lang={lang} onClose={() => setShowMLDemo(false)} />}
    </section>
  );
}
export default Work;
