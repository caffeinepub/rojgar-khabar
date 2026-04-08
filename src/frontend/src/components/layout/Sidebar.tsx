import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink, Tag } from "lucide-react";
import { CATEGORIES } from "../../data/sampleData";
import { useAllPosts, useImportantLinks } from "../../hooks/useQueries";
import type { Post } from "../../types";

function formatDate(publishedAt: bigint): string {
  const ms = Number(publishedAt) / 1000000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function Sidebar() {
  const { data: links = [] } = useImportantLinks();
  const { data: posts = [] } = useAllPosts();

  const recentPosts = [...posts]
    .sort((a, b) => Number(b.publishedAt) - Number(a.publishedAt))
    .slice(0, 5);

  const categoryCounts = CATEGORIES.map((cat) => ({
    name: cat,
    count: posts.filter((p) => p.category === cat).length,
  }));

  return (
    <aside className="space-y-5">
      {/* Important Links */}
      <div className="portal-card overflow-hidden">
        <div className="bg-primary text-white font-bold px-4 py-2.5 text-sm uppercase tracking-wide">
          Important Links
        </div>
        <div className="p-3">
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li
                key={link.id}
                data-ocid={`sidebar.important_links.item.${i + 1}`}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors group"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
                  <span className="group-hover:underline">{link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Categories */}
      <div className="portal-card overflow-hidden">
        <div className="bg-primary text-white font-bold px-4 py-2.5 text-sm uppercase tracking-wide">
          Categories
        </div>
        <div className="p-3">
          <ul className="space-y-1">
            {categoryCounts.map((cat, i) => (
              <li key={cat.name} data-ocid={`sidebar.categories.item.${i + 1}`}>
                <Link
                  to="/category/$category"
                  params={{ category: cat.name }}
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-muted rounded-sm text-sm group transition-colors"
                  data-ocid="sidebar.categories.link"
                >
                  <span className="flex items-center gap-2 text-primary group-hover:text-accent">
                    <ChevronRight className="w-3.5 h-3.5 text-accent" />
                    {cat.name}
                  </span>
                  <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="portal-card overflow-hidden">
        <div className="bg-primary text-white font-bold px-4 py-2.5 text-sm uppercase tracking-wide">
          Recent Posts
        </div>
        <div className="p-3">
          <ul className="space-y-3">
            {recentPosts.map((post: Post, i) => (
              <li
                key={post.id}
                className="flex gap-3 items-start border-b border-border pb-3 last:border-0 last:pb-0"
                data-ocid={`sidebar.recent_posts.item.${i + 1}`}
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 flex-shrink-0 rounded-sm overflow-hidden bg-muted">
                  {post.featuredImageUrl ? (
                    <img
                      src={post.featuredImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Tag className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to="/post/$id"
                    params={{ id: post.id }}
                    className="text-xs font-semibold text-foreground hover:text-accent leading-snug line-clamp-2 block"
                    data-ocid="sidebar.recent_posts.link"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
