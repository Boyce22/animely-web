import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { FeedCommentComposer } from "./feed-comments/FeedCommentComposer"
import { FeedCommentsList } from "./feed-comments/FeedCommentsList"
import { MOCK_COMMENTS, type Comment } from "./feed-comments/feedCommentsData"

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
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-black/60 transition-opacity duration-250",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        style={{ backdropFilter: open ? "blur(8px)" : "none" }}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed bottom-0 right-0 z-[101] flex flex-col transition-transform duration-350",
          "inset-x-0 md:left-[64px]",
          "h-[85vh] md:h-[72vh]",
          open ? "translate-y-0" : "translate-y-full",
        )}
        style={{
          background: "#0e0e0e",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          className="w-9 h-[3px] bg-white/20 rounded-sm mx-auto mt-3 flex-shrink-0 cursor-pointer"
          onClick={onClose}
        />

        <div className="flex items-center justify-between px-5 pt-3 pb-2.5 flex-shrink-0 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-bold">{t("feed.comments")}</span>
            <span className="text-[12px] text-muted-foreground/60">Â· {count}</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <FeedCommentsList
          ref={listRef}
          comments={comments}
          onToggleLike={toggleCommentLike}
          onReply={name => { setReplyTo(name); textareaRef.current?.focus() }}
        />

        <FeedCommentComposer
          ref={textareaRef}
          input={input}
          replyTo={replyTo}
          placeholder={t("feed.comment_placeholder")}
          onInputChange={value => { setInput(value); autoResize() }}
          onSend={sendComment}
        />
      </div>
    </>
  )
}
