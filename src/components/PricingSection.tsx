
import React, { useState } from 'react';
import { Check, X, DollarSign, Zap, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PricingTier = {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
  highlighted?: boolean;
  callToAction: string;
  icon: React.ReactNode;
}

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: {
        monthly: 0,
        yearly: 0,
      },
      description: "Perfect for trying out Vision's features.",
      features: [
        { text: "Process up to 50 images per month", included: true },
        { text: "Basic image categorization", included: true },
        { text: "Download processed images", included: true },
        { text: "Email support", included: false },
        { text: "Batch processing", included: false },
        { text: "Custom categories", included: false },
        { text: "API access", included: false },
      ],
      callToAction: "Get Started",
      icon: <DollarSign className="h-5 w-5 text-blue-500" />
    },
    {
      name: "Pro",
      price: {
        monthly: 29,
        yearly: 19,
      },
      description: "For professionals who need more power.",
      features: [
        { text: "Process up to 1,000 images per month", included: true },
        { text: "Advanced image categorization", included: true },
        { text: "Download processed images", included: true },
        { text: "Email support", included: true },
        { text: "Batch processing", included: true },
        { text: "Custom categories", included: true },
        { text: "API access", included: false },
      ],
      highlighted: true,
      callToAction: "Upgrade Now",
      icon: <Zap className="h-5 w-5 text-amber-500" />
    },
    {
      name: "Enterprise",
      price: {
        monthly: 99,
        yearly: 79,
      },
      description: "For teams that need it all.",
      features: [
        { text: "Unlimited image processing", included: true },
        { text: "Advanced image categorization", included: true },
        { text: "Download processed images", included: true },
        { text: "Priority support", included: true },
        { text: "Batch processing", included: true },
        { text: "Custom categories", included: true },
        { text: "API access", included: true },
      ],
      callToAction: "Contact Sales",
      icon: <Star className="h-5 w-5 text-purple-500" />
    }
  ];

  return (
    <section id="pricing-section" className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works best for you and your workflow
        </p>
        
        <div className="flex items-center justify-center mt-8 space-x-4">
          <span className={cn(
            "text-sm transition-colors",
            billingCycle === 'monthly' ? 'text-foreground font-medium' : 'text-muted-foreground'
          )}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform",
                billingCycle === 'yearly' ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span className={cn(
            "text-sm transition-colors",
            billingCycle === 'yearly' ? 'text-foreground font-medium' : 'text-muted-foreground'
          )}>
            Yearly <span className="text-xs text-green-500 font-medium">Save up to 35%</span>
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, index) => (
          <Card 
            key={index}
            className={cn(
              "flex flex-col relative transition-all duration-200 hover:shadow-md",
              tier.highlighted && "border-blue-500/50 shadow-lg"
            )}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                Most Popular
              </div>
            )}
            
            <CardHeader className={cn(
              tier.highlighted && "pb-0"
            )}>
              <div className="flex items-center gap-2 mb-2">
                {tier.icon}
                <CardTitle>{tier.name}</CardTitle>
              </div>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-3xl font-bold">${billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearly}</span>
                <span className="text-muted-foreground mb-1">{tier.price.monthly > 0 ? '/month' : ''}</span>
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/70 shrink-0 mt-0.5" />
                    )}
                    <span className={cn(
                      "text-sm",
                      !feature.included && "text-muted-foreground/70"
                    )}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className={cn(
                  "w-full",
                  tier.highlighted ? "bg-blue-600 hover:bg-blue-700" : ""
                )}
                variant={tier.highlighted ? "default" : "outline"}
              >
                {tier.callToAction}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
