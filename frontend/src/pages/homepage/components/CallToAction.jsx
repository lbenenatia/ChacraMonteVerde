import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const contactMethods = [
  {
    icon: "Phone",
    title: "Call Us",
    description: "Speak with our event specialists",
    action: "+1 (555) 123-4567",
    href: "tel:+15551234567"
  },
  {
    icon: "Mail",
    title: "Email Us",
    description: "Get detailed information",
    action: "info@monteverde.com",
    href: "mailto:info@monteverde.com"
  },
  {
    icon: "MapPin",
    title: "Visit Us",
    description: "Schedule a venue tour",
    action: "Book Tour",
    href: "/contact-location"
  }];


  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1558793353-94a216fd0c24"
          alt="Subtle background image of Monte Verde landscape with trees and natural scenery creating elegant texture overlay"
          className="w-full h-full object-cover" />

      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Icon name="TreePine" size={16} className="mr-2" />
            Ready to Begin Your Journey?
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Let's Create Something Beautiful Together
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Your perfect celebration awaits at Monte Verde. From the first consultation to your special day, we're here to make your vision a reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/booking-consultation">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="px-8 py-4">

                Book Free Consultation
              </Button>
            </Link>
            <Link to="/packages-pricing">
              <Button
                variant="outline"
                size="lg"
                iconName="Package"
                iconPosition="left"
                className="px-8 py-4">

                View Packages
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods?.map((method, index) =>
          <div
            key={index}
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-organic-sm hover:shadow-organic-md transition-organic group">

              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-organic">
                <Icon name={method?.icon} size={24} color="var(--color-primary)" />
              </div>
              
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {method?.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {method?.description}
              </p>
              
              {method?.href?.startsWith('/') ?
            <Link to={method?.href}>
                  <Button
                variant="ghost"
                iconName="ArrowRight"
                iconPosition="right"
                className="text-primary hover:text-primary-foreground hover:bg-primary">

                    {method?.action}
                  </Button>
                </Link> :

            <a href={method?.href}>
                  <Button
                variant="ghost"
                iconName="ExternalLink"
                iconPosition="right"
                className="text-primary hover:text-primary-foreground hover:bg-primary">

                    {method?.action}
                  </Button>
                </a>
            }
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border/50">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                  <Icon name="Star" size={16} color="white" className="fill-current" />
                </div>
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center border-2 border-card">
                  <Icon name="Heart" size={16} color="white" />
                </div>
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center border-2 border-card">
                  <Icon name="TreePine" size={16} color="white" />
                </div>
              </div>
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Join the Monte Verde Family
            </h3>
            
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Become part of our community and receive exclusive updates, seasonal inspiration, and special offers for your upcoming celebrations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />

              <Button
                variant="default"
                iconName="Send"
                iconPosition="right"
                className="px-6">

                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default CallToAction;