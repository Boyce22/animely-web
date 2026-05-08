import type { StyleDeclaration, StyleControlOption } from "../types"
import { STYLE_CONTROLS } from "../types"

interface StyleControlsProps {
  style: StyleDeclaration
  onChange: (style: StyleDeclaration) => void
}

export function StyleControls({ style, onChange }: StyleControlsProps) {
  const update = (key: keyof StyleDeclaration, value: string | number | undefined) => {
    onChange({ ...style, [key]: value || undefined })
  }

  return (
    <div className="space-y-3">
      <div className="text-[10px] font-[800] uppercase tracking-[0.1em] text-white/30">Estilo</div>
      {STYLE_CONTROLS.map((control) => (
        <StyleRow key={control.id} control={control} value={style[control.property]} onChange={(v) => update(control.property, v)} />
      ))}
    </div>
  )
}

function StyleRow({
  control,
  value,
  onChange,
}: {
  control: StyleControlOption
  value?: string | number
  onChange: (value: string) => void
}) {
  const current = String(value ?? control.defaultValue ?? "")

  if (control.type === "color") {
    return (
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-white/60">{control.label}</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={current || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
          />
          <input
            type="text"
            value={current}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 border border-white/[0.07] bg-[#161616] px-2 py-1 text-[10px] text-white outline-none"
          />
        </div>
      </div>
    )
  }

  if (control.type === "select" && control.options) {
    return (
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-white/60">{control.label}</label>
        <select
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className="border border-white/[0.07] bg-[#161616] px-2 py-1 text-[10px] text-white outline-none"
        >
          {control.options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    )
  }

  if (control.type === "slider") {
    return (
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-white/60">{control.label}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={parseInt(current) || 0}
          onChange={(e) => onChange(e.target.value + (control.id === "radius" ? "px" : ""))}
          className="w-20 accent-red-500"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <label className="text-[11px] text-white/60">{control.label}</label>
      <input
        type="text"
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 border border-white/[0.07] bg-[#161616] px-2 py-1 text-[10px] text-white outline-none"
      />
    </div>
  )
}
