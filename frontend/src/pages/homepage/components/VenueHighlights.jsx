import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VenueHighlights = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const highlights = [
  {
    id: 1,
    title: "Natural Gardens",
    description: "Meticulously maintained gardens that bloom year-round, providing stunning backdrops for every season.",
    image: "https://images.unsplash.com/photo-1655605325452-51c85c3a702f",
    imageAlt: "Lush landscaped gardens with colorful seasonal flowers, winding stone pathways, and mature trees creating natural archways in peaceful outdoor setting",
    icon: "Flower2",
    features: ["Seasonal Blooms", "Photo Locations", "Ceremony Spaces"]
  },
  {
    id: 2,
    title: "Elegant Pavilions",
    description: "Open-air pavilions that seamlessly blend indoor comfort with outdoor beauty for any weather.",
    image: "https://images.unsplash.com/photo-1610892575892-e53d8aae9fd2",
    imageAlt: "Elegant outdoor pavilion with white columns and draped fabric ceiling, furnished with round tables and chairs under warm string lighting",
    icon: "Building2",
    features: ["Weather Protection", "Flexible Layouts", "Natural Lighting"]
  },
  {
    id: 3,
    title: "Scenic Landscapes",
    description: "Rolling hills and mature trees create a picturesque setting that changes beautifully with each season.",
    image: "https://images.unsplash.com/photo-1596751900692-0712ddd9e2dc",
    imageAlt: "Panoramic view of rolling green hills with mature oak trees scattered across landscape under golden hour sky with soft natural lighting",
    icon: "Mountain",
    features: ["Panoramic Views", "Natural Amphitheater", "Sunset Vistas"]
  },
  {
    id: 4,
    title: "Luxury Amenities",
    description: "Premium facilities including bridal suites, catering kitchens, and professional event coordination.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15a69c55c-1765287133840.png",
    imageAlt: "Luxurious bridal suite interior with elegant white furniture, crystal chandelier, large mirrors, and fresh flower arrangements in sophisticated setting",
    icon: "Sparkles",
    features: ["Bridal Suite", "Professional Kitchen", "Event Coordination"]
  }];


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-id]');
    elements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Rooted in Beauty, Growing Memories
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the unique features that make Monte Verde the perfect canvas for your celebration, where every detail is designed to create unforgettable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {highlights?.map((highlight, index) =>
          <div
            key={highlight?.id}
            data-id={highlight?.id}
            className={`group transition-organic duration-700 ${
            visibleItems?.includes(highlight?.id) ?
            'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }
            style={{ transitionDelay: `${index * 200}ms` }}>

              <div className="relative h-80 rounded-xl overflow-hidden shadow-organic-md mb-6">
                <Image
                src={highlight?.image}
                alt={highlight?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-organic-slow" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon name={highlight?.icon} size={20} color="white" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {highlight?.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {highlight?.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {highlight?.features?.map((feature, featureIndex) =>
                <span
                  key={featureIndex}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">

                      <Icon name="Check" size={14} className="mr-1" />
                      {feature}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="TreePine" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Experience Monte Verde
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take a virtual tour of our stunning venue and discover why Monte Verde is the perfect setting for your next celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/event-gallery">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Image"
                  iconPosition="left">

                  View Gallery
                </Button>
              </Link>
              <Link to="/amenities-activities">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MapPin"
                  iconPosition="left">

                  Explore Amenities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default VenueHighlights;