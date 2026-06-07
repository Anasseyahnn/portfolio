import React, { useState, useEffect } from 'react';
import { useLang, tr } from './PortLib';
import { DATA } from '../data';

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export function Nav() {
  const [lang, setLang] = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const ids = ['home', ...DATA.nav[lang].map(n => n[0])];
    const onScroll = () => {
      const sc = window.pageYOffset;
      setScrolled(sc > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProg(h > 0 ? sc / h : 0);
      let cur = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lang]);

  const links = DATA.nav[lang];

  return (
    <React.Fragment>
      {/* progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 2, width: `${prog * 100}%`,
        background: 'linear-gradient(90deg,var(--em),var(--bl))', zIndex: 120,
        transition: 'width .1s linear'
      }} />
      <nav style={{
        position: 'fixed', 
        top: scrolled ? 16 : 0, 
        left: 0, 
        right: 0, 
        margin: '0 auto',
        maxWidth: scrolled ? 1240 : '100%',
        borderRadius: scrolled ? 20 : 0,
        zIndex: 110,
        background: scrolled ? 'rgba(7,8,10,.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        borderBottom: (!scrolled) ? '1px solid transparent' : '1px solid var(--line)',
        boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
        transition: 'all .4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)',
          height: scrolled ? 58 : 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'height .4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* logo */}
          <a onClick={() => scrollToId('home')} data-cursor style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer', textDecoration: 'none', transition: 'opacity .2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = .75}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}>
            <div style={{
              width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.2)',
              fontFamily: 'var(--mono)', fontWeight: 500, fontSize: 13, color: 'var(--ink)', letterSpacing: '0.04em'
            }}>
              {DATA.identity.initials}
            </div>
            <span style={{ fontFamily: 'var(--disp)', fontWeight: 500, fontSize: 15, color: 'var(--ink)', letterSpacing: '-.01em' }}>{DATA.identity.short}</span>
          </a>
          {/* links */}
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {links.map(([id, label]) => (
              <a key={id} onClick={() => scrollToId(id)} data-cursor style={{
                cursor: 'pointer', padding: '8px 14px', borderRadius: 8, fontFamily: 'var(--mono)',
                fontSize: 12.5, letterSpacing: '.02em', color: active === id ? 'var(--ink)' : 'var(--mut)',
                background: active === id ? 'rgba(255,255,255,.08)' : 'transparent',
                transition: 'all .25s cubic-bezier(0.16, 1, 0.3, 1)', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                if (active !== id) {
                  e.currentTarget.style.color = 'var(--ink)';
                  e.currentTarget.style.background = 'rgba(255,255,255,.04)';
                }
              }}
              onMouseLeave={e => {
                if (active !== id) {
                  e.currentTarget.style.color = 'var(--mut)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}>{label}</a>
            ))}
          </div>
          {/* right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 10, border: '1px solid var(--line)', background: 'rgba(255,255,255,0.01)' }}>
              {['fr', 'en'].map(c => (
                <button key={c} onClick={() => setLang(c)} data-cursor style={{
                  padding: '4px 9px', border: 'none', cursor: 'pointer', borderRadius: 7,
                  fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '.06em',
                  color: lang === c ? '#06120d' : 'var(--mut)',
                  background: lang === c ? 'var(--em-glow)' : 'transparent', 
                  transition: 'all .25s',
                  boxShadow: lang === c ? '0 0 10px rgba(52,211,153,0.3)' : 'none'
                }}
                onMouseEnter={e => { if (lang !== c) e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={e => { if (lang !== c) e.currentTarget.style.color = 'var(--mut)'; }}
                >{c.toUpperCase()}</button>
              ))}
            </div>
            <a href={DATA.identity.cv} target="_blank" rel="noopener noreferrer" data-cursor className="nav-cv" style={{
              padding: '8px 16px', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 12,
              fontWeight: 600, letterSpacing: '.02em', color: 'var(--ink)', border: '1px solid var(--line)',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, transition: 'all .25s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--em-glow)'; e.currentTarget.style.color = 'var(--em-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--ink)'; }}>
              CV <span style={{ opacity: .6 }}>↓</span>
            </a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
export default Nav;
