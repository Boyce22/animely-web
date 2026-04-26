import { useTranslation } from "react-i18next"
import { ContentCard, type ContentCardData } from "./ContentCard"

const GUTTER = 3

const PLACEHOLDERS = {
  aot: "linear-gradient(160deg, #1a0800 0%, #3d1500 50%, #0d0d0d 100%)",
  frieren: "linear-gradient(160deg, #0d0d1f 0%, #1a1a3d 50%, #08080f 100%)",
  jjk: "linear-gradient(160deg, #100010 0%, #2a002a 50%, #0a000a 100%)",
  dandadan: "linear-gradient(160deg, #001a10 0%, #003320 50%, #00100a 100%)",
  solo: "linear-gradient(160deg, #001a2a 0%, #003355 50%, #000d1a 100%)",
  blueLock: "linear-gradient(160deg, #001533 0%, #002966 50%, #000a1a 100%)",
  vinland: "linear-gradient(160deg, #1a1000 0%, #332000 50%, #0d0800 100%)",
  oshi: "linear-gradient(160deg, #1a0010 0%, #330020 50%, #0d0008 100%)",
  pingPong: "linear-gradient(160deg, #0d0d00 0%, #1a1a00 50%, #080800 100%)",
  mushishi: "linear-gradient(160deg, #001a0d 0%, #003319 50%, #000d06 100%)",
} as const

export const CONTENT_CARDS = {
  hero: {
    href: "/posts/attack-on-titan-final-obra-prima",
    phGradient: PLACEHOLDERS.aot,
    user: {
      initial: "O",
      gradient: "linear-gradient(135deg,#e63946,#6930c3)",
      username: "otakumaster",
    },
    badge: { type: "new", text: "Novo" },
    series: "Attack on Titan",
    caption: "Isayama entregou uma obra-prima do começo ao fim.",
    bigCaption: true,
    likes: 124,
    comments: 23,
    initialLiked: true,
    hasBookmark: true,
  },
  featuredTop: {
    href: "/posts/frieren-magia-filosofica",
    phGradient: PLACEHOLDERS.frieren,
    user: {
      initial: "Y",
      gradient: "linear-gradient(135deg,#2d6a4f,#52b788)",
      username: "yuuna",
    },
    badge: { type: "score", text: "9.42" },
    series: "Frieren",
    caption: "Eu nunca pensei que magia poderia ser tão filosófica.",
    likes: 87,
    comments: 14,
  },
  featuredBottom: {
    href: "/posts/jujutsu-kaisen-s3-ep-11",
    phGradient: PLACEHOLDERS.jjk,
    user: {
      initial: "M",
      gradient: "linear-gradient(135deg,#6930c3,#e63946)",
      username: "miyamoto_rei",
    },
    badge: { type: "new", text: "Ep. 11" },
    series: "Jujutsu Kaisen S3",
    caption: "Gege destruindo corações desde 2018.",
    likes: 341,
    comments: 58,
  },
  squareLeft: {
    href: "/posts/dandadan-ep-13",
    phGradient: PLACEHOLDERS.dandadan,
    user: {
      initial: "T",
      gradient: "linear-gradient(135deg,#001a10,#52b788)",
      username: "tanaka_drops",
    },
    badge: { type: "ep", text: "Ep. 13" },
    series: "Dandadan",
    caption: "Alien karate vs fantasma yokai — isso é arte.",
    likes: 62,
    comments: 9,
  },
  squareCenter: {
    href: "/posts/solo-leveling-s2-sung-jinwoo",
    phGradient: PLACEHOLDERS.solo,
    user: {
      initial: "L",
      gradient: "linear-gradient(135deg,#0d1b2a,#457b9d)",
      username: "luka_anime",
    },
    badge: { type: "new", text: "Novo" },
    series: "Solo Leveling S2",
    caption: "Sung Jinwoo sempre foi o cara mais overpowered. E ainda vai ficar mais.",
    likes: 219,
    comments: 37,
    initialLiked: true,
  },
  squareRight: {
    href: "/posts/blue-lock-s2-isagi",
    phGradient: PLACEHOLDERS.blueLock,
    user: {
      initial: "N",
      gradient: "linear-gradient(135deg,#001533,#0047ab)",
      username: "natsumi_w",
    },
    series: "Blue Lock S2",
    caption: "Esse gol do Isagi mudou tudo. Isagi > Rin provado.",
    likes: 847,
    comments: 134,
    hasSpoiler: true,
  },
  recommendationHero: {
    href: "/posts/vinland-saga-mundo-sem-guerra",
    phGradient: PLACEHOLDERS.vinland,
    user: {
      initial: "R",
      gradient: "linear-gradient(135deg,#1a1000,#5c3d00)",
      username: "rafaelomg",
    },
    badge: { type: "score", text: "★ 9.1" },
    series: "Vinland Saga",
    caption: "Thorfinn e a busca por um mundo sem guerra.",
    bigCaption: true,
    likes: 503,
    comments: 76,
    hasBookmark: true,
  },
  recommendationTopLeft: {
    href: "/posts/oshi-no-ko-s2-show-business",
    phGradient: PLACEHOLDERS.oshi,
    user: {
      initial: "S",
      gradient: "linear-gradient(135deg,#1a0010,#c9184a)",
      username: "sakura_drop",
    },
    series: "Oshi no Ko S2",
    caption: "A realidade do show business é perturbadora.",
    likes: 178,
    comments: 31,
  },
  recommendationTopRight: {
    href: "/posts/ping-pong-talento-esforco",
    phGradient: PLACEHOLDERS.pingPong,
    user: {
      initial: "K",
      gradient: "linear-gradient(135deg,#1a1a00,#555500)",
      username: "kurumi_fan",
    },
    badge: { type: "score", text: "★ 8.8" },
    series: "Ping Pong",
    caption: "Animação mais honesta sobre talento e esforço que já vi.",
    likes: 92,
    comments: 12,
    initialLiked: true,
  },
  recommendationWide: {
    href: "/posts/mushishi-anime-haiku",
    phGradient: PLACEHOLDERS.mushishi,
    user: {
      initial: "R",
      gradient: "linear-gradient(135deg,#001a0d,#2d6a4f)",
      username: "rafaelomg",
    },
    badge: { type: "score", text: "★ 9.0" },
    series: "Mushishi",
    caption: "O anime mais próximo de um haiku que existe.",
    bigCaption: true,
    likes: 441,
    comments: 49,
    hasBookmark: true,
  },
} satisfies Record<string, ContentCardData>

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

export const CONTENT_FEED_ITEMS = Object.values(CONTENT_CARDS)
