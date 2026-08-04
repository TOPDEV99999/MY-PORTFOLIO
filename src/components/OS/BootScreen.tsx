import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const BOOT_LINES = [
  'Initializing DANIEL OS kernel…',
  'Loading AI subsystems…',
  'Mounting developer workspace…',
  'Connecting neural interface…',
  'Rendering portfolio environment…',
  'System ready.',
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const { theme } = useTheme();
  const isLight = theme.isLight;
  const [lines, setLines]       = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);

  // All text/surface colors adapt to light vs dark
  const bgColor       = theme.bg;
  const osNameGrad    = isLight
    ? `linear-gradient(135deg, rgba(15,23,42,0.95), rgba(${theme.accentR},0.9), ${theme.accent2})`
    : `linear-gradient(135deg, #fff, rgba(${theme.accentR},0.9), ${theme.accent2})`;
  const subtitleColor = isLight ? 'rgba(15,23,42,0.45)' : 'rgba(255,255,255,0.28)';
  const lineCompColor = isLight ? 'rgba(15,23,42,0.40)' : 'rgba(255,255,255,0.32)';
  const checkColor    = isLight ? 'rgba(15,23,42,0.25)' : 'rgba(255,255,255,0.18)';
  const sysInitColor  = isLight ? 'rgba(15,23,42,0.35)' : 'rgba(255,255,255,0.22)';
  const trackBg       = isLight ? 'rgba(15,23,42,0.10)' : 'rgba(255,255,255,0.06)';
  const footerColor   = isLight ? 'rgba(15,23,42,0.28)' : 'rgba(255,255,255,0.15)';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[i]]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 400);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          style={{
            position: 'fixed', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: bgColor,
            zIndex: 99999,
            fontFamily: "'DM Sans', sans-serif",
          }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* Background glow */}
          <motion.div
            style={{
              position: 'absolute', width: 500, height: 500, borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${theme.accentR},0.10) 0%, transparent 70%)`,
              filter: 'blur(70px)',
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo block */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 52 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              style={{
                width: 76, height: 76, borderRadius: 22,
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 22,
                boxShadow: `0 0 40px rgba(${theme.accentR},0.5)`,
              }}
              animate={{
                boxShadow: [
                  `0 0 30px rgba(${theme.accentR},0.4)`,
                  `0 0 60px rgba(${theme.accentR},0.75)`,
                  `0 0 30px rgba(${theme.accentR},0.4)`,
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <Cpu size={34} color="white" />
            </motion.div>

            {/* OS Name */}
            <div style={{
              fontSize: 30, fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.10em',
              background: osNameGrad,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 8,
            }}>
              DANIEL OS
            </div>
            <div style={{
              fontSize: 11, color: subtitleColor,
              letterSpacing: '0.28em', marginTop: 2,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              AI PERSONAL OPERATING SYSTEM
            </div>
          </motion.div>

          {/* Boot log */}
          <div style={{ width: 440, marginBottom: 36, minHeight: 144 }}>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: i === lines.length - 1 ? theme.accent : lineCompColor,
                  marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{ color: i < lines.length - 1 ? checkColor : theme.accent, flexShrink: 0 }}>
                  {i < lines.length - 1 ? '✓' : '▶'}
                </span>
                {line}
              </motion.div>
            ))}
          </div>

          {/* Progress */}
          <div style={{ width: 440 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{
                fontSize: 10, color: sysInitColor,
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em',
              }}>
                SYSTEM INITIALIZATION
              </span>
              <span style={{
                fontSize: 10, color: theme.accent,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {progress}%
              </span>
            </div>
            <div style={{ height: 3, background: trackBg, borderRadius: 9999, overflow: 'hidden' }}>
              <motion.div
                style={{
                  height: '100%', borderRadius: 9999,
                  background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
                  boxShadow: `0 0 10px rgba(${theme.accentR},0.8)`,
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            position: 'absolute', bottom: 28,
            fontSize: 10, color: footerColor,
            fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em',
          }}>
            v1.0.0 · Daniel Lixandru Nicolae · {new Date().getFullYear()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
