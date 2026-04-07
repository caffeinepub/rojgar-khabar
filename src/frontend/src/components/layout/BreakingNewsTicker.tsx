import { Zap } from "lucide-react";
import { useBreakingNews } from "../../hooks/useQueries";

export function BreakingNewsTicker() {
  const { data: news = [] } = useBreakingNews();

  if (news.length === 0) return null;

  const tickerText = news.map((n) => n.text).join("  \u2022  ");

  return (
    <div className="breaking-news-band" role="marquee" aria-live="polite">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-0 overflow-hidden">
          {/* Label */}
          <div className="flex items-center gap-1.5 bg-navy-dark text-white font-bold text-xs px-3 py-1 shrink-0 rounded-sm mr-3">
            <Zap className="w-3.5 h-3.5" fill="currentColor" />
            BREAKING NEWS
          </div>
          {/* Ticker */}
          <div className="overflow-hidden flex-1">
            <div className="ticker-scroll text-white text-sm font-medium">
              {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
