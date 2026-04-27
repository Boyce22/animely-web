import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { EditProfileModal } from "@/components/site/EditProfileModal"
import { ExploreRightPanel } from "@/components/site/ExploreRightPanel"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { ProfileActivityPanel } from "@/components/site/profile/ProfileActivityPanel"
import { ProfileCommentsPanel } from "@/components/site/profile/ProfileCommentsPanel"
import { PROFILE_ACTIVITY, PROFILE_COLLECTIONS, PROFILE_TABS, DEFAULT_PROFILE } from "@/components/site/profile/profileData"
import { ProfileHero } from "@/components/site/profile/ProfileHero"
import { ProfileLibraryPanel } from "@/components/site/profile/ProfileLibraryPanel"
import { ProfileSidePanel } from "@/components/site/profile/ProfileSidePanel"
import { ProfileTabs } from "@/components/site/profile/ProfileTabs"
import type { ProfileData, ProfileTab } from "@/components/site/profile/profileTypes"
import { applyEditProfileData, toEditProfileData } from "@/components/site/profile/profileUtils"

export default function Profile() {
  const { t } = useTranslation()
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [activeTab, setActiveTab] = useState<ProfileTab>("activity")
  const [editOpen, setEditOpen] = useState(false)

  const editProfileData = useMemo(() => toEditProfileData(profile), [profile])

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-gray-200">
      <ExploreSidebar />

      <main className="flex min-w-0 flex-1 overflow-hidden">
        <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <ProfileHero profile={profile} onEdit={() => setEditOpen(true)} t={t} />

          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 pb-12">
            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
              <ProfileSidePanel profile={profile} t={t} className="hidden lg:block" />

              <div className="min-w-0">
                <ProfileTabs
                  activeTab={activeTab}
                  tabs={PROFILE_TABS}
                  profile={profile}
                  onTabChange={setActiveTab}
                  t={t}
                />

                <div className="mt-6">
                  {activeTab === "activity" && <ProfileActivityPanel items={PROFILE_ACTIVITY} t={t} />}
                  {activeTab === "library" && <ProfileLibraryPanel collections={PROFILE_COLLECTIONS} t={t} />}
                  {activeTab === "comments" && <ProfileCommentsPanel commentsCount={profile.commentsCount} t={t} />}
                </div>

                <ProfileSidePanel profile={profile} t={t} className="mt-8 lg:hidden" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden 2xl:block">
          <ExploreRightPanel />
        </div>
      </main>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initial={editProfileData}
        onSave={data => setProfile(current => applyEditProfileData(current, data))}
      />
    </div>
  )
}
