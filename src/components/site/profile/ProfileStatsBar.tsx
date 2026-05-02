import { memo } from "react"
import {
  PlayCircleIcon,
  TvIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
  UsersIcon,
  UserGroupIcon,
  StarIcon,
} from "@heroicons/react/24/outline"
import type { ProfileStats } from "./profileTypes"

interface ProfileStatsBarProps {
  stats: ProfileStats
}

interface StatItem {
  icon: React.ReactNode
  value: string
  label: string
  secondary?: string
}

function buildItems(stats: ProfileStats): StatItem[] {
  return [
    {
      icon: <PlayCircleIcon className="h-[17px] w-[17px]" />,
      value: stats.episodesWatched.toLocaleString(),
      label: "Episódios",
    },
    {
      icon: <TvIcon className="h-[17px] w-[17px]" />,
      value: stats.animesCount.toLocaleString(),
      label: "Animes",
      secondary: stats.animesAvg,
    },
    {
      icon: <BookOpenIcon className="h-[17px] w-[17px]" />,
      value: stats.chaptersRead.toLocaleString(),
      label: "Capítulos",
    },
    {
      icon: <BookOpenIcon className="h-[17px] w-[17px]" />,
      value: stats.mangasCount.toLocaleString(),
      label: "Mangás",
      secondary: stats.mangasAvg,
    },
    {
      icon: <ChatBubbleLeftIcon className="h-[17px] w-[17px]" />,
      value: stats.reviewsCount.toLocaleString(),
      label: "Reviews",
    },
    {
      icon: <UsersIcon className="h-[17px] w-[17px]" />,
      value: stats.followersCount.toLocaleString(),
      label: "Seguidores",
    },
    {
      icon: <UserGroupIcon className="h-[17px] w-[17px]" />,
      value: stats.followingCount.toLocaleString(),
      label: "Seguindo",
    },
  ]
}

function ProfileStatsBarComponent({ stats }: ProfileStatsBarProps) {
  const items = buildItems(stats)

  return (
    <div className="scrollbar-hide flex h-[48px] shrink-0 items-center overflow-x-auto border-b border-white/[0.05] bg-[#0a0a0a] px-7 gap-0">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex shrink-0 items-center gap-[10px] border-r border-white/[0.04] pr-5 mr-5 first:pl-0 last:border-r-0 last:mr-0 last:pr-0"
        >
          {/* Ícone — reconhecível, sem roubar atenção do número */}
          <div className="shrink-0 text-white/35">{item.icon}</div>

          {/* Número (hero) + label (suave) + rating (terciário) */}
          <div className="flex items-baseline gap-[6px]">
            <span className="font-mono text-[16px] font-[800] leading-none tracking-tight text-white/90">
              {item.value}
            </span>
            <span className="text-[10px] font-[700] uppercase tracking-[0.08em] text-white/30">
              {item.label}
            </span>

            {item.secondary && (
              <>
                <span className="mx-[3px] h-[3px] w-[3px] rounded-full bg-white/15" />
                <span className="flex items-center gap-[3px] font-mono text-[10px] text-white/20">
                  <StarIcon className="h-[9px] w-[9px] text-white/20" />
                  {item.secondary}
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export const ProfileStatsBar = memo(ProfileStatsBarComponent)
