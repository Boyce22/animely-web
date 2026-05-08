import type { ComponentType } from "react"
import {
  BookmarkIcon,
  BookOpenIcon,
  DocumentTextIcon,
  TvIcon,
} from "@heroicons/react/24/outline"
import type { MediaType, PeriodKey, SortKey } from "./catalogFilterTypes"

export const MEDIA_TABS: { key: MediaType; icon: ComponentType<{ className?: string }>; count: string }[] = [
  { key: "anime",       icon: TvIcon,           count: "3.2k" },
  { key: "manga",       icon: BookOpenIcon,     count: "8.4k" },
  { key: "light-novel", icon: DocumentTextIcon, count: "1.1k" },
  { key: "characters",  icon: BookmarkIcon,     count: "24k" },
]

export const MAIN_GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life",
]

export const SUB_GENRES = [
  "Martial Arts", "Cooking", "Sports", "School", "Isekai", "Mecha", "Military",
  "Music", "Psychological", "Supernatural", "Vampire", "Zombie",
  "Josei", "Seinen", "Shoujo", "Shounen",
  "Harem", "Mahou Shoujo", "Yaoi", "Yuri",
  "Dark Fantasy", "Dungeon", "Cyberpunk", "Steampunk", "Time Travel",
  "Gore", "Survival", "Historical", "Competition", "Detective",
  "Idol", "Mythology", "Ninja", "Pirate", "Reincarnation", "Samurai", "Yakuza",
]

export const ALL_GENRES = [...MAIN_GENRES, ...SUB_GENRES]

export const SORT_OPTIONS: { key: SortKey; tKey: string }[] = [
  { key: "popular", tKey: "catalog.sort_popular" },
  { key: "score",   tKey: "catalog.sort_score"   },
  { key: "recent",  tKey: "catalog.sort_recent"  },
  { key: "updated", tKey: "catalog.sort_updated" },
  { key: "az",      tKey: "catalog.sort_az"       },
]

export const PERIOD_PRESETS: { key: PeriodKey; tKey: string; sub?: string }[] = [
  { key: "all",     tKey: "catalog.period_all"    },
  { key: "season",  tKey: "catalog.period_season" },
  { key: "3m",      tKey: "catalog.period_3m"     },
  { key: "year",    tKey: "catalog.period_year"   },
  { key: "2020s",   tKey: "catalog.period_2020s", sub: "2020–today"   },
  { key: "2010s",   tKey: "catalog.period_2010s", sub: "2010–2019"    },
  { key: "classic", tKey: "catalog.period_classic", sub: "before 2010" },
]

export const STATUS_OPTIONS = ["status_ongoing", "status_completed", "status_hiatus", "status_cancelled"]
export const RATING_OPTIONS = ["rating_free", "rating_10", "rating_14", "rating_18"]
