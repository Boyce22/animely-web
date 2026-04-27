import { useState } from "react"
import { FeedCardActions } from "./FeedCardActions"
import {
  FeedCardBackground,
  FeedCardBottomInfo,
  FeedCardEpisodeContent,
  FeedCardProgressBar,
  FeedCardSpoilerVeil,
  FeedCardTextContent,
} from "./feed-card/FeedCardLayers"
import type { FeedCardData } from "./feed-card/feedCardTypes"

interface Props {
  data: FeedCardData
  onComment: () => void
  onShare: () => void
}

export function FeedCard({ data, onComment, onShare }: Props) {
  const [spoilerRevealed, setSpoilerRevealed] = useState(false)

  const isManga = data.type === "manga"
  const isText = data.type === "text"
  const isEpisode = data.type === "episode"
  const hasSpoiler = data.hasSpoiler && !spoilerRevealed

  return (
    <div className="relative h-screen overflow-hidden flex flex-col snap-start" style={{ background: "#0a0a0a" }}>
      <FeedCardBackground data={data} isManga={isManga} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: data.customScrim ?? "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 25%, transparent 45%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)" }}
      />

      {isText && <FeedCardTextContent data={data} />}
      {isEpisode && <FeedCardEpisodeContent data={data} />}
      {hasSpoiler && <FeedCardSpoilerVeil data={data} onReveal={() => setSpoilerRevealed(true)} />}
      {(data.seriesTag || data.caption || !isEpisode) && <FeedCardBottomInfo data={data} />}

      <div className="absolute z-[10]" style={{ right: 18, bottom: 140 }}>
        <FeedCardActions
          series={data.series}
          likes={data.likes}
          comments={data.comments}
          shares={data.shares}
          initialLiked={data.initialLiked}
          onComment={onComment}
          onShare={onShare}
        />
      </div>

      <FeedCardProgressBar />
    </div>
  )
}
