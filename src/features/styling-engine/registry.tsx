import type { ComponentType, ComponentNode } from "./types"
import { resolveCollection } from "./data-resolver"

interface RenderComponentProps {
  component: ComponentNode
  profileData: { name: string; username: string; biography: string; profilePictureUrl: string; timeZone: string; address: string }
  editMode: boolean
}

function styleToCss(style: Record<string, unknown>): React.CSSProperties {
  const css: React.CSSProperties = {}
  for (const [key, val] of Object.entries(style)) {
    if (key === "css") continue
    if (val == null) continue
    const reactKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) as keyof React.CSSProperties
    ;(css as Record<string, unknown>)[reactKey] = val
  }
  return css
}

function SectionContainer({ component, children, editMode }: { component: ComponentNode; children: React.ReactNode; editMode: boolean }) {
  return (
    <div
      style={styleToCss(component.style as Record<string, unknown>)}
      className={`relative h-full w-full min-w-0 ${editMode ? "border border-red-600/[0.18] hover:border-red-500/50" : ""}`}
    >
      {children}
    </div>
  )
}

function RenderAvatar({ component, profileData }: RenderComponentProps) {
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="flex flex-col items-center gap-3 p-3">
        <div className="h-24 w-24 overflow-hidden rounded-full border-[3px] border-white/10">
          <img src={profileData.profilePictureUrl} alt={profileData.username} className="h-full w-full object-cover" />
        </div>
        <div className="text-center">
          <div className="text-[15px] font-[700]">{profileData.name}</div>
          <div className="text-[11px] text-white/40">@{profileData.username}</div>
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderBio({ component, profileData }: RenderComponentProps) {
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-4">
        <div className="mb-1 text-[11px] font-[700] uppercase tracking-[0.12em] text-white/30">Biografia</div>
        <p className="text-[13px] leading-[1.6] text-white/70">{profileData.biography}</p>
      </div>
    </SectionContainer>
  )
}

function RenderStats({ component }: RenderComponentProps) {
  const items = component.data?.items ?? []
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-3">
        {component.title && (
          <div className="mb-2 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">{component.title}</div>
        )}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-[11px] text-white/50">{item.label}</span>
              <span className="text-[13px] font-[700]" style={{ color: String(item.color ?? "#fff") }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderFavoritesGrid({ component }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-3">
        {component.title && (
          <div className="mb-2 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">{component.title}</div>
        )}
        <div className="grid grid-cols-3 gap-2">
          {items.slice(0, 6).map((item, i) => (
            <div
              key={i}
              className="flex aspect-[3/4] items-end rounded-[6px] p-2"
              style={{ background: String(item.gradient ?? "#222") }}
            >
              <div className="w-full">
                <div className="truncate text-[10px] font-[700]">{String(item.title ?? "")}</div>
                {item.score != null && (
                  <div className="text-[9px] text-white/60">{String(item.score)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderCharactersGrid({ component }: RenderComponentProps) {
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-3">
        {component.title && (
          <div className="mb-2 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">{component.title}</div>
        )}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex aspect-square items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[18px]">
              {["⚔️", "🌊", "🌿", "😔", "🐉", "🧝", "🦅", "🗡️"][i]}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderBadges({ component }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-3">
        {component.title && (
          <div className="mb-2 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">{component.title}</div>
        )}
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ background: String(item.bg ?? "rgba(255,255,255,0.05)") }}
            >
              <span className="text-[12px]">{String(item.emoji ?? "")}</span>
              <span className="text-[10px] font-[600]">{String(item.name ?? "")}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderActivity({ component }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-3">
        {component.title && (
          <div className="mb-2 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">{component.title}</div>
        )}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 border-b border-white/[0.05] pb-2 last:border-0">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-[600] text-white/80">{String(item.action ?? "")}: <span className="text-white">{String(item.title ?? "")}</span></div>
                <div className="text-[9px] text-white/40">
                  {String(item.episode ?? "")}
                  {item.score != null ? ` • ${item.score}` : ""}
                </div>
              </div>
              <div className="shrink-0 text-[9px] text-white/30">{String(item.time ?? "")}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderSocialLinks({ component }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-3">
        {component.title && (
          <div className="mb-2 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">{component.title}</div>
        )}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px]">
              <span className="text-white/80">{String(item.name ?? "")}</span>
              <span className="text-white/40">{String(item.handle ?? "")}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderPosts({ component }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-3">
        {component.title && (
          <div className="mb-2 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">{component.title}</div>
        )}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="border-b border-white/[0.05] pb-2 last:border-0">
              <div className="text-[11px] leading-[1.4] text-white/70">{String(item.text ?? "")}</div>
              <div className="mt-1 flex gap-3 text-[9px] text-white/30">
                <span>❤️ {String(item.likes ?? "0")}</span>
                {item.comments != null && <span>💬 {String(item.comments)}</span>}
                <span>{String(item.time ?? "")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderClock({ component, profileData }: RenderComponentProps) {
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-[28px] font-[200] text-white/80">
          {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-[9px] text-white/30">{profileData.timeZone}</div>
        <div className="text-[9px] text-white/20">{profileData.address}</div>
      </div>
    </SectionContainer>
  )
}

function RenderMusic({ component }: RenderComponentProps) {
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        <div className="text-[24px] animate-pulse">🎵</div>
        <div className="flex gap-[3px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-red-500/60"
              style={{
                height: `${[12, 20, 8, 16, 10][i]}px`,
                animation: `bounce 0.${i + 3}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderTextBlock({ component }: RenderComponentProps) {
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="p-4">
        <div className="text-[12px] leading-[1.7] text-white/50 italic">
          {component.data?.text ?? "Clique para editar este texto..."}
        </div>
      </div>
    </SectionContainer>
  )
}

function RenderDivider({ component }: RenderComponentProps) {
  return (
    <SectionContainer component={component} editMode={component.style !== undefined}>
      <div className="flex h-full items-center px-2">
        <div className="h-px flex-1 bg-white/[0.07]" />
        {component.title && (
          <>
            <div className="px-3 text-[9px] font-[800] uppercase tracking-[0.14em] text-white/25">{component.title}</div>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </>
        )}
      </div>
    </SectionContainer>
  )
}

export const COMPONENT_RENDERERS: Record<ComponentType, React.FC<RenderComponentProps>> = {
  avatar: RenderAvatar,
  bio: RenderBio,
  stats: RenderStats,
  "favorites-grid": RenderFavoritesGrid,
  "characters-grid": RenderCharactersGrid,
  badges: RenderBadges,
  activity: RenderActivity,
  "social-links": RenderSocialLinks,
  posts: RenderPosts,
  clock: RenderClock,
  music: RenderMusic,
  "text-block": RenderTextBlock,
  divider: RenderDivider,
  "custom-html": () => <div className="p-3 text-[11px] text-white/30">Custom HTML</div>,
}

export function renderComponent(props: RenderComponentProps): React.ReactNode {
  const Renderer = COMPONENT_RENDERERS[props.component.type]
  if (!Renderer) return null
  return <Renderer {...props} />
}
