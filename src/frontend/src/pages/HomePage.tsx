import { FeaturedPosts, PostsSection } from "../components/home/PostsSection";
import { Sidebar } from "../components/layout/Sidebar";

export function HomePage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-8">
            <FeaturedPosts />
            <PostsSection
              title="Latest Jobs"
              category="Latest Jobs"
              scope="latest_jobs"
            />
            <PostsSection
              title="Government Schemes"
              category="Government Schemes"
              scope="govt_schemes"
            />
            <PostsSection
              title="Admit Cards"
              category="Admit Card"
              scope="admit_cards"
            />
            <PostsSection title="Results" category="Results" scope="results" />
            <PostsSection
              title="Scholarships"
              category="Scholarships"
              scope="scholarships"
            />
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
