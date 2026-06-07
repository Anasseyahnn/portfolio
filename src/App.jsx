import React, { useEffect } from 'react';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle, TweakSelect } from './components/TweaksPanel';
import { NeuralBg, CustomCursor, tr } from './components/PortLib';
import Nav from './components/Nav';
import About, { Partners } from './components/About';
import Expertise from './components/Expertise';
import Work from './components/Work';
import Experience from './components/Experience';
import { Resources, Writing, Footer } from './components/Extra';

// Hero Themes
import HeroMono from './themes/HeroMono';
import HeroTerminal from './themes/HeroTerminal';
import HeroNeural from './themes/HeroNeural';
import HeroDashboard from './themes/HeroDashboard';

const FONTS = {
  'Inter': "'Inter',system-ui,sans-serif",
  'IBM Plex Sans': "'IBM Plex Sans',system-ui,sans-serif",
  'Système': "system-ui,-apple-system,'Segoe UI',sans-serif",
};

const PALETTES = [
  ['#10b981', '#34d399', '#3b82f6', '#60a5fa'], // emerald + blue
  ['#06b6d4', '#22d3ee', '#6366f1', '#818cf8'], // cyan + indigo
  ['#8b5cf6', '#a78bfa', '#ec4899', '#f472b6'], // violet + pink
  ['#f59e0b', '#fbbf24', '#10b981', '#34d399'], // amber + emerald
];

const HERO_THEMES = {
  'mono': HeroMono,
  'ide': HeroTerminal,
  'neural': HeroNeural,
  'dashboard': HeroDashboard,
};

const TWEAK_DEFAULTS = {
  palette: ['#10b981', '#34d399', '#3b82f6', '#60a5fa'],
  bg: 'neural',
  font: 'Inter',
  cursor: true,
  grain: true,
  theme: 'neural', // default hero theme
};

function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        opacity: .045,
        mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
      }}
    />
  );
}

export function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement.style;
    const p = t.palette || PALETTES[0];
    r.setProperty('--em', p[0]);
    r.setProperty('--em-glow', p[1]);
    r.setProperty('--bl', p[2]);
    r.setProperty('--bl-glow', p[3]);
    r.setProperty('--disp', FONTS[t.font] || FONTS['Inter']);
  }, [t.palette, t.font]);

  // Select the dynamic Hero component based on Tweaks Panel
  const HeroComponent = HERO_THEMES[t.theme] || HeroNeural;

  return (
    <React.Fragment>
      <NeuralBg mode={t.bg} accent={(t.palette || PALETTES[0])[1]} accent2={(t.palette || PALETTES[0])[3]} />
      {t.grain && <Grain />}
      <CustomCursor enabled={t.cursor} color={(t.palette || PALETTES[0])[1]} />
      
      <Nav />
      
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroComponent />
        <Partners />
        <About />
        <Expertise />
        <Work />
        <Experience />
        <Resources />
        <Writing />
        <Footer />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Visuel / Thème Hero" />
        <TweakSelect
          label="Direction"
          value={t.theme}
          options={[
            { value: 'mono', label: 'A · Monolith (Brutalist)' },
            { value: 'ide', label: 'B · IDE (Editor)' },
            { value: 'neural', label: 'C · Neural Lab (AI)' },
            { value: 'dashboard', label: 'D · Data Product (Charts)' },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />
        
        <TweakSection label="Ambiance" />
        <TweakRadio label="Fond" value={t.bg} options={['neural', 'grid', 'off']} onChange={(v) => setTweak('bg', v)} />
        <TweakToggle label="Grain / texture" value={t.grain} onChange={(v) => setTweak('grain', v)} />
        
        <TweakSection label="Couleurs & Fonts" />
        <TweakColor label="Palette" value={t.palette} options={PALETTES} onChange={(v) => setTweak('palette', v)} />
        <TweakSelect label="Police" value={t.font} options={['Inter', 'IBM Plex Sans', 'Système']} onChange={(v) => setTweak('font', v)} />
        
        <TweakSection label="Interface" />
        <TweakToggle label="Curseur custom" value={t.cursor} onChange={(v) => setTweak('cursor', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

export default App;
