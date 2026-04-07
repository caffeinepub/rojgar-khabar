import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { Sidebar } from "../components/layout/Sidebar";
import { usePostsByCategory } from "../hooks/useQueries";

export function CategoryPage() {
  const { category } = useParams({ from: "/category/$category" });
  const { data: posts = [], isLoading } = usePostsByCategory(category);

  return (
    <main>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link
            to="/"
            className="hover:text-accent"
            data-ocid="breadcrumb.link"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{category}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Section header */}
            <div className="portal-section-header mb-6">
              <span className="portal-section-header-title">{category}</span>
              <span className="bg-accent text-white px-4 py-2.5 text-sm font-semibold">
                {posts.length} Posts
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-72 rounded-sm" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground text-sm border border-dashed border-border rounded-sm"
                data-ocid="category.empty_state"
              >
                No posts found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posts.map((post, i) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    variant="default"
                    index={i + 1}
                    scope="category"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
