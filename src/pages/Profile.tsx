import { useCallback, useMemo, useState } from "react"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { ProfileBanner } from "@/components/site/profile/ProfileBanner"
import { ProfileHeaderStrip } from "@/components/site/profile/ProfileHeaderStrip"
import { ProfileStatsBar } from "@/components/site/profile/ProfileStatsBar"
import { ProfileTopBar } from "@/components/site/profile/ProfileTopBar"
import { ProfileEditToolbar } from "@/components/site/profile/ProfileEditToolbar"
import { WidgetPickerPanel, ThemePanel, BannerEditPanel } from "@/components/site/profile/ProfileEditPanels"
import { DEFAULT_PROFILE, PROFILE_STATS, WIDGET_SOCIAL } from "@/components/site/profile/profileData"
import type { ProfileData, ProfilePageTab } from "@/components/site/profile/profileTypes"
import { ProfileRenderer } from "@/features/styling-engine/renderer"
import { DEFAULT_STYLING_PROFILE } from "@/features/styling-engine/default-profile"
import type { StylingProfile } from "@/features/styling-engine/types"

type ActiveSidePanel = "widgets" | "theme" | "banner" | null

export default function Profile() {
  const [profile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [activeTab, setActiveTab] = useState<ProfilePageTab>("profile")
  const [editMode, setEditMode] = useState(false)
  const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined)
  const [stylingProfile, setStylingProfile] = useState<StylingProfile>(DEFAULT_STYLING_PROFILE)
  const [sidePanel, setSidePanel] = useState<ActiveSidePanel>(null)
  const [cardStyle, setCardStyle] = useState<string>("glass")

  const hiddenWidgetIds = useMemo(() => {
    const visible = new Set<string>()
    for (const section of stylingProfile.sections) {
      for (const comp of section.components) {
        visible.add(comp.id)
      }
    }
    return [
      "avatar", "bio", "statsAnime", "statsManga",
      "favAnime", "favManga", "favChars", "favStaff",
      "music", "badges", "activity", "social",
      "text", "clock", "divider", "posts",
    ].filter((catalogId) => {
      const strip = catalogId.replace(/([A-Z])/g, "-$1").toLowerCase()
      return ![...visible].some((vid) =>
        vid === catalogId ||
        vid === strip ||
        vid.replace(/-/g, "") === strip.replace(/-/g, "")
      )
    })
  }, [stylingProfile.sections])

  const handleShare = useCallback(() => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
  }, [])

  const handleDiscard = useCallback(() => {
    setStylingProfile(DEFAULT_STYLING_PROFILE)
    setBannerUrl(undefined)
    setEditMode(false)
    setSidePanel(null)
  }, [])

  const handlePublish = useCallback(() => {
    setEditMode(false)
    setSidePanel(null)
  }, [])

  const handleBannerChange = useCallback((url: string) => {
    setBannerUrl(url || undefined)
  }, [])

  const handleComponentClick = useCallback((_sectionId: string, _componentId: string) => {
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
          <ProfileBanner
            profile={profile}
            bannerUrl={bannerUrl}
            editMode={editMode}
            onEditBanner={() => setSidePanel("banner")}
          />

          <ProfileHeaderStrip
            profile={profile}
            socialLinks={WIDGET_SOCIAL}
          />

          <ProfileStatsBar stats={PROFILE_STATS} />

          {editMode && (
            <ProfileEditToolbar
              onOpenWidgets={() => setSidePanel("widgets")}
              onOpenTheme={() => setSidePanel("theme")}
              onOpenBanner={() => setSidePanel("banner")}
              onDiscard={handleDiscard}
              onPublish={handlePublish}
              isDraft={editMode}
            />
          )}

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

      <WidgetPickerPanel
        open={sidePanel === "widgets"}
        onClose={() => setSidePanel(null)}
        hiddenWidgetIds={hiddenWidgetIds}
        onShowWidget={() => {}}
      />

      <ThemePanel
        open={sidePanel === "theme"}
        onClose={() => setSidePanel(null)}
        currentCardStyle={cardStyle}
        onCardStyleChange={setCardStyle}
      />

      <BannerEditPanel
        open={sidePanel === "banner"}
        onClose={() => setSidePanel(null)}
        onBannerChange={handleBannerChange}
      />
    </div>
  )
}
