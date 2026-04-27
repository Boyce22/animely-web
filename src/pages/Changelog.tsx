import React, { useEffect, useState, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExploreSidebar } from '@/components/site/ExploreSidebar'
import {
  SparklesIcon,
  BugAntIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
type Severity = 'High' | 'Medium' | 'Low'
const newFeatures = [
  {
    title: 'Enhanced Reading Experience',
    desc: 'Reimagined reading interface with customizable layouts, improved zoom functionality, and adaptive color themes tailored for long sessions.',
  },
  {
    title: 'Improved Performance',
    desc: 'The app now loads 3× faster and uses 40% less memory, ensuring smooth scrolling and transitions even on older devices.',
  },
  {
    title: 'Customizable Themes',
    desc: 'Choose from a curated set of color palettes or build your own. Dark, light, sepia — your reading environment, your rules.',
  },
  {
    title: 'Multi-language Support',
    desc: 'Animely now supports 12 additional languages including Portuguese, Spanish, French, German, and Korean.',
  },
  {
    title: 'Enhanced Privacy Controls',
    desc: 'Full control over your reading history and activity visibility. Share what you want, keep the rest private.',
  },
  {
    title: 'New Rating & Review System',
    desc: "Rate titles with precision using a 10-point scale. Write reviews, react to others', and see community consensus at a glance.",
  },
]
const bugFixes: {
  title: string
  severity: Severity
}[] = [
  {
    title: 'Fixed scroll sync between chapters on mobile',
    severity: 'High',
  },
  {
    title: 'Resolved chapter navigation breaking on certain titles',
    severity: 'High',
  },
  {
    title: 'Fixed search not returning results for Japanese titles',
    severity: 'Medium',
  },
  {
    title: 'Corrected image aspect ratio on ultrawide screens',
    severity: 'Medium',
  },
  {
    title: 'Fixed notification badge not clearing after read',
    severity: 'Low',
  },
  {
    title: 'Resolved memory leak on long reading sessions',
    severity: 'High',
  },
  {
    title: 'Fixed bookmark sync across devices',
    severity: 'Medium',
  },
  {
    title: 'Corrected timezone display in activity feed',
    severity: 'Low',
  },
]
const roadmap = [
  {
    title: 'Manga Reader v3',
    eta: 'Q3 2025',
    desc: 'A completely rebuilt reader with panel-by-panel mode, gesture navigation, and AI-assisted translation previews.',
  },
  {
    title: 'Social Features',
    eta: 'Q3 2025',
    desc: 'Follow friends, share reading progress, and discuss chapters in real-time with built-in spoiler protection.',
  },
  {
    title: 'AI Recommendations',
    eta: 'Q4 2025',
    desc: "A smart engine that learns your taste and surfaces titles you'd never find on your own.",
  },
  {
    title: 'Creator Studio',
    eta: 'Q4 2025',
    desc: 'Tools for independent creators to publish, monetize, and grow an audience directly on Animely.',
  },
]
const changelog = [
  {
    version: '2.0.1',
    date: 'June 20, 2025',
    note: 'Hotfix — resolved critical scroll bug on iOS 17.',
  },
  {
    version: '2.0.0',
    date: 'June 15, 2025',
    note: 'Major release. Enhanced reader, new rating system, 12 languages, and performance overhaul.',
  },
  {
    version: '1.9.4',
    date: 'May 30, 2025',
    note: 'Search improvements and collection sharing.',
  },
  {
    version: '1.9.3',
    date: 'May 14, 2025',
    note: 'Fixed broken chapter links and improved CDN fallback.',
  },
  {
    version: '1.9.2',
    date: 'April 28, 2025',
    note: 'New theme engine preview and WCAG contrast fixes.',
  },
  {
    version: '1.9.1',
    date: 'April 10, 2025',
    note: 'Reduced bundle size by 22%. Minor UI polish.',
  },
]
const stats = [
  {
    label: 'Build',
    value: '2.0.1',
  },
  {
    label: 'Updates',
    value: '18',
  },
  {
    label: 'Fixes',
    value: '8',
  },
  {
    label: 'Next Update',
    value: 'Q3 2025',
  },
]
const severityConfig: Record<
  Severity,
  {
    color: string
    dot: string
  }
> = {
  High: {
    color: 'text-red-400',
    dot: 'bg-red-400',
  },
  Medium: {
    color: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  Low: {
    color: 'text-zinc-500',
    dot: 'bg-zinc-500',
  },
}
const sectionNav = [
  {
    id: 'features',
    label: 'New Features',
    icon: SparklesIcon,
  },
  {
    id: 'fixes',
    label: 'Bug Fixes',
    icon: BugAntIcon,
  },
  {
    id: 'roadmap',
    label: 'Coming Soon',
    icon: ClockIcon,
  },
  {
    id: 'changelog',
    label: 'Changelog',
    icon: DocumentTextIcon,
  },
]
const SECTION_IDS = sectionNav.map(({ id }) => id)

export default function Changelog() {
  const [activeSection, setActiveSection] = useState('features')
  const scrollContainerRef = useRef<HTMLElement>(null)
  const isClickScrolling = useRef(false)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let frame = 0

    const updateActiveSection = () => {
      if (isClickScrolling.current) return

      const remainingScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight - scrollContainer.scrollTop

      if (remainingScroll <= 12) {
        setActiveSection('changelog')
        return
      }

      const marker = scrollContainer.getBoundingClientRect().top + 150
      let nextSection = SECTION_IDS[0]

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id)
        if (!section) continue

        if (section.getBoundingClientRect().top <= marker) {
          nextSection = id
        }
      }

      setActiveSection(nextSection)
    }

    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      cancelAnimationFrame(frame)
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    isClickScrolling.current = true
    const el = document.getElementById(id)
    if (el)
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    // Release lock after scroll animation settles
    setTimeout(() => {
      isClickScrolling.current = false
    }, 800)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-foreground">
      <ExploreSidebar />

      <main ref={scrollContainerRef} className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-surface">
      {/* ─── Hero (kept) ─── */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <img
          src="https://konachan.com/jpeg/f012828b634caadf3d8a0bf2bdd75e9b/Konachan.com%20-%20386343%202girls%20animal%20aqua_eyes%20blush%20breasts%20cleavage%20crossover%20dress%20fang%20long_hair%20nopan%20ponytail%20red_hair%20snake%20stockings%20tattoo%20thighhighs%20watermark.jpg"
          alt="Animely 2.0"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/20 to-transparent" />

        <div className="absolute inset-0 flex max-w-3xl flex-col justify-end px-6 pb-14 lg:px-16">
          <span className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-soft">
            <SparklesIcon className="h-3.5 w-3.5" />
            Release Notes
          </span>
          <h1 className="mb-3 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Animely 2.0
          </h1>
          <p className="mb-4 max-w-sm text-sm leading-relaxed text-white/60">
            A major update packed with new features, performance improvements,
            and a refined experience across the board.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/40">
            <CalendarIcon className="h-3 w-3" />
            Released June 15, 2025
          </p>
        </div>

        {/* Stats overlay — bottom right */}
        <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-px rounded-md overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-2.5 ${i !== stats.length - 1 ? 'border-r border-white/[0.08]' : ''}`}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/30">
                {s.label}
              </p>
              <p className="mt-0.5 font-mono text-sm font-bold text-white/85">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Sticky nav ─── */}
      <div className="sticky top-0 z-40 border-b border-white/[0.07] bg-surface/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6">
          {/* Section nav */}
          <div className="flex items-center gap-1 py-2">
            {sectionNav.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeSection === id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-md bg-white/[0.06]"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="mx-auto max-w-5xl px-6 py-12 space-y-20">
        {/* ── New Features ── */}
        <section id="features">
          <SectionHeader
            icon={SparklesIcon}
            title="What's New"
            subtitle="6 new features designed to elevate your reading experience."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-40px',
                }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                }}
                className="group relative rounded-lg border border-white/[0.07] bg-surface-card p-5 transition-colors hover:border-white/[0.12] hover:bg-surface-hover"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-accent/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="mb-2 text-sm font-semibold text-white">
                  {f.title}
                </h4>
                <p className="text-[13px] leading-relaxed text-white/45">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Bug Fixes ── */}
        <section id="fixes">
          <SectionHeader
            icon={BugAntIcon}
            title="Bug Fixes"
            subtitle="8 issues resolved in this release."
          />

          {/* Severity summary */}
          <div className="mb-5 flex items-center gap-5">
            {(['High', 'Medium', 'Low'] as const).map((level) => {
              const count = bugFixes.filter((b) => b.severity === level).length
              return (
                <div key={level} className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${severityConfig[level].dot}`}
                  />
                  <span className="text-xs text-white/40">{level}</span>
                  <span className="font-mono text-xs font-bold text-white/70">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="rounded-lg border border-white/[0.07] bg-surface-card overflow-hidden">
            {bugFixes.map((bug, i) => (
              <motion.div
                key={bug.title}
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.03,
                }}
                className={`flex items-center justify-between gap-4 px-5 py-3.5 ${i !== bugFixes.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircleIcon className="h-4 w-4 shrink-0 text-emerald-500/60" />
                  <span className="truncate text-sm text-white/80">
                    {bug.title}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${severityConfig[bug.severity].color} bg-white/[0.04]`}
                >
                  {bug.severity}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section id="roadmap">
          <SectionHeader
            icon={ClockIcon}
            title="Coming Soon"
            subtitle="A look at what's next for Animely."
          />

          <div className="relative space-y-0">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/[0.07]" />

            {roadmap.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-40px',
                }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                }}
                className="relative flex gap-5 py-5"
              >
                {/* Timeline dot */}
                <div className="relative z-10 mt-1.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-accent/20 bg-surface">
                  <div className="h-2 w-2 rounded-full bg-accent/60" />
                </div>

                <div className="flex-1 rounded-lg border border-white/[0.07] bg-surface-card p-5 transition-colors hover:border-white/[0.12]">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-white">
                      {item.title}
                    </h4>
                    <span className="shrink-0 rounded border border-accent/20 bg-accent/[0.06] px-2 py-0.5 font-mono text-[10px] font-bold text-accent-soft">
                      {item.eta}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/45">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Full Changelog ── */}
        <section id="changelog">
          <SectionHeader
            icon={DocumentTextIcon}
            title="Full Changelog"
            subtitle="Complete version history."
          />

          <div className="rounded-lg border border-white/[0.07] bg-surface-card overflow-hidden">
            {changelog.map((entry, i) => (
              <motion.div
                key={entry.version}
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.04,
                }}
                className={`grid gap-1 px-5 py-4 sm:grid-cols-[80px_140px_1fr] sm:items-baseline sm:gap-4 ${i !== changelog.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <span className="font-mono text-sm font-bold text-accent/70">
                  {entry.version}
                </span>
                <span className="text-xs text-white/30">{entry.date}</span>
                <span className="text-sm leading-relaxed text-white/65">
                  {entry.note}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer spacer */}
        <div className="h-8" />
      </div>
      </main>
    </div>
  )
}
/* ─── Shared ─── */
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/15 bg-accent/[0.06]">
        <Icon className="h-4 w-4 text-accent-soft" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-xs text-white/35">{subtitle}</p>
      </div>
    </div>
  )
}
