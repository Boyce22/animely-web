import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { EditProfileModal } from "@/components/site/EditProfileModal"
import { cn } from "@/lib/utils"
import {
  Edit,
  ChevronDown,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  Star,
  Bookmark,
  Plus,
} from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────
type MainTab = "activity" | "library" | "comments"

interface UserCollection {
  id: string
  title: string
  images: [string, string, string]
}

// ── Mock data ──────────────────────────────────────────────────────────
const MAIN_TABS: MainTab[] = ["activity", "library", "comments"]

const userCollections: UserCollection[] = [
  { id: "1", title: "Favorites",         images: ["/images/anime-jjk.jpg",        "/images/anime-demonslayer.jpg", "/images/anime-aot.jpg"] },
  { id: "2", title: "Currently Reading", images: ["/images/anime-onepiece.jpg",   "/images/anime-naruto.jpg",      "/images/anime-fma.jpg"] },
  { id: "3", title: "Want to Read",      images: ["/images/anime-violet.jpg",     "/images/anime-yourname.jpg",    "/images/anime-toradora.jpg"] },
  { id: "4", title: "Dark & Intense",    images: ["/images/anime-deathnote.jpg",  "/images/anime-mob.jpg",         "/images/anime-erased.jpg"] },
  { id: "5", title: "Sports",            images: ["/images/anime-haikyuu.jpg",    "/images/anime-volleyball.jpg",  "/images/anime-tsurune.jpg"] },
  { id: "6", title: "Classics",          images: ["/images/anime-bebop.jpg",      "/images/anime-evangelion.jpg",  "/images/anime-fma.jpg"] },
]

const activityItems = [
  { title: "Tower of God",                  date: "June 15th, 2023", type: "comment"  as const, text: "Great chapter! Can't wait for the next one." },
  { title: "Solo Leveling",                 date: "June 10th, 2023", type: "rating"   as const, text: "Rated 5 stars" },
  { title: "The Beginning After The End",   date: "June 5th, 2023",  type: "bookmark" as const, text: "Added to favorites" },
  { title: "Omniscient Reader's Viewpoint", date: "June 1st, 2023",  type: "comment"  as const, text: "The worldbuilding in this arc is insane." },
]

const BADGE_ICON = { comment: MessageSquare, rating: Star, bookmark: Bookmark }

const READING_STAT_KEYS = [
  { labelKey: "total_chapters",   value: "1247",     progress: 82 },
  { labelKey: "reading_time",     value: "438h 15m", progress: 65 },
  { labelKey: "completed_series", value: "18/42",    progress: 43 },
  { labelKey: "favorite_genres",  value: "Action",   progress: 70 },
] as const

// ── Stacked covers (same logic as FeaturedCollections) ─────────────────
const STACK_CONFIG = [
  { className: "w-[88px] h-[126px] right-28 bottom-0 -rotate-12 z-[1] group-hover:-translate-x-2 group-hover:-rotate-[15deg]" },
  { className: "w-[96px] h-[136px] right-16 bottom-3  z-[3] group-hover:-translate-y-1.5" },
  { className: "w-[88px] h-[126px] right-4  bottom-0  rotate-12  z-[2] group-hover:translate-x-2 group-hover:rotate-[15deg]" },
] as const

const coverBase = "absolute overflow-hidden border border-white/10 shadow-xl transition-transform duration-300"

function StackedCovers({ images }: { images: UserCollection["images"] }) {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-full">
      {images.map((src, i) => {
        const cfg = STACK_CONFIG[i]
        if (!cfg) return null
        return (
          <div key={i} className={cn(coverBase, cfg.className)}>
            <img src={src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )
      })}
    </div>
  )
}

function CollectionCard({ collection, label }: { collection: UserCollection; label: string }) {
  return (
    <article className="group relative flex h-56 cursor-pointer flex-col overflow-hidden border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-white/15">
      <div className="relative z-10 p-5">
        <p className="section-label mb-1.5 text-primary-soft">{label}</p>
        <h3 className="text-base font-semibold leading-snug text-foreground">{collection.title}</h3>
      </div>
      <StackedCovers images={collection.images} />
    </article>
  )
}

// ── Page ───────────────────────────────────────────────────────────────
const DEFAULT_PROFILE = {
  username: "Ryas",
  bio: "Manga enthusiast and collector. I love reading fantasy and action series. Currently following Tower of God and Solo Leveling.",
  email: "user@example.com",
  birthDate: "1995-05-14",
  avatarUrl: "/images/avatar-user.jpg",
  bannerUrl: "https://konachan.com/image/a521cf10c7d8f08cc2e522456b6a72ed/Konachan.com%20-%20361667%20animal%20ass%20bandage%20barefoot%20bat%20blue_eyes%20blush%20breasts%20cameltoe%20cross%20demon%20halloween%20horns%20moon%20night%20pumpkin%20red_hair%20signed%20tree%20underboob%20wings.jpg",
}

