import React, { useState, useEffect } from 'react';
import { useLang, tr, Reveal } from './PortLib';
import { SecHead } from './About';
import { DATA } from '../data';

function ExpItem({ exp, lang, idx, openIdx, setOpen, color }) {
  const open = openIdx === idx;
  return (
    <div style={{ position: 'relative', paddingLeft: 34 }}>
      {/* node */}
      <span style={{
        position: 'absolute', left: 0, top: 4, width: 15, height: 15, borderRadius: 8,
        background: open ? color : 'var(--bg)', border: '2px solid ' + (open ? color : 'var(--line)'),
        boxShadow: open ? '0 0 0 4px ' + color + '22' : 'none', transition: 'all .3s', zIndex: 2
      }} />
      <div onClick={() => setOpen(open ? -1 : idx)} data-cursor style={{ cursor: 'pointer', paddingBottom: open ? 6 : 0 }}>
        <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(17px,2vw,21px)', color: 'var(--ink)' }}>{exp.org}</h4>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: color, fontWeight: 600, whiteSpace: 'nowrap' }}>{exp.date.replace('present', tr(lang, 'présent', 'present'))}</span>
        </div>
        <p style={{ margin: '5px 0 0', fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--mut)', fontStyle: 'italic' }}>{exp.role[lang]}</p>
      </div>
      <div style={{
        overflow: 'hidden', maxHeight: open ? 400 : 0, opacity: open ? 1 : 0,
        transition: 'max-height .5s cubic-bezier(.2,.7,.3,1),opacity .4s'
      }}>
        <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {exp.bullets[lang].map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontFamily: 'var(--disp)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--mut)' }}>
              <span style={{ color: color, flexShrink: 0, marginTop: 2 }}>▸</span>{b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Experience() {
  const [lang] = useLang();
  const [track, setTrack] = useState('ai');
  const [openIdx, setOpen] = useState(0);
  const color = track === 'ai' ? 'var(--em-glow)' : track === 'meal' ? 'var(--bl-glow)' : '#a855f7';
  const items = DATA.experience[track];

  useEffect(() => setOpen(0), [track]);

  return (
    <section id="experience" style={{ padding: 'clamp(72px,11vh,130px) clamp(20px,4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <SecHead num="04 /" kicker={tr(lang, 'Parcours', 'Career')} title={tr(lang, 'Expérience', 'Experience')} />
          <Reveal>
            <div style={{ display: 'flex', gap: 6, padding: 5, borderRadius: 12, border: '1px solid var(--line)', marginBottom: 'clamp(32px,5vh,56px)' }}>
              {[['ai', DATA.experience.tracks.ai[lang]], ['meal', DATA.experience.tracks.meal[lang]], ['edu', DATA.experience.tracks.edu[lang]]].map(([k, label]) => (
                <button key={k} onClick={() => setTrack(k)} data-cursor style={{
                  padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
                  color: track === k ? '#06120d' : 'var(--mut)',
                  background: track === k ? color : 'transparent',
                  transition: 'all .25s'
                }}>{label}</button>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div key={track} style={{ position: 'relative', maxWidth: 780, animation: 'dirRise .5s ease' }}>
            {/* vertical line */}
            <span style={{
              position: 'absolute', left: 7, top: 6, bottom: 6, width: 2,
              background: 'linear-gradient(to bottom,' + (track === 'ai' ? 'var(--em)' : 'var(--bl)') + ',transparent)',
              opacity: .5
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              {items.map((exp, i) => (
                <ExpItem key={i} exp={exp} lang={lang} idx={i} openIdx={openIdx} setOpen={setOpen} color={color} />
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <a href={DATA.identity.cv} target="_blank" rel="noopener noreferrer" data-cursor style={{
            marginTop: 40, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px',
            borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: '#06120d',
            background: 'var(--em-glow)', textDecoration: 'none', transition: 'transform .2s,box-shadow .25s'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px -8px var(--em-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            {tr(lang, 'Télécharger le CV complet (PDF)', 'Download full CV (PDF)')} ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}
export default Experience;
