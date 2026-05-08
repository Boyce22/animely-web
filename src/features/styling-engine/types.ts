export type ComponentType =
  | "avatar"
  | "bio"
  | "stats"
  | "favorites-grid"
  | "characters-grid"
  | "badges"
  | "activity"
  | "social-links"
  | "posts"
  | "clock"
  | "music"
  | "text-block"
  | "divider"
  | "custom-html"

export type SectionLayout = "flex-row" | "flex-col" | "grid" | "grid-2" | "grid-3" | "grid-4" | "grid-12"

export type DataOperator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "score_gte" | "score_lte"

export interface StyleDeclaration {
  background?: string
  color?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  margin?: string
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  opacity?: number
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  textAlign?: "left" | "center" | "right"
  boxShadow?: string
  backdropFilter?: string
  transform?: string
  animation?: string
  flex?: string
  flexGrow?: number
  flexShrink?: number
  order?: number
  gap?: string
  alignItems?: string
  justifyContent?: string
  overflow?: string
  position?: string
  gridColumn?: string
  gridRow?: string
  css?: Record<string, string>
}

export interface DataFilter {
  field: string
  operator: DataOperator
  value: string | number
}

export interface SortConfig {
  field: string
  direction: "asc" | "desc"
}

export interface DataBinding {
  source: "collection-favorites" | "collection-activity" | "collection-badges" | "collection-posts" | "collection-social" | "collection-library" | "static"
  filters?: DataFilter[]
  sort?: SortConfig
  limit?: number
}

export interface ComponentData {
  collection?: string
  binding?: DataBinding
  title?: string
  text?: string
  icon?: string
  imageUrl?: string
  href?: string
  items?: { label: string; value: string | number; color?: string }[]
}

export interface ComponentNode {
  id: string
  type: ComponentType
  title?: string
  style: StyleDeclaration
  data?: ComponentData
}

export interface Section {
  id: string
  label?: string
  layout: SectionLayout
  style: StyleDeclaration
  components: ComponentNode[]
}

export interface CanvasStyle {
  background?: string
  accentColor?: string
  maxWidth?: string
  padding?: string
}

export interface StylingProfile {
  version: number
  name: string
  canvas: CanvasStyle
  sections: Section[]
}

export interface StyleControlOption {
  id: string
  label: string
  type: "color" | "select" | "slider" | "text" | "font-family" | "font-size"
  property: keyof StyleDeclaration
  options?: { value: string; label: string }[]
  defaultValue?: string | number
}

export const COMPONENT_META: Record<ComponentType, { label: string; description: string; icon: string; defaultStyle?: Partial<StyleDeclaration> }> = {
  avatar: {
    label: "Avatar Card",
    description: "Foto, nome, badges, seguidores",
    icon: "👤",
    defaultStyle: { padding: "12px" },
  },
  bio: {
    label: "Biografia",
    description: "Texto livre com tags",
    icon: "📝",
    defaultStyle: { padding: "16px" },
  },
  stats: {
    label: "Estatísticas",
    description: "Episódios, capítulos, score médio",
    icon: "📊",
    defaultStyle: { padding: "12px" },
  },
  "favorites-grid": {
    label: "Favoritos",
    description: "Grid de itens favoritos",
    icon: "⭐",
    defaultStyle: { padding: "12px" },
  },
  "characters-grid": {
    label: "Personagens",
    description: "Grid de personagens favoritos",
    icon: "🧍",
    defaultStyle: { padding: "12px" },
  },
  badges: {
    label: "Conquistas",
    description: "Badges e troféus",
    icon: "🏆",
    defaultStyle: { padding: "12px" },
  },
  activity: {
    label: "Atividade",
    description: "Feed de atividade recente",
    icon: "⚡",
    defaultStyle: { padding: "12px" },
  },
  "social-links": {
    label: "Redes Sociais",
    description: "Links para redes sociais",
    icon: "🔗",
    defaultStyle: { padding: "12px" },
  },
  posts: {
    label: "Posts",
    description: "Posts recentes do usuário",
    icon: "💬",
    defaultStyle: { padding: "12px" },
  },
  clock: {
    label: "Relógio",
    description: "Hora e timezone do usuário",
    icon: "🕐",
    defaultStyle: { padding: "12px" },
  },
  music: {
    label: "Música",
    description: "Player de música animado",
    icon: "🎵",
    defaultStyle: { padding: "12px" },
  },
  "text-block": {
    label: "Bloco de Texto",
    description: "Markdown customizado",
    icon: "📄",
    defaultStyle: { padding: "16px" },
  },
  divider: {
    label: "Divisor",
    description: "Separador de seção",
    icon: "—",
    defaultStyle: { padding: "4px 12px" },
  },
  "custom-html": {
    label: "HTML Customizado",
    description: "Embed HTML via iframe",
    icon: "🔌",
    defaultStyle: { padding: "12px" },
  },
}

export const SECTION_LAYOUT_META: Record<SectionLayout, { label: string; template: string }> = {
  "flex-row": { label: "Linha Flexível", template: "flex flex-row flex-wrap" },
  "flex-col": { label: "Coluna Flexível", template: "flex flex-col" },
  "grid": { label: "Grid Automático", template: "grid grid-cols-auto" },
  "grid-2": { label: "Grid 2 Colunas", template: "grid grid-cols-2" },
  "grid-3": { label: "Grid 3 Colunas", template: "grid grid-cols-3" },
  "grid-4": { label: "Grid 4 Colunas", template: "grid grid-cols-4" },
  "grid-12": { label: "Grid 12 Colunas", template: "grid" },
}

export const STYLE_CONTROLS: StyleControlOption[] = [
  { id: "bg", label: "Fundo", type: "color", property: "background" },
  { id: "color", label: "Texto", type: "color", property: "color" },
  { id: "border", label: "Borda", type: "color", property: "borderColor" },
  { id: "radius", label: "Arredondamento", type: "slider", property: "borderRadius", defaultValue: "8px" },
  { id: "padding", label: "Padding", type: "text", property: "padding" },
  { id: "opacity", label: "Opacidade", type: "slider", property: "opacity", defaultValue: "1" },
  { id: "font", label: "Fonte", type: "font-family", property: "fontFamily", options: [
    { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
    { value: "'Inter', sans-serif", label: "Inter" },
    { value: "'JetBrains Mono', monospace", label: "JetBrains Mono" },
    { value: "serif", label: "Serif" },
  ]},
]
