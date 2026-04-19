import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="w-full border-t mt-auto py-10 px-6 md:px-20"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Branding */}
        <div className="flex flex-col gap-3 max-w-xs">
          <p className="font-bold text-xl" style={{ color: 'var(--primary)' }}>
            YtEduNotes
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Take timestamped notes while watching YouTube videos. Paste a link and start learning.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            Get in Touch
          </h4>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>+91 [phone_number]</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <a
                href="mailto:[email]"
                className="hover:underline transition-opacity hover:opacity-80"
                style={{ color: 'var(--primary)' }}
              >
                [email]
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Gurgaon, Haryana, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-8 pt-6 border-t text-xs text-center"
        style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
      >
        © {new Date().getFullYear()} YtEduNotes. All rights reserved.
      </div>
    </footer>
  );
}
