import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                WP Lite
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="/#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="/#pricing" className="text-foreground hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </a>
              <a href="/#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <a href="/auth">
              <Button variant="ghost" size="sm">
                Admin Login
              </Button>
            </a>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;