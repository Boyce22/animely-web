import { useCallback, useState } from "react"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { BannerEditPanel, ThemePanel, WidgetPickerPanel } from "@/components/site/profile/ProfileEditPanels"
import { ProfileBanner } from "@/components/site/profile/ProfileBanner"
import { ProfileCanvas } from "@/components/site/profile/ProfileCanvas"
import { ProfileStatsBar } from "@/components/site/profile/ProfileStatsBar"
import { ProfileTopBar } from "@/components/site/profile/ProfileTopBar"
import { DEFAULT_PROFILE, PROFILE_STATS } from "@/components/site/profile/profileData"
import type { ProfileData, ProfilePageTab } from "@/components/site/profile/profileTypes"

export default function Profile() {
  const [profile]                     = useState<ProfileData>(DEFAULT_PROFILE)
  const [activeTab, setActiveTab]     = useState<ProfilePageTab>("profile")
  const [editMode, setEditMode]       = useState(false)
  const [bannerUrl, setBannerUrl]     = useState<string | undefined>(undefined)
  const [widgetPanel, setWidgetPanel] = useState(false)
  const [themePanel, setThemePanel]   = useState(false)
  const [bannerPanel, setBannerPanel] = useState(false)
  const [hiddenWidgets, setHiddenWidgets] = useState<string[]>([])

  const handleShare = useCallback(() => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
  }, [])

  const handleExitEdit = useCallback(() => {
    setEditMode(false)
    setWidgetPanel(false)
    setThemePanel(false)
    setBannerPanel(false)
  }, [])

  const handleShowWidget = useCallback((id: string) => {
    setHiddenWidgets((prev) => prev.filter((w) => w !== id))
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-[#f0eeec]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <ExploreSidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top tab bar (hidden in edit mode — edit toolbar replaces it) */}
        <ProfileTopBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          editMode={editMode}
          onEnterEdit={() => setEditMode(true)}
          onShare={handleShare}
          isDraft={editMode}
        />

        {/* Scrollable content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto overflow-x-hidden">
          {/* Banner */}
          <div className="profile-banner-wrap">
            <ProfileBanner
              profile={profile}
              bannerUrl={bannerUrl || undefined}
            />
          </div>

          {/* Stats bar */}
          <ProfileStatsBar stats={PROFILE_STATS} />

          {/* Widget canvas */}
          <div className="profile-canvas-bg" style={{ background: "#0a0a0a" }}>
            <ProfileCanvas
              profile={profile}
              editMode={editMode}
              onExitEdit={handleExitEdit}
              onOpenWidgetPanel={() => setWidgetPanel(true)}
              onOpenThemePanel={() => setThemePanel(true)}
              onOpenBannerPanel={() => setBannerPanel(true)}
            />
          </div>
        </div>
      </main>

      {/* Edit panels */}
      <WidgetPickerPanel
        open={widgetPanel}
        onClose={() => setWidgetPanel(false)}
        hiddenWidgetIds={hiddenWidgets}
        onShowWidget={handleShowWidget}
      />
      <ThemePanel
        open={themePanel}
        onClose={() => setThemePanel(false)}
        onCardStyleChange={() => {}}
        currentCardStyle="glass"
      />
      <BannerEditPanel
        open={bannerPanel}
        onClose={() => setBannerPanel(false)}
        onBannerChange={setBannerUrl}
      />
    </div>
  )
}
