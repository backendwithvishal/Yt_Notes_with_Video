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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
            Pricing
          </h1>
          <p className="text-sm max-w-sm" style={{ color: 'var(--muted-foreground)' }}>
            YtEduNotes is completely free to use. A Pro plan with cloud sync is coming soon.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plans.map(({ name, price, period, description, icon: Icon, highlight, cta, ctaTo, features, missing }) => (
            <div
              key={name}
              className={cn(
                'relative flex flex-col rounded-lg border p-5 gap-5',
                highlight && 'ring-1'
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: highlight ? 'var(--primary)' : 'var(--border)',
                ...(highlight ? { '--tw-ring-color': 'var(--primary)' } as React.CSSProperties : {}),
              }}
            >
              {/* Coming soon badge */}
              {highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Coming Soon
                </div>
              )}

              {/* Plan header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-md"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                    {name}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                    {price}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    / {period}
                  </span>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {description}
                </p>
              </div>

              {/* CTA */}
              <Link to={ctaTo} className="w-full">
                <Button
                  className="w-full gap-2 h-9 text-sm"
                  variant={highlight ? 'default' : 'outline'}
                  disabled={highlight}
                >
                  {cta}
                  {!highlight && <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />}
                </Button>
              </Link>

              {/* Divider */}
              <div
                className="h-px"
                style={{ backgroundColor: 'var(--border)' }}
                aria-hidden="true"
              />

              {/* Features */}
              <div className="flex flex-col gap-2">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs">
                    <Check
                      className="w-3.5 h-3.5 mt-0.5 shrink-0"
                      style={{ color: 'var(--primary)' }}
                      aria-hidden="true"
                    />
                    <span style={{ color: 'var(--foreground)' }}>{f}</span>
                  </div>
                ))}
                {missing.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs opacity-35">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                    <span style={{ color: 'var(--muted-foreground)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ note */}
        <div
          className="rounded-lg border p-4 text-xs text-center"
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
