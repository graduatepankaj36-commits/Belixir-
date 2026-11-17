import { Check, Pencil, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_RESULTS_METRICS, type EditableMetric } from '../data/agencyData';

const STORAGE_KEY = 'belixir_editable_benchmarks_v1';

function AnimatedCounter({
  value,
  decimals,
  prefix,
  suffix,
  triggerKey,
  shouldAnimate,
}: {
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  triggerKey: number;
  shouldAnimate: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !shouldAnimate) {
      setDisplayValue(value);
      return;
    }

    let rafId = 0;
    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, triggerKey, shouldAnimate]);

  const formatted = displayValue.toFixed(decimals);

  return (
    <span className="font-mono font-semibold tabular-nums text-white">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function ResultsSection() {
  const [metrics, setMetrics] = useState<EditableMetric[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === DEFAULT_RESULTS_METRICS.length) {
          return parsed;
        }
      }
    } catch {
      // ignore storage read issues
    }
    return DEFAULT_RESULTS_METRICS;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [inView, setInView] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const persistMetrics = (next: EditableMetric[]) => {
    setMetrics(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage write issues
    }
  };

  const handleFieldChange = (
    id: string,
    field: keyof EditableMetric,
    rawValue: string,
  ) => {
    const next = metrics.map((m) => {
      if (m.id !== id) return m;
      if (field === 'value') {
        const parsed = Number.parseFloat(rawValue);
        const safeNum = Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
        const hasDecimal = rawValue.includes('.') && !rawValue.endsWith('.');
        return {
          ...m,
          value: safeNum,
          decimals: hasDecimal ? Math.min(2, rawValue.split('.')[1]?.length || 1) : 0,
        };
      }
      return { ...m, [field]: rawValue };
    });
    persistMetrics(next);
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setTriggerKey((k) => k + 1);
    }
    setIsEditing((prev) => !prev);
  };

  const handleReset = () => {
    persistMetrics(DEFAULT_RESULTS_METRICS);
    setTriggerKey((k) => k + 1);
  };

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative bg-[#08080E] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-sky-400">Performance Benchmarks</p>
            <h2
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Editable campaign targets and growth benchmarks.
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
              All figures below are editable placeholder benchmarks for modeling agency goals—click Edit Placeholders to customize numbers live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleToggleEdit}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isEditing
                  ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'
                  : 'border-white/15 bg-white/5 text-slate-200 hover:border-violet-400/50 hover:bg-white/10'
              }`}
            >
              {isEditing ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Done Editing</span>
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Edit Placeholders</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset placeholder numbers to defaults"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-white/10 bg-[#0D0D16] px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 4-column animated statistics grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="glass-surface flex flex-col justify-between rounded-2xl p-7"
            >
              {!isEditing ? (
                <>
                  <div>
                    <div className="text-4xl sm:text-5xl tracking-tight">
                      <AnimatedCounter
                        value={metric.value}
                        decimals={metric.decimals}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        triggerKey={triggerKey}
                        shouldAnimate={inView}
                      />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-slate-100">
                      {metric.label}
                    </h3>
                  </div>

                  <p className="mt-5 border-t border-white/10 pt-3 text-xs text-slate-400">
                    {metric.context}
                  </p>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <label className="block">
                      <span className="block text-[11px] text-slate-400">Prefix</span>
                      <input
                        type="text"
                        value={metric.prefix}
                        maxLength={4}
                        onChange={(e) => handleFieldChange(metric.id, 'prefix', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-[#07070C] px-2.5 py-1.5 font-mono text-xs text-white focus:border-violet-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-[11px] text-slate-400">Value</span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={metric.value}
                        onChange={(e) => handleFieldChange(metric.id, 'value', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-[#07070C] px-2.5 py-1.5 font-mono text-xs text-white tabular-nums focus:border-violet-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-[11px] text-slate-400">Suffix</span>
                      <input
                        type="text"
                        value={metric.suffix}
                        maxLength={6}
                        onChange={(e) => handleFieldChange(metric.id, 'suffix', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-[#07070C] px-2.5 py-1.5 font-mono text-xs text-white focus:border-violet-400 focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="block text-[11px] text-slate-400">Metric Label</span>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => handleFieldChange(metric.id, 'label', e.target.value)}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-[#07070C] px-3 py-1.5 text-xs text-white focus:border-violet-400 focus:outline-none"
                    />
                  </label>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
