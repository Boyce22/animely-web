import { memo } from "react"
import type { ProfileData } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  profile: ProfileData
}

function WidgetAvatarComponent({ profile, ...context }: Props) {
  const initial = (profile.name[0] ?? "?").toUpperCase()

  return (
    <Widget id="avatar" {...context}>
      <div className="flex h-full flex-col items-center gap-4 p-6">
        <div className="relative shrink-0">
          <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-red-500 via-purple-700 to-purple-500 text-3xl font-[800] shadow-[0_0_0_3px_rgba(255,255,255,0.12),0_4px_20px_rgba(0,0,0,0.6)]">
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
          <div className="absolute bottom-1 right-1 h-[14px] w-[14px] rounded-full border-2 border-[#111] bg-emerald-500 shadow-[0_0_8px_#52b788]" />
        </div>

        <div className="text-center">
          <div className="text-[17px] font-[800]">{profile.username}</div>
          <div className="mt-1 text-[13px] text-white/40">@{profile.username} · #{profile.id.slice(0, 5)}</div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {profile.subscriptionTier === "PRO" && (
            <span className="border border-orange-400/30 bg-orange-400/15 px-2 py-[3px] text-[11px] font-[800] uppercase tracking-[0.08em] text-orange-300">Pro</span>
          )}
          <span className="border border-purple-500/30 bg-purple-500/15 px-2 py-[3px] text-[11px] font-[800] uppercase tracking-[0.08em] text-purple-300">Early</span>
          {profile.isVerified && (
            <span className="border border-emerald-500/30 bg-emerald-500/15 px-2 py-[3px] text-[11px] font-[800] uppercase tracking-[0.08em] text-emerald-300">Reviewer</span>
          )}
        </div>

        <div className="mt-auto flex w-full border-t border-white/[0.07] pt-4">
          <div className="flex-1 text-center">
            <div className="font-mono text-[20px] font-[800]">{profile.followersCount}</div>
            <div className="mt-[2px] text-[11px] font-[700] uppercase tracking-[0.1em] text-white/40">Seguidores</div>
          </div>
          <div className="flex-1 border-l border-white/[0.07] text-center">
            <div className="font-mono text-[20px] font-[800]">{profile.followingCount}</div>
            <div className="mt-[2px] text-[11px] font-[700] uppercase tracking-[0.1em] text-white/40">Seguindo</div>
          </div>
        </div>
      </div>
    </Widget>
  )
}

export const WidgetAvatar = memo(WidgetAvatarComponent)
