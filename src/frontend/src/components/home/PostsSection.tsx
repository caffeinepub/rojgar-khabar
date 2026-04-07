import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { useAllPosts } from "../../hooks/useQueries";
import { PostCard } from "../PostCard";

function SectionHeader({
  title,
  category,
}: { title: string; category: string }) {
  return (
    <div className="portal-section-header">
      <span className="portal-section-header-title">{title}</span>
      <Link
        to="/category/$category"
        params={{ category }}
        className="portal-section-header-action"
        data-ocid={`${category.toLowerCase().replace(/\s+/g, "_")}.view_all.button`}
      >
        View All &raquo;
      </Link>
    </div>
  );
}

export function FeaturedPosts() {
  const { data: posts = [], isLoading } = useAllPosts();

  const sorted = [...posts].sort(
    (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
  );
  const featured = sorted.slice(0, 3);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 rounded-sm" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="portal-section-header">
        <span className="portal-section-header-title">Featured Updates</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featured.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            variant={i === 0 ? "featured" : "featured"}
            index={i + 1}
            scope="featured"
          />
        ))}
      </div>
    </section>
  );
}

export function PostsSection({
  title,
  category,
  scope,
}: {
  title: string;
  category: string;
  scope: string;
}) {
  const { data: posts = [], isLoading } = useAllPosts();

  const filtered = posts
    .filter((p) => p.category === category)
    .sort((a, b) => Number(b.publishedAt) - Number(a.publishedAt))
    .slice(0, 3);

  if (isLoading) {
    return (
      <section>
        <SectionHeader title={title} category={category} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-sm" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title={title} category={category} />
      {filtered.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground text-sm border border-dashed border-border rounded-sm"
          data-ocid={`${scope}.empty_state`}
        >
          No posts in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              variant="default"
              index={i + 1}
              scope={scope}
            />
          ))}
        </div>
      )}
    </section>
  );
}
