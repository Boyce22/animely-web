import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Bookmark, Heart, MessageCircle, Share2 } from "lucide-react"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { CONTENT_FEED_ITEMS } from "@/components/site/content-feed/contentFeedData"

export default function PostDetail() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const post = useMemo(
    () => CONTENT_FEED_ITEMS.find(item => item.href === `/posts/${slug}`),
    [slug],
  )

  if (!post) {
    return (
      <div className="flex min-h-screen bg-background text-foreground">
        <ExploreSidebar />
        <main className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">404</p>
            <h1 className="mt-2 text-2xl font-black">Matéria não encontrada</h1>
            <button
              onClick={() => navigate("/")}
              className="mt-5 border border-white/[0.08] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
            >
              Voltar ao feed
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <ExploreSidebar />

      <main className="flex-1 overflow-x-hidden">
        <article className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </button>

          <div
            className="mb-7 h-[320px] overflow-hidden border border-white/[0.07]"
            style={{ background: post.phGradient }}
          />

          <div className="mb-4 flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black text-white"
              style={{ background: post.user.gradient }}
            >
              {post.user.initial}
            </div>
            <div>
              <p className="text-[12px] font-bold text-foreground">@{post.user.username}</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-primary">{post.series}</p>
            </div>
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {post.caption}
          </h1>

          <div className="mt-5 flex items-center gap-5 border-y border-white/[0.07] py-4 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" /> {post.likes}</span>
            <span className="flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> {post.comments}</span>
            <span className="ml-auto flex items-center gap-3">
              <Bookmark className="h-4 w-4" />
              <Share2 className="h-4 w-4" />
            </span>
          </div>

          <div className="prose prose-invert mt-8 max-w-none prose-p:text-muted-foreground">
            <p>
              Esta é a página da matéria vinculada ao card selecionado. O conteúdo completo pode
              vir da API depois, mantendo este mesmo endereço como destino do post.
            </p>
            <p>
              A ideia aqui é que publicações de escritores, bloggers, usuários e notícias possam
              conviver no feed inicial e abrir sempre a matéria correta.
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
