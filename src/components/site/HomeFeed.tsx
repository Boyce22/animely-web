import { useState } from "react"
import { Pencil } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { FeedPost, type FeedPostData } from "./FeedPost"

const MOCK_POSTS: FeedPostData[] = [
  {
    id: "1",
    user: { name: "Kageyama", username: "kageyama_fan", color: "#c0392b" },
    timeAgo: "2m",
    content:
      "Just finished the new Jujutsu Kaisen arc and I'm not okay. Gege really said no happy endings for anyone 😭 this series is emotionally exhausting and I can't stop",
    media: {
      title: "Jujutsu Kaisen",
      type: "manga",
      genre: "Action · Supernatural",
      score: 9.1,
      accentColor: "#8e44ad",
    },
    likes: 284,
    comments: 47,
  },
  {
    id: "2",
    user: { name: "Dark Aesthetic", username: "dark_aesthetic", color: "#2c3e50" },
    timeAgo: "14m",
    action: "recommended",
    content:
      "If you haven't read Berserk yet, what are you even doing with your life. Absolute masterpiece of sequential art. The depth of Guts as a character is unmatched.",
    media: {
      title: "Berserk",
      type: "manga",
      genre: "Dark Fantasy · Action",
      score: 9.7,
      accentColor: "#e74c3c",
    },
    likes: 1203,
    comments: 88,
  },
  {
    id: "3",
    user: { name: "Nakamura", username: "nakamura_22", color: "#1abc9c" },
    timeAgo: "28m",
    action: "started watching",
    content:
      "Finally starting Attack on Titan. Everyone keeps telling me to watch it. Please no spoilers 🙏",
    media: {
      title: "Attack on Titan",
      type: "anime",
      genre: "Action · Drama",
      score: 9.0,
      accentColor: "#e67e22",
    },
    likes: 56,
    comments: 122,
  },
  {
    id: "4",
    user: { name: "Rei Zero", username: "rei_00", color: "#3498db" },
    timeAgo: "1h",
    content:
      "Hot take: the manga is almost always better than the anime adaptation. The pacing, the art direction, the emotional weight — nothing gets lost in translation. Fight me.",
    likes: 892,
    comments: 203,
  },
  {
    id: "5",
    user: { name: "Senshi", username: "senshi_draws", color: "#f39c12" },
    timeAgo: "2h",
    action: "finished",
    content:
      "Just completed Fullmetal Alchemist: Brotherhood. I understand everything now. 10/10 no notes.",
    media: {
      title: "Fullmetal Alchemist: Brotherhood",
      type: "anime",
      genre: "Fantasy · Adventure",
      score: 9.2,
      accentColor: "#d4a017",
    },
    likes: 2419,
    comments: 341,
  },
  {
    id: "6",
    user: { name: "Void Kun", username: "void_kun", color: "#6c5ce7" },
    timeAgo: "3h",
    action: "recommended",
    content:
      "Vagabond is one of the most beautiful things ever drawn by a human being. Takehiko Inoue is operating on a different plane of existence.",
    media: {
      title: "Vagabond",
      type: "manga",
      genre: "Historical · Drama",
      score: 9.4,
      accentColor: "#795548",
    },
    likes: 3842,
    comments: 197,
  },
  {
    id: "7",
    user: { name: "Midnight Otaku", username: "midnightotaku", color: "#e91e63" },
    timeAgo: "5h",
    content:
      "The way Chainsaw Man completely subverts every shonen trope is genuinely refreshing. Fujimoto doesn't care about your expectations and that's what makes it brilliant.",
    media: {
      title: "Chainsaw Man",
      type: "manga",
      genre: "Action · Horror",
      score: 8.9,
      accentColor: "#ff5722",
    },
    likes: 1567,
    comments: 89,
  },
  {
    id: "8",
    user: { name: "Araki Fan", username: "araki_fan99", color: "#00b894" },
    timeAgo: "7h",
    action: "recommended",
    content:
      "JoJo's Bizarre Adventure is the most creative manga ever made. Every arc reinvents itself completely. Nothing comes close to this level of originality.",
    media: {
      title: "JoJo's Bizarre Adventure",
      type: "manga",
      genre: "Action · Adventure",
      score: 8.8,
      accentColor: "#fd79a8",
    },
    likes: 4102,
    comments: 512,
  },
]

const TABS = ["for_you", "following"] as const

export function HomeFeed() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<(typeof TABS)[number]>("for_you")

  return (
    <div className="flex-1 min-w-0 border-r border-border/40">
      {/* Tab bar */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="flex">
          {TABS.map(key => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "relative flex-1 py-3.5 text-[13px] font-semibold tracking-wide transition-colors",
                tab === key ? "text-white" : "text-muted-foreground hover:text-white/70",
              )}
            >
              {t(`home.feed_${key}`)}
              {tab === key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/30">
        <div className="w-9 h-9 shrink-0 rounded-full bg-secondary flex items-center justify-center">
          <Pencil className="w-3.5 h-3.5 text-muted-foreground/50" />
        </div>
        <div className="flex-1 bg-secondary/40 border border-border/30 hover:border-border/60 transition-colors px-3.5 py-2 text-sm text-muted-foreground/40 cursor-text">
          {t("home.post_placeholder")}
        </div>
      </div>

      {/* Posts */}
      <div>
        {MOCK_POSTS.map(post => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
