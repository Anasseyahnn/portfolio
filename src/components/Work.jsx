import React, { useState, useRef } from 'react';
import { useLang, tr, Reveal, Icon } from './PortLib';
import { SecHead } from './About';
import { DATA } from '../data';

// Breast Cancer client-side ML predictor
function BreastCancerDemo({ onClose, lang }) {
  const [radius, setRadius] = useState(14);
  const [texture, setTexture] = useState(19);
  const [area, setArea] = useState(650);
  const [concavity, setConcavity] = useState(0.08);

  // Calibrated logistic regression weights (Wisconsin Breast Cancer dataset approximation)
  // Higher features increase malignancy probability.
  const score = -12.5 + (0.45 * radius) + (0.08 * texture) + (0.0045 * area) + (12.0 * concavity);
  const probability = 1 / (1 + Math.exp(-score));
  const isMalignant = probability >= 0.5;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999, display: 'grid', placeItems: 'center',
      background: 'rgba(5,6,8,0.85)', backdropFilter: 'blur(16px)', padding: 20
    }}>
      <div style={{
        width: '100%', maxWidth: 540, background: '#0d0e12', border: '1px solid var(--line)',
        borderRadius: 20, padding: '26px 28px', color: 'var(--ink)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        position: 'relative', animation: 'dirRise 0.4s cubic-bezier(0.2,0.8,0.2,1)'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--line)', color: 'var(--ink)', width: 32, height: 32,
          borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>✕</button>

        {/* Title */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--em-glow)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 6 }}>
          {tr(lang, 'DÉMO MACHINE LEARNING · LOCAL', 'MACHINE LEARNING DEMO · LOCAL')}
        </div>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
          {tr(lang, 'Diagnostic du Cancer du Sein', 'Breast Cancer Diagnostic')}
        </h3>

        {/* Sliders Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 26 }}>
          {/* Radius */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontFamily: 'var(--mono)' }}>
              <span style={{ color: 'var(--mut)' }}>{tr(lang, 'Rayon Moyen', 'Mean Radius')}</span>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{radius} mm</span>
            </div>
            <input type="range" min="6" max="28" step="0.1" value={radius} onChange={e => setRadius(parseFloat(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--em-glow)' }} />
          </div>

          {/* Texture */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontFamily: 'var(--mono)' }}>
              <span style={{ color: 'var(--mut)' }}>{tr(lang, 'Texture Moyenne', 'Mean Texture')}</span>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{texture}</span>
            </div>
            <input type="range" min="9" max="38" step="0.1" value={texture} onChange={e => setTexture(parseFloat(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--em-glow)' }} />
          </div>

          {/* Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontFamily: 'var(--mono)' }}>
              <span style={{ color: 'var(--mut)' }}>{tr(lang, 'Aire Moyenne', 'Mean Area')}</span>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{area} mm²</span>
            </div>
            <input type="range" min="140" max="2200" step="10" value={area} onChange={e => setArea(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--em-glow)' }} />
          </div>

          {/* Concavity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontFamily: 'var(--mono)' }}>
              <span style={{ color: 'var(--mut)' }}>{tr(lang, 'Concavité Moyenne', 'Mean Concavity')}</span>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{concavity.toFixed(3)}</span>
            </div>
            <input type="range" min="0" max="0.45" step="0.005" value={concavity} onChange={e => setConcavity(parseFloat(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--em-glow)' }} />
          </div>
        </div>

        {/* Results Panel */}
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: 14,
          padding: '16px 20px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--faint)', textTransform: 'uppercase', marginBottom: 6 }}>
              {tr(lang, 'DIAGNOSTIC PRÉDIT', 'PREDICTED DIAGNOSIS')}
            </div>
            <div style={{
              fontSize: 22, fontWeight: 700, 
              color: isMalignant ? '#f43f5e' : 'var(--em-glow)',
              transition: 'color 0.2s'
            }}>
              {isMalignant 
                ? tr(lang, 'MALIN (Cancéreux)', 'MALIGNANT (Cancerous)') 
                : tr(lang, 'BÉNIN (Sain)', 'BENIGN (Healthy)')}
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--mut)', lineHeight: 1.4 }}>
              {isMalignant 
                ? tr(lang, 'Les mesures indiquent des caractéristiques typiques de tumeurs agressives.', 'Measurements show characteristics typical of aggressive tumors.')
                : tr(lang, 'Les caractéristiques cellulaires suggèrent une tumeur non-cancéreuse.', 'Cellular features suggest a non-cancerous tumor.')}
            </p>
          </div>

          {/* Probability Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid var(--line)', paddingLeft: 10 }}>
            <div style={{ position: 'relative', width: 90, height: 90, display: 'grid', placeItems: 'center' }}>
              <svg width="90" height="90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5" />
                <circle cx="18" cy="18" r="15.91" fill="none" 
                  stroke={isMalignant ? '#f43f5e' : 'var(--em-glow)'} 
                  strokeWidth="2.5" 
                  strokeDasharray={`${probability * 100} ${100 - probability * 100}`}
                  strokeDashoffset="25"
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.35s ease, stroke 0.2s' }}
                />
              </svg>
              <div style={{ position: 'absolute', fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700 }}>
                {Math.round(probability * 100)}%
              </div>
            </div>
            <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--faint)', marginTop: 8, textTransform: 'uppercase' }}>
              {tr(lang, 'Probabilité', 'Probability')}
            </span>
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
