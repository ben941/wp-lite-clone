import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-medium text-primary mb-8">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />
              Trusted by Small Businesses
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Professional Accounting
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Services You Can Trust
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Expert bookkeeping, tax preparation, and financial consulting services to help your business thrive. 
              Focus on what you do best while we handle your finances.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Button variant="primary" size="lg" className="shadow-primary">
                Get Free Consultation
              </Button>
              <Button variant="outline" size="lg">
                View Our Services
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="text-sm text-muted-foreground">
              Serving 200+ local businesses • CPA certified • 15+ years experience
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={heroImage} 
                alt="Modern professional dashboard interface for accounting websites" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent rounded-full opacity-30 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;