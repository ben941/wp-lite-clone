import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How can I get a copy of this website template?",
      answer: "This is a fully functional accounting website template built with modern web technologies. You can customize it for your own accounting practice by modifying the content, colors, and branding to match your business needs. The template includes a complete CMS system for managing blog posts and content."
    },
    {
      question: "What technology stack is used to build this site?",
      answer: "This website is built using React 18, TypeScript, Tailwind CSS, and Vite for the frontend. The backend uses Supabase for authentication, database management, and real-time features. The design system includes shadcn/ui components for consistent, accessible UI elements."
    },
    {
      question: "What CMS features are included?",
      answer: "The template includes a complete content management system with: blog post creation and editing, user authentication and role management, SEO optimization tools, responsive design for all devices, admin dashboard for content management, and automatic sitemap generation."
    },
    {
      question: "Is this template mobile-responsive?",
      answer: "Yes, the template is fully responsive and optimized for all devices including desktop, tablet, and mobile. It uses Tailwind CSS's responsive design utilities to ensure your content looks great on any screen size."
    },
    {
      question: "Can I customize the design and branding?",
      answer: "Absolutely! The template uses a comprehensive design system with CSS custom properties, making it easy to customize colors, fonts, spacing, and other design elements. You can modify the branding, logo, content, and styling to match your accounting firm's identity."
    },
    {
      question: "What about SEO optimization?",
      answer: "The template includes comprehensive SEO features: automatic meta tags and Open Graph data, structured data markup, optimized page loading speeds, clean URL structure, automatic sitemap generation, and proper semantic HTML markup for better search engine visibility."
    },
    {
      question: "Is there user authentication and admin access?",
      answer: "Yes, the template includes a complete authentication system powered by Supabase. It features secure user login/registration, protected admin routes, role-based access control, and an admin dashboard for managing blog posts and content."
    },
    {
      question: "How do I manage blog posts and content?",
      answer: "The template includes an intuitive admin interface where you can create, edit, and delete blog posts. The content management system supports rich text editing, image uploads, SEO meta tags, and automatic publishing workflows."
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Template Information
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about this accounting website template and its CMS features.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;