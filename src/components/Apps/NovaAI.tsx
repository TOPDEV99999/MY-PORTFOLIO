import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, RotateCcw, Zap, Code2, Brain, Mail } from 'lucide-react';
import { novaKnowledge } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';

interface Intent {
  patterns: string[];
  response: string;
  followups?: string[];
}

interface Message {
  id: string;
  role: 'user' | 'nova';
  text: string;
  ts: Date;
  followups?: string[];
}

// ── Local fallback — used only when the Netlify Function is unreachable ──────
function localFallback(input: string): { text: string; followups?: string[] } {
  const lower = input.toLowerCase();
  for (const intent of novaKnowledge.intents as Intent[]) {
    if (intent.patterns.some(p => lower.includes(p))) {
      return { text: intent.response, followups: intent.followups };
    }
  }
  return { text: novaKnowledge.fallback };
}

const API_URL = '/.netlify/functions/chat';

// ── Rich text renderer ──────────────────────────────────────────────────────
// Supports: **bold**, `code`, lines starting with → (indent), blank lines = gap
function RichText({ text, color, isLight }: { text: string; color: string; isLight: boolean }) {
  const codeColor   = isLight ? 'rgba(37,99,235,0.85)'    : 'rgba(103,232,249,0.85)';
  const codeBg      = isLight ? 'rgba(37,99,235,0.08)'    : 'rgba(6,182,212,0.12)';
  const arrowColor  = isLight ? 'rgba(37,99,235,0.60)'    : 'rgba(103,232,249,0.50)';

  const renderLine = (line: string, key: number) => {
    if (line.trim() === '') return <div key={key} style={{ height: 6 }} />;

    // Parse inline **bold** and `code`
    const parts: React.ReactNode[] = [];
    const raw = line.replace(/^→\s*/, '');
    const isArrow = line.startsWith('→');
    let rest = raw;
    let pi = 0;

    while (rest.length > 0) {
      const boldIdx = rest.indexOf('**');
      const codeIdx = rest.indexOf('`');
      const first = Math.min(
        boldIdx >= 0 ? boldIdx : Infinity,
        codeIdx >= 0 ? codeIdx : Infinity,
      );

      if (first === Infinity) { parts.push(<span key={pi++}>{rest}</span>); break; }

      if (first > 0) { parts.push(<span key={pi++}>{rest.slice(0, first)}</span>); rest = rest.slice(first); }

      if (rest.startsWith('**')) {
        const end = rest.indexOf('**', 2);
        if (end < 0) { parts.push(<span key={pi++}>{rest}</span>); break; }
        parts.push(<strong key={pi++} style={{ fontWeight: 700, color: isLight ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.98)' }}>{rest.slice(2, end)}</strong>);
        rest = rest.slice(end + 2);
      } else if (rest.startsWith('`')) {
        const end = rest.indexOf('`', 1);
        if (end < 0) { parts.push(<span key={pi++}>{rest}</span>); break; }
        parts.push(
          <code key={pi++} style={{ fontSize: '0.88em', padding: '1px 5px', borderRadius: 4, background: codeBg, color: codeColor, fontFamily: "'JetBrains Mono', monospace" }}>
            {rest.slice(1, end)}
          </code>
        );
        rest = rest.slice(end + 1);
      }
    }

    return (
      <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: isArrow ? 6 : 0, marginBottom: 2 }}>
        {isArrow && <span style={{ color: arrowColor, flexShrink: 0, marginTop: 1, fontWeight: 600 }}>→</span>}
        <span style={{ color }}>{parts}</span>
      </div>
    );
  };

  return (
    <div style={{ lineHeight: 1.7 }}>
      {text.split('\n').map((line, i) => renderLine(line, i))}
    </div>
  );
}

