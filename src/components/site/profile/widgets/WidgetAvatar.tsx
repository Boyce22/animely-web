import { memo } from "react"
import { useTranslation } from "react-i18next"
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline"
import type { ProfileData } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  profile: ProfileData
}

function WidgetAvatarComponent({ profile, ...context }: Props) {
  const { t } = useTranslation()
  const initial = (profile.name[0] ?? "?").toUpperCase()
  const joinYear = new Date(profile.createdAt).getFullYear()

  return (
    <Widget id="avatar" {...context}>
      <div className="flex h-full flex-col items-center gap-3 px-4 pb-4 pt-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-red-700 to-red-500 text-3xl font-[800] shadow-[0_0_0_2.5px_rgba(255,255,255,0.1),0_0_0_5px_rgba(230,57,70,0.18),0_8px_28px_rgba(0,0,0,0.6),0_0_32px_rgba(230,57,70,0.15)]">
            {profile.profilePictureUrl ? (
              <img
                src={profile.profilePictureUrl}
                alt={profile.username}
                className="h-full w-full rounded-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>
          <div className="absolute bottom-0.5 right-0.5 h-[13px] w-[13px]">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-40" />
            <div className="h-full w-full rounded-full border-[2.5px] border-black/80 bg-emerald-500" />
          </div>
        </div>

        {/* Name + handle */}
        <div className="text-center">
          <div className="text-[15px] font-[800] leading-tight">{profile.username}</div>
          <div className="mt-[3px] text-[10px] text-white/[0.28]">@{profile.username} · #{profile.id.slice(0, 6)}</div>
        </div>

        {/* Tier / role badges */}
        <div className="flex flex-wrap justify-center gap-[5px]">
          {profile.subscriptionTier === "PRO" && (
            <span className="border border-amber-400/40 bg-amber-400/10 px-[7px] py-[2px] text-[9px] font-[800] uppercase tracking-[0.1em] text-amber-300">PRO</span>
          )}
          <span className="border border-red-400/35 bg-red-500/10 px-[7px] py-[2px] text-[9px] font-[800] uppercase tracking-[0.1em] text-red-300">Early</span>
          {profile.isVerified && (
            <span className="border border-emerald-500/30 bg-emerald-500/10 px-[7px] py-[2px] text-[9px] font-[800] uppercase tracking-[0.1em] text-emerald-300">Verified</span>
          )}
        </div>

        {/* Location + join date */}
        <div className="flex w-full flex-col gap-[5px] border-t border-white/[0.055] pt-2.5 text-[10px] text-white/[0.3]">
          {profile.address && (
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="h-[10px] w-[10px] shrink-0 text-white/20" />
              <span className="truncate">{profile.address}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CalendarDaysIcon className="h-[10px] w-[10px] shrink-0 text-white/20" />
            <span>{t("profile.joined")} {joinYear}</span>
          </div>
        </div>

        {/* Followers / Following */}
        <div className="mt-auto flex w-full border-t border-white/[0.055] pt-2.5">
          <div className="flex-1 text-center">
            <div className="font-mono text-[17px] font-[800] leading-none">{profile.followersCount.toLocaleString()}</div>
            <div className="mt-[3px] text-[8px] font-[700] uppercase tracking-[0.13em] text-white/[0.24]">{t("profile.followers")}</div>
          </div>
          <div className="w-px bg-white/[0.055]" />
          <div className="flex-1 text-center">
            <div className="font-mono text-[17px] font-[800] leading-none">{profile.followingCount.toLocaleString()}</div>
            <div className="mt-[3px] text-[8px] font-[700] uppercase tracking-[0.13em] text-white/[0.24]">{t("profile.following")}</div>
          </div>
        </div>
      </div>
    </Widget>
  )
}

export const WidgetAvatar = memo(WidgetAvatarComponent)
