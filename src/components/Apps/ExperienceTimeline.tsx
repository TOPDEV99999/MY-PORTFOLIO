import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronDown, Zap } from 'lucide-react';
import { experiences, education } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';

const ACCENT_COLORS = ['#2878ff', '#7c3aed', '#10b981'];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}

export default function ExperienceTimeline() {
  const { theme } = useTheme();
  const isLight = theme.isLight;
  const [expanded, setExpanded] = useState<string | null>(experiences[0].id);
  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  const panelBg    = isLight ? 'rgba(240,245,255,0.50)' : 'rgba(4,8,20,0.40)';
  const headerBadgeBg  = isLight ? 'rgba(37,99,235,0.08)'  : 'rgba(40,120,255,0.10)';
  const headerBadgeBdr = isLight ? 'rgba(37,99,235,0.18)'  : 'rgba(40,120,255,0.22)';
  const headerBadgeCol = isLight ? '#1d4ed8'               : '#93c5fd';
  const lineColor  = isLight
    ? 'linear-gradient(180deg, rgba(37,99,235,0.35) 0%, rgba(124,58,237,0.20) 60%, transparent 100%)'
    : 'linear-gradient(180deg, rgba(40,120,255,0.50) 0%, rgba(124,58,237,0.30) 60%, transparent 100%)';
  const posTitle   = isLight ? 'rgba(15,23,42,0.92)'   : 'rgba(255,255,255,0.92)';
  const metaColor  = isLight ? 'rgba(15,23,42,0.42)'   : 'rgba(255,255,255,0.38)';
  const chevColor  = isLight ? 'rgba(15,23,42,0.30)'   : 'rgba(255,255,255,0.28)';
  const respText   = isLight ? 'rgba(15,23,42,0.68)'   : 'rgba(255,255,255,0.62)';
  const secLabel   = isLight ? 'rgba(15,23,42,0.38)'   : 'rgba(255,255,255,0.30)';
  const cardInact  = isLight ? 'rgba(37,99,235,0.04)'  : 'rgba(255,255,255,0.03)';
  const cardBdrIn  = isLight ? 'rgba(37,99,235,0.10)'  : 'rgba(255,255,255,0.08)';
  const eduBg      = isLight ? 'rgba(245,158,11,0.06)' : 'rgba(245,158,11,0.05)';
  const eduBdr     = isLight ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.16)';
  const eduTitle   = isLight ? 'rgba(15,23,42,0.88)'   : 'rgba(255,255,255,0.86)';
  const eduMeta    = isLight ? 'rgba(15,23,42,0.42)'   : 'rgba(255,255,255,0.38)';

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: panelBg }}>
      <div style={{ padding: '28px 32px', maxWidth: 680, margin: '0 auto' }}>

        {/* Header label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
          <span style={{
            padding: '6px 14px', borderRadius: 9,
            fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase', letterSpacing: '0.14em',
            background: headerBadgeBg, border: `1px solid ${headerBadgeBdr}`, color: headerBadgeCol,
          }}>
            SYSTEM UPGRADE HISTORY
          </span>
          <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, rgba(${hexToRgb(theme.accent)},0.35), transparent)` }} />
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 23, top: 0, bottom: 0, width: 1, background: lineColor }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {experiences.map((exp, i) => {
              const accent = ACCENT_COLORS[i] ?? '#2878ff';
              const rgb = hexToRgb(accent);
              const isExpanded = expanded === exp.id;

              return (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}>
                  {/* Year row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', zIndex: 1,
                      background: `rgba(${rgb},0.14)`,
                      border: `2px solid rgba(${rgb},0.40)`,
                      boxShadow: `0 0 22px rgba(${rgb},0.18)`,
                    }}>
                      <Briefcase size={16} color={accent} />
                      {exp.current && (
                        <motion.div style={{
                          position: 'absolute', top: -2, right: -2,
                          width: 12, height: 12, borderRadius: '50%',
                          background: '#10b981',
                          border: isLight ? '2px solid rgba(230,238,255,0.9)' : '2px solid rgba(4,8,20,0.8)',
                        }}
                          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.12em', color: accent }}>
                      {exp.year} — {exp.systemLabel}
                    </div>
                  </div>

                  {/* Card */}
                  <div style={{ marginLeft: 64 }}>
                    <motion.div
                      style={{
                        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                        background: isExpanded ? `rgba(${rgb},0.07)` : cardInact,
                        border: isExpanded ? `1px solid rgba(${rgb},0.25)` : `1px solid ${cardBdrIn}`,
                        transition: 'all 0.25s ease',
                      }}
                      onClick={() => toggle(exp.id)}
                      whileHover={{ background: `rgba(${rgb},0.06)`, borderColor: `rgba(${rgb},0.20)` }}
                    >
                      {/* Card header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: posTitle, fontFamily: "'Space Grotesk', sans-serif" }}>
                              {exp.position}
                            </h3>
                            {exp.current && (
                              <span style={{
                                fontSize: 9, padding: '3px 8px', borderRadius: 20, fontWeight: 700,
                                fontFamily: "'JetBrains Mono', monospace",
                                background: 'rgba(16,185,129,0.14)', color: '#10b981',
                                border: '1px solid rgba(16,185,129,0.28)',
                              }}>
                                CURRENT
                              </span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 11, color: metaColor, fontFamily: "'DM Sans', sans-serif" }}>
                            <span style={{ fontWeight: 600, color: `rgba(${rgb},0.85)` }}>{exp.company}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={10} /> {exp.type}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={10} /> {exp.period}</span>
                          </div>
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ color: chevColor, marginLeft: 12, flexShrink: 0 }}>
                          <ChevronDown size={16} />
                        </motion.div>
                      </div>

                      {/* Expanded body */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}
                          >
                            <div style={{ padding: '20px 20px 22px', borderTop: `1px solid rgba(${rgb},0.13)`, display: 'flex', flexDirection: 'column', gap: 20 }}>
                              <div>
                                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: secLabel, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
                                  Responsibilities
                                </div>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                  {exp.responsibilities.map((r, ri) => (
                                    <motion.li key={ri}
                                      style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: respText, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}
                                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ri * 0.05 }}
                                    >
                                      <Zap size={10} color={accent} style={{ flexShrink: 0, marginTop: 3 }} />
                                      {r}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: secLabel, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>
                                  Technologies
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                  {exp.technologies.map(t => (
                                    <span key={t} style={{
                                      fontSize: 11, padding: '5px 11px', borderRadius: 8, fontWeight: 500,
                                      fontFamily: "'JetBrains Mono', monospace",
                                      background: `rgba(${rgb},0.10)`, border: `1px solid rgba(${rgb},0.22)`, color: accent,
                                    }}>{t}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}

            {/* Education */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1, fontSize: 20,
                  background: 'rgba(245,158,11,0.12)', border: '2px solid rgba(245,158,11,0.30)',
                }}>🎓</div>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(251,191,36,0.75)' }}>
                  2013 — Foundation Module Installed
                </div>
              </div>
              <div style={{ marginLeft: 64 }}>
                <div style={{ borderRadius: 16, padding: '18px 20px', background: eduBg, border: `1px solid ${eduBdr}` }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: eduTitle, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>
                    {education[0].degree}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: eduMeta, fontFamily: "'DM Sans', sans-serif" }}>
                    <span style={{ color: 'rgba(251,191,36,0.80)', fontWeight: 600 }}>{education[0].institution}</span>
                    <span>{education[0].period}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
