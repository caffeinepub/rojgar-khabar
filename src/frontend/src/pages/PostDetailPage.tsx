import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Facebook,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "../components/layout/Sidebar";
import { useAllPosts } from "../hooks/useQueries";

function formatDate(publishedAt: bigint): string {
  const ms = Number(publishedAt) / 1000000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function PostDetailPage() {
  const { id } = useParams({ from: "/post/$id" });
  const { data: posts = [], isLoading } = useAllPosts();
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.id === id);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : "",
  );
  const shareTitle = encodeURIComponent(post?.title || "");

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-96 w-full" />
          </div>
          <Skeleton className="lg:w-72 h-96" />
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Post Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The post you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="portal-btn-primary"
          data-ocid="post_detail.link"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main>
      {/* Featured Image Banner */}
      {post.featuredImageUrl && (
        <div className="w-full h-48 md:h-72 overflow-hidden">
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 flex-wrap">
          <Link
            to="/"
            className="hover:text-accent"
            data-ocid="breadcrumb.link"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to="/category/$category"
            params={{ category: post.category }}
            className="hover:text-accent"
            data-ocid="breadcrumb.link"
          >
            {post.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium line-clamp-1">
            {post.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="portal-card p-5 mb-4">
              <span className="portal-badge mb-3 inline-block">
                {post.category}
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-accent font-medium">
                    {post.category}
                  </span>
                </span>
              </div>

              {/* Summary */}
              <div className="bg-muted border-l-4 border-accent p-4 rounded-sm text-sm text-foreground/80 mb-4">
                <strong className="text-foreground">Summary: </strong>
                {post.summary}
              </div>

              {/* CTA Buttons */}
              {post.applyLink && (
                <div className="flex flex-wrap gap-3 mb-4">
                  <a
                    href={post.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-btn-primary"
                    data-ocid="post_detail.primary_button"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apply Now / Official Website
                  </a>
                </div>
              )}
            </div>

            {/* Full Content */}
            <div className="portal-card p-5 mb-4">
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="portal-card p-4 mb-4">
                <strong className="text-sm text-foreground">Tags: </strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full border border-border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share */}
            <div className="portal-card p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <Share2 className="w-4 h-4" /> Share:
                </span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-sm hover:opacity-90"
                  data-ocid="post_detail.button"
                >
                  <Facebook className="w-3.5 h-3.5" /> Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-black text-white text-xs px-3 py-1.5 rounded-sm hover:opacity-90"
                  data-ocid="post_detail.button"
                >
                  <Twitter className="w-3.5 h-3.5" /> Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-green-600 text-white text-xs px-3 py-1.5 rounded-sm hover:opacity-90"
                  data-ocid="post_detail.button"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 bg-muted text-foreground text-xs px-3 py-1.5 rounded-sm hover:opacity-90 border border-border"
                  data-ocid="post_detail.button"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  Copy Link
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            {/* Apply Now Sticky Card */}
            {post.applyLink && (
              <div className="portal-card overflow-hidden mb-5">
                <div className="bg-primary text-white font-bold px-4 py-2.5 text-sm uppercase">
                  Quick Links
                </div>
                <div className="p-4 space-y-2">
                  <a
                    href={post.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-btn-primary w-full justify-center"
                    data-ocid="post_detail.primary_button"
                  >
                    <ExternalLink className="w-4 h-4" /> Apply Now
                  </a>
                  <a
                    href={post.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-btn-secondary w-full justify-center"
                    data-ocid="post_detail.secondary_button"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            )}
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
