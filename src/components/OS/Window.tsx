import { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Maximize2, X } from 'lucide-react';
import { useWindowManager, type AppId } from '../../context/WindowManager';
import { useTheme } from '../../context/ThemeContext';

const STATUSBAR_H = 30;
const TASKBAR_H   = 56;

interface WindowProps {
  id: AppId;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  accent?: string;
  minWidth?: number;
  minHeight?: number;
}

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : '40,120,255';
}

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const RESIZE_HANDLES: { dir: ResizeDir; style: React.CSSProperties }[] = [
  { dir: 'n',  style: { top: 0,    left: 60,  right: 60, height: 6,  cursor: 'ns-resize' } },
  { dir: 's',  style: { bottom: 0, left: 4,   right: 4,  height: 6,  cursor: 'ns-resize' } },
  { dir: 'e',  style: { right: 0,  top: 44,   bottom: 4, width: 6,   cursor: 'ew-resize' } },
  { dir: 'w',  style: { left: 0,   top: 44,   bottom: 4, width: 6,   cursor: 'ew-resize' } },
  { dir: 'ne', style: { top: 0,    right: 0,  width: 14, height: 14, cursor: 'ne-resize' } },
  { dir: 'nw', style: { top: 44,   left: 0,   width: 14, height: 14, cursor: 'nw-resize' } },
  { dir: 'se', style: { bottom: 0, right: 0,  width: 14, height: 14, cursor: 'se-resize' } },
  { dir: 'sw', style: { bottom: 0, left: 0,   width: 14, height: 14, cursor: 'sw-resize' } },
];

