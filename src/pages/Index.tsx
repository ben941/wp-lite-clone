import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

const Index = () => {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "WP Lite - Modern CMS for Accounting Professionals | Performance-First WordPress Alternative";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'WP Lite is a modern, lightweight CMS designed for accounting professionals. Get WordPress simplicity with superior performance, SEO optimization, and professional design.');
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'WP Lite - Modern CMS for Accounting Professionals');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Build professional accounting websites with WP Lite - the performance-first CMS with built-in SEO optimization and intuitive content management.');
    }
  }, []);

  return (
    <Layout>
      <Hero />
      <Features />
      <About />
      <BlogPreview />
      <FAQ />
      <CTA />
    </Layout>
  );
};

export default Index;
