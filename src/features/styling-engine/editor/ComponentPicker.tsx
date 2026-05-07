import type { ComponentType } from "../types"
import { COMPONENT_META } from "../types"

interface ComponentPickerProps {
  onSelect: (type: ComponentType) => void
  onClose: () => void
}

export function ComponentPicker({ onSelect, onClose }: ComponentPickerProps) {
  const entries = Object.entries(COMPONENT_META) as [ComponentType, typeof COMPONENT_META[ComponentType]][]

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-[800] uppercase tracking-[0.1em] text-white/30">Adicionar Componente</div>
        <button onClick={onClose} className="cursor-pointer border-none bg-transparent text-[14px] text-white/40 hover:text-white font-[inherit]">
          ✕
        </button>
      </div>
      <div className="space-y-1">
        {entries.map(([type, meta]) => (
          <button
            key={type}
            onClick={() => { onSelect(type); onClose() }}
            className="flex w-full cursor-pointer items-center gap-3 border border-white/[0.07] bg-transparent p-2.5 text-left hover:border-purple-500/40 hover:bg-purple-600/[0.06] transition-colors font-[inherit]"
          >
            <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center border border-white/[0.07] bg-white/[0.05] text-[14px]">
              {meta.icon}
            </div>
            <div>
              <div className="text-[11px] font-[700]">{meta.label}</div>
              <div className="text-[9px] text-white/40">{meta.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
