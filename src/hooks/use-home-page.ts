import { useQuery } from '@tanstack/react-query'
import { fetchHomePage } from '@/api/home'

export function useHomePage() {
  return useQuery({
    queryKey: ['home'],
    queryFn: fetchHomePage,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
