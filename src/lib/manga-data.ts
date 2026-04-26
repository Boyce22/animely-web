export type MangaStatus = "Ongoing" | "Finished" | "Hiatus"

export interface Manga {
  id: string;
  title: string;
  year: string;
  genre: string;
  image: string;
  status: MangaStatus;
  chapters: number;
}

export interface Collection {
  id: string;
  title: string;
  /** Exactly three cover images used for the stacked-fan display */
  images: [string, string, string];
}

export const specialForYou: Manga[] = [
  { id: "1", title: "Spy x Family",          year: "2022", genre: "Comedy",    image: "/images/anime-spy-family.jpg",    status: "Ongoing",  chapters: 113 },
  { id: "2", title: "Sen to Chihiro no Ka...",year: "2001", genre: "Adventure", image: "/images/anime-spirited.jpg",      status: "Finished", chapters: 1   },
  { id: "3", title: "Tokyo Revengers",        year: "2021", genre: "Action",    image: "/images/anime-tokyo-rev.jpg",     status: "Finished", chapters: 278 },
  { id: "4", title: "Haikyuu!!",              year: "2014", genre: "Sports",    image: "/images/anime-haikyuu.jpg",       status: "Finished", chapters: 402 },
  { id: "5", title: "Tales Of Soul",          year: "2020", genre: "Fantasy",   image: "/images/anime-tales.jpg",         status: "Ongoing",  chapters: 45  },
  { id: "6", title: "Golden Kamuy",           year: "2018", genre: "Action",    image: "/images/anime-golden-poster.jpg", status: "Finished", chapters: 314 },
];

export const featuredCollections: Collection[] = [
  {
    id: "1",
    title: "The Best\nMystical Manga",
    images: ["/images/anime-erased.jpg", "/images/anime-another.jpg", "/images/anime-mob.jpg"],
  },
  {
    id: "2",
    title: "Top 20\nRomance Manhwa",
    images: ["/images/anime-yourname.jpg", "/images/anime-toradora.jpg", "/images/anime-violet.jpg"],
  },
  {
    id: "3",
    title: "The Best\nClassic Manga",
    images: ["/images/anime-bebop.jpg", "/images/anime-evangelion.jpg", "/images/anime-fma.jpg"],
  },
  {
    id: "4",
    title: "The Best\nModern Manga",
    images: ["/images/anime-spy-family.jpg", "/images/anime-tokyo-rev.jpg", "/images/anime-haikyuu.jpg"],
  },
];

export const trendingNow: Manga[] = [
  { id: "1", title: "Spy x Family 2",        year: "2023", genre: "Comedy",  image: "/images/anime-spy-family.jpg",    status: "Ongoing",  chapters: 113 },
  { id: "2", title: "Mob Psycho 100 III",     year: "2022", genre: "Action",  image: "/images/anime-mha.jpg",           status: "Finished", chapters: 101 },
  { id: "3", title: "My Hero Acade...",       year: "2016", genre: "Action",  image: "/images/anime-mha.jpg",           status: "Finished", chapters: 430 },
  { id: "4", title: "Vinland Saga",           year: "2019", genre: "Action",  image: "/images/anime-golden-poster.jpg", status: "Finished", chapters: 192 },
  { id: "5", title: "Cyberpunk",              year: "2022", genre: "Sci-Fi",  image: "/images/anime-tokyo-rev.jpg",     status: "Ongoing",  chapters: 34  },
  { id: "6", title: "Chainsaw Man",           year: "2022", genre: "Action",  image: "/images/chainsaw-man-hero.jpg",   status: "Ongoing",  chapters: 197 },
  { id: "7", title: "Bleach: Sennen Kes...",  year: "2022", genre: "Action",  image: "/images/hero-bleach.jpg",         status: "Finished", chapters: 686 },
];

