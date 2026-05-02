import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { CheckIcon, XMarkIcon, PlusIcon, SwatchIcon, PhotoIcon } from "@heroicons/react/24/outline"
import {
  DEFAULT_WIDGET_STATES,
  FAV_ANIMES,
  FAV_CHARS,
  FAV_MANGAS,
  FAV_STAFF,
  VIEW_LAYOUT,
  WIDGET_ACTIVITY,
  WIDGET_BADGES,
  WIDGET_POSTS,
  WIDGET_SOCIAL,
} from "./profileData"
import type { ProfileData, WidgetState, WidgetStyle } from "./profileTypes"
import { WidgetActivity } from "./widgets/WidgetActivity"
import { WidgetAvatar } from "./widgets/WidgetAvatar"
import { WidgetBadges } from "./widgets/WidgetBadges"
import { WidgetBio } from "./widgets/WidgetBio"
import { WidgetCharsGrid } from "./widgets/WidgetCharsGrid"
import { WidgetClock } from "./widgets/WidgetClock"
import { WidgetFavGrid } from "./widgets/WidgetFavGrid"
import { WidgetMusic } from "./widgets/WidgetMusic"
import { WidgetPosts } from "./widgets/WidgetPosts"
import { WidgetSocial } from "./widgets/WidgetSocial"
import { WidgetStats } from "./widgets/WidgetStats"
import { WidgetText } from "./widgets/WidgetText"

// ─── grid constants ───────────────────────────────────────────────────────────
const COLS    = 12
const ROW_H   = 110
const GAP     = 18
const PADDING = 40 // px-10
const MAX_PASSES = 50

// ─── helpers ──────────────────────────────────────────────────────────────────
function cellW(containerW: number) {
  return (containerW - PADDING * 2 - GAP * (COLS - 1)) / COLS
}

function toPx(x: number, y: number, w: number, h: number, cw: number) {
  return {
    left:   x * (cw + GAP),
    top:    y * (ROW_H + GAP),
    width:  w * cw + (w - 1) * GAP,
    height: h * ROW_H + (h - 1) * GAP,
  }
}

function snapToGrid(pxLeft: number, pxTop: number, pxW: number, pxH: number, cw: number, minW: number, minH: number) {
  const x = Math.max(0, Math.round(pxLeft / (cw + GAP)))
  const y = Math.max(0, Math.round(pxTop  / (ROW_H + GAP)))
  const w = Math.max(minW, Math.round((pxW  + GAP) / (cw + GAP)))
  const h = Math.max(minH, Math.round((pxH  + GAP) / (ROW_H + GAP)))
  return {
    x: Math.min(x, COLS - w),
    y,
    w: Math.min(w, COLS - Math.max(0, x)),
    h,
  }
}

/**
 * Resolve all collisions after moving/resizing a widget.
 *
 * Algorithm:
 * 1. Clone all widget states (mutations happen on clones).
 * 2. Iteratively find any pair of visible widgets that overlap.
 * 3. When they overlap, push the lower widget (higher y) below the upper one.
 * 4. Repeat until no overlaps remain (capped at MAX_PASSES).
 *
 * NOTE: `sorted` is an array of REFERENCE-wrappers pointing to the same objects
 * as `result`. Mutating `ref.y` directly modifies `result[i].y`.
 */
function resolveCollisions(states: WidgetState[], _movedId: string): WidgetState[] {
  const result = states.map((s) => ({ ...s }))

  // Reference wrappers — mutations affect result objects directly
  const sorted = result.map((s) => ({ ref: s }))

  let changed = true
  let passes  = 0

  while (changed && passes++ < MAX_PASSES) {
    changed = false

    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i].ref
      if (!a.visible) continue

      for (let j = i + 1; j < sorted.length; j++) {
        const b = sorted[j].ref
        if (!b.visible) continue

        if (overlaps(a, b)) {
          if (a.y <= b.y) {
            // a is above b → push b below a
            b.y = a.y + a.h
          } else {
            // b is above a → push a below b
            a.y = b.y + b.h
          }
          changed = true
        }
      }
    }
  }

  return result
}

function overlaps(a: WidgetState, b: WidgetState) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y)
}

function maxRow(states: WidgetState[]) {
  return Math.max(...states.filter((s) => s.visible).map((s) => s.y + s.h), 0)
}

// ─── Widget context to reduce prop drilling ───────────────────────────────────
interface WidgetContextValue {
  cardStyle: WidgetStyle
  editMode: boolean
  onHide: (id: string) => void
  onToggleTransparent: (id: string) => void
  getTransparent: (id: string) => boolean
}

