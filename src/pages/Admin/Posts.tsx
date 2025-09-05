import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PostsList } from "@/components/admin/PostsList";

const AdminPosts = () => {
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    document.title = "Manage Posts - WP Lite Admin";
    
    if (!authLoading && !user) {
      window.location.href = "/auth";
      return;
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/admin" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                WP Lite
              </a>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">Posts</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manage Posts
          </h1>
          <p className="text-muted-foreground">
            Create, edit, and manage all your blog posts
          </p>
        </div>

        <PostsList />
      </main>
    </div>
  );
};

export default AdminPosts;