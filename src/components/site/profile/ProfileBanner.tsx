import { memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ChatBubbleLeftIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import type { ProfileData } from "./profileTypes"

interface ProfileBannerProps {
  profile: ProfileData
  bannerUrl?: string
}

function ProfileBannerComponent({ profile, bannerUrl }: ProfileBannerProps) {
  const { t } = useTranslation()
  const initial = (profile.name[0] ?? "?").toUpperCase()
  const src = bannerUrl ?? profile.bannerUrl
  const [following, setFollowing] = useState(false)

  return (
    <div className="relative h-[320px] w-full shrink-0 overflow-hidden">
      {/* ── Banner image or placeholder ── */}
      {src ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-500 hover:scale-[1.02]"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#12082a] via-[#0d0d1a] to-[#0a0d20]">
          <div className="absolute inset-0" style={{
            background:
              "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(124,58,237,0.22) 0%, transparent 65%)," +
              "radial-gradient(ellipse 40% 40% at 15% 80%, rgba(230,57,70,0.14) 0%, transparent 55%)",
          }} />
        </div>
      )}

      {/* ── Gradient overlay ── */}
      <div className="pointer-events-none absolute inset-0" style={{
        background:
          "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.45) 65%, rgba(10,10,10,0.92) 100%)," +
          "linear-gradient(to right, rgba(10,10,10,0.55) 0%, transparent 35%)",
      }} />
      <div className="pointer-events-none absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 50% 80% at 15% 100%, rgba(124,58,237,0.22) 0%, transparent 70%)," +
          "radial-gradient(ellipse 30% 50% at 80% 60%, rgba(230,57,70,0.1) 0%, transparent 60%)",
      }} />

      {/* ── Avatar + username + actions ── */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-5 px-8 pb-4">
        {/* Avatar — 128px with subtle overlap into content below */}
        <div className="relative z-10 shrink-0 -mb-[10px]">
          <div className="flex h-[128px] w-[128px] items-center justify-center overflow-hidden rounded-full shadow-[0_8px_36px_rgba(0,0,0,0.65)]">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#0a0a0a]">
              {profile.profilePictureUrl ? (
                <img
                  src={profile.profilePictureUrl}
                  alt={profile.username}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              ) : (
                <span className="text-[40px] font-[800] text-white/80">{initial}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Username + badges ── */}
        <div className="min-w-0 flex-1 pb-[2px]">
          <div className="text-[28px] font-[800] leading-tight tracking-[-0.5px] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
            {profile.username}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {profile.subscriptionTier === "PRO" && (
              <span className="border border-orange-400/30 bg-orange-400/15 px-[10px] py-[2px] text-[12px] font-[800] uppercase tracking-[0.08em] text-orange-300">
                Pro
              </span>
            )}
            <span className="border border-purple-500/30 bg-purple-500/15 px-[10px] py-[2px] text-[12px] font-[800] uppercase tracking-[0.08em] text-purple-300">
              Early
            </span>
            <span className="font-mono text-[14px] font-medium text-white/45">• {profile.address}</span>
            <span className="font-mono text-[14px] text-white/35">{t("profile.member_since", { date: "Jan 2022" })}</span>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex shrink-0 items-center gap-2 pb-[2px]">
          <button
            onClick={() => setFollowing((f) => !f)}
            className={[
              "flex cursor-pointer items-center gap-1.5 border px-5 py-[8px] text-[13px] font-[700] tracking-[0.04em] transition-all font-[inherit] leading-none",
              following
                ? "border-white/[0.1] bg-transparent text-white/40 hover:border-red-500/30 hover:text-red-400"
                : "border-transparent bg-red-500 text-white hover:opacity-85",
            ].join(" ")}
          >
            {following ? t("profile.following_user") : t("profile.follow")}
          </button>
          <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center border border-white/[0.08] bg-transparent text-white/35 transition-[color,border-color] hover:border-white/20 hover:text-white/70">
            <ChatBubbleLeftIcon className="h-[15px] w-[15px]" />
          </button>
          <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center border border-white/[0.08] bg-transparent text-white/35 transition-[color,border-color] hover:border-white/20 hover:text-white/70">
            <EllipsisHorizontalIcon className="h-[15px] w-[15px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const ProfileBanner = memo(ProfileBannerComponent)
