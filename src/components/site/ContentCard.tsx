import type { CSSProperties, KeyboardEvent, MouseEvent } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  ContentCardBackground,
  ContentCardBottomContent,
  ContentCardSpoilerOverlay,
  ContentCardUserBadge,
} from "./content-card/ContentCardParts"
import type { ContentCardData } from "./content-card/contentCardTypes"

interface Props {
  data: ContentCardData
  height?: number
  className?: string
  style?: CSSProperties
}

export function ContentCard({ data, height, className, style }: Props) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(data.initialLiked ?? false)
  const [likeCount, setLikeCount] = useState(data.likes)
  const [saved, setSaved] = useState(false)
  const [spoilerRevealed, setSpoilerRevealed] = useState(false)

  const handleLike = (e: MouseEvent) => {
    e.stopPropagation()
    setLiked(v => !v)
    setLikeCount(c => (liked ? c - 1 : c + 1))
  }

  const handleBookmark = (e: MouseEvent) => {
    e.stopPropagation()
    setSaved(v => !v)
  }

  const openContent = () => {
    navigate(data.href)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openContent()
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openContent}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative overflow-hidden cursor-pointer group flex-shrink-0 bg-[#111] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      style={{ height: height ?? "100%", ...style }}
    >
      <ContentCardBackground gradient={data.phGradient} />
      <ContentCardUserBadge user={data.user} badge={data.badge} />
      <ContentCardBottomContent
        data={data}
        liked={liked}
        likeCount={likeCount}
        saved={saved}
        onLike={handleLike}
        onBookmark={handleBookmark}
      />

      {data.hasSpoiler && !spoilerRevealed && (
        <ContentCardSpoilerOverlay onReveal={() => setSpoilerRevealed(true)} />
      )}
    </div>
  )
}
