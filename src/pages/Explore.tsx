import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { MessageCircle, Plus, Trophy, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { ContentFeedGrid } from "@/components/site/ContentFeedGrid"
import { ExploreRightPanel } from "@/components/site/ExploreRightPanel"

const DISCUSSION_TABS = ["tab_for_you", "tab_following", "tab_trending", "tab_new"] as const

const CHAT_ROOMS = [
  { name: "Spoilers da Temporada", members: "1.2k", status: "Ao vivo", preview: "Thread de capítulos e episódios da semana." },
  { name: "Clube Seinen", members: "842", status: "Novo tópico", preview: "Conversas longas sobre autores, arcos e finais." },
  { name: "Romance sem vergonha", members: "560", status: "Em alta", preview: "Indicações, surtos e cenas favoritas do mês." },
]

const USER_RANKING = [
  { rank: 1, user: "kurumi_fan", score: "12.480", badge: "Colecionadora" },
  { rank: 2, user: "miyamoto_rei", score: "11.920", badge: "Crítico" },
  { rank: 3, user: "yuuna", score: "10.880", badge: "Curadora" },
  { rank: 4, user: "rafaelomg", score: "10.110", badge: "Maratonista" },
  { rank: 5, user: "luka_anime", score: "9.740", badge: "Descobridor" },
]

function CommunityChatsPanel() {
  const { t } = useTranslation()

  return (
    <div className="px-5 py-5">
      <div className="grid gap-3">
        {CHAT_ROOMS.map(room => (
          <div key={room.name} className="border border-white/[0.07] bg-[#0b0b0b] px-4 py-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-[15px] font-bold text-foreground">{room.name}</h3>
                <p className="mt-1 text-[12px] text-muted-foreground">{room.preview}</p>
              </div>
              <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                {room.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-white/35">
              <span>{room.members} membros</span>
              <button className="border border-white/[0.07] px-3 py-1.5 font-semibold text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground">
                {t("explore.join_chat")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UserRankingPanel() {
  const { t } = useTranslation()

  return (
    <div className="px-5 py-5">
      <div className="border border-white/[0.07] bg-[#0b0b0b]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <h3 className="text-[14px] font-bold text-foreground">{t("explore.user_ranking_title")}</h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">Season</span>
        </div>

        {USER_RANKING.map(entry => (
          <div key={entry.user} className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3 last:border-b-0">
            <span className={cn("w-7 text-center font-mono text-[12px] font-black", entry.rank <= 3 ? "text-primary" : "text-white/35")}>
              {entry.rank}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-[12px] font-black text-foreground">
              {entry.user.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-foreground">{entry.user}</p>
              <p className="text-[11px] text-muted-foreground">{entry.badge}</p>
            </div>
            <span className="text-[12px] font-mono text-white/50">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Explore() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState<(typeof DISCUSSION_TABS)[number]>("tab_for_you")
  const section = searchParams.get("section") ?? "discussions"

  const isDiscussions = section === "discussions"
  const isCommunity = section === "community"
  const isRanking = section === "ranking"

  const header = isCommunity
    ? {
        eyebrow: t("explore.nav_community"),
        title: t("explore.community_title"),
        subtitle: t("explore.community_subtitle"),
        icon: Users,
      }
    : isRanking
      ? {
          eyebrow: t("explore.nav_rankings"),
          title: t("explore.user_ranking_title"),
          subtitle: t("explore.user_ranking_subtitle"),
          icon: Trophy,
        }
      : {
          eyebrow: t("explore.nav_discussions"),
          title: t("explore.discussions_title"),
          subtitle: t("explore.discussions_subtitle"),
          icon: MessageCircle,
        }

  const HeaderIcon = header.icon

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <ExploreSidebar />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ background: "#050505" }}>
          <div className="border-b border-white/[0.07] px-5 py-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
              {header.eyebrow}
            </p>
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center border border-white/[0.07] bg-white/[0.03] text-white/70">
                  <HeaderIcon className="h-4 w-4" />
                </div>
                <div>
                  <h1 className="text-[24px] font-black tracking-tight text-foreground">
                    {header.title}
                  </h1>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {header.subtitle}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-1.5 border border-white/[0.07] bg-transparent px-3 py-[5px] text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground transition-all hover:border-white/20 hover:text-foreground">
                <Plus className="w-2.5 h-2.5" />
                {isCommunity ? t("explore.create_room") : t("explore.post_btn")}
              </button>
            </div>
          </div>

          {isDiscussions && (
            <>
              <div
                className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] px-5"
                style={{ background: "#0a0a0a" }}
              >
                <div className="flex">
                  {DISCUSSION_TABS.map(key => (
                    <button
                      key={key}
                      onClick={() => setTab(key)}
                      className={cn(
                        "flex h-[42px] items-center border-b-2 px-3.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors",
                        tab === key
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t(`explore.${key}`)}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-white/25">10 posts</div>
              </div>

              <ContentFeedGrid />
            </>
          )}

          {isCommunity && <CommunityChatsPanel />}
          {isRanking && <UserRankingPanel />}
        </div>

        <ExploreRightPanel />
      </main>
    </div>
  )
}
