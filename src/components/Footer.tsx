import { AGENCY_CONTACT, BRAND_LOGO_PATH, SERVICES, getWhatsAppUrl } from '../data/agencyData';

interface FooterProps {
  onSelectService: (serviceTitle: string) => void;
}

export function Footer({ onSelectService }: FooterProps) {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050508] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#hero');
              }}
              className="inline-flex items-center gap-3 font-display text-lg font-bold tracking-tight text-white"
            >
              <img
                src={BRAND_LOGO_PATH}
                alt="Belixir Private Limited logo"
                className="h-10 w-10 rounded-lg border border-white/15 bg-black object-contain p-0.5 shrink-0"
              />
              <span>{AGENCY_CONTACT.companyName}</span>
            </a>
            <p className="mt-3 text-base font-medium text-violet-300">
              {AGENCY_CONTACT.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Performance marketing, commercial video production, web engineering, and brand design built for measurable business growth.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-wide text-slate-200">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Why Choose Us', href: '#why-us' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Results', href: '#results' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-wide text-slate-200">Services</h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 text-sm text-slate-400 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="text-left hover:text-white transition-colors cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {AGENCY_CONTACT.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={`mailto:${AGENCY_CONTACT.email}`} className="hover:text-slate-300 transition-colors">
              {AGENCY_CONTACT.email}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              WhatsApp: {AGENCY_CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
