import React, { useState, useEffect } from 'react';
import { useLang, tr, Reveal, Icon } from './PortLib';
import { SecHead } from './About';
import { DATA } from '../data';

export function ContactModal({ onClose, lang }) {
  const [sent, setSent] = useState(false);
  
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'grid', placeItems: 'center', background: 'rgba(5,6,8,0.85)', backdropFilter: 'blur(16px)', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 440, background: '#0d0e12', border: '1px solid var(--line)', borderRadius: 20, padding: '32px', color: 'var(--ink)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)', position: 'relative', animation: 'dirRise 0.4s cubic-bezier(0.2,0.8,0.2,1)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line)', color: 'var(--ink)', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{tr(lang, 'Message envoyé !', 'Message sent!')}</h3>
            <p style={{ margin: 0, color: 'var(--mut)', fontSize: 14 }}>{tr(lang, 'Je vous réponds très vite.', 'I will get back to you shortly.')}</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--em-glow)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 6 }}>{tr(lang, 'ME CONTACTER', 'GET IN TOUCH')}</div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tr(lang, 'Prêt à collaborer ?', 'Ready to collaborate?')}</h3>
            </div>
            <input required type="text" placeholder={tr(lang, 'Votre nom', 'Your name')} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: 13, outline: 'none' }} />
            <input required type="email" placeholder={tr(lang, 'Votre email', 'Your email')} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: 13, outline: 'none' }} />
            <textarea required rows={4} placeholder={tr(lang, 'Comment puis-je vous aider ?', 'How can I help you?')} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: 13, outline: 'none', resize: 'vertical' }} />
            <button type="submit" data-cursor style={{ marginTop: 8, padding: '14px', borderRadius: 10, border: 'none', background: 'var(--em-glow)', color: '#000', fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s', width: '100%' }}>{tr(lang, 'Envoyer le message', 'Send message')}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export function Resources() {
  const [lang] = useLang();
  const icons = {
    'Research Paper': '◆',
    'Technical Report': '▣',
    'Course': '❖'
  };
  return (
    <section id="watch" style={{ padding: 'clamp(72px,11vh,130px) clamp(20px,4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SecHead num="05 /" kicker={tr(lang, 'Veille technologique', 'Tech watch')} title={tr(lang, 'Masterclasses', 'Masterclasses')} sub={tr(lang, 'L’apprentissage continu est au cœur de l’ingénierie IA. Quelques ressources de référence que j’étudie sur les LLMs et l’architecture des modèles.', 'Continuous learning is at the heart of AI engineering. A few reference resources I study on LLMs and model architecture.')} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(16px,2vw,22px)' }}>
          {DATA.resources.map((r, i) => (
            <Reveal key={r.title} delay={i * 90}>
              <a href={r.link} target="_blank" rel="noopener noreferrer" data-cursor style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '26px 24px', borderRadius: 16, background: 'var(--panel)', border: '1px solid var(--line)', textDecoration: 'none', transition: 'border-color .3s,transform .3s,box-shadow .3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bl-glow)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 24px 50px -28px rgba(59,130,246,.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <span style={{ fontSize: 26, color: 'var(--bl-glow)', marginBottom: 18 }}>{icons[r.tag] || '◆'}</span>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.16em', color: 'var(--bl-glow)', textTransform: 'uppercase', marginBottom: 10 }}>{r.tag}</div>
                <h4 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 19, color: 'var(--ink)' }}>{r.title}</h4>
                <p style={{ margin: '12px 0 0', fontFamily: 'var(--disp)', fontSize: 14, lineHeight: 1.55, color: 'var(--mut)', flex: 1 }}>{r[lang]}</p>
                <span style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--faint)' }}>{tr(lang, 'Consulter', 'Read')} {Icon.arrow({ s: 14 })}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Writing() {
  const [lang] = useLang();
  const w = DATA.writing[lang];
  const [posts, setPosts] = useState(DATA.writing.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchBlogFeed() {
      try {
        // Quarto blogs generate an index.xml at the root
        const response = await fetch('https://anasseyahnn.github.io/Anasseyahnn-wbs/index.xml');
        if (!response.ok) throw new Error('Failed to fetch feed');
        const text = await response.text();
        
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');
        const fetchedPosts = [];
        
        items.forEach((item, index) => {
          if (index >= 4) return; // Load top 4 items max
          const title = item.querySelector('title')?.textContent || '';
          const link = item.querySelector('link')?.textContent || '';
          const categories = Array.from(item.querySelectorAll('category')).map(c => c.textContent);
          
          fetchedPosts.push({
            t: title,
            link: link,
            topic: {
              fr: categories.slice(0, 3).join(' · '),
              en: categories.slice(0, 3).join(' · ')
            }
          });
        });

        if (active && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        }
      } catch (e) {
        // Silently fallback to static posts on CORS or network error
        console.log('CORS or network error fetching Quarto feed. Falling back to static posts.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchBlogFeed();
    return () => { active = false; };
  }, []);

  return (
    <section id="writing" style={{ padding: 'clamp(72px,11vh,130px) clamp(20px,4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SecHead num="06 /" kicker={tr(lang, 'Le blog', 'The blog')} title={w.title} sub={w.sub} />
        <div style={{ border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', background: 'var(--panel)' }}>
          {posts.map((p, i) => (
            <Reveal key={p.t} delay={i * 70}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" data-cursor style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px clamp(18px,3vw,32px)', borderTop: i > 0 ? '1px solid var(--line)' : 'none', textDecoration: 'none', transition: 'background .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--faint)', width: 34, flexShrink: 0 }}>0{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 'clamp(17px,2.2vw,24px)', color: 'var(--ink)' }}>{p.t}</h4>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--em-glow)', letterSpacing: '.05em' }}>{p.topic[lang]}</span>
                </div>
                <span style={{ color: 'var(--mut)', flexShrink: 0 }}>{Icon.arrow({ s: 18 })}</span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <a href={DATA.identity.social.blog} target="_blank" rel="noopener noreferrer" data-cursor style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', padding: '13px 22px', borderRadius: 10, border: '1px solid var(--line)', transition: 'border-color .25s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--em-glow)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
            {w.cta} {Icon.arrow({ s: 15 })}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const [lang] = useLang();
  const [showContact, setShowContact] = useState(false);
  const socials = [
    ['github', DATA.identity.social.github],
    ['linkedin', DATA.identity.social.linkedin],
    ['x', DATA.identity.social.x],
    ['kaggle', DATA.identity.social.kaggle]
  ];
  return (
    <footer id="contact" style={{ padding: 'clamp(80px,13vh,150px) clamp(20px,4vw,48px) 48px', borderTop: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -180, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse,rgba(16,185,129,.12),transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.24em', color: 'var(--em-glow)', textTransform: 'uppercase', marginBottom: 20 }}>{tr(lang, 'Travaillons ensemble', 'Let’s work together')}</div>
        </Reveal>
        <Reveal delay={80}>
          <a onClick={() => setShowContact(true)} data-cursor style={{ cursor: 'pointer', display: 'inline-block', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(40px,8vw,108px)', letterSpacing: '-.04em', lineHeight: .95, color: 'var(--ink)', textDecoration: 'none', transition: 'color .3s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--em-glow)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--ink)'}>
            {tr(lang, 'Discutons', 'Get in touch')} <span style={{ color: 'var(--em-glow)' }}>→</span>
          </a>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ margin: '24px 0 0', fontFamily: 'var(--mono)', fontSize: 'clamp(14px,2vw,18px)', color: 'var(--mut)' }}>{DATA.identity.email}</p>
        </Reveal>
        <div style={{ marginTop: 48, display: 'flex', justifyBetween: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, borderTop: '1px solid var(--line)', paddingTop: 28, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map(([k, href]) => (
              <a key={k} href={href} target="_blank" rel="noopener noreferrer" data-cursor title={k} style={{ width: 42, height: 42, borderRadius: 11, display: 'grid', placeItems: 'center', color: 'var(--mut)', border: '1px solid var(--line)', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--em-glow)'; e.currentTarget.style.borderColor = 'var(--em-glow)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--mut)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>{Icon[k]({ s: 18 })}</a>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '.10em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            © 2026 · <span style={{ color: 'var(--ink)' }}>{DATA.identity.short}</span> · {DATA.identity.location[lang]}
          </div>
        </div>
      </div>
      {showContact && <ContactModal lang={lang} onClose={() => setShowContact(false)} />}
    </footer>
  );
}
