import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, FolderOpen, Brain, ScrollText,
  BookOpen, CalendarDays, Mail, Cpu, Wifi,
  Battery, Volume2,
} from 'lucide-react';
import { useWindowManager, type AppId } from '../../context/WindowManager';
import { useTheme } from '../../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

interface AppDef {
  id: AppId;
  label: string;
  icon: React.ReactNode;
  accent: string;
}

const APPS: AppDef[] = [
  { id: 'home',       label: 'Home',        icon: <Home size={17} />,         accent: '#2878ff' },
  { id: 'projects',   label: 'Projects',    icon: <FolderOpen size={17} />,   accent: '#f59e0b' },
  { id: 'skills',     label: 'Skills',      icon: <Brain size={17} />,        accent: '#7c3aed' },
  { id: 'experience', label: 'Experience',  icon: <ScrollText size={17} />,   accent: '#10b981' },
  { id: 'blog',       label: 'Blog',        icon: <BookOpen size={17} />,     accent: '#f43f5e' },
  { id: 'meeting',    label: 'Meeting',     icon: <CalendarDays size={17} />, accent: '#8b5cf6' },
  { id: 'contact',    label: 'Contact',     icon: <Mail size={17} />,         accent: '#ec4899' },
];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}

function Clock() {
  const { theme } = useTheme();
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const col1 = theme.isLight ? 'rgba(15,23,42,0.82)' : 'rgba(255,255,255,0.88)';
  const col2 = theme.isLight ? 'rgba(15,23,42,0.38)' : 'rgba(255,255,255,0.38)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, lineHeight: 1 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: col1, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
      <span style={{ fontSize: 10, color: col2, fontFamily: "'JetBrains Mono', monospace" }}>
        {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
      </span>
    </div>
  );
}

export default function Taskbar() {
  const { windows, openApp, focusApp, isActive } = useWindowManager();
  const { theme } = useTheme();
  const [tooltip, setTooltip] = useState<string | null>(null);

  const isLight = theme.isLight;

  const handleAppClick = (app: AppDef) => {
    const win = windows[app.id];
    if (win.isOpen) focusApp(app.id);
    else openApp(app.id);
  };

  // Adaptive colors
  const barBg      = isLight ? 'rgba(240,245,255,0.94)' : 'rgba(5,9,22,0.90)';
  const barBorder  = `rgba(${theme.accentR},0.14)`;
  const brandLabel = isLight ? 'rgba(15,23,42,0.60)'   : 'rgba(255,255,255,0.65)';
  const divider    = isLight ? 'rgba(0,0,0,0.10)'       : 'rgba(255,255,255,0.08)';
  const trayColor  = isLight ? 'rgba(15,23,42,0.32)'    : 'rgba(255,255,255,0.30)';

  // Icon button colors per state
  const iconColor = (active: boolean, running: boolean, accent: string) => {
    if (active)  return accent;
    if (running) return isLight ? 'rgba(15,23,42,0.70)' : 'rgba(255,255,255,0.70)';
    return isLight ? 'rgba(15,23,42,0.38)' : 'rgba(255,255,255,0.38)';
  };
  const iconBg = (active: boolean, running: boolean, accent: string) => {
    const rgb = hexToRgb(accent);
    if (active)  return `rgba(${rgb},0.18)`;
    if (running) return isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
    return 'transparent';
  };
  const runDotBg = (active: boolean, accent: string) =>
    active ? accent : (isLight ? 'rgba(15,23,42,0.30)' : 'rgba(255,255,255,0.32)');

  // Tooltip
  const tipBg  = isLight ? 'rgba(15,23,42,0.93)' : 'rgba(8,12,28,0.97)';
  const tipCol = 'rgba(255,255,255,0.90)';

  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: 16, paddingRight: 16,
        background: barBg,
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        borderTop: `1px solid ${barBorder}`,
        zIndex: 9999,
        boxShadow: isLight
          ? `0 -2px 20px rgba(0,0,0,0.10)`
          : `0 -4px 32px rgba(0,0,0,0.55), 0 -1px 0 rgba(${theme.accentR},0.07)`,
      }}
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
    >
      {/* ── Brand ──────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 130 }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          whileHover={{ scale: 1.03 }}
          onClick={() => handleAppClick(APPS[0])}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 9, flexShrink: 0,
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 14px rgba(${theme.accentR},0.50)`,
          }}>
            <Cpu size={13} color="white" />
          </div>
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
            color: brandLabel,
            fontFamily: "'Space Grotesk', sans-serif",
            textTransform: 'uppercase',
          }}>
            Daniel
          </span>
        </motion.div>
      </div>

      {/* ── App icons ──────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {APPS.map((app) => {
          const win    = windows[app.id];
          const active  = isActive(app.id);
          const running = win.isOpen;
          const rgb     = hexToRgb(app.accent);

          return (
            <div key={app.id} style={{ position: 'relative' }} onMouseLeave={() => setTooltip(null)}>
              <motion.button
                style={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: iconBg(active, running, app.accent),
                  outline: active ? `1px solid ${app.accent}55` : '1px solid transparent',
                  color: iconColor(active, running, app.accent),
                  transition: 'all 0.18s',
                }}
                whileHover={{
                  scale: 1.14,
                  background: `rgba(${rgb},0.15)`,
                  color: app.accent,
                }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleAppClick(app)}
                onMouseEnter={() => setTooltip(app.id)}
              >
                {app.icon}
                {running && (
                  <motion.span
                    style={{
                      position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
                      width: 4, height: 4, borderRadius: '50%',
                      background: runDotBg(active, app.accent),
                    }}
                    layoutId={`dot-${app.id}`}
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {tooltip === app.id && (
                  <motion.div
                    style={{
                      position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)',
                      pointerEvents: 'none', zIndex: 10001,
                    }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.14 }}
                  >
                    <div style={{
                      padding: '5px 10px', borderRadius: 8,
                      background: tipBg,
                      border: '1px solid rgba(255,255,255,0.10)',
                      fontSize: 11, fontWeight: 600, color: tipCol,
                      backdropFilter: 'blur(12px)',
                      whiteSpace: 'nowrap',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {app.label}
                    </div>
                    <div style={{
                      position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                      bottom: -4, width: 8, height: 8, rotate: '45deg',
                      background: tipBg,
                      border: '1px solid rgba(255,255,255,0.10)',
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Tray ───────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 130, justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: trayColor }}>
          <Wifi size={12} />
          <Volume2 size={12} />
          <Battery size={12} />
        </div>
        <div style={{ width: 1, height: 20, background: divider }} />
        <ThemeSwitcher />
        <div style={{ width: 1, height: 20, background: divider }} />
        <Clock />
      </div>
    </motion.div>
  );
}
