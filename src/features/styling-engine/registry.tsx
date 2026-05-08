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

const GLASS = "bg-white/[0.035] backdrop-blur-sm border border-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_1px_3px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.25)]"
const HEADER = "flex shrink-0 items-center gap-2 border-b border-white/[0.055] bg-black/[0.12] px-3.5 pt-[10px] pb-[9px]"
const TITLE_CLASS = "flex-1 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30"

function WidgetShell({ component, editMode, children }: { component: ComponentNode; editMode: boolean; children: React.ReactNode }) {
  return (
    <div
      style={styleToCss(component.style as Record<string, unknown>)}
      className={`relative flex h-full w-full min-w-0 flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-[220ms] ${GLASS} ${editMode ? "border-red-600/[0.18] hover:border-red-500/50" : ""}`}
    >
      {component.title && (
        <div className={HEADER}>
          <span className={TITLE_CLASS}>{component.title}</span>
        </div>
      )}
      {children}
    </div>
  )
}

function RenderAvatar({ component, profileData, editMode }: RenderComponentProps) {
  const initial = (profileData.name[0] ?? "?").toUpperCase()
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="flex h-full flex-col items-center gap-3 px-4 pb-4 pt-5">
        <div className="relative shrink-0">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-red-700 to-red-500 text-3xl font-[800] shadow-[0_0_0_2.5px_rgba(255,255,255,0.1),0_0_0_5px_rgba(230,57,70,0.18),0_8px_28px_rgba(0,0,0,0.6),0_0_32px_rgba(230,57,70,0.15)]">
            {profileData.profilePictureUrl ? (
              <img src={profileData.profilePictureUrl} alt={profileData.username} className="h-full w-full rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
            ) : (
              <span>{initial}</span>
            )}
          </div>
          <div className="absolute bottom-0.5 right-0.5 h-[13px] w-[13px]">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-40" />
            <div className="h-full w-full rounded-full border-[2.5px] border-black/80 bg-emerald-500" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-[15px] font-[800] leading-tight">{profileData.username}</div>
          <div className="mt-[3px] text-[10px] text-white/[0.28]">@{profileData.username}</div>
        </div>
        <div className="flex flex-wrap justify-center gap-[5px]">
          <span className="border border-amber-400/40 bg-amber-400/10 px-[7px] py-[2px] text-[9px] font-[800] uppercase tracking-[0.1em] text-amber-300">PRO</span>
          <span className="border border-red-400/35 bg-red-500/10 px-[7px] py-[2px] text-[9px] font-[800] uppercase tracking-[0.1em] text-red-300">Early</span>
          <span className="border border-emerald-500/30 bg-emerald-500/10 px-[7px] py-[2px] text-[9px] font-[800] uppercase tracking-[0.1em] text-emerald-300">Verified</span>
        </div>
        <div className="flex w-full flex-col gap-[5px] border-t border-white/[0.055] pt-2.5 text-[10px] text-white/[0.3]">
          {profileData.address && (
            <div className="flex items-center gap-1.5">
              <span className="truncate">{profileData.address}</span>
            </div>
          )}
        </div>
        <div className="mt-auto flex w-full border-t border-white/[0.055] pt-2.5">
          <div className="flex-1 text-center">
            <div className="font-mono text-[17px] font-[800] leading-none">312</div>
            <div className="mt-[3px] text-[8px] font-[700] uppercase tracking-[0.13em] text-white/[0.24]">Seguidores</div>
          </div>
          <div className="w-px bg-white/[0.055]" />
          <div className="flex-1 text-center">
            <div className="font-mono text-[17px] font-[800] leading-none">89</div>
            <div className="mt-[3px] text-[8px] font-[700] uppercase tracking-[0.13em] text-white/[0.24]">Seguindo</div>
          </div>
        </div>
      </div>
    </WidgetShell>
  )
}

function RenderBio({ component, profileData, editMode }: RenderComponentProps) {
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="relative px-4 py-3.5">
          <div className="absolute left-0 top-3.5 bottom-3.5 w-[2px] bg-gradient-to-b from-red-500/70 via-red-500/20 to-transparent" />
          <p className="text-[13px] leading-[1.75] text-white/[0.7]">{profileData.biography}</p>
        </div>
        <div className="flex flex-wrap items-center gap-[5px] border-t border-white/[0.055] px-4 py-2.5">
          <span className="mr-1 text-[9px] font-[700] uppercase tracking-[0.12em] text-white/[0.22]">Generos</span>
          {["Dark Fantasy", "Seinen", "Psychological", "Historical", "Slice of Life"].map((g) => (
            <span key={g} className="border border-white/[0.07] bg-white/[0.035] px-[8px] py-[2px] text-[10px] font-[600] text-white/[0.48] transition-colors hover:border-white/[0.14] hover:text-white/[0.72]">
              {g}
            </span>
          ))}
        </div>
      </div>
    </WidgetShell>
  )
}

