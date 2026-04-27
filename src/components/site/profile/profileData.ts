import type { ProfileActivityItem, ProfileData, ProfileTab, UserCollection } from "./profileTypes"

export const PROFILE_TABS: ProfileTab[] = ["activity", "library", "comments"]

export const DEFAULT_PROFILE: ProfileData = {
  id: "5d4dc5db-90d7-4384-a06e-57f5488d5d8a",
  name: "Ryas",
  lastName: "Takahashi",
  username: "kurumi_fan",
  biography:
    "Manga enthusiast and collector. I love fantasy arcs, sharp character writing and long comment threads after a wild episode.",
  birthDate: "1995-05-14",
  email: "user@example.com",
  role: "USER",
  status: "ACTIVE",
  subscriptionTier: "PRO",
  isVerified: true,
  emailVerifiedAt: "2022-03-11",
  profilePictureUrl: "/images/avatar-user.jpg",
  bannerUrl: "/images/wallpaper.jpg",
  address: "Sao Paulo, BR",
  createdAt: "2022-03-10",
  updatedAt: "2026-04-21",
  lastLoginAt: "2026-04-26T20:42:00-03:00",
  worksCreated: 18,
  commentsCount: 342,
  favoritesCount: 19,
  ratingsCount: 128,
  collectionsCount: 6,
  followingCount: 84,
  followersCount: 1200,
  showMatureContent: true,
  preferredLanguage: "PORTUGUESE",
  theme: "DARK",
  isProfilePublic: true,
  showActivity: true,
  showCollections: true,
  timeZone: "America/Sao_Paulo",
}

export const PROFILE_COLLECTIONS: UserCollection[] = [
  {
    id: "1",
    title: "Favorites",
    count: 19,
    updatedAt: "Today",
    images: ["/images/anime-jjk.jpg", "/images/anime-demonslayer.jpg", "/images/anime-aot.jpg"],
  },
  {
    id: "2",
    title: "Watching",
    count: 23,
    updatedAt: "2h ago",
    images: ["/images/anime-onepiece.jpg", "/images/anime-naruto.jpg", "/images/anime-fma.jpg"],
  },
  {
    id: "3",
    title: "Want to Watch",
    count: 57,
    updatedAt: "Yesterday",
    images: ["/images/anime-violet.jpg", "/images/anime-yourname.jpg", "/images/anime-toradora.jpg"],
  },
  {
    id: "4",
    title: "Dark & Intense",
    count: 12,
    updatedAt: "Apr 18",
    images: ["/images/anime-deathnote.jpg", "/images/anime-mob.jpg", "/images/anime-erased.jpg"],
  },
  {
    id: "5",
    title: "Sports",
    count: 8,
    updatedAt: "Apr 12",
    images: ["/images/anime-haikyuu.jpg", "/images/anime-volleyball.jpg", "/images/anime-tsurune.jpg"],
  },
  {
    id: "6",
    title: "Classics",
    count: 31,
    updatedAt: "Apr 03",
    images: ["/images/anime-bebop.jpg", "/images/anime-evangelion.jpg", "/images/anime-fma.jpg"],
  },
]

export const PROFILE_ACTIVITY: ProfileActivityItem[] = [
  {
    title: "Frieren",
    date: "Today",
    type: "comment",
    text: "Left a theory in the newest discussion thread.",
  },
  {
    title: "Solo Leveling S2",
    date: "Yesterday",
    type: "rating",
    text: "Rated 9.1 after episode 4.",
  },
  {
    title: "Jujutsu Kaisen",
    date: "Apr 22",
    type: "bookmark",
    text: "Added to Favorites.",
  },
  {
    title: "Vinland Saga",
    date: "Apr 20",
    type: "comment",
    text: "Joined a long-form discussion about Thorfinn.",
  },
]
