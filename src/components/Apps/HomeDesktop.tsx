import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Cpu, Wifi, ShieldCheck, Bot, Send, Sparkles,
  FolderOpen, Brain, ScrollText, CalendarDays,
  Mail, MapPin, ExternalLink, Zap, ChevronRight,
} from 'lucide-react';
import { profile, novaKnowledge } from '../../data/resume';
import { useWindowManager, type AppId } from '../../context/WindowManager';
import { useTheme } from '../../context/ThemeContext';

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '40,120,255';
}

interface Intent { patterns: string[]; response: string; }
function quickReply(input: string): string {
  const lower = input.toLowerCase();
  for (const intent of novaKnowledge.intents as Intent[]) {
    if (intent.patterns.some(p => lower.includes(p))) {
      return intent.response.replace(/\*\*/g,'').replace(/`/g,'').split('\n').slice(0,5).join('\n');
    }
  }
  return "I don't have specific data on that. Try asking about Daniel's projects, skills, or how to contact him.";
}

interface ChatMsg { id: string; role: 'user'|'nova'; text: string; }

const QUICK_APPS: { id: AppId; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'projects',   label: 'Projects',   icon: <FolderOpen size={15} />,   color: '#f59e0b' },
  { id: 'skills',     label: 'Skills',     icon: <Brain size={15} />,        color: '#7c3aed' },
  { id: 'experience', label: 'Experience', icon: <ScrollText size={15} />,   color: '#10b981' },
  { id: 'meeting',    label: 'Meeting',    icon: <CalendarDays size={15} />, color: '#8b5cf6' },
];

const TIMELINE_STEPS = [
  { label: 'Intelligent\nexperiences', active: true  },
  { label: 'Autonomous\nagents',       active: false },
  { label: 'Adaptive\nenterprise',     active: false },
];

const SUGGESTED = [
  'Who is Daniel?',
  'What projects has he built?',
  'What are his skills?',
  'How can I hire him?',
];

export default function HomeDesktop() {
  const { openApp } = useWindowManager();
  const { theme } = useTheme();
  const isLight = theme.isLight;
  const [booted, setBooted] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(() => setBooted(true), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const send = (text: string) => {
    const q = text.trim(); if (!q) return;
    setMsgs(p => [...p, { id: Date.now().toString(), role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs(p => [...p, { id: (Date.now()+1).toString(), role: 'nova', text: quickReply(q) }]);
      setTyping(false);
    }, 650 + Math.random() * 400);
  };

  const R        = hexToRgb(theme.accent);
  const panelBg  = isLight ? 'rgba(255,255,255,0.58)' : 'rgba(8,14,32,0.64)';
  const panelBdr = isLight ? 'rgba(37,99,235,0.16)'   : 'rgba(255,255,255,0.09)';
  const textMain = isLight ? 'rgba(15,23,42,0.92)'    : 'rgba(255,255,255,0.94)';
  const textMut  = isLight ? 'rgba(15,23,42,0.52)'    : 'rgba(255,255,255,0.45)';
  const textDim  = isLight ? 'rgba(15,23,42,0.34)'    : 'rgba(255,255,255,0.30)';
  const lineCol  = isLight ? `rgba(${R},0.28)`         : `rgba(${R},0.32)`;

  const sysCards = [
    { label: 'Identity',  title: profile.name.split(' ')[0], sub: 'Context-aware developer', status: 'Verified',    icon: <Cpu size={16} />,        accent: '#2878ff', sc: '#10b981' },
    { label: 'Network',   title: 'Online',                    sub: 'Secure by default',       status: 'Connected',   icon: <Wifi size={16} />,       accent: '#06b6d4', sc: '#10b981' },
    { label: 'Security',  title: 'Clean Architecture',        sub: 'Protected & proactive',   status: 'No threats',  icon: <ShieldCheck size={16} />, accent: '#10b981', sc: '#10b981' },
  ];

  if (!booted) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'grid',
      gridTemplateColumns: '290px 1fr 310px',
      gridTemplateRows: 'auto 1fr auto',
      padding: '44px 52px 20px',  // generous inset from edges
      gap: 0,
      pointerEvents: 'none',
      userSelect: 'none',
    }}>

      {/* ── TOP LEFT: Tagline ── */}
      <motion.div style={{ gridColumn: 1, gridRow: 1, paddingBottom: 22 }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <div style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, lineHeight: 1.14, color: textMain }}>
          {profile.tagline.split('\n').map((l, i) => <div key={i}>{l}</div>)}
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: textMut, fontFamily: "'DM Sans', sans-serif" }}>
          {profile.title} · {profile.location}
        </div>
      </motion.div>

      <div style={{ gridColumn: 2, gridRow: 1 }} />

      {/* ── TOP RIGHT: Timeline ── */}
      <motion.div style={{ gridColumn: 3, gridRow: 1, paddingBottom: 22, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <div style={{ fontSize: 11, color: textMut, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Our journey
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: textMain, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>
          Mid-2026
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
          {TIMELINE_STEPS.map((step, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {i < TIMELINE_STEPS.length - 1 && (
                <div style={{ position: 'absolute', top: 7, left: '50%', right: '-50%', height: 2, background: step.active ? `linear-gradient(90deg,${theme.accent},rgba(${R},0.25))` : `rgba(${R},0.14)`, zIndex: 0 }} />
              )}
              <motion.div style={{
                width: 16, height: 16, borderRadius: '50%', zIndex: 1, flexShrink: 0,
                background: step.active ? theme.accent : (isLight ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.12)'),
                border: `2px solid ${step.active ? theme.accent : (isLight ? 'rgba(15,23,42,0.20)' : 'rgba(255,255,255,0.22)')}`,
              }}
                animate={step.active ? { boxShadow: [`0 0 8px rgba(${R},0.5)`,`0 0 18px rgba(${R},0.8)`,`0 0 8px rgba(${R},0.5)`] } : {}}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div style={{ marginTop: 9, fontSize: 11, textAlign: 'center', lineHeight: 1.35, fontFamily: "'DM Sans', sans-serif", color: step.active ? textMain : textDim, fontWeight: step.active ? 600 : 400, whiteSpace: 'pre-line' }}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── LEFT: System cards ── */}
      <motion.div style={{ gridColumn: 1, gridRow: 2, display: 'flex', flexDirection: 'column', gap: 14, paddingRight: 24, position: 'relative', justifyContent: 'center' }}
        initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
        {sysCards.map((card, i) => (
          <motion.div key={card.label}
            style={{ position: 'relative', padding: '16px 18px', borderRadius: 18, background: panelBg, backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)', border: `1px solid ${panelBdr}`, boxShadow: `0 4px 20px rgba(0,0,0,${isLight?'0.08':'0.28'})`, pointerEvents: 'auto' }}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }}
            whileHover={{ borderColor: `rgba(${hexToRgb(card.accent)},0.42)`, boxShadow: `0 6px 28px rgba(0,0,0,0.2),0 0 20px rgba(${hexToRgb(card.accent)},0.16)` }}>
            {/* Dashed connector → */}
            <svg style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)', overflow: 'visible', pointerEvents: 'none', zIndex: 2 }} width="24" height="2">
              <line x1="0" y1="1" x2="24" y2="1" stroke={lineCol} strokeWidth="1.5" strokeDasharray="3 2.5" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${hexToRgb(card.accent)},0.14)`, border: `1px solid rgba(${hexToRgb(card.accent)},0.28)` }}>
                <span style={{ color: card.accent }}>{card.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: textMain, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>{card.label}</div>
                <div style={{ fontSize: 12, color: textMut, fontFamily: "'DM Sans', sans-serif", marginBottom: 5 }}>{card.sub}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <motion.div style={{ width: 7, height: 7, borderRadius: '50%', background: card.sc, boxShadow: `0 0 6px ${card.sc}` }} animate={{ opacity: [1,0.35,1] }} transition={{ duration: 2.2, repeat: Infinity, delay: i*0.5 }} />
                  <span style={{ fontSize: 11, color: card.sc, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{card.status}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Contact links */}
        <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 7, paddingTop: 6, pointerEvents: 'auto' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          {[
            { icon: <Mail size={12} />, text: profile.email, href: `mailto:${profile.email}` },
            { icon: <MapPin size={12} />, text: profile.location, href: null },
            { icon: <ExternalLink size={12} />, text: profile.githubHandle, href: profile.github },
          ].map((item, i) => (
            item.href
              ? <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: textDim, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.color = theme.accent)} onMouseLeave={e => (e.currentTarget.style.color = textDim)}>{item.icon}{item.text}</a>
              : <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: textDim, fontFamily: "'DM Sans', sans-serif" }}>{item.icon}{item.text}</span>
          ))}
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'rgba(74,222,128,0.80)', fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
            <Zap size={12} /> {profile.availability}
          </span>
        </motion.div>
      </motion.div>

      {/* ── CENTER: Full ChatGPT-style chatbot ── */}
      <motion.div style={{
        gridColumn: 2, gridRow: 2,
        display: 'flex', flexDirection: 'column',
        paddingLeft: 20, paddingRight: 20,
        pointerEvents: 'auto',
        minHeight: 0,
      }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>

        {/* Messages or welcome */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: msgs.length === 0 ? 'center' : 'flex-end', gap: 14, paddingBottom: 12 }}>
          {msgs.length === 0 ? (
            /* Welcome */
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <motion.div style={{ width: 56, height: 56, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#06b6d4,#2878ff)', boxShadow: '0 0 24px rgba(6,182,212,0.50)' }}
                animate={{ boxShadow: ['0 0 18px rgba(6,182,212,0.45)','0 0 34px rgba(6,182,212,0.75)','0 0 18px rgba(6,182,212,0.45)'] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <Bot size={24} color="white" />
              </motion.div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: textMain, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  Ask Nova <Sparkles size={14} color="#67e8f9" />
                </div>
                <div style={{ fontSize: 13, color: textMut, fontFamily: "'DM Sans', sans-serif" }}>
                  Daniel's personal AI assistant — ask me anything
                </div>
              </div>
              {/* Suggestion chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 420 }}>
                {SUGGESTED.map(s => (
                  <motion.button key={s} onClick={() => send(s)}
                    style={{ fontSize: 12, padding: '8px 16px', borderRadius: 20, cursor: 'pointer', background: isLight?'rgba(6,182,212,0.07)':'rgba(6,182,212,0.08)', border: `1px solid ${isLight?'rgba(6,182,212,0.20)':'rgba(6,182,212,0.18)'}`, color: isLight?'rgba(0,140,120,0.85)':'rgba(103,232,249,0.75)', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.14s' }}
                    whileHover={{ scale: 1.04, background: isLight?'rgba(6,182,212,0.13)':'rgba(6,182,212,0.14)' }}
                    whileTap={{ scale: 0.96 }}>
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            msgs.map(msg => {
              const isNova = msg.role === 'nova';
              return (
                <motion.div key={msg.id} style={{ display: 'flex', gap: 10, flexDirection: isNova ? 'row' : 'row-reverse', maxWidth: '85%', alignSelf: isNova ? 'flex-start' : 'flex-end' }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  {isNova && (
                    <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#06b6d4,#2878ff)', boxShadow: '0 0 10px rgba(6,182,212,0.35)', marginTop: 2 }}>
                      <Bot size={14} color="white" />
                    </div>
                  )}
                  <div style={{ padding: '11px 15px', borderRadius: isNova ? '4px 16px 16px 16px' : '16px 4px 16px 16px', fontSize: 13, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", color: textMain, whiteSpace: 'pre-line', background: isNova ? (isLight?'rgba(6,182,212,0.07)':'rgba(6,182,212,0.09)') : (isLight?'rgba(37,99,235,0.09)':'rgba(40,120,255,0.11)'), border: `1px solid ${isNova ? (isLight?'rgba(6,182,212,0.18)':'rgba(6,182,212,0.20)') : (isLight?'rgba(37,99,235,0.18)':'rgba(40,120,255,0.20)')}` }}>
                    {msg.text}
                  </div>
                </motion.div>
              );
            })
          )}

          {/* Typing indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#06b6d4,#2878ff)' }}>
                  <Bot size={14} color="white" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '11px 15px', borderRadius: '4px 16px 16px 16px', background: isLight?'rgba(6,182,212,0.07)':'rgba(6,182,212,0.09)', border: `1px solid ${isLight?'rgba(6,182,212,0.18)':'rgba(6,182,212,0.20)'}` }}>
                  {[0,1,2].map(i => <motion.div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: isLight?'rgba(6,182,212,0.55)':'rgba(103,232,249,0.60)' }} animate={{ y:[0,-5,0] }} transition={{ duration: 0.55, repeat: Infinity, delay: i*0.14 }} />)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input bar — ChatGPT style */}
        <div style={{
          borderRadius: 20,
          background: panelBg,
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          border: `1px solid ${panelBdr}`,
          boxShadow: `0 4px 28px rgba(0,0,0,${isLight?'0.10':'0.36'}), 0 0 0 1px rgba(${R},0.07)`,
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send(input)}
              placeholder="Ask me about Daniel's work, skills, or projects…"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: textMain, fontFamily: "'DM Sans', sans-serif" }} />
            {msgs.length > 0 && (
              <button onClick={() => { setMsgs([]); setInput(''); }}
                style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: isLight?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.07)', color: textDim, fontFamily: "'DM Sans', sans-serif", transition: 'all 0.14s' }}>
                Clear
              </button>
            )}
            <motion.button onClick={() => send(input)} disabled={!input.trim()||typing}
              style={{ width: 40, height: 40, borderRadius: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: input.trim() ? `linear-gradient(135deg,#06b6d4,#2878ff)` : (isLight?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.07)'), boxShadow: input.trim() ? '0 0 16px rgba(6,182,212,0.40)' : 'none', opacity: !input.trim()||typing ? 0.45 : 1, transition: 'all 0.18s' }}
              whileHover={input.trim() ? { scale: 1.08 } : {}} whileTap={input.trim() ? { scale: 0.92 } : {}}>
              <Send size={15} color={input.trim() ? 'white' : (isLight?'rgba(15,23,42,0.4)':'rgba(255,255,255,0.4)')} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT: Stats + Quick-launch ── */}
      <motion.div style={{ gridColumn: 3, gridRow: 2, display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 24, alignItems: 'flex-end', justifyContent: 'center', pointerEvents: 'auto' }}
        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>

        {/* Stats */}
        <div style={{ width: '100%', padding: '18px 20px', borderRadius: 18, background: panelBg, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: `1px solid ${panelBdr}`, display: 'flex', justifyContent: 'space-between' }}>
          {[{ n:`${profile.yearsExperience}+`,label:'Years'},{n:`${profile.companiesWorked}`,label:'Companies'},{n:`${profile.projectsBuilt}+`,label:'Projects'}].map((s,i)=>(
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: theme.accent, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 10, color: textDim, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 5, fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick-launch */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {QUICK_APPS.map((app, i) => (
            <motion.button key={app.id}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderRadius: 14, border: 'none', cursor: 'pointer', background: panelBg, backdropFilter: 'blur(18px)', outline: `1px solid ${panelBdr}`, transition: 'all 0.18s', textAlign: 'left' }}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.07 }}
              whileHover={{ background: `rgba(${hexToRgb(app.color)},0.14)`, outline: `1px solid rgba(${hexToRgb(app.color)},0.40)`, x: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openApp(app.id)}>
              <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${hexToRgb(app.color)},0.14)`, border: `1px solid rgba(${hexToRgb(app.color)},0.26)` }}>
                <span style={{ color: app.color }}>{app.icon}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: textMain, fontFamily: "'DM Sans', sans-serif", flex: 1 }}>{app.label}</span>
              <ChevronRight size={13} style={{ color: textDim, flexShrink: 0 }} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom accent line ── */}
      <motion.div style={{ gridColumn: '1 / -1', gridRow: 3, height: 1, background: `linear-gradient(90deg,transparent,rgba(${R},0.28),transparent)`, marginTop: 14 }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
    </div>
  );
}
