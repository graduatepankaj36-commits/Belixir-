import { ArrowUpRight, Check, Layers, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { SERVICES, getWhatsAppUrl, type ServiceItem } from '../data/agencyData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="services" className="relative overflow-hidden bg-[#06060A] py-24 sm:py-32">
      {/* Subtle futuristic top divider & ambient purple/electric blue radial washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-violet-400">Our Services</p>
            <h2
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Specialized digital services engineered for modern brand growth.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-slate-400">
            Choose a service below to connect directly on WhatsApp with a pre-filled brief for our team.
          </p>
        </div>

        {/* Balanced 5-card bento architecture: 2 featured wide cards on top + 3 cards below */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service: ServiceItem, idx: number) => {
            const isFeatured = Boolean(service.featured);
            const gridSpanClass = isFeatured
              ? 'lg:col-span-3'
              : idx === 4
                ? 'md:col-span-2 lg:col-span-2'
                : 'lg:col-span-2';
            const whatsappHref = getWhatsAppUrl(service.title);
            const hasFailed = failedImages[service.id];

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.06, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${gridSpanClass} glass-surface glass-surface-hover group relative flex flex-col justify-between overflow-hidden rounded-2xl`}
              >
                {/* Subtle hover rim glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/[0.06] via-transparent to-blue-500/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative z-10 flex flex-1 flex-col">
                  {/* 3D Visual Showcase Header */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-[#040407]">
                    {!hasFailed ? (
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [service.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-950/40 via-[#080810] to-blue-950/40 p-6 text-center">
                        <Layers className="h-8 w-8 text-violet-400" aria-hidden="true" />
                        <span className="font-display text-sm font-semibold text-white">
                          {service.title}
                        </span>
                      </div>
                    )}

                    {/* Contrast blend gradient & editorial index */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0C14] via-transparent to-transparent opacity-85"
                    />
                    <span className="absolute top-4 left-5 font-mono text-xs font-semibold text-sky-400 tabular-nums">
                      {service.index}.
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {service.tagline}
                      </p>

                      <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm text-slate-300">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2.5">
                            <Check
                              className="h-4 w-4 shrink-0 text-violet-400"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Action Footer */}
                    <div className="mt-7 space-y-3 pt-2">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold text-white cta-glow whitespace-nowrap"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Get This Service</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onSelectService(service.title)}
                        className="block w-full text-center text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        Or customize brief in contact form
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
