import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface Comment {
  id: string
  initial: string
  gradient: string
  name: string
  time: string
  text: string
  likes: number
  liked: boolean
  replyTo?: string
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    initial: "Y", gradient: "linear-gradient(135deg,#2d6a4f,#52b788)",
    name: "Yuna", time: "1h atrás",
    text: "Concordo demais! O arco final foi pesado mas fazia sentido pra história do Eren.",
    likes: 12, liked: false,
  },
  {
    id: "2",
    initial: "M", gradient: "linear-gradient(135deg,#6930c3,#e63946)",
    name: "miyamoto_rei", time: "45min",
    text: "Exatamente. É um dos finais mais corajosos da história da mídia.",
    likes: 8, liked: true,
    replyTo: "yuuna",
  },
  {
    id: "3",
    initial: "L", gradient: "linear-gradient(135deg,#457b9d,#1d3557)",
    name: "luka_anime", time: "30min",
    text: "Assisti 3 vezes e ainda choro no mesmo lugar. Obra.",
    likes: 5, liked: false,
  },
]

interface Props {
  open: boolean
  count: number
  onClose: () => void
}

export function FeedCommentsDrawer({ open, count, onClose }: Props) {
  const { t } = useTranslation()
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS)
  const [input, setInput] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 400)
  }, [open])

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }

  const sendComment = () => {
    const text = input.trim()
    if (!text) return
    const newComment: Comment = {
      id: Date.now().toString(),
      initial: "K",
      gradient: "linear-gradient(135deg,#e63946,#6930c3)",
      name: "kurumi_fan",
      time: "agora",
      text: replyTo ? `@${replyTo} ${text}` : text,
      likes: 0, liked: false,
    }
    setComments(c => [...c, newComment])
    setInput("")
    setReplyTo(null)
    if (textareaRef.current) textareaRef.current.style.height = "auto"
    setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    }, 50)
  }

  const toggleCommentLike = (id: string) => {
    setComments(cs =>
      cs.map(c =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c,
      ),
    )
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-black/60 transition-opacity duration-250",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        style={{ backdropFilter: open ? "blur(8px)" : "none" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-[101] flex flex-col transition-transform duration-350",
          open ? "translate-y-0" : "translate-y-full",
        )}
        style={{
          left: 220,
          height: "72vh",
          background: "#0e0e0e",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Handle */}
        <div
          className="w-9 h-[3px] bg-white/20 rounded-sm mx-auto mt-3 flex-shrink-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2.5 flex-shrink-0 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-bold">{t("feed.comments")}</span>
            <span className="text-[12px] text-muted-foreground/60">· {count}</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments list */}
        <div ref={listRef} className="flex-1 overflow-y-auto scrollbar-hide">
          {comments.map(c => (
            <div
              key={c.id}
              className="flex gap-2.5 px-5 py-3 border-b border-white/[0.04]"
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-black text-white"
                style={{ background: c.gradient }}
              >
                {c.initial}
              </div>
              <div className="flex-1 min-w-0">
                {c.replyTo && (
                  <p className="text-[11px] text-primary mb-0.5">↩ respondendo @{c.replyTo}</p>
                )}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[13px] font-bold">{c.name}</span>
                  <span className="text-[11px] text-muted-foreground/60">{c.time}</span>
                </div>
                <p className="text-[13px] text-white/70 leading-[1.5]">{c.text}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <button
                    onClick={() => toggleCommentLike(c.id)}
                    className={cn(
                      "flex items-center gap-1 text-[11px] bg-transparent border-none p-0 cursor-pointer transition-colors",
                      c.liked ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12"
                      fill={c.liked ? "currentColor" : "none"}
                      stroke="currentColor" strokeWidth="1.2"
                    >
                      <path d="M6 11S1 7.5 1 4.5a3 3 0 0 1 5-.45A3 3 0 0 1 11 4.5C11 7.5 6 11 6 11z" />
                    </svg>
                    <span>{c.likes}</span>
                  </button>
                  <button
                    onClick={() => { setReplyTo(c.name); textareaRef.current?.focus() }}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    Responder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-2.5 flex gap-2.5 items-end bg-[#0e0e0e]">
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-black text-white bg-gradient-to-br from-primary to-[#6930c3]">
            K
          </div>
          <div className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-[20px] px-3.5 py-2 flex items-center gap-2">
            {replyTo && (
              <span className="text-[11px] text-primary flex-shrink-0">@{replyTo}</span>
            )}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => { setInput(e.target.value); autoResize() }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendComment() }
              }}
              placeholder={t("feed.comment_placeholder")}
              rows={1}
              className="flex-1 bg-transparent border-none text-[13px] text-foreground placeholder:text-white/25 outline-none resize-none max-h-20 font-[inherit]"
            />
          </div>
          <button
            onClick={sendComment}
            className="w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center flex-shrink-0 border-none cursor-pointer hover:opacity-85 transition-opacity"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </>
  )
}
