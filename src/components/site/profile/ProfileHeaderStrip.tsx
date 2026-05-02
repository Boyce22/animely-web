import { memo } from "react"
import type { ProfileData } from "./profileTypes"

interface ProfileHeaderStripProps {
  profile: ProfileData
}

function ProfileHeaderStripComponent({ profile }: ProfileHeaderStripProps) {
  return (
    <div className="border-b border-white/[0.06] bg-[#0a0a0a] px-7">
      <div className="flex items-start gap-4 py-3">
        {/* ── Spacer — compensa o overlap do avatar (128px) ── */}
        <div className="w-[128px] shrink-0" />

        {/* ── Bio ── */}
        <div className="min-w-0 flex-1 pt-1">
          <p className="max-w-[600px] text-[13px] leading-[1.6] text-white/60">
            {profile.biography}
          </p>
        </div>
      </div>
    </div>
  )
}

export const ProfileHeaderStrip = memo(ProfileHeaderStripComponent)
