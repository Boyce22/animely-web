import { memo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { XMarkIcon, PhotoIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"

// ─── shared overlay / panel ──────────────────────────────────────────────────
interface SidePanelProps {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export const SidePanel = memo(function SidePanel({ open, title, onClose, children }: SidePanelProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-black/65"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 bottom-0 z-[201] flex w-[300px] flex-col border-l border-white/[0.12] bg-[#111] shadow-[-8px_0_32px_rgba(0,0,0,0.5)] transition-transform duration-[250ms] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex shrink-0 items-center gap-2.5 border-b border-white/[0.07] px-[18px] py-4">
          <span className="flex-1 text-[14px] font-[800]">{title}</span>
          <button onClick={onClose} className="cursor-pointer border-none bg-transparent p-0 text-[20px] leading-none text-white/40 hover:text-white transition-colors">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="scrollbar-hide flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  )
})

// ─── section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-[7px] pt-3 text-[9px] font-[800] uppercase tracking-[0.14em] text-white/25 first:pt-0">
      {children}
    </div>
  )
}

// ─── widget picker panel ──────────────────────────────────────────────────────
interface WidgetPickerPanelProps {
  open: boolean
  onClose: () => void
  hiddenWidgetIds: string[]
  onShowWidget: (id: string) => void
}

const WIDGET_CATALOG = [
  { id: "avatar",     nameKey: "Avatar Card",          desc: "Foto, nome, badges, seguidores",   icon: "👤" },
  { id: "bio",        nameKey: "Biografia",             desc: "Texto livre com tags",              icon: "📝" },
  { id: "statsAnime", nameKey: "Stats Anime",           desc: "Episódios, status, score médio",    icon: "📊" },
  { id: "statsManga", nameKey: "Stats Mangá",           desc: "Capítulos, status, score médio",    icon: "📖" },
  { id: "favAnime",   nameKey: "Animes Favoritos",      desc: "Grid de capas",                     icon: "🎬" },
  { id: "favManga",   nameKey: "Mangás Favoritos",      desc: "Grid de capas",                     icon: "📕" },
  { id: "favChars",   nameKey: "Personagens Favoritos", desc: "Grid de personagens",               icon: "🧍" },
  { id: "favStaff",   nameKey: "Staff / Autores",       desc: "Grid de staff",                     icon: "✍️" },
  { id: "music",      nameKey: "Music Player",          desc: "Áudio de fundo do perfil",          icon: "🎵" },
  { id: "badges",     nameKey: "Conquistas",            desc: "Badges e troféus",                  icon: "🏆" },
  { id: "activity",   nameKey: "Atividade Recente",     desc: "Feed de atividade",                 icon: "⚡" },
  { id: "social",     nameKey: "Links Sociais",         desc: "Redes sociais",                     icon: "🔗" },
  { id: "text",       nameKey: "Bloco de Texto",        desc: "Markdown customizado",              icon: "📄" },
  { id: "clock",      nameKey: "Relógio",               desc: "Hora e timezone do usuário",        icon: "🕐" },
  { id: "posts",      nameKey: "Posts Recentes",        desc: "Últimos posts",                     icon: "💬" },
  { id: "divider",    nameKey: "Divisor",               desc: "Separador de seção",                icon: "—" },
]

export const WidgetPickerPanel = memo(function WidgetPickerPanel({ open, onClose, hiddenWidgetIds, onShowWidget }: WidgetPickerPanelProps) {
  const { t } = useTranslation()
  const hidden = new Set(hiddenWidgetIds)

  return (
    <SidePanel open={open} title={t("profile.add_widget_title")} onClose={onClose}>
      <SectionLabel>Widgets disponíveis</SectionLabel>
      {WIDGET_CATALOG.map((w) => (
        <button
          key={w.id}
          onClick={() => { onShowWidget(w.id); onClose() }}
          disabled={!hidden.has(w.id)}
          className={[
            "mb-[5px] flex w-full cursor-pointer items-center gap-3 border border-white/[0.07] bg-transparent p-2.5 text-left transition-[border-color,background] font-[inherit]",
            hidden.has(w.id)
              ? "hover:border-red-500/40 hover:bg-red-600/[0.06]"
              : "opacity-35 cursor-default",
          ].join(" ")}
        >
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center border border-white/[0.07] bg-white/[0.05] text-base">
            {w.icon}
          </div>
          <div>
            <div className="text-[12px] font-[700]">{w.nameKey}</div>
            <div className="mt-[1px] text-[10px] text-white/40">{w.desc}</div>
          </div>
          {!hidden.has(w.id) && (
            <span className="ml-auto text-[9px] font-[700] uppercase tracking-widest text-white/25">Ativo</span>
          )}
        </button>
      ))}
    </SidePanel>
  )
})

// ─── theme panel ─────────────────────────────────────────────────────────────
const BG_PRESETS = [
  "#0a0a0a",
  "linear-gradient(135deg,#12082a,#0d0d1a)",
  "linear-gradient(135deg,#0a1a0d,#050d08)",
  "linear-gradient(135deg,#1a0a0a,#0d0505)",
  "linear-gradient(135deg,#0a0a1a,#05050d)",
  "radial-gradient(ellipse at 50% 0%,#1a082a,#0a0a0a)",
  "linear-gradient(180deg,#1a0808,#0a0a0a)",
  "linear-gradient(135deg,#0a1020,#0a0a0a)",
]

const ACCENT_COLORS = [
  "#e63946", "#52b788", "#f4a261",
  "#60a5fa", "#f472b6", "#facc15", "#34d399", "#c1121f",
]

const CARD_STYLES = [
  { id: "glass",    label: "Glass"    },
  { id: "flat",     label: "Flat"     },
  { id: "bordered", label: "Bordered" },
  { id: "shadow",   label: "Shadow"   },
  { id: "neon",     label: "Neon"     },
]

interface ThemePanelProps {
  open: boolean
  onClose: () => void
  onCardStyleChange: (style: string) => void
  currentCardStyle: string
}

export const ThemePanel = memo(function ThemePanel({ open, onClose, onCardStyleChange, currentCardStyle }: ThemePanelProps) {
  const { t } = useTranslation()

  function setBg(val: string) {
    document.querySelector<HTMLElement>(".profile-canvas-bg")?.style.setProperty("background", val)
  }

  function setAccent(color: string) {
    document.documentElement.style.setProperty("--accent", color)
  }

  return (
    <SidePanel open={open} title={t("profile.customize_theme_title")} onClose={onClose}>
      <SectionLabel>Fundo dos widgets</SectionLabel>
      <div className="grid grid-cols-4 gap-[5px]">
        {BG_PRESETS.map((bg, i) => (
          <button
            key={i}
            onClick={() => setBg(bg)}
            className="h-[34px] cursor-pointer border-2 border-transparent transition-[border-color] hover:border-white/70 focus:outline-none"
            style={{ background: bg }}
          />
        ))}
      </div>

      <SectionLabel>Estilo de widgets</SectionLabel>
      <div className="flex flex-wrap gap-[5px]">
        {CARD_STYLES.map((cs) => (
          <button
            key={cs.id}
            onClick={() => onCardStyleChange(cs.id)}
            className={[
              "cursor-pointer border px-2.5 py-1 text-[10px] font-[600] transition-all font-[inherit]",
              currentCardStyle === cs.id
                ? "border-red-500/50 bg-red-600/10 text-red-300"
                : "border-white/[0.07] bg-transparent text-white/40 hover:border-white/[0.12] hover:text-white",
            ].join(" ")}
          >
            {cs.label}
          </button>
        ))}
      </div>

      <SectionLabel>Cor de destaque</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {ACCENT_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => setAccent(color)}
            className="h-7 w-7 cursor-pointer border-2 border-transparent transition-[border-color] hover:border-white/70"
            style={{ background: color }}
          />
        ))}
      </div>
    </SidePanel>
  )
})

