import { Check, Zap, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Everything you need to start taking smarter notes.',
    icon: BookOpen,
    highlight: false,
    cta: 'Get Started',
    ctaTo: '/',
    features: [
      'Unlimited YouTube videos',
      'Timestamped notes',
      'Export notes to PDF',
      'Dark mode',
      'Local storage (notes saved in browser)',
      'Full video player controls',
      'Theatre mode & Picture-in-Picture',
    ],
    missing: [
      'Cloud sync across devices',
      'Note folders & tags',
      'Priority support',
    ],
  },
  {
    name: 'Pro',
    price: '₹199',
    period: 'per month',
    description: 'For serious learners who want their notes everywhere.',
    icon: Zap,
    highlight: true,
    cta: 'Coming Soon',
    ctaTo: '/contact',
    features: [
      'Everything in Free',
      'Cloud sync across devices',
      'Note folders & tags',
      'Search across all notes',
      'Shareable note links',
      'Priority email support',
      'Early access to new features',
    ],
    missing: [],
  },
];

export default function Pricing() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Simple, Transparent Pricing
          </h1>
          <p className="text-base max-w-md" style={{ color: 'var(--muted-foreground)' }}>
            YtEduNotes is completely free to use. A Pro plan with cloud sync is coming soon.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map(({ name, price, period, description, icon: Icon, highlight, cta, ctaTo, features, missing }) => (
            <div
              key={name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-6 gap-6',
                highlight && 'ring-2'
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: highlight ? 'var(--primary)' : 'var(--border)',
                ...(highlight ? { '--tw-ring-color': 'var(--primary)' } as React.CSSProperties : {}),
              }}
            >
              {/* Popular badge */}
              {highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Coming Soon
                </div>
              )}

              {/* Plan header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
                    {name}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                    {price}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    / {period}
                  </span>
                </div>

                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {description}
                </p>
              </div>

              {/* CTA */}
              <Link to={ctaTo} className="w-full">
                <Button
                  className="w-full gap-2"
                  variant={highlight ? 'default' : 'outline'}
                  disabled={highlight}
                >
                  {cta}
                  {!highlight && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                </Button>
              </Link>

              {/* Features */}
              <div className="flex flex-col gap-2">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: 'var(--primary)' }}
                      aria-hidden="true"
                    />
                    <span style={{ color: 'var(--foreground)' }}>{f}</span>
                  </div>
                ))}
                {missing.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm opacity-40">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span style={{ color: 'var(--muted-foreground)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ note */}
        <div
          className="rounded-xl border p-5 text-sm text-center"
          style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
        >
          Questions about pricing?{' '}
          <Link
            to="/contact"
            className="font-medium hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            Contact us
          </Link>
          {' '}and we'll get back to you within 24 hours.
        </div>

      </div>
    </main>
  );
}
