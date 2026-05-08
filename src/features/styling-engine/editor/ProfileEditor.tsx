import { useCallback, useMemo, useState } from "react"
import type { StylingProfile, Section, ComponentType, ComponentNode, StyleDeclaration } from "../types"
import { COMPONENT_META } from "../types"
import { SectionList } from "./SectionList"
import { ComponentPicker } from "./ComponentPicker"
import { StyleControls } from "./StyleControls"

interface ProfileEditorProps {
  profile: StylingProfile
  onChange: (profile: StylingProfile) => void
  onClose: () => void
}

type EditPanel = "sections" | "components" | "style"

let _counter = Date.now()
function uid(): string {
  return `c_${_counter++}`
}

export function ProfileEditor({ profile, onChange, onClose }: ProfileEditorProps) {
  const [panel, setPanel] = useState<EditPanel>("sections")
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)
  const [showComponentPicker, setShowComponentPicker] = useState(false)

  const selectedSection = useMemo(
    () => profile.sections.find((s) => s.id === selectedSectionId) ?? null,
    [profile.sections, selectedSectionId],
  )

  const selectedComponent = useMemo(() => {
    if (!selectedSection) return null
    return selectedSection.components.find((c) => c.id === selectedComponentId) ?? null
  }, [selectedSection, selectedComponentId])

  const updateProfile = useCallback(
    (updater: (draft: StylingProfile) => StylingProfile) => {
      onChange(updater({ ...profile, sections: profile.sections.map((s) => ({ ...s, components: s.components.map((c) => ({ ...c })) })) }))
    },
    [profile, onChange],
  )

  const handleSelectSection = useCallback((id: string) => {
    setSelectedSectionId(id)
    setSelectedComponentId(null)
    setPanel("sections")
  }, [])

  const handleAddSection = useCallback(() => {
    const id = `section_${uid()}`
    const newSection: Section = {
      id,
      label: "Nova Seção",
      layout: "flex-row",
      style: { gap: "12px" },
      components: [],
    }
    onChange({
      ...profile,
      sections: [...profile.sections, newSection],
    })
    setSelectedSectionId(id)
    setPanel("components")
  }, [profile, onChange])

  const handleRemoveSection = useCallback(
    (id: string) => {
      onChange({
        ...profile,
        sections: profile.sections.filter((s) => s.id !== id),
      })
      if (selectedSectionId === id) {
        setSelectedSectionId(null)
        setSelectedComponentId(null)
      }
    },
    [profile, onChange, selectedSectionId],
  )

  const handleMoveSection = useCallback(
    (id: string, direction: "up" | "down") => {
      const idx = profile.sections.findIndex((s) => s.id === id)
      if (idx === -1) return
      const target = direction === "up" ? idx - 1 : idx + 1
      if (target < 0 || target >= profile.sections.length) return
      const next = [...profile.sections]
      const [removed] = next.splice(idx, 1)
      next.splice(target, 0, removed)
      onChange({ ...profile, sections: next })
    },
    [profile, onChange],
  )

  const handleAddComponent = useCallback(
    (type: ComponentType) => {
      if (!selectedSectionId) return
      const meta = COMPONENT_META[type]
      const newComponent: ComponentNode = {
        id: `${type}_${uid()}`,
        type,
        title: meta.label,
        style: { ...meta.defaultStyle },
      }
      onChange({
        ...profile,
        sections: profile.sections.map((s) =>
          s.id === selectedSectionId ? { ...s, components: [...s.components, newComponent] } : s,
        ),
      })
      setSelectedComponentId(newComponent.id)
    },
    [profile, onChange, selectedSectionId],
  )

  const handleRemoveComponent = useCallback(
    (componentId: string) => {
      if (!selectedSectionId) return
      onChange({
        ...profile,
        sections: profile.sections.map((s) =>
          s.id === selectedSectionId
            ? { ...s, components: s.components.filter((c) => c.id !== componentId) }
            : s,
        ),
      })
      if (selectedComponentId === componentId) setSelectedComponentId(null)
    },
    [profile, onChange, selectedSectionId, selectedComponentId],
  )

  const handleSectionStyleChange = useCallback(
    (style: StyleDeclaration) => {
      if (!selectedSectionId) return
      onChange({
        ...profile,
        sections: profile.sections.map((s) =>
          s.id === selectedSectionId ? { ...s, style } : s,
        ),
      })
    },
    [profile, onChange, selectedSectionId],
  )

  const handleComponentStyleChange = useCallback(
    (componentId: string, style: StyleDeclaration) => {
      if (!selectedSectionId) return
      onChange({
        ...profile,
        sections: profile.sections.map((s) =>
          s.id === selectedSectionId
            ? { ...s, components: s.components.map((c) => (c.id === componentId ? { ...c, style } : c)) }
            : s,
        ),
      })
    },
    [profile, onChange, selectedSectionId],
  )

  const handleLayoutChange = useCallback(
    (layout: string) => {
      if (!selectedSectionId) return
      onChange({
        ...profile,
        sections: profile.sections.map((s) =>
          s.id === selectedSectionId ? { ...s, layout: layout as Section["layout"] } : s,
        ),
      })
    },
    [profile, onChange, selectedSectionId],
  )

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="flex-1 text-[13px] font-[800]">Editor de Perfil</span>
        <button
          onClick={onClose}
          className="cursor-pointer border border-white/[0.07] bg-transparent px-3 py-1 text-[10px] font-[600] text-white/50 hover:text-white transition-colors font-[inherit]"
        >
          Fechar
        </button>
      </div>

      {/* Panel tabs */}
      <div className="flex shrink-0 border-b border-white/[0.07]">
        {(["sections", "components", "style"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPanel(p)}
            className={`flex-1 cursor-pointer border-b-2 px-3 py-2 text-[10px] font-[700] uppercase tracking-[0.08em] transition-colors font-[inherit] ${
               panel === p ? "border-red-500 text-red-300" : "border-transparent text-white/30 hover:text-white/60"
            }`}
          >
            {p === "sections" ? "Seções" : p === "components" ? "Componentes" : "Estilo"}
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="scrollbar-hide flex-1 overflow-y-auto p-4">
        {panel === "sections" && (
          <SectionList
            sections={profile.sections}
            selectedSectionId={selectedSectionId}
            onSelect={handleSelectSection}
            onAdd={handleAddSection}
            onRemove={handleRemoveSection}
            onMove={handleMoveSection}
          />
        )}

        {panel === "components" && selectedSection && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[11px] font-[800] uppercase tracking-[0.1em] text-white/30">
                {selectedSection.label || selectedSection.id}
              </div>
              <button
                onClick={() => setShowComponentPicker(true)}
                className="cursor-pointer border border-red-500/30 bg-transparent px-2 py-[3px] text-[9px] font-[600] text-red-300 hover:bg-red-600/12 transition-colors font-[inherit]"
              >
                + Add
              </button>
            </div>

            {showComponentPicker && (
              <div className="mb-3 rounded border border-white/[0.07] bg-[#161616] p-3">
                <ComponentPicker onSelect={handleAddComponent} onClose={() => setShowComponentPicker(false)} />
              </div>
            )}

            <div className="space-y-1">
              {selectedSection.components.length === 0 && (
                <div className="py-4 text-center text-[10px] text-white/30">Nenhum componente. Clique em "+ Add" para adicionar.</div>
              )}
              {selectedSection.components.map((comp) => (
                <div
                  key={comp.id}
                  className={`flex cursor-pointer items-center gap-2 border px-2.5 py-2 text-[11px] transition-colors ${
                    selectedComponentId === comp.id
                      ? "border-red-500/50 bg-red-600/10 text-red-300"
                      : "border-transparent text-white/60 hover:border-white/[0.07] hover:text-white"
                  }`}
                  onClick={() => setSelectedComponentId(comp.id)}
                >
                  <span className="text-[12px]">{COMPONENT_META[comp.type]?.icon ?? "?"}</span>
                  <span className="flex-1 truncate">{comp.title || COMPONENT_META[comp.type]?.label || comp.type}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveComponent(comp.id) }}
                    className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-red-400/50 hover:text-red-400 font-[inherit]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {panel === "style" && selectedSection && (
          <div>
            <div className="mb-4">
              <div className="mb-2 text-[11px] font-[700] text-white/70">{selectedSection.label || selectedSection.id}</div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[10px] text-white/50">Layout</label>
                <select
                  value={selectedSection.layout}
                  onChange={(e) => handleLayoutChange(e.target.value)}
                  className="border border-white/[0.07] bg-[#161616] px-2 py-1 text-[10px] text-white outline-none"
                >
                  <option value="flex-row">Linha Flexível</option>
                  <option value="flex-col">Coluna Flexível</option>
                  <option value="grid">Grid Automático</option>
                  <option value="grid-2">Grid 2 Colunas</option>
                  <option value="grid-3">Grid 3 Colunas</option>
                  <option value="grid-4">Grid 4 Colunas</option>
                </select>
              </div>
              <StyleControls style={selectedSection.style} onChange={handleSectionStyleChange} />
            </div>

            {selectedComponent && (
              <div className="border-t border-white/[0.07] pt-4">
                <div className="mb-2 text-[11px] font-[700] text-white/70">
                  {selectedComponent.title || COMPONENT_META[selectedComponent.type]?.label || selectedComponent.type}
                </div>
                <StyleControls
                  style={selectedComponent.style}
                  onChange={(style) => handleComponentStyleChange(selectedComponent.id, style)}
                />
              </div>
            )}
          </div>
        )}

        {panel === "components" && !selectedSection && (
          <div className="py-8 text-center text-[11px] text-white/30">
            Selecione uma seção para gerenciar seus componentes.
          </div>
        )}

        {panel === "style" && !selectedSection && (
          <div className="py-8 text-center text-[11px] text-white/30">
            Selecione uma seção ou componente para editar o estilo.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex shrink-0 items-center gap-2 border-t border-white/[0.07] px-4 py-3">
        <div className="flex-1 text-[9px] text-white/20">
          JSON • {profile.sections.length} seções, {profile.sections.reduce((a, s) => a + s.components.length, 0)} componentes
        </div>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(JSON.stringify(profile, null, 2))
          }}
          className="cursor-pointer border border-white/[0.07] bg-transparent px-2 py-1 text-[9px] text-white/40 hover:text-white transition-colors font-[inherit]"
        >
          Copiar JSON
        </button>
      </div>
    </div>
  )
}
