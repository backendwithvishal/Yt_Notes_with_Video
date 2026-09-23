import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Clock, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import TiltCard from '../components/ui/TiltCard';
import SpotlightGlow from '../components/ui/SpotlightGlow';
import { cn } from '../lib/utils';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Please enter your name.';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required.';
        break;
      case 'message':
        if (!value.trim()) return 'Please enter your message.';
        if (value.trim().length < 10) return 'Message should be at least 10 characters.';
        break;
    }
    return undefined;
  };

  const handleChange = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setForm((prev) => ({ ...prev, [field]: val }));
      if (touched[field]) {
        const err = validateField(field, val);
        setErrors((prev) => ({ ...prev, [field]: err }));
      }
    };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormState> = {};
    (Object.keys(form) as (keyof FormState)[]).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors in the form before sending.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const mailto = `mailto:vishalsanam83@gmail.com`
        + `?subject=${encodeURIComponent(form.subject)}`
        + `&body=${encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
          )}`;
      window.location.href = mailto;
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Message drafted! Mail client opened.');
    }, 400);
  };

  return (
    <main className="flex-1 overflow-x-hidden relative">
      <SpotlightGlow showBlobs={true} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col gap-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-xl mx-auto">
          <span
            className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
            style={{
              backgroundColor: 'var(--bg-surface-2)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--accent-violet)',
            }}
          >
            Direct Contact
          </span>
          <h1 className="text-display-1" style={{ color: 'var(--text-primary)' }}>
            Let's Start a <span className="text-gradient-aurora">Conversation</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Have feedback, feature ideas, or educational partnerships? Reach out directly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            <TiltCard
              glowColor="var(--accent-violet)"
              className="p-6 border rounded-2xl flex flex-col gap-6"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: 'var(--signature-gradient)' }}
                >
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    Get in Touch
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Open to student & developer discussions
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent-violet)' }} />
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase text-purple-400">Email Address</p>
                      <a
                        href="mailto:vishalsanam83@gmail.com"
                        className="font-medium hover:underline text-xs sm:text-sm"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        vishalsanam83@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('vishalsanam83@gmail.com');
                      toast.success('Email address copied to clipboard!');
                    }}
                    className="p-1.5 rounded-lg border text-xs transition-all hover:scale-105 cursor-pointer ml-auto shrink-0"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)' }}>
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent-cyan)' }} />
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase text-cyan-400">Location</p>
                    <span className="font-medium text-xs sm:text-sm" style={{ color: 'var(--text-primary)' }}>
                      Thane, Maharashtra, India
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Response Time Card */}
            <div
              className="p-5 rounded-2xl border flex items-center gap-3.5 text-xs"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(52, 211, 153, 0.15)', color: 'var(--success)' }}
              >
                <Clock className="w-4 h-4" />
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Average response turnaround is within <strong style={{ color: 'var(--text-primary)' }}>24 hours</strong>.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Form Card (7 cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-3xl border text-center flex flex-col items-center gap-4"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-emerald-400"
                  style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    Message Dispatched!
                  </h2>
                  <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                    Your default mail client was triggered. We will follow up shortly.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(INITIAL);
                    setTouched({});
                  }}
                  className="rounded-xl mt-2"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col gap-5"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                }}
              >
                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Full Name <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <div className="relative">
                      <Input
                        id="contact-name"
                        value={form.name}
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        placeholder="John Doe"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        className={cn(
                          'h-11 rounded-xl text-sm transition-colors border',
                          errors.name
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : touched.name && form.name
                            ? 'border-emerald-500/60'
                            : ''
                        )}
                        style={{
                          backgroundColor: 'var(--bg-surface-2)',
                          color: 'var(--text-primary)',
                        }}
                      />
                      {touched.name && form.name && !errors.name && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                      )}
                    </div>
                    {errors.name && (
                      <p role="alert" className="text-xs flex items-center gap-1 font-medium" style={{ color: 'var(--error)' }}>
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Email Address <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <div className="relative">
                      <Input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder="john@example.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        className={cn(
                          'h-11 rounded-xl text-sm transition-colors border',
                          errors.email
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : touched.email && form.email
                            ? 'border-emerald-500/60'
                            : ''
                        )}
                        style={{
                          backgroundColor: 'var(--bg-surface-2)',
                          color: 'var(--text-primary)',
                        }}
                      />
                      {touched.email && form.email && !errors.email && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                      )}
                    </div>
                    {errors.email && (
                      <p role="alert" className="text-xs flex items-center gap-1 font-medium" style={{ color: 'var(--error)' }}>
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Subject <span style={{ color: 'var(--error)' }}>*</span>
                  </label>
                  <Input
                    id="contact-subject"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    onBlur={handleBlur('subject')}
                    placeholder="Feature suggestion / feedback / query"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    className={cn(
                      'h-11 rounded-xl text-sm transition-colors border',
                      errors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''
                    )}
                    style={{
                      backgroundColor: 'var(--bg-surface-2)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  {errors.subject && (
                    <p role="alert" className="text-xs flex items-center gap-1 font-medium" style={{ color: 'var(--error)' }}>
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Message <span style={{ color: 'var(--error)' }}>*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={handleChange('message')}
                    onBlur={handleBlur('message')}
                    placeholder="Describe your question or thoughts in detail..."
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    className={cn(
                      'rounded-xl text-sm transition-colors border resize-none',
                      errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''
                    )}
                    style={{
                      backgroundColor: 'var(--bg-surface-2)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  {errors.message && (
                    <p role="alert" className="text-xs flex items-center gap-1 font-medium" style={{ color: 'var(--error)' }}>
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 px-6 rounded-xl font-semibold text-white shadow-lg gap-2 cursor-pointer transition-all hover:scale-105"
                    style={{ background: 'var(--signature-gradient)' }}
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Preparing...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
