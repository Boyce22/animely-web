import type { TFunction } from "i18next"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfilePanel, ProfilePanelHeader } from "./ProfilePanel"
import type { UserCollection } from "./profileTypes"

const STACK_CONFIG = [
  { className: "right-24 bottom-0 z-[1] h-[126px] w-[88px] -rotate-12 group-hover:-translate-x-2 group-hover:-rotate-[15deg]" },
  { className: "right-14 bottom-3 z-[3] h-[136px] w-[96px] group-hover:-translate-y-1.5" },
  { className: "right-3 bottom-0 z-[2] h-[126px] w-[88px] rotate-12 group-hover:translate-x-2 group-hover:rotate-[15deg]" },
] as const

interface ProfileLibraryPanelProps {
  collections: UserCollection[]
  t: TFunction
}

function StackedCovers({ images }: { images: UserCollection["images"] }) {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-full">
      {images.map((src, index) => {
        const config = STACK_CONFIG[index]
        if (!config) return null

        return (
          <div
            key={src}
            className={cn(
              "absolute overflow-hidden border border-border bg-secondary shadow-xl transition-transform duration-300",
              config.className,
            )}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        )
      })}
    </div>
  )
}

function CollectionCard({ collection, label }: { collection: UserCollection; label: string }) {
  return (
    <article className="group relative h-52 overflow-hidden border border-border bg-card transition-all hover:bg-secondary/40">
      <div className="relative z-10 p-4">
        <p className="mb-1 text-[9px] font-black uppercase tracking-[0.16em] text-primary">{label}</p>
        <h3 className="max-w-[56%] text-[15px] font-bold leading-snug text-foreground">{collection.title}</h3>
        <p className="mt-2 text-[11px] text-muted-foreground">{collection.count} titles</p>
      </div>
      <div className="absolute bottom-3 left-4 z-10 text-[10px] font-mono text-muted-foreground">
        {collection.updatedAt}
      </div>
      <StackedCovers images={collection.images} />
    </article>
  )
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
          <CollectionCard key={collection.id} collection={collection} label={t("profile.collection")} />
        ))}
      </div>
    </ProfilePanel>
  )
}
