import { motion } from 'framer-motion';
import ParticleField from './ParticleField';
import { useTheme } from '../../context/ThemeContext';
import { useDesktop } from '../../context/DesktopContext';

// Static background definitions — images placed in /public/
const STATIC_BACKGROUNDS = {
  back1: { file: '/back1.jpg', scanColor: 'rgba(124,58,237,0.5)', particleR: '109,40,217', particleR2: '37,99,235' },
  back2: { file: '/back2.jpg', scanColor: 'rgba(249,115,22,0.5)',  particleR: '239,68,68',  particleR2: '249,115,22' },
  back3: { file: '/back3.jpg', scanColor: 'rgba(16,185,129,0.5)',  particleR: '16,185,129', particleR2: '13,148,136' },
};

export default function DesktopBackground() {
  const { theme } = useTheme();
  const { background } = useDesktop();
  const r  = theme.accentR;
  const r2 = theme.accentR2;

  // ── Static backgrounds (back1 / back2 / back3) ────────────────────────────
  if (background !== 'animation') {
    const sb = STATIC_BACKGROUNDS[background as keyof typeof STATIC_BACKGROUNDS];
    return (
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0 }}>

        {/* Full-cover wallpaper image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${sb.file})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />

        {/* Dark overlay so OS UI stays readable over any image */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
        }} />

        {/* Particles on top of image */}
        <ParticleField accentRgb={sb.particleR} accent2Rgb={sb.particleR2} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2, pointerEvents: 'none', zIndex: 2,
          background: `linear-gradient(90deg, transparent, ${sb.scanColor}, transparent)`,
          animation: 'scanLine 6s linear infinite',
        }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* HUD corners */}
        {([
          { t: 8,  l: 8,  bt: true,  bb: false, bl: true,  br: false },
          { t: 8,  r: 8,  bt: true,  bb: false, bl: false, br: true  },
          { b: 64, l: 8,  bt: false, bb: true,  bl: true,  br: false },
          { b: 64, r: 8,  bt: false, bb: true,  bl: false, br: true  },
        ] as { t?: number; b?: number; l?: number; r?: number; bt: boolean; bb: boolean; bl: boolean; br: boolean }[]).map((p, i) => (
          <div key={i} style={{
            position: 'absolute', width: 20, height: 20, pointerEvents: 'none', zIndex: 3,
            top: p.t, bottom: p.b, left: p.l, right: p.r,
            borderTop:    p.bt ? `1px solid ${sb.scanColor}` : undefined,
            borderBottom: p.bb ? `1px solid ${sb.scanColor}` : undefined,
            borderLeft:   p.bl ? `1px solid ${sb.scanColor}` : undefined,
            borderRight:  p.br ? `1px solid ${sb.scanColor}` : undefined,
          }} />
        ))}
      </div>
    );
  }

  // ── Animated background (default) ────────────────────────────────────────

  const baseGradient = theme.isLight
    ? `
      radial-gradient(ellipse 120% 80% at 20% 10%, rgba(${r},0.10) 0%, transparent 55%),
      radial-gradient(ellipse 80%  60% at 80% 80%, rgba(${r2},0.08) 0%, transparent 50%),
      linear-gradient(160deg, #dce8ff 0%, #e8f0ff 40%, #d8e4f8 70%, #ccd8f0 100%)
    `
    : `
      radial-gradient(ellipse 120% 80% at 20% 10%, rgba(${r},0.12) 0%, transparent 55%),
      radial-gradient(ellipse 80%  60% at 80% 80%, rgba(${r2},0.10) 0%, transparent 50%),
      radial-gradient(ellipse 60%  40% at 50% 50%, rgba(${r},0.07) 0%, transparent 65%),
      linear-gradient(160deg, ${theme.bg} 0%, ${theme.bgMid} 50%, ${theme.bg} 100%)
    `;

  // Mountain fill colors
  const mtn1 = theme.isLight
    ? `linear-gradient(180deg, transparent 0%, transparent 20%, rgba(${r},0.05) 45%, rgba(195,215,245,0.80) 70%, ${theme.bg} 100%)`
    : `linear-gradient(180deg, transparent 0%, transparent 20%, rgba(${r},0.06) 45%, ${theme.bgMid}cc 70%, ${theme.bg} 100%)`;
  const mtn2 = theme.isLight
    ? `linear-gradient(180deg, transparent 0%, rgba(185,208,240,0.80) 30%, rgba(175,200,235,0.95) 70%, ${theme.bg} 100%)`
    : `linear-gradient(180deg, transparent 0%, ${theme.bgMid}b3 30%, ${theme.bg}f2 70%, ${theme.bg} 100%)`;

  // Vignette: subtle for light, strong for dark
  const vignette = theme.isLight
    ? 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(180,200,230,0.25) 100%)'
    : 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)';

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0 }}>

      {/* Base */}
      <div style={{ position: 'absolute', inset: 0, background: baseGradient }} />

      {/* Sky glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '15%', right: '15%', height: '55%',
        background: `radial-gradient(ellipse, rgba(${r},0.18) 0%, rgba(${r},0.06) 50%, transparent 75%)`,
        filter: 'blur(45px)',
      }} />

      {/* Horizon glow */}
      <div style={{
        position: 'absolute', top: '35%', left: 0, right: 0, height: '30%',
        background: `linear-gradient(180deg, transparent 0%, rgba(${r},0.07) 40%, rgba(${r},0.11) 70%, transparent 100%)`,
        filter: 'blur(32px)',
      }} />

      {/* Left accent glow */}
      <motion.div
        style={{
          position: 'absolute', top: '10%', left: '-5%', width: '35%', height: '50%',
          background: `radial-gradient(ellipse, rgba(${r},0.12) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Right accent glow */}
      <motion.div
        style={{
          position: 'absolute', bottom: '5%', right: '-5%', width: '40%', height: '45%',
          background: `radial-gradient(ellipse, rgba(${r2},0.10) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Far mountains */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
        background: mtn1,
        clipPath: `polygon(
          0% 100%, 0% 65%,
          5% 60%, 10% 52%, 14% 55%, 18% 44%,
          22% 48%, 26% 38%, 30% 42%, 34% 30%,
          37% 34%, 40% 25%, 43% 28%, 46% 20%,
          49% 22%, 52% 15%, 55% 18%, 58% 25%,
          61% 20%, 64% 30%, 68% 22%, 72% 35%,
          76% 28%, 80% 40%, 84% 32%, 88% 45%,
          92% 38%, 96% 50%, 100% 45%, 100% 100%
        )`,
        filter: 'blur(1px)',
      }} />

      {/* Near mountains */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: mtn2,
        clipPath: `polygon(
          0% 100%, 0% 80%,
          4% 72%, 8% 65%, 12% 70%, 16% 58%,
          20% 62%, 24% 50%, 28% 55%, 32% 42%,
          35% 46%, 38% 35%, 42% 40%, 46% 28%,
          50% 32%, 54% 22%, 57% 26%, 60% 18%,
          63% 22%, 66% 32%, 70% 26%, 74% 38%,
          78% 30%, 82% 42%, 86% 35%, 90% 48%,
          94% 42%, 97% 55%, 100% 50%, 100% 100%
        )`,
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(${r},0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(${r},0.022) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
      }} />

      {/* Particles */}
      <ParticleField accentRgb={r} accent2Rgb={r2} />

      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        pointerEvents: 'none', zIndex: 2,
        background: `linear-gradient(90deg, transparent, rgba(${r},0.45), transparent)`,
        animation: 'scanLine 6s linear infinite',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 2,
        background: vignette,
      }} />

      {/* Corner HUD marks */}
      {([
        { t: 8,  l: 8,  bt: true,  bb: false, bl: true,  br: false },
        { t: 8,  r: 8,  bt: true,  bb: false, bl: false, br: true  },
        { b: 64, l: 8,  bt: false, bb: true,  bl: true,  br: false },
        { b: 64, r: 8,  bt: false, bb: true,  bl: false, br: true  },
      ] as { t?: number; b?: number; l?: number; r?: number; bt: boolean; bb: boolean; bl: boolean; br: boolean }[]).map((p, i) => (
        <div key={i} style={{
          position: 'absolute', width: 20, height: 20,
          pointerEvents: 'none', zIndex: 3,
          top:    p.t !== undefined ? p.t : undefined,
          bottom: p.b !== undefined ? p.b : undefined,
          left:   p.l !== undefined ? p.l : undefined,
          right:  p.r !== undefined ? p.r : undefined,
          borderTop:    p.bt ? `1px solid rgba(${r},0.35)` : undefined,
          borderBottom: p.bb ? `1px solid rgba(${r},0.35)` : undefined,
          borderLeft:   p.bl ? `1px solid rgba(${r},0.35)` : undefined,
          borderRight:  p.br ? `1px solid rgba(${r},0.35)` : undefined,
        }} />
      ))}
    </div>
  );
}
