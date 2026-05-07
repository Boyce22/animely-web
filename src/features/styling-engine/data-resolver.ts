import type { DataBinding, DataFilter } from "./types"

interface ResolvedCollection {
  items: Record<string, unknown>[]
  total: number
}

const MOCK_COLLECTIONS: Record<string, Record<string, unknown>[]> = {
  "collection-favorites": [
    { title: "Berserk", score: "9.2", gradient: "linear-gradient(160deg,#1a0800,#4a1500 40%,#0d0400)", image: "/images/anime-berserk.jpg" },
    { title: "Vinland Saga", score: "9.0", gradient: "linear-gradient(160deg,#1a1000,#3d2800 40%,#0d0800)", image: "/images/anime-vinland.jpg" },
    { title: "Mushishi", score: "9.0", gradient: "linear-gradient(160deg,#001a0d,#00331a 40%,#000d06)", image: "/images/anime-mushishi.jpg" },
    { title: "Cowboy Bebop", score: "9.1", gradient: "linear-gradient(160deg,#00111f,#002a44 40%,#000810)", image: "/images/anime-bebop.jpg" },
    { title: "Frieren", score: "9.2", gradient: "linear-gradient(160deg,#0a0a1f,#1a1a4a 40%,#050510)", image: "/images/anime-frieren.jpg" },
    { title: "Vagabond", score: "9.3", gradient: "linear-gradient(160deg,#1a0a00,#3d2010 40%,#0d0500)", image: "/images/manga-vagabond.jpg" },
  ],
  "collection-activity": [
    { action: "Terminou de ler", title: "Frieren", episode: "Cap. 118", score: "9.2", time: "2h", type: "read" },
    { action: "Favoritou", title: "Vagabond", episode: "—", time: "5h", type: "fav" },
    { action: "Avaliou", title: "Chainsaw Man", episode: "Cap. 168", score: "8.7", time: "1d", type: "rate" },
    { action: "Começou a ler", title: "Kingdom", episode: "Cap. 1", time: "2d", type: "read" },
  ],
  "collection-badges": [
    { emoji: "⚔️", name: "Guerreiro", bg: "rgba(230,57,70,.18)", rarity: "rare" },
    { emoji: "📚", name: "1k Caps", bg: "rgba(124,58,237,.18)", rarity: "epic" },
    { emoji: "⭐", name: "Reviewer", bg: "rgba(244,162,97,.18)", rarity: "rare" },
    { emoji: "🎯", name: "Early Bird", bg: "rgba(82,183,136,.18)", rarity: "legendary" },
    { emoji: "🔥", name: "Streak 30", bg: "rgba(230,57,70,.18)", rarity: "rare" },
  ],
  "collection-posts": [
    { text: "Cap. 374 de Berserk saiu. Studio Gaga não perdoa.", likes: 48, time: "3h", comments: 12 },
    { text: "Frieren encerrou com perfeição. Obrigado Yamada-sensei.", likes: 31, time: "1d", comments: 7 },
    { text: "Kingdom vol. 67 no correio. Finalmente.", likes: 17, time: "3d", comments: 3 },
  ],
  "collection-social": [
    { name: "X / Twitter", handle: "@kurumi_fan", network: "twitter" },
    { name: "Instagram", handle: "@kurumi.otaku", network: "instagram" },
    { name: "YouTube", handle: "kurumi_reacts", network: "youtube" },
  ],
}

function applyFilter(item: Record<string, unknown>, filter: DataFilter): boolean {
  const val = item[filter.field]
  if (val == null) return false

  switch (filter.operator) {
    case "eq": return String(val) === String(filter.value)
    case "neq": return String(val) !== String(filter.value)
    case "gt": return Number(val) > Number(filter.value)
    case "gte": return Number(val) >= Number(filter.value)
    case "lt": return Number(val) < Number(filter.value)
    case "lte": return Number(val) <= Number(filter.value)
    case "contains": return String(val).toLowerCase().includes(String(filter.value).toLowerCase())
    case "score_gte": return Number(val) >= Number(filter.value)
    case "score_lte": return Number(val) <= Number(filter.value)
  }
}

function applySort(items: Record<string, unknown>[], field: string, direction: "asc" | "desc"): Record<string, unknown>[] {
  return [...items].sort((a, b) => {
    const va = a[field]
    const vb = b[field]
    if (va == null) return 1
    if (vb == null) return -1
    const cmp = String(va).localeCompare(String(vb), undefined, { numeric: true })
    return direction === "asc" ? cmp : -cmp
  })
}

export function resolveCollection(binding: DataBinding): ResolvedCollection {
  let items = MOCK_COLLECTIONS[binding.source]
  if (!items) return { items: [], total: 0 }

  if (binding.filters && binding.filters.length > 0) {
    items = items.filter((item) => binding.filters!.every((f) => applyFilter(item, f)))
  }

  if (binding.sort) {
    items = applySort(items, binding.sort.field, binding.sort.direction)
  }

  if (binding.limit && binding.limit > 0) {
    items = items.slice(0, binding.limit)
  }

  return { items, total: items.length }
}

export function getDefaultBinding(componentType: string): DataBinding | undefined {
  const map: Record<string, DataBinding> = {
    "favorites-grid": { source: "collection-favorites", sort: { field: "score", direction: "desc" } },
    "activity": { source: "collection-activity", sort: { field: "time", direction: "asc" }, limit: 6 },
    "badges": { source: "collection-badges" },
    "posts": { source: "collection-posts", sort: { field: "time", direction: "asc" }, limit: 5 },
    "social-links": { source: "collection-social" },
  }
  return map[componentType]
}
