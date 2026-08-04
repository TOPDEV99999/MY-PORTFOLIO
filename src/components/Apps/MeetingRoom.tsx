import { motion } from 'framer-motion';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const BOOKING_URL = 'https://calendar.app.google/K9uENUFT5iNrBY7Z8';

const STATEMENT_PARTS = [
  { text: 'In a world driven by endless innovation, one developer refuses to follow the ordinary path. ' },
  { text: 'Armed with artificial intelligence and full-stack expertise, every challenge becomes an opportunity to create something extraordinary. ' },
  { text: 'From intelligent automation to scalable digital experiences, every line of code shapes the future. ' },
  { text: 'The mission is simple: build smarter, innovate faster, and never stop evolving. ' },
  { text: 'This is more than software development—it\'s engineering the future, one breakthrough at a time.', bold: true },
];

export default function MeetingRoom() {
  const { theme } = useTheme();
  const isLight = theme.isLight;

  const panelBg   = isLight ? 'rgba(240,245,255,0.60)' : 'rgba(4,8,20,0.40)';
  const textColor = isLight ? 'rgba(15,23,42,0.82)'   : 'rgba(255,255,255,0.75)';
  const boldColor = isLight ? 'rgba(15,23,42,0.95)'   : 'rgba(255,255,255,0.96)';
  const lineColor = isLight ? `rgba(${hexRgb(theme.accent)},0.20)` : `rgba(${hexRgb(theme.accent)},0.18)`;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: panelBg,
    }}>
      {/* ── Statement ──────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 52px',
        overflowY: 'auto',
      }}>
        <motion.div
          style={{ maxWidth: 560, textAlign: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Accent line top */}
          <motion.div
            style={{
              width: 48, height: 2, borderRadius: 2, margin: '0 auto 36px',
              background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
              boxShadow: `0 0 12px rgba(${hexRgb(theme.accent)},0.6)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Text */}
          <p style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            lineHeight: 1.85,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.01em',
            color: textColor,
          }}>
            {STATEMENT_PARTS.map((part, i) => (
              <motion.span
                key={i}
                style={{
                  fontWeight: part.bold ? 700 : 400,
                  color: part.bold ? boldColor : textColor,
                  fontFamily: part.bold ? "'Space Grotesk', sans-serif" : "'DM Sans', sans-serif",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.18 }}
              >
                {part.text}
              </motion.span>
            ))}
          </p>

          {/* Accent line bottom */}
          <motion.div
            style={{
              width: 48, height: 2, borderRadius: 2, margin: '36px auto 0',
              background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
              boxShadow: `0 0 12px rgba(${hexRgb(theme.accent)},0.6)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </motion.div>
      </div>

      {/* ── Book Meeting button ──────────────────────────── */}
      <div style={{
        flexShrink: 0,
        padding: '20px 40px 28px',
        borderTop: `1px solid ${lineColor}`,
        display: 'flex', justifyContent: 'center',
      }}>
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '14px 40px', borderRadius: 14, textDecoration: 'none',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14,
            color: 'white',
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
            boxShadow: `0 4px 24px rgba(${hexRgb(theme.accent)},0.40)`,
            border: `1px solid rgba(${hexRgb(theme.accent)},0.45)`,
            transition: 'all 0.2s',
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 6px 32px rgba(${hexRgb(theme.accent)},0.60)`,
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          <CalendarDays size={16} />
          Book a Meeting
          <ExternalLink size={13} style={{ opacity: 0.75 }} />
        </motion.a>
      </div>
    </div>
  );
}

function hexRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}