export default function Window({
  id, title, icon, children,
  defaultWidth = 860, defaultHeight = 580,
  defaultX, defaultY,
  accent = '#2878ff',
  minWidth = 320, minHeight = 240,
}: WindowProps) {
  const { windows, closeApp, minimizeApp, focusApp, isActive } = useWindowManager();
  const { theme } = useTheme();
  const win = windows[id];

  const [rect, setRect]     = useState({ x: 0, y: 0, w: defaultWidth, h: defaultHeight });
  const [isMax, setIsMax]   = useState(false);
  const [ready, setReady]   = useState(false);

  const interacting = useRef(false);
  const interaction = useRef<{
    type: 'drag' | 'resize'; dir?: ResizeDir;
    startMx: number; startMy: number;
    startX: number;  startY: number;
    startW: number;  startH: number;
  } | null>(null);

  useEffect(() => {
    const x = defaultX ?? Math.max(0, (window.innerWidth  - defaultWidth)  / 2);
    const y = defaultY ?? Math.max(STATUSBAR_H, (window.innerHeight - defaultHeight) / 2 - 30);
    setRect({ x, y, w: defaultWidth, h: defaultHeight });
    setReady(true);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!interacting.current || !interaction.current) return;
    const { type, dir, startMx, startMy, startX, startY, startW, startH } = interaction.current;
    const dx = e.clientX - startMx;
    const dy = e.clientY - startMy;

    if (type === 'drag') {
      setRect(r => ({
        ...r,
        x: Math.max(0, Math.min(window.innerWidth - r.w, startX + dx)),
        y: Math.max(STATUSBAR_H, Math.min(window.innerHeight - r.h - TASKBAR_H, startY + dy)),
      }));
    } else if (type === 'resize' && dir) {
      setRect(prev => {
        let { x, y, w, h } = prev;
        if (dir.includes('e')) w = Math.max(minWidth,  startW + dx);
        if (dir.includes('s')) h = Math.max(minHeight, startH + dy);
        if (dir.includes('w')) {
          const nw = Math.max(minWidth, startW - dx);
          x = startX + (startW - nw); w = nw;
        }
        if (dir.includes('n')) {
          const nh = Math.max(minHeight, startH - dy);
          y = Math.max(STATUSBAR_H, startY + (startH - nh)); h = nh;
        }
        w = Math.min(w, window.innerWidth - x);
        h = Math.min(h, window.innerHeight - TASKBAR_H - y);
        return { x, y, w, h };
      });
    }
  }, [minWidth, minHeight]);

  const onPointerUp = useCallback(() => {
    interacting.current = false;
    interaction.current = null;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup',   onPointerUp);
  }, [onPointerMove]);

  const startDrag = (e: React.PointerEvent) => {
    if (isMax) return;
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    interacting.current = true;
    interaction.current = {
      type: 'drag',
      startMx: e.clientX, startMy: e.clientY,
      startX: rect.x, startY: rect.y,
      startW: rect.w, startH: rect.h,
    };
    focusApp(id);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup',   onPointerUp);
  };

  const startResize = (e: React.PointerEvent, dir: ResizeDir) => {
    if (isMax) return;
    e.preventDefault();
    e.stopPropagation();
    interacting.current = true;
    interaction.current = {
      type: 'resize', dir,
      startMx: e.clientX, startMy: e.clientY,
      startX: rect.x, startY: rect.y,
      startW: rect.w, startH: rect.h,
    };
    focusApp(id);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup',   onPointerUp);
  };

  if (!win.isOpen || win.isMinimized || !ready) return null;

  const active    = isActive(id);
  const accentRgb = hexToRgb(accent);

  // ── Maximized geometry: sit BELOW statusbar, ABOVE taskbar ──
  const maxTop  = STATUSBAR_H;
  const maxH    = window.innerHeight - STATUSBAR_H - TASKBAR_H;

  const L = isMax ? 0       : rect.x;
  const T = isMax ? maxTop  : rect.y;
  const W = isMax ? window.innerWidth : rect.w;
  const H = isMax ? maxH    : rect.h;
  // Stay below OS chrome: statusbar=9998, taskbar=9999
  const Z = Math.min(win.zIndex, 9990);

  // Theme-driven colors
  const winBg     = theme.windowBg;
  const titleBg   = `linear-gradient(90deg, rgba(${accentRgb},0.12) 0%, ${theme.titleBg} 100%)`;
  const borderCol = active
    ? `rgba(${accentRgb},0.35)`
    : theme.windowBorder;
  const titleText = theme.textPrimary;
  const btnText   = theme.isLight ? 'rgba(15,23,42,0.50)' : 'rgba(255,255,255,0.35)';

  return (
    <AnimatePresence>
      <motion.div
        key={`window-${id}`}
        style={{
          position: 'fixed',
          left: L, top: T, width: W, height: H,
          zIndex: Z,
          borderRadius: isMax ? 0 : 16,
          background: winBg,
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: `1px solid ${borderCol}`,
          boxShadow: active
            ? `0 20px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(${accentRgb},0.10)`
            : '0 16px 50px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          // NO overflow:hidden here — it traps button stacking contexts
        }}
        onMouseDown={e => {
          if ((e.target as HTMLElement).closest('button')) return;
          focusApp(id);
        }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={   { opacity: 0, scale: 0.90, y: 16 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
      >

        {/* ── Resize handles (windowed only) ─────────── */}
        {!isMax && RESIZE_HANDLES.map(({ dir, style }) => (
          <div
            key={dir}
            style={{ position: 'absolute', zIndex: 8, ...style }}
            onPointerDown={e => startResize(e, dir)}
          />
        ))}

        {/* ── Title bar ─────────────────────────────── */}
        <div
          onPointerDown={startDrag}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 44, flexShrink: 0,
            paddingLeft: 14, paddingRight: 10,
            background: titleBg,
            borderBottom: `1px solid rgba(${accentRgb},0.13)`,
            borderRadius: isMax ? 0 : '16px 16px 0 0',
            cursor: isMax ? 'default' : 'move',
            userSelect: 'none',
            // Explicit stacking — this must sit above resize handles
            position: 'relative', zIndex: 20,
          }}
        >
          {/* ── Traffic lights ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            {/* Each button stops pointer propagation so startDrag never fires */}
            <button
              onPointerDown={e => { e.stopPropagation(); }}
              onClick={() => closeApp(id)}
              title="Close"
              style={{
                width: 14, height: 14, borderRadius: '50%',
                background: '#ff5f57', border: '1px solid rgba(0,0,0,0.15)',
                cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            />
            <button
              onPointerDown={e => { e.stopPropagation(); }}
              onClick={() => minimizeApp(id)}
              title="Minimize"
              style={{
                width: 14, height: 14, borderRadius: '50%',
                background: '#ffbd2e', border: '1px solid rgba(0,0,0,0.15)',
                cursor: 'pointer', flexShrink: 0,
              }}
            />
            <button
              onPointerDown={e => { e.stopPropagation(); }}
              onClick={() => setIsMax(v => !v)}
              title={isMax ? 'Restore' : 'Maximize'}
              style={{
                width: 14, height: 14, borderRadius: '50%',
                background: '#28c840', border: '1px solid rgba(0,0,0,0.15)',
                cursor: 'pointer', flexShrink: 0,
              }}
            />
          </div>

          {/* ── Centred title ── */}
          <div style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 7,
            pointerEvents: 'none', maxWidth: '60%',
          }}>
            <span style={{ color: active ? accent : theme.textMuted, display: 'flex', flexShrink: 0 }}>
              {icon}
            </span>
            <span style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.03em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              fontFamily: "'DM Sans', sans-serif",
              color: titleText,
            }}>
              {title}
            </span>
          </div>

          {/* ── Right controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            {([
              { Icon: Minus,    act: () => minimizeApp(id),  hov: theme.isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.08)' },
              { Icon: Maximize2, act: () => setIsMax(v=>!v), hov: theme.isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.08)' },
              { Icon: X,        act: () => closeApp(id),     hov: 'rgba(239,68,68,0.20)' },
            ] as const).map(({ Icon, act, hov }, i) => (
              <button
                key={i}
                onPointerDown={e => e.stopPropagation()}
                onClick={() => act()}
                style={{
                  padding: '5px 6px', borderRadius: 6, border: 'none',
                  background: 'transparent', color: btnText,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = hov;
                  (e.currentTarget as HTMLElement).style.color = theme.isLight ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.80)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = btnText;
                }}
              >
                <Icon size={11} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ───────────────────────────────── */}
        <div style={{
          flex: 1, overflow: 'hidden', minHeight: 0,
          borderRadius: isMax ? 0 : '0 0 16px 16px',
        }}>
          {children}
        </div>

        {/* ── Active accent line (bottom) ───────────── */}
        {active && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 1, pointerEvents: 'none', zIndex: 1,
            borderRadius: isMax ? 0 : '0 0 16px 16px',
            background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.55), transparent)`,
          }} />
        )}

        {/* ── SE resize grip indicator ──────────────── */}
        {!isMax && (
          <div style={{
            position: 'absolute', bottom: 4, right: 4,
            width: 10, height: 10, pointerEvents: 'none',
            opacity: active ? 0.45 : 0.18, zIndex: 1,
          }}>
            <svg viewBox="0 0 10 10" fill="none" style={{ width: '100%', height: '100%' }}>
              <line x1="9" y1="2" x2="2" y2="9" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="9" y1="5.5" x2="5.5" y2="9" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
