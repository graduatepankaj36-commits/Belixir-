import { ArrowUpRight, Image as ImageIcon, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { PORTFOLIO_PROJECTS, type PortfolioProject } from '../data/agencyData';

type CategoryFilter = 'All' | 'Performance' | 'Production' | 'Web & Brand';

const FILTERS: CategoryFilter[] = ['All', 'Performance', 'Production', 'Web & Brand'];

interface PortfolioSectionProps {
  onStartSimilarProject: (projectTitle: string) => void;
}

export function PortfolioSection({ onStartSimilarProject }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleProjects =
    activeFilter === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  return (
    <section id="portfolio" className="relative bg-[#06060A] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/25 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-violet-400">Selected Work</p>
            <h2
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Creative craft engineered for commercial momentum.
            </h2>
          </div>

          {/* Interactive category filter control */}
          <div
            role="tablist"
            aria-label="Filter portfolio projects"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0D0D15] p-1"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visibleProjects.map((project, idx) => {
            const hasFailed = failedImages[project.id];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="glass-surface glass-surface-hover group overflow-hidden rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="block w-full text-left cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D0D17]">
                    {!hasFailed ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-950/50 via-[#0E0E18] to-sky-950/40 p-6 text-center">
                        <ImageIcon className="h-8 w-8 text-violet-400" aria-hidden="true" />
                        <span className="font-display text-sm font-semibold text-white">
                          {project.title}
                        </span>
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#08080E] via-[#08080E]/20 to-transparent opacity-80"
                    />
                  </div>

                  <div className="p-7">
                    {/* Unboxed clean metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-medium text-sky-400">{project.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.year}</span>
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-violet-200 transition-colors">
                        {project.title}
                      </h3>
                      <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors group-hover:border-violet-400/50 group-hover:bg-violet-500/20 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {project.summary}
                    </p>

                    <div className="mt-5 border-t border-white/10 pt-4 text-xs text-slate-400">
                      <span>Deliverable: </span>
                      <span className="text-slate-200">{project.deliverableHighlight}</span>
                    </div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-surface relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0B0B13] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-medium text-sky-400">{selectedProject.sector}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{selectedProject.year}</span>
                </div>
                <h3
                  id="project-modal-title"
                  className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#07070C]">
              {!failedImages[selectedProject.id] ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  referrerPolicy="no-referrer"
                  className="aspect-[16/10] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-violet-950/50 to-sky-950/40">
                  <ImageIcon className="h-10 w-10 text-violet-400" aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold tracking-wide text-violet-300">
                  Project Scope
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                  {selectedProject.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 border-y border-white/10 py-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-sky-400">
                    Deliverable Architecture
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-200">
                    {selectedProject.deliverableHighlight}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-sky-400">
                    Creative Direction
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-200">
                    {selectedProject.creativeDirection}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  {selectedProject.scope.map((item, i) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      {i > 0 && <span aria-hidden="true">·</span>}
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onStartSimilarProject(title);
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white cta-glow whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Build a Similar Campaign</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
