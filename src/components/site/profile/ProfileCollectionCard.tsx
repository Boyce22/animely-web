import { ProfileStackedCovers } from "./ProfileStackedCovers"
import type { UserCollection } from "./profileTypes"

interface ProfileCollectionCardProps {
  collection: UserCollection
  label: string
}

export function ProfileCollectionCard({ collection, label }: ProfileCollectionCardProps) {
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
      <ProfileStackedCovers images={collection.images} />
    </article>
  )
}
