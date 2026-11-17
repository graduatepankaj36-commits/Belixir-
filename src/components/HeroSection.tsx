import { ArrowRight, ChevronDown } from 'lucide-react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';

interface HeroSectionProps {
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

export function HeroSection({ onPrimaryCta, onSecondaryCta }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#06060A] pt-24 pb-20 lg:pt-28 lg:pb-24"
    >
      {/* Interactive 3D WebGL background */}
      <ThreeHeroCanvas />

      {/* Measured radial & directional contrast scrim for >=4.5:1 copy legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06060A]/92 via-[#06060A]/68 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06060A] via-[#06060A]/75 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-violet-300">
            Belixir Private Limited
          </p>

          <h1
            className="mt-4 font-display font-bold tracking-tight text-white leading-[1.06]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.35rem)',
              textWrap: 'balance',
            }}
          >
            We Turn Your Ideas Into{' '}
            <span className="accent-gradient-text">Digital Growth.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg sm:text-xl font-medium leading-relaxed text-slate-200">
            Creative Strategies. Powerful Marketing. Measurable Results.
          </p>

          <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-slate-400">
            An international creative and performance marketing studio engineering high-converting campaigns, commercial video production, and bespoke digital flagships for ambitious brands.
          </p>

          {/* Dual Hero CTA row */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onPrimaryCta}
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white cta-glow whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Let&apos;s Grow Your Business</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onSecondaryCta}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/15 bg-[#11111B]/80 px-7 py-3.5 text-sm font-semibold text-slate-100 hover:border-violet-400/50 hover:bg-[#171726] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Our Work</span>
            </button>
          </div>

          {/* Clean unboxed discipline overview strip (zero pills) */}
          <div className="mt-14 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-400">
              <span>Performance Marketing</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Meta &amp; Google Ads</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Video Production</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Web &amp; Brand Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <a
        href="#services"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
        }}
        aria-label="Scroll to services section"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors sm:inline-flex"
      >
        <span>Scroll to explore</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
