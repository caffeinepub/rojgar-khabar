import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { PostCard } from "../components/PostCard";
import { Sidebar } from "../components/layout/Sidebar";
import { useSearchPosts } from "../hooks/useQueries";

export function SearchPage() {
  const search = useSearch({ from: "/search" });
  const q = (search as { q?: string }).q || "";
  const { data: results = [], isLoading } = useSearchPosts(q);
  const [inputTerm, setInputTerm] = useState(q);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTerm.trim()) {
      navigate({ to: "/search", search: { q: inputTerm.trim() } });
    }
  };

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
          <span className="text-foreground font-medium">Search Results</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="portal-card p-4 mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={inputTerm}
                  onChange={(e) => setInputTerm(e.target.value)}
                  placeholder="Search jobs, results, schemes..."
                  className="flex-1 border border-border px-4 py-2 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="search.input"
                />
                <button
                  type="submit"
                  className="portal-btn-primary"
                  data-ocid="search.submit_button"
                >
                  <Search className="w-4 h-4" /> Search
                </button>
              </form>
            </div>

            <div className="portal-section-header mb-4">
              <span className="portal-section-header-title">
                {q ? `Search Results for "${q}"` : "Search"}
              </span>
              <span className="bg-accent text-white px-4 py-2.5 text-sm font-semibold">
                {results.length} Results
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-72 rounded-sm" />
                ))}
              </div>
            ) : !q ? (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="search.empty_state"
              >
                Enter a search term above to find posts.
              </div>
            ) : results.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-sm"
                data-ocid="search.empty_state"
              >
                No results found for &ldquo;{q}&rdquo;. Try a different search
                term.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((post, i) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    variant="default"
                    index={i + 1}
                    scope="search"
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