// ─── edit toolbar ─────────────────────────────────────────────────────────────
interface EditToolbarProps {
  onAddWidget: () => void
  onTheme: () => void
  onBanner: () => void
  onPublish: () => void
  onDiscard: () => void
  saveState: "idle" | "saving" | "saved"
}

const EditToolbar = memo(function EditToolbar({ onAddWidget, onTheme, onBanner, onPublish, onDiscard, saveState }: EditToolbarProps) {
  const { t } = useTranslation()
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-purple-600/20 bg-purple-600/[0.06] px-8 py-2.5">
      <span className="text-[11px] font-[700] uppercase tracking-[0.1em] text-purple-300">{t("profile.editing")}</span>
      <div className="h-4 w-px bg-purple-600/30" />
      <button onClick={onAddWidget} className="flex cursor-pointer items-center gap-[5px] border border-purple-500/30 bg-transparent px-2.5 py-[5px] text-[11px] font-[600] text-purple-300 transition-colors hover:border-purple-500/50 hover:bg-purple-600/12 font-[inherit]">
        <PlusIcon className="h-[10px] w-[10px]" /> {t("profile.widget_add")}
      </button>
      <button onClick={onTheme} className="flex cursor-pointer items-center gap-[5px] border border-purple-500/30 bg-transparent px-2.5 py-[5px] text-[11px] font-[600] text-purple-300 transition-colors hover:border-purple-500/50 hover:bg-purple-600/12 font-[inherit]">
        <SwatchIcon className="h-[10px] w-[10px]" /> {t("profile.theme")}
      </button>
      <button onClick={onBanner} className="flex cursor-pointer items-center gap-[5px] border border-purple-500/30 bg-transparent px-2.5 py-[5px] text-[11px] font-[600] text-purple-300 transition-colors hover:border-purple-500/50 hover:bg-purple-600/12 font-[inherit]">
        <PhotoIcon className="h-[10px] w-[10px]" /> {t("profile.banner")}
      </button>
      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-[5px] text-[11px] text-white/40">
          <div className={`h-[6px] w-[6px] rounded-full transition-colors ${saveState === "saving" ? "animate-pulse bg-orange-400" : "bg-emerald-400"}`} />
          {saveState === "saving" ? t("profile.saving") : t("profile.auto_saved")}
        </div>
        <button onClick={onDiscard} className="flex cursor-pointer items-center gap-1.5 border border-white/[0.07] bg-transparent px-3 py-1.5 text-[12px] font-[600] text-white/50 hover:text-white transition-colors font-[inherit]">
          {t("profile.discard")}
        </button>
        <button onClick={onPublish} className="flex cursor-pointer items-center gap-1.5 border-transparent bg-red-500 px-3 py-1.5 text-[12px] font-[700] text-white hover:opacity-85 transition-opacity font-[inherit]">
          <CheckIcon className="h-[11px] w-[11px]" /> {t("profile.publish")}
        </button>
      </div>
    </div>
  )
})

// ─── confirm modal ─────────────────────────────────────────────────────────────
interface ConfirmModalProps {
  title: string
  body: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal = memo(function ConfirmModal({ title, body, onConfirm, onCancel }: ConfirmModalProps) {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80">
      <div className="w-[360px] border border-white/[0.12] bg-[#141414] p-6">
        <div className="mb-2 text-[16px] font-[800]">{title}</div>
        <div className="mb-5 text-[13px] leading-[1.55] text-white/50">{body}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="cursor-pointer border border-white/[0.07] bg-transparent px-3 py-1.5 text-[12px] font-[600] text-white/50 hover:text-white transition-colors font-[inherit]">
            {t("profile.cancel")}
          </button>
          <button onClick={onConfirm} className="cursor-pointer border-transparent bg-red-500 px-3 py-1.5 text-[12px] font-[700] text-white hover:opacity-85 transition-opacity font-[inherit]">
            {t("profile.confirm")}
          </button>
        </div>
      </div>
    </div>
  )
})

// ─── toast ─────────────────────────────────────────────────────────────────────
function useToast() {
  const [msg, setMsg] = useState("")
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback((text: string) => {
    setMsg(text)
    setVisible(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), 2400)
  }, [])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return { msg, visible, show }
}

// ─── ProfileCanvas ─────────────────────────────────────────────────────────────
interface ProfileCanvasProps {
  profile: ProfileData
  editMode: boolean
  onExitEdit: () => void
  onOpenWidgetPanel: () => void
  onOpenThemePanel: () => void
  onOpenBannerPanel: () => void
}

export const ProfileCanvas = memo(function ProfileCanvas({
  profile,
  editMode,
  onExitEdit,
  onOpenWidgetPanel,
  onOpenThemePanel,
  onOpenBannerPanel,
}: ProfileCanvasProps) {
  const { t } = useTranslation()
  const [widgets, setWidgets]         = useState<WidgetState[]>(DEFAULT_WIDGET_STATES)
  const [cardStyle, setCardStyle]     = useState<WidgetStyle>("glass")
  const [saveState, setSaveState]     = useState<"idle" | "saving" | "saved">("idle")
  const [confirm, setConfirm]         = useState<null | "publish" | "discard">(null)
  const toast                         = useToast()

  const containerRef = useRef<HTMLDivElement>(null)
  const saveTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── autosave trigger ──────────────────────────────────────────────────────
  const triggerSave = useCallback(() => {
    setSaveState("saving")
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => setSaveState("saved"), 1400)
  }, [])

  useEffect(() => () => { if (saveTimer.current) clearTimeout(saveTimer.current) }, [])

  // ── widget state helpers ──────────────────────────────────────────────────
  const handleHide = useCallback((id: string) => {
    setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, visible: false } : w))
    toast.show(t("profile.widget_hidden"))
    triggerSave()
  }, [t, toast, triggerSave])

  const handleToggleTransparent = useCallback((id: string) => {
    setWidgets((prev) => prev.map((w) => {
      if (w.id !== id) return w
      const next = { ...w, transparent: !w.transparent }
      toast.show(next.transparent ? t("profile.widget_transparent") : t("profile.widget_opaque"))
      return next
    }))
    triggerSave()
  }, [t, toast, triggerSave])

  const getTransparent = useCallback((id: string) => {
    return widgets.find((w) => w.id === id)?.transparent ?? false
  }, [widgets])

  // ── drag / resize ──────────────────────────────────────────────────────────
  const widgetRefs    = useRef<Record<string, HTMLDivElement | null>>({})
  const refSettersRef = useRef<Record<string, (el: HTMLDivElement | null) => void>>({})
  const draggingId    = useRef<string | null>(null)

  const getCellW = useCallback(() => {
    const w = containerRef.current?.clientWidth ?? 800
    return cellW(w)
  }, [])

  // Stable per-widget ref setter: identity never changes → React won't re-run
  // it on re-renders, only on actual mount/unmount — prevents position resets.
  const getRefSetter = useCallback((id: string) => {
    if (!refSettersRef.current[id]) {
      refSettersRef.current[id] = (el: HTMLDivElement | null) => {
        widgetRefs.current[id] = el
      }
    }
    return refSettersRef.current[id]
  }, [])

  const handleWidgetMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    if (!editMode) return
    const target = e.target as HTMLElement
    // Allow dragging from anywhere except interactive elements and resize handle
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("select") ||
      target.closest("textarea") ||
      target.closest("[data-resize-handle]")
    ) return

    e.preventDefault()
    const el = widgetRefs.current[id]
    if (!el) return

    const startX   = e.clientX
    const startY   = e.clientY
    const startL   = parseInt(el.style.left) || 0
    const startT   = parseInt(el.style.top)  || 0
    draggingId.current   = id
    el.style.zIndex      = "100"
    el.style.opacity     = "0.92"
    el.style.boxShadow   = "0 12px 40px rgba(0,0,0,0.7),0 0 0 2px rgba(124,58,237,0.4)"
    el.style.cursor      = "grabbing"

    function onMove(ev: MouseEvent) {
      el!.style.left = `${startL + ev.clientX - startX}px`
      el!.style.top  = `${startT + ev.clientY - startY}px`
    }

    function onUp() {
      draggingId.current      = null
      el!.style.zIndex        = ""
      el!.style.opacity       = ""
      el!.style.boxShadow     = ""
      el!.style.cursor        = ""

      const pxLeft = parseInt(el!.style.left)
      const pxTop  = parseInt(el!.style.top)

      setWidgets((prev) => {
        const ws   = prev.map((w) => ({ ...w }))
        const wgt  = ws.find((w) => w.id === id)!
        // Recalculate cw at the moment of snap (not stale from mousedown)
        const cwNow = cellW(containerRef.current?.clientWidth ?? 800)
        const snap = snapToGrid(pxLeft, pxTop, wgt.w * cwNow + (wgt.w - 1) * GAP, wgt.h * ROW_H + (wgt.h - 1) * GAP, cwNow, wgt.minW, wgt.minH)
        wgt.x = snap.x
        wgt.y = snap.y
        return resolveCollisions(ws, id)
      })
      triggerSave()
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
  }, [editMode, triggerSave])

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    if (!editMode) return
    e.preventDefault()
    e.stopPropagation()
    const el = widgetRefs.current[id]
    if (!el) return

    const startX = e.clientX
    const startY = e.clientY
    const rect   = el.getBoundingClientRect()
    const startW = parseInt(el.style.width)  || rect.width
    const startH = parseInt(el.style.height) || rect.height

    // Capture min sizes now — avoids calling setWidgets during onMove
    const wgtSnap = widgets.find((w) => w.id === id)
    // Recalculate cw at resize start
    const cwNow = cellW(containerRef.current?.clientWidth ?? 800)
    const minPxW = wgtSnap ? wgtSnap.minW * cwNow + (wgtSnap.minW - 1) * GAP : cwNow
    const minPxH = wgtSnap ? wgtSnap.minH * ROW_H + (wgtSnap.minH - 1) * GAP : ROW_H

    el.style.zIndex = "100"

    function onMove(ev: MouseEvent) {
      el!.style.width  = `${Math.max(minPxW, startW + ev.clientX - startX)}px`
      el!.style.height = `${Math.max(minPxH, startH + ev.clientY - startY)}px`
    }

    function onUp() {
      el!.style.zIndex = ""
      const finalW = parseInt(el!.style.width)
      const finalH = parseInt(el!.style.height)

      setWidgets((prev) => {
        const ws  = prev.map((w) => ({ ...w }))
        const wgt = ws.find((w) => w.id === id)!
        // Recalculate cw at the moment of snap
        const cwNow2 = cellW(containerRef.current?.clientWidth ?? 800)
        const snap = snapToGrid(wgt.x * (cwNow2 + GAP), wgt.y * (ROW_H + GAP), finalW, finalH, cwNow2, wgt.minW, wgt.minH)
        wgt.w = Math.min(snap.w, COLS - wgt.x)
        wgt.h = snap.h
        return resolveCollisions(ws, id)
      })
      triggerSave()
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
  }, [editMode, widgets, triggerSave])

  // ── apply absolute positions whenever edit mode is active or widget layout changes ──
  useEffect(() => {
    if (!editMode) return
    const cw = getCellW()
    widgets.forEach((w) => {
      if (!w.visible || w.id === draggingId.current) return
      const ref = widgetRefs.current[w.id]
      if (!ref) return
      const { left, top, width, height } = toPx(w.x, w.y, w.w, w.h, cw)
      ref.style.left   = `${left}px`
      ref.style.top    = `${top}px`
      ref.style.width  = `${width}px`
      ref.style.height = `${height}px`
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, widgets])

  // ── grid canvas height in edit mode ──────────────────────────────────────
  const canvasHeight = useMemo(() => {
    if (!editMode) return undefined
    return (maxRow(widgets) + 2) * (ROW_H + GAP)
  }, [editMode, widgets])

  // ── publish / discard ────────────────────────────────────────────────────
  const handlePublish = useCallback(() => {
    onExitEdit()
    toast.show(t("profile.profile_published"))
  }, [onExitEdit, toast, t])

  const handleDiscard = useCallback(() => {
    setWidgets(DEFAULT_WIDGET_STATES)
    onExitEdit()
    toast.show(t("profile.draft_discarded"))
  }, [onExitEdit, toast, t])

  // ── widget shared props builder (reduced drilling via context) ──────────
  const widgetContext: WidgetContextValue = useMemo(() => ({
    cardStyle,
    editMode,
    onHide: handleHide,
    onToggleTransparent: handleToggleTransparent,
    getTransparent,
  }), [cardStyle, editMode, handleHide, handleToggleTransparent, getTransparent])

  const viewStyle = (id: string): React.CSSProperties => {
    if (editMode) return { position: "absolute", cursor: "grab" }
    const layout = VIEW_LAYOUT[id] ?? {}
    return { display: "flex", flexDirection: "column", ...layout }
  }

  const visibleIds = useMemo(() => new Set(widgets.filter((w) => w.visible).map((w) => w.id)), [widgets])

  // ── render ────────────────────────────────────────────────────────────────
  const animeStatuses = [
    { labelKey: "profile.watch_status",     value: 14,  color: "#52b788" },
    { labelKey: "profile.completed_status", value: 318, color: "#555" },
    { labelKey: "profile.paused_status",    value: 42,  color: "#f4a261" },
    { labelKey: "profile.dropped_status",   value: 13,  color: "#e63946" },
  ]
  const mangaStatuses = [
    { labelKey: "profile.reading_status",   value: 12,  color: "#52b788" },
    { labelKey: "profile.completed_status", value: 178, color: "#555" },
    { labelKey: "profile.paused_status",    value: 21,  color: "#f4a261" },
    { labelKey: "profile.dropped_status",   value: 3,   color: "#e63946" },
  ]

  return (
    <>
      {editMode && (
        <EditToolbar
          onAddWidget={onOpenWidgetPanel}
          onTheme={onOpenThemePanel}
          onBanner={onOpenBannerPanel}
          onPublish={() => setConfirm("publish")}
          onDiscard={() => setConfirm("discard")}
          saveState={saveState}
        />
      )}

      <div
        ref={containerRef}
        className="relative"
        style={{ background: "var(--canvas-bg, #0a0a0a)", minHeight: editMode ? canvasHeight : 600 }}
      >
        {/* grid guides (edit mode) */}
        {editMode && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridAutoRows: `${ROW_H}px`,
              gap: `${GAP}px`,
              padding: `${GAP}px ${PADDING}px`,
            }}
          >
            {Array.from({ length: 30 * COLS }).map((_, i) => (
              <div key={i} className="border border-dashed border-purple-600/[0.12]" />
            ))}
          </div>
        )}

        {/* Widget grid */}
        <div
          className={editMode ? "relative" : "grid"}
          style={
            editMode
              ? { minHeight: canvasHeight, padding: `${GAP}px ${PADDING}px` }
              : {
                  display: "grid",
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                  gridAutoRows: `${ROW_H}px`,
                  gap: `${GAP}px`,
                  padding: `${GAP}px ${PADDING}px 64px`,
                }
          }
        >
          {visibleIds.has("avatar") && (
            <div
              ref={getRefSetter("avatar")}
              style={viewStyle("avatar")}
              onMouseDown={(e) => handleWidgetMouseDown(e, "avatar")}
            >
              <WidgetAvatar profile={profile} {...widgetContext} />
              {editMode && <ResizeHandle id="avatar" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("bio") && (
            <div ref={getRefSetter("bio")} style={viewStyle("bio")} onMouseDown={(e) => handleWidgetMouseDown(e, "bio")}>
              <WidgetBio profile={profile} {...widgetContext} />
              {editMode && <ResizeHandle id="bio" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("statsAnime") && (
            <div ref={getRefSetter("statsAnime")} style={viewStyle("statsAnime")} onMouseDown={(e) => handleWidgetMouseDown(e, "statsAnime")}>
              <WidgetStats
                id="statsAnime" titleKey="profile.stats_anime" bigNumber={1247} bigLabelKey="profile.episodes_stat"
                statuses={animeStatuses} barColor="#52b788" barPercent={78}
                {...widgetContext}
              />
              {editMode && <ResizeHandle id="statsAnime" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("statsManga") && (
            <div ref={getRefSetter("statsManga")} style={viewStyle("statsManga")} onMouseDown={(e) => handleWidgetMouseDown(e, "statsManga")}>
              <WidgetStats
                id="statsManga" titleKey="profile.stats_manga" bigNumber={12840} bigLabelKey="profile.chapters_read_stat"
                statuses={mangaStatuses} barColor="#a78bfa" barPercent={82}
                {...widgetContext}
              />
              {editMode && <ResizeHandle id="statsManga" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("favAnime") && (
            <div ref={getRefSetter("favAnime")} style={viewStyle("favAnime")} onMouseDown={(e) => handleWidgetMouseDown(e, "favAnime")}>
              <WidgetFavGrid id="favAnime" titleKey="profile.fav_animes" items={FAV_ANIMES} {...widgetContext} />
              {editMode && <ResizeHandle id="favAnime" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("favManga") && (
            <div ref={getRefSetter("favManga")} style={viewStyle("favManga")} onMouseDown={(e) => handleWidgetMouseDown(e, "favManga")}>
              <WidgetFavGrid id="favManga" titleKey="profile.fav_mangas" items={FAV_MANGAS} {...widgetContext} />
              {editMode && <ResizeHandle id="favManga" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("favChars") && (
            <div ref={getRefSetter("favChars")} style={viewStyle("favChars")} onMouseDown={(e) => handleWidgetMouseDown(e, "favChars")}>
              <WidgetCharsGrid id="favChars" titleKey="profile.fav_chars" items={FAV_CHARS} {...widgetContext} />
              {editMode && <ResizeHandle id="favChars" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("favStaff") && (
            <div ref={getRefSetter("favStaff")} style={viewStyle("favStaff")} onMouseDown={(e) => handleWidgetMouseDown(e, "favStaff")}>
              <WidgetCharsGrid id="favStaff" titleKey="profile.fav_staff" items={FAV_STAFF} {...widgetContext} />
              {editMode && <ResizeHandle id="favStaff" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("music") && (
            <div ref={getRefSetter("music")} style={viewStyle("music")} onMouseDown={(e) => handleWidgetMouseDown(e, "music")}>
              <WidgetMusic {...widgetContext} />
              {editMode && <ResizeHandle id="music" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("badges") && (
            <div ref={getRefSetter("badges")} style={viewStyle("badges")} onMouseDown={(e) => handleWidgetMouseDown(e, "badges")}>
              <WidgetBadges items={WIDGET_BADGES} {...widgetContext} />
              {editMode && <ResizeHandle id="badges" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("divider") && (
            <div ref={getRefSetter("divider")} style={viewStyle("divider")} onMouseDown={(e) => handleWidgetMouseDown(e, "divider")}>
              <div className="flex h-full items-center px-0.5">
                <div className="h-px flex-1 bg-white/[0.07]" />
                <div className="px-3 text-[9px] font-[800] uppercase tracking-[0.14em] text-white/25">Mais</div>
                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>
            </div>
          )}

          {visibleIds.has("activity") && (
            <div ref={getRefSetter("activity")} style={viewStyle("activity")} onMouseDown={(e) => handleWidgetMouseDown(e, "activity")}>
              <WidgetActivity items={WIDGET_ACTIVITY} {...widgetContext} />
              {editMode && <ResizeHandle id="activity" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("social") && (
            <div ref={getRefSetter("social")} style={viewStyle("social")} onMouseDown={(e) => handleWidgetMouseDown(e, "social")}>
              <WidgetSocial items={WIDGET_SOCIAL} {...widgetContext} />
              {editMode && <ResizeHandle id="social" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("text") && (
            <div ref={getRefSetter("text")} style={viewStyle("text")} onMouseDown={(e) => handleWidgetMouseDown(e, "text")}>
              <WidgetText {...widgetContext} />
              {editMode && <ResizeHandle id="text" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("clock") && (
            <div ref={getRefSetter("clock")} style={viewStyle("clock")} onMouseDown={(e) => handleWidgetMouseDown(e, "clock")}>
              <WidgetClock timeZone={profile.timeZone} {...widgetContext} />
              {editMode && <ResizeHandle id="clock" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}

          {visibleIds.has("posts") && (
            <div ref={getRefSetter("posts")} style={viewStyle("posts")} onMouseDown={(e) => handleWidgetMouseDown(e, "posts")}>
              <WidgetPosts items={WIDGET_POSTS} username={profile.username} {...widgetContext} />
              {editMode && <ResizeHandle id="posts" onMouseDown={handleResizeMouseDown} />}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <div
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[999] -translate-x-1/2 border border-white/[0.07] bg-[#1c1c1c] px-5 py-2.5 text-[13px] font-[600] whitespace-nowrap transition-[opacity,transform] duration-[250ms] ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        {toast.msg}
      </div>

      {/* Confirm modal */}
      {confirm === "publish" && (
        <ConfirmModal
          title={t("profile.publish_confirm_title")}
          body={t("profile.publish_confirm_body")}
          onConfirm={handlePublish}
          onCancel={() => setConfirm(null)}
        />
      )}
      {confirm === "discard" && (
        <ConfirmModal
          title={t("profile.discard_confirm_title")}
          body={t("profile.discard_confirm_body")}
          onConfirm={handleDiscard}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  )
})

// ── inline resize handle (used inside wrapper divs) ───────────────────────────
function ResizeHandle({ id, onMouseDown }: { id: string; onMouseDown: (e: React.MouseEvent, id: string) => void }) {
  return (
    <div
      data-resize-handle
      className="absolute bottom-0 right-0 z-10 flex h-4 w-4 cursor-se-resize items-end justify-end p-[3px]"
      onMouseDown={(e) => { e.stopPropagation(); onMouseDown(e, id) }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-purple-400/50 hover:text-purple-400/90 transition-colors">
        <path d="M4 9h5V4M9 9L4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
