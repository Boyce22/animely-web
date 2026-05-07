import type {
  BadgeItem,
  CharItem,
  FavItem,
  PostItem,
  ProfileActivityItem,
  ProfileData,
  ProfileStats,
  ProfileTab,
  SocialLinkItem,
  UserCollection,
  WidgetActivityItem,
  WidgetState,
} from "./profileTypes"

export const PROFILE_TABS: ProfileTab[] = ["activity", "library", "comments"]

export const DEFAULT_PROFILE: ProfileData = {
  id: "5d4dc5db-90d7-4384-a06e-57f5488d5d8a",
  name: "Ryas",
  lastName: "Takahashi",
  username: "kurumi_fan",
  biography:
    "Apreciador de dark fantasy e seinen desde os 14 anos. Berserk mudou completamente minha visão de narrativa e arte. Sempre procurando o próximo mangá que vai me destruir emocionalmente — e geralmente acho.",
  birthDate: "1995-05-14",
  email: "user@example.com",
  role: "USER",
  status: "ACTIVE",
  subscriptionTier: "PRO",
  isVerified: true,
  emailVerifiedAt: "2022-03-11",
  profilePictureUrl: "/images/avatar-user.jpg",
  bannerUrl: "/images/wallpaper.jpg",
  address: "Valinhos / SP",
  createdAt: "2022-01-01",
  updatedAt: "2026-04-21",
  lastLoginAt: "2026-04-26T20:42:00-03:00",
  worksCreated: 18,
  commentsCount: 342,
  favoritesCount: 19,
  ratingsCount: 128,
  collectionsCount: 6,
  followingCount: 89,
  followersCount: 312,
  showMatureContent: true,
  preferredLanguage: "PORTUGUESE",
  theme: "DARK",
  isProfilePublic: true,
  showActivity: true,
  showCollections: true,
  timeZone: "America/Sao_Paulo",
  genres: ["Dark Fantasy", "Seinen", "Psychological", "Historical", "Slice of Life"],
}

export const PROFILE_STATS: ProfileStats = {
  episodesWatched: 1247,
  animesCount: 387,
  animesAvg: "7.8",
  chaptersRead: 12840,
  mangasCount: 214,
  mangasAvg: "8.2",
  reviewsCount: 48,
  followersCount: 312,
  followingCount: 89,
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
  { title: "Frieren", date: "Today", type: "comment", text: "Left a theory in the newest discussion thread." },
  { title: "Solo Leveling S2", date: "Yesterday", type: "rating", text: "Rated 9.1 after episode 4." },
  { title: "Jujutsu Kaisen", date: "Apr 22", type: "bookmark", text: "Added to Favorites." },
  { title: "Vinland Saga", date: "Apr 20", type: "comment", text: "Joined a long-form discussion about Thorfinn." },
]

const G = {
  dark_red:     "linear-gradient(160deg,#1a0800,#4a1500 40%,#0d0400)",
  dark_blue:    "linear-gradient(160deg,#0a0a1f,#1a1a4a 40%,#050510)",
  dark_purple:  "linear-gradient(160deg,#100010,#300030 40%,#080008)",
  dark_green:   "linear-gradient(160deg,#001510,#003328 40%,#000d08)",
  dark_navy:    "linear-gradient(160deg,#00111f,#002a44 40%,#000810)",
  dark_orange:  "linear-gradient(160deg,#1a1000,#3d2800 40%,#0d0800)",
  dark_violet:  "linear-gradient(160deg,#100010,#280028 40%,#0a000a)",
  dark_olive:   "linear-gradient(160deg,#0d0d00,#1e1e00 40%,#080800)",
  dark_amber:   "linear-gradient(160deg,#1a0a00,#3d2010 40%,#0d0500)",
  dark_teal:    "linear-gradient(160deg,#001a0d,#00331a 40%,#000d06)",
  dark_indigo:  "linear-gradient(160deg,#0d001a,#200035 40%,#06000d)",
  dark_rose:    "linear-gradient(160deg,#1a0010,#350020 40%,#0d0008)",
  dark_cobalt:  "linear-gradient(160deg,#001533,#002866 40%,#000a1a)",
  dark_yellow:  "linear-gradient(160deg,#151500,#2a2a00 40%,#0a0a00)",
}

export const FAV_ANIMES: FavItem[] = [
  { title: "Berserk",        score: "9.2", gradient: G.dark_red },
  { title: "Vinland Saga",   score: "9.0", gradient: G.dark_orange },
  { title: "Kabeneri",       score: "8.1", gradient: G.dark_violet },
  { title: "Mushishi",       score: "9.0", gradient: G.dark_teal },
  { title: "Ping Pong",      score: "8.9", gradient: G.dark_olive },
  { title: "Cowboy Bebop",   score: "9.1", gradient: G.dark_navy },
]

export const FAV_MANGAS: FavItem[] = [
  { title: "Berserk",           score: "9.4", gradient: G.dark_red },
  { title: "Vagabond",          score: "9.3", gradient: G.dark_orange },
  { title: "Oyasumi Punpun",    score: "9.1", gradient: G.dark_indigo },
  { title: "Mushishi",          score: "9.0", gradient: G.dark_teal },
  { title: "Frieren",           score: "9.2", gradient: G.dark_blue },
  { title: "20th Century Boys", score: "9.0", gradient: G.dark_yellow },
]

export const FAV_CHARS: CharItem[] = [
  { name: "Guts",      gradient: G.dark_red,    series: "Berserk" },
  { name: "Thorfinn",  gradient: G.dark_orange, series: "Vinland Saga" },
  { name: "Ginko",     gradient: G.dark_teal,   series: "Mushishi" },
  { name: "Punpun",    gradient: G.dark_indigo, series: "Oyasumi Punpun" },
  { name: "Laios",     gradient: G.dark_green,  series: "Dungeon Meshi" },
  { name: "Frieren",   gradient: G.dark_blue,   series: "Frieren" },
  { name: "Griffith",  gradient: G.dark_purple, series: "Berserk" },
  { name: "Askeladd",  gradient: G.dark_orange, series: "Vinland Saga" },
]

export const FAV_STAFF: CharItem[] = [
  { name: "Kentaro Miura",    gradient: G.dark_red,    series: "Berserk" },
  { name: "Takehiko Inoue",   gradient: G.dark_orange, series: "Vagabond" },
  { name: "Yuki Urushibara",  gradient: G.dark_teal,   series: "Mushishi" },
  { name: "Inio Asano",       gradient: G.dark_indigo, series: "Oyasumi Punpun" },
  { name: "Makoto Yukimura",  gradient: G.dark_orange, series: "Vinland Saga" },
  { name: "Ryoko Kui",        gradient: G.dark_green,  series: "Dungeon Meshi" },
  { name: "Naoki Urasawa",    gradient: G.dark_yellow, series: "20th Century Boys" },
  { name: "Tatsuki Fujimoto", gradient: G.dark_violet, series: "Chainsaw Man" },
]

export const WIDGET_BADGES: BadgeItem[] = [
  { emoji: "⚔️", name: "Guerreiro",  bg: "rgba(230,57,70,.18)",   rarity: "rare" },
  { emoji: "📚", name: "1k Caps",    bg: "rgba(124,58,237,.18)",  rarity: "epic" },
  { emoji: "⭐", name: "Reviewer",   bg: "rgba(244,162,97,.18)",  rarity: "rare" },
  { emoji: "🎯", name: "Early Bird", bg: "rgba(82,183,136,.18)",  rarity: "legendary" },
  { emoji: "🌙", name: "Noturno",    bg: "rgba(96,165,250,.18)",  rarity: "common" },
  { emoji: "🔥", name: "Streak 30",  bg: "rgba(230,57,70,.18)",   rarity: "rare" },
]

export const WIDGET_ACTIVITY: WidgetActivityItem[] = [
  { action: "Terminou de ler",      title: "Frieren",         episode: "Cap. 118", score: "9.2", gradient: G.dark_blue,   time: "2h", type: "read" },
  { action: "Favoritou",            title: "Vagabond",        episode: "—",                      gradient: G.dark_orange, time: "5h", type: "fav" },
  { action: "Avaliou",              title: "Chainsaw Man",    episode: "Cap. 168", score: "8.7", gradient: G.dark_red,    time: "1d", type: "rate" },
  { action: "Começou a ler",        title: "Kingdom",         episode: "Cap. 1",                 gradient: G.dark_orange, time: "2d", type: "read" },
  { action: "Terminou de assistir", title: "Vinland Saga S2", episode: "Ep. 24",   score: "9.0", gradient: G.dark_orange, time: "3d", type: "watch" },
  { action: "Publicou review de",   title: "Berserk",         episode: "—",                      gradient: G.dark_red,    time: "4d", type: "review" },
]

export const WIDGET_SOCIAL: SocialLinkItem[] = [
  { name: "X / Twitter", handle: "@kurumi_fan",      network: "twitter" },
  { name: "Instagram",   handle: "@kurumi.otaku",    network: "instagram" },
  { name: "YouTube",     handle: "kurumi_reacts",    network: "youtube" },
  { name: "Discord",     handle: "kurumi_fan#0001",  network: "discord" },
]

export const WIDGET_POSTS: PostItem[] = [
  { text: "Cap. 374 de Berserk saiu. Studio Gaga não perdoa. Absolutamente devastador.", likes: 48, time: "3h", comments: 12 },
  { text: "Frieren encerrou com perfeição. Obrigado Yamada-sensei.", likes: 31, time: "1d", comments: 7 },
  { text: "Kingdom vol. 67 no correio. Finalmente.", likes: 17, time: "3d", comments: 3 },
]

export const DEFAULT_WIDGET_STATES: WidgetState[] = [
  // Section 1 — header: avatar takes rows 0-4, bio fills top-right, stats fill bottom-right
  { id: "avatar",     visible: true, transparent: false, x: 0,  y: 0,  w: 3,  h: 5,  minW: 2, minH: 3 },
  { id: "bio",        visible: true, transparent: false, x: 3,  y: 0,  w: 9,  h: 2,  minW: 4, minH: 2 },
  { id: "statsAnime", visible: true, transparent: false, x: 3,  y: 2,  w: 4,  h: 3,  minW: 3, minH: 2 },
  { id: "statsManga", visible: true, transparent: false, x: 7,  y: 2,  w: 5,  h: 3,  minW: 3, minH: 2 },
  // Section 2 — favorite media (4 rows each)
  { id: "favAnime",   visible: true, transparent: false, x: 0,  y: 5,  w: 6,  h: 4,  minW: 4, minH: 3 },
  { id: "favManga",   visible: true, transparent: false, x: 6,  y: 5,  w: 6,  h: 4,  minW: 4, minH: 3 },
  // Section 3 — characters & staff (4 rows each)
  { id: "favChars",   visible: true, transparent: false, x: 0,  y: 9,  w: 6,  h: 4,  minW: 3, minH: 3 },
  { id: "favStaff",   visible: true, transparent: false, x: 6,  y: 9,  w: 6,  h: 4,  minW: 3, minH: 3 },
  // Section 4 — compact utility row: music(2) + badges(4) + social(3) + clock(3) = 12
  { id: "music",      visible: true, transparent: false, x: 0,  y: 13, w: 2,  h: 3,  minW: 2, minH: 3 },
  { id: "badges",     visible: true, transparent: false, x: 2,  y: 13, w: 4,  h: 3,  minW: 2, minH: 3 },
  { id: "social",     visible: true, transparent: false, x: 6,  y: 13, w: 3,  h: 3,  minW: 2, minH: 3 },
  { id: "clock",      visible: true, transparent: false, x: 9,  y: 13, w: 3,  h: 3,  minW: 2, minH: 2 },
  // Divider
  { id: "divider",    visible: true, transparent: true,  x: 0,  y: 16, w: 12, h: 1,  minW: 4, minH: 1 },
  // Section 5 — activity(4) + text(5) + posts(3) = 12
  { id: "activity",   visible: true, transparent: false, x: 0,  y: 17, w: 4,  h: 4,  minW: 3, minH: 3 },
  { id: "text",       visible: true, transparent: false, x: 4,  y: 17, w: 5,  h: 4,  minW: 2, minH: 2 },
  { id: "posts",      visible: true, transparent: false, x: 9,  y: 17, w: 3,  h: 4,  minW: 2, minH: 2 },
]

export const VIEW_LAYOUT: Record<string, { gridColumn: string; gridRow: string; display?: string }> = {
  // Section 1
  avatar:     { gridColumn: "1 / span 3",  gridRow: "1 / span 5"  },
  bio:        { gridColumn: "4 / span 9",  gridRow: "1 / span 2"  },
  statsAnime: { gridColumn: "4 / span 4",  gridRow: "3 / span 3"  },
  statsManga: { gridColumn: "8 / span 5",  gridRow: "3 / span 3"  },
  // Section 2
  favAnime:   { gridColumn: "1 / span 6",  gridRow: "6 / span 4"  },
  favManga:   { gridColumn: "7 / span 6",  gridRow: "6 / span 4"  },
  // Section 3
  favChars:   { gridColumn: "1 / span 6",  gridRow: "10 / span 4" },
  favStaff:   { gridColumn: "7 / span 6",  gridRow: "10 / span 4" },
  // Section 4 — col totals: 2+4+3+3 = 12
  music:      { gridColumn: "1 / span 2",  gridRow: "14 / span 3" },
  badges:     { gridColumn: "3 / span 4",  gridRow: "14 / span 3" },
  social:     { gridColumn: "7 / span 3",  gridRow: "14 / span 3" },
  clock:      { gridColumn: "10 / span 3", gridRow: "14 / span 3" },
  // Divider
  divider:    { gridColumn: "1 / span 12", gridRow: "17 / span 1" },
  // Section 5 — col totals: 4+5+3 = 12
  activity:   { gridColumn: "1 / span 4",  gridRow: "18 / span 4" },
  text:       { gridColumn: "5 / span 5",  gridRow: "18 / span 4" },
  posts:      { gridColumn: "10 / span 3", gridRow: "18 / span 4" },
}
