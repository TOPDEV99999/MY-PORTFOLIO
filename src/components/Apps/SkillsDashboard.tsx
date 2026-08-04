import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';

type CategoryKey = keyof typeof skills;
const CATEGORY_ORDER: CategoryKey[] = ['frontend', 'backend', 'ai', 'databases', 'cloud'];
const ICONS: Record<CategoryKey, string> = {
  frontend: '🎨', backend: '⚙️', ai: '🤖', databases: '🗄️', cloud: '☁️',
};

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}
function shiftColor(hex: string): string {
  const map: Record<string, string> = {
    '#2878ff': '#7c3aed', '#7c3aed': '#ec4899',
    '#06b6d4': '#2878ff', '#10b981': '#06b6d4', '#f59e0b': '#ef4444',
  };
  return map[hex] ?? '#7c3aed';
}

function SkillBar({ name, level, color, delay, isLight }: { name: string; level: number; color: string; delay: number; isLight: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: isLight ? 'rgba(15,23,42,0.80)' : 'rgba(255,255,255,0.72)', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
          {name}
        </span>
        <span style={{ fontSize: 10, color: isLight ? 'rgba(15,23,42,0.40)' : 'rgba(255,255,255,0.32)', fontFamily: "'JetBrains Mono', monospace" }}>
          {level}%
        </span>
      </div>
      <div style={{ height: 5, borderRadius: 9999, background: isLight ? 'rgba(15,23,42,0.09)' : 'rgba(255,255,255,0.07)' }}>
        <motion.div
          style={{
            height: '100%', borderRadius: 9999,
            background: `linear-gradient(90deg, ${color}, ${shiftColor(color)})`,
            boxShadow: `0 0 8px ${color}80`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function SkillsDashboard() {
  const { theme } = useTheme();
  const isLight = theme.isLight;
  const [active, setActive] = useState<CategoryKey>('frontend');
  const cat = skills[active];

  // Adaptive palette
  const panelBg    = isLight ? 'rgba(240,245,255,0.50)' : 'rgba(4,8,20,0.40)';
  const sidebarBg  = isLight ? 'rgba(230,238,255,0.70)' : 'rgba(4,8,20,0.55)';
  const sidebarBdr = isLight ? 'rgba(37,99,235,0.12)'   : 'rgba(255,255,255,0.07)';
  const catLbl     = isLight ? 'rgba(15,23,42,0.35)'    : 'rgba(255,255,255,0.28)';
  const nameActive = isLight ? 'rgba(15,23,42,0.92)'    : 'rgba(255,255,255,0.92)';
  const nameInact  = isLight ? 'rgba(15,23,42,0.50)'    : 'rgba(255,255,255,0.50)';
  const countLabel = isLight ? 'rgba(15,23,42,0.35)'    : 'rgba(255,255,255,0.28)';
  const statCardBg = isLight ? 'rgba(37,99,235,0.05)'   : 'rgba(255,255,255,0.03)';
  const statCardBdr= isLight ? 'rgba(37,99,235,0.10)'   : 'rgba(255,255,255,0.07)';
  const statNum    = isLight ? 'rgba(15,23,42,0.85)'    : 'rgba(255,255,255,0.82)';
  const statSub    = isLight ? 'rgba(15,23,42,0.40)'    : 'rgba(255,255,255,0.28)';
  const headTitle  = isLight ? 'rgba(15,23,42,0.92)'    : 'rgba(255,255,255,0.92)';
  const headSub    = isLight ? 'rgba(15,23,42,0.42)'    : 'rgba(255,255,255,0.35)';
  const gaugeLbl   = isLight ? 'rgba(15,23,42,0.38)'    : 'rgba(255,255,255,0.32)';
  const gaugeTrack = isLight ? 'rgba(15,23,42,0.09)'    : 'rgba(255,255,255,0.06)';
  const cardBg     = isLight ? 'rgba(37,99,235,0.04)'   : 'rgba(255,255,255,0.03)';
  const cardBdr    = isLight ? 'rgba(37,99,235,0.09)'   : 'rgba(255,255,255,0.07)';
  const chipSecLbl = isLight ? 'rgba(15,23,42,0.35)'    : 'rgba(255,255,255,0.25)';
  const divider    = isLight ? 'rgba(15,23,42,0.08)'    : 'rgba(255,255,255,0.06)';

  return (
    <div style={{ display: 'flex', height: '100%', background: panelBg }}>

      {/* ── Sidebar ──────────────────────────── */}
      <div style={{
        width: 200, flexShrink: 0,
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
        padding: '16px 12px', gap: 6,
        borderRight: `1px solid ${sidebarBdr}`,
        background: sidebarBg,
      }}>
        <div style={{ padding: '4px 8px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: catLbl, fontFamily: "'JetBrains Mono', monospace" }}>
          Categories
        </div>

        {CATEGORY_ORDER.map(key => {
          const c = skills[key];
          const rgb = hexToRgb(c.color);
          const isActive = active === key;
          return (
            <motion.button
              key={key}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 12px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left',
                background: isActive ? `rgba(${rgb},0.14)` : 'transparent',
                outline: isActive ? `1px solid rgba(${rgb},0.30)` : '1px solid transparent',
                transition: 'all 0.18s',
              }}
              onClick={() => setActive(key)}
              whileHover={{ background: `rgba(${rgb},0.08)` }}
            >
              <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{ICONS[key]}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontWeight: 600,
                  color: isActive ? nameActive : nameInact,
                  fontFamily: "'DM Sans', sans-serif",
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  marginBottom: 2,
                }}>
                  {c.label.replace(' Development', '').replace('Artificial ', '')}
                </div>
                <div style={{ fontSize: 10, color: countLabel, fontFamily: "'JetBrains Mono', monospace" }}>
                  {c.items.length} skills
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Total card */}
        <div style={{ marginTop: 'auto', padding: '14px', borderRadius: 14, background: statCardBg, border: `1px solid ${statCardBdr}` }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: catLbl, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
            Total Skills
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: statNum, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1, marginBottom: 6 }}>
            {CATEGORY_ORDER.reduce((acc, k) => acc + skills[k].items.length, 0)}
          </div>
          <div style={{ fontSize: 10, color: statSub, fontFamily: "'DM Sans', sans-serif" }}>
            across 5 domains
          </div>
        </div>
      </div>

      {/* ── Main ─────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 28px' }}>
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, fontSize: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `rgba(${hexToRgb(cat.color)},0.14)`,
                border: `1px solid rgba(${hexToRgb(cat.color)},0.28)`,
                boxShadow: `0 0 22px rgba(${hexToRgb(cat.color)},0.12)`,
              }}>
                {ICONS[active]}
              </div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: headTitle, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>
                  {cat.label}
                </h2>
                <p style={{ fontSize: 12, color: headSub, fontFamily: "'DM Sans', sans-serif" }}>
                  {cat.items.length} technologies
                </p>
              </div>
            </div>

            {/* Gauge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 10, color: gaugeLbl, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace" }}>
                Proficiency
              </span>
              <div style={{ position: 'relative', width: 52, height: 52 }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r="15" fill="none" stroke={gaugeTrack} strokeWidth="3" />
                  <motion.circle
                    cx="18" cy="18" r="15" fill="none"
                    stroke={cat.color} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 15}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 15 * (1 - cat.level / 100) }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ filter: `drop-shadow(0 0 4px ${cat.color})` }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: cat.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {cat.level}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skill cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
            {cat.items.map((skill, i) => (
              <motion.div
                key={skill.name}
                style={{ padding: '14px 16px', borderRadius: 14, background: cardBg, border: `1px solid ${cardBdr}`, transition: 'all 0.18s' }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                whileHover={{ background: `rgba(${hexToRgb(cat.color)},0.07)`, borderColor: `rgba(${hexToRgb(cat.color)},0.22)` }}
              >
                <SkillBar name={skill.name} level={skill.level} color={cat.color} delay={i * 0.05} isLight={isLight} />
              </motion.div>
            ))}
          </div>

          {/* Chips */}
          <div style={{ borderTop: `1px solid ${divider}`, paddingTop: 22 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: chipSecLbl, fontFamily: "'JetBrains Mono', monospace", marginBottom: 14, fontWeight: 600 }}>
              All Technologies
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {cat.items.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  style={{
                    padding: '6px 13px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                    background: `rgba(${hexToRgb(cat.color)},0.10)`,
                    border: `1px solid rgba(${hexToRgb(cat.color)},0.22)`,
                    color: cat.color,
                    fontFamily: "'DM Sans', sans-serif", cursor: 'default',
                  }}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
