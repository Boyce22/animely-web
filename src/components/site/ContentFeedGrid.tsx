import { useTranslation } from "react-i18next"
import { ContentCard } from "./ContentCard"
import { CONTENT_CARDS } from "./content-feed/contentFeedData"

const GUTTER = 3

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: GUTTER }}>{children}</div>
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#050505",
        padding: "18px 16px 10px",
        color: "#3a3a3a",
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      {label}
      <div style={{ flex: 1, height: 1, background: "#3a3a3a", opacity: 0.3 }} />
    </div>
  )
}

export function ContentFeedGrid() {
  const { t } = useTranslation()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: GUTTER,
        background: "#000",
        paddingBottom: 48,
      }}
    >
      <Row>
        <ContentCard data={CONTENT_CARDS.hero} height={420} style={{ flex: "0 0 65%" }} />
        <div style={{ flex: `0 0 calc(35% - ${GUTTER}px)`, display: "flex", flexDirection: "column", gap: GUTTER }}>
          <ContentCard data={CONTENT_CARDS.featuredTop} style={{ flex: 1 }} />
          <ContentCard data={CONTENT_CARDS.featuredBottom} style={{ flex: 1 }} />
        </div>
      </Row>

      <Row>
        <ContentCard data={CONTENT_CARDS.squareLeft} height={280} style={{ flex: 1 }} />
        <ContentCard data={CONTENT_CARDS.squareCenter} height={280} style={{ flex: 1 }} />
        <ContentCard data={CONTENT_CARDS.squareRight} height={280} style={{ flex: 1 }} />
      </Row>

      <SectionDivider label={t("explore.recommended_for_you")} />

      <Row>
        <ContentCard
          data={CONTENT_CARDS.recommendationHero}
          height={380}
          style={{ flex: `0 0 calc(40% - ${GUTTER}px)` }}
        />
        <div style={{ flex: "0 0 60%", display: "flex", flexDirection: "column", gap: GUTTER }}>
          <Row>
            <ContentCard data={CONTENT_CARDS.recommendationTopLeft} style={{ flex: 1 }} />
            <ContentCard data={CONTENT_CARDS.recommendationTopRight} style={{ flex: 1 }} />
          </Row>
          <ContentCard data={CONTENT_CARDS.recommendationWide} style={{ flex: "0 0 160px" }} />
        </div>
      </Row>
    </div>
  )
}
