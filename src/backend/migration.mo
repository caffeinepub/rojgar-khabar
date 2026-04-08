import Map "mo:core/Map";

module {
  // Old types defined inline (copied from .old stable snapshot)
  type UserRole = { #admin; #guest; #user };
  type AccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };
  type UserProfile = { name : Text };

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

  type BreakingNewsItem = {
    id : Text;
    text : Text;
    createdAt : Int;
  };

  type ImportantLink = {
    id : Text;
    title : Text;
    url : Text;
    category : Text;
  };

  type OldActor = {
    accessControlState : AccessControlState;
    breakingNews : Map.Map<Text, BreakingNewsItem>;
    importantLinks : Map.Map<Text, ImportantLink>;
    posts : Map.Map<Text, Post>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  type NewActor = {
    breakingNews : Map.Map<Text, BreakingNewsItem>;
    importantLinks : Map.Map<Text, ImportantLink>;
    posts : Map.Map<Text, Post>;
  };

  public func run(old : OldActor) : NewActor {
    {
      breakingNews = old.breakingNews;
      importantLinks = old.importantLinks;
      posts = old.posts;
      // accessControlState and userProfiles are intentionally dropped
    };
  };
};
