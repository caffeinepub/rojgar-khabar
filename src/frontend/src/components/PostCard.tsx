import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, ExternalLink, Tag } from "lucide-react";
import type { Post } from "../backend.d";

function formatDate(publishedAt: bigint): string {
  const ms = Number(publishedAt) / 1000000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface PostCardProps {
  post: Post;
  variant?: "default" | "featured" | "compact";
  index?: number;
  scope?: string;
}

export function PostCard({
  post,
  variant = "default",
  index = 1,
  scope = "post",
}: PostCardProps) {
  const markerBase = `${scope}.item.${index}`;

  if (variant === "compact") {
    return (
      <div className="portal-card p-3 flex gap-3" data-ocid={markerBase}>
        <div className="w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden">
          {post.featuredImageUrl ? (
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="portal-badge text-xs mb-1 inline-block">
            {post.category}
          </span>
          <Link
            to="/post/$id"
            params={{ id: post.id }}
            className="block font-semibold text-sm text-foreground hover:text-accent leading-snug line-clamp-2"
            data-ocid={`${markerBase}.link`}
          >
            {post.title}
          </Link>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="portal-card overflow-hidden" data-ocid={markerBase}>
        <div className="aspect-[16/9] overflow-hidden">
          {post.featuredImageUrl ? (
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
          )}
        </div>
        <div className="p-4">
          <span className="portal-badge mb-2 inline-block">
            {post.category}
          </span>
          <Link
            to="/post/$id"
            params={{ id: post.id }}
            className="block font-bold text-base text-foreground hover:text-accent leading-snug mb-2 line-clamp-2"
            data-ocid={`${markerBase}.link`}
          >
            {post.title}
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {post.summary}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
            <Link
              to="/post/$id"
              params={{ id: post.id }}
              className="portal-btn-primary text-xs py-1"
              data-ocid={`${markerBase}.link`}
            >
              Read More <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // default
  return (
    <div
      className="portal-card overflow-hidden flex flex-col"
      data-ocid={markerBase}
    >
      <div className="aspect-video overflow-hidden">
        {post.featuredImageUrl ? (
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
            <Tag className="w-8 h-8 text-white opacity-50" />
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="portal-badge mb-2 inline-block self-start">
          {post.category}
        </span>
        <Link
          to="/post/$id"
          params={{ id: post.id }}
          className="font-bold text-sm text-foreground hover:text-accent leading-snug mb-2 line-clamp-2 block"
          data-ocid={`${markerBase}.link`}
        >
          {post.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.publishedAt)}
          </span>
          {post.applyLink ? (
            <a
              href={post.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="portal-btn-primary text-xs py-1"
              data-ocid={`${markerBase}.button`}
            >
              Apply Now <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <Link
              to="/post/$id"
              params={{ id: post.id }}
              className="portal-btn-primary text-xs py-1"
              data-ocid={`${markerBase}.button`}
            >
              Read More <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