// ── Message bubble ──────────────────────────────────────────────────────────
function MessageBubble({ msg, isLight, onFollowup }: {
  msg: Message; isLight: boolean; onFollowup: (t: string) => void;
}) {
  const isNova = msg.role === 'nova';
  const textColor      = isLight ? 'rgba(15,23,42,0.85)'  : 'rgba(255,255,255,0.88)';
  const timestampColor = isLight ? 'rgba(15,23,42,0.32)'  : 'rgba(255,255,255,0.28)';
  const novaBubbleBg   = isLight ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.09)';
  const novaBubbleBdr  = isLight ? 'rgba(6,182,212,0.18)' : 'rgba(6,182,212,0.20)';
  const userBubbleBg   = isLight ? 'rgba(37,99,235,0.09)' : 'rgba(40,120,255,0.11)';
  const userBubbleBdr  = isLight ? 'rgba(37,99,235,0.20)' : 'rgba(40,120,255,0.20)';
  const chipBg         = isLight ? 'rgba(6,182,212,0.07)' : 'rgba(6,182,212,0.08)';
  const chipBdr        = isLight ? 'rgba(6,182,212,0.20)' : 'rgba(6,182,212,0.18)';
  const chipColor      = isLight ? 'rgba(0,140,120,0.85)' : 'rgba(103,232,249,0.75)';

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: isNova ? 'flex-start' : 'flex-end' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div style={{ display: 'flex', gap: 10, flexDirection: isNova ? 'row' : 'row-reverse', maxWidth: '86%' }}>
        {/* Avatar */}
        <div style={{
          flexShrink: 0, width: 32, height: 32, borderRadius: 10, marginTop: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isNova
            ? 'linear-gradient(135deg, #06b6d4, #2878ff)'
            : (isLight ? 'rgba(37,99,235,0.12)' : 'rgba(255,255,255,0.08)'),
          border: isNova ? 'none' : `1px solid ${isLight ? 'rgba(37,99,235,0.20)' : 'rgba(255,255,255,0.12)'}`,
          boxShadow: isNova ? '0 0 12px rgba(6,182,212,0.35)' : 'none',
        }}>
          {isNova
            ? <Bot size={14} color="white" />
            : <User size={14} color={isLight ? 'rgba(37,99,235,0.7)' : 'rgba(255,255,255,0.7)'} />
          }
        </div>

        {/* Bubble */}
        <div style={{
          padding: '11px 15px',
          fontSize: 13,
          fontFamily: "'DM Sans', sans-serif",
          background: isNova ? novaBubbleBg : userBubbleBg,
          border: `1px solid ${isNova ? novaBubbleBdr : userBubbleBdr}`,
          borderRadius: isNova ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
        }}>
          {isNova
            ? <RichText text={msg.text} color={textColor} isLight={isLight} />
            : <span style={{ color: textColor, lineHeight: 1.6 }}>{msg.text}</span>
          }
          <div style={{
            fontSize: 10, marginTop: 7,
            color: timestampColor,
            textAlign: isNova ? 'left' : 'right',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {msg.ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Follow-up chips */}
      {isNova && msg.followups && msg.followups.length > 0 && (
        <div style={{ marginLeft: 42, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {msg.followups.map(f => (
            <motion.button
              key={f}
              onClick={() => onFollowup(f)}
              style={{
                fontSize: 11, padding: '5px 11px', borderRadius: 20, cursor: 'pointer',
                background: chipBg, border: `1px solid ${chipBdr}`,
                color: chipColor, fontFamily: "'DM Sans', sans-serif", transition: 'all 0.14s',
              }}
              whileHover={{ scale: 1.04, background: isLight ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.14)' }}
              whileTap={{ scale: 0.97 }}
            >
              {f}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Welcome card ────────────────────────────────────────────────────────────
const CAPABILITY_CARDS = [
  { icon: <Brain size={14} />, label: 'Skills & Stack',    prompt: 'What technologies does he use?' },
  { icon: <Zap size={14} />,   label: 'Projects',          prompt: 'What projects has he built?' },
  { icon: <Code2 size={14} />, label: 'Experience',        prompt: 'What experience does he have?' },
  { icon: <Mail size={14} />,  label: 'Contact / Hire',    prompt: 'How can I contact him?' },
];

function WelcomeScreen({ isLight, onSend }: { isLight: boolean; onSend: (t: string) => void }) {
  const cardBg  = isLight ? 'rgba(37,99,235,0.06)' : 'rgba(6,182,212,0.07)';
  const cardBdr = isLight ? 'rgba(37,99,235,0.16)' : 'rgba(6,182,212,0.16)';
  const cardCol = isLight ? 'rgba(15,23,42,0.72)'  : 'rgba(255,255,255,0.72)';
  const iconCol = isLight ? 'rgba(37,99,235,0.75)' : '#67e8f9';

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px', gap: 20 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nova avatar + intro */}
      <div style={{ textAlign: 'center' }}>
        <motion.div
          style={{
            width: 56, height: 56, borderRadius: 18, margin: '0 auto 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #06b6d4, #2878ff)',
            boxShadow: '0 0 24px rgba(6,182,212,0.50)',
          }}
          animate={{ boxShadow: ['0 0 20px rgba(6,182,212,0.45)', '0 0 36px rgba(6,182,212,0.75)', '0 0 20px rgba(6,182,212,0.45)'] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Bot size={24} color="white" />
        </motion.div>
        <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: isLight ? 'rgba(15,23,42,0.90)' : 'rgba(255,255,255,0.92)', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Nova AI <Sparkles size={13} color="#67e8f9" />
        </div>
        <div style={{ fontSize: 12, color: isLight ? 'rgba(15,23,42,0.50)' : 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: 260 }}>
          Daniel's personal AI assistant. Ask me anything about his work, skills, and how to collaborate.
        </div>
      </div>

      {/* Capability cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
        {CAPABILITY_CARDS.map((c, i) => (
          <motion.button
            key={c.label}
            onClick={() => onSend(c.prompt)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: cardBg, outline: `1px solid ${cardBdr}`,
              textAlign: 'left', transition: 'all 0.16s',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            whileHover={{ scale: 1.03, background: isLight ? 'rgba(37,99,235,0.10)' : 'rgba(6,182,212,0.12)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span style={{ color: iconCol, flexShrink: 0 }}>{c.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: cardCol, fontFamily: "'DM Sans', sans-serif" }}>{c.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  'Who is Daniel?',
  'Show me his projects',
  'What are his skills?',
  'How can I hire him?',
  'Tell me about his AI work',
];

export default function NovaAI() {
  const { theme } = useTheme();
  const isLight = theme.isLight;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]    = useState('');
  const [typing, setTyping]  = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    if (!started) setStarted(true);

    // Add user message immediately
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text: trimmed,
      ts: new Date(),
    }]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        // Non-2xx: fall back to local knowledge
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json() as { reply?: string; error?: string };

      if (!data.reply) {
        throw new Error(data.error ?? 'Empty reply from server');
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'nova',
        text: data.reply!,
        ts: new Date(),
        // Gemini replies don't carry structured followups — leave undefined
      }]);
    } catch (err) {
      // ── Graceful degradation ─────────────────────────────────────────────
      // FIX 6: Single consolidated error log — no duplicate messages.
      console.error("Gemini request failed:", err instanceof Error ? err.message : err);
      // 1. Try local keyword match first
      const fallback = localFallback(trimmed);
      const isGenericFallback = fallback.text === novaKnowledge.fallback;

      const errorNote = isGenericFallback
        ? `⚠️ Nova is currently offline.\n\nI couldn't reach the AI service${err instanceof Error ? ` (${err.message})` : ''}.\n\nPlease try again shortly, or contact Daniel directly at uhajucewog80@gmail.com.`
        : `${fallback.text}\n\n*[Answering from local data — AI service temporarily unavailable]*`;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'nova',
        text: errorNote,
        ts: new Date(),
        followups: isGenericFallback ? undefined : fallback.followups,
      }]);

      console.warn('Nova API error — used local fallback:', err);
    } finally {
      setTyping(false);
    }
  };

  const reset = () => { setMessages([]); setInput(''); setStarted(false); setTyping(false); };

  // Adaptive colors
  const panelBg    = isLight ? 'rgba(245,248,255,0.70)' : 'rgba(4,8,20,0.50)';
  const headerBg   = isLight ? 'rgba(240,247,255,0.88)' : 'rgba(6,182,212,0.05)';
  const headerBdr  = isLight ? 'rgba(6,182,212,0.18)'   : 'rgba(6,182,212,0.12)';
  const titleColor = isLight ? 'rgba(15,23,42,0.90)'    : 'rgba(255,255,255,0.92)';
  const subColor   = isLight ? 'rgba(6,182,212,0.80)'   : 'rgba(103,232,249,0.55)';
  const resetColor = isLight ? 'rgba(15,23,42,0.38)'    : 'rgba(255,255,255,0.30)';
  const inputBg    = isLight ? 'rgba(240,244,255,0.65)' : 'rgba(4,8,20,0.35)';
  const inputBdr   = isLight ? 'rgba(6,182,212,0.20)'   : 'rgba(6,182,212,0.13)';
  const inputColor = isLight ? 'rgba(15,23,42,0.85)'    : 'rgba(255,255,255,0.82)';
  const dotColor   = isLight ? 'rgba(0,140,120,0.70)'   : 'rgba(103,232,249,0.70)';
  const qpBg       = isLight ? 'rgba(6,182,212,0.07)'   : 'rgba(6,182,212,0.07)';
  const qpBdr      = isLight ? 'rgba(6,182,212,0.20)'   : 'rgba(6,182,212,0.15)';
  const qpColor    = isLight ? 'rgba(0,140,120,0.85)'   : 'rgba(103,232,249,0.70)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: panelBg }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', flexShrink: 0, background: headerBg, borderBottom: `1px solid ${headerBdr}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <motion.div
            style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #06b6d4, #2878ff)', boxShadow: '0 0 16px rgba(6,182,212,0.45)' }}
            animate={{ boxShadow: ['0 0 14px rgba(6,182,212,0.45)', '0 0 26px rgba(6,182,212,0.75)', '0 0 14px rgba(6,182,212,0.45)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Bot size={16} color="white" />
          </motion.div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: titleColor, fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              Nova AI <Sparkles size={11} color="#67e8f9" />
            </div>
            <div style={{ fontSize: 10, color: subColor, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
              DANIEL Personal Assistant · Always available
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Online indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, background: isLight ? 'rgba(16,185,129,0.10)' : 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}
              animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span style={{ fontSize: 10, color: '#10b981', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>Online</span>
          </div>
          <button
            onClick={reset}
            style={{ padding: 7, borderRadius: 9, border: 'none', cursor: 'pointer', background: 'transparent', color: resetColor, transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = isLight ? 'rgba(15,23,42,0.75)' : 'rgba(255,255,255,0.72)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = resetColor; }}
            title="Reset"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Messages / Welcome */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '16px 18px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {!started
          ? <WelcomeScreen isLight={isLight} onSend={send} />
          : messages.map(msg => <MessageBubble key={msg.id} msg={msg} isLight={isLight} onFollowup={send} />)
        }

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div style={{ display: 'flex', gap: 10 }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #06b6d4, #2878ff)' }}>
                <Bot size={14} color="white" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '11px 15px', borderRadius: '4px 16px 16px 16px', background: isLight ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.09)', border: isLight ? '1px solid rgba(6,182,212,0.18)' : '1px solid rgba(6,182,212,0.20)' }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor }}
                    animate={{ y: [0, -5, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts — shown only on welcome screen */}
      {!started && (
        <div style={{ padding: '4px 18px 8px', flexShrink: 0, display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {QUICK_PROMPTS.slice(0, 4).map(s => (
            <motion.button key={s} onClick={() => send(s)}
              style={{ fontSize: 11, padding: '6px 12px', borderRadius: 20, cursor: 'pointer', background: qpBg, border: `1px solid ${qpBdr}`, color: qpColor, fontFamily: "'DM Sans', sans-serif", transition: 'all 0.14s' }}
              whileHover={{ scale: 1.04, background: isLight ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.13)' }}
              whileTap={{ scale: 0.97 }}
            >
              {s}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '10px 14px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${inputBdr}`, background: inputBg }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
          placeholder="Ask Nova anything about Daniel…"
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: inputColor, fontFamily: "'DM Sans', sans-serif" }}
        />
        {/* Char hint */}
        {input.length > 0 && (
          <span style={{ fontSize: 10, color: isLight ? 'rgba(15,23,42,0.28)' : 'rgba(255,255,255,0.22)', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
            {input.length}
          </span>
        )}
        <motion.button
          onClick={() => send(input)}
          disabled={!input.trim() || typing}
          style={{
            width: 36, height: 36, borderRadius: 11, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: input.trim() ? 'linear-gradient(135deg, #06b6d4, #2878ff)' : (isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'),
            boxShadow: input.trim() ? '0 0 16px rgba(6,182,212,0.45)' : 'none',
            opacity: (!input.trim() || typing) ? 0.4 : 1,
            transition: 'all 0.2s',
          }}
          whileHover={input.trim() ? { scale: 1.08 } : {}}
          whileTap={input.trim() ? { scale: 0.93 } : {}}
        >
          <Send size={14} color={input.trim() ? 'white' : (isLight ? 'rgba(15,23,42,0.4)' : 'white')} />
        </motion.button>
      </div>
    </div>
  );
}
