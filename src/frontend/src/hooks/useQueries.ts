import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  SAMPLE_BREAKING_NEWS,
  SAMPLE_IMPORTANT_LINKS,
  SAMPLE_POSTS,
} from "../data/sampleData";
import type {
  BreakingNewsItem,
  ImportantLink,
  Post,
  PostInput,
} from "../types";
import { useActor } from "./useActor";

export function useAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) return SAMPLE_POSTS;
      const posts = await actor.getAllPublishedPosts();
      return posts.length > 0 ? posts : SAMPLE_POSTS;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_POSTS,
  });
}

export function usePostsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", "category", category],
    queryFn: async () => {
      if (!actor) return SAMPLE_POSTS.filter((p) => p.category === category);
      const posts = await actor.getPostsByCategory(category);
      return posts.length > 0
        ? posts
        : SAMPLE_POSTS.filter((p) => p.category === category);
    },
    enabled: !isFetching,
  });
}

export function useSearchPosts(term: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", "search", term],
    queryFn: async () => {
      if (!actor) {
        return SAMPLE_POSTS.filter((p) =>
          p.title.toLowerCase().includes(term.toLowerCase()),
        );
      }
      const results = await actor.searchPostsByTitle(term);
      if (results.length > 0) return results;
      return SAMPLE_POSTS.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase()),
      );
    },
    enabled: !isFetching && term.length > 0,
  });
}

export function useBreakingNews() {
  const { actor, isFetching } = useActor();
  return useQuery<BreakingNewsItem[]>({
    queryKey: ["breakingNews"],
    queryFn: async () => {
      if (!actor) return SAMPLE_BREAKING_NEWS;
      const news = await actor.getLatestBreakingNews();
      return news.length > 0 ? news : SAMPLE_BREAKING_NEWS;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_BREAKING_NEWS,
  });
}

export function useImportantLinks() {
  const { actor, isFetching } = useActor();
  return useQuery<ImportantLink[]>({
    queryKey: ["importantLinks"],
    queryFn: async () => {
      if (!actor) return SAMPLE_IMPORTANT_LINKS;
      const links = await actor.getAllImportantLinks();
      return links.length > 0 ? links : SAMPLE_IMPORTANT_LINKS;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_IMPORTANT_LINKS,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: PostInput) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.createPost(post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: PostInput) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.updatePost(post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useAddBreakingNews() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.addBreakingNews(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["breakingNews"] });
    },
  });
}

export function useDeleteBreakingNews() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newsId: string) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.deleteBreakingNews(newsId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["breakingNews"] });
    },
  });
}

export function useCreateImportantLink() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: ImportantLink) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.createImportantLink(link);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["importantLinks"] });
    },
  });
}

export function useUpdateImportantLink() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: ImportantLink) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.updateImportantLink(link);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["importantLinks"] });
    },
  });
}

export function useDeleteImportantLink() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (linkId: string) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.deleteImportantLink(linkId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["importantLinks"] });
    },
  });
}
