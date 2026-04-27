import type { TFunction } from "i18next"
import { Plus } from "lucide-react"
import { ProfileCollectionCard } from "./ProfileCollectionCard"
import { ProfilePanel, ProfilePanelHeader } from "./ProfilePanel"
import type { UserCollection } from "./profileTypes"

interface ProfileLibraryPanelProps {
  collections: UserCollection[]
  t: TFunction
}

export function ProfileLibraryPanel({ collections, t }: ProfileLibraryPanelProps) {
  return (
    <ProfilePanel className="border-t-0 p-4">
      <ProfilePanelHeader
        title={t("profile.library_title")}
        subtitle={t("profile.library_count", { count: collections.length })}
        action={
          <button className="inline-flex h-9 shrink-0 items-center gap-1.5 bg-primary px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-primary-foreground transition-opacity hover:opacity-90">
            <Plus className="h-3.5 w-3.5" />
            {t("profile.new_collection")}
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {collections.map(collection => (
          <ProfileCollectionCard key={collection.id} collection={collection} label={t("profile.collection")} />
        ))}
      </div>
    </ProfilePanel>
  )
}
