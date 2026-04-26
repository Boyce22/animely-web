import { useState } from "react"
import { useTranslation } from "react-i18next"
import { SparklesIcon } from "@heroicons/react/24/outline"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { cn } from "@/lib/utils"
import { Bug, Calendar, CheckCircle2, Clock, Scroll } from "lucide-react"

type Tab = "new_features" | "bug_fixes" | "coming_soon" | "full_changelog"
type Severity = "High" | "Medium" | "Low"

type NewFeature = {
  title: string
  desc: string
}

type BugFix = {
  title: string
  severity: Severity
}

type RoadmapItem = {
  title: string
  eta: string
  desc: string
}

type ChangelogEntry = {
  version: string
  date: string
  note: string
}

type ReleaseStat = {
  label: string
  value: string
}

const TABS: Tab[] = ["new_features", "bug_fixes", "coming_soon", "full_changelog"]

const newFeatures: NewFeature[] = [
  {
    title: "Enhanced Reading Experience",
    desc: "Reimagined reading interface with customizable layouts, improved zoom functionality, and adaptive color themes tailored for long sessions.",
  },
  {
    title: "Improved Performance",
    desc: "The app now loads 3× faster and uses 40% less memory, ensuring smooth scrolling and transitions even on older devices.",
  },
  {
    title: "Customizable Themes",
    desc: "Choose from a curated set of color palettes or build your own. Dark, light, sepia — your reading environment, your rules.",
  },
  {
    title: "Multi-language Support",
    desc: "Animely now supports 12 additional languages including Portuguese, Spanish, French, German, and Korean.",
  },
  {
    title: "Enhanced Privacy Controls",
    desc: "Full control over your reading history and activity visibility. Share what you want, keep the rest private.",
  },
  {
    title: "New Rating & Review System",
    desc: "Rate titles with precision using a 10-point scale. Write reviews, react to others', and see community consensus at a glance.",
  },
]

const bugFixes: BugFix[] = [
  { title: "Fixed scroll sync between chapters on mobile", severity: "High" },
  { title: "Resolved chapter navigation breaking on certain titles", severity: "High" },
  { title: "Fixed search not returning results for Japanese titles", severity: "Medium" },
  { title: "Corrected image aspect ratio on ultrawide screens", severity: "Medium" },
  { title: "Fixed notification badge not clearing after read", severity: "Low" },
  { title: "Resolved memory leak on long reading sessions", severity: "High" },
  { title: "Fixed bookmark sync across devices", severity: "Medium" },
  { title: "Corrected timezone display in activity feed", severity: "Low" },
]

const comingSoon: RoadmapItem[] = [
  {
    title: "Manga Reader v3",
    eta: "Q3 2025",
    desc: "A completely rebuilt reader with panel-by-panel mode, gesture navigation, and AI-assisted translation previews.",
  },
  {
    title: "Social Features",
    eta: "Q3 2025",
    desc: "Follow friends, share reading progress, and discuss chapters in real-time with built-in spoiler protection.",
  },
  {
    title: "AI Recommendations",
    eta: "Q4 2025",
    desc: "A smart engine that learns your taste and surfaces titles you'd never find on your own.",
  },
  {
    title: "Creator Studio",
    eta: "Q4 2025",
    desc: "Tools for independent creators to publish, monetize, and grow an audience directly on Animely.",
  },
]

const changelogEntries: ChangelogEntry[] = [
  { version: "2.0.1", date: "June 20, 2025", note: "Hotfix — resolved critical scroll bug on iOS 17." },
  { version: "2.0.0", date: "June 15, 2025", note: "Major release. Enhanced reader, new rating system, 12 languages, and performance overhaul." },
  { version: "1.9.4", date: "May 30, 2025", note: "Search improvements and collection sharing." },
  { version: "1.9.3", date: "May 14, 2025", note: "Fixed broken chapter links and improved CDN fallback." },
  { version: "1.9.2", date: "April 28, 2025", note: "New theme engine preview and WCAG contrast fixes." },
  { version: "1.9.1", date: "April 10, 2025", note: "Reduced bundle size by 22%. Minor UI polish." },
]

const releaseStats: ReleaseStat[] = [
  { label: "build", value: "2.0.1" },
  { label: "updates", value: "18" },
  { label: "fixes", value: "8" },
  { label: "next_update", value: "Q3 2025" },
]

const severityCounts: Record<Severity, number> = {
  High: bugFixes.filter(item => item.severity === "High").length,
  Medium: bugFixes.filter(item => item.severity === "Medium").length,
  Low: bugFixes.filter(item => item.severity === "Low").length,
}

const SEVERITY_COLOR: Record<Severity, string> = {
  High: "text-primary border-primary/30 bg-primary/10",
  Medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  Low: "text-muted-foreground border-border bg-secondary",
}

