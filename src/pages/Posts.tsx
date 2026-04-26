import { ContentFeedGrid } from "@/components/site/ContentFeedGrid"
import { ExploreRightPanel } from "@/components/site/ExploreRightPanel"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"

export default function Posts() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <ExploreSidebar />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ background: "#050505" }}>
          <ContentFeedGrid />
        </div>

        <ExploreRightPanel />
      </main>
    </div>
  )
}
