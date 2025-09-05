import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

const Admin = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Admin Dashboard - WP Lite";
    
    if (!authLoading && !user) {
      window.location.href = "/auth";
      return;
    }

    if (user) {
      fetchUserProfile();
      fetchPosts();
    }
  }, [user, authLoading]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to load posts",
          variant: "destructive",
        });
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Posts fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    window.location.href = "/";
  };

  const createSamplePost = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title: "Welcome to WP Lite CMS",
            slug: "welcome-to-wp-lite-cms",
            excerpt: "This is your first blog post created through the WP Lite admin dashboard. You can edit, publish, and manage all your content from here.",
            content: `# Welcome to WP Lite CMS

This is your first blog post! WP Lite makes it easy to create and manage professional content for your accounting firm.

## Key Features

- **Easy Content Management**: Create and edit posts with our intuitive interface
- **SEO Optimized**: All posts are automatically optimized for search engines
- **Professional Design**: Beautiful, responsive layouts that work on all devices
- **Performance First**: Lightning-fast loading times for better user experience

Start creating amazing content that helps your accounting firm stand out online!`,
            category: "Getting Started",
            status: "published",
            featured: true,
            author_id: user.id,
            published_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create sample post",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Sample post created successfully",
        });
        fetchPosts();
      }
    } catch (error) {
      console.error('Error creating sample post:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
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
              <a href="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                WP Lite
              </a>
              <Badge variant="outline">Admin</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {profile?.full_name || profile?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your content and website settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(post => post.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Drafts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(post => post.status === 'draft').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts Management */}
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Create and manage your blog posts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No posts yet. Create your first post to get started!
                  </p>
                  <Button variant="primary" onClick={createSamplePost}>
                    Create Sample Post
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                              {post.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `/admin/posts`}
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/admin/posts'}
                  >
                    Manage All Posts
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm text-muted-foreground">{profile?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Role:</span>
                  <Badge variant="outline" className="text-xs">
                    {profile?.role}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Member since:</span>
                  <span className="text-sm text-muted-foreground">
                    {profile?.created_at && new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;