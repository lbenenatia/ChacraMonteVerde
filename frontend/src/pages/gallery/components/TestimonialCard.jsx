import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-card rounded-lg shadow-organic-sm p-6 space-y-4">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={testimonial?.clientImage}
            alt={testimonial?.clientImageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-serif text-lg font-semibold text-foreground">
            {testimonial?.clientName}
          </h4>
          <p className="text-sm text-muted-foreground">{testimonial?.eventType}</p>
          <p className="text-xs text-muted-foreground">{testimonial?.eventDate}</p>
        </div>
        <div className="flex text-accent">
          {[...Array(5)]?.map((_, i) => (
            <Icon key={i} name="Star" size={16} fill="currentColor" />
          ))}
        </div>
      </div>
      <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted">
        <Image
          src={testimonial?.eventImage}
          alt={testimonial?.eventImageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <blockquote className="text-foreground italic">
        "{testimonial?.testimonial}"
      </blockquote>
      <div className="flex flex-wrap gap-2">
        {testimonial?.highlights?.map((highlight, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
          >
            {highlight}
          </span>
        ))}
      </div>
      {testimonial?.vendorPartners && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Colaboradores:</p>
          <div className="flex flex-wrap gap-2">
            {testimonial?.vendorPartners?.map((vendor, index) => (
              <span key={index} className="text-xs text-foreground">
                {vendor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;