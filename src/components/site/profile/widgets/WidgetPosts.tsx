import { memo, useState } from "react"
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import type { PostItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  items: PostItem[]
  username: string
}

function WidgetPostsComponent({ items, username, ...context }: Props) {
  const { t } = useTranslation()
  const initial = (username[0] ?? "?").toUpperCase()
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const toggleLike = (i: number) =>
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <Widget
      id="posts"
      title={t("profile.recent_posts")}
      {...context}
    >
      <div>
        {items.map((post, i) => {
          const isLiked = liked.has(i)
          const likeCount = post.likes + (isLiked ? 1 : 0)
          return (
            <div
              key={i}
              className="border-b border-white/[0.04] px-3.5 py-[10px] last:border-b-0 transition-colors hover:bg-white/[0.025]"
            >
              {/* Header */}
              <div className="mb-[6px] flex items-center gap-[7px]">
                <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-[8px] font-[800] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
                  {initial}
                </div>
                <div className="text-[11px] font-[700] text-white/[0.78]">{username}</div>
                <div className="ml-auto font-mono text-[9.5px] text-white/[0.18]">{post.time}</div>
              </div>

              {/* Post text */}
              <p className="text-[12px] leading-[1.6] text-white/[0.6]">{post.text}</p>

              {/* Actions */}
              <div className="mt-[7px] flex items-center gap-3">
                <button
                  onClick={() => toggleLike(i)}
                  className={[
                    "flex cursor-pointer items-center gap-[5px] border-none bg-transparent p-0 text-[10px] font-[600] transition-colors",
                    isLiked ? "text-red-400" : "text-white/[0.22] hover:text-red-400/70",
                  ].join(" ")}
                >
                  <HeartIcon
                    className="h-[10px] w-[10px]"
                    style={isLiked ? { fill: "currentColor" } : undefined}
                  />
                  {likeCount}
                </button>

                {post.comments !== undefined && (
                  <div className="flex items-center gap-[5px] text-[10px] text-white/[0.18]">
                    <ChatBubbleLeftIcon className="h-[10px] w-[10px]" />
                    {post.comments}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Widget>
  )
}

export const WidgetPosts = memo(WidgetPostsComponent)