function RenderStats({ component, editMode }: RenderComponentProps) {
  const items = component.data?.items ?? []
  const total = items.reduce((sum, s) => sum + Number(s.value), 0)
  const bigNumber = items[0]?.value ?? 0
  const bigLabel = items[0]?.label ?? ""
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="relative flex h-full flex-col gap-4 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-mono text-[50px] font-[900] leading-none tracking-[-0.02em] text-white" style={{ textShadow: "0 0 48px rgba(230,57,70,0.21)" }}>
              {Number(bigNumber).toLocaleString()}
            </div>
            <div className="mt-[7px] text-[11px] font-[800] uppercase tracking-[0.16em] text-white/[0.28]">{bigLabel}</div>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-[6px]">
            <div className="relative flex h-[72px] w-[72px] items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 72 72" width="72" height="72" style={{ overflow: "visible" }}>
                <circle cx="36" cy="36" r={30} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4.5" />
                <circle cx="36" cy="36" r={30} fill="none" stroke="#52b788" strokeWidth="4.5" strokeLinecap="butt"
                  strokeDasharray={2 * Math.PI * 30} strokeDashoffset={2 * Math.PI * 30 * (1 - 7.8 / 10)}
                  style={{ filter: "drop-shadow(0 0 5px rgba(82,183,136,0.56))" }} />
              </svg>
              <span className="relative font-mono text-[20px] font-[900] leading-none text-[#52b788]">7.8</span>
            </div>
            <span className="text-[10px] font-[700] uppercase tracking-[0.12em] text-white/[0.25]">Média</span>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-[10px]">
          <div className="flex h-[5px] w-full overflow-hidden rounded-full bg-white/[0.05]">
            {items.map((s) => (
              <div key={s.label} style={{ width: `${total > 0 ? (Number(s.value) / total) * 100 : 0}%`, background: String(s.color ?? "#555"), flexShrink: 0 }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-[7px]">
            {items.map((s) => (
              <div key={s.label} className="flex items-center gap-[7px]">
                <div className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: String(s.color ?? "#555") }} />
                <span className="flex-1 truncate text-[12px] text-white/[0.35]">{s.label}</span>
                <span className="font-mono text-[13px] font-[700] text-white/[0.55]">{Number(s.value).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
          <div className="h-full transition-all duration-[1200ms]" style={{ width: "78%", background: "linear-gradient(90deg, rgba(82,183,136,0.2), rgba(82,183,136,0.8))" }} />
        </div>
      </div>
    </WidgetShell>
  )
}

function RenderFavoritesGrid({ component, editMode }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="flex min-h-0 flex-1 flex-col px-[10px] pb-[10px]">
        <div className="grid flex-1 grid-cols-3 gap-[5px]">
          {items.slice(0, 6).map((item, i) => (
            <div key={i} className="group/fav relative cursor-pointer overflow-hidden border border-white/[0.06] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-white/[0.2] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
              <div className="relative min-h-[88px] w-full" style={{ background: String(item.gradient ?? "#222") }}>
                <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 18px,rgba(255,255,255,0.018) 18px,rgba(255,255,255,0.018) 19px)" }} />
              </div>
              <div className="absolute left-[5px] top-[5px] flex h-[17px] w-[17px] items-center justify-center bg-black/[0.7] text-[8px] font-[800] text-white/60 backdrop-blur-sm">
                #{i + 1}
              </div>
              {item.score != null && (
                <div className="absolute right-[5px] top-[5px] bg-black/[0.75] px-[5px] py-[2px] text-[10px] font-[800] text-orange-300 backdrop-blur-sm">
                  ★ {String(item.score)}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent px-[6px] pb-[5px] pt-[18px]">
                <span className="block truncate text-[9px] font-[700] leading-tight text-white/80">{String(item.title ?? "")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  )
}

const CHAR_EMOJIS = ["⚔️", "🌊", "🌿", "😔", "🐉", "🧝", "🦅", "🗡️"]

function RenderCharactersGrid({ component, editMode }: RenderComponentProps) {
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="flex min-h-0 flex-1 flex-col px-[10px] pb-[10px]">
        <div className="grid flex-1 grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative cursor-pointer overflow-hidden border border-white/[0.06] transition-[border-color,transform] duration-[180ms] hover:scale-[1.02] hover:border-white/[0.22]">
              <div className="relative min-h-[72px] w-full" style={{ background: `linear-gradient(160deg, ${["#1a0800", "#1a1000", "#001a0d", "#0d001a", "#001510", "#0a0a1f", "#1a0000", "#00111f"][i]}, ${["#4a1500", "#3d2800", "#00331a", "#200035", "#003328", "#1a1a4a", "#4a0000", "#002a44"][i]} 40%, ${["#0d0400", "#0d0800", "#000d06", "#06000d", "#000d08", "#050510", "#0d0000", "#000810"][i]})` }}>
                <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 18px,rgba(255,255,255,0.018) 18px,rgba(255,255,255,0.018) 19px)" }} />
              </div>
              <div className="absolute left-[4px] top-[4px] text-[8px] font-[800] text-white/40">#{i + 1}</div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/92 to-transparent px-1 pb-[4px] pt-[16px] text-center">
                <div className="text-[9px] font-[700] leading-[1.2] tracking-[0.01em] text-white/90">
                  {["Guts", "Thorfinn", "Ginko", "Punpun", "Laios", "Frieren", "Griffith", "Askeladd"][i]}
                </div>
                <div className="mt-[1px] truncate text-[7px] text-white/38">
                  {["Berserk", "Vinland Saga", "Mushishi", "Oyasumi Punpun", "Dungeon Meshi", "Frieren", "Berserk", "Vinland Saga"][i]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  )
}

const RARITY_BORDER: Record<string, string> = {
  common: "border-white/[0.07]",
  rare: "border-blue-400/[0.3]",
  epic: "border-red-400/[0.4]",
  legendary: "border-amber-400/[0.5]",
}
const RARITY_GLOW: Record<string, string> = {
  common: "",
  rare: "hover:shadow-[0_0_10px_rgba(96,165,250,0.22)]",
  epic: "hover:shadow-[0_0_12px_rgba(230,57,70,0.28)]",
  legendary: "hover:shadow-[0_0_14px_rgba(251,191,36,0.32)]",
}

function RenderBadges({ component, editMode }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="flex flex-wrap content-start gap-[5px] p-[10px]">
        {items.map((badge) => {
          const rarity = (badge.rarity as string) ?? "common"
          return (
            <div key={String(badge.name)} className={`flex min-w-[54px] cursor-pointer flex-col items-center gap-[5px] border px-[10px] py-[7px] transition-[border-color,transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 ${RARITY_BORDER[rarity] ?? ""} ${RARITY_GLOW[rarity] ?? ""}`}>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[15px]" style={{ background: String(badge.bg ?? "rgba(255,255,255,0.05)") }}>
                {String(badge.emoji ?? "")}
              </div>
              <div className="text-center text-[8px] font-[700] uppercase tracking-[0.06em] text-white/30">{String(badge.name ?? "")}</div>
            </div>
          )
        })}
      </div>
    </WidgetShell>
  )
}

const TYPE_COLORS: Record<string, string> = {
  watch: "#52b788", read: "#60a5fa", rate: "#f4a261", fav: "#e63946", review: "#e63946",
}

function RenderActivity({ component, editMode }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {items.map((item, i) => {
          const accent = (item.type as string) ? (TYPE_COLORS[item.type as string] ?? "rgba(255,255,255,0.15)") : "rgba(255,255,255,0.15)"
          return (
            <div key={i} className="flex items-start gap-[9px] border-b border-white/[0.04] px-3.5 py-[9px] last:border-b-0 hover:bg-white/[0.025] transition-colors">
              <div className="relative h-[48px] w-[33px] shrink-0 overflow-hidden border border-white/[0.07]" style={{ background: String(item.gradient ?? "#222") }}>
                <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 18px,rgba(255,255,255,0.012) 18px,rgba(255,255,255,0.012) 19px)" }} />
                <div className="absolute bottom-0 left-0 top-0 w-[2.5px]" style={{ background: accent }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-[3px] text-[11px] leading-[1.4] text-white/[0.32]">
                  {String(item.action ?? "")}{" "}
                  <strong className="font-[700] text-white/[0.82]">{String(item.title ?? "")}</strong>
                </div>
                <div className="font-mono text-[9.5px] tracking-[0.01em] text-white/[0.2]">
                  {item.episode !== "—" ? `${String(item.episode ?? "")} · ` : ""}{String(item.time ?? "")}
                </div>
              </div>
              {item.score != null && (
                <div className="mt-[1px] shrink-0 font-mono text-[12px] font-[800] text-orange-300">{String(item.score)}</div>
              )}
            </div>
          )
        })}
      </div>
    </WidgetShell>
  )
}

const NETWORK_CONFIG: Record<string, { bg: string; color: string; borderHover: string; glow: string }> = {
  twitter:   { bg: "rgba(139,155,173,0.06)", color: "#8b9bad",  borderHover: "rgba(139,155,173,0.35)", glow: "rgba(139,155,173,0.12)" },
  instagram: { bg: "rgba(228,64,95,0.07)",   color: "#e4405f",  borderHover: "rgba(228,64,95,0.42)",   glow: "rgba(228,64,95,0.13)" },
  youtube:   { bg: "rgba(255,34,0,0.07)",    color: "#ff2200",  borderHover: "rgba(255,34,0,0.40)",    glow: "rgba(255,34,0,0.12)" },
  discord:   { bg: "rgba(88,101,242,0.08)",  color: "#5865f2",  borderHover: "rgba(88,101,242,0.45)",   glow: "rgba(88,101,242,0.13)" },
}

function RenderSocialLinks({ component, editMode }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="grid grid-cols-2 gap-[6px] p-[10px]">
        {items.map((item) => {
          const network = String(item.network ?? "twitter")
          const cfg = NETWORK_CONFIG[network] ?? NETWORK_CONFIG.twitter
          return (
            <a key={network} href="#" onClick={(e) => e.preventDefault()} className="group/soc flex flex-col gap-[7px] rounded-[7px] border border-white/[0.07] p-[10px] no-underline transition-[box-shadow,transform] duration-[260ms] hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_var(--bc),0_8px_22px_var(--gw)]"
              style={{ background: cfg.bg, "--bc": cfg.borderHover, "--gw": cfg.glow } as React.CSSProperties}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-[900] uppercase tracking-[0.14em]" style={{ color: cfg.color }}>{network}</span>
              </div>
              <div className="text-[11px] font-[700] leading-none text-white/[0.72] transition-colors duration-[180ms] group-hover/soc:text-white/[0.92]">{String(item.name ?? "")}</div>
              <div className="truncate font-mono text-[9px] text-white/[0.26]">{String(item.handle ?? "")}</div>
            </a>
          )
        })}
      </div>
    </WidgetShell>
  )
}

function RenderPosts({ component, editMode }: RenderComponentProps) {
  const binding = component.data?.binding
  const items = binding ? resolveCollection(binding).items : []
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div>
        {items.map((item, i) => (
          <div key={i} className="border-b border-white/[0.04] px-3.5 py-[10px] last:border-b-0 transition-colors hover:bg-white/[0.025]">
            <div className="mb-[6px] flex items-center gap-[7px]">
              <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[8px] font-[800] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">K</div>
              <div className="text-[11px] font-[700] text-white/[0.78]">kurumi_fan</div>
              <div className="ml-auto font-mono text-[9.5px] text-white/[0.18]">{String(item.time ?? "")}</div>
            </div>
            <p className="text-[12px] leading-[1.6] text-white/[0.6]">{String(item.text ?? "")}</p>
            <div className="mt-[7px] flex items-center gap-3">
              <span className="flex items-center gap-[5px] text-[10px] text-white/[0.22]">♥ {String(item.likes ?? "0")}</span>
              {item.comments != null && <span className="flex items-center gap-[5px] text-[10px] text-white/[0.18]">💬 {String(item.comments)}</span>}
            </div>
          </div>
        ))}
      </div>
    </WidgetShell>
  )
}

function RenderClock({ component, profileData, editMode }: RenderComponentProps) {
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-5">
        <div className="font-mono text-[28px] font-[800] leading-none tracking-[0.04em] text-white/[0.88]">
          {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="flex flex-col items-center gap-[2px]">
          <div className="text-[12px] text-white/[0.36]">
            {new Date().toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })}
          </div>
          <div className="font-mono text-[10px] text-white/[0.22]">{profileData.timeZone}</div>
          <div className="text-[11px] text-white/[0.28]">{profileData.address}</div>
        </div>
      </div>
    </WidgetShell>
  )
}

function RenderMusic({ component, editMode }: RenderComponentProps) {
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 transition-all duration-[2000ms]" style={{ background: "radial-gradient(ellipse 90% 55% at 50% 15%, rgba(230,57,70,0.11) 0%, transparent 70%)" }} />
        <div className="relative flex flex-1 flex-col items-center justify-center gap-3 px-4 py-3">
          <div className="relative flex shrink-0 items-center justify-center">
            <div className="absolute h-[100px] w-[100px] rounded-full transition-all duration-[1400ms]" style={{ background: "radial-gradient(circle, rgba(230,57,70,0.18) 0%, transparent 65%)", filter: "blur(10px)" }} />
            <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full border-[1.5px] border-red-500/30" style={{
              background: "radial-gradient(circle at 40% 35%, #3a0e6a 0%, #1a0a2e 40%, #0d0618 100%)",
              boxShadow: "0 0 0 1px rgba(230,57,70,0.22), 0 0 22px rgba(230,57,70,0.18), 0 8px 24px rgba(0,0,0,0.65)",
            }}>
              <div className="relative z-10 h-[18px] w-[18px] rounded-full border border-red-300/20" style={{ background: "linear-gradient(135deg,#3a1a6a,#5a2a9a)" }}>
                <div className="absolute inset-[5px] rounded-full bg-black/50" />
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <div className="truncate text-[13px] font-[700] leading-[1.3] text-white/88">Kabeneri OST — Unato</div>
            <div className="mt-[4px] text-[11px] text-white/40">Hiroyuki Sawano</div>
          </div>
          <div className="flex items-end justify-center gap-[3px]" style={{ height: "36px" }}>
            {[5, 10, 18, 26, 32, 28, 20, 12, 22, 8, 15].map((h, i) => (
              <div key={i} className="animate-wv-idle" style={{ width: "3px", height: `${h}px`, borderRadius: "2px", background: `rgba(230,57,70,${0.4 + (h / 32) * 0.55})`, transformOrigin: "bottom", animationDelay: ["0s", "0.08s", "0.18s", "0.12s", "0.04s", "0.22s", "0.16s", "0.28s", "0.06s", "0.20s", "0.10s"][i], animationDuration: "1.4s" }} />
            ))}
          </div>
          <div className="w-full">
            <div className="group relative h-[3px] w-full cursor-pointer rounded-full bg-white/[0.07]">
              <div className="h-full rounded-full transition-[background] duration-[800ms]" style={{ width: "35%", background: "linear-gradient(90deg, #c1121f, #e63946, #ff6b6b)" }} />
            </div>
            <div className="mt-[5px] flex justify-between font-mono text-[10px] text-white/[0.22]">
              <span>1:11</span><span>3:24</span>
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  )
}

