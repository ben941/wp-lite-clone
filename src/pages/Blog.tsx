import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "Blog - WP Lite | SEO and Website Tips for Accounting Professionals";
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ').length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Get unique categories from posts
  const categories = ["All", ...Array.from(new Set(posts.map(post => post.category).filter(Boolean)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Expert Insights for
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Accounting Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead with the latest trends in website design, SEO, and digital marketing 
              specifically tailored for accounting firms and CPAs.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "primary" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          {(() => {
            const featuredPosts = filteredPosts.filter(post => post.featured);
            if (featuredPosts.length === 0) return null;
            
            return featuredPosts.map((post) => (
              <Card key={post.slug} className="mb-12 group hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(post.published_at || post.created_at)} • {estimateReadTime(post.content || '')}
                      </span>
                      <Button 
                        variant="primary"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        Read Article
                      </Button>
                    </div>
                  </div>
                  {post.featured_image ? (
                    <div className="relative">
                      <img
                        src={post.featured_image}
                        alt={post.featured_image_alt || post.title}
                        className="w-full h-64 md:h-80 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-secondary rounded-lg flex items-center justify-center h-64 md:h-80">
                      <div className="text-muted-foreground text-center p-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4" />
                        <p>Featured Article Image</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ));
          })()}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <Card 
                key={post.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                {/* Hero Image */}
                {post.featured_image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.featured_image_alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {estimateReadTime(post.content || '')}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span 
                      className="text-sm text-primary font-medium group-hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog/${post.slug}`);
                      }}
                    >
                      Read Article →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No posts message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found for the selected category.</p>
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;