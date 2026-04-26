import { useTranslation } from "react-i18next"

const TOP_WEEK = [
  { rank: 1, title: "Frieren: BtJE", score: 9.42 },
  { rank: 2, title: "Solo Leveling S2", score: 9.11 },
  { rank: 3, title: "Dandadan", score: 8.97 },
  { rank: 4, title: "Blue Lock S2", score: 8.84 },
  { rank: 5, title: "Oshi no Ko S2", score: 8.79 },
]

const FRIEND_ACTIVITY = [
  { initial: "R", gradient: "linear-gradient(135deg,#2d6a4f,#1b4332)", user: "rafaelomg",    action: "Terminou Vinland Saga S2 · ★10", time: "5m"  },
  { initial: "S", gradient: "linear-gradient(135deg,#6930c3,#1d3557)", user: "sakura_drop",  action: "Adicionou Re:Zero S3",             time: "18m" },
  { initial: "L", gradient: "linear-gradient(135deg,#457b9d,#1d3557)", user: "luka_anime",   action: "Assistindo AoT Final Ep.87",       time: "31m" },
  { initial: "N", gradient: "linear-gradient(135deg,#e63946,#c1121f)", user: "natsumi_w",    action: "Avaliou JJK S3 com 8.5",           time: "45m" },
]

const NEWS = [
  { source: "Crunchyroll",  title: "Frieren confirma 2ª temporada para 2026",       time: "3h" },
  { source: "ANN",          title: "MAPPA divulga visual de projeto original inédito", time: "5h" },
  { source: "Anime News",   title: "Solo Leveling S2 confirma 13 episódios",         time: "8h" },
]

const RECOMMENDED = [
  { title: "Vinland Saga", genre: "Histórico · Seinen", score: "9.1" },
  { title: "Mushishi",     genre: "Mistério · SoL",      score: "9.0" },
  { title: "Ping Pong",    genre: "Esporte · Drama",     score: "8.8" },
]

function SectionHeader({ title, link }: { title: string; link?: string }) {
  return (
    <div className="flex items-center justify-between mb-3.5">
      <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20">
        {title}
      </span>
      {link && (
        <a className="text-[9px] font-bold text-primary uppercase cursor-pointer hover:text-primary/80 transition-colors">
          {link}
        </a>
      )}
    </div>
  )
}

export function ExploreRightPanel() {
  const { t } = useTranslation()

  return (
    <aside
      className="w-[260px] flex-shrink-0 border-l border-white/[0.07] overflow-y-auto overflow-x-hidden bg-background scrollbar-hide"
    >
      {/* Top Semana */}
      <div className="border-b border-white/[0.07] p-4">
        <SectionHeader title={t("explore.top_week")} link={t("explore.see_ranking")} />
        <div className="flex flex-col">
          {TOP_WEEK.map(item => (
            <div
              key={item.rank}
              className="flex items-center gap-2 py-[7px] border-b border-white/[0.07] last:border-b-0 cursor-pointer"
            >
              <span
                className={`text-[11px] font-black font-mono w-4 flex-shrink-0 ${item.rank <= 2 ? "text-primary" : "text-white/20"}`}
              >
                {item.rank}
              </span>
              <span className="text-[12px] font-semibold flex-1 min-w-0 truncate text-foreground/90">
                {item.title}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground/60 flex-shrink-0">
                {item.score.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Friend Activity */}
      <div className="border-b border-white/[0.07] p-4">
        <SectionHeader title={t("explore.friend_activity")} link={t("explore.see_all")} />
        <div className="flex flex-col gap-3">
          {FRIEND_ACTIVITY.map(item => (
            <div key={item.user} className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white"
                style={{ background: item.gradient }}
              >
                {item.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-foreground/90 leading-none mb-0.5">
                  {item.user}
                </p>
                <p className="text-[11px] text-muted-foreground/60 truncate">{item.action}</p>
              </div>
              <span className="text-[10px] text-white/20 font-mono flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* News */}
      <div className="border-b border-white/[0.07] p-4">
        <SectionHeader title={t("explore.news")} link={t("explore.see_all_news")} />
        <div>
          {NEWS.map(item => (
            <div
              key={item.title}
              className="py-[9px] border-b border-white/[0.07] last:border-b-0 cursor-pointer group"
            >
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-primary mb-0.5">
                {item.source}
              </p>
              <p className="text-[12px] font-semibold leading-[1.4] text-foreground/90 group-hover:text-foreground/60 transition-colors">
                {item.title}
              </p>
              <p className="text-[10px] text-white/20 font-mono mt-0.5">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="p-4">
        <SectionHeader title={t("explore.recommended")} />
        <div>
          {RECOMMENDED.map(item => (
            <div
              key={item.title}
              className="flex gap-2.5 items-center py-2 border-b border-white/[0.07] last:border-b-0 cursor-pointer"
            >
              <div className="w-9 h-[50px] flex-shrink-0 bg-[repeating-linear-gradient(-45deg,#151515_0,#151515_5px,#111_5px,#111_10px)]" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold truncate text-foreground/90">{item.title}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{item.genre}</p>
                <p className="text-[11px] text-[#f4a261] font-bold mt-1 font-mono">★ {item.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
