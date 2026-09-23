import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { cn } from '../lib/utils';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm]       = useState<FormState>(INITIAL);
  const [errors, setErrors]   = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Enter a valid email address.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Open default mail client with pre-filled content
    const mailto = `mailto:vishalsanam83@gmail.com`
      + `?subject=${encodeURIComponent(form.subject)}`
      + `&body=${encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        )}`;
    window.location.href = mailto;
    setSubmitted(true);
    setForm(INITIAL);
  };

  return (
    <main className="flex-1 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
            Contact
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Have a question, suggestion, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          {/* Contact info sidebar */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div
              className="rounded-lg border p-5 flex flex-col gap-5"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <h2 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>
                Get in Touch
              </h2>

              <div className="flex flex-col gap-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                  <div>
                    <p className="font-medium text-xs uppercase tracking-wide mb-0.5" style={{ color: 'var(--muted-foreground)' }}>Email</p>
                    <a
                      href="mailto:vishalsanam83@gmail.com"
                      className="hover:underline text-xs"
                      style={{ color: 'var(--foreground)' }}
                    >
                      vishalsanam83@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                  <div>
                    <p className="font-medium text-xs uppercase tracking-wide mb-0.5" style={{ color: 'var(--muted-foreground)' }}>Location</p>
                    <span className="text-xs" style={{ color: 'var(--foreground)' }}>Thane, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response time note */}
            <div
              className="rounded-lg border border-dashed p-4 text-xs"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            >
              Typical response time is within{' '}
              <strong style={{ color: 'var(--foreground)' }}>24 hours</strong>.
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div
                className="rounded-lg border p-8 flex flex-col items-center gap-4 text-center"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <CheckCircle className="w-6 h-6" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                    Message sent!
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Your mail client should have opened. We'll get back to you soon.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-lg border p-5 flex flex-col gap-4"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                      Name <span aria-hidden="true" style={{ color: 'var(--destructive)' }}>*</span>
                    </label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Your name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className={cn(errors.name && 'border-red-500')}
                    />
                    {errors.name && <p role="alert" className="text-xs" style={{ color: 'var(--destructive)' }}>{errors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                      Email <span aria-hidden="true" style={{ color: 'var(--destructive)' }}>*</span>
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="you@example.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={cn(errors.email && 'border-red-500')}
                    />
                    {errors.email && <p role="alert" className="text-xs" style={{ color: 'var(--destructive)' }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                    Subject <span aria-hidden="true" style={{ color: 'var(--destructive)' }}>*</span>
                  </label>
                  <Input
                    id="contact-subject"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    placeholder="What's this about?"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    className={cn(errors.subject && 'border-red-500')}
                  />
                  {errors.subject && <p role="alert" className="text-xs" style={{ color: 'var(--destructive)' }}>{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                    Message <span aria-hidden="true" style={{ color: 'var(--destructive)' }}>*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell us more..."
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    className={cn(errors.message && 'border-red-500')}
                  />
                  {errors.message && <p role="alert" className="text-xs" style={{ color: 'var(--destructive)' }}>{errors.message}</p>}
                </div>

                <div className="flex justify-end pt-1">
                  <Button type="submit" size="sm" className="gap-2">
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    Send Message
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
