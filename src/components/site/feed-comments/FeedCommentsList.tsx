import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { Comment } from "./feedCommentsData"

interface FeedCommentsListProps {
  comments: Comment[]
  onToggleLike: (id: string) => void
  onReply: (name: string) => void
}

export const FeedCommentsList = forwardRef<HTMLDivElement, FeedCommentsListProps>(
  function FeedCommentsList({ comments, onToggleLike, onReply }, ref) {
    return (
      <div ref={ref} className="flex-1 overflow-y-auto scrollbar-hide">
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
                <p className="text-[11px] text-primary mb-0.5">â†© respondendo @{c.replyTo}</p>
              )}
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[13px] font-bold">{c.name}</span>
                <span className="text-[11px] text-muted-foreground/60">{c.time}</span>
              </div>
              <p className="text-[13px] text-white/70 leading-[1.5]">{c.text}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <button
                  onClick={() => onToggleLike(c.id)}
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
                  onClick={() => onReply(c.name)}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  Responder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  },
)
