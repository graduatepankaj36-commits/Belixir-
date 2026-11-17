import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { AGENCY_CONTACT, SERVICES, getWhatsAppUrl } from '../data/agencyData';

interface ContactSectionProps {
  preselectedService: string;
  preselectedNote: string;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const BUDGET_OPTIONS = [
  'Under $2,500 / mo',
  '$2,500 – $7,500 / mo',
  '$7,500 – $20,000 / mo',
  '$20,000+ / mo',
];

export function ContactSection({ preselectedService, preselectedNote }: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    service: SERVICES[0].title,
    budget: BUDGET_OPTIONS[1],
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedNote) {
      setForm((prev) => ({
        ...prev,
        message: `Interested in a campaign similar to "${preselectedNote}". `,
      }));
    }
  }, [preselectedNote]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please share a brief overview (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  };

  const whatsappUrl = getWhatsAppUrl(form.service, form.company);

  return (
    <section id="contact" className="relative bg-[#06060A] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/35 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left editorial CTA column */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-sm font-semibold text-violet-400">Start a Conversation</p>
              <h2
                className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                Ready to Grow Your Business?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Tell us about your product, growth stage, and timeline. A senior strategist at Belixir Private Limited will prepare a tailored growth brief within one business day.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/12 px-6 py-3 text-sm font-semibold text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/20 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`mailto:${AGENCY_CONTACT.email}`}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4 text-sky-400" aria-hidden="true" />
                  <span>{AGENCY_CONTACT.email}</span>
                </a>
              </div>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-400 space-y-1.5">
              <p className="font-semibold text-white">{AGENCY_CONTACT.companyName}</p>
              <p>{AGENCY_CONTACT.officeHours}</p>
              <p className="font-mono text-xs text-slate-400 tabular-nums">
                WhatsApp Direct: {AGENCY_CONTACT.whatsappDisplay}
              </p>
            </div>
          </div>

          {/* Right validated project inquiry form */}
          <div className="lg:col-span-7">
            <div className="glass-surface rounded-2xl p-7 sm:p-10">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300">
                    <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    Project Brief Received
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                    Thank you, {form.name}. Your inquiry for{' '}
                    <span className="font-semibold text-white">{form.service}</span> has been logged. Our strategy lead will reach out at{' '}
                    <span className="font-semibold text-sky-300">{form.email}</span>.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold text-white cta-glow whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Continue on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm((prev) => ({ ...prev, message: '' }));
                      }}
                      className="inline-flex min-h-[44px] items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-200">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Aarav Mehta"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        aria-invalid={Boolean(errors.name)}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-[#08080E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-200">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="aarav@company.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        aria-invalid={Boolean(errors.email)}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-[#08080E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-200">
                        Company or Brand
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        placeholder="Your brand name"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-[#08080E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-semibold text-slate-200">
                        Monthly Marketing Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-[#08080E] px-4 py-3 text-sm text-white focus:border-violet-400 focus:outline-none"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0B0B13]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-200">
                      Primary Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-[#08080E] px-4 py-3 text-sm text-white focus:border-violet-400 focus:outline-none"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#0B0B13]">
                          {s.title}
                        </option>
                      ))}
                      <option value="Full-Stack Growth Retainer" className="bg-[#0B0B13]">
                        Full-Stack Growth Retainer
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-200">
                      Project Goals &amp; Timeline
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Share your target channels, launch timeline, and what growth milestone you want to hit..."
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      aria-invalid={Boolean(errors.message)}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-[#08080E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white cta-glow cursor-pointer"
                  >
                    <span>Start Your Project Today</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
