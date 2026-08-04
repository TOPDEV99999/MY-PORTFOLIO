import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { THEMES, useTheme, type ThemeId } from '../../context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const dropBg    = theme.isLight ? 'rgba(255,255,255,0.97)' : 'rgba(8,12,26,0.97)';
  const dropBdr   = theme.isLight ? 'rgba(37,99,235,0.18)'   : 'rgba(255,255,255,0.10)';
  const labelCol  = theme.isLight ? 'rgba(15,23,42,0.35)'    : 'rgba(255,255,255,0.25)';
  const nameCol   = (active: boolean, t: typeof theme) =>
    active ? t.accent : (theme.isLight ? 'rgba(15,23,42,0.75)' : 'rgba(255,255,255,0.70)');

  const btnBg = theme.isLight
    ? (open ? `rgba(${theme.accentR},0.12)` : 'rgba(0,0,0,0.07)')
    : (open ? `rgba(${theme.accentR},0.18)` : 'rgba(255,255,255,0.06)');
  const btnColor = theme.isLight
    ? (open ? theme.accent : 'rgba(15,23,42,0.50)')
    : (open ? theme.accent : 'rgba(255,255,255,0.45)');

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        onClick={() => setOpen(v => !v)}
        title="Change theme"
        style={{
          width: 32, height: 32, borderRadius: 10, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: btnBg, color: btnColor,
          transition: 'all 0.2s',
        }}
        whileHover={{
          scale: 1.08,
          background: `rgba(${theme.accentR},0.15)`,
          color: theme.accent,
        }}
        whileTap={{ scale: 0.94 }}
      >
        <Palette size={14} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              bottom: 44, right: 0,
              background: dropBg,
              border: `1px solid ${dropBdr}`,
              borderRadius: 14,
              padding: '10px 8px',
              backdropFilter: 'blur(24px)',
              minWidth: 190,
              boxShadow: theme.isLight
                ? '0 12px 40px rgba(0,0,0,0.15)'
                : '0 16px 48px rgba(0,0,0,0.65)',
              zIndex: 10000,
            }}
          >
            {/* Header */}
            <div style={{
              fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: labelCol, fontFamily: "'JetBrains Mono', monospace",
              padding: '2px 8px 8px',
            }}>
              Theme
            </div>

            {THEMES.map(t => {
              const isActive = theme.id === t.id;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => { setTheme(t.id as ThemeId); setOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: isActive ? `rgba(${t.accentR},0.12)` : 'transparent',
                    transition: 'all 0.15s',
                  }}
                  whileHover={{ background: `rgba(${t.accentR},0.09)` }}
                >
                  {/* Swatch */}
                  <div style={{
                    width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                    background: t.isLight
                      ? `linear-gradient(135deg, #e8edf8, ${t.accent})`
                      : `linear-gradient(135deg, ${t.accent}, ${t.accent2})`,
                    boxShadow: isActive ? `0 0 10px rgba(${t.accentR},0.55)` : 'none',
                    border: isActive
                      ? `1.5px solid rgba(${t.accentR},0.5)`
                      : `1px solid ${theme.isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)'}`,
                  }} />

                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      color: nameCol(isActive, t),
                    }}>
                      {t.emoji} {t.name}
                    </div>
                  </div>

                  {isActive && (
                    <div style={{
                      width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                      background: t.accent,
                      boxShadow: `0 0 6px ${t.accent}`,
                    }} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
