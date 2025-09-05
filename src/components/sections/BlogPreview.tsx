import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

const BlogPreview = () => {
  const posts = [
    {
      title: "Essential SEO Strategies for Accounting Firms in 2024",
      excerpt: "Learn the latest SEO techniques that help accounting firms attract more clients through organic search results and local optimization.",
      category: "SEO",
      readTime: "5 min read",
      date: "Mar 15, 2024",
      featured: true
    },
    {
      title: "Building Trust Through Professional Website Design",
      excerpt: "Discover how modern website design principles can help establish credibility and trust with potential accounting clients.",
      category: "Design",
      readTime: "7 min read",
      date: "Mar 12, 2024",
      featured: false
    },
    {
      title: "Content Marketing for CPAs: A Complete Guide",
      excerpt: "Master content marketing strategies that position your accounting firm as a thought leader and attract high-value clients.",
      category: "Marketing",
      readTime: "10 min read",
      date: "Mar 10, 2024",
      featured: false
    }
  ];

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Latest Insights
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expert advice for
            <span className="bg-gradient-primary bg-clip-text text-transparent"> accounting professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay ahead with the latest trends in accounting, tax planning, and business financial strategies.
          </p>
          <a href="/blog">
            <Button variant="outline" className="group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
                  >
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {post.date}
                  </span>
                  <div className="flex items-center text-sm text-primary font-medium group-hover:text-primary/80 transition-colors">
                    Read Article
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;