// ─── banner edit panel ─────────────────────────────────────────────────────────
interface BannerPanelProps {
  open: boolean
  onClose: () => void
  onBannerChange: (url: string) => void
}

const BANNER_PRESETS = [
  "linear-gradient(135deg,#12082a,#0d0d1a)",
  "linear-gradient(135deg,#0a1a1a,#0a0d1a)",
  "linear-gradient(135deg,#1a0808,#0d0a0a)",
  "linear-gradient(135deg,#0a1520,#050a10)",
  "radial-gradient(ellipse at 60% 40%,#2a0a3a,#0a0a0a)",
  "linear-gradient(180deg,#1a1000,#0a0a0a)",
]

export const BannerEditPanel = memo(function BannerEditPanel({ open, onClose, onBannerChange }: BannerPanelProps) {
  const { t } = useTranslation()
  const urlRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function applyUrl() {
    const url = urlRef.current?.value.trim()
    if (url) { onBannerChange(url); onClose() }
  }

  function applyFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) { onBannerChange(ev.target.result as string); onClose() }
    }
    reader.readAsDataURL(file)
  }

  return (
    <SidePanel open={open} title={t("profile.change_banner_title")} onClose={onClose}>
      <SectionLabel>URL de imagem</SectionLabel>
      <div className="flex gap-1.5">
        <input
          ref={urlRef}
          type="text"
          placeholder="https://..."
          className="flex-1 border border-white/[0.07] bg-[#161616] px-2.5 py-2 text-[12px] text-white outline-none placeholder:text-white/25 focus:border-white/[0.12]"
        />
        <button onClick={applyUrl} className="cursor-pointer border border-white/[0.07] bg-transparent px-3 py-2 text-[12px] font-[600] text-white/50 hover:text-white transition-colors font-[inherit]">
          Aplicar
        </button>
      </div>

      <SectionLabel>Upload local</SectionLabel>
      <label className="flex cursor-pointer items-center gap-2 border border-dashed border-white/[0.07] px-2.5 py-2.5 text-[12px] text-white/40 hover:border-white/[0.12] hover:text-white/60 transition-colors">
        <ArrowUpTrayIcon className="h-4 w-4" />
        Enviar imagem local
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={applyFile} />
      </label>

      <SectionLabel>Gradientes predefinidos</SectionLabel>
      <div className="grid grid-cols-3 gap-[5px]">
        {BANNER_PRESETS.map((grad, i) => (
          <button
            key={i}
            onClick={() => { onBannerChange(""); onClose() }}
            className="h-11 cursor-pointer border-2 border-transparent transition-[border-color] hover:border-white/70"
            style={{ background: grad }}
          />
        ))}
      </div>

      <SectionLabel>Altura do banner</SectionLabel>
      <input
        type="range" min={160} max={400} defaultValue={260}
        className="w-full accent-red-500"
        onInput={(e) => {
          const h = (e.target as HTMLInputElement).value
          document.querySelector<HTMLElement>(".profile-banner-wrap")?.style.setProperty("height", `${h}px`)
        }}
      />

      <button
        onClick={() => { onBannerChange(""); onClose() }}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 border border-white/[0.07] bg-transparent px-3 py-2 text-[12px] font-[600] text-white/50 hover:text-white transition-colors font-[inherit]"
      >
        <PhotoIcon className="h-3.5 w-3.5" />
        Remover imagem
      </button>
    </SidePanel>
  )
})
