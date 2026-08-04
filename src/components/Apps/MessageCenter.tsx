import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, User, Building2, MessageSquare, Briefcase, AlertCircle } from 'lucide-react';
import { profile } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';

const FORMSUBMIT_URL = `https://formsubmit.co/${profile.email}`;

type Status = 'idle' | 'sending' | 'success' | 'error';

const PROJECT_TYPES = [
  'AI Application', 'Full Stack Development', 'SaaS Platform', 'Technical Consultation', 'Other',
];

interface FormData {
  name: string; email: string; company: string; projectType: string; message: string;
}
const EMPTY: FormData = { name: '', email: '', company: '', projectType: '', message: '' };

export default function MessageCenter() {
  const { theme } = useTheme();
  const isLight = theme.isLight;
  const [form, setForm]     = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Adaptive palette
  const panelBg    = isLight ? 'rgba(240,245,255,0.60)' : 'rgba(4,8,20,0.40)';
  const titleColor = isLight ? 'rgba(15,23,42,0.92)'   : 'rgba(255,255,255,0.92)';
  const subColor   = isLight ? 'rgba(15,23,42,0.48)'   : 'rgba(255,255,255,0.38)';
  const labelColor = isLight ? 'rgba(15,23,42,0.45)'   : 'rgba(255,255,255,0.32)';
  const inputBg    = isLight ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.04)';
  const inputBdr   = isLight ? 'rgba(15,23,42,0.15)'   : 'rgba(255,255,255,0.09)';
  const inputColor = isLight ? 'rgba(15,23,42,0.85)'   : 'rgba(255,255,255,0.80)';
  const inputFocus = 'rgba(236,72,153,0.45)';
  const chipInactBg  = isLight ? 'rgba(15,23,42,0.06)'  : 'rgba(255,255,255,0.04)';
  const chipInactBdr = isLight ? 'rgba(15,23,42,0.12)'  : 'rgba(255,255,255,0.09)';
  const chipInactCol = isLight ? 'rgba(15,23,42,0.50)'  : 'rgba(255,255,255,0.40)';
  const footerColor  = isLight ? 'rgba(15,23,42,0.38)'  : 'rgba(255,255,255,0.20)';
  const stateBodyBg  = isLight ? 'rgba(240,245,255,0.70)' : 'rgba(4,8,20,0.50)';
  const stateTitle   = isLight ? 'rgba(15,23,42,0.92)'  : 'rgba(255,255,255,0.92)';
  const stateBody    = isLight ? 'rgba(15,23,42,0.55)'  : 'rgba(255,255,255,0.45)';
  const stateBtn     = isLight ? 'rgba(15,23,42,0.55)'  : 'rgba(255,255,255,0.55)';

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const body = new FormData();
      body.append('name', form.name); body.append('email', form.email);
      body.append('company', form.company || '—'); body.append('project_type', form.projectType || '—');
      body.append('message', form.message);
      body.append('_subject', `New message from ${form.name} — Daniel OS Portfolio`);
      body.append('_captcha', 'false'); body.append('_template', 'table');
      const res = await fetch(FORMSUBMIT_URL, { method: 'POST', body, headers: { Accept: 'application/json' } });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  const reset = () => { setForm(EMPTY); setStatus('idle'); setErrors({}); };

  if (status === 'success') {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: stateBodyBg }}>
        <motion.div style={{ textAlign: 'center', padding: '0 40px', maxWidth: 360 }}
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
          <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 24px' }}>
            <svg viewBox="0 0 80 80" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(236,72,153,0.15)" strokeWidth="3" />
              <motion.circle cx="40" cy="40" r="34" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`} initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 6px #ec4899)' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring' }}>
                <CheckCircle2 size={32} color="#f9a8d4" />
              </motion.div>
            </div>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: stateTitle, marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}>Message Sent!</h2>
          <p style={{ fontSize: 13, color: stateBody, marginBottom: 24, lineHeight: 1.6 }}>
            Thanks, {form.name.split(' ')[0]}. Daniel will get back to you at <span style={{ color: '#f9a8d4' }}>{form.email}</span>.
          </p>
          <button onClick={reset} style={{ fontSize: 12, padding: '8px 18px', borderRadius: 10, cursor: 'pointer', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: stateBtn }}>Send another</button>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: stateBodyBg }}>
        <motion.div style={{ textAlign: 'center', padding: '0 40px', maxWidth: 360 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AlertCircle size={40} color="#f87171" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: stateTitle, marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}>Something went wrong</h2>
          <p style={{ fontSize: 12, color: stateBody, marginBottom: 20 }}>
            Email Daniel at <a href={`mailto:${profile.email}`} style={{ color: '#f9a8d4' }}>{profile.email}</a>
          </p>
          <button onClick={reset} style={{ fontSize: 12, padding: '8px 18px', borderRadius: 10, cursor: 'pointer', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: stateBtn }}>Try again</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: panelBg }}>
      <div style={{ padding: '28px 32px', maxWidth: 520, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(40,120,255,0.2))', border: '1px solid rgba(236,72,153,0.25)', boxShadow: '0 0 20px rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={18} color="#f9a8d4" />
          </div>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: titleColor, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>Message Center</h2>
            <p style={{ fontSize: 12, color: subColor, fontFamily: "'DM Sans', sans-serif" }}>Direct line to {profile.name.split(' ')[0]}</p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Full Name" icon={<User size={11} />} type="text" placeholder="Your name"
              value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} error={errors.name} required
              labelColor={labelColor} inputBg={inputBg} inputBdr={inputBdr} inputColor={inputColor} inputFocus={inputFocus} />
            <Field label="Email" icon={<Mail size={11} />} type="email" placeholder="your@email.com"
              value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} error={errors.email} required
              labelColor={labelColor} inputBg={inputBg} inputBdr={inputBdr} inputColor={inputColor} inputFocus={inputFocus} />
          </div>

          <Field label="Company" icon={<Building2 size={11} />} type="text" placeholder="Your company (optional)"
            value={form.company} onChange={v => setForm(f => ({ ...f, company: v }))}
            labelColor={labelColor} inputBg={inputBg} inputBdr={inputBdr} inputColor={inputColor} inputFocus={inputFocus} />

          {/* Project type */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: labelColor, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Briefcase size={10} /> Project Type
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PROJECT_TYPES.map(pt => (
                <button key={pt} type="button" onClick={() => setForm(f => ({ ...f, projectType: pt }))}
                  style={{
                    fontSize: 11, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    background: form.projectType === pt ? 'rgba(236,72,153,0.15)' : chipInactBg,
                    border: form.projectType === pt ? '1px solid rgba(236,72,153,0.40)' : `1px solid ${chipInactBdr}`,
                    color: form.projectType === pt ? '#f9a8d4' : chipInactCol,
                    transition: 'all 0.15s',
                  }}>
                  {pt}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: labelColor, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
              <MessageSquare size={10} /> Message <span style={{ color: 'rgba(236,72,153,0.6)', marginLeft: 2 }}>*</span>
            </div>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Tell Daniel about your project, idea, or question…" rows={4}
              style={{ width: '100%', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: inputColor, background: inputBg, border: errors.message ? '1px solid rgba(248,113,113,0.55)' : `1px solid ${inputBdr}`, outline: 'none', resize: 'none', transition: 'border-color 0.2s', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
              onFocus={e => (e.target.style.borderColor = inputFocus)}
              onBlur={e => (e.target.style.borderColor = errors.message ? 'rgba(248,113,113,0.55)' : inputBdr)} />
            {errors.message && <p style={{ fontSize: 10, color: '#f87171', marginTop: 5 }}>{errors.message}</p>}
          </div>

          {/* Submit */}
          <motion.button type="submit" disabled={status === 'sending'}
            style={{ width: '100%', padding: '13px 0', borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: 'white', background: 'linear-gradient(135deg, #ec4899, #2878ff)', boxShadow: '0 4px 22px rgba(236,72,153,0.32)', opacity: status === 'sending' ? 0.75 : 1 }}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <AnimatePresence mode="wait">
              {status === 'sending' ? (
                <motion.span key="s" style={{ display: 'flex', alignItems: 'center', gap: 8 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {[0,1,2].map(i => <motion.span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', display: 'inline-block' }} animate={{ scale: [1,1.5,1] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}
                  Sending…
                </motion.span>
              ) : (
                <motion.span key="b" style={{ display: 'flex', alignItems: 'center', gap: 8 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Send size={15} /> Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <p style={{ textAlign: 'center', fontSize: 11, color: footerColor, fontFamily: "'DM Sans', sans-serif" }}>
            Or email directly: <a href={`mailto:${profile.email}`} style={{ color: 'rgba(249,168,212,0.7)', textDecoration: 'none' }}>{profile.email}</a>
          </p>
        </form>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string; icon: React.ReactNode; type: string; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; required?: boolean;
  labelColor: string; inputBg: string; inputBdr: string; inputColor: string; inputFocus: string;
}
function Field({ label, icon, type, placeholder, value, onChange, error, required, labelColor, inputBg, inputBdr, inputColor, inputFocus }: FieldProps) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: labelColor, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
        {icon} {label} {required && <span style={{ color: 'rgba(236,72,153,0.65)', marginLeft: 2 }}>*</span>}
      </div>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', borderRadius: 10, padding: '10px 13px', fontSize: 13, color: inputColor, background: inputBg, border: error ? '1px solid rgba(248,113,113,0.55)' : `1px solid ${inputBdr}`, outline: 'none', transition: 'border-color 0.2s', fontFamily: "'DM Sans', sans-serif" }}
        onFocus={e => (e.target.style.borderColor = inputFocus)}
        onBlur={e => (e.target.style.borderColor = error ? 'rgba(248,113,113,0.55)' : inputBdr)} />
      {error && <p style={{ fontSize: 10, color: '#f87171', marginTop: 5 }}>{error}</p>}
    </div>
  );
}
