import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  life: number; maxLife: number;
  color: string;
}

interface ParticleFieldProps {
  accentRgb: string;  // "r,g,b" format, e.g. "40,120,255"
  accent2Rgb: string;
}

export default function ParticleField({ accentRgb, accent2Rgb }: ParticleFieldProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef      = useRef<number>(0);
  // Keep a live ref to the colors so the draw loop always uses the latest theme
  const colorsRef    = useRef<string[]>([]);

  // Rebuild the color palette whenever the theme changes
  useEffect(() => {
    colorsRef.current = [
      `rgba(${accentRgb},`,
      `rgba(${accent2Rgb},`,
      `rgba(${accentRgb},`,      // weight accent more
      `rgba(${accent2Rgb},`,
    ];
    // Also repaint existing particles with new colours
    particlesRef.current.forEach(p => {
      p.color = colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)];
    });
  }, [accentRgb, accent2Rgb]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (): Particle => {
      const colors = colorsRef.current.length
        ? colorsRef.current
        : [`rgba(${accentRgb},`];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        size: Math.random() * 2.5 + 0.5,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < 80; i++) {
      const p = spawnParticle();
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.2
          ? progress / 0.2
          : progress > 0.8
          ? (1 - progress) / 0.2
          : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(p.opacity * 0.7).toFixed(2)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(p.opacity * 0.14).toFixed(2)})`;
        ctx.fill();

        if (p.life >= p.maxLife) particlesRef.current[i] = spawnParticle();
      });

      // Connections
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.11 * Math.min(pts[i].opacity, pts[j].opacity);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${accentRgb},${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      particlesRef.current = [];
    };
  // Only run once — color changes are handled via colorsRef
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
}
