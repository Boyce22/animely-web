import type { Section } from "../types"

interface SectionListProps {
  sections: Section[]
  selectedSectionId: string | null
  onSelect: (id: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
}

export function SectionList({ sections, selectedSectionId, onSelect, onAdd, onRemove, onMove }: SectionListProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-[800] uppercase tracking-[0.1em] text-white/30">Seções</div>
        <button
          onClick={onAdd}
          className="cursor-pointer border border-purple-500/30 bg-transparent px-2 py-[3px] text-[9px] font-[600] text-purple-300 hover:bg-purple-600/12 transition-colors font-[inherit]"
        >
          + Nova
        </button>
      </div>
      <div className="space-y-1">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className={`flex cursor-pointer items-center gap-2 border px-2.5 py-2 text-[11px] transition-colors ${
              selectedSectionId === section.id
                ? "border-purple-500/50 bg-purple-600/10 text-purple-300"
                : "border-transparent text-white/60 hover:border-white/[0.07] hover:text-white"
            }`}
            onClick={() => onSelect(section.id)}
          >
            <div className="flex-1 truncate">{section.label || section.id}</div>
            <div className="flex gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onMove(section.id, "up") }}
                disabled={idx === 0}
                className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-white/30 hover:text-white disabled:opacity-20 font-[inherit]"
              >
                ↑
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onMove(section.id, "down") }}
                disabled={idx === sections.length - 1}
                className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-white/30 hover:text-white disabled:opacity-20 font-[inherit]"
              >
                ↓
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(section.id) }}
                className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-red-400/50 hover:text-red-400 font-[inherit]"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
