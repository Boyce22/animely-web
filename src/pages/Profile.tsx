import { useCallback, useState } from "react"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { ProfileBanner } from "@/components/site/profile/ProfileBanner"
import { ProfileStatsBar } from "@/components/site/profile/ProfileStatsBar"
import { ProfileTopBar } from "@/components/site/profile/ProfileTopBar"
import { DEFAULT_PROFILE, PROFILE_STATS } from "@/components/site/profile/profileData"
import type { ProfileData, ProfilePageTab } from "@/components/site/profile/profileTypes"
import { ProfileRenderer } from "@/features/styling-engine/renderer"
import { ProfileEditor } from "@/features/styling-engine/editor/ProfileEditor"
import { DEFAULT_STYLING_PROFILE } from "@/features/styling-engine/default-profile"
import type { StylingProfile } from "@/features/styling-engine/types"

export default function Profile() {
  const [profile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [activeTab, setActiveTab] = useState<ProfilePageTab>("profile")
  const [editMode, setEditMode] = useState(false)
  const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined)
  const [stylingProfile, setStylingProfile] = useState<StylingProfile>(DEFAULT_STYLING_PROFILE)

  const handleShare = useCallback(() => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
  }, [])

  const handleExitEdit = useCallback(() => {
    setEditMode(false)
  }, [])

  const handleComponentClick = useCallback((_sectionId: string, _componentId: string) => {
    // In a full editor, this would open the component style panel
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-[#f0eeec]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <ExploreSidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <ProfileTopBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          editMode={editMode}
          onEnterEdit={() => setEditMode(true)}
          onShare={handleShare}
          isDraft={editMode}
        />

        <div className="scrollbar-hide flex-1 overflow-y-auto overflow-x-hidden">
          <div className="profile-banner-wrap">
            <ProfileBanner profile={profile} bannerUrl={bannerUrl || undefined} />
          </div>

          <ProfileStatsBar stats={PROFILE_STATS} />

          <div className="profile-canvas-bg" style={{ background: stylingProfile.canvas.background || "#0a0a0a" }}>
            <ProfileRenderer
              profile={stylingProfile}
              userProfile={profile}
              editMode={editMode}
              onComponentClick={handleComponentClick}
            />
          </div>
        </div>
      </main>

      {/* Editor sidebar panel */}
      {editMode && (
        <aside className="w-[340px] shrink-0 border-l border-white/[0.12] bg-[#111] shadow-[-8px_0_32px_rgba(0,0,0,0.5)]">
          <ProfileEditor
            profile={stylingProfile}
            onChange={setStylingProfile}
            onClose={handleExitEdit}
          />
        </aside>
      )}
    </div>
  )
}
