import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Wifi, ShieldCheck, Cpu } from 'lucide-react';
import { profile } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';

export default function StatusBar() {
  const { theme } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const isLight  = theme.isLight;
  const barBg    = isLight ? 'rgba(230,238,255,0.94)' : 'rgba(4,8,20,0.60)';
  const barBdr   = isLight ? 'rgba(37,99,235,0.12)'   : 'rgba(255,255,255,0.05)';
  const textCol  = isLight ? 'rgba(15,23,42,0.42)'    : 'rgba(255,255,255,0.28)';
  const brandCol = theme.accent;
  const nameCol  = isLight ? 'rgba(15,23,42,0.65)'    : 'rgba(255,255,255,0.38)';
  const clockCol = isLight ? 'rgba(15,23,42,0.55)'    : 'rgba(255,255,255,0.50)';

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: 18, paddingRight: 18,
        background: barBg,
        backdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${barBdr}`,
        zIndex: 9998,
        fontSize: 10,
        color: textCol,
        letterSpacing: '0.07em',
        fontFamily: "'JetBrains Mono', monospace",
      }}
      initial={{ y: -30 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ color: brandCol, fontWeight: 700, letterSpacing: '0.08em' }}>
          DANIEL OS
        </span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.02em', color: nameCol }}>
          {profile.name}
        </span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.span
            style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          ONLINE
        </span>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: textCol }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Cpu size={9} /> AI ACTIVE
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <ShieldCheck size={9} /> SECURE
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Wifi size={9} /> CONNECTED
        </span>
        <span style={{ opacity: 0.25 }}>·</span>
        <span style={{ color: clockCol }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}
