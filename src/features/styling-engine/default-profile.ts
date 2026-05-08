import type { StylingProfile } from "./types"

export const DEFAULT_STYLING_PROFILE: StylingProfile = {
  version: 2,
  name: "Default",
  canvas: {
    background: "#0a0a0a",
    accentColor: "#e63946",
    maxWidth: "1400px",
    padding: "24px",
  },
  sections: [
    {
      id: "section-widget-grid",
      label: "Widget Grid",
      layout: "grid-12",
      style: { gap: "18px", padding: "18px 24px" },
      components: [
        {
          id: "avatar",
          type: "avatar",
          style: { gridColumn: "1 / span 3", gridRow: "1 / span 6" },
        },
        {
          id: "bio",
          type: "bio",
          style: { gridColumn: "4 / span 9", gridRow: "1 / span 3" },
        },
        {
          id: "stats-anime",
          type: "stats",
          title: "Stats Anime",
          style: { gridColumn: "4 / span 4", gridRow: "4 / span 3" },
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
          style: { gridColumn: "8 / span 5", gridRow: "4 / span 3" },
          data: {
            items: [
              { label: "Capítulos Lidos", value: 12840, color: "#e63946" },
              { label: "Completos", value: 178, color: "#555" },
              { label: "Pausados", value: 21, color: "#f4a261" },
              { label: "Dropados", value: 3, color: "#e63946" },
            ],
          },
        },
        {
          id: "fav-anime",
          type: "favorites-grid",
          title: "Animes Favoritos",
          style: { gridColumn: "1 / span 6", gridRow: "7 / span 6" },
          data: {
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
          style: { gridColumn: "7 / span 6", gridRow: "7 / span 6" },
          data: {
            binding: { source: "collection-favorites" },
          },
        },
        {
          id: "fav-chars",
          type: "characters-grid",
          title: "Personagens Favoritos",
          style: { gridColumn: "1 / span 6", gridRow: "13 / span 5" },
        },
        {
          id: "fav-staff",
          type: "characters-grid",
          title: "Staff / Autores",
          style: { gridColumn: "7 / span 6", gridRow: "13 / span 5" },
          data: { title: "Staff" },
        },
        {
          id: "music",
          type: "music",
          style: { gridColumn: "1 / span 2", gridRow: "18 / span 4" },
        },
        {
          id: "badges",
          type: "badges",
          title: "Conquistas",
          style: { gridColumn: "3 / span 3", gridRow: "18 / span 5" },
          data: { binding: { source: "collection-badges" } },
        },
        {
          id: "divider",
          type: "divider",
          title: "Mais",
          style: { gridColumn: "1 / span 12", gridRow: "23 / span 1" },
        },
        {
          id: "activity",
          type: "activity",
          title: "Atividade Recente",
          style: { gridColumn: "1 / span 4", gridRow: "24 / span 7" },
          data: { binding: { source: "collection-activity", limit: 6 } },
        },
        {
          id: "social",
          type: "social-links",
          title: "Redes Sociais",
          style: { gridColumn: "5 / span 3", gridRow: "24 / span 7" },
          data: { binding: { source: "collection-social" } },
        },
        {
          id: "text",
          type: "text-block",
          title: "Critérios de Nota",
          style: { gridColumn: "8 / span 5", gridRow: "24 / span 4" },
        },
        {
          id: "clock",
          type: "clock",
          style: { gridColumn: "8 / span 2", gridRow: "28 / span 3" },
        },
        {
          id: "posts",
          type: "posts",
          title: "Posts Recentes",
          style: { gridColumn: "10 / span 3", gridRow: "28 / span 3" },
          data: { binding: { source: "collection-posts", limit: 3 } },
        },
      ],
    },
  ],
}
