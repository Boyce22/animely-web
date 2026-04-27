export interface CatalogItem {
  id:       number
  title:    string
  author:   string
  genres:   string[]
  status:   "ongoing" | "completed" | "hiatus"
  score:    number
  chapters: number
  year:     number
  covClass: string
}

export const CATALOG_DATA: CatalogItem[] = [
  { id:  1, title: "Berserk",                author: "Kentaro Miura",      genres: ["Action","Adventure","Drama","Fantasy","Seinen"],            status: "hiatus",    score: 9.4, chapters: 364,  year: 1989, covClass: "cov-1"  },
  { id:  2, title: "Vinland Saga",           author: "Makoto Yukimura",    genres: ["Action","Adventure","Drama","Seinen","Historical"],          status: "ongoing",   score: 9.1, chapters: 210,  year: 2005, covClass: "cov-6"  },
  { id:  3, title: "Jujutsu Kaisen",         author: "Gege Akutami",       genres: ["Action","Fantasy","Shounen","Supernatural"],                 status: "ongoing",   score: 8.7, chapters: 265,  year: 2018, covClass: "cov-3"  },
  { id:  4, title: "Chainsaw Man",           author: "Tatsuki Fujimoto",   genres: ["Action","Horror","Seinen"],                                  status: "ongoing",   score: 8.9, chapters: 168,  year: 2018, covClass: "cov-1"  },
  { id:  5, title: "Frieren",                author: "Kanehito Yamada",    genres: ["Adventure","Drama","Fantasy","Seinen"],                      status: "ongoing",   score: 9.2, chapters: 118,  year: 2020, covClass: "cov-2"  },
  { id:  6, title: "Vagabond",               author: "Takehiko Inoue",     genres: ["Action","Drama","Seinen","Historical"],                      status: "hiatus",    score: 9.3, chapters: 327,  year: 1998, covClass: "cov-6"  },
  { id:  7, title: "Oyasumi Punpun",         author: "Inio Asano",         genres: ["Drama","Romance","Slice of Life","Seinen","Psychological"],  status: "completed", score: 9.1, chapters: 147,  year: 2007, covClass: "cov-11" },
  { id:  8, title: "Dungeon Meshi",          author: "Ryoko Kui",          genres: ["Adventure","Fantasy","Slice of Life","Seinen","Cooking"],    status: "completed", score: 9.0, chapters: 97,   year: 2014, covClass: "cov-4"  },
  { id:  9, title: "Blue Lock",              author: "Muneyuki Kaneshiro", genres: ["Sports","Action","Shounen"],                                 status: "ongoing",   score: 8.6, chapters: 255,  year: 2018, covClass: "cov-13" },
  { id: 10, title: "Dandadan",               author: "Yukinobu Tatsu",     genres: ["Action","Romance","Sci-Fi","Shounen","Supernatural"],        status: "ongoing",   score: 8.8, chapters: 162,  year: 2021, covClass: "cov-4"  },
  { id: 11, title: "Mushishi",               author: "Yuki Urushibara",    genres: ["Adventure","Mystery","Slice of Life","Seinen","Supernatural"], status: "completed", score: 9.0, chapters: 50, year: 1999, covClass: "cov-10" },
  { id: 12, title: "Solo Leveling",          author: "Chugong",            genres: ["Action","Adventure","Fantasy","Dungeon"],                    status: "completed", score: 8.5, chapters: 179,  year: 2018, covClass: "cov-5"  },
  { id: 13, title: "Oshi no Ko",             author: "Aka Akasaka",        genres: ["Drama","Romance","Seinen","Idol"],                           status: "ongoing",   score: 8.7, chapters: 145,  year: 2020, covClass: "cov-12" },
  { id: 14, title: "Tokyo Ghoul",            author: "Sui Ishida",         genres: ["Action","Horror","Drama","Seinen"],                          status: "completed", score: 8.1, chapters: 144,  year: 2011, covClass: "cov-3"  },
  { id: 15, title: "One Piece",              author: "Eiichiro Oda",       genres: ["Action","Adventure","Fantasy","Shounen","Pirate"],           status: "ongoing",   score: 9.0, chapters: 1110, year: 1997, covClass: "cov-9"  },
  { id: 16, title: "Ping Pong",              author: "Taiyo Matsumoto",    genres: ["Drama","Sports","Seinen"],                                   status: "completed", score: 8.9, chapters: 57,   year: 1996, covClass: "cov-8"  },
  { id: 17, title: "20th Century Boys",      author: "Naoki Urasawa",      genres: ["Drama","Mystery","Sci-Fi","Seinen"],                         status: "completed", score: 9.0, chapters: 249,  year: 1999, covClass: "cov-14" },
  { id: 18, title: "Attack on Titan",        author: "Hajime Isayama",     genres: ["Action","Drama","Fantasy","Shounen"],                        status: "completed", score: 9.0, chapters: 139,  year: 2009, covClass: "cov-1"  },
  { id: 19, title: "Hunter x Hunter",        author: "Yoshihiro Togashi",  genres: ["Action","Adventure","Fantasy","Shounen"],                    status: "hiatus",    score: 9.0, chapters: 400,  year: 1998, covClass: "cov-9"  },
  { id: 20, title: "Nana",                   author: "Ai Yazawa",          genres: ["Drama","Romance","Slice of Life","Josei","Music"],           status: "hiatus",    score: 8.8, chapters: 84,   year: 2000, covClass: "cov-12" },
  { id: 21, title: "Pluto",                  author: "Naoki Urasawa",      genres: ["Drama","Mystery","Sci-Fi","Seinen"],                         status: "completed", score: 8.9, chapters: 65,   year: 2003, covClass: "cov-5"  },
  { id: 22, title: "Dorohedoro",             author: "Q Hayashida",        genres: ["Action","Fantasy","Horror","Seinen"],                        status: "completed", score: 8.7, chapters: 167,  year: 2000, covClass: "cov-7"  },
  { id: 23, title: "Golden Kamuy",           author: "Satoru Noda",        genres: ["Action","Adventure","Seinen","Historical"],                  status: "completed", score: 8.7, chapters: 314,  year: 2014, covClass: "cov-6"  },
  { id: 24, title: "The Promised Neverland", author: "Kaiu Shirai",        genres: ["Action","Drama","Horror","Shounen","Survival"],              status: "completed", score: 8.4, chapters: 181,  year: 2016, covClass: "cov-15" },
  { id: 25, title: "Spy x Family",           author: "Tatsuya Endo",       genres: ["Action","Comedy","Romance","Shounen"],                       status: "ongoing",   score: 8.5, chapters: 110,  year: 2019, covClass: "cov-16" },
  { id: 26, title: "Kaguya-sama",            author: "Aka Akasaka",        genres: ["Comedy","Romance","Seinen","School"],                        status: "completed", score: 8.7, chapters: 281,  year: 2015, covClass: "cov-12" },
  { id: 27, title: "Fullmetal Alchemist",    author: "Hiromu Arakawa",     genres: ["Action","Adventure","Drama","Shounen","Military"],           status: "completed", score: 9.1, chapters: 116,  year: 2001, covClass: "cov-9"  },
  { id: 28, title: "Death Note",             author: "Tsugumi Ohba",       genres: ["Drama","Mystery","Shounen","Psychological","Supernatural"],  status: "completed", score: 8.8, chapters: 108,  year: 2003, covClass: "cov-11" },
  { id: 29, title: "Demon Slayer",           author: "Koyoharu Gotouge",   genres: ["Action","Adventure","Fantasy","Shounen","Historical"],       status: "completed", score: 8.5, chapters: 205,  year: 2016, covClass: "cov-1"  },
  { id: 30, title: "Kingdom",                author: "Yasuhisa Hara",      genres: ["Action","Drama","Seinen","Historical","Military"],           status: "ongoing",   score: 8.7, chapters: 770,  year: 2006, covClass: "cov-6"  },
  { id: 31, title: "Re:Zero",                author: "Tappei Nagatsuki",   genres: ["Action","Drama","Fantasy","Isekai"],                         status: "ongoing",   score: 8.5, chapters: 102,  year: 2014, covClass: "cov-2"  },
  { id: 32, title: "Dr. Stone",              author: "Riichiro Inagaki",   genres: ["Action","Adventure","Sci-Fi","Shounen"],                     status: "completed", score: 8.3, chapters: 232,  year: 2017, covClass: "cov-8"  },
  { id: 33, title: "Naruto",                 author: "Masashi Kishimoto",  genres: ["Action","Adventure","Fantasy","Shounen","Ninja"],            status: "completed", score: 8.0, chapters: 700,  year: 1999, covClass: "cov-9"  },
  { id: 34, title: "My Hero Academia",       author: "Kohei Horikoshi",    genres: ["Action","Fantasy","Shounen","School"],                       status: "completed", score: 8.1, chapters: 430,  year: 2014, covClass: "cov-13" },
  { id: 35, title: "Goodnight Punpun",       author: "Inio Asano",         genres: ["Drama","Slice of Life","Seinen"],                            status: "completed", score: 8.8, chapters: 147,  year: 2007, covClass: "cov-11" },
  { id: 36, title: "Black Clover",           author: "Yuki Tabata",        genres: ["Action","Fantasy","Shounen"],                                status: "ongoing",   score: 7.9, chapters: 380,  year: 2015, covClass: "cov-4"  },
]

export const COV_GRADIENTS: Record<string, string> = {
  "cov-1":  "linear-gradient(160deg,#1a0800,#4a1500 40%,#0d0400)",
  "cov-2":  "linear-gradient(160deg,#0a0a1f,#1a1a4a 40%,#050510)",
  "cov-3":  "linear-gradient(160deg,#100010,#300030 40%,#080008)",
  "cov-4":  "linear-gradient(160deg,#001510,#003328 40%,#000d08)",
  "cov-5":  "linear-gradient(160deg,#00111f,#002a44 40%,#000810)",
  "cov-6":  "linear-gradient(160deg,#1a1000,#3d2800 40%,#0d0800)",
  "cov-7":  "linear-gradient(160deg,#100010,#280028 40%,#0a000a)",
  "cov-8":  "linear-gradient(160deg,#0d0d00,#1e1e00 40%,#080800)",
  "cov-9":  "linear-gradient(160deg,#1a0a00,#3d2010 40%,#0d0500)",
  "cov-10": "linear-gradient(160deg,#001a0d,#00331a 40%,#000d06)",
  "cov-11": "linear-gradient(160deg,#0d001a,#200035 40%,#06000d)",
  "cov-12": "linear-gradient(160deg,#1a0010,#350020 40%,#0d0008)",
  "cov-13": "linear-gradient(160deg,#001533,#002866 40%,#000a1a)",
  "cov-14": "linear-gradient(160deg,#151500,#2a2a00 40%,#0a0a00)",
  "cov-15": "linear-gradient(160deg,#1a0500,#381000 40%,#0d0200)",
  "cov-16": "linear-gradient(160deg,#001a1a,#003333 40%,#000d0d)",
}

export const DIAGONAL_LINES = "repeating-linear-gradient(-52deg,transparent,transparent 20px,rgba(255,255,255,0.012) 20px,rgba(255,255,255,0.012) 21px)"

export const STATUS_STYLES: Record<CatalogItem["status"], string> = {
  ongoing:   "bg-[#52b788] text-black",
  completed: "bg-[#3a3a3a] text-white/60",
  hiatus:    "bg-[#f4a261] text-black",
}

export const STATUS_T_KEYS: Record<CatalogItem["status"], string> = {
  ongoing:   "manga_card.ongoing",
  completed: "manga_card.finished",
  hiatus:    "manga_card.hiatus",
}
