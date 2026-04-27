export const TOP_WEEK = [
  { rank: 1, title: "Frieren: BtJE", score: 9.42 },
  { rank: 2, title: "Solo Leveling S2", score: 9.11 },
  { rank: 3, title: "Dandadan", score: 8.97 },
  { rank: 4, title: "Blue Lock S2", score: 8.84 },
  { rank: 5, title: "Oshi no Ko S2", score: 8.79 },
] as const

export const FRIEND_ACTIVITY = [
  { initial: "R", gradient: "linear-gradient(135deg,#2d6a4f,#1b4332)", user: "rafaelomg",    action: "Terminou Vinland Saga S2 Â· â˜…10", time: "5m"  },
  { initial: "S", gradient: "linear-gradient(135deg,#6930c3,#1d3557)", user: "sakura_drop",  action: "Adicionou Re:Zero S3",             time: "18m" },
  { initial: "L", gradient: "linear-gradient(135deg,#457b9d,#1d3557)", user: "luka_anime",   action: "Assistindo AoT Final Ep.87",       time: "31m" },
  { initial: "N", gradient: "linear-gradient(135deg,#e63946,#c1121f)", user: "natsumi_w",    action: "Avaliou JJK S3 com 8.5",           time: "45m" },
] as const

export const NEWS = [
  { source: "Crunchyroll",  title: "Frieren confirma 2Âª temporada para 2026",       time: "3h" },
  { source: "ANN",          title: "MAPPA divulga visual de projeto original inÃ©dito", time: "5h" },
  { source: "Anime News",   title: "Solo Leveling S2 confirma 13 episÃ³dios",         time: "8h" },
] as const

export const RECOMMENDED = [
  { title: "Vinland Saga", genre: "HistÃ³rico Â· Seinen", score: "9.1" },
  { title: "Mushishi",     genre: "MistÃ©rio Â· SoL",      score: "9.0" },
  { title: "Ping Pong",    genre: "Esporte Â· Drama",     score: "8.8" },
] as const

export type TopWeekItem = (typeof TOP_WEEK)[number]
export type FriendActivityItem = (typeof FRIEND_ACTIVITY)[number]
export type NewsItem = (typeof NEWS)[number]
export type RecommendedItem = (typeof RECOMMENDED)[number]