const SCORE_ROWS = [
  { score: "10", desc: "obra-prima que muda perspectiva", color: "#f59e0b", bar: 100 },
  { score: "9",  desc: "excepcional, poucas falhas",      color: "#84cc16", bar: 88 },
  { score: "8",  desc: "muito boa, recomendo fortemente", color: "#22d3ee", bar: 76 },
  { score: "7",  desc: "boa, vale o tempo",               color: "#60a5fa", bar: 62 },
  { score: "6",  desc: "mediana, abaixo do esperado",     color: "#e63946", bar: 48 },
  { score: "≤5", desc: "não recomendo",                   color: "#ef4444", bar: 28 },
]

function RenderTextBlock({ component, editMode }: RenderComponentProps) {
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-3">
        {SCORE_ROWS.map(({ score, desc, color, bar }) => (
          <div key={score} className="flex items-center gap-2.5 border-b border-white/[0.04] py-[6px] last:border-b-0">
            <span className="w-6 shrink-0 font-mono text-[17px] font-[800] leading-none" style={{ color }}>{score}</span>
            <div className="min-w-0 flex-1">
              <div className="mb-[4px] h-[2px] rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full" style={{ width: `${bar}%`, background: color, opacity: 0.5 }} />
              </div>
              <span className="text-[11px] leading-none text-white/[0.42]">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetShell>
  )
}

function RenderDivider({ component, editMode }: RenderComponentProps) {
  return (
    <WidgetShell component={component} editMode={editMode}>
      <div className="flex h-full items-center px-2">
        <div className="h-px flex-1 bg-white/[0.07]" />
        {component.title && (
          <>
            <div className="px-3 text-[9px] font-[800] uppercase tracking-[0.14em] text-white/25">{component.title}</div>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </>
        )}
      </div>
    </WidgetShell>
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
