import type { StylingProfile } from "./types"

export const DEFAULT_STYLING_PROFILE: StylingProfile = {
  version: 1,
  name: "Default",
  canvas: {
    background: "#0a0a0a",
    accentColor: "#e63946",
    maxWidth: "1400px",
    padding: "40px",
  },
  sections: [
    {
      id: "section-header",
      label: "Cabeçalho",
      layout: "grid-3",
      style: { gap: "18px" },
      components: [
        {
          id: "avatar",
          type: "avatar",
          style: { gridColumn: "span 1" },
        },
        {
          id: "bio",
          type: "bio",
          style: { gridColumn: "span 2" },
        },
      ],
    },
    {
      id: "section-stats",
      label: "Estatísticas",
      layout: "flex-row",
      style: { gap: "18px" },
      components: [
        {
          id: "stats-anime",
          type: "stats",
          title: "Stats Anime",
          style: { flex: "1" },
          data: {
            items: [
              { label: "Episódios Assistidos", value: 1247, color: "#52b788" },
              { label: "Completos", value: 318, color: "#555" },
              { label: "Pausados", value: 42, color: "#f4a261" },
              { label: "Dropados", value: 13, color: "#e63946" },
            ],
          },
        },
        {
          id: "stats-manga",
          type: "stats",
          title: "Stats Mangá",
          style: { flex: "1" },
          data: {
            items: [
              { label: "Capítulos Lidos", value: 12840, color: "#e63946" },
              { label: "Completos", value: 178, color: "#555" },
              { label: "Pausados", value: 21, color: "#f4a261" },
              { label: "Dropados", value: 3, color: "#e63946" },
            ],
          },
        },
      ],
    },
    {
      id: "section-favorites",
      label: "Favoritos",
      layout: "grid-2",
      style: { gap: "18px" },
      components: [
        {
          id: "fav-anime",
          type: "favorites-grid",
          title: "Animes Favoritos",
          style: {},
          data: {
            title: "Animes Favoritos",
            binding: {
              source: "collection-favorites",
              sort: { field: "score", direction: "desc" },
              limit: 6,
            },
          },
        },
        {
          id: "fav-manga",
          type: "favorites-grid",
          title: "Mangás Favoritos",
          style: {},
          data: {
            title: "Mangás Favoritos",
          },
        },
      ],
    },
    {
      id: "section-characters",
      label: "Personagens & Staff",
      layout: "grid-2",
      style: { gap: "18px" },
      components: [
        {
          id: "fav-chars",
          type: "characters-grid",
          title: "Personagens Favoritos",
          style: {},
        },
        {
          id: "fav-staff",
          type: "characters-grid",
          title: "Staff / Autores",
          style: {},
          data: {
            title: "Staff",
          },
        },
      ],
    },
    {
      id: "section-utility",
      label: "Utilitários",
      layout: "flex-row",
      style: { gap: "18px" },
      components: [
        {
          id: "music",
          type: "music",
          style: { flex: "2" },
        },
        {
          id: "badges",
          type: "badges",
          title: "Conquistas",
          style: { flex: "4" },
          data: {
            binding: { source: "collection-badges" },
          },
        },
        {
          id: "social",
          type: "social-links",
          title: "Redes Sociais",
          style: { flex: "3" },
          data: {
            binding: { source: "collection-social" },
          },
        },
      ],
    },
    {
      id: "section-divider",
      label: "Divisor",
      layout: "flex-row",
      style: { padding: "8px 0" },
      components: [
        {
          id: "divider",
          type: "divider",
          title: "Mais",
          style: {},
        },
      ],
    },
    {
      id: "section-bottom",
      label: "Conteúdo Inferior",
      layout: "flex-row",
      style: { gap: "18px" },
      components: [
        {
          id: "activity",
          type: "activity",
          title: "Atividade Recente",
          style: { flex: "4" },
          data: {
            binding: { source: "collection-activity", limit: 6 },
          },
        },
        {
          id: "clock",
          type: "clock",
          style: { flex: "3" },
        },
        {
          id: "posts",
          type: "posts",
          title: "Posts Recentes",
          style: { flex: "3" },
          data: {
            binding: { source: "collection-posts", limit: 5 },
          },
        },
      ],
    },
  ],
}