function SectionIntro({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-8 flex items-start gap-3 border-b border-white/[0.07] pb-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/15 bg-primary/8">
        <Icon className="h-4 w-4 text-primary-soft" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

export default function Changelog() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<Tab>("new_features")

  const roadmapPhases = [...new Set(comingSoon.map(item => item.eta))]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ExploreSidebar />

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="relative h-[400px] w-full overflow-hidden">
          <img
            src="https://konachan.com/jpeg/f012828b634caadf3d8a0bf2bdd75e9b/Konachan.com%20-%20386343%202girls%20animal%20aqua_eyes%20blush%20breasts%20cleavage%20crossover%20dress%20fang%20long_hair%20nopan%20ponytail%20red_hair%20snake%20stockings%20tattoo%20thighhighs%20watermark.jpg"
            alt="Animely 2.0"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />

          <div className="absolute inset-0 flex max-w-3xl flex-col justify-end px-6 pb-12 lg:px-16">
            <span className="section-label text-primary-soft mb-4 block">{t("news.release_notes")}</span>
            <h1 className="mb-3 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              {t("news.release_title")}
            </h1>
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-white/60">
              {t("news.release_desc")}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-white/40">
              <Calendar className="h-3 w-3" />
              {t("news.released_on")}
            </p>
          </div>
        </div>

        <div className="sticky top-0 z-40 border-b border-white/[0.07] bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="grid gap-0 border-x border-white/[0.07] md:grid-cols-4">
              {releaseStats.map(stat => (
                <div key={t(`news.${stat.label}`)} className="border-b border-white/[0.07] px-4 py-3 md:border-b-0 md:border-r md:last:border-r-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">{t(`news.${stat.label}`)}</p>
                  <p className="mt-1 text-lg font-black text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {TABS.map(tabKey => (
                <button
                  key={tabKey}
                  onClick={() => setTab(tabKey)}
                  className={cn(
                    "shrink-0 whitespace-nowrap border px-4 py-2 text-sm font-medium transition-colors",
                    tab === tabKey
                      ? "border-white/20 bg-white/[0.06] text-foreground"
                      : "border-white/[0.07] text-muted-foreground hover:border-white/20 hover:text-foreground",
                  )}
                >
                  {t(`news.tab_${tabKey}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1120px] px-6 py-10">
          {tab === "new_features" && (
            <section>
              <SectionIntro
                icon={SparklesIcon}
                title={t("news.new_features_title")}
                subtitle={t("news.new_features_subtitle")}
              />
              <div className="grid gap-0 border border-white/[0.07]">
                {newFeatures.map(({ title, desc }, index) => (
                  <div
                    key={title}
                    className="grid gap-3 border-b border-white/[0.07] px-4 py-5 last:border-b-0 md:grid-cols-[72px_260px_minmax(0,1fr)] md:items-start md:px-6"
                  >
                    <div className="flex items-center">
                      <span className="w-10 text-[12px] font-mono font-bold text-white/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="pt-1 text-sm font-semibold text-foreground">{title}</h4>
                    <p className="pt-1 text-sm leading-6 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "bug_fixes" && (
            <section>
              <SectionIntro
                icon={Bug}
                title={t("news.bug_fixes_title")}
                subtitle={t("news.bug_fixes_subtitle")}
              />

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {(["High", "Medium", "Low"] as const).map(level => (
                  <div key={level} className="flex items-center justify-between border border-white/[0.07] bg-card px-5 py-4">
                    <p className="text-sm font-medium text-muted-foreground">{t(`news.${level.toLowerCase()}_severity`)}</p>
                    <p className="text-2xl font-black text-foreground">{severityCounts[level]}</p>
                  </div>
                ))}
              </div>

              <div className="border border-white/[0.07] bg-card">
                {bugFixes.map(({ title, severity }, index) => (
                  <div
                    key={title}
                    className={cn(
                      "flex items-center justify-between gap-4 px-5 py-4",
                      index !== bugFixes.length - 1 && "border-b border-white/[0.07]",
                    )}
                  >
                    <div className="min-w-0">
                      <span className="truncate text-sm text-foreground">{title}</span>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 border px-2.5 py-1 text-[11px] font-semibold",
                        SEVERITY_COLOR[severity],
                      )}
                    >
                      {t(`news.${severity.toLowerCase()}_severity`)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "coming_soon" && (
            <section>
              <SectionIntro
                icon={Clock}
                title={t("news.coming_soon_title")}
                subtitle={t("news.coming_soon_subtitle")}
              />

              <div className="grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
                <div className="border border-white/[0.07] bg-card px-5 py-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/80">Roadmap</p>
                  <p className="mt-3 text-2xl font-black text-foreground">2.1+</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t("news.coming_soon_sidebar_desc")}
                  </p>
                  <div className="mt-6 space-y-3">
                    {roadmapPhases.map(phase => (
                      <div key={phase}>
                        <span className="text-sm font-semibold text-foreground">{phase}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {roadmapPhases.map(phase => {
                    const phaseItems = comingSoon.filter(item => item.eta === phase)
                    return (
                      <div key={phase} className="border border-white/[0.07] bg-card">
                        <div className="border-b border-white/[0.07] px-5 py-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/80">{phase}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {phaseItems.length} {t("news.planned_deliveries")}
                          </p>
                        </div>
                        <div className="divide-y divide-white/[0.07]">
                          {phaseItems.map(({ title, eta, desc }) => (
                            <div key={title} className="px-5 py-5">
                              <div className="min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                  <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                                  <span className="shrink-0 border border-primary/20 bg-primary/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary/80">
                                    {eta}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                                <p className="mt-3 text-[11px] text-muted-foreground/60">{t("news.in_development")}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {tab === "full_changelog" && (
            <section>
              <SectionIntro
                icon={Scroll}
                title={t("news.changelog_title")}
                subtitle={t("news.changelog_subtitle")}
              />
              <div className="border border-white/[0.07] bg-card">
                {changelogEntries.map(({ version, date, note }, index) => (
                  <div
                    key={version}
                    className={cn(
                      "grid gap-2 px-5 py-5 md:grid-cols-[120px_180px_minmax(0,1fr)] md:items-baseline md:gap-0",
                      index !== changelogEntries.length - 1 && "border-b border-white/[0.07]",
                    )}
                  >
                    <p className="font-mono text-sm font-bold text-primary-soft">{version}</p>
                    <p className="text-[11px] text-muted-foreground">{date}</p>
                    <p className="text-sm leading-relaxed text-foreground">{note}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
