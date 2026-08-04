import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Tag, ChevronRight, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';

const CATEGORY_COLORS: Record<string, string> = {
  'AI / LLM':             '#06b6d4',
  'Full Stack':           '#2878ff',
  'AI / Computer Vision': '#10b981',
  'AI Agents':            '#7c3aed',
  'Frontend':             '#f59e0b',
  'Developer Tools':      '#ec4899',
};

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}

export default function BlogCenter() {
  const { theme } = useTheme();
  const isLight = theme.isLight;
  const [reading, setReading] = useState<string | null>(null);
  const [filter, setFilter]   = useState<string | null>(null);

  const post       = blogPosts.find(p => p.id === reading);
  const categories = Array.from(new Set(blogPosts.map(p => p.category)));
  const filtered   = filter ? blogPosts.filter(p => p.category === filter) : blogPosts;

  // Adaptive palette
  const panelBg    = isLight ? 'rgba(240,245,255,0.50)' : 'rgba(4,8,20,0.40)';
  const headerBg   = isLight ? 'rgba(230,238,255,0.70)' : 'rgba(4,8,20,0.55)';
  const headerBdr  = isLight ? 'rgba(37,99,235,0.10)'   : 'rgba(255,255,255,0.07)';
  const titleLabel = isLight ? 'rgba(15,23,42,0.50)'    : 'rgba(255,255,255,0.45)';
  const cardBg     = isLight ? 'rgba(37,99,235,0.04)'   : 'rgba(255,255,255,0.03)';
  const cardBdr    = isLight ? 'rgba(37,99,235,0.09)'   : 'rgba(255,255,255,0.08)';
  const cardTitle  = isLight ? 'rgba(15,23,42,0.90)'    : 'rgba(255,255,255,0.88)';
  const cardExcerp = isLight ? 'rgba(15,23,42,0.55)'    : 'rgba(255,255,255,0.40)';
  const cardMeta   = isLight ? 'rgba(15,23,42,0.38)'    : 'rgba(255,255,255,0.28)';
  const backBtn    = isLight ? 'rgba(15,23,42,0.40)'    : 'rgba(255,255,255,0.40)';
  const backHover  = isLight ? 'rgba(15,23,42,0.75)'    : 'rgba(255,255,255,0.72)';
  const artTitle   = isLight ? 'rgba(15,23,42,0.95)'    : 'rgba(255,255,255,0.96)';
  const artSub     = isLight ? 'rgba(15,23,42,0.48)'    : 'rgba(255,255,255,0.42)';
  const artMeta    = isLight ? 'rgba(15,23,42,0.38)'    : 'rgba(255,255,255,0.28)';
  const excerptBg  = isLight ? 'rgba(37,99,235,0.04)'   : 'rgba(255,255,255,0.03)';
  const excerptBdr = isLight ? 'rgba(37,99,235,0.10)'   : 'rgba(255,255,255,0.08)';
  const excerptTxt = isLight ? 'rgba(15,23,42,0.72)'    : 'rgba(255,255,255,0.65)';
  const soonTxt    = isLight ? 'rgba(15,23,42,0.45)'    : 'rgba(255,255,255,0.38)';
  const tagBg      = isLight ? 'rgba(37,99,235,0.06)'   : 'rgba(255,255,255,0.05)';
  const tagBdr     = isLight ? 'rgba(37,99,235,0.12)'   : 'rgba(255,255,255,0.09)';
  const tagColor   = isLight ? 'rgba(15,23,42,0.50)'    : 'rgba(255,255,255,0.38)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: panelBg }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px', flexShrink: 0,
        borderBottom: `1px solid ${headerBdr}`,
        background: headerBg, gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={14} color="rgba(251,113,133,0.75)" />
          <span style={{ fontSize: 11, fontWeight: 700, color: titleLabel, textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: "'Space Grotesk', sans-serif" }}>
            Knowledge Center
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <FilterChip label="All" active={!filter} accent="#f43f5e" onClick={() => setFilter(null)} isLight={isLight} />
          {categories.map(c => (
            <FilterChip key={c} label={c.replace('AI / ', '')} active={filter === c} accent={CATEGORY_COLORS[c] ?? '#2878ff'}
              onClick={() => setFilter(c === filter ? null : c)} isLight={isLight} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {reading && post ? (
            <motion.div key="reading" style={{ padding: '28px 32px', maxWidth: 680, margin: '0 auto' }}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>
              <button onClick={() => setReading(null)} style={{
                display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: backBtn,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                marginBottom: 24, fontFamily: "'DM Sans', sans-serif", transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = backHover)}
                onMouseLeave={e => (e.currentTarget.style.color = backBtn)}
              >
                <ArrowLeft size={13} /> Back to articles
              </button>

              <span style={{
                display: 'inline-block', fontSize: 10, padding: '5px 12px', borderRadius: 8, fontWeight: 600, marginBottom: 18,
                fontFamily: "'JetBrains Mono', monospace",
                background: `rgba(${hexToRgb(CATEGORY_COLORS[post.category] ?? '#2878ff')},0.14)`,
                color: CATEGORY_COLORS[post.category] ?? '#2878ff',
                border: `1px solid rgba(${hexToRgb(CATEGORY_COLORS[post.category] ?? '#2878ff')},0.26)`,
              }}>{post.category}</span>

              <h1 style={{ fontSize: 22, fontWeight: 800, color: artTitle, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2, marginBottom: 10 }}>
                {post.title}
              </h1>
              <p style={{ fontSize: 13, color: artSub, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>{post.subtitle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 11, color: artMeta, fontFamily: "'JetBrains Mono', monospace", marginBottom: 28 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={11} /> {post.readTime}</span>
                <span>{post.date}</span>
              </div>
              <div style={{ borderRadius: 16, padding: '20px 22px', marginBottom: 22, background: excerptBg, border: `1px solid ${excerptBdr}` }}>
                <p style={{ fontSize: 13, color: excerptTxt, lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>{post.excerpt}</p>
              </div>
              <div style={{
                borderRadius: 16, padding: '22px', textAlign: 'center', marginBottom: 22,
                background: `rgba(${hexToRgb(CATEGORY_COLORS[post.category] ?? '#2878ff')},0.05)`,
                border: `1px dashed rgba(${hexToRgb(CATEGORY_COLORS[post.category] ?? '#2878ff')},0.22)`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>✍️</div>
                <p style={{ fontSize: 12, color: soonTxt, fontFamily: "'DM Sans', sans-serif" }}>Full article coming soon. Stay tuned.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {post.tags.map(t => (
                  <span key={t} style={{
                    display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, padding: '5px 11px', borderRadius: 20,
                    background: tagBg, border: `1px solid ${tagBdr}`, color: tagColor,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    <Tag size={9} /> {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="grid" style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {filtered.map((p, i) => {
                const accent = CATEGORY_COLORS[p.category] ?? '#2878ff';
                const rgb    = hexToRgb(accent);
                return (
                  <motion.div key={p.id}
                    style={{ borderRadius: 16, padding: '18px 18px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, background: cardBg, border: `1px solid ${cardBdr}`, transition: 'all 0.2s' }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    whileHover={{ background: `rgba(${rgb},0.07)`, borderColor: `rgba(${rgb},0.22)`, y: -2 }}
                    onClick={() => setReading(p.id)}
                  >
                    <span style={{
                      alignSelf: 'flex-start', fontSize: 9, padding: '4px 9px', borderRadius: 7, fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: `rgba(${rgb},0.13)`, color: accent, border: `1px solid rgba(${rgb},0.24)`,
                    }}>{p.category}</span>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: cardTitle, lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontSize: 11, color: cardExcerp, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif",
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1,
                    }}>{p.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 10, color: cardMeta, fontFamily: "'JetBrains Mono', monospace" }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={9} /> {p.readTime}</span>
                        <span>{p.date}</span>
                      </div>
                      <ChevronRight size={12} color={isLight ? 'rgba(15,23,42,0.25)' : 'rgba(255,255,255,0.22)'} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FilterChip({ label, active, accent, onClick, isLight }: { label: string; active: boolean; accent: string; onClick: () => void; isLight: boolean }) {
  const rgb = hexToRgb(accent);
  return (
    <button onClick={onClick} style={{
      fontSize: 10, padding: '5px 11px', borderRadius: 8, cursor: 'pointer', border: 'none',
      fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      background: active ? `rgba(${rgb},0.15)` : (isLight ? 'rgba(37,99,235,0.06)' : 'rgba(255,255,255,0.05)'),
      outline: active ? `1px solid rgba(${rgb},0.32)` : `1px solid ${isLight ? 'rgba(37,99,235,0.10)' : 'rgba(255,255,255,0.09)'}`,
      color: active ? accent : (isLight ? 'rgba(15,23,42,0.45)' : 'rgba(255,255,255,0.35)'),
      transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );
}
