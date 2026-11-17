import { ArrowUpRight, Check, Copy, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { AGENCY_CONTACT, SERVICES, getWhatsAppUrl } from '../data/agencyData';

export function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AGENCY_CONTACT.whatsappDisplay);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp quick contact"
          className="w-72 rounded-2xl border border-white/15 bg-[#0C0C14] p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="font-display text-sm font-semibold text-white">
                WhatsApp Direct
              </p>
              <p className="text-xs text-slate-400">{AGENCY_CONTACT.companyName}</p>
            </div>
            <button
              type="button"
              aria-label="Close WhatsApp menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-emerald-400/35 bg-emerald-500/12 px-3 py-2.5 text-xs font-semibold text-emerald-100 hover:border-emerald-400/60 hover:bg-emerald-500/20 transition-colors"
          >
            <span>Start Direct Chat</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
          </a>

          <p className="mt-3 text-xs text-slate-400">Or inquire about a specific service:</p>

          <div className="mt-2 space-y-1.5">
            {SERVICES.map((service) => (
              <a
                key={service.id}
                href={getWhatsAppUrl(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-200 hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-white transition-colors"
              >
                <span className="truncate">{service.title}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#08080D] py-2 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>Copied {AGENCY_CONTACT.whatsappDisplay}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                <span>Copy {AGENCY_CONTACT.whatsappDisplay}</span>
              </>
            )}
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open WhatsApp contact options"
        aria-expanded={open}
        className="inline-flex h-12 items-center gap-2.5 rounded-full border border-emerald-400/35 bg-[#0F241B] px-4 text-xs font-semibold text-emerald-100 shadow-lg shadow-emerald-950/50 transition-transform duration-150 hover:scale-[1.03] hover:border-emerald-400/70 hover:bg-[#133225] cursor-pointer"
      >
        <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap">WhatsApp</span>
      </button>
    </div>
  );
}
