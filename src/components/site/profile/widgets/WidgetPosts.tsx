import { memo } from "react"
import { HeartIcon } from "@heroicons/react/24/outline"
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

  return (
    <Widget
      id="posts"
      title={t("profile.recent_posts")}
      {...context}
    >
      <div>
        {items.map((post, i) => (
          <div key={i} className="border-b border-white/[0.07] p-3 last:border-b-0">
            <div className="mb-1 flex items-center gap-[7px]">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-[8px] font-[800]">
                {initial}
              </div>
              <div className="text-[11px] font-[700]">{username}</div>
              <div className="ml-auto font-mono text-[10px] text-white/25">{post.time}</div>
            </div>
            <p className="text-[12px] leading-[1.5] text-white/70">{post.text}</p>
            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-white/25">
              <HeartIcon className="h-[10px] w-[10px]" />
              {post.likes}
            </div>
          </div>
        ))}
      </div>
    </Widget>
  )
}

export const WidgetPosts = memo(WidgetPostsComponent)
