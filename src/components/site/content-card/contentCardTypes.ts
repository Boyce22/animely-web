export interface ContentCardData {
  phGradient: string
  user: { initial: string; gradient: string; username: string }
  badge?: { type: "new" | "ep" | "score"; text: string }
  href: string
  series: string
  caption: string
  bigCaption?: boolean
  likes: number
  comments: number
  initialLiked?: boolean
  hasSpoiler?: boolean
  hasBookmark?: boolean
}
