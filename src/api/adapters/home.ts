import { PublicationStatus } from '@/shared/enums/publication-status'
import type { Manga, MangaStatus, FeaturedHero, Collection } from '@/lib/manga-data'
import type { HeroMangaDto, MangaCardDto, CollectionDto } from '@/api/dto/home-page.dto'

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) ?? ''

function toAbsoluteUrl(url: string): string {
  if (!url) return url
  return url.startsWith('/') ? `${API_BASE}${url}` : url
}

function adaptStatus(status: PublicationStatus): MangaStatus {
  switch (status) {
    case PublicationStatus.COMPLETED:  return 'Finished'
    case PublicationStatus.HIATUS:     return 'Hiatus'
    case PublicationStatus.CANCELLED:  return 'Finished'
    default:                           return 'Ongoing'
  }
}

export function adaptMangaCard(dto: MangaCardDto): Manga {
  return {
    id: dto.id,
    title: dto.title,
    year: dto.publicationDate ? new Date(dto.publicationDate).getFullYear().toString() : '',
    genre: dto.tags[0]?.name ?? '',
    image: toAbsoluteUrl(dto.coverUrl),
    status: adaptStatus(dto.publicationStatus),
    chapters: dto.chapterCount,
  }
}

export function adaptHeroManga(dto: HeroMangaDto): FeaturedHero {
  const tagline = dto.tags.slice(0, 3).map((t) => t.name).join(' · ')
  return {
    id: dto.id,
    title: dto.title,
    displayTitle: dto.title,
    tagline,
    description: dto.description ?? '',
    image: toAbsoluteUrl(dto.bannerUrl ?? dto.coverUrl),
    thumb: toAbsoluteUrl(dto.coverUrl),
  }
}

export function adaptCollection(dto: CollectionDto): Collection {
  const covers = dto.mangas.slice(0, 3).map((m) => toAbsoluteUrl(m.coverUrl))
  while (covers.length < 3) covers.push('')
  return {
    id: dto.id,
    title: dto.title,
    images: covers as [string, string, string],
  }
}
