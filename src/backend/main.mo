import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Store "blob-storage/Storage";
import AccessControl "authorization/access-control";

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

  public type ImageUploadResult = {
    url : Text;
    size : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  /// Core Components
  let posts = Map.empty<Text, Post>();
  let breakingNews = Map.empty<Text, BreakingNewsItem>();
  let importantLinks = Map.empty<Text, ImportantLink>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  /// Blob & Image Storage Integration
  include MixinStorage();

  /// Role-based Access Control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  /// User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  /// Posts Management
  public query ({ caller }) func getAllPublishedPosts() : async [Post] {
    posts.values().toArray().filter(func(p) { p.isPublished }).sort();
  };

  public query ({ caller }) func getPostsByCategory(category : Text) : async [Post] {
    posts.values().toArray().filter(func(p) { p.category == category and p.isPublished }).sort(Post.compareByCategoryAndPublishedAt);
  };

  public query ({ caller }) func searchPostsByTitle(searchTerm : Text) : async [Post] {
    let lowerSearch = searchTerm.toLower();

    posts.values().toArray().filter(
      func(p) {
        p.title.toLower().contains(#text lowerSearch) and p.isPublished
      }
    ).sort();
  };

  public shared ({ caller }) func createPost(post : PostInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create posts");
    };
    let newPost : Post = {
      post with
      publishedAt = Time.now();
    };
    posts.add(post.id, newPost);
  };

  public shared ({ caller }) func updatePost(post : PostInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update posts");
    };
    let updatedPost : Post = {
      post with
      publishedAt = Time.now();
    };
    posts.add(post.id, updatedPost);
  };

  public shared ({ caller }) func deletePost(postId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    posts.remove(postId);
  };

  /// Breaking News Management
  public query ({ caller }) func getLatestBreakingNews() : async [BreakingNewsItem] {
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

  public shared ({ caller }) func addBreakingNews(text : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add breaking news");
    };
    let newsItem : BreakingNewsItem = {
      id = Time.now().toText();
      text;
      createdAt = Time.now();
    };
    breakingNews.add(newsItem.id, newsItem);
  };

  public shared ({ caller }) func deleteBreakingNews(newsId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete breaking news");
    };
    breakingNews.remove(newsId);
  };

  /// Important Links Management
  public query ({ caller }) func getAllImportantLinks() : async [ImportantLink] {
    importantLinks.values().toArray().sort(ImportantLink.compareByCategory);
  };

  public shared ({ caller }) func createImportantLink(link : ImportantLink) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create important links");
    };
    importantLinks.add(link.id, link);
  };

  public shared ({ caller }) func updateImportantLink(link : ImportantLink) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update important links");
    };
    importantLinks.add(link.id, link);
  };

  public shared ({ caller }) func deleteImportantLink(linkId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete important links");
    };
    importantLinks.remove(linkId);
  };
};
