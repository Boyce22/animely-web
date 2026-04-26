export interface Chapter {
  id: string
  number: number
  title: string
  date: string
  pages: number
  isNew: boolean
}

export const CHAPTERS: Chapter[] = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  number: 270 - i,
  title:
    i === 0 ? "The Decisive Battle"
    : i === 1 ? "Inhuman Makyo Shinjuku Showdown"
    : i === 2 ? "Girl of Steel"
    : `Chapter ${270 - i}`,
  date: `Jun ${Math.max(1, 20 - i * 2)}, 2025`,
  pages: 18 + ((i * 7) % 10),
  isNew: i < 2,
}))
