import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Migration "migration";

(with migration = Migration.run)
actor {
  module Post {
    public func compare(post1 : Post, post2 : Post) : Order.Order {
      Int.compare(post2.publishedAt, post1.publishedAt);
    };

    public func compareByCategoryAndPublishedAt(p1 : Post, p2 : Post) : Order.Order {
      switch (Text.compare(p1.category, p2.category)) {
        case (#equal) { Int.compare(p2.publishedAt, p1.publishedAt) };
        case (order) { order };
      };
    };
  };

  type Post = {
    id : Text;
    title : Text;
    summary : Text;
    content : Text;
    category : Text;
    featuredImageUrl : Text;
    applyLink : Text;
    tags : [Text];
    publishedAt : Int;
    isPublished : Bool;
  };

  module BreakingNewsItem {
    public func compare(b1 : BreakingNewsItem, b2 : BreakingNewsItem) : Order.Order {
      Int.compare(b2.createdAt, b1.createdAt);
    };
  };

  type BreakingNewsItem = {
    id : Text;
    text : Text;
    createdAt : Int;
  };

  module ImportantLink {
    public func compareByCategory(imp1 : ImportantLink, imp2 : ImportantLink) : Order.Order {
      Text.compare(imp1.category, imp2.category);
    };
  };

  type ImportantLink = {
    id : Text;
    title : Text;
    url : Text;
    category : Text;
  };

  type PostInput = {
    id : Text;
    title : Text;
    summary : Text;
    content : Text;
    category : Text;
    featuredImageUrl : Text;
    applyLink : Text;
    tags : [Text];
    publishedAt : Int;
    isPublished : Bool;
  };

  /// Core Data Storage
  let posts = Map.empty<Text, Post>();
  let breakingNews = Map.empty<Text, BreakingNewsItem>();
  let importantLinks = Map.empty<Text, ImportantLink>();

  /// Posts Management
  public query func getAllPublishedPosts() : async [Post] {
    posts.values().toArray().filter(func(p) { p.isPublished }).sort();
  };

  public query func getPostsByCategory(category : Text) : async [Post] {
    posts.values().toArray().filter(func(p) { p.category == category and p.isPublished }).sort(Post.compareByCategoryAndPublishedAt);
  };

  public query func searchPostsByTitle(searchTerm : Text) : async [Post] {
    let lowerSearch = searchTerm.toLower();
    posts.values().toArray().filter(
      func(p) {
        p.title.toLower().contains(#text lowerSearch) and p.isPublished
      }
    ).sort();
  };

  public shared func createPost(post : PostInput) : async () {
    let newPost : Post = {
      id = post.id;
      title = post.title;
      summary = post.summary;
      content = post.content;
      category = post.category;
      featuredImageUrl = post.featuredImageUrl;
      applyLink = post.applyLink;
      tags = post.tags;
      publishedAt = Time.now();
      isPublished = post.isPublished;
    };
    posts.add(post.id, newPost);
  };

  public shared func updatePost(post : PostInput) : async () {
    let updatedPost : Post = {
      id = post.id;
      title = post.title;
      summary = post.summary;
      content = post.content;
      category = post.category;
      featuredImageUrl = post.featuredImageUrl;
      applyLink = post.applyLink;
      tags = post.tags;
      publishedAt = Time.now();
      isPublished = post.isPublished;
    };
    posts.add(post.id, updatedPost);
  };

  public shared func deletePost(postId : Text) : async () {
    posts.remove(postId);
  };

  /// Breaking News Management
  public query func getLatestBreakingNews() : async [BreakingNewsItem] {
    let sortedBreakingNews = breakingNews.values().toArray().sort();
    let takeAmount = if (sortedBreakingNews.size() < 10) {
      sortedBreakingNews.size();
    } else {
      10;
    };
    Array.tabulate<BreakingNewsItem>(
      takeAmount,
      func(i) {
        sortedBreakingNews[i];
      },
    );
  };

  public shared func addBreakingNews(text : Text) : async () {
    let id = Time.now().toText();
    let newsItem : BreakingNewsItem = {
      id;
      text;
      createdAt = Time.now();
    };
    breakingNews.add(newsItem.id, newsItem);
  };

  public shared func deleteBreakingNews(newsId : Text) : async () {
    breakingNews.remove(newsId);
  };

  /// Important Links Management
  public query func getAllImportantLinks() : async [ImportantLink] {
    importantLinks.values().toArray().sort(ImportantLink.compareByCategory);
  };

  public shared func createImportantLink(link : ImportantLink) : async () {
    importantLinks.add(link.id, link);
  };

  public shared func updateImportantLink(link : ImportantLink) : async () {
    importantLinks.add(link.id, link);
  };

  public shared func deleteImportantLink(linkId : Text) : async () {
    importantLinks.remove(linkId);
  };
};
