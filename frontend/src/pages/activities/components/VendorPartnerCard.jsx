import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const VendorPartnerCard = ({ vendor }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-organic-sm hover:shadow-organic-md transition-organic">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={vendor?.logo}
            alt={vendor?.logoAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
            {vendor?.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Icon name={vendor?.categoryIcon} size={14} />
            <span>{vendor?.category}</span>
          </div>
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                color={i < vendor?.rating ? 'var(--color-accent)' : 'var(--color-muted)'}
                className={i < vendor?.rating ? 'fill-current' : ''}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({vendor?.reviews} reviews)
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 mt-4">
        {vendor?.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {vendor?.specialties?.map((specialty, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
          >
            {specialty}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="CheckCircle" size={16} />
          <span>Verified Partner</span>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-organic flex items-center space-x-1">
          <span>View Profile</span>
          <Icon name="ExternalLink" size={14} />
        </button>
      </div>
    </div>
  );
};

export default VendorPartnerCard;