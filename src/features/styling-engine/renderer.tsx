import { useMemo } from "react"
import type { StylingProfile, Section } from "./types"
import { SECTION_LAYOUT_META } from "./types"
import { renderComponent } from "./registry"
import type { ProfileData } from "@/components/site/profile/profileTypes"

interface ProfileRendererProps {
  profile: StylingProfile
  userProfile: ProfileData
  editMode: boolean
  onComponentClick?: (sectionId: string, componentId: string) => void
}

function sectionLayoutClass(layout: string): string {
  switch (layout) {
    case "flex-row": return "flex flex-row flex-wrap"
    case "flex-col": return "flex flex-col"
    case "grid": return "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
    case "grid-2": return "grid grid-cols-1 md:grid-cols-2"
    case "grid-3": return "grid grid-cols-1 md:grid-cols-3"
    case "grid-4": return "grid grid-cols-2 md:grid-cols-4"
    default: return "flex flex-row flex-wrap"
  }
}

function styleToInline(style: Record<string, unknown>): React.CSSProperties {
  const css: React.CSSProperties = {}
  for (const [key, val] of Object.entries(style)) {
    if (key === "css" || val == null) continue
    const reactKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) as keyof React.CSSProperties
    ;(css as Record<string, unknown>)[reactKey] = val
  }
  return css
}

function RenderSection({
  section,
  userProfile,
  editMode,
  onComponentClick,
}: {
  section: Section
  userProfile: ProfileData
  editMode: boolean
  onComponentClick?: (sectionId: string, componentId: string) => void
}) {
  const layoutClass = sectionLayoutClass(section.layout)

  return (
    <div className={`mb-[18px] ${editMode ? "relative rounded-[8px] border-2 border-dashed border-red-600/20 p-2" : ""}`}>
      {editMode && (
        <div className="mb-2 text-[9px] font-[700] uppercase tracking-[0.12em] text-red-400/60">
          {section.label || `Section: ${section.id}`}
        </div>
      )}
      <div className={layoutClass} style={styleToInline(section.style as Record<string, unknown>)}>
        {section.components
          .filter((c) => !editMode || c.type !== "divider" || c.id === "divider")
          .map((component) => (
            <div
              key={component.id}
              style={styleToInline(component.style as Record<string, unknown>)}
              className={editMode ? "group relative cursor-pointer" : ""}
              onClick={() => onComponentClick?.(section.id, component.id)}
            >
              {renderComponent({
                component,
                profileData: {
                  name: userProfile.name,
                  username: userProfile.username,
                  biography: userProfile.biography,
                  profilePictureUrl: userProfile.profilePictureUrl,
                  timeZone: userProfile.timeZone,
                  address: userProfile.address,
                },
                editMode,
              })}
            </div>
          ))}
      </div>
    </div>
  )
}

export function ProfileRenderer({ profile, userProfile, editMode, onComponentClick }: ProfileRendererProps) {
  const canvasStyle = useMemo((): React.CSSProperties => {
    const s: React.CSSProperties = {}
    if (profile.canvas.background) s.background = profile.canvas.background
    if (profile.canvas.accentColor) s.setProperty?.("--accent", profile.canvas.accentColor)
    if (profile.canvas.maxWidth) s.maxWidth = profile.canvas.maxWidth
    if (profile.canvas.padding) s.padding = profile.canvas.padding
    return s
  }, [profile])

  return (
    <div style={canvasStyle} className="mx-auto w-full">
      {profile.sections.map((section) => (
        <RenderSection
          key={section.id}
          section={section}
          userProfile={userProfile}
          editMode={editMode}
          onComponentClick={onComponentClick}
        />
      ))}
    </div>
  )
}
