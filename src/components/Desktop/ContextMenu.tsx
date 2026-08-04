import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Download, Palette, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useDesktop, BACKGROUNDS, type BackgroundId } from '../../context/DesktopContext';

interface ContextMenuProps {
  x: number;
  y: number;
  open: boolean;
  onClose: () => void;
}

export default function ContextMenu({ x, y, open, onClose }: ContextMenuProps) {
  const { theme } = useTheme();
  const { background, setBackground } = useDesktop();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  // Clamp so menu never goes off-screen
  const MENU_W = 220;
  const MENU_H = 280;
  const clampedX = Math.min(x, window.innerWidth  - MENU_W - 8);
  const clampedY = Math.min(y, window.innerHeight - MENU_H - 64); // above taskbar

  const isLight = theme.isLight;
  const menuBg  = isLight ? 'rgba(255,255,255,0.95)' : 'rgba(10,14,32,0.96)';
  const menuBdr = isLight ? 'rgba(37,99,235,0.18)'   : 'rgba(255,255,255,0.10)';
  const shadow  = isLight
    ? '0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(37,99,235,0.10)'
    : '0 16px 52px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05)';
  const headerCol = isLight ? 'rgba(15,23,42,0.38)'  : 'rgba(255,255,255,0.28)';
  const itemCol   = isLight ? 'rgba(15,23,42,0.80)'  : 'rgba(255,255,255,0.80)';
  const itemHov   = isLight ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.07)';
  const divCol    = isLight ? 'rgba(15,23,42,0.08)'  : 'rgba(255,255,255,0.07)';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          style={{
            position: 'fixed',
            left: clampedX,
            top: clampedY,
            width: MENU_W,
            zIndex: 99990,
            background: menuBg,
            border: `1px solid ${menuBdr}`,
            borderRadius: 14,
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            boxShadow: shadow,
            overflow: 'hidden',
            userSelect: 'none',
          }}
          initial={{ opacity: 0, scale: 0.93, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* ── Set Background section ── */}
          <div style={{ padding: '10px 12px 6px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
              textTransform: 'uppercase', letterSpacing: '0.14em',
              color: headerCol, marginBottom: 6,
            }}>
              <Monitor size={10} /> Set Background
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {BACKGROUNDS.map(bg => {
                const isActive = background === bg.id;
                return (
                  <motion.button
                    key={bg.id}
                    onClick={() => { setBackground(bg.id as BackgroundId); onClose(); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '7px 8px', borderRadius: 9, border: 'none', cursor: 'pointer',
                      background: isActive ? `rgba(${hexToRgb(theme.accent)},0.14)` : 'transparent',
                      transition: 'all 0.14s',
                      textAlign: 'left',
                    }}
                    whileHover={{ background: isActive ? `rgba(${hexToRgb(theme.accent)},0.18)` : itemHov }}
                  >
                    {/* Swatch */}
                    <div style={{
                      width: 28, height: 20, borderRadius: 6, flexShrink: 0,
                      background: bg.isImage ? undefined : bg.preview,
                      backgroundImage: bg.isImage ? `url(${bg.preview})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: isActive
                        ? `1.5px solid ${theme.accent}`
                        : `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.14)'}`,
                      boxShadow: isActive ? `0 0 8px rgba(${hexToRgb(theme.accent)},0.5)` : 'none',
                    }} />

                    <span style={{
                      fontSize: 12, fontWeight: isActive ? 600 : 400,
                      color: isActive ? theme.accent : itemCol,
                      fontFamily: "'DM Sans', sans-serif", flex: 1,
                    }}>
                      {bg.label}
                    </span>

                    {isActive && <Check size={12} color={theme.accent} style={{ flexShrink: 0 }} />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: divCol, margin: '4px 0' }} />

          {/* ── Download Resume ── */}
          <div style={{ padding: '6px 12px 10px' }}>
            <motion.a
              href="/Daniel_Lixandru_Nicolae.pdf"
              download="Daniel_Lixandru_Nicolae_Resume.pdf"
              onClick={onClose}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 8px', borderRadius: 9,
                fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                color: itemCol,
                background: 'transparent',
                textDecoration: 'none',
                transition: 'all 0.14s',
              }}
              whileHover={{ background: itemHov }}
            >
              <div style={{
                width: 28, height: 20, borderRadius: 6, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `rgba(${hexToRgb(theme.accent)},0.12)`,
                border: `1px solid rgba(${hexToRgb(theme.accent)},0.22)`,
              }}>
                <Download size={11} color={theme.accent} />
              </div>
              Download Resume
            </motion.a>

            {/* Change Theme shortcut */}
            <motion.button
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '7px 8px', borderRadius: 9, border: 'none', cursor: 'pointer',
                background: 'transparent', textAlign: 'left', transition: 'all 0.14s',
              }}
              whileHover={{ background: itemHov }}
              onClick={onClose}
            >
              <div style={{
                width: 28, height: 20, borderRadius: 6, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `rgba(${hexToRgb(theme.accent2)},0.12)`,
                border: `1px solid rgba(${hexToRgb(theme.accent2)},0.22)`,
              }}>
                <Palette size={11} color={theme.accent2} />
              </div>
              <span style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: itemCol }}>
                Change Theme
              </span>
              <span style={{
                marginLeft: 'auto', fontSize: 9, color: headerCol,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Taskbar →
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}