export const mostPopular: Manga[] = [
  { id: "1",  title: "Fullmetal Alchemist",  year: "2009", genre: "Action",    image: "/images/anime-fma.jpg",           status: "Finished", chapters: 108  },
  { id: "2",  title: "Attack on Titan M...", year: "2013", genre: "Action",    image: "/images/anime-aot.jpg",           status: "Finished", chapters: 139  },
  { id: "3",  title: "Death Note",           year: "2006", genre: "Mystery",   image: "/images/anime-deathnote.jpg",     status: "Finished", chapters: 108  },
  { id: "4",  title: "Shingeki No Kyojin",   year: "2013", genre: "Action",    image: "/images/anime-aot.jpg",           status: "Finished", chapters: 139  },
  { id: "5",  title: "Gintama",              year: "2015", genre: "Comedy",    image: "/images/anime-golden-poster.jpg", status: "Finished", chapters: 702  },
  { id: "6",  title: "Steins;Gate",          year: "2011", genre: "Sci-Fi",    image: "/images/anime-spirited.jpg",      status: "Finished", chapters: 27   },
  { id: "7",  title: "Hunter x Hunter",      year: "2011", genre: "Adventure", image: "/images/anime-mha.jpg",           status: "Hiatus",   chapters: 400  },
  { id: "8",  title: "Jujutsu Kaisen",       year: "2020", genre: "Action",    image: "/images/anime-jjk.jpg",           status: "Finished", chapters: 270  },
  { id: "9",  title: "Fullmetal: Brothe...", year: "2009", genre: "Adventure", image: "/images/anime-fma.jpg",           status: "Finished", chapters: 108  },
  { id: "10", title: "Mob Psycho 100",       year: "2016", genre: "Action",    image: "/images/anime-mha.jpg",           status: "Finished", chapters: 101  },
  { id: "11", title: "Chainsaw Man",         year: "2022", genre: "Action",    image: "/images/chainsaw-man-hero.jpg",   status: "Ongoing",  chapters: 197  },
  { id: "12", title: "One Punch Man",        year: "2015", genre: "Action",    image: "/images/anime-onepiece.jpg",      status: "Ongoing",  chapters: 184  },
  { id: "13", title: "Demon Slayer",         year: "2019", genre: "Action",    image: "/images/anime-demonslayer.jpg",   status: "Finished", chapters: 205  },
  { id: "14", title: "My Hero Academia",     year: "2016", genre: "Action",    image: "/images/anime-mha.jpg",           status: "Finished", chapters: 430  },
  { id: "15", title: "Erased",               year: "2016", genre: "Mystery",   image: "/images/anime-spirited.jpg",      status: "Finished", chapters: 44   },
  { id: "16", title: "Naruto Shippuden",     year: "2007", genre: "Action",    image: "/images/anime-naruto.jpg",        status: "Finished", chapters: 700  },
  { id: "17", title: "Your Lie in April",    year: "2014", genre: "Drama",     image: "/images/collection-romance.jpg",  status: "Finished", chapters: 44   },
  { id: "18", title: "Haikyuu!!",            year: "2014", genre: "Sports",    image: "/images/anime-haikyuu.jpg",       status: "Finished", chapters: 402  },
  { id: "19", title: "Code Geass",           year: "2006", genre: "Mecha",     image: "/images/anime-tokyo-rev.jpg",     status: "Finished", chapters: 26   },
  { id: "20", title: "One Piece",            year: "1999", genre: "Adventure", image: "/images/anime-onepiece.jpg",      status: "Ongoing",  chapters: 1110 },
  { id: "21", title: "Violet Evergarden",    year: "2018", genre: "Drama",     image: "/images/collection-romance.jpg",  status: "Finished", chapters: 14   },
  { id: "22", title: "Re:Zero",              year: "2016", genre: "Fantasy",   image: "/images/anime-spirited.jpg",      status: "Ongoing",  chapters: 92   },
  { id: "23", title: "Overlord",             year: "2015", genre: "Fantasy",   image: "/images/collection-mystical.jpg", status: "Ongoing",  chapters: 73   },
  { id: "24", title: "Dr. Stone",            year: "2019", genre: "Sci-Fi",    image: "/images/anime-tales.jpg",         status: "Finished", chapters: 232  },
];

export interface FeaturedHero {
  id: string;
  title: string;
  /** Stylized title with line break, e.g. "Chainsaw\nMan" */
  displayTitle: string;
  tagline: string;
  description: string;
  image: string;
  thumb: string;
}

export const heroFeatured: FeaturedHero[] = [
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    displayTitle: "Chainsaw\nMan",
    tagline: "Action · Dark Fantasy · 2022",
    description: "Denji has a simple dream — to live a happy and peaceful life. A young man who, by a twist of fate, became part devil.",
    thumb: "/images/wallpaper.jpg",
    image: "https://wallpapers-clan.com/wp-content/uploads/2025/04/chainsaw-man-anime-power-desktop-wallpaper-cover.jpg",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    displayTitle: "Jujutsu\nKaisen",
    tagline: "Action · Supernatural · 2020",
    description: "Yuji Itadori swallows a cursed talisman to save his friends and enters a hidden world of sorcerers fighting vengeful spirits.",
    thumb: "/images/anime-jjk.jpg",
    image: "https://images5.alphacoders.com/133/thumb-1920-1337369.png",
  },
  // {
  //   id: "akame-ga-kill",
  //   title: "Akame ga Kill",
  //   displayTitle: "Akame ga\nKill",
  //   tagline: "Action · Dark Fantasy · 2014",
  //   description: "Tatsumi joins Night Raid, a group of assassins fighting to overthrow a corrupt empire filled with cruelty and injustice.",
  //   thumb: "https://konachan.com/jpeg/323c0496b8b25a830ef73b4c18f87508/Konachan.com%20-%20214936%20akame_ga_kill%21%20beach%20bikini%20breasts%20erect_nipples%20esdeath%20hat%20heart%20hewsack%20swimsuit%20tattoo%20undressing%20watermark.jpg",
  //   image: "https://c4.wallpaperflare.com/wallpaper/656/816/932/akame-ga-kill-red-eyes-akame-wallpaper-preview.jpg",
  // },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    displayTitle: "Demon\nSlayer",
    tagline: "Action · Supernatural · 2019",
    description: "After his family is slaughtered by demons, Tanjiro Kamado sets out on a journey to turn his sister back into a human.",
    thumb: "/images/anime-demonslayer.jpg",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/23651.jpg",
  },
  {
    id: "bleach",
    title: "Bleach: Sennen Kessen-hen",
    displayTitle: "Bleach\nSennen Kessen-hen",
    tagline: "Action · Supernatural · 2022",
    description: "The Wandenreich declares war on Soul Society, and Ichigo Kurosaki rises once again to defend everything he protects.",
    thumb: "/images/hero-bleach.jpg",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/24386.jpg",
  },
];