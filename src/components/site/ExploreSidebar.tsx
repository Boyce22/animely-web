import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  BellIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  Squares2X2Icon,
  TrophyIcon,
} from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import i18n from "@/i18n"
import { cn } from "@/lib/utils"

const LANGUAGES = [
  { code: "en", native: "English", flag: "🇺🇸" },
  { code: "pt", native: "Português", flag: "🇧🇷" },
  { code: "es", native: "Español", flag: "🇪🇸" },
] as const

type LangCode = "en" | "pt" | "es"

function changeLang(code: LangCode) {
  i18n.changeLanguage(code)
  try { localStorage.setItem("animely-lang", code) } catch { /* noop */ }
}

const BASE_NAV = [
  { icon: HomeIcon, key: "feed", href: "/feed", tKey: "home.sidebar_home" },
  { icon: NewspaperIcon, key: "posts", href: "/posts", tKey: "explore.nav_posts" },
  { icon: GlobeAltIcon, key: "explore", href: "/catalog?type=anime", tKey: "home.sidebar_explore" },
  { icon: BookmarkIcon, key: "my_lists", href: "/profile", tKey: "explore.nav_my_lists" },
] as const

const LISTS_SUBNAV = [
  { icon: ClockIcon, key: "watching", href: "/profile", tKey: "explore.nav_watching", count: 23 },
  { icon: BookmarkIcon, key: "want_to_watch", href: "/profile", tKey: "explore.nav_want_to_watch", count: 57 },
  { icon: CheckCircleIcon, key: "completed", href: "/profile", tKey: "explore.nav_completed", count: 128 },
  { icon: HeartIcon, key: "favorites", href: "/profile", tKey: "explore.nav_favorites", count: 19 },
] as const

const DISCUSSION_SUBNAV = [
  { icon: ChatBubbleLeftIcon, key: "discussions_feed", href: "/explore?section=discussions", tKey: "explore.nav_discussions" },
  { icon: Squares2X2Icon, key: "community", href: "/explore?section=community", tKey: "explore.nav_community" },
  { icon: TrophyIcon, key: "rankings", href: "/explore?section=ranking", tKey: "explore.nav_rankings" },
] as const

const UTILITY_NAV = [
  { icon: BellIcon, key: "notifications", href: "/profile", tKey: "explore.nav_notifications", badge: 3 },
  { icon: DocumentTextIcon, key: "changelog", href: "/changelog", tKey: "explore.nav_changelog" },
] as const

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  active: boolean
  dot?: boolean
  badge?: number
  count?: number
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="overflow-hidden whitespace-nowrap px-5 pb-1.5 pt-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/15 opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-h-8 group-hover/sidebar:opacity-100">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="my-2 h-px bg-white/[0.07]" />
}

function NavItem({ icon: Icon, label, href, active, dot, badge, count }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 border-l-2 px-3.5 py-[9px] text-[13px] font-medium transition-all duration-150",
        active
          ? "border-primary bg-primary/[0.06] text-foreground"
          : "border-transparent text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
      )}
    >
      <Icon className="h-[15px] w-[15px] flex-shrink-0" />
      <span className="max-w-0 flex-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[140px] group-hover/sidebar:opacity-100">
        {label}
      </span>
      {dot && (
        <span className="h-1.5 w-1.5 max-w-0 flex-shrink-0 overflow-hidden rounded-full bg-primary opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[10px] group-hover/sidebar:opacity-100" />
      )}
      {badge !== undefined && (
        <span className="min-w-[18px] max-w-0 flex-shrink-0 overflow-hidden whitespace-nowrap bg-primary px-1.5 py-px text-center text-[10px] font-bold leading-tight text-white opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[30px] group-hover/sidebar:opacity-100">
          {badge}
        </span>
      )}
      {count !== undefined && (
        <span className="max-w-0 flex-shrink-0 overflow-hidden whitespace-nowrap font-mono text-[11px] font-semibold text-white/20 opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[30px] group-hover/sidebar:opacity-100">
          {count}
        </span>
      )}
    </Link>
  )
}

