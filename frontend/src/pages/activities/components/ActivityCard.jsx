import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ActivityCard = ({ activity }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-organic-sm hover:shadow-organic-md transition-organic">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={activity?.image}
          alt={activity?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-xl font-semibold text-white mb-1">
            {activity?.name}
          </h3>
          <div className="flex items-center space-x-2 text-white/90 text-sm">
            <Icon name={activity?.icon} size={16} />
            <span>{activity?.duration}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-muted-foreground mb-4">
          {activity?.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Difficulty</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < activity?.difficulty
                      ? 'bg-primary' :'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Group Size</span>
            <span className="text-foreground font-medium">{activity?.groupSize}</span>
          </div>

          {activity?.seasonal && (
            <div className="flex items-center space-x-2 text-sm text-accent">
              <Icon name="Sun" size={16} />
              <span>Seasonal Activity</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;