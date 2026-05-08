import { memo, type ReactNode } from "react"
import { EyeSlashIcon, Squares2X2Icon } from "@heroicons/react/24/outline"
import type { WidgetStyle } from "../profileTypes"

// ─── Widget context type (for reduced prop drilling) ──────────────────────────
export interface WidgetContextValue {
  cardStyle: WidgetStyle
  editMode: boolean
  onHide: (id: string) => void
  onToggleTransparent: (id: string) => void
  getTransparent: (id: string) => boolean
}

interface WidgetProps {
  id: string
  children: ReactNode
  title?: string
  action?: ReactNode
  style?: React.CSSProperties
  className?: string
  cardStyle?: WidgetStyle
  transparent?: boolean
  editMode?: boolean
  onHide?: (id: string) => void
  onToggleTransparent?: (id: string) => void
}

const STYLE_CLASSES: Record<WidgetStyle, string> = {
  glass:    "bg-white/[0.035] backdrop-blur-sm",
  flat:     "bg-white/[0.04]",
  bordered: "bg-white/[0.02] border-white/[0.18]",
  shadow:   "bg-black/55 shadow-2xl",
  neon:     "bg-black/75 border-red-600/60 shadow-[0_0_10px_rgba(230,57,70,0.25),inset_0_0_10px_rgba(230,57,70,0.04)]",
}

function WidgetComponent({
  id,
  children,
  title,
  action,
  style,
  className = "",
  cardStyle = "glass",
  transparent = false,
  editMode = false,
  onHide,
  onToggleTransparent,
}: WidgetProps) {
  const baseClass = transparent
    ? "border-transparent bg-transparent"
    : STYLE_CLASSES[cardStyle]

  return (
    <div
      style={style}
      className={[
        "relative flex h-full w-full min-w-0 flex-col overflow-hidden border border-white/[0.07] transition-[border-color,box-shadow,transform] duration-[220ms]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_1px_3px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.25)]",
        !editMode && !transparent ? "hover:-translate-y-px hover:border-white/[0.13] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.075),0_2px_8px_rgba(0,0,0,0.35),0_8px_28px_rgba(0,0,0,0.35)]" : "",
        baseClass,
        editMode && !transparent ? "border-red-600/[0.18] hover:border-red-500/50 cursor-default select-none !transform-none" : "",
        className,
      ].join(" ")}
    >
      {editMode && (
        <>
          {/* Drag handle dots */}
          <div
            className="drag-handle absolute inset-x-0 top-0 z-10 flex h-10 cursor-grab items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            data-drag-handle
          >
            <div className="flex gap-[4px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[4px] w-[4px] rounded-full bg-white/40" />
              ))}
            </div>
          </div>

          {/* Controls overlay — appears when hovering the wrapper (.group/widget via parent) */}
          <div className="absolute right-2 top-2 z-20 flex gap-1.5 opacity-0 transition-opacity group-hover/widget:opacity-100 hover:!opacity-100">
            <button
              onClick={() => onToggleTransparent?.(id)}
              className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center border border-white/20 bg-black/85 text-white/50 hover:text-white transition-colors font-[inherit]"
              title="Toggle transparent"
            >
              <Squares2X2Icon className="h-3 w-3" />
            </button>
            <button
              onClick={() => onHide?.(id)}
              className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center border border-white/20 bg-black/85 text-white/50 hover:text-red-400 transition-colors font-[inherit]"
              title="Hide widget"
            >
              <EyeSlashIcon className="h-3 w-3" />
            </button>
          </div>
        </>
      )}

      {title && (
        <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.055] bg-black/[0.12] px-3.5 pt-[10px] pb-[9px]">
          <span className="flex-1 text-[10px] font-[800] uppercase tracking-[0.14em] text-white/30">
            {title}
          </span>
          {action}
        </div>
      )}

      {children}
    </div>
  )
}

export const Widget = memo(WidgetComponent)
