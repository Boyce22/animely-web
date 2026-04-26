import { TagResponse } from './manga-response.dto';
import { PublicationStatus } from '@/shared/enums/publication-status';

export interface HomePageDto {
  hero: HeroMangaDto[];
  specialForYou: MangaCardDto[];
  trending: MangaCardDto[];
  popular: PopularSectionDto;
  collections: CollectionDto[];
}

export interface HeroMangaDto {
  id: string;
  title: string;
  slug: string;
  description?: string;
  bannerUrl?: string;
  coverUrl: string;
  isMature: boolean;
  tags: TagResponse[];
}

export interface MangaCardDto {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  publicationStatus: PublicationStatus;
  chapterCount: number;
  averageRating: number;
  publicationDate?: Date;
  isMature: boolean;
  tags: TagResponse[];
}

export interface PopularSectionDto {
  items: MangaCardDto[];
  total: number;
}

export interface CollectionDto {
  id: string;
  title: string;
  description: string | null;
  coverUrl?: string | null;
  mangas: CollectionMangaDto[];
}

export interface CollectionMangaDto {
  id: string;
  coverUrl: string;
}
