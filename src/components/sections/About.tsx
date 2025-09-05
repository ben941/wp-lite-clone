import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, Shield } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Users,
      number: "200+",
      label: "Happy Clients"
    },
    {
      icon: Award,
      number: "15+",
      label: "Years Experience"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support Available"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Confidential"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <Badge variant="outline" className="mb-4">
              About WP Lite Accounting
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your trusted financial
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                partner since 2009
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                At WP Lite Accounting, we understand that managing your business finances can be overwhelming. 
                That's why we've dedicated over 15 years to providing comprehensive accounting services that 
                give you peace of mind and help your business thrive.
              </p>
              <p className="text-lg leading-relaxed">
                Our team of certified public accountants combines traditional expertise with modern technology 
                to deliver accurate, timely, and insightful financial services. We're not just your accountants 
                – we're your strategic partners in business success.
              </p>
              <p className="text-lg leading-relaxed">
                From bookkeeping and tax preparation to financial planning and business consulting, we handle 
                the numbers so you can focus on what you do best – running your business.
              </p>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-background/50 border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;