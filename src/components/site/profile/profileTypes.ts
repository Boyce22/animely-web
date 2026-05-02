export type ProfileTab = "activity" | "library" | "comments"
export type ProfilePageTab = "profile" | "anime_list" | "manga_list" | "favorites" | "activity" | "reviews"
export type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED" | "DELETED"
export type SubscriptionTier = "FREE" | "PRO" | "PREMIUM"
export type UserRole = "USER" | "MODERATOR" | "ADMIN" | "OWNER"
export type PreferredLanguage = "ENGLISH" | "PORTUGUESE" | "SPANISH"
export type UserTheme = "DARK" | "LIGHT" | "SYSTEM"
export type ActivityType = "comment" | "rating" | "bookmark"
export type WidgetStyle = "glass" | "flat" | "bordered" | "shadow" | "neon"

export interface ProfileData {
  id: string
  name: string
  lastName: string
  username: string
  biography: string
  birthDate: string
  email: string
  role: UserRole
  status: UserStatus
  subscriptionTier: SubscriptionTier
  isVerified: boolean
  emailVerifiedAt: string
  profilePictureUrl: string
  bannerUrl: string
  address: string
  createdAt: string
  updatedAt: string
  lastLoginAt: string
  worksCreated: number
  commentsCount: number
  favoritesCount: number
  ratingsCount: number
  collectionsCount: number
  followingCount: number
  followersCount: number
  showMatureContent: boolean
  preferredLanguage: PreferredLanguage
  theme: UserTheme
  isProfilePublic: boolean
  showActivity: boolean
  showCollections: boolean
  timeZone: string
}

export interface EditProfileData {
  username: string
  bio: string
  email: string
  birthDate: string
  avatarUrl: string
  bannerUrl: string
}

export interface UserCollection {
  id: string
  title: string
  count: number
  updatedAt: string
  images: [string, string, string]
}

export interface ProfileActivityItem {
  title: string
  date: string
  type: ActivityType
  text: string
}

export interface WidgetState {
  id: string
  visible: boolean
  transparent: boolean
  x: number
  y: number
  w: number
  h: number
  minW: number
  minH: number
}

export interface FavItem {
  title: string
  score?: string
  gradient: string
}

export interface CharItem {
  name: string
  gradient: string
}

export interface BadgeItem {
  emoji: string
  name: string
  bg: string
}

export interface WidgetActivityItem {
  action: string
  title: string
  episode: string
  score?: string
  gradient: string
  time: string
}

export interface SocialLinkItem {
  name: string
  handle: string
  network: "twitter" | "instagram" | "youtube" | "discord"
}

export interface PostItem {
  text: string
  likes: number
  time: string
}

export interface StatsStatus {
  labelKey: string
  value: number
  color: string
}

export interface ProfileStats {
  episodesWatched: number
  animesCount: number
  animesAvg: string
  chaptersRead: number
  mangasCount: number
  mangasAvg: string
  reviewsCount: number
  followersCount: number
  followingCount: number
}
