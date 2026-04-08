export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  featuredImageUrl: string;
  applyLink: string;
  tags: string[];
  publishedAt: bigint;
  isPublished: boolean;
}

export type PostInput = Post;

export interface BreakingNewsItem {
  id: string;
  text: string;
  createdAt: bigint;
}

export interface ImportantLink {
  id: string;
  title: string;
  url: string;
  category: string;
}

export interface BackendActor {
  getAllPublishedPosts(): Promise<Post[]>;
  getPostsByCategory(category: string): Promise<Post[]>;
  searchPostsByTitle(term: string): Promise<Post[]>;
  getLatestBreakingNews(): Promise<BreakingNewsItem[]>;
  getAllImportantLinks(): Promise<ImportantLink[]>;
  isCallerAdmin(): Promise<boolean>;
  createPost(post: PostInput): Promise<void>;
  updatePost(post: PostInput): Promise<void>;
  deletePost(postId: string): Promise<void>;
  addBreakingNews(text: string): Promise<void>;
  deleteBreakingNews(newsId: string): Promise<void>;
  createImportantLink(link: ImportantLink): Promise<void>;
  updateImportantLink(link: ImportantLink): Promise<void>;
  deleteImportantLink(linkId: string): Promise<void>;
}
