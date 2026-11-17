import { motion } from 'motion/react';
import { Layers } from 'lucide-react';
import { useState } from 'react';
import { STUDIO_IMAGE_PATH, WHY_CHOOSE_US } from '../data/agencyData';

export function WhyChooseUsSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="why-us" className="relative bg-[#08080E] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/25 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left architectural studio visual & thesis */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <p className="text-sm font-semibold text-sky-400">Why Choose Us</p>
              <h2
                className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Built for clarity, creative velocity, and accountable return.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-400">
                Most agencies separate media buying from creative production. Belixir Private Limited unifies both disciplines under one roof so strategy, film, code, and paid distribution compound together.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D16] flex-1 min-h-[260px]">
              {!imgError ? (
                <div className="relative h-full w-full">
                  <img
                    src={STUDIO_IMAGE_PATH}
                    alt="Belixir Private Limited architectural production and strategy studio"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover min-h-[260px]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#06060A]/80 via-transparent to-transparent"
                  />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-slate-200">
                    <span>Belixir Creative &amp; Strategy Studio</span>
                    <span className="text-slate-400">Full-Stack Production</span>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet-950/40 via-[#0D0D16] to-sky-950/30 p-8 text-center">
                  <Layers className="h-8 w-8 text-violet-400" aria-hidden="true" />
                  <p className="font-display text-base font-semibold text-white">
                    Belixir Creative &amp; Strategy Studio
                  </p>
                  <p className="text-xs text-slate-400">
                    Unified Strategy, Production &amp; Performance Architecture
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right 4 strategic pillars separated by clean whitespace & hairline dividers */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {WHY_CHOOSE_US.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="glass-surface flex flex-col justify-between rounded-2xl p-7"
              >
                <div>
                  <span className="font-mono text-xs font-medium text-violet-400 tabular-nums">
                    {pillar.index}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-sky-300">
                  {pillar.proofFocus}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
