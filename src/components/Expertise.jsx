import React, { useRef } from 'react';
import { useLang, tr, Reveal } from './PortLib';
import { SecHead } from './About';

const STACK_DATA = [
  {
    id: 'ml',
    title: { fr: 'Data Science & Machine Learning', en: 'Data Science & Machine Learning' },
    desc: { fr: 'Conception de modèles prédictifs et analyse statistique avancée.', en: 'Design of predictive models and advanced statistical analysis.' },
    icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    color: 'rgba(59,130,246,0.1)',
    glow: 'rgba(59,130,246,0.6)',
    border: 'rgba(59,130,246,0.3)',
    skills: ['Python', 'R', 'Scikit-Learn', 'PyTorch']
  },
  {
    id: 'llm',
    title: { fr: 'Ingénierie LLM & GenAI', en: 'LLM Engineering & GenAI' },
    desc: { fr: 'Développement d’agents IA et systèmes RAG de pointe.', en: 'Development of AI agents and cutting-edge RAG systems.' },
    icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>,
    color: 'rgba(16,185,129,0.1)',
    glow: 'rgba(16,185,129,0.6)',
    border: 'rgba(16,185,129,0.3)',
    skills: ['LangChain', 'LlamaIndex', 'Ollama', 'Groq']
  },
  {
    id: 'mlops',
    title: { fr: 'MLOps & Déploiement', en: 'MLOps & Deployment' },
    desc: { fr: 'Mise en production sécurisée, scalable et automatisée.', en: 'Secure, scalable, and automated production deployment.' },
    icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
    color: 'rgba(139,92,246,0.1)',
    glow: 'rgba(139,92,246,0.6)',
    border: 'rgba(139,92,246,0.3)',
    skills: ['FastAPI', 'Docker', 'Kubernetes', 'SQL']
  },
  {
    id: 'viz',
    title: { fr: 'Dataviz & Frontend', en: 'Dataviz & Frontend' },
    desc: { fr: 'Création d’interfaces et tableaux de bord décisionnels interactifs.', en: 'Creation of interactive decision dashboards and interfaces.' },
    icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
    color: 'rgba(245,158,11,0.1)',
    glow: 'rgba(245,158,11,0.6)',
    border: 'rgba(245,158,11,0.3)',
    skills: ['Next.js', 'Streamlit', 'Power BI', 'ggplot2']
  }
];

function BentoCard({ item, lang, i }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-2px)`;
    el.style.borderColor = item.glow;
    el.style.boxShadow = `0 15px 35px rgba(0,0,0,0.4), inset 0 0 40px ${item.color}`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
      el.style.borderColor = 'var(--line)';
      el.style.boxShadow = 'none';
    }
  };

  return (
    <Reveal delay={i * 100}>
      <div 
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid var(--line)',
          borderRadius: 20,
          padding: 'clamp(24px, 3vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'transform 0.4s cubic-bezier(0.2,0.8,0.2,1), border-color 0.4s, box-shadow 0.4s',
          transformStyle: 'preserve-3d',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${item.glow}, transparent)`,
          opacity: 0.5
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12, display: 'grid', placeItems: 'center',
            fontSize: 22, background: item.color, border: `1px solid ${item.border}`
          }}>
            {item.icon}
          </div>
          <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontSize: 19, fontWeight: 700, color: 'var(--ink)' }}>
            {item.title[lang]}
          </h3>
        </div>
        
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--disp)', fontSize: 14.5, color: 'var(--mut)', lineHeight: 1.6, flexGrow: 1 }}>
          {item.desc[lang]}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {item.skills.map(skill => (
            <span key={skill} style={{
              fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.02em',
              color: 'var(--ink)', padding: '6px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Expertise() {
  const [lang] = useLang();

  return (
    <section id="stack" style={{ padding: 'clamp(72px,11vh,130px) clamp(20px,4vw,48px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SecHead num="02 /" kicker={tr(lang, 'Tech Stack · Compétences', 'Tech Stack · Expertise')} title={tr(lang, 'Expertise Technique', 'Technical Expertise')} />
        
        <div style={{
          marginTop: 'clamp(32px,5vh,56px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24
        }}>
          {STACK_DATA.map((item, i) => (
            <BentoCard key={item.id} item={item} lang={lang} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
export default Expertise;