const Profile = () => {
  const { t } = useTranslation()
  const [mainTab, setMainTab] = useState<MainTab>("activity")
  const [editOpen, setEditOpen] = useState(false)
  const [profile, setProfile] = useState(DEFAULT_PROFILE)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header variant="solid" />

      <main className="flex-1 pt-16">
        {/* Banner */}
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(160px, 22vw, 280px)" }}>
          <img
            src={profile.bannerUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-background" />
        </div>

        {/* Identity bar */}
        <div className="px-6 lg:px-12 -mt-14 relative z-10 max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex items-end gap-5">
              <div className="h-28 w-28 shrink-0 rounded-full overflow-hidden border-[3px] border-background shadow-xl shadow-black/60">
                <img src={profile.avatarUrl} alt={profile.username} className="h-full w-full object-cover" />
              </div>
              <div className="pb-1.5 space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-[22px] font-bold text-foreground">{profile.username}</h1>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary-soft border border-primary/20 leading-none pt-[3px]">
                    {t("profile.member")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{t("profile.member_since", { date: "March 10th, 2022" })}</p>
              </div>
            </div>

            <div className="flex items-center pb-1.5 shrink-0">
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-secondary border border-border rounded-l text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Edit className="w-3 h-3" />
                {t("profile.edit_profile")}
              </button>
              <button className="px-2 py-2 bg-secondary border border-border rounded-r border-l-0 text-foreground hover:bg-secondary/80 transition-colors">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 lg:px-12 mt-8 pb-16 flex gap-6 items-start max-w-[1400px] mx-auto">

          {/* Sidebar */}
          <div className="w-72 shrink-0 space-y-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-base font-bold text-foreground mb-3">{t("profile.about")}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{profile.bio}</p>
              <div className="space-y-2.5 text-xs">
                <Row icon={<Mail className="w-3.5 h-3.5" />}     label={t("profile.email")}       value={profile.email} />
                <Row icon={<Calendar className="w-3.5 h-3.5" />}  label={t("profile.birth_date")}  value={profile.birthDate} />
                <Row icon={<Clock className="w-3.5 h-3.5" />}    label={t("profile.last_active")} value="June 18th, 2023" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-base font-bold text-foreground mb-4">{t("profile.reading_stats")}</h2>
              <div className="space-y-4">
                {READING_STAT_KEYS.map(({ labelKey, value, progress }) => (
                  <div key={labelKey}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{t(`profile.${labelKey}`)}</span>
                      <span className="font-semibold text-foreground tabular-nums">{value}</span>
                    </div>
                    <div className="h-[3px] w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex rounded-lg overflow-hidden border border-border w-full mb-5">
              {MAIN_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMainTab(tab)}
                  className={cn(
                    "flex-1 py-2.5 text-sm font-medium transition-colors",
                    mainTab === tab
                      ? "bg-foreground text-background"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {t(`profile.tab_${tab}`)}
                </button>
              ))}
            </div>

            {/* Activity */}
            {mainTab === "activity" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-base font-bold text-foreground mb-0.5">{t("profile.activity_title")}</h2>
                <p className="text-xs text-muted-foreground mb-6">{t("profile.activity_subtitle")}</p>
                <div>
                  {activityItems.map((item, i) => {
                    const Icon = BADGE_ICON[item.type]
                    const isLast = i === activityItems.length - 1
                    return (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-primary-soft bg-background mt-0.5 shrink-0" />
                          {!isLast && <div className="w-px flex-1 bg-border mt-1" />}
                        </div>
                        <div className={cn("flex-1", !isLast && "pb-6")}>
                          <div className="flex items-baseline gap-2 mb-1.5">
                            <span className="text-sm font-semibold text-foreground">{item.title}</span>
                            <span className="text-[11px] text-muted-foreground">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded bg-secondary text-foreground border border-border">
                              <Icon className="w-3 h-3" />
                              {t(`profile.activity_${item.type}`)}
                            </span>
                            <span className="text-xs text-muted-foreground">{item.text}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Library — collections grid */}
            {mainTab === "library" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold text-foreground">{t("profile.library_title")}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{t("profile.library_count", { count: userCollections.length })}</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
                    <Plus className="w-3 h-3" />
                    {t("profile.new_collection")}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {userCollections.map((col) => (
                    <CollectionCard key={col.id} collection={col} label={t("profile.collection")} />
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {mainTab === "comments" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-base font-bold text-foreground mb-0.5">{t("profile.comments_title")}</h2>
                <p className="text-xs text-muted-foreground">{t("profile.comments_empty")}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initial={profile}
        onSave={setProfile}
      />
    </div>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 text-muted-foreground">
      <span className="shrink-0">{icon}</span>
      <span>
        <span className="text-foreground/60 mr-1">{label}:</span>
        {value}
      </span>
    </div>
  )
}

export default Profile
