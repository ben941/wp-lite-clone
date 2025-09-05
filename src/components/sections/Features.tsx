import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const features = [
    {
      category: "Bookkeeping",
      title: "Complete Bookkeeping Services",
      description: "Accurate record-keeping and financial tracking to keep your business organized and compliant.",
      benefits: ["Monthly Financial Statements", "Accounts Payable & Receivable", "Bank Reconciliation"]
    },
    {
      category: "Tax Services",
      title: "Tax Preparation & Planning",
      description: "Expert tax preparation and strategic planning to minimize your tax burden and maximize savings.",
      benefits: ["Business Tax Returns", "Personal Tax Filing", "Quarterly Estimates"]
    },
    {
      category: "Payroll",
      title: "Payroll Management",
      description: "Complete payroll processing including tax withholdings, direct deposits, and compliance reporting.",
      benefits: ["Direct Deposit Setup", "Tax Withholding", "Compliance Reporting"]
    },
    {
      category: "Consulting",
      title: "Financial Consulting",
      description: "Strategic financial advice to help you make informed decisions and grow your business.",
      benefits: ["Business Planning", "Cash Flow Analysis", "Growth Strategies"]
    },
    {
      category: "QuickBooks",
      title: "QuickBooks Setup & Training",
      description: "Professional QuickBooks implementation and training to streamline your financial processes.",
      benefits: ["Software Setup", "Data Migration", "Staff Training"]
    },
    {
      category: "Support",
      title: "Year-Round Support",
      description: "Ongoing financial support and advice whenever you need it, not just during tax season.",
      benefits: ["Phone & Email Support", "Financial Reviews", "IRS Representation"]
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive accounting services for
            <span className="bg-gradient-primary bg-clip-text text-transparent"> your business success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From bookkeeping to tax planning, we provide the full range of accounting services your business needs to thrive and grow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;