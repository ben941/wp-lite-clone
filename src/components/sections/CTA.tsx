import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-background/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to streamline your
            <span className="block">business finances?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Let our expert accountants handle your finances while you focus on growing your business. 
            Schedule a free consultation today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Call (555) 123-4567
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-sm text-primary-foreground/80">
            ✓ Free initial consultation • ✓ CPA certified • ✓ 15+ years experience
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;