import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  COV_GRADIENTS,
  DIAGONAL_LINES,
  STATUS_STYLES,
  STATUS_T_KEYS,
  type CatalogItem,
} from "./catalogData";

export function CatalogMangaCard({ item }: { item: CatalogItem }) {
  const { t } = useTranslation();
  const gradient = COV_GRADIENTS[item.covClass] ?? COV_GRADIENTS["cov-1"];

  return (
    <div className="group cursor-pointer flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
      <div
        className="w-full aspect-[2/3] relative overflow-hidden border border-white/[0.07] flex-shrink-0"
        style={{
          boxShadow:
            "-4px 0 0 rgba(0,0,0,0.6),-5px 0 0 rgba(255,255,255,0.03),4px 4px 14px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="w-full h-full relative"
          style={{ background: gradient }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: DIAGONAL_LINES }}
          />
        </div>

        <div className="absolute inset-0 bg-primary/[0.12] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-primary text-white text-[12px] font-black tracking-[0.08em] uppercase px-4 py-2"
          >
            {t("catalog.add_to_list")}
          </button>
        </div>

        <span
          className={cn(
            "absolute top-2 left-2 text-[10px] font-black tracking-[0.1em] uppercase px-2 py-0.5",
            STATUS_STYLES[item.status],
          )}
        >
          {t(STATUS_T_KEYS[item.status])}
        </span>

        <span className="absolute bottom-2 right-2 text-[12px] font-black font-mono bg-black/80 text-amber-400 px-2 py-0.5 border border-amber-400/25">
          {item.score.toFixed(1)}
        </span>

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6 bg-gradient-to-t from-black/85 to-transparent text-[14px] font-black text-white/90 leading-tight">
          {item.title}
        </div>
      </div>

      <div className="pt-3 px-1">
        <p className="text-[15px] font-bold text-foreground leading-snug mb-1 truncate">
          {item.title}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-muted-foreground">
            {item.genres[0]}
          </span>
          <span className="text-[12px] font-medium text-white/30">{item.year}</span>
        </div>
        <p className="text-[12px] font-medium text-white/30 font-mono mt-1">
          {item.chapters} {t("catalog.chapters_abbr")}
        </p>
      </div>
    </div>
  );
}

export function CatalogMangaRow({
  item,
  rank,
}: {
  item: CatalogItem;
  rank: number;
}) {
  const gradient = COV_GRADIENTS[item.covClass] ?? COV_GRADIENTS["cov-1"];

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/[0.07] last:border-0 group cursor-pointer hover:bg-white/[0.02] transition-colors -mx-6 px-6">
      <span className="text-[26px] font-black font-mono text-white/20 w-12 flex-shrink-0 text-center select-none">
        {rank}
      </span>

      <div className="w-16 h-24 flex-shrink-0 overflow-hidden border border-white/[0.07]">
        <div
          className="w-full h-full relative"
          style={{ background: gradient }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: DIAGONAL_LINES }}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0 ml-2">
        <p className="text-[16px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
          {item.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[13px] text-muted-foreground font-medium">
            {item.author}
          </span>
          <span className="text-white/20 text-[12px]">Â·</span>
          <span className="text-[13px] text-muted-foreground font-medium">
            {item.genres[0]}
          </span>
          <span className="text-white/20 text-[12px]">Â·</span>
          <span className="text-[13px] text-muted-foreground font-medium">{item.year}</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1 max-w-[100px] h-px bg-white/[0.07]">
            <div
              className="h-full bg-primary"
              style={{ width: `${(item.score / 10) * 100}%` }}
            />
          </div>
          <span className="text-[12px] font-bold text-muted-foreground tabular-nums">
            {item.score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
