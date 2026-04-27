import { forwardRef } from "react"
import { Send } from "lucide-react"

interface FeedCommentComposerProps {
  input: string
  replyTo: string | null
  placeholder: string
  onInputChange: (value: string) => void
  onSend: () => void
}

export const FeedCommentComposer = forwardRef<HTMLTextAreaElement, FeedCommentComposerProps>(
  function FeedCommentComposer({ input, replyTo, placeholder, onInputChange, onSend }, ref) {
    return (
      <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-2.5 flex gap-2.5 items-end bg-[#0e0e0e]">
        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-black text-white bg-gradient-to-br from-primary to-[#6930c3]">
          K
        </div>
        <div className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-[20px] px-3.5 py-2 flex items-center gap-2">
          {replyTo && (
            <span className="text-[11px] text-primary flex-shrink-0">@{replyTo}</span>
          )}
          <textarea
            ref={ref}
            value={input}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend() }
            }}
            placeholder={placeholder}
            rows={1}
            className="flex-1 bg-transparent border-none text-[13px] text-foreground placeholder:text-white/25 outline-none resize-none max-h-20 font-[inherit]"
          />
        </div>
        <button
          onClick={onSend}
          className="w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center flex-shrink-0 border-none cursor-pointer hover:opacity-85 transition-opacity"
        >
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    )
  },
)
