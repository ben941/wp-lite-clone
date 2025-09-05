import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, HelpCircle, Wand2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  status: string;
  featured: boolean;
  featured_image: string | null;
  featured_image_alt: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

interface PostEditorProps {
  isOpen: boolean;
  post?: Post | null;
  onClose: () => void;
  onSave?: () => void;
}

export const PostEditor = ({ isOpen, post, onClose, onSave }: PostEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("General");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);
  const [slug, setSlug] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setExcerpt(post.excerpt || "");
      setCategory(post.category || "General");
      setStatus(post.status || "draft");
      setFeatured(post.featured || false);
      setSlug(post.slug || "");
      setFeaturedImage(post.featured_image || "");
      setFeaturedImageAlt(post.featured_image_alt || "");
    } else {
      setTitle("");
      setContent("");
      setExcerpt("");
      setCategory("General");
      setStatus("draft");
      setFeatured(false);
      setSlug("");
      setFeaturedImage("");
      setFeaturedImageAlt("");
    }
  }, [post, isOpen]);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      setFeaturedImage(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      // Error already handled in uploadImage
    }
  };

  const removeImage = () => {
    setFeaturedImage("");
    setFeaturedImageAlt("");
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const generateContent = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title first');
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: { title: title.trim() }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setContent(data.content);
      toast.success(`Generated ${data.wordCount} words of content!`);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const generateImage = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title first');
      return;
    }

    setGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { title: title.trim() }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setFeaturedImage(data.imageUrl);
      setFeaturedImageAlt(data.altText);
      toast.success('AI image generated successfully!');
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your post');
      return;
    }

    setLoading(true);

    try {
      const postData = {
        title: title.trim(),
        content: content.trim() || null,
        excerpt: excerpt.trim() || null,
        category,
        slug: slug || generateSlug(title),
        status,
        featured,
        featured_image: featuredImage || null,
        featured_image_alt: featuredImageAlt || null,
      };

      let result;
      if (post?.id) {
        // Update existing post
        result = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id);
      } else {
        // Create new post - need to get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error('You must be logged in to create posts');
          return;
        }

        result = await supabase
          .from('posts')
          .insert([{ ...postData, author_id: user.id }]);
      }

      if (result.error) {
        throw result.error;
      }

      toast.success(post?.id ? 'Post updated successfully' : 'Post created successfully');
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {post?.id ? 'Edit Post' : 'Create New Post'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <div className="relative">
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!post?.id) {
                      setSlug(generateSlug(e.target.value));
                    }
                  }}
                  placeholder="Enter post title"
                  className={title.trim() ? "pr-12" : ""}
                />
                {title.trim() && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-primary/10"
                          onClick={generateContent}
                          disabled={generating || loading}
                        >
                          <Wand2 className={`h-4 w-4 text-primary ${generating ? 'animate-spin' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate blog content with AI</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-slug"
              />
            </div>
          </div>

          {/* Hero Image Upload */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Hero Image</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Recommended size: 1200x630px (16:9 aspect ratio)</p>
                    <p>Max file size: 5MB</p>
                    <p>Formats: JPG, PNG, WebP</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {!featuredImage ? (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 relative">
                {title.trim() && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-primary/10"
                          onClick={generateImage}
                          disabled={generatingImage || generating || loading}
                        >
                          <Wand2 className={`h-4 w-4 text-primary ${generatingImage ? 'animate-spin' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate blog image with AI</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-sm font-medium text-primary hover:text-primary/80">
                        Upload hero image
                      </span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading || generatingImage}
                      />
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Or drag and drop an image here
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Hero image preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                    disabled={generatingImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {title.trim() && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-12"
                            onClick={generateImage}
                            disabled={generatingImage || generating || loading}
                          >
                            <Wand2 className={`h-4 w-4 ${generatingImage ? 'animate-spin' : ''}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate new AI image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={featuredImageAlt}
                    onChange={(e) => setFeaturedImageAlt(e.target.value)}
                    placeholder="Describe the image for accessibility"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Tax Planning">Tax Planning</SelectItem>
                  <SelectItem value="Business Advisory">Business Advisory</SelectItem>
                  <SelectItem value="Financial Planning">Financial Planning</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Industry News">Industry News</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Featured</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
                <span className="text-sm text-muted-foreground">
                  {featured ? 'Featured' : 'Not featured'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading || generating || generatingImage}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading || uploading || generating || generatingImage}>
              {loading ? 'Saving...' : uploading ? 'Uploading...' : generating ? 'Generating Content...' : generatingImage ? 'Generating Image...' : 'Save Post'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};