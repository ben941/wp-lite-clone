export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export const seoConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'WP Lite - Modern CMS for Accounting Professionals | Performance-First WordPress Alternative',
    description: 'WP Lite is a modern, lightweight CMS designed for accounting professionals. Get WordPress simplicity with superior performance, SEO optimization, and professional design.',
    keywords: 'CMS, accounting, WordPress alternative, performance, SEO, content management, professional websites',
    ogTitle: 'WP Lite - Modern CMS for Accounting Professionals',
    ogDescription: 'Build professional accounting websites with WP Lite - the performance-first CMS with built-in SEO optimization and intuitive content management.',
    twitterTitle: 'WP Lite - Modern CMS for Accounting Professionals',
    twitterDescription: 'Build professional accounting websites with WP Lite - the performance-first CMS with built-in SEO optimization and intuitive content management.'
  },
  '/blog': {
    title: 'Blog - WP Lite CMS | Accounting Industry Insights & Tips',
    description: 'Expert insights, tips, and best practices for accounting professionals using modern CMS solutions. Stay updated with the latest industry trends.',
    keywords: 'accounting blog, CMS tips, professional insights, industry trends, business advice',
    ogTitle: 'WP Lite Blog - Accounting Industry Insights',
    ogDescription: 'Expert insights and tips for accounting professionals using modern CMS solutions.',
    twitterTitle: 'WP Lite Blog - Accounting Industry Insights',
    twitterDescription: 'Expert insights and tips for accounting professionals using modern CMS solutions.'
  },
  '/auth': {
    title: 'Login - WP Lite CMS Dashboard Access',
    description: 'Access your WP Lite CMS dashboard to manage your accounting website content, posts, and settings.',
    keywords: 'login, dashboard access, CMS admin, content management',
    ogTitle: 'WP Lite CMS - Dashboard Login',
    ogDescription: 'Access your WP Lite CMS dashboard to manage your website content.',
    twitterTitle: 'WP Lite CMS - Dashboard Login',
    twitterDescription: 'Access your WP Lite CMS dashboard to manage your website content.'
  },
  '/admin': {
    title: 'Dashboard - WP Lite CMS Admin Panel',
    description: 'Manage your accounting website content with WP Lite\'s intuitive admin dashboard. Create, edit, and publish posts with ease.',
    keywords: 'admin dashboard, content management, CMS admin, website management',
    ogTitle: 'WP Lite CMS - Admin Dashboard',
    ogDescription: 'Manage your accounting website content with WP Lite\'s intuitive admin dashboard.',
    twitterTitle: 'WP Lite CMS - Admin Dashboard',
    twitterDescription: 'Manage your accounting website content with WP Lite\'s intuitive admin dashboard.'
  },
  '/admin/posts': {
    title: 'Manage Posts - WP Lite CMS Admin',
    description: 'Create, edit, and manage your blog posts with WP Lite\'s powerful content management system.',
    keywords: 'manage posts, blog management, content creation, CMS admin',
    ogTitle: 'WP Lite CMS - Post Management',
    ogDescription: 'Create, edit, and manage your blog posts with WP Lite\'s powerful content management system.',
    twitterTitle: 'WP Lite CMS - Post Management',
    twitterDescription: 'Create, edit, and manage your blog posts with WP Lite\'s powerful content management system.'
  }
};

export const getDefaultSEO = (): SEOConfig => seoConfigs['/'];

export const getBlogPostSEO = (title: string, excerpt?: string, slug?: string): SEOConfig => {
  const description = excerpt || `Read "${title}" on WP Lite Blog - expert insights for accounting professionals using modern CMS solutions.`;
  return {
    title: `${title} - WP Lite Blog`,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords: `${title.toLowerCase()}, accounting, business, professional advice, CMS, blog`,
    ogTitle: `${title} - WP Lite Blog`,
    ogDescription: description.length > 160 ? description.substring(0, 157) + '...' : description,
    twitterTitle: `${title} - WP Lite Blog`,
    twitterDescription: description.length > 160 ? description.substring(0, 157) + '...' : description
  };
};