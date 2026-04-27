import {
  BellIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  NewspaperIcon,
  Squares2X2Icon,
  TrophyIcon,
} from "@heroicons/react/24/outline"

export const LANGUAGES = [
  { code: "en", native: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "pt", native: "Portugu\u00EAs", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "es", native: "Espa\u00F1ol", flag: "\u{1F1EA}\u{1F1F8}" },
] as const

export type LangCode = (typeof LANGUAGES)[number]["code"]

export const BASE_NAV = [
  { icon: HomeIcon, key: "feed", href: "/feed", tKey: "home.sidebar_home" },
  { icon: NewspaperIcon, key: "posts", href: "/posts", tKey: "explore.nav_posts" },
  { icon: GlobeAltIcon, key: "explore", href: "/catalog?type=anime", tKey: "home.sidebar_explore" },
  { icon: BookmarkIcon, key: "my_lists", href: "/", tKey: "explore.nav_my_lists" },
] as const

export const LISTS_SUBNAV = [
  { icon: ClockIcon, key: "watching", href: "/profile", tKey: "explore.nav_watching", count: 23 },
  { icon: BookmarkIcon, key: "want_to_watch", href: "/profile", tKey: "explore.nav_want_to_watch", count: 57 },
  { icon: CheckCircleIcon, key: "completed", href: "/profile", tKey: "explore.nav_completed", count: 128 },
  { icon: HeartIcon, key: "favorites", href: "/profile", tKey: "explore.nav_favorites", count: 19 },
] as const

export const DISCUSSION_SUBNAV = [
  { icon: ChatBubbleLeftIcon, key: "discussions_feed", href: "/explore?section=discussions", tKey: "explore.nav_discussions" },
  { icon: Squares2X2Icon, key: "community", href: "/explore?section=community", tKey: "explore.nav_community" },
  { icon: TrophyIcon, key: "rankings", href: "/explore?section=ranking", tKey: "explore.nav_rankings" },
] as const

export const UTILITY_NAV = [
  { icon: BellIcon, key: "notifications", href: "/profile", tKey: "explore.nav_notifications", badge: 3 },
  { icon: DocumentTextIcon, key: "changelog", href: "/changelog", tKey: "explore.nav_changelog" },
] as const
