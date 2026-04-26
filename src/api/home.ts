import { api } from './client'
import type { HomePageDto } from './dto/home-page.dto'

export async function fetchHomePage(): Promise<HomePageDto> {
  const res = await api.get<{ data: HomePageDto }>('/api/mangas/home')
  return res.data
}