export function ExploreSidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const currentLang = LANGUAGES.find(lang => lang.code === i18n.language) ?? LANGUAGES[0]
  const section = new URLSearchParams(location.search).get("section") ?? "discussions"

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const activeRoot =
    location.pathname === "/catalog" ? "explore" :
    location.pathname === "/profile" ? "my_lists" :
    location.pathname === "/explore" ? "discussions" :
    location.pathname.startsWith("/posts") ? "posts" :
    (location.pathname === "/feed" || location.pathname === "/") ? "feed" :
    ""

  const isActive = (key: string, href: string) => {
    if (key === "feed") return location.pathname === "/" || location.pathname === "/feed"
    if (key === "posts") return location.pathname === "/posts" || location.pathname.startsWith("/posts/")
    if (key === "explore") return location.pathname === "/catalog"
    if (key === "my_lists") return location.pathname === "/profile"
    if (key === "discussions") return location.pathname === "/explore"
    if (key === "discussions_feed") return location.pathname === "/explore" && section === "discussions"
    if (key === "community") return location.pathname === "/explore" && section === "community"
    if (key === "rankings") return location.pathname === "/explore" && section === "ranking"
    if (key === "changelog") return location.pathname === "/changelog"
    const [path] = href.split("?")
    return location.pathname === path
  }

  const contextualNav =
    activeRoot === "my_lists" ? { label: t("explore.nav_my_lists"), items: LISTS_SUBNAV } :
    activeRoot === "discussions" ? { label: t("explore.nav_discussions"), items: DISCUSSION_SUBNAV } :
    null

  return (
    <div className="group/sidebar relative z-50 h-screen w-[52px] flex-shrink-0">
      <aside className="absolute left-0 top-0 flex h-full w-[52px] flex-col overflow-hidden border-r border-white/[0.07] bg-background transition-[width] duration-200 group-hover/sidebar:w-[220px]">
        <div className="flex flex-shrink-0 items-center border-b border-white/[0.07] px-3.5 py-5">
          <span className="flex items-center text-xl font-black tracking-[-0.5px]">
            <span className="text-primary">A</span>
            <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-200 delay-75 group-hover/sidebar:max-w-[80px]">
              nimely
            </span>
          </span>
        </div>

        <div className="mx-2 my-3 flex flex-shrink-0 items-center gap-2 border border-white/[0.07] bg-[#161616] px-2.5 py-2">
          <MagnifyingGlassIcon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/50" />
          <input
            type="text"
            placeholder={t("header.search_placeholder")}
            className="w-0 max-w-0 overflow-hidden border-none bg-transparent text-[12px] text-foreground opacity-0 outline-none transition-all duration-200 delay-75 placeholder:text-muted-foreground/40 group-hover/sidebar:w-full group-hover/sidebar:max-w-[140px] group-hover/sidebar:opacity-100"
          />
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-hide pt-1">
          {BASE_NAV.map(({ icon, key, href, tKey }) => (
            <NavItem
              key={key}
              icon={icon}
              label={t(tKey)}
              href={href}
              active={isActive(key, href)}
            />
          ))}

          {contextualNav && (
            <>
              <Divider />
              <SectionLabel>{contextualNav.label}</SectionLabel>
              {contextualNav.items.map(({ icon, key, href, tKey, ...rest }) => (
                <NavItem
                  key={key}
                  icon={icon}
                  label={t(tKey)}
                  href={href}
                  active={isActive(key, href)}
                  {...rest}
                />
              ))}
            </>
          )}

          <Divider />
          <SectionLabel>{t("explore.nav_activities")}</SectionLabel>
          {UTILITY_NAV.map(({ icon, key, href, tKey, badge }) => (
            <NavItem
              key={key}
              icon={icon}
              label={t(tKey)}
              href={href}
              active={isActive(key, href)}
              badge={badge}
            />
          ))}
        </nav>

        <div className="relative flex-shrink-0 border-t border-white/[0.07] px-3 py-2.5" ref={langRef}>
          <button
            onClick={() => setLangOpen(open => !open)}
            className={cn(
              "flex w-full items-center justify-between rounded-md border bg-transparent px-2.5 py-[7px] text-[12px] font-semibold transition-all",
              langOpen
                ? "border-white/20 text-foreground"
                : "border-white/[0.07] text-muted-foreground hover:border-white/20 hover:text-foreground",
            )}
          >
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0">{currentLang.flag}</span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[80px] group-hover/sidebar:opacity-100">
                {currentLang.native}
              </span>
            </div>
            <ChevronDownIcon
              className={cn(
                "h-3 w-3 max-w-0 flex-shrink-0 overflow-hidden opacity-0 transition-all duration-200 group-hover/sidebar:max-w-[12px] group-hover/sidebar:opacity-100",
                langOpen && "rotate-180",
              )}
            />
          </button>

          {langOpen && (
            <div className="absolute bottom-full left-3 right-3 z-50 mb-1.5 overflow-hidden rounded-sm border border-border bg-card shadow-2xl shadow-black/60">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { changeLang(lang.code); setLangOpen(false) }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-xs transition-colors",
                    i18n.language === lang.code
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.native}</span>
                  {i18n.language === lang.code && (
                    <span className="ml-auto text-[9px] font-black text-primary">OK</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-shrink-0 cursor-pointer items-center gap-2.5 border-t border-white/[0.07] px-3 py-3.5 transition-colors hover:bg-white/[0.03]">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#6930c3] text-[12px] font-black text-white">
            K
          </div>
          <div className="min-w-0 max-w-0 overflow-hidden opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[140px] group-hover/sidebar:opacity-100">
            <p className="mb-0.5 whitespace-nowrap text-[13px] font-bold leading-none text-foreground">kurumi_fan</p>
            <p className="whitespace-nowrap text-[11px] text-muted-foreground/60">Pro · 847 eps</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
