export interface FeedMangaPanel {
  gradient: string
  label: string
  brightness?: number
  spanRow?: boolean
}

export interface FeedCardData {
  id: string
  type: "cinematic" | "manga" | "text" | "episode" | "spoiler"
  bgGradient: string
  mangaLayout?: "2x2" | "big-small" | "strip"
  panels?: FeedMangaPanel[]
  quoteBody?: React.ReactNode
  quoteBodyBebas?: boolean
  quoteSub?: string
  quoteScore?: number
  bgDecorCross?: boolean
  bgDecorHLines?: boolean
  customScrim?: string
  epTitle?: string
  epSubtitle?: string
  seriesTag?: string
  epTag?: string
  caption?: string
  hasSpoiler?: boolean
  spoilerSeriesLabel?: string
  user: { initial: string; gradient: string; username: string }
  timeAgo: string
  series: { gradient: string; initial: string }
  likes: number
  comments: number
  shares: number
  initialLiked?: boolean
}
