import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AmenityCard = ({ amenity, onFavorite, isFavorited }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-organic-sm hover:shadow-organic-md transition-organic group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={amenity?.image}
          alt={amenity?.imageAlt}
          className="w-full h-full object-cover transition-organic group-hover:scale-105"
        />
        <button
          onClick={() => onFavorite(amenity?.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-organic"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon
            name={isFavorited ? 'Heart' : 'Heart'}
            size={20}
            color={isFavorited ? 'var(--color-error)' : 'var(--color-muted-foreground)'}
            className={isFavorited ? 'fill-current' : ''}
          />
        </button>
        {amenity?.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
              {amenity?.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name={amenity?.categoryIcon} size={16} />
              <span>{amenity?.category}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {amenity?.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenity?.features?.slice(0, 3)?.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {feature}
            </span>
          ))}
          {amenity?.features?.length > 3 && (
            <span className="px-2 py-1 text-xs text-primary">
              +{amenity?.features?.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} color="var(--color-primary)" />
              <span className="text-muted-foreground">{amenity?.capacity}</span>
            </div>
            {amenity?.availability && (
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} color="var(--color-success)" />
                <span className="text-success text-xs">Available</span>
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" iconName="ChevronRight" iconPosition="right">
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AmenityCard;