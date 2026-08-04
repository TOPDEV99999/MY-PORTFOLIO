import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Folder, ChevronRight, Tag, Calendar, Layers, Cpu, Users, Sparkles, GitBranch, ExternalLink } from 'lucide-react';
import { projects } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';

const CATEGORY_COLORS: Record<string, string> = {
  'AI / Enterprise':       '#2878ff',
  'AI / HR Tech':          '#7c3aed',
  'AI / Healthcare':       '#10b981',
  'AI / Developer Tools':  '#f59e0b',
  'AI / E-commerce':       '#ec4899',
  'AI / Computer Vision':  '#06b6d4',
};

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}

export default function ProjectExplorer() {
  const { theme } = useTheme();
  const isLight = theme.isLight;
  const [selected, setSelected] = useState(projects[0].id);
  const selectedProject = projects.find(p => p.id === selected)!;

  // Adaptive palette
  const panelBg     = isLight ? 'rgba(240,245,255,0.50)' : 'rgba(4,8,20,0.40)';
  const sidebarBg   = isLight ? 'rgba(230,238,255,0.70)' : 'rgba(4,8,20,0.55)';
  const sidebarBdr  = isLight ? 'rgba(37,99,235,0.12)'   : 'rgba(255,255,255,0.07)';
  const headerBdr   = isLight ? 'rgba(37,99,235,0.10)'   : 'rgba(255,255,255,0.06)';
  const labelColor  = isLight ? 'rgba(15,23,42,0.50)'    : 'rgba(255,255,255,0.45)';
  const countBg     = isLight ? 'rgba(37,99,235,0.08)'   : 'rgba(255,255,255,0.06)';
  const countColor  = isLight ? 'rgba(15,23,42,0.40)'    : 'rgba(255,255,255,0.25)';
  const nameActive  = isLight ? 'rgba(15,23,42,0.92)'    : 'rgba(255,255,255,0.92)';
  const nameInact   = isLight ? 'rgba(15,23,42,0.55)'    : 'rgba(255,255,255,0.52)';
  const dateColor   = isLight ? 'rgba(15,23,42,0.35)'    : 'rgba(255,255,255,0.28)';
  const titleColor  = isLight ? 'rgba(15,23,42,0.95)'    : 'rgba(255,255,255,0.95)';
  const subtitleCol = isLight ? 'rgba(15,23,42,0.45)'    : 'rgba(255,255,255,0.42)';
  const metaColor   = isLight ? 'rgba(15,23,42,0.40)'    : 'rgba(255,255,255,0.35)';
  const dividerCol  = isLight ? 'rgba(15,23,42,0.08)'    : 'rgba(255,255,255,0.07)';
  const sectionIcon = isLight ? 'rgba(15,23,42,0.35)'    : 'rgba(148,163,184,0.55)';
  const sectionLbl  = isLight ? 'rgba(15,23,42,0.40)'    : 'rgba(255,255,255,0.32)';
  const bodyText    = isLight ? 'rgba(15,23,42,0.72)'    : 'rgba(255,255,255,0.65)';
  const bodyText2   = isLight ? 'rgba(15,23,42,0.65)'    : 'rgba(255,255,255,0.60)';
  const featureText = isLight ? 'rgba(15,23,42,0.68)'    : 'rgba(255,255,255,0.62)';
  const problemBg   = isLight ? 'rgba(37,99,235,0.05)'   : 'rgba(40,120,255,0.06)';
  const problemBdr  = isLight ? 'rgba(37,99,235,0.12)'   : 'rgba(40,120,255,0.13)';

  const accent    = CATEGORY_COLORS[selectedProject.category] ?? '#2878ff';
  const accentRgb = hexToRgb(accent);

  return (
    <div style={{ display: 'flex', height: '100%', background: panelBg }}>

      {/* ── Sidebar ──────────────────────────── */}
      <div style={{
        width: 220, flexShrink: 0,
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
        borderRight: `1px solid ${sidebarBdr}`,
        background: sidebarBg,
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: `1px solid ${headerBdr}`,
          flexShrink: 0,
        }}>
          <FolderOpen size={13} color="rgba(251,191,36,0.7)" />
          <span style={{
            fontSize: 11, fontWeight: 700, color: labelColor,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Projects
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: 10, fontWeight: 600,
            color: countColor, background: countBg,
            padding: '2px 7px', borderRadius: 6,
          }}>
            {projects.length}
          </span>
        </div>

        {/* List */}
        <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {projects.map(p => {
            const pAccent = CATEGORY_COLORS[p.category] ?? '#2878ff';
            const pRgb    = hexToRgb(pAccent);
            const isActive = selected === p.id;
            return (
              <motion.button
                key={p.id}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: isActive ? `rgba(${pRgb},0.13)` : 'transparent',
                  outline: isActive ? `1px solid rgba(${pRgb},0.27)` : '1px solid transparent',
                  transition: 'all 0.18s',
                }}
                onClick={() => setSelected(p.id)}
                whileHover={{ background: `rgba(${pRgb},0.08)` }}
              >
                {isActive
                  ? <FolderOpen size={14} style={{ color: pAccent, flexShrink: 0 }} />
                  : <Folder size={14} style={{ color: isLight ? 'rgba(15,23,42,0.30)' : 'rgba(255,255,255,0.28)', flexShrink: 0 }} />
                }
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: 12, fontWeight: 600,
                    color: isActive ? nameActive : nameInact,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    fontFamily: "'DM Sans', sans-serif", marginBottom: 2,
                  }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 10, color: dateColor, fontFamily: "'JetBrains Mono', monospace" }}>
                    {p.period.split('–')[1]?.trim()}
                  </div>
                </div>
                {isActive && <ChevronRight size={10} style={{ color: pAccent, marginLeft: 'auto', flexShrink: 0 }} />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Main panel ───────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
          >
            {/* ── Preview image ── */}
            <div style={{
              width: '100%',
              aspectRatio: '16 / 7',
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.04)',
              border: `1px solid rgba(${accentRgb},0.18)`,
              flexShrink: 0,
            }}>
              {selectedProject.image ? (
                <img
                  key={selectedProject.id}
                  src={selectedProject.image}
                  alt={`${selectedProject.name} preview`}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
              ) : (
                /* Placeholder when no image is set yet */
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: `linear-gradient(135deg, rgba(${accentRgb},0.08) 0%, rgba(${accentRgb},0.03) 100%)`,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `rgba(${accentRgb},0.14)`,
                    border: `1px solid rgba(${accentRgb},0.25)`,
                  }}>
                    <Layers size={20} color={accent} />
                  </div>
                  <span style={{
                    fontSize: 11, color: isLight ? 'rgba(15,23,42,0.35)' : 'rgba(255,255,255,0.28)',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.08em',
                  }}>
                    No preview available
                  </span>
                </div>
              )}

              {/* Category badge overlay */}
              <div style={{
                position: 'absolute', top: 10, right: 10,
                fontSize: 10, padding: '4px 10px', borderRadius: 7, fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                background: `rgba(${accentRgb},0.80)`,
                backdropFilter: 'blur(8px)',
                color: 'white',
                border: `1px solid rgba(${accentRgb},0.50)`,
              }}>
                {selectedProject.category}
              </div>
            </div>

            {/* Title */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: titleColor, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2, marginBottom: 6 }}>
                    {selectedProject.name}
                  </h2>
                  <p style={{ fontSize: 12, color: subtitleCol, fontFamily: "'DM Sans', sans-serif" }}>
                    {selectedProject.subtitle}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 11, color: metaColor, fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={11} /> {selectedProject.period}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Users size={11} /> {selectedProject.role}</span>
              </div>

              {/* Live + GitHub buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                {selectedProject.links.live ? (
                  <motion.a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '7px 16px', borderRadius: 10, textDecoration: 'none',
                      fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                      color: 'white',
                      background: `linear-gradient(135deg, ${accent}, rgba(${accentRgb},0.75))`,
                      border: `1px solid rgba(${accentRgb},0.45)`,
                      boxShadow: `0 2px 14px rgba(${accentRgb},0.30)`,
                    }}
                    whileHover={{ scale: 1.04, boxShadow: `0 4px 20px rgba(${accentRgb},0.50)` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink size={13} /> Live Demo
                  </motion.a>
                ) : (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 16px', borderRadius: 10,
                    fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                    color: isLight ? 'rgba(15,23,42,0.30)' : 'rgba(255,255,255,0.22)',
                    background: isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
                    cursor: 'default',
                  }}>
                    <ExternalLink size={13} /> Live Demo
                  </span>
                )}

                {selectedProject.links.github ? (
                  <motion.a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '7px 16px', borderRadius: 10, textDecoration: 'none',
                      fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                      color: isLight ? 'rgba(15,23,42,0.82)' : 'rgba(255,255,255,0.85)',
                      background: isLight ? 'rgba(15,23,42,0.07)' : 'rgba(255,255,255,0.07)',
                      border: `1px solid ${isLight ? 'rgba(15,23,42,0.14)' : 'rgba(255,255,255,0.14)'}`,
                    }}
                    whileHover={{
                      background: isLight ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.12)',
                      scale: 1.04,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GitBranch size={13} /> GitHub
                  </motion.a>
                ) : (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 16px', borderRadius: 10,
                    fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                    color: isLight ? 'rgba(15,23,42,0.30)' : 'rgba(255,255,255,0.22)',
                    background: isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
                    cursor: 'default',
                  }}>
                    <GitBranch size={13} /> GitHub
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: dividerCol }} />

            {/* Overview */}
            <div>
              <SLabel icon={<Layers size={12} />} iconColor={sectionIcon} textColor={sectionLbl}>Overview</SLabel>
              <p style={{ fontSize: 13, color: bodyText, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                {selectedProject.description}
              </p>
            </div>

            {/* Problem */}
            <div style={{ borderRadius: 14, padding: '18px 20px', background: problemBg, border: `1px solid ${problemBdr}` }}>
              <SLabel icon={<Cpu size={12} />} iconColor={sectionIcon} textColor={sectionLbl}>Problem Solved</SLabel>
              <p style={{ fontSize: 13, color: bodyText2, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                {selectedProject.problem}
              </p>
            </div>

            {/* Features */}
            <div>
              <SLabel icon={<Sparkles size={12} />} iconColor={sectionIcon} textColor={sectionLbl}>Key Features</SLabel>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedProject.features.map((f, i) => (
                  <motion.li
                    key={i}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: featureText, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 6, background: accent, boxShadow: `0 0 6px ${accent}` }} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <SLabel icon={<Tag size={12} />} iconColor={sectionIcon} textColor={sectionLbl}>Technologies</SLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedProject.technologies.map(t => (
                  <span
                    key={t}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '4px 10px', borderRadius: 7,
                      fontSize: 11, fontWeight: 500,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: `rgba(${accentRgb},0.10)`,
                      border: `1px solid rgba(${accentRgb},0.22)`,
                      color: accent,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SLabel({ icon, iconColor, textColor, children }: { icon: React.ReactNode; iconColor: string; textColor: string; children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
      <span style={{ color: iconColor, display: 'flex' }}>{icon}</span>
      <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: textColor, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
        {children}
      </span>
    </div>
  );
}
