import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  FileText,
  ImageIcon,
  KeyRound,
  LayoutDashboard,
  Link as LinkIcon,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { CATEGORIES } from "../data/sampleData";
import { useAdminAuth } from "../hooks/useAdminAuth";
import {
  useAddBreakingNews,
  useAllPosts,
  useBreakingNews,
  useCreateImportantLink,
  useCreatePost,
  useDeleteBreakingNews,
  useDeleteImportantLink,
  useDeletePost,
  useImportantLinks,
  useUpdateImportantLink,
  useUpdatePost,
} from "../hooks/useQueries";
import type { ImportantLink, Post, PostInput } from "../types";

type AdminSection =
  | "posts"
  | "breaking-news"
  | "important-links"
  | "change-password";

function PostForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial?: Post;
  onSubmit: (data: PostInput) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<PostInput>({
    id: initial?.id || crypto.randomUUID(),
    title: initial?.title || "",
    summary: initial?.summary || "",
    content: initial?.content || "",
    category: initial?.category || CATEGORIES[0],
    featuredImageUrl: initial?.featuredImageUrl || "",
    applyLink: initial?.applyLink || "",
    tags: initial?.tags || [],
    publishedAt: initial?.publishedAt || BigInt(Date.now() * 1000000),
    isPublished: initial?.isPublished ?? true,
  });
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(", "));
  const [imagePreview, setImagePreview] = useState<string>(
    initial?.featuredImageUrl || "",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);
      setForm((f) => ({ ...f, featuredImageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setForm((f) => ({ ...f, featuredImageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      toast.error("Title, summary, and content are required");
      return;
    }
    onSubmit({
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="post_form.panel"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Post title"
            required
            data-ocid="post_form.input"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="summary">Summary *</Label>
          <Textarea
            id="summary"
            value={form.summary}
            onChange={(e) =>
              setForm((f) => ({ ...f, summary: e.target.value }))
            }
            placeholder="Short description"
            rows={2}
            required
            data-ocid="post_form.textarea"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            value={form.content}
            onChange={(e) =>
              setForm((f) => ({ ...f, content: e.target.value }))
            }
            placeholder="Post ka pura content yahan likhein..."
            rows={8}
            required
            data-ocid="post_form.editor"
          />
        </div>
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            value={form.category}
            onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
          >
            <SelectTrigger data-ocid="post_form.select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="tag1, tag2, tag3"
            data-ocid="post_form.input"
          />
        </div>

        {/* Featured Image Upload */}
        <div className="md:col-span-2">
          <Label>Featured Image</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            data-ocid="post_form.upload_button"
          />
          {imagePreview ? (
            <div className="mt-1.5 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 max-w-full rounded border border-border object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80 transition-colors"
                data-ocid="post_form.delete_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-1.5 w-full border-2 border-dashed border-border rounded-md py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer bg-muted/30"
              data-ocid="post_form.dropzone"
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-6 h-6" />
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Click to upload image</span>
              <span className="text-xs">PNG, JPG, GIF up to 10MB</span>
            </button>
          )}
        </div>

        <div>
          <Label htmlFor="applyLink">Apply Link / Official URL</Label>
          <Input
            id="applyLink"
            value={form.applyLink}
            onChange={(e) =>
              setForm((f) => ({ ...f, applyLink: e.target.value }))
            }
            placeholder="https://..."
            data-ocid="post_form.input"
          />
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="isPublished"
            checked={form.isPublished}
            onCheckedChange={(v) => setForm((f) => ({ ...f, isPublished: v }))}
            data-ocid="post_form.switch"
          />
          <Label htmlFor="isPublished">Published</Label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-accent hover:bg-orange-dark text-white"
          data-ocid="post_form.submit_button"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {initial ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="post_form.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

function PostsManager() {
  const { data: posts = [], isLoading } = useAllPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreate = (data: PostInput) => {
    createPost.mutate(data, {
      onSuccess: () => {
        toast.success("Post created successfully");
        setShowCreateForm(false);
      },
      onError: () => toast.error("Failed to create post"),
    });
  };

  const handleUpdate = (data: PostInput) => {
    updatePost.mutate(data, {
      onSuccess: () => {
        toast.success("Post updated successfully");
        setEditingPost(null);
      },
      onError: () => toast.error("Failed to update post"),
    });
  };

  const handleDelete = (postId: string) => {
    deletePost.mutate(postId, {
      onSuccess: () => toast.success("Post deleted"),
      onError: () => toast.error("Failed to delete post"),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-primary">Posts Management</h2>
        {!showCreateForm && !editingPost && (
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-accent hover:bg-orange-dark text-white"
            data-ocid="posts.open_modal_button"
          >
            <Plus className="w-4 h-4 mr-1" /> New Post
          </Button>
        )}
      </div>

      {showCreateForm && (
        <div className="portal-card p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary">Create New Post</h3>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="text-muted-foreground hover:text-foreground"
              data-ocid="post_form.close_button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <PostForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
            isPending={createPost.isPending}
          />
        </div>
      )}

      {editingPost && (
        <div className="portal-card p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary">Edit Post</h3>
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="text-muted-foreground hover:text-foreground"
              data-ocid="post_form.close_button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <PostForm
            initial={editingPost}
            onSubmit={handleUpdate}
            onCancel={() => setEditingPost(null)}
            isPending={updatePost.isPending}
          />
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8" data-ocid="posts.loading_state">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-accent" />
        </div>
      ) : posts.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-sm"
          data-ocid="posts.empty_state"
        >
          No posts yet. Create your first post.
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="portal-card p-4 flex items-center gap-4"
              data-ocid={`posts.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground line-clamp-1">
                  {post.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="portal-badge text-xs">{post.category}</span>
                  {!post.isPublished && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingPost(post);
                    setShowCreateForm(false);
                  }}
                  data-ocid={`posts.edit_button.${i + 1}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      data-ocid={`posts.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="posts.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Post</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &ldquo;{post.title}
                        &rdquo;? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="posts.cancel_button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(post.id)}
                        className="bg-destructive text-destructive-foreground"
                        data-ocid="posts.confirm_button"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BreakingNewsManager() {
  const { data: news = [], isLoading } = useBreakingNews();
  const addNews = useAddBreakingNews();
  const deleteNews = useDeleteBreakingNews();
  const [newText, setNewText] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    addNews.mutate(newText.trim(), {
      onSuccess: () => {
        toast.success("Breaking news added");
        setNewText("");
      },
      onError: () => toast.error("Failed to add breaking news"),
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-primary mb-4">
        Breaking News Management
      </h2>

      <div className="portal-card p-4 mb-5">
        <form onSubmit={handleAdd} className="flex gap-2">
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter breaking news text..."
            className="flex-1"
            data-ocid="breaking_news.input"
          />
          <Button
            type="submit"
            disabled={addNews.isPending || !newText.trim()}
            className="bg-accent hover:bg-orange-dark text-white"
            data-ocid="breaking_news.submit_button"
          >
            {addNews.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add
          </Button>
        </form>
      </div>

      {isLoading ? (
        <div
          className="text-center py-8"
          data-ocid="breaking_news.loading_state"
        >
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-accent" />
        </div>
      ) : news.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-sm"
          data-ocid="breaking_news.empty_state"
        >
          No breaking news items.
        </div>
      ) : (
        <div className="space-y-2">
          {news.map((item, i) => (
            <div
              key={item.id}
              className="portal-card p-3 flex items-center gap-3"
              data-ocid={`breaking_news.item.${i + 1}`}
            >
              <Zap className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="flex-1 text-sm">{item.text}</span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    data-ocid={`breaking_news.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="breaking_news.dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Breaking News</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this breaking news item?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="breaking_news.cancel_button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        deleteNews.mutate(item.id, {
                          onSuccess: () => toast.success("Deleted"),
                          onError: () => toast.error("Failed"),
                        })
                      }
                      className="bg-destructive text-destructive-foreground"
                      data-ocid="breaking_news.confirm_button"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImportantLinksManager() {
  const { data: links = [], isLoading } = useImportantLinks();
  const createLink = useCreateImportantLink();
  const updateLink = useUpdateImportantLink();
  const deleteLink = useDeleteImportantLink();
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<ImportantLink | null>(null);
  const [form, setForm] = useState({ title: "", url: "", category: "" });

  const resetForm = () => {
    setForm({ title: "", url: "", category: "" });
    setShowForm(false);
    setEditingLink(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }
    const linkData: ImportantLink = {
      id: editingLink?.id || crypto.randomUUID(),
      title: form.title.trim(),
      url: form.url.trim(),
      category: form.category.trim() || "General",
    };
    if (editingLink) {
      updateLink.mutate(linkData, {
        onSuccess: () => {
          toast.success("Link updated");
          resetForm();
        },
        onError: () => toast.error("Failed to update link"),
      });
    } else {
      createLink.mutate(linkData, {
        onSuccess: () => {
          toast.success("Link added");
          resetForm();
        },
        onError: () => toast.error("Failed to add link"),
      });
    }
  };

  const startEdit = (link: ImportantLink) => {
    setEditingLink(link);
    setForm({ title: link.title, url: link.url, category: link.category });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-primary">
          Important Links Management
        </h2>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-accent hover:bg-orange-dark text-white"
            data-ocid="important_links.open_modal_button"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Link
          </Button>
        )}
      </div>

      {showForm && (
        <div className="portal-card p-4 mb-5" data-ocid="important_links.panel">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Link title"
                  required
                  data-ocid="important_links.input"
                />
              </div>
              <div>
                <Label>URL *</Label>
                <Input
                  value={form.url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, url: e.target.value }))
                  }
                  placeholder="https://..."
                  required
                  data-ocid="important_links.input"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  placeholder="Government, Jobs..."
                  data-ocid="important_links.input"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={createLink.isPending || updateLink.isPending}
                className="bg-accent hover:bg-orange-dark text-white"
                data-ocid="important_links.submit_button"
              >
                {editingLink ? "Update Link" : "Add Link"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                data-ocid="important_links.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div
          className="text-center py-8"
          data-ocid="important_links.loading_state"
        >
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-accent" />
        </div>
      ) : links.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-sm"
          data-ocid="important_links.empty_state"
        >
          No links yet.
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((link, i) => (
            <div
              key={link.id}
              className="portal-card p-3 flex items-center gap-3"
              data-ocid={`important_links.item.${i + 1}`}
            >
              <LinkIcon className="w-4 h-4 text-accent flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{link.title}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {link.url}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(link)}
                  data-ocid={`important_links.edit_button.${i + 1}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      data-ocid={`important_links.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="important_links.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Link</AlertDialogTitle>
                      <AlertDialogDescription>
                        Delete &ldquo;{link.title}&rdquo;?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="important_links.cancel_button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteLink.mutate(link.id, {
                            onSuccess: () => toast.success("Link deleted"),
                            onError: () => toast.error("Failed"),
                          })
                        }
                        className="bg-destructive text-destructive-foreground"
                        data-ocid="important_links.confirm_button"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChangePasswordManager({
  changePassword,
}: {
  changePassword: (
    current: string,
    next: string,
  ) => { success: boolean; error?: string };
}) {
  const [form, setForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (form.next !== form.confirm) {
      setStatus({
        type: "error",
        message: "New password aur confirm password match nahi kar rahe",
      });
      return;
    }
    if (form.next.length < 6) {
      setStatus({
        type: "error",
        message: "Naya password kam se kam 6 characters ka hona chahiye",
      });
      return;
    }

    setIsPending(true);
    const result = changePassword(form.current, form.next);
    setIsPending(false);

    if (result.success) {
      setStatus({
        type: "success",
        message: "Password successfully change ho gaya!",
      });
      setForm({ current: "", next: "", confirm: "" });
    } else {
      setStatus({
        type: "error",
        message: result.error || "Password change nahi hua",
      });
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-primary mb-4">Change Password</h2>
      <div className="max-w-md">
        <div className="portal-card p-5">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="change_password.form"
          >
            <div>
              <Label htmlFor="cp-current">Current Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="cp-current"
                  type="password"
                  value={form.current}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, current: e.target.value }));
                    setStatus(null);
                  }}
                  placeholder="••••••••"
                  className="pl-9"
                  required
                  autoComplete="current-password"
                  data-ocid="change_password.current_input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cp-new">Naya Password</Label>
              <div className="relative mt-1">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="cp-new"
                  type="password"
                  value={form.next}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, next: e.target.value }));
                    setStatus(null);
                  }}
                  placeholder="Kam se kam 6 characters"
                  className="pl-9"
                  required
                  autoComplete="new-password"
                  data-ocid="change_password.new_input"
                />
              </div>
              {form.next.length > 0 && form.next.length < 6 && (
                <p className="text-xs text-destructive mt-1">
                  Password kam se kam 6 characters ka hona chahiye
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="cp-confirm">Confirm Naya Password</Label>
              <div className="relative mt-1">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="cp-confirm"
                  type="password"
                  value={form.confirm}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, confirm: e.target.value }));
                    setStatus(null);
                  }}
                  placeholder="Password dobara likhein"
                  className="pl-9"
                  required
                  autoComplete="new-password"
                  data-ocid="change_password.confirm_input"
                />
              </div>
              {form.confirm.length > 0 && form.next !== form.confirm && (
                <p className="text-xs text-destructive mt-1">
                  Passwords match nahi kar rahe
                </p>
              )}
            </div>

            {status && (
              <div
                className={`flex items-start gap-2 text-sm px-3 py-2.5 rounded-sm border ${
                  status.type === "success"
                    ? "text-green-700 bg-green-50 border-green-200"
                    : "text-destructive bg-destructive/10 border-destructive/20"
                }`}
                role="alert"
                data-ocid={
                  status.type === "success"
                    ? "change_password.success_state"
                    : "change_password.error_state"
                }
              >
                {status.type === "success" && (
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                {status.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={
                isPending || !form.current || !form.next || !form.confirm
              }
              className="bg-accent hover:bg-orange-dark text-white w-full justify-center"
              data-ocid="change_password.submit_button"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Password Update Karein
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function AdminPage() {
  const { isLoggedIn, login, logout, changePassword } = useAdminAuth();
  const [section, setSection] = useState<AdminSection>("posts");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
    const success = login(email, password);
    if (!success) {
      setLoginError("Invalid email or password");
    }
    setIsSubmitting(false);
  };

  if (!isLoggedIn) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div
          className="max-w-md mx-auto portal-card p-8"
          data-ocid="admin.modal"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-1">
              Admin Login
            </h1>
            <p className="text-muted-foreground text-sm">
              Rojgar Khabar Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="admin-email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLoginError("");
                  }}
                  placeholder="admin@rojgarkhabar.in"
                  className="pl-9"
                  required
                  autoComplete="email"
                  data-ocid="admin.input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError("");
                  }}
                  placeholder="••••••••"
                  className="pl-9"
                  required
                  autoComplete="current-password"
                  data-ocid="admin.input"
                />
              </div>
            </div>

            {loginError && (
              <div
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-sm px-3 py-2"
                role="alert"
                data-ocid="admin.error_state"
              >
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="portal-btn-primary w-full justify-center text-base py-3 h-auto"
              data-ocid="admin.submit_button"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              Login to Dashboard
            </Button>
          </form>
        </div>
      </main>
    );
  }

  const navItems = [
    { id: "posts" as AdminSection, label: "Posts", icon: FileText },
    { id: "breaking-news" as AdminSection, label: "Breaking News", icon: Zap },
    {
      id: "important-links" as AdminSection,
      label: "Important Links",
      icon: LinkIcon,
    },
    {
      id: "change-password" as AdminSection,
      label: "Change Password",
      icon: KeyRound,
    },
  ];

  return (
    <main>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Admin Sidebar */}
          <div className="md:w-56 flex-shrink-0">
            <div className="portal-card overflow-hidden">
              <div className="bg-primary text-white px-4 py-3 font-bold text-sm">
                Admin Dashboard
              </div>
              <nav className="p-2">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setSection(id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                      section === id
                        ? "bg-accent text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                    data-ocid={`admin.${id.replace("-", "_")}.tab`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
                <div className="border-t border-border mt-2 pt-2">
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-medium text-destructive hover:bg-muted transition-colors"
                    data-ocid="admin.secondary_button"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Admin Content */}
          <div className="flex-1 min-w-0 portal-card p-5">
            {section === "posts" && <PostsManager />}
            {section === "breaking-news" && <BreakingNewsManager />}
            {section === "important-links" && <ImportantLinksManager />}
            {section === "change-password" && (
              <ChangePasswordManager changePassword={changePassword} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
