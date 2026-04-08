import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BreakingNewsItem {
    id: string;
    createdAt: bigint;
    text: string;
}
export interface PostInput {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    applyLink: string;
    tags: Array<string>;
    publishedAt: bigint;
    summary: string;
    featuredImageUrl: string;
    category: string;
}
export interface Post {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    applyLink: string;
    tags: Array<string>;
    publishedAt: bigint;
    summary: string;
    featuredImageUrl: string;
    category: string;
}
export interface ImportantLink {
    id: string;
    url: string;
    title: string;
    category: string;
}
export interface backendInterface {
    addBreakingNews(text: string): Promise<void>;
    createImportantLink(link: ImportantLink): Promise<void>;
    createPost(post: PostInput): Promise<void>;
    deleteBreakingNews(newsId: string): Promise<void>;
    deleteImportantLink(linkId: string): Promise<void>;
    deletePost(postId: string): Promise<void>;
    /**
     * / Important Links Management
     */
    getAllImportantLinks(): Promise<Array<ImportantLink>>;
    /**
     * / Posts Management
     */
    getAllPublishedPosts(): Promise<Array<Post>>;
    /**
     * / Breaking News Management
     */
    getLatestBreakingNews(): Promise<Array<BreakingNewsItem>>;
    getPostsByCategory(category: string): Promise<Array<Post>>;
    searchPostsByTitle(searchTerm: string): Promise<Array<Post>>;
    updateImportantLink(link: ImportantLink): Promise<void>;
    updatePost(post: PostInput): Promise<void>;
}
