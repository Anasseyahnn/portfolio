import React from 'react';
import { useLang, tr, Reveal, Icon } from './PortLib';
import { DATA } from '../data';

export function SecHead({ kicker, title, sub, num }) {
  return (
    <div style={{ marginBottom: 'clamp(32px,5vh,56px)' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.24em', color: 'var(--em-glow)', textTransform: 'uppercase' }}>
          <span style={{ width: 28, height: 1, background: 'var(--em)' }} />
          {num && <span style={{ color: 'var(--faint)' }}>{num}</span>}
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{ margin: '16px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(34px,5vw,64px)', letterSpacing: '-.03em', lineHeight: 1, textTransform: 'uppercase', color: 'var(--ink)' }}>{title}</h2>
      </Reveal>
      {sub && <Reveal delay={140}><p style={{ margin: '18px 0 0', maxWidth: 560, fontFamily: 'var(--mono)', fontSize: 13.5, lineHeight: 1.65, color: 'var(--mut)' }}>{sub}</p></Reveal>}
    </div>
  );
}

export function Partners() {
  const [lang] = useLang();
  const items = [...DATA.partners, ...DATA.partners];
  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,.25)' }}>
      <div style={{ textAlign: 'center', marginBottom: 26, fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '.24em', color: 'var(--faint)', textTransform: 'uppercase' }}>{tr(lang, 'Ils m’ont fait confiance', 'Trusted by')}</div>
      <div style={{ display: 'flex', width: 'max-content', animation: 'dirMarquee 32s linear infinite' }}>
        {items.map((p, i) => (
          <span key={i} style={{ padding: '0 clamp(24px,4vw,52px)', fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 'clamp(18px,2.4vw,28px)', color: 'var(--mut)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 'clamp(24px,4vw,52px)', opacity: .7 }}>
            {p}<span style={{ color: 'var(--em)', fontSize: 8 }}>●</span>
          </span>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg,var(--bg),transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg,var(--bg),transparent)', pointerEvents: 'none' }} />
    </section>
  );
}

export function About() {
  const [lang] = useLang();
  const socials = [
    ['github', DATA.identity.social.github],
    ['linkedin', DATA.identity.social.linkedin],
    ['x', DATA.identity.social.x],
    ['kaggle', DATA.identity.social.kaggle]
  ];
  return (
    <section id="about" style={{ padding: 'clamp(72px,11vh,130px) clamp(20px,4vw,48px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SecHead num="01 /" kicker={tr(lang, 'À propos', 'About')} title={tr(lang, 'Qui je suis', 'Who I am')} />
        <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.4fr', gap: 'clamp(28px,5vw,72px)', alignItems: 'start' }} className="about-grid">
          {/* portrait */}
          <Reveal>
            <div style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', maxWidth: 320, margin: '0 auto' }}>
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'conic-gradient(from 0deg,var(--em-glow),var(--bl-glow),var(--em-glow))', animation: 'dirSpin 9s linear infinite', filter: 'blur(2px)', opacity: .85 }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--bg)' }}>
                  <img src="assets/profile.jpg" alt={DATA.identity.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(.25) contrast(1.04)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                {socials.map(([k, href]) => (
                  <a key={k} href={href} target="_blank" rel="noopener noreferrer" data-cursor title={k} style={{
                    width: 42, height: 42, borderRadius: 11, display: 'grid', placeItems: 'center',
                    color: 'var(--mut)', border: '1px solid var(--line)', transition: 'all .25s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--em-glow)'; e.currentTarget.style.borderColor = 'var(--em-glow)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--mut)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>
                    {Icon[k]({ s: 18 })}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          {/* bio */}
          <div>
            {DATA.about[lang].map((p, i) => (
              <Reveal key={i} delay={i*100}>
                <p style={{ margin: '0 0 22px', fontFamily: 'var(--disp)', fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 1.6, color: i === 0 ? 'var(--ink)' : 'var(--mut)' }}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={260}>
              <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {DATA.skills.map(s => (
                  <span key={s} data-cursor style={{
                    padding: '7px 13px', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 12,
                    color: 'var(--mut)', border: '1px solid var(--line)', transition: 'all .2s', cursor: 'default'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--em)'; e.currentTarget.style.background = 'rgba(16,185,129,.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--mut)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'transparent'; }}>{s}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={340}>
              <a href={'mailto:' + DATA.identity.email} data-cursor style={{
                marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px',
                borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: 'var(--ink)',
                border: '1px solid var(--line)', textDecoration: 'none', transition: 'all .25s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--em-glow)'; e.currentTarget.style.background = 'rgba(16,185,129,.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'transparent'; }}>
                {Icon.mail({ s: 17 })} {tr(lang, 'Me contacter', 'Get in touch')}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
