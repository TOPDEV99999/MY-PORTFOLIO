import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeId = 'midnight' | 'cyberpunk' | 'emerald' | 'crimson' | 'light';

export interface Theme {
  id: ThemeId;
  name: string;
  emoji: string;
  accent:    string;   // primary accent hex
  accent2:   string;   // secondary gradient hex
  accentR:   string;   // r,g,b of accent for rgba()
  accentR2:  string;   // r,g,b of accent2
  bg:        string;   // deepest background
  bgMid:     string;   // mid-layer background
  windowBg:  string;   // window panel background (rgba string)
  windowBorder: string; // window border (rgba string)
  titleBg:   string;   // titlebar background
  textPrimary: string; // primary text color
  textMuted:   string; // muted text color
  isLight:   boolean;  // true = light theme (affects text/icon colors)
  particleColor: string;
  scanColor: string;
  glowColor: string;
  taglineGradient: string;
}

export const THEMES: Theme[] = [
  {
    id: 'midnight',
    name: 'Midnight Blue',
    emoji: '🌌',
    accent:    '#2878ff',
    accent2:   '#7c3aed',
    accentR:   '40,120,255',
    accentR2:  '124,58,237',
    bg:        '#040810',
    bgMid:     '#07111f',
    windowBg:  'rgba(7,11,28,0.92)',
    windowBorder: 'rgba(255,255,255,0.09)',
    titleBg:   'rgba(7,11,28,0.70)',
    textPrimary: 'rgba(255,255,255,0.88)',
    textMuted:   'rgba(255,255,255,0.40)',
    isLight:   false,
    particleColor: 'rgba(40,120,255,',
    scanColor: 'rgba(40,120,255,0.5)',
    glowColor: 'rgba(40,120,255,0.25)',
    taglineGradient: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #2878ff 70%, #7c3aed 100%)',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    emoji: '⚡',
    accent:    '#f0e020',
    accent2:   '#ff2d78',
    accentR:   '240,224,32',
    accentR2:  '255,45,120',
    bg:        '#08040f',
    bgMid:     '#100818',
    windowBg:  'rgba(14,6,24,0.93)',
    windowBorder: 'rgba(240,224,32,0.10)',
    titleBg:   'rgba(14,6,24,0.75)',
    textPrimary: 'rgba(255,255,240,0.90)',
    textMuted:   'rgba(255,255,180,0.40)',
    isLight:   false,
    particleColor: 'rgba(240,224,32,',
    scanColor: 'rgba(240,224,32,0.5)',
    glowColor: 'rgba(240,224,32,0.25)',
    taglineGradient: 'linear-gradient(135deg, #ffffff 0%, #fde047 35%, #f0e020 60%, #ff2d78 100%)',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    emoji: '🌿',
    accent:    '#10b981',
    accent2:   '#06b6d4',
    accentR:   '16,185,129',
    accentR2:  '6,182,212',
    bg:        '#020f0a',
    bgMid:     '#061510',
    windowBg:  'rgba(3,16,12,0.92)',
    windowBorder: 'rgba(16,185,129,0.10)',
    titleBg:   'rgba(3,16,12,0.72)',
    textPrimary: 'rgba(240,255,250,0.90)',
    textMuted:   'rgba(200,240,220,0.40)',
    isLight:   false,
    particleColor: 'rgba(16,185,129,',
    scanColor: 'rgba(16,185,129,0.5)',
    glowColor: 'rgba(16,185,129,0.25)',
    taglineGradient: 'linear-gradient(135deg, #ffffff 0%, #6ee7b7 40%, #10b981 70%, #06b6d4 100%)',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    emoji: '🔴',
    accent:    '#ef4444',
    accent2:   '#f97316',
    accentR:   '239,68,68',
    accentR2:  '249,115,22',
    bg:        '#0f0404',
    bgMid:     '#180808',
    windowBg:  'rgba(20,5,5,0.92)',
    windowBorder: 'rgba(239,68,68,0.10)',
    titleBg:   'rgba(20,5,5,0.72)',
    textPrimary: 'rgba(255,245,245,0.90)',
    textMuted:   'rgba(255,200,200,0.40)',
    isLight:   false,
    particleColor: 'rgba(239,68,68,',
    scanColor: 'rgba(239,68,68,0.5)',
    glowColor: 'rgba(239,68,68,0.25)',
    taglineGradient: 'linear-gradient(135deg, #ffffff 0%, #fca5a5 40%, #ef4444 70%, #f97316 100%)',
  },
  {
    id: 'light',
    name: 'Light',
    emoji: '☀️',
    accent:    '#2563eb',
    accent2:   '#7c3aed',
    accentR:   '37,99,235',
    accentR2:  '124,58,237',
    bg:        '#e8edf8',
    bgMid:     '#dce3f5',
    windowBg:  'rgba(255,255,255,0.85)',
    windowBorder: 'rgba(37,99,235,0.15)',
    titleBg:   'rgba(240,245,255,0.90)',
    textPrimary: 'rgba(15,23,42,0.90)',
    textMuted:   'rgba(15,23,42,0.45)',
    isLight:   true,
    particleColor: 'rgba(37,99,235,',
    scanColor: 'rgba(37,99,235,0.35)',
    glowColor: 'rgba(37,99,235,0.15)',
    taglineGradient: 'linear-gradient(135deg, #0f172a 0%, #1e40af 40%, #2563eb 70%, #7c3aed 100%)',
  },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES[0],
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    return (localStorage.getItem('daniel-os-theme') as ThemeId) || 'midnight';
  });

  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  const setTheme = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem('daniel-os-theme', id);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent',       theme.accent);
    root.style.setProperty('--accent2',      theme.accent2);
    root.style.setProperty('--accent-rgb',   theme.accentR);
    root.style.setProperty('--accent2-rgb',  theme.accentR2);
    root.style.setProperty('--bg',           theme.bg);
    root.style.setProperty('--bg-mid',       theme.bgMid);
    root.style.setProperty('--scan-color',   theme.scanColor);
    root.style.setProperty('--glow-color',   theme.glowColor);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-muted',   theme.textMuted);
    document.body.style.background = theme.bg;
    // Light theme: switch body text so any unstyled text is dark
    document.body.style.color = theme.isLight ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.88)';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
