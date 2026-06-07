import React, { useState, useEffect, useMemo } from 'react';
import { useLang, tr, useTypewriter } from '../components/PortLib';
import { scrollToId } from '../components/Nav';

const TCOL = {
  kw: '#c586c0', fn: '#dcdcaa', str: '#56d364', type: '#4ec9b0',
  num: '#d19a66', com: 'rgba(220,220,220,.35)', prop: '#9cdcfe',
  def: '#d4d4d4', dec: '#e5c07b', em: '#34d399', bl: '#60a5fa',
};

const CODE_FR = [
  [['# anasse.py — profil', 'com']],
  [['class ', 'kw'], ['DataScientist', 'type'], [':', 'def']],
  [['    nom  = ', 'prop'], ['"Bouagba Anassé Yahanan"', 'str']],
  [['    role = ', 'prop'], ['"AI Engineer · Spécialiste LLM"', 'str']],
  [['    base = ', 'prop'], ['"Abidjan, CI"', 'str']],
  [['    stack = [', 'prop'], ['"Python"', 'str'], [', ', 'def'], ['"R"', 'str'], [', ', 'def'], ['"SQL"', 'str'], [',', 'def']],
  [['             ', 'def'], ['"FastAPI"', 'str'], [', ', 'def'], ['"Docker"', 'str'], [', ', 'def'], ['"LangChain"', 'str'], [']', 'prop']],
  [['', 'def']],
  [['    def ', 'kw'], ['livrer', 'fn'], ['(self, ', 'def'], ['idée', 'prop'], [') -> ', 'def'], ['Produit', 'type'], [':', 'def']],
  [['        data  = self.', 'def'], ['pipeline', 'fn'], ['(idée)', 'def']],
  [['        model = self.', 'def'], ['entrainer', 'fn'], ['(data)   ', 'def'], ['# LLM / ML', 'com']],
  [['        return ', 'kw'], ['deploy', 'fn'], ['(model, scale=', 'def'], ['True', 'num'], [')  ', 'def'], ['# → prod', 'com']],
];

const CODE_EN = [
  [['# anasse.py — profile', 'com']],
  [['class ', 'kw'], ['DataScientist', 'type'], [':', 'def']],
  [['    name = ', 'prop'], ['"Bouagba Anassé Yahanan"', 'str']],
  [['    role = ', 'prop'], ['"AI Engineer · LLM Specialist"', 'str']],
  [['    base = ', 'prop'], ['"Abidjan, CI"', 'str']],
  [['    stack = [', 'prop'], ['"Python"', 'str'], [', ', 'def'], ['"R"', 'str'], [', ', 'def'], ['"SQL"', 'str'], [',', 'def']],
  [['             ', 'def'], ['"FastAPI"', 'str'], [', ', 'def'], ['"Docker"', 'str'], [', ', 'def'], ['"LangChain"', 'str'], [']', 'prop']],
  [['', 'def']],
  [['    def ', 'kw'], ['ship', 'fn'], ['(self, ', 'def'], ['idea', 'prop'], [') -> ', 'def'], ['Product', 'type'], [':', 'def']],
  [['        data  = self.', 'def'], ['pipeline', 'fn'], ['(idea)', 'def']],
  [['        model = self.', 'def'], ['train', 'fn'], ['(data)      ', 'def'], ['# LLM / ML', 'com']],
  [['        return ', 'kw'], ['deploy', 'fn'], ['(model, scale=', 'def'], ['True', 'num'], [')  ', 'def'], ['# → prod', 'com']],
];

export function HeroTerminal() {
  const [lang] = useLang();
  const CODE = lang === 'fr' ? CODE_FR : CODE_EN;
  const flat = useMemo(() => {
    const arr = [];
    CODE.forEach((line, li) => {
      line.forEach(([t, c]) => {
        for (const ch of t) arr.push([ch, c, li]);
      });
      arr.push(['\n', 'def', li]);
    });
    return arr;
  }, [CODE]);

  const total = flat.length;
  const [n, setN] = useState(0);
  const [term, setTerm] = useState(0);

  useEffect(() => {
    setN(0);
    setTerm(0);
    let i = 0;
    const termTimers = [];
    const id = setInterval(() => {
      i += 2;
      setN(Math.min(i, total));
      if (i >= total) {
        clearInterval(id);
        startTerm();
      }
    }, 22);

    const termLines = 5;
    function startTerm() {
      for (let k = 1; k <= termLines; k++) {
        termTimers.push(setTimeout(() => setTerm(k), 520 * k));
      }
      termTimers.push(setTimeout(() => {
        setN(0);
        setTerm(0);
        i = 0;
      }, 520 * termLines + 3400));
    }

    return () => {
      clearInterval(id);
      termTimers.forEach(clearTimeout);
    };
  }, [lang, total]);

  // build visible code grouped by line
  const lines = CODE.map(() => []);
  let count = 0;
  for (const [ch, c, li] of flat) {
    if (count >= n) break;
    if (ch !== '\n') lines[li].push([ch, c]);
    count++;
  }
  const activeLine = flat[Math.min(n, total - 1)] ? flat[Math.min(n, total - 1)][2] : 0;

  const termOut = [
    { t: '$ ./deploy.sh --target prod', c: '#fff' },
    { t: '→ build image  ▓▓▓▓▓▓▓▓▓▓  ok', c: TCOL.bl },
    { t: '→ push registry ▓▓▓▓▓▓▓▓▓▓  ok', c: TCOL.bl },
    { t: '→ rollout llm-endpoint ……  ✓', c: TCOL.em },
    { t: '● ' + tr(lang, 'service en ligne', 'service live') + ' · api.anasse.dev · 142ms', c: TCOL.em },
  ];

  const files = [
    ['anasse.py', true],
    ['bio.md', false],
    ['projects/', false],
    ['brvm_ai/', false],
    ['llm_sql.py', false],
    ['deploy.sh', false],
  ];

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '96px clamp(16px,3vw,32px) 48px', background: '#07080b', justifyContent: 'center' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, background: '#0b0d12', color: TCOL.def, fontFamily: 'var(--mono)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 40px 100px -50px rgba(0,0,0,.95)' }}>
        {/* title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', background: '#0e1117', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <span style={{ width: 12, height: 12, borderRadius: 6, background: '#ff5f57' }} />
          <span style={{ width: 12, height: 12, borderRadius: 6, background: '#febc2e' }} />
          <span style={{ width: 12, height: 12, borderRadius: 6, background: '#28c840' }} />
          <span style={{ margin: '0 auto', fontSize: 12.5, color: 'rgba(255,255,255,.5)', fontFamily: 'var(--disp)', fontWeight: 500 }}>
            anasse — portfolio · {tr(lang, 'éditeur', 'editor')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(150px, 18vw, 208px) 1fr', minHeight: 480 }}>
          {/* sidebar */}
          <div style={{ background: '#0d1016', borderRight: '1px solid rgba(255,255,255,.07)', padding: '16px 0' }}>
            <div style={{ padding: '0 18px 12px', fontSize: 10.5, letterSpacing: '.18em', color: 'rgba(255,255,255,.34)', fontWeight: 600 }}>EXPLORER</div>
            {files.map(([f, active], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 18px', fontSize: 13, color: active ? '#fff' : 'rgba(255,255,255,.55)', background: active ? 'rgba(96,165,250,.12)' : 'transparent', borderLeft: active ? '2px solid var(--bl-glow)' : '2px solid transparent' }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? 'var(--bl-glow)' : f.endsWith('/') ? 'var(--amber)' : 'rgba(255,255,255,.3)' }} />
                {f}
              </div>
            ))}
            <div style={{ marginTop: 22, padding: '0 18px', fontSize: 10.5, letterSpacing: '.18em', color: 'rgba(255,255,255,.34)', fontWeight: 600 }}>GIT · main</div>
            <div style={{ padding: '8px 18px', fontSize: 12, color: TCOL.em }}>↑ 12 commits · ✓ clean</div>
          </div>

          {/* editor + terminal */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* tab */}
            <div style={{ display: 'flex', background: '#0d1016', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ padding: '10px 18px', fontSize: 13, color: '#fff', background: '#0b0d12', borderTop: '2px solid var(--bl-glow)', display: 'flex', gap: 9, alignItems: 'center' }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: 'var(--bl-glow)' }} />anasse.py
              </div>
            </div>
            {/* code */}
            <div style={{ flex: 1, padding: '24px 0', fontSize: 'clamp(13px, 1.4vw, 15px)', lineHeight: '26px', position: 'relative', overflow: 'hidden' }}>
              {lines.map((toks, li) => (
                <div key={li} style={{ display: 'flex', minHeight: 26, background: li === activeLine && n < total ? 'rgba(255,255,255,.03)' : 'transparent' }}>
                  <span style={{ width: 46, textAlign: 'right', paddingRight: 16, color: 'rgba(255,255,255,.22)', userSelect: 'none', flexShrink: 0 }}>{li + 1}</span>
                  <span style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--mono)' }}>
                    {toks.map(([ch, c], k) => <span key={k} style={{ color: TCOL[c] }}>{ch}</span>)}
                    {li === activeLine && n < total && <span style={{ background: 'var(--bl-glow)', color: 'var(--bl-glow)', animation: 'dirBlink 1s step-end infinite' }}>▏</span>}
                  </span>
                </div>
              ))}
            </div>
            {/* terminal */}
            <div style={{ height: 180, background: '#070a0e', borderTop: '1px solid rgba(255,255,255,.09)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 18, padding: '8px 18px', borderBottom: '1px solid rgba(255,255,255,.06)', fontSize: 11.5 }}>
                <span style={{ color: '#fff', borderBottom: '1px solid var(--em-glow)', paddingBottom: 4 }}>TERMINAL</span>
                <span style={{ color: 'rgba(255,255,255,.4)' }}>OUTPUT</span>
                <span style={{ color: 'rgba(255,255,255,.4)' }}>PROBLEMS · 0</span>
              </div>
              <div style={{ padding: '12px 18px', fontSize: 13.5, lineHeight: 1.85, flex: 1 }}>
                {termOut.slice(0, term).map((l, i) => (
                  <div key={i} style={{ color: l.c, animation: 'dirRise .25s ease' }}>{l.t}</div>
                ))}
                {term < termOut.length && n >= total && <span style={{ color: 'var(--em-glow)', animation: 'dirBlink 1s step-end infinite' }}>▋</span>}
                {term === 0 && n < total && <span style={{ color: 'rgba(255,255,255,.3)' }}>{tr(lang, '// en attente de la compilation…', '// waiting for build…')}</span>}
              </div>
            </div>
          </div>
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
export default HeroTerminal;